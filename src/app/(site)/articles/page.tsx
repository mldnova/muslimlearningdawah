import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteForm } from "@/components/site-form";
import { getArticles, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Articles & Media",
  description: "Read and submit articles and short videos for Muslim Learning & Da'wah.",
};

export default async function ArticlesPage() {
  const [articles, settings] = await Promise.all([getArticles(), getSettings()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Beneficial knowledge"
        title="Articles & short videos"
        description="Written pieces and brief video reflections from our programs and community. We welcome submissions that are clear, sourced, and beneficial."
      />

      {articles.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-2xl border border-dashed border-navy-200 bg-white p-8 text-center text-slate-600">
          Our first articles are on the way, in shaa Allah. Have something beneficial to share? Submit it below.
        </p>
      )}

      <section id="submit" className="mt-16 grid scroll-mt-24 gap-12 rounded-3xl bg-navy-50 p-6 sm:p-10 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-navy-950">Submit your work</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Share an article draft, essay, or link to a short video (YouTube, Instagram reel, etc.). Our team reviews
            submissions for accuracy and benefit before publishing.
          </p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-600">
            <li>Articles: 600–1,500 words, with references where needed</li>
            <li>Videos: 3–10 minutes, family-friendly, no music</li>
            <li>Include your name and how we may contact you</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SiteForm
            kind="article-submission"
            fallbackEmail={settings.email}
            submitLabel="Submit for review"
            successMessage="JazakAllah khair — we received your submission and will review it soon."
            fields={[
              { name: "name", label: "Your name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              {
                name: "type",
                label: "Submission type",
                type: "select",
                required: true,
                options: ["Article", "Short video link", "Both"],
              },
              { name: "title", label: "Title or topic", required: true },
              { name: "link", label: "Link (for videos or Google Doc)", type: "url", placeholder: "https://" },
              {
                name: "content",
                label: "Article text or summary",
                type: "textarea",
                rows: 8,
                placeholder: "Paste your article or describe the video…",
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
