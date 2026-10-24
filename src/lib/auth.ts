import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";

/**
 * One shared admin password (ADMIN_PASSWORD). Logging in sets a signed cookie
 * that lasts a week. Changing ADMIN_PASSWORD logs everyone out.
 */
const COOKIE_NAME = "mld_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!value) throw new Error("ADMIN_PASSWORD is not set");
  return value;
}

function sign(expires: number) {
  return createHmac("sha256", secret()).update(`admin:${expires}`).digest("base64url");
}

function sameText(a: string, b: string) {
  const hash = (s: string) => createHash("sha256").update(s).digest();
  return timingSafeEqual(hash(a), hash(b));
}

export function passwordMatches(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected) && sameText(password, expected!);
}

export async function startSession() {
  const expires = Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS;
  (await cookies()).set(COOKIE_NAME, `${expires}.${sign(expires)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE_NAME);
}

export async function isAdmin() {
  if (!adminConfigured()) return false;
  // Login checks depend on the current time, so they must run per request.
  await connection();
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (!value) return false;
  const [expiresText, signature] = value.split(".");
  const expires = Number(expiresText);
  if (!signature || !Number.isFinite(expires)) return false;
  return sameText(signature, sign(expires)) && expires > Date.now() / 1000;
}

/** Call at the top of every admin page and server action. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
