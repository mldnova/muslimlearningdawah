import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArticleBody, ArticleVideo } from "@/components/article-body";
import { getArticle } from "@/lib/content";
import { formatDate } from "@/lib/format";

export async function generateMetadata({ params }: PageProps<"/articles/[slug]">) {
  const article = await getArticle((await params).slug);
  return article ? { title: article.title, description: article.summary } : {};
}

export default function ArticlePage(props: PageProps<"/articles/[slug]">) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-4 py-16 text-slate-500 sm:px-6">Loading…</div>}>
      <ArticleContent {...props} />
    </Suspense>
  );
}

async function ArticleContent({ params }: PageProps<"/articles/[slug]">) {
  const article = await getArticle((await params).slug);
  if (!article) notFound();

  return (
    <article className="pb-16">
      <header className="bg-pattern bg-navy-950 text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <Link href="/articles" className="text-sm font-medium text-navy-200 hover:text-white">
            ← All articles
          </Link>
          <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-navy-100">{article.summary}</p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-gold-300">
            {formatDate(article.date)}
            {article.author ? ` · ${article.author}` : ""}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {article.cover && (
          <div className="relative -mt-2 aspect-[16/9] overflow-hidden rounded-b-3xl bg-navy-100">
            <Image src={article.cover} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 768px" />
          </div>
        )}
        {article.videoUrl && (
          <div className="mt-10">
            <ArticleVideo url={article.videoUrl} />
          </div>
        )}
        <div className="mt-10">
          <ArticleBody text={article.body} />
        </div>
        <div className="mt-14 rounded-2xl border border-slate-200 bg-white p-6 text-center">
          <p className="font-serif text-lg font-semibold text-navy-950">Have something beneficial to share?</p>
          <Link
            href="/articles#submit"
            className="mt-3 inline-flex rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700"
          >
            Submit an article or video
          </Link>
        </div>
      </div>
    </article>
  );
}
