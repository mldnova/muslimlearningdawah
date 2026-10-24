import Link from "next/link";
import { EventForm } from "@/components/admin/event-form";
import { requireAdmin } from "@/lib/auth";

export default async function NewEventPage() {
  await requireAdmin();
  return (
    <>
      <Link href="/admin" className="text-sm font-medium text-navy-700 hover:text-navy-950">
        ← All events
      </Link>
      <h1 className="mt-3 font-serif text-3xl font-semibold text-navy-950">Add an event</h1>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <EventForm />
      </div>
    </>
  );
}
