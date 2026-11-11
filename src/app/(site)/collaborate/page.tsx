import type { Metadata } from "next";
import { EventRequestForms } from "@/components/event-request-forms";
import { SectionHeading } from "@/components/section-heading";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Collaborate",
  description:
    "Partner with MLD on a conference, program, or da'wah training for your community — or suggest an event idea.",
};

export default async function CollaboratePage() {
  const settings = await getSettings();
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Work with us"
        title="Collaborate with us"
        description="Partner with MLD on an event for your community, or send us an idea for an event you'd like to see."
      />
      <EventRequestForms fallbackEmail={settings.email} />
    </div>
  );
}
