import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { getGallery, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from Muslim Learning & Da'wah events and community programs.",
};

export default async function GalleryPage() {
  const [gallery, settings] = await Promise.all([getGallery(), getSettings()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Moments"
        title="From our community"
        description="Highlights from lectures, youth programs, and sisterhood events. Follow us on Instagram for more."
      />
      <a
        href={settings.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex text-sm font-semibold text-navy-700 hover:text-navy-950"
      >
        @mldnova on Instagram →
      </a>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((photo) => (
          <li
            key={photo.id}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg hover:shadow-navy-950/10"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-navy-100">
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes="(max-width:768px) 100vw, 33vw"
              />
            </div>
            <p className="px-4 py-3 text-sm text-slate-700">{photo.caption}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
