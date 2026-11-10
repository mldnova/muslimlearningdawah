import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { SpeakerCard } from "@/components/speaker-card";
import { speakers } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Speakers",
  description: "Scholars and teachers who speak at Muslim Learning & Da'wah programs.",
};

export default function SpeakersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Speakers"
        title="Scholars & teachers at our programs"
        description="Our events feature trusted voices from our community and visiting scholars, who speak with knowledge, clarity, and compassion."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker.name} speaker={speaker} />
        ))}
      </div>

      <div className="mt-14 rounded-2xl bg-navy-50 p-8 text-center">
        <h2 className="font-serif text-2xl font-semibold text-navy-950">Want one of our speakers at your event?</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
          Masjids, MSAs, and organizations anywhere in the country can request a lecture, conference, or da&apos;wah
          training.
        </p>
        <Link
          href="/book-event"
          className="mt-5 inline-flex rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-700"
        >
          Book an event
        </Link>
      </div>
    </div>
  );
}
