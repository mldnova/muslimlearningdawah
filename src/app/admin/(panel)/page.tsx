import Image from "next/image";
import Link from "next/link";
import { deleteEvent } from "@/app/admin/actions";
import { ActionButton } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { loadContent, splitEvents, todayInDmv } from "@/lib/content";
import type { EventItem } from "@/lib/content-types";
import { formatDate, weekday } from "@/lib/format";

export default async function AdminEventsPage() {
  await requireAdmin();
  const { events } = await loadContent();
  const { upcoming, past } = splitEvents(events, todayInDmv());

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-navy-950">Events</h1>
          <p className="mt-1 text-sm text-slate-600">
            Upcoming events show on the home page. They move to “Past events” on their own after the date.
          </p>
        </div>
        <Link
          href="/admin/events/new"
          className="rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-navy-950 transition hover:bg-gold-300"
        >
          + Add event
        </Link>
      </div>

      <EventList
        title="Upcoming"
        events={upcoming}
        empty="No upcoming events. Add one and it will appear on the home page."
      />
      <EventList title="Past" events={past} empty="No past events yet." />
    </>
  );
}

function EventList({ title, events, empty }: { title: string; events: EventItem[]; empty: string }) {
  return (
    <section className="mt-10">
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
        {title} ({events.length})
      </h2>
      {events.length === 0 ? (
        <p className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
          {empty}
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {events.map((event) => (
            <li key={event.id} className="flex flex-wrap items-center gap-4 p-4">
              <div className="relative h-16 w-13 shrink-0 overflow-hidden rounded-lg bg-navy-100">
                {event.image && <Image src={event.image} alt="" fill className="object-cover" sizes="52px" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-navy-950">{event.title}</p>
                <p className="text-sm text-slate-600">
                  {event.repeatsWeekly ? `Weekly · every ${weekday(event.date)}` : formatDate(event.date, "short")}
                  {event.time ? ` · ${event.time}` : ""}
                </p>
                <p className="truncate text-sm text-slate-500">{event.location}</p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/events/${event.id}`}
                  className="rounded-full border border-slate-300 px-3.5 py-1.5 text-sm font-medium text-navy-900 transition hover:bg-navy-50"
                >
                  Edit
                </Link>
                <form action={deleteEvent}>
                  <input type="hidden" name="id" value={event.id} />
                  <ActionButton
                    tone="danger"
                    pendingText="Deleting…"
                    confirm={`Delete “${event.title}”? This can't be undone.`}
                  >
                    Delete
                  </ActionButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
