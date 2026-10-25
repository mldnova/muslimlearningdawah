import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { getSettings } from "@/lib/content";
import { donateUrl } from "@/lib/format";
import { donationPackages, site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support Muslim Learning & Da'wah — Qurans, conferences, and general fund.",
};

export default async function DonatePage() {
  const settings = await getSettings();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Support MLD"
        title="Give with intention"
        description="The easiest way to donate today is through our official GoFundMe. Pick a package below — you'll be taken to GoFundMe with a suggested amount. Add a note (e.g. “Box of Qurans”) so we know how to allocate your gift."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {donationPackages.map((pkg) => (
          <article
            key={pkg.id}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-navy-950/5"
          >
            <h2 className="font-serif text-2xl font-semibold text-navy-950">{pkg.title}</h2>
            <p className="mt-1 text-3xl font-semibold text-navy-800">${pkg.amount}</p>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{pkg.description}</p>
            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500">
              {pkg.impact}
            </p>
            <a
              href={donateUrl(settings.goFundMe, pkg.amount)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex justify-center rounded-full bg-gold-400 px-5 py-3 text-sm font-semibold text-navy-950 transition hover:bg-gold-300"
            >
              Donate ${pkg.amount} on GoFundMe
            </a>
          </article>
        ))}
      </div>

      <section className="mt-12 bg-pattern rounded-2xl bg-navy-900 px-6 py-10 text-white sm:px-10">
        <h2 className="font-serif text-2xl font-semibold text-white">Custom amount</h2>
        <p className="mt-2 max-w-2xl text-navy-100">
          Give any amount that fits your budget. Every contribution helps us run programs, bring speakers,
          and serve youth in the DMV.
        </p>
        <a
          href={settings.goFundMe}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-navy-950 transition hover:bg-gold-300"
        >
          Open GoFundMe
        </a>
      </section>

      <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="font-serif text-xl font-semibold text-navy-950">How giving works</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-600">
          <li>You donate securely on GoFundMe (card, Apple Pay, etc.).</li>
          <li>Mention the package name in the optional note if you chose the Box of Qurans or Conference Sponsor.</li>
          <li>{site.shortName} uses funds for programs, venues, materials, and dawah as described.</li>
          <li>Questions? Email <a href={`mailto:${settings.email}`} className="font-medium underline">{settings.email}</a>.</li>
        </ol>
        <p className="mt-6 text-sm text-slate-500">
          Want a dedicated donate button on your site later? We can add Stripe Payment Links or PayPal when
          you&apos;re ready — GoFundMe is the fastest way to start accepting gifts today.
        </p>
      </section>

      <p className="mt-8 text-center text-sm text-slate-500">
        <Link href="/contact" className="font-semibold text-navy-700 hover:underline">
          Contact us
        </Link>{" "}
        for zakat questions or large sponsorships.
      </p>
    </div>
  );
}
