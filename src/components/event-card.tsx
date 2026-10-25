import Image from "next/image";
import Link from "next/link";
import type { EventItem } from "@/lib/content-types";
import { formatDate, weekday } from "@/lib/format";

export function EventCard({ event, upcoming }: { event: EventItem; upcoming: boolean }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-navy-950/10">
      {event.image && (
        <div className="relative aspect-[4/5] overflow-hidden bg-navy-100">
          <Image
            src={event.image}
            alt={`${event.title} flyer`}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${
              event.repeatsWeekly
                ? "bg-navy-100 text-navy-800"
                : upcoming
                  ? "bg-gold-100 text-gold-700"
                  : "bg-slate-100 text-slate-600"
            }`}
          >
            {event.repeatsWeekly ? "Weekly" : upcoming ? "Upcoming" : "Past event"}
          </span>
          {event.repeatsWeekly ? (
            <span className="text-sm font-medium text-navy-700">Every {weekday(event.date)}</span>
          ) : (
            <time dateTime={event.date} className="text-sm font-medium text-navy-700">
              {formatDate(event.date)}
            </time>
          )}
        </div>
        {event.time && <p className="mt-1 text-sm text-slate-500">{event.time}</p>}
        <h3 className="mt-3 font-serif text-xl font-semibold text-navy-950">
          {/* Stretched over the whole card so anywhere on it opens the event */}
          <Link href={`/events/${event.id}`} className="after:absolute after:inset-0 group-hover:text-navy-700">
            {event.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{event.description}</p>
        <p className="mt-auto flex items-start gap-1.5 pt-4 text-sm font-medium text-navy-800">
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
          </svg>
          {event.location}
        </p>
        {event.registrationUrl && upcoming && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 mt-4 inline-flex w-fit rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-700"
          >
            Register / details →
          </a>
        )}
      </div>
    </article>
  );
}
