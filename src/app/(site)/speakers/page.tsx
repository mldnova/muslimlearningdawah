import type { Metadata } from "next";
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
    </div>
  );
}
