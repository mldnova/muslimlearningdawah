import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { SiteForm } from "@/components/site-form";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Suggest an Event",
  description: "Have an idea for an MLD event? Suggest a topic, speaker, or program for our community.",
};

export default async function SuggestEventPage() {
  const settings = await getSettings();
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Your ideas"
        title="Suggest an event"
        description="Is there a topic you want covered, a speaker you'd love to hear, or a program our community needs? Tell us — our team reviews every idea when planning upcoming events."
      />

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <SiteForm
          kind="event-idea"
          fallbackEmail={settings.email}
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
      </div>
    </div>
  );
}
