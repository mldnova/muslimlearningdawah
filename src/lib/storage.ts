import "server-only";
import { createCipheriv, createDecipheriv, createHash, randomBytes, randomUUID } from "node:crypto";
import { mkdir, readdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { del, list, put } from "@vercel/blob";
import type { Submission } from "@/lib/content-types";

/**
 * Where admin edits are saved.
 * - Production (Vercel): Vercel Blob. Connecting the store to the project sets BLOB_STORE_ID
 *   (older stores set BLOB_READ_WRITE_TOKEN instead); the SDK handles sign-in either way.
 * - Local development: .data/content.json and public/uploads/.
 */
const useBlob = Boolean(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN);

/** Thrown when the site runs on Vercel without a Blob store connected (its disk is read-only). */
export class StorageNotConnectedError extends Error {
  constructor() {
    super("No Blob store found — connect the Blob store to this Vercel project and redeploy.");
  }
}

/** Thrown when submissions can't be encrypted because SUBMISSIONS_SECRET isn't set. */
export class MissingSecretError extends Error {
  constructor() {
    super("SUBMISSIONS_SECRET is missing — add it in Vercel → Settings → Environment Variables and redeploy.");
  }
}

function assertWritable() {
  if (!useBlob && process.env.VERCEL) throw new StorageNotConnectedError();
}

const CONTENT_PREFIX = "content/site-";
/** Every save writes a new file; older ones are kept as backups, up to this many. */
const KEEP_VERSIONS = 20;

const localContentFile = path.join(process.cwd(), ".data", "content.json");
const localSubmissionDir = path.join(process.cwd(), ".data", "submissions");
const SUBMISSION_PREFIX = "submissions/";
const localUploadDir = path.join(process.cwd(), "public", "uploads");

export async function readStoredContent(): Promise<unknown> {
  if (useBlob) {
    const { blobs } = await list({ prefix: CONTENT_PREFIX });
    if (blobs.length === 0) return null;
    const latest = blobs.reduce((a, b) => (b.uploadedAt > a.uploadedAt ? b : a));
    const res = await fetch(latest.url);
    if (!res.ok) throw new Error(`Could not load site content (${res.status})`);
    return res.json();
  }

  try {
    return JSON.parse(await readFile(localContentFile, "utf8"));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
}

export async function writeStoredContent(content: unknown) {
  const body = JSON.stringify(content, null, 2);

  if (useBlob) {
    // New file per save (never overwrite) so the CDN can't serve a stale copy.
    await put(`${CONTENT_PREFIX}${Date.now()}.json`, body, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: true,
    });
    const { blobs } = await list({ prefix: CONTENT_PREFIX });
    const old = blobs
      .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())
      .slice(KEEP_VERSIONS);
    if (old.length > 0) await del(old.map((b) => b.url));
    return;
  }

  assertWritable();
  await mkdir(path.dirname(localContentFile), { recursive: true });
  await writeFile(localContentFile, body);
}

const extensions: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export const allowedImageTypes = Object.keys(extensions);

/** Saves an uploaded image and returns the URL to show it with. */
export async function saveImage(file: File): Promise<string> {
  const name = `${randomUUID()}.${extensions[file.type] ?? "jpg"}`;

  if (useBlob) {
    const blob = await put(`uploads/${name}`, file, {
      access: "public",
      contentType: file.type,
    });
    return blob.url;
  }

  assertWritable();
  await mkdir(localUploadDir, { recursive: true });
  await writeFile(path.join(localUploadDir, name), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${name}`;
}

/** Deletes an image previously saved with saveImage. Built-in images in public/gallery are left alone. */
export async function deleteImage(src: string | undefined) {
  if (!src) return;
  if (useBlob && src.includes(".blob.vercel-storage.com/")) {
    await del(src);
  } else if (!useBlob && src.startsWith("/uploads/")) {
    await unlink(path.join(localUploadDir, path.basename(src))).catch(() => {});
  }
}

// Form submissions are one file each, so visitors sending forms at the same time never overwrite each other.
// Blob files are reachable by URL, so submissions (names, phone numbers) are encrypted before upload.

function submissionKey() {
  const secret = process.env.SUBMISSIONS_SECRET || process.env.BLOB_READ_WRITE_TOKEN;
  if (!secret) throw new MissingSecretError();
  return createHash("sha256").update(`mld-submissions:${secret}`).digest();
}

function encrypt(text: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", submissionKey(), iv);
  const data = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  return [iv, cipher.getAuthTag(), data].map((b) => b.toString("base64")).join(".");
}

function decrypt(payload: string) {
  const [iv, tag, data] = payload.split(".").map((part) => Buffer.from(part, "base64"));
  const decipher = createDecipheriv("aes-256-gcm", submissionKey(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
}

export async function saveSubmission(submission: Submission) {
  const name = `${submission.receivedAt.replace(/[:.]/g, "-")}_${submission.id}.json`;
  const body = JSON.stringify(submission, null, 2);
  if (useBlob) {
    await put(`${SUBMISSION_PREFIX}${name}`, encrypt(body), {
      access: "public",
      contentType: "text/plain",
      addRandomSuffix: true,
    });
    return;
  }
  assertWritable();
  await mkdir(localSubmissionDir, { recursive: true });
  await writeFile(path.join(localSubmissionDir, name), body);
}

/** Newest first */
export async function listSubmissions(limit = 200): Promise<(Submission & { storageKey: string })[]> {
  if (useBlob) {
    const { blobs } = await list({ prefix: SUBMISSION_PREFIX, limit: 1000 });
    const newest = blobs.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime()).slice(0, limit);
    return Promise.all(
      newest.map(async (b) => ({ ...JSON.parse(decrypt(await (await fetch(b.url)).text())), storageKey: b.url })),
    );
  }
  const names = await readdir(localSubmissionDir).catch(() => [] as string[]);
  const newest = names.filter((n) => n.endsWith(".json")).sort().reverse().slice(0, limit);
  return Promise.all(
    newest.map(async (n) => ({ ...JSON.parse(await readFile(path.join(localSubmissionDir, n), "utf8")), storageKey: n })),
  );
}

/** `storageKey` comes from listSubmissions */
export async function deleteSubmission(storageKey: string) {
  if (useBlob) {
    if (storageKey.includes(`.blob.vercel-storage.com/${SUBMISSION_PREFIX}`)) await del(storageKey);
    return;
  }
  await unlink(path.join(localSubmissionDir, path.basename(storageKey))).catch(() => {});
}
