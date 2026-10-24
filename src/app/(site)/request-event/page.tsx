import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { SiteForm } from "@/components/site-form";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Request an Event",
  description: "Invite Muslim Learning & Da'wah to your masjid, MSU, or community center.",
};

export default async function RequestEventPage() {
  const settings = await getSettings();
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Host MLD"
        title="Request an event"
        description="Tell us about your community, preferred dates, and the type of program you're looking for — youth lecture, sisters' halaqah, conference, and more."
      />

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <SiteForm
          kind="event-request"
          fallbackEmail={settings.email}
          submitLabel="Submit request"
          successMessage="Thank you — we received your request and will reach out soon, in shaa Allah."
          fields={[
            { name: "organization", label: "Masjid / organization name", required: true },
            { name: "contact_name", label: "Contact name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone", type: "tel", required: true },
            { name: "city", label: "City / state", required: true },
            {
              name: "event_type",
              label: "Type of event",
              type: "select",
              required: true,
              options: [
                "Youth lecture",
                "Sisters' program",
                "Brothers' halaqah",
                "Full-day conference",
                "New Muslim / dawah",
                "Other",
              ],
            },
            {
              name: "preferred_dates",
              label: "Preferred date(s)",
              placeholder: "e.g. March 2026, flexible",
            },
            {
              name: "audience",
              label: "Expected audience",
              placeholder: "e.g. 80 youth, ages 14–25",
            },
            {
              name: "details",
              label: "Additional details",
              type: "textarea",
              required: true,
              rows: 6,
              placeholder: "Venue, speaker preferences, budget, etc.",
            },
          ]}
        />
      </div>

    </div>
  );
}
