import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site-config";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group flex items-center gap-3 ${className}`}>
      <Image
        src="/mld-logo.jpg"
        alt={`${site.name} logo`}
        width={44}
        height={44}
        loading="eager"
        className="h-11 w-11 rounded-full ring-1 ring-gold-300/40 transition group-hover:ring-gold-300"
      />
      <span className="leading-tight">
        <span className="block font-serif text-lg font-semibold tracking-tight text-white">
          {site.shortName}
        </span>
        <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-navy-200">
          Muslim Learning & Da&apos;wah
        </span>
      </span>
    </Link>
  );
}
