"use server";

import { randomUUID } from "node:crypto";
import { refresh, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { endSession, passwordMatches, requireAdmin, startSession } from "@/lib/auth";
import { CONTENT_TAG, loadContent, todayInDmv } from "@/lib/content";
import type { Article, EventItem, GalleryItem, SiteContent, SiteSettings } from "@/lib/content-types";
import {
  allowedImageTypes,
  deleteImage,
  deleteSubmission,
  saveImage,
  writeStoredContent,
} from "@/lib/storage";

export type FormState = { error?: string; saved?: boolean; savedAt?: number } | undefined;

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

function text(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

function isDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isLink(value: string) {
  return /^https?:\/\/\S+$/i.test(value);
}

function slugify(title: string) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 60) || "item"
  );
}

function newId(title: string) {
  return `${slugify(title).slice(0, 40)}-${randomUUID().slice(0, 6)}`;
}

/** Returns the uploaded image file, null when none was chosen, or an error message. */
function imageFrom(form: FormData): File | null | string {
  const file = form.get("image");
  if (!(file instanceof File) || file.size === 0) return null;
  if (!allowedImageTypes.includes(file.type)) return "Please upload a JPG, PNG, WebP or GIF image.";
  if (file.size > MAX_IMAGE_BYTES) return "That image is too large (max 4 MB). Try a smaller photo.";
  return file;
}

async function save(content: SiteContent) {
  await writeStoredContent(content);
  updateTag(CONTENT_TAG);
}

// ---------- Login ----------

export async function login(_: FormState, form: FormData): Promise<FormState> {
  if (!passwordMatches(text(form, "password"))) {
    return { error: "That password isn't right. Try again." };
  }
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

// ---------- Events ----------

export async function saveEvent(_: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();

  const id = text(form, "id");
  const title = text(form, "title");
  const date = text(form, "date");
  const location = text(form, "location");
  const description = text(form, "description");
  const time = text(form, "time");
  const registrationUrl = text(form, "registrationUrl");

  if (!title || !location || !description) return { error: "Please fill in the title, location and description." };
  if (!isDate(date)) return { error: "Please pick a date." };
  if (registrationUrl && !isLink(registrationUrl)) {
    return { error: "The sign-up link should start with https://" };
  }
  const file = imageFrom(form);
  if (typeof file === "string") return { error: file };

  const content = await loadContent();
  const existing = id ? content.events.find((e) => e.id === id) : undefined;
  if (id && !existing) return { error: "This event was deleted by someone else." };

  let image = existing?.image;
  let replacedImage: string | undefined;
  if (file) {
    replacedImage = image;
    image = await saveImage(file);
  } else if (form.get("removeImage") === "on") {
    replacedImage = image;
    image = undefined;
  }

  const event: EventItem = {
    id: existing?.id ?? newId(title),
    title,
    date,
    location,
    description,
    ...(form.get("repeatsWeekly") === "on" && { repeatsWeekly: true }),
    ...(time && { time }),
    ...(image && { image }),
    ...(registrationUrl && { registrationUrl }),
  };
  const events = existing
    ? content.events.map((e) => (e.id === event.id ? event : e))
    : [...content.events, event];

  await save({ ...content, events });
  await deleteImage(replacedImage);
  redirect("/admin");
}

export async function deleteEvent(form: FormData) {
  await requireAdmin();
  const content = await loadContent();
  const event = content.events.find((e) => e.id === text(form, "id"));
  if (!event) return;
  await save({ ...content, events: content.events.filter((e) => e.id !== event.id) });
  await deleteImage(event.image);
}

// ---------- Articles ----------

export async function saveArticle(_: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();

  const id = text(form, "id");
  const title = text(form, "title");
  const summary = text(form, "summary");
  const body = text(form, "body");
  const author = text(form, "author");
  const date = text(form, "date") || todayInDmv();
  const videoUrl = text(form, "videoUrl");
  const published = form.get("published") === "on";

  if (!title || !summary) return { error: "Please add a title and a short summary." };
  if (!body && !videoUrl) return { error: "Please write the article, or add a video link." };
  if (!isDate(date)) return { error: "Please pick a valid date." };
  if (videoUrl && !isLink(videoUrl)) return { error: "The video link should start with https://" };
  const file = imageFrom(form);
  if (typeof file === "string") return { error: file };

  const content = await loadContent();
  const existing = id ? content.articles.find((a) => a.id === id) : undefined;
  if (id && !existing) return { error: "This article was deleted by someone else." };

  let cover = existing?.cover;
  let replacedImage: string | undefined;
  if (file) {
    replacedImage = cover;
    cover = await saveImage(file);
  } else if (form.get("removeImage") === "on") {
    replacedImage = cover;
    cover = undefined;
  }

  // Keep the link stable once created; make new ones unique.
  let slug = existing?.slug ?? slugify(title);
  if (!existing && content.articles.some((a) => a.slug === slug)) slug = `${slug}-${randomUUID().slice(0, 4)}`;

  const article: Article = {
    id: existing?.id ?? newId(title),
    slug,
    title,
    summary,
    body,
    date,
    published,
    ...(author && { author }),
    ...(cover && { cover }),
    ...(videoUrl && { videoUrl }),
  };
  const articles = existing
    ? content.articles.map((a) => (a.id === article.id ? article : a))
    : [...content.articles, article];

  await save({ ...content, articles });
  await deleteImage(replacedImage);
  redirect("/admin/articles");
}

export async function deleteArticle(form: FormData) {
  await requireAdmin();
  const content = await loadContent();
  const article = content.articles.find((a) => a.id === text(form, "id"));
  if (!article) return;
  await save({ ...content, articles: content.articles.filter((a) => a.id !== article.id) });
  await deleteImage(article.cover);
}

// ---------- Inbox ----------

export async function deleteMessage(form: FormData) {
  await requireAdmin();
  await deleteSubmission(text(form, "key"));
  refresh();
}

// ---------- Gallery ----------

export async function addPhoto(_: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();

  const file = imageFrom(form);
  if (typeof file === "string") return { error: file };
  if (!file) return { error: "Please choose a photo to upload." };
  const caption = text(form, "caption");
  if (!caption) return { error: "Please add a short caption (it also helps people using screen readers)." };
  const date = text(form, "date") || todayInDmv();
  if (!isDate(date)) return { error: "Please pick a valid date." };

  const content = await loadContent();
  const photo: GalleryItem = { id: newId(caption), src: await saveImage(file), caption, date };
  await save({ ...content, gallery: [...content.gallery, photo] });
  return { saved: true, savedAt: Date.now() };
}

export async function updatePhoto(form: FormData) {
  await requireAdmin();
  const caption = text(form, "caption");
  const date = text(form, "date");
  if (!caption || !isDate(date)) return;

  const content = await loadContent();
  const gallery = content.gallery.map((p) => (p.id === text(form, "id") ? { ...p, caption, date } : p));
  await save({ ...content, gallery });
}

export async function deletePhoto(form: FormData) {
  await requireAdmin();
  const content = await loadContent();
  const photo = content.gallery.find((p) => p.id === text(form, "id"));
  if (!photo) return;
  await save({ ...content, gallery: content.gallery.filter((p) => p.id !== photo.id) });
  await deleteImage(photo.src);
}

// ---------- Settings ----------

export async function saveSettings(_: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();

  const settings: SiteSettings = {
    email: text(form, "email"),
    instagram: text(form, "instagram"),
    whatsappCommunity: text(form, "whatsappCommunity"),
    goFundMe: text(form, "goFundMe"),
  };
  if (!/^\S+@\S+\.\S+$/.test(settings.email)) return { error: "Please enter a valid email address." };
  for (const [label, value] of [
    ["Instagram", settings.instagram],
    ["WhatsApp", settings.whatsappCommunity],
    ["GoFundMe", settings.goFundMe],
  ]) {
    if (!isLink(value)) return { error: `The ${label} link should start with https://` };
  }

  const content = await loadContent();
  await save({ ...content, settings });
  return { saved: true };
}
