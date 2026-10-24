import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { SiteForm } from "@/components/site-form";
import { getSettings } from "@/lib/content";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Muslim Learning & Da'wah.",
};

export default async function ContactPage() {
  const settings = await getSettings();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="We'd love to hear from you"
            description="Questions about events, partnerships, media, or volunteering — send a message or reach us on social."
          />
          <ul className="mt-8 space-y-4 text-sm">
            <li>
              <span className="font-semibold text-navy-950">Email</span>
              <br />
              <a href={`mailto:${settings.email}`} className="text-navy-700 hover:underline">
                {settings.email}
              </a>
            </li>
            <li>
              <span className="font-semibold text-navy-950">Instagram</span>
              <br />
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-700 hover:underline"
              >
                @mldnova
              </a>
            </li>
            <li>
              <span className="font-semibold text-navy-950">WhatsApp announcements</span>
              <br />
              <a
                href={settings.whatsappCommunity}
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-700 hover:underline"
              >
                Join the community group
              </a>
            </li>
            <li>
              <span className="font-semibold text-navy-950">Region</span>
              <br />
              {site.location}
            </li>
          </ul>
          <a
            href="#sisters"
            className="mt-8 block rounded-2xl border-l-4 border-gold-400 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <span className="font-serif text-lg font-semibold text-navy-950">Sisters&apos; WhatsApp group</span>
            <span className="mt-1 block text-sm text-slate-600">
              Sisters&apos; events (like Salaams &amp; Sips) are shared in a private group. Request to join below →
            </span>
          </a>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SiteForm
            kind="contact"
            fallbackEmail={settings.email}
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "phone", label: "Phone (optional)", type: "tel" },
              {
                name: "message",
                label: "Message",
                type: "textarea",
                required: true,
                placeholder: "How can we help?",
              },
            ]}
          />
        </div>
      </div>

      <section id="sisters" className="mt-20 scroll-mt-24 grid gap-10 rounded-3xl bg-navy-50 p-6 sm:p-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="For sisters"
            title="Join the sisters' WhatsApp group"
            description="Our sisters' group shares event locations, halaqah reminders, and sisterhood gatherings. To keep it a safe space, a sister on our team reviews each request and sends you the invite."
          />
          <ul className="mt-6 list-disc space-y-1 pl-5 text-sm text-slate-600">
            <li>For sisters only</li>
            <li>We&apos;ll message you on WhatsApp at the number you give</li>
            <li>Usually within a few days, in shaa Allah</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SiteForm
            kind="sisters-group"
            fallbackEmail={settings.email}
            submitLabel="Request to join"
            successMessage="JazakAllah khair — we received your request. A sister from our team will send you the invite soon, in shaa Allah."
            fields={[
              { name: "name", label: "Full name", required: true },
              { name: "whatsapp", label: "WhatsApp number", type: "tel", required: true, placeholder: "(571) 555-0100" },
              { name: "email", label: "Email (optional)", type: "email" },
              {
                name: "about",
                label: "How did you hear about us? (optional)",
                type: "textarea",
                rows: 3,
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
