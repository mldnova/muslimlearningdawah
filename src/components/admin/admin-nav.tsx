import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { logout } from "@/app/admin/actions";
import { AdminTabs, TabLinks } from "@/components/admin/admin-tabs";

export function AdminNav() {
  return (
    <header className="bg-navy-950 text-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/admin" className="flex items-center gap-3">
          <Image src="/mld-logo.jpg" alt="" width={36} height={36} className="h-9 w-9 rounded-full" />
          <span className="font-serif text-lg font-semibold">
            MLD <span className="text-gold-300">Admin</span>
          </span>
        </Link>
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" target="_blank" className="rounded-full px-3 py-1.5 text-navy-100 hover:bg-white/10 hover:text-white">
            View site ↗
          </Link>
          <form action={logout}>
            <button type="submit" className="rounded-full px-3 py-1.5 text-navy-100 hover:bg-white/10 hover:text-white">
              Log out
            </button>
          </form>
        </div>
      </div>
      <Suspense fallback={<TabLinks pathname={null} />}>
        <AdminTabs />
      </Suspense>
    </header>
  );
}
