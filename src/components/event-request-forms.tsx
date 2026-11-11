"use client";

import { useState } from "react";
import { SiteForm } from "@/components/site-form";

const tabs = [
  { id: "collaborate", label: "Collaborate" },
  { id: "suggest", label: "Suggest an idea" },
] as const;

/** Collaboration request and event idea forms, one at a time behind a toggle */
export function EventRequestForms({ fallbackEmail }: { fallbackEmail: string }) {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("collaborate");

  return (
    <div className="mt-10">
      <div role="tablist" aria-label="Request type" className="inline-flex rounded-full bg-navy-100 p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition sm:px-5 ${
              tab === t.id ? "bg-navy-900 text-white shadow-sm" : "text-navy-800 hover:text-navy-950"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        {tab === "collaborate" ? (
          <>
            <p className="mb-6 text-sm leading-relaxed text-slate-600">
              Masjids, MSAs, and organizations anywhere in the country can partner with MLD on conferences,
              programs, da&apos;wah tables, and da&apos;wah training. Tell us what you have in mind and our team will
              get back to you, in shaa Allah.
            </p>
            <SiteForm
              key="collaborate"
              kind="booking"
              fallbackEmail={fallbackEmail}
              submitLabel="Send collaboration request"
              successMessage="JazakAllah khair — we received your request and will reach out soon to talk it through, in shaa Allah."
              fields={[
                { name: "name", label: "Your name", required: true },
                { name: "organization", label: "Masjid, MSA, or organization", required: true },
                { name: "email", label: "Email", type: "email", required: true },
                { name: "phone", label: "Phone (optional)", type: "tel" },
                {
                  name: "event_type",
                  label: "Type of event",
                  type: "select",
                  required: true,
                  options: [
                    "Lecture / halaqah",
                    "Conference",
                    "Da'wah training",
                    "Da'wah table",
                    "Youth program",
                    "Sisters' program",
                    "Other",
                  ],
                },
                { name: "date", label: "Preferred date(s)", required: true, placeholder: "e.g. Saturday, March 14, or any weekend in April" },
                { name: "location", label: "City and venue", required: true, placeholder: "e.g. Fairfax, VA — Hawa Center" },
                {
                  name: "attendance",
                  label: "Expected attendance",
                  type: "select",
                  options: ["Under 50", "50–150", "150–300", "300+", "Not sure yet"],
                },
                {
                  name: "details",
                  label: "What would you like to collaborate on?",
                  type: "textarea",
                  rows: 5,
                  required: true,
                  placeholder: "The event or program you have in mind, who it's for, and how you'd like to work together…",
                },
              ]}
            />
          </>
        ) : (
          <>
            <p className="mb-6 text-sm leading-relaxed text-slate-600">
              Is there a topic you want covered, a speaker you&apos;d love to hear, or a program our community needs?
              Our team reviews every idea when planning upcoming events.
            </p>
            <SiteForm
              key="suggest"
              kind="event-idea"
              fallbackEmail={fallbackEmail}
              submitLabel="Send my idea"
              successMessage="JazakAllah khair — we received your idea and will consider it as we plan upcoming events, in shaa Allah."
              fields={[
                { name: "name", label: "Your name", required: true },
                { name: "contact", label: "Email or phone (optional)", placeholder: "In case we have questions" },
                {
                  name: "event_type",
                  label: "Type of event",
                  type: "select",
                  required: true,
                  options: [
                    "Lecture / halaqah",
                    "Q&A session",
                    "Sisters' program",
                    "Brothers' program",
                    "Social / sports",
                    "Trip",
                    "Conference",
                    "Other",
                  ],
                },
                {
                  name: "idea",
                  label: "Topic or idea",
                  required: true,
                  placeholder: "e.g. Navigating doubts in college",
                },
                { name: "speaker", label: "Suggested speaker (optional)" },
                {
                  name: "details",
                  label: "Why this would benefit the community",
                  type: "textarea",
                  rows: 5,
                  placeholder: "Who it's for, why now, any details or ideas for the format…",
                },
                {
                  name: "help",
                  label: "Would you like to help make it happen?",
                  type: "select",
                  options: ["Yes, I'd like to help", "Maybe", "No, just sharing the idea"],
                },
              ]}
            />
          </>
        )}
      </div>
    </div>
  );
}
