import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type { Article, EventItem, SiteContent } from "@/lib/content-types";
import { defaultSettings, eventUpdates, seedArticles, seedEvents } from "@/lib/site-config";
import { readStoredContent } from "@/lib/storage";

/** Invalidated by every admin save, so the public site updates right away. */
export const CONTENT_TAG = "site-content";

/** Uncached read — admin actions use this so they always edit the latest copy. */
export async function loadContent(): Promise<SiteContent> {
  const stored = (await readStoredContent()) as Partial<SiteContent> | null;
  const events = stored?.events ?? seedEvents;
  return {
    // Saved content predates the latest `eventUpdates`: apply them now. The next admin save keeps them.
    events: stored?.events && stored.eventUpdatesApplied !== eventUpdates.version ? applyEventUpdates(events) : events,
    articles: stored?.articles ?? seedArticles,
    settings: { ...defaultSettings, ...stored?.settings },
    eventUpdatesApplied: eventUpdates.version,
  };
}

/** Adds, updates, and removes the events listed in `eventUpdates` (site-config). */
function applyEventUpdates(saved: EventItem[]) {
  const removed = new Set<string>(eventUpdates.remove);
  const events = saved.filter((e) => !removed.has(e.id));
  for (const update of eventUpdates.upsert) {
    const i = events.findIndex((e) => e.id === update.id);
    if (i === -1) events.push(update);
    else events[i] = { ...events[i], ...update };
  }
  return events;
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

/** One event plus whether it's still upcoming, for its own page. */
export async function getEvent(id: string) {
  const { upcoming, past } = await getEvents();
  const event = upcoming.find((e) => e.id === id) ?? past.find((e) => e.id === id);
  return event && { event, isUpcoming: upcoming.includes(event), upcoming };
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
