import type { Metadata } from "next";
import Link from "next/link";
import { EventCard } from "@/components/event-card";
import { PhotoStrip } from "@/components/photo-strip";
import { SectionHeading } from "@/components/section-heading";
import { getEvents } from "@/lib/content";
import { about, carouselPhotos } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: about.mission,
};

export default async function AboutPage() {
  const { past } = await getEvents();

  return (
    <>
      <section className="bg-pattern bg-navy-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-300">About MLD</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            Learning the deen, building community, and calling to Allah.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100">
            Started by college students in Fairfax, Virginia, seven years ago — now a nonprofit educating, inspiring,
            and serving communities across the country.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="Our story" title="How we got here" />
          <div className="mt-5 max-w-3xl space-y-4 leading-relaxed text-slate-700">
            {about.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <PhotoStrip photos={carouselPhotos} />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="Our focus" title="What we work on" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.focus.map((item) => (
              <div key={item.title} className="rounded-2xl border-t-4 border-gold-400 bg-navy-50 p-6">
                <h3 className="font-serif text-xl font-semibold text-navy-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {past.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Our history" title="Programs we've hosted" />
            <Link href="/events" className="text-sm font-semibold text-navy-700 hover:text-navy-950">
              All events →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {past.slice(0, 6).map((event) => (
              <EventCard key={event.id} event={event} upcoming={false} />
            ))}
          </div>
        </section>
      )}

      <section className="bg-pattern bg-navy-900 py-16 text-center text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold">Be part of it</h2>
          <p className="mx-auto mt-3 max-w-xl text-navy-100">
            Come to a program, suggest one, or help fund the next conference, in shaa Allah.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/events"
              className="rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-navy-950 transition hover:bg-gold-300"
            >
              See events
            </Link>
            <Link
              href="/donate"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Support our work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
