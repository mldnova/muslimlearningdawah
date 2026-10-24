import Link from "next/link";
import { ArticleForm } from "@/components/admin/article-form";
import { requireAdmin } from "@/lib/auth";

export default async function NewArticlePage() {
  await requireAdmin();
  return (
    <>
      <Link href="/admin/articles" className="text-sm font-medium text-navy-700 hover:text-navy-950">
        ← All articles
      </Link>
      <h1 className="mt-3 font-serif text-3xl font-semibold text-navy-950">Write an article</h1>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <ArticleForm />
      </div>
    </>
  );
}
