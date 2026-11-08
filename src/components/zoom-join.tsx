import { weeklyQa } from "@/lib/site-config";

/** Zoom link and etiquette for the weekly Q&A with Shaykh Hamad */
export function ZoomJoin({ title = "Join the weekly Q&A on Zoom" }: { title?: string }) {
  return (
    <div className="bg-pattern rounded-2xl bg-navy-900 p-6 text-white sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-300">Live with Shaykh Hamad</p>
      <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">{title}</h2>
      <p className="mt-2 text-sm text-navy-100">
        Meeting ID: <span className="font-semibold text-white">{weeklyQa.meetingId}</span>
      </p>
      <h3 className="mt-6 text-sm font-semibold text-gold-300">Before you join</h3>
      <ul className="mt-2 space-y-2 text-sm text-navy-50">
        {weeklyQa.rules.map((rule) => (
          <li key={rule} className="flex gap-2">
            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-400" />
            {rule}
          </li>
        ))}
      </ul>
      <a
        href={weeklyQa.zoomUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-navy-950 transition hover:bg-gold-300"
      >
        Join on Zoom
      </a>
    </div>
  );
}
