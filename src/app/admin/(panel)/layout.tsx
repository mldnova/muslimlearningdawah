import { Suspense } from "react";
import { AdminNav } from "@/components/admin/admin-nav";

/** Each page checks the login itself (requireAdmin), so it sits behind this Suspense boundary. */
export default function PanelLayout({ children }: LayoutProps<"/admin">) {
  return (
    <>
      <AdminNav />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Suspense fallback={<p className="text-sm text-slate-500">Loading…</p>}>{children}</Suspense>
      </main>
    </>
  );
}
