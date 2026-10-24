import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleForm } from "@/components/admin/article-form";
import { requireAdmin } from "@/lib/auth";
import { loadContent } from "@/lib/content";

export default async function EditArticlePage({ params }: PageProps<"/admin/articles/[id]">) {
  await requireAdmin();
  const { id } = await params;
  const article = (await loadContent()).articles.find((a) => a.id === id);
  if (!article) notFound();

  return (
    <>
      <Link href="/admin/articles" className="text-sm font-medium text-navy-700 hover:text-navy-950">
        ← All articles
      </Link>
      <h1 className="mt-3 font-serif text-3xl font-semibold text-navy-950">Edit article</h1>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <ArticleForm article={article} />
      </div>
    </>
  );
}
