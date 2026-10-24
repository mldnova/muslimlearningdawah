import type { Metadata } from "next";
import { EventCard } from "@/components/event-card";
import { SectionHeading } from "@/components/section-heading";
import { getEvents, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and past Muslim Learning & Da'wah events in the DMV.",
};

export default async function EventsPage() {
  const [{ upcoming, past }, settings] = await Promise.all([getEvents(), getSettings()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Programs"
        title="Upcoming & past events"
        description="Join us for lectures, conferences, and community gatherings. New dates are announced first in our WhatsApp announcement group and on Instagram."
      />
      <a
        href={settings.whatsappCommunity}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700"
      >
        Join WhatsApp for announcements
      </a>

      <h2 className="mt-12 font-serif text-2xl font-semibold text-navy-950">Upcoming</h2>
      {upcoming.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-dashed border-navy-200 bg-white p-6 text-slate-600">
          No upcoming events listed yet — check WhatsApp or Instagram for the latest.
        </p>
      ) : (
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((event) => (
            <EventCard key={event.id} event={event} upcoming />
          ))}
        </div>
      )}

      {past.length > 0 && (
        <>
          <h2 className="mt-16 font-serif text-2xl font-semibold text-navy-950">Past events</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {past.map((event) => (
              <EventCard key={event.id} event={event} upcoming={false} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
