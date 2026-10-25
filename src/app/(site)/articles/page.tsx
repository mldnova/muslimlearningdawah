import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { SectionHeading } from "@/components/section-heading";
import { getArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Articles & Media",
  description: "Articles and short videos from Muslim Learning & Da'wah.",
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Beneficial knowledge"
        title="Articles & short videos"
        description="Written pieces and short video reflections from the MLD team and our programs."
      />

      {articles.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-2xl border border-dashed border-navy-200 bg-white p-8 text-center text-slate-600">
          Our first articles are on the way, in shaa Allah.
        </p>
      )}
    </div>
  );
}
