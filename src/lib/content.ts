import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type { Article, EventItem, GalleryItem, SiteContent } from "@/lib/content-types";
import { defaultSettings, seedArticles, seedEvents, seedGallery } from "@/lib/site-config";
import { readStoredContent } from "@/lib/storage";

/** Invalidated by every admin save, so the public site updates right away. */
export const CONTENT_TAG = "site-content";

/** Uncached read — admin actions use this so they always edit the latest copy. */
export async function loadContent(): Promise<SiteContent> {
  const stored = (await readStoredContent()) as Partial<SiteContent> | null;
  return {
    events: stored?.events ?? seedEvents,
    gallery: stored?.gallery ?? seedGallery,
    articles: stored?.articles ?? seedArticles,
    settings: { ...defaultSettings, ...stored?.settings },
  };
}

async function getContent() {
  "use cache";
  cacheTag(CONTENT_TAG);
  cacheLife("hours");
  return loadContent();
}

/** Today's date (YYYY-MM-DD) in the DMV, so events flip to "past" the day after they happen. */
export function todayInDmv() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());
}

export async function getEvents(): Promise<{ upcoming: EventItem[]; past: EventItem[] }> {
  "use cache";
  cacheTag(CONTENT_TAG);
  // Re-checked hourly so events move from upcoming to past on their own.
  cacheLife("hours");
  const { events } = await getContent();
  return splitEvents(events, todayInDmv());
}

/** Weekly programs first, then one-off events by date. */
export function splitEvents(events: EventItem[], today: string) {
  const isUpcoming = (e: EventItem) => e.repeatsWeekly || e.date >= today;
  return {
    upcoming: events
      .filter(isUpcoming)
      .sort((a, b) => Number(!!b.repeatsWeekly) - Number(!!a.repeatsWeekly) || a.date.localeCompare(b.date)),
    past: events.filter((e) => !isUpcoming(e)).sort((a, b) => b.date.localeCompare(a.date)),
  };
}

export async function getGallery(): Promise<GalleryItem[]> {
  const { gallery } = await getContent();
  return [...gallery].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getSettings() {
  return (await getContent()).settings;
}

/** Published articles, newest first */
export async function getArticles(): Promise<Article[]> {
  const { articles } = await getContent();
  return articles.filter((a) => a.published).sort((a, b) => b.date.localeCompare(a.date));
}

export async function getArticle(slug: string) {
  return (await getArticles()).find((a) => a.slug === slug);
}
