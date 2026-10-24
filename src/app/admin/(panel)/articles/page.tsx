import Link from "next/link";
import { deleteArticle } from "@/app/admin/actions";
import { ActionButton } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { loadContent } from "@/lib/content";
import { formatDate } from "@/lib/format";

export default async function AdminArticlesPage() {
  await requireAdmin();
  const articles = [...(await loadContent()).articles].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-navy-950">Articles</h1>
          <p className="mt-1 text-sm text-slate-600">
            Published articles appear on the Articles page; the newest three also show on the home page.
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-navy-950 transition hover:bg-gold-300"
        >
          + Write article
        </Link>
      </div>

      {articles.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
          No articles yet. Write the first one — it can be a reflection, a lecture summary, or a short video with notes.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {articles.map((article) => (
            <li key={article.id} className="flex flex-wrap items-center gap-4 p-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-navy-950">{article.title}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      article.published ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {article.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-sm text-slate-600">
                  {formatDate(article.date, "short")}
                  {article.author ? ` · ${article.author}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {article.published && (
                  <Link
                    href={`/articles/${article.slug}`}
                    target="_blank"
                    className="rounded-full px-3 py-1.5 text-sm font-medium text-navy-700 hover:bg-navy-50"
                  >
                    View ↗
                  </Link>
                )}
                <Link
                  href={`/admin/articles/${article.id}`}
                  className="rounded-full border border-slate-300 px-3.5 py-1.5 text-sm font-medium text-navy-900 transition hover:bg-navy-50"
                >
                  Edit
                </Link>
                <form action={deleteArticle}>
                  <input type="hidden" name="id" value={article.id} />
                  <ActionButton
                    tone="danger"
                    pendingText="Deleting…"
                    confirm={`Delete “${article.title}”? This can't be undone.`}
                  >
                    Delete
                  </ActionButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
