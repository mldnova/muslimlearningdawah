"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/admin", label: "Events" },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/inbox", label: "Inbox" },
  { href: "/admin/settings", label: "Links & contact" },
] as const;

export function AdminTabs() {
  return <TabLinks pathname={usePathname()} />;
}

/** Rendered with pathname null as the Suspense fallback: same tabs, no highlight. */
export function TabLinks({ pathname }: { pathname: string | null }) {
  const isActive = (href: string) =>
    !!pathname &&
    (href === "/admin" ? pathname === "/admin" || pathname.startsWith("/admin/events") : pathname.startsWith(href));

  return (
    <nav className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 sm:px-6" aria-label="Admin">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`whitespace-nowrap rounded-t-lg px-4 py-2.5 text-sm font-medium transition ${
            isActive(tab.href) ? "bg-slate-50 text-navy-950" : "text-navy-100 hover:bg-white/10 hover:text-white"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
