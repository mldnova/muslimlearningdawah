import Link from "next/link";
import { Logo } from "@/components/logo";
import { getSettings } from "@/lib/content";
import { navItems, site } from "@/lib/site-config";

export async function SiteFooter() {
  const settings = await getSettings();
  const linkClass = "text-navy-100 transition hover:text-white";

  return (
    <footer className="bg-pattern mt-auto bg-navy-950 text-navy-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-200">{site.description}</p>
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold text-white">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold text-white">Connect</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Instagram @mldnova
              </a>
            </li>
            <li>
              <a href={settings.whatsappCommunity} target="_blank" rel="noopener noreferrer" className={linkClass}>
                WhatsApp announcements
              </a>
            </li>
            <li>
              <Link href="/contact#sisters" className={linkClass}>
                Sisters&apos; WhatsApp group (request)
              </Link>
            </li>
            <li>
              <a href={`mailto:${settings.email}`} className={linkClass}>
                {settings.email}
              </a>
            </li>
          </ul>
          <Link
            href="/donate"
            className="mt-5 inline-flex rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-navy-950 transition hover:bg-gold-300"
          >
            Donate
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-navy-300">
        © 2026 {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
