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
        <div className="mt-14 border-t border-slate-200 pt-6 text-center">
          <Link href="/articles" className="text-sm font-semibold text-navy-700 hover:text-navy-950">
            ← More articles
          </Link>
        </div>
      </div>
    </article>
  );
}
