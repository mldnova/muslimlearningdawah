import Image from "next/image";
import type { speakers } from "@/lib/site-config";

type Speaker = (typeof speakers)[number];

export function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-[4/5] bg-navy-100">
        <Image
          src={speaker.photo}
          alt={speaker.name}
          fill
          className="object-cover"
          style={{ objectPosition: speaker.focus }}
          sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 360px"
        />
      </div>
      <div className="flex-1 p-6">
        <h2 className="font-serif text-xl font-semibold text-navy-950">{speaker.name}</h2>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gold-600">{speaker.title}</p>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
          {speaker.highlights.map((point) => (
            <li key={point} className="flex gap-2">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-500" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
