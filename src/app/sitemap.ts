import type { MetadataRoute } from "next";
import { getArticles, getEvents } from "@/lib/content";
import { site } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/events", "/articles", "/donate", "/suggest-event", "/contact"];
  const [articles, { upcoming, past }] = await Promise.all([getArticles(), getEvents()]);
  return [
    ...pages.map((path) => ({ url: `${site.url}${path}` })),
    ...[...upcoming, ...past].map((e) => ({ url: `${site.url}/events/${e.id}` })),
    ...articles.map((a) => ({ url: `${site.url}/articles/${a.slug}`, lastModified: a.date })),
  ];
}
