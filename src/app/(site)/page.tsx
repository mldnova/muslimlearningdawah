import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { EventCard } from "@/components/event-card";
import { PhotoStrip } from "@/components/photo-strip";
import { SectionHeading } from "@/components/section-heading";
import { ZoomJoin } from "@/components/zoom-join";
import { getArticles, getEvents, getSettings } from "@/lib/content";
import { donateUrl, formatDate, weekday } from "@/lib/format";
import { about, carouselPhotos, donationPackages, site, speakers } from "@/lib/site-config";

export default async function HomePage() {
  const [{ upcoming }, articles, settings] = await Promise.all([getEvents(), getArticles(), getSettings()]);
  // Feature the next one-off event; fall back to a weekly program.
  const nextEvent = upcoming.find((e) => !e.repeatsWeekly) ?? upcoming[0];

  return (
    <>
      {/* Hero */}
      <section className="bg-pattern relative overflow-hidden bg-navy-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(216,174,82,0.14),transparent_55%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-300">
              Youth · Community · Da&apos;wah
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
              Learn, grow, and stand firm upon the deen.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy-100">{site.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/donate"
                className="rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-navy-950 transition hover:bg-gold-300"
              >
                Support our work
              </Link>
              <Link
                href="/events"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                See events
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <a
                href={settings.whatsappCommunity}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 px-4 py-2 text-navy-50 transition hover:bg-white/20"
              >
                Join WhatsApp announcements
              </a>
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 px-4 py-2 text-navy-50 transition hover:bg-white/20"
              >
                Follow @mldnova
              </a>
            </div>
          </div>

          {nextEvent?.image && (
            <Link
              href={`/events/${nextEvent.id}`}
              className="group relative mx-auto block w-full max-w-sm overflow-hidden rounded-3xl border border-white/15 bg-navy-900 shadow-2xl shadow-black/40"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={nextEvent.image}
                  alt={`${nextEvent.title} flyer`}
                  fill
                  loading="eager"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width:1024px) 90vw, 400px"
                />
              </div>
              <div className="border-t border-white/10 bg-navy-950/95 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">Next up</p>
                <p className="mt-1 font-serif text-lg font-semibold text-white">{nextEvent.title}</p>
                <p className="mt-0.5 text-sm text-navy-100">
                  {nextEvent.repeatsWeekly ? `Every ${weekday(nextEvent.date)}` : formatDate(nextEvent.date, "short")}
                  {nextEvent.time && !nextEvent.repeatsWeekly ? ` · ${nextEvent.time}` : ""}
                </p>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Upcoming events */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Calendar" title="Upcoming events" />
          <Link href="/events" className="text-sm font-semibold text-navy-700 hover:text-navy-950">
            All events →
          </Link>
        </div>
        {upcoming.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.slice(0, 3).map((event) => (
              <EventCard key={event.id} event={event} upcoming />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-navy-200 bg-white p-8 text-center">
            <p className="font-serif text-xl font-semibold text-navy-950">New events are on the way</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
              We announce programs first in our WhatsApp community and on Instagram — join so you don&apos;t miss
              the next one.
            </p>
            <a
              href={settings.whatsappCommunity}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700"
            >
              Join WhatsApp announcements
            </a>
          </div>
        )}
      </section>

      {/* About */}
      <section className="border-y border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="About MLD" title="Based in the DMV, serving communities across the country" description={about.mission} />
            <Link href="/about" className="text-sm font-semibold text-navy-700 hover:text-navy-950">
              Our story →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.focus.map((item) => (
              <div key={item.title} className="rounded-2xl border-t-4 border-gold-400 bg-navy-50 p-6">
                <h3 className="font-serif text-xl font-semibold text-navy-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Featured speakers"
            title="Scholars & teachers at our programs"
            description="Our events regularly feature trusted voices from our community and visiting scholars."
          />
          <Link href="/speakers" className="text-sm font-semibold text-navy-700 hover:text-navy-950">
            All speakers →
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {speakers.map((sp) => (
            <li key={sp.name}>
              <Link href="/speakers" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-navy-100">
                  <Image
                    src={sp.photo}
                    alt={sp.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    style={{ objectPosition: sp.focus }}
                    sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 220px"
                  />
                </div>
                <h3 className="mt-3 font-serif text-base font-semibold text-navy-950 group-hover:text-navy-700">
                  {sp.name}
                </h3>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-gold-600">{sp.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Recent articles */}
      {articles.length > 0 && (
        <section className="border-t border-slate-200 bg-white py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Read & watch" title="Recent articles" />
              <Link href="/articles" className="text-sm font-semibold text-navy-700 hover:text-navy-950">
                All articles →
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.slice(0, 3).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Instagram */}
      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center">
          <SectionHeading
            eyebrow="Photos & videos"
            title="See our events on Instagram"
            description="Recaps, reels, and flyers from every program are posted on @mldnova."
          />
          <a
            href={settings.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-700"
          >
            Follow @mldnova
          </a>
        </div>
        <div className="mt-10">
          <PhotoStrip photos={carouselPhotos} />
        </div>
      </section>

      {/* Give */}
      <section className="bg-pattern bg-navy-900 py-16 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            align="center"
            theme="dark"
            eyebrow="Give"
            title="Fund Qurans, conferences, and community work"
            description="Choose a package or give any amount. Donations are processed securely through our GoFundMe campaign."
          />
          <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {donationPackages.map((pkg) => (
              <a
                key={pkg.id}
                href={donateUrl(settings.goFundMe, pkg.amount)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/15 bg-white/5 p-5 text-center transition hover:border-gold-300/60 hover:bg-white/10"
              >
                <p className="font-serif text-lg font-semibold">{pkg.title}</p>
                <p className="mt-2 text-2xl font-semibold text-gold-300">${pkg.amount.toLocaleString("en-US")}+</p>
              </a>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/donate"
              className="inline-flex rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-navy-950 transition hover:bg-gold-300"
            >
              View all giving options
            </Link>
          </div>
        </div>
      </section>

      {/* Book or suggest */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h2 className="font-serif text-3xl font-semibold text-navy-950">Bring MLD to your community</h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          Book one of our speakers, a conference, or da&apos;wah training for your masjid, MSA, or organization — or
          send us an idea for an event you&apos;d like to see, in shaa Allah.
        </p>
        <Link
          href="/book-event"
          className="mt-6 inline-flex rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-700"
        >
          Book or suggest an event
        </Link>
      </section>

      {/* Weekly Q&A Zoom */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <ZoomJoin title="Join Shaykh Hamad's weekly Q&A on Zoom" />
      </section>
    </>
  );
}
