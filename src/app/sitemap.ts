import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/content";
import { site } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/events", "/articles", "/gallery", "/donate", "/request-event", "/contact"];
  const articles = await getArticles();
  return [
    ...pages.map((path) => ({ url: `${site.url}${path}` })),
    ...articles.map((a) => ({ url: `${site.url}/articles/${a.slug}`, lastModified: a.date })),
  ];
}
