import type { Metadata } from "next";
import { DM_Sans, Libre_Baskerville } from "next/font/google";
import { site } from "@/lib/site-config";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const libre = Libre_Baskerville({
  variable: "--font-libre",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} — ${site.name}`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
    images: ["/gallery/recap-deceptions.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} ${libre.variable} h-full scroll-smooth`} data-scroll-behavior="smooth">
      <body className="flex min-h-full flex-col antialiased">{children}</body>
    </html>
  );
}
