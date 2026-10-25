import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EventCard } from "@/components/event-card";
import { getEvent, getSettings } from "@/lib/content";
import { formatDate, weekday } from "@/lib/format";

export async function generateMetadata({ params }: PageProps<"/events/[id]">) {
  const found = await getEvent((await params).id);
  if (!found) return {};
  const { event } = found;
  return {
    title: event.title,
    description: event.description.slice(0, 160),
    ...(event.image && { openGraph: { images: [event.image] } }),
  };
}

export default function EventPage(props: PageProps<"/events/[id]">) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-16 text-slate-500 sm:px-6">Loading…</div>}>
      <EventContent {...props} />
    </Suspense>
  );
}

async function EventContent({ params }: PageProps<"/events/[id]">) {
  const [found, settings] = await Promise.all([getEvent((await params).id), getSettings()]);
  if (!found) notFound();
  const { event, isUpcoming, upcoming } = found;
  const others = upcoming.filter((e) => e.id !== event.id).slice(0, 6);

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Link href="/events" className="text-sm font-medium text-navy-700 hover:text-navy-950">
          ← All events
        </Link>

        <article
          className={`mt-6 grid gap-10 ${event.image ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]" : "max-w-3xl"}`}
        >
          {event.image && (
            <a
              href={event.image}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-3xl border border-slate-200 bg-navy-950 shadow-lg shadow-navy-950/10"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={event.image}
                  alt={`${event.title} flyer`}
                  fill
                  loading="eager"
                  className="object-contain"
                  sizes="(max-width:1024px) 100vw, 560px"
                />
              </div>
              <span className="absolute bottom-3 right-3 rounded-full bg-navy-950/80 px-3 py-1 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
                Open full size ↗
              </span>
            </a>
          )}

          <div>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${
                event.repeatsWeekly
                  ? "bg-navy-100 text-navy-800"
                  : isUpcoming
                    ? "bg-gold-100 text-gold-700"
                    : "bg-slate-100 text-slate-600"
              }`}
            >
              {event.repeatsWeekly ? "Weekly" : isUpcoming ? "Upcoming" : "Past event"}
            </span>
            <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">
              {event.title}
            </h1>

            <dl className="mt-6 space-y-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm">
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 font-medium text-slate-500">When</dt>
                <dd className="font-medium text-navy-950">
                  {event.repeatsWeekly ? (
                    `Every ${weekday(event.date)}`
                  ) : (
                    <time dateTime={event.date}>{formatDate(event.date)}</time>
                  )}
                  {event.time && <span className="block font-normal text-slate-600">{event.time}</span>}
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 font-medium text-slate-500">Where</dt>
                <dd className="font-medium text-navy-950">{event.location}</dd>
              </div>
            </dl>

            <p className="mt-6 whitespace-pre-line leading-relaxed text-slate-700">{event.description}</p>

            {isUpcoming && event.registrationUrl && (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-700"
              >
                Register / details →
              </a>
            )}
            {!isUpcoming && (
              <p className="mt-8 rounded-2xl bg-navy-50 p-4 text-sm text-slate-600">
                This event has already happened. See what&apos;s coming up below, or catch the recap on{" "}
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-navy-800 underline underline-offset-2"
                >
                  Instagram
                </a>
                .
              </p>
            )}
          </div>
        </article>
      </div>

      <section className="border-t border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-2xl font-semibold text-navy-950">
              {isUpcoming ? "More upcoming events" : "Upcoming events"}
            </h2>
            <Link href="/events" className="text-sm font-semibold text-navy-700 hover:text-navy-950">
              All events →
            </Link>
          </div>
          {others.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {others.map((e) => (
                <EventCard key={e.id} event={e} upcoming />
              ))}
            </div>
          ) : (
            <p className="mt-6 rounded-2xl border border-dashed border-navy-200 p-6 text-sm text-slate-600">
              No other upcoming events yet — follow us on Instagram or WhatsApp to hear about the next one.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
