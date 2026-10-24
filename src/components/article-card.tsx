import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/content-types";
import { formatDate } from "@/lib/format";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-navy-950/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-900">
        {article.cover ? (
          <Image
            src={article.cover}
            alt=""
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        ) : (
          <div className="bg-pattern flex h-full items-center justify-center p-6 text-center font-serif text-xl font-semibold text-gold-300">
            {article.title}
          </div>
        )}
        {article.videoUrl && (
          <span className="absolute left-3 top-3 rounded-full bg-navy-950/85 px-2.5 py-1 text-xs font-semibold text-white">
            ▶ Video
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
          {formatDate(article.date, "short")}
          {article.author ? ` · ${article.author}` : ""}
        </p>
        <h3 className="mt-2 font-serif text-xl font-semibold text-navy-950 group-hover:text-navy-700">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{article.summary}</p>
        <span className="mt-auto pt-4 text-sm font-semibold text-navy-700">Read more →</span>
      </div>
    </Link>
  );
}
