"use client";

import { startTransition, useActionState, type FormEvent } from "react";
import { saveEvent, type FormState } from "@/app/admin/actions";
import { ImageField } from "@/components/admin/image-field";
import { Field, FormMessage, SaveButton, inputClass } from "@/components/admin/ui";
import type { EventItem } from "@/lib/content-types";

export function EventForm({ event }: { event?: EventItem }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveEvent, undefined);

  // Submit manually so a validation error doesn't clear what was typed.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    startTransition(() => action(form));
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {event && <input type="hidden" name="id" value={event.id} />}
      <Field label="Event title">
        <input name="title" defaultValue={event?.title} required className={inputClass} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Date" hint="After this day passes, the event moves to “Past events” on its own.">
          <input type="date" name="date" defaultValue={event?.date} required className={inputClass} />
        </Field>
        <Field label="Time (optional)">
          <input name="time" defaultValue={event?.time} placeholder="7:00 PM – 9:00 PM" className={inputClass} />
        </Field>
      </div>
      <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
        <input type="checkbox" name="repeatsWeekly" defaultChecked={event?.repeatsWeekly} className="mt-0.5" />
        <span>
          <span className="font-medium text-navy-950">Repeats every week</span>
          <span className="block text-slate-500">
            For weekly programs like the Q&amp;A. Shows as “Every [weekday of the date]” and stays in Upcoming until
            you delete it.
          </span>
        </span>
      </label>
      <Field label="Location">
        <input
          name="location"
          defaultValue={event?.location}
          required
          placeholder="Iqra Learning Center, 5703 Edsall Rd, Alexandria, VA"
          className={inputClass}
        />
      </Field>
      <Field label="Description">
        <textarea
          name="description"
          defaultValue={event?.description}
          required
          rows={4}
          placeholder="What is the event about? Who is speaking?"
          className={inputClass}
        />
      </Field>
      <Field label="Sign-up or ticket link (optional)" hint="Shows a “Register” button while the event is upcoming.">
        <input
          type="url"
          name="registrationUrl"
          defaultValue={event?.registrationUrl}
          placeholder="https://luma.com/…"
          className={inputClass}
        />
      </Field>
      <ImageField label="Flyer (optional)" current={event?.image} />
      <FormMessage error={state?.error} />
      <SaveButton pending={pending}>{event ? "Save changes" : "Add event"}</SaveButton>
    </form>
  );
}
