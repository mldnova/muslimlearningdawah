import type { ReactNode } from "react";

/**
 * Renders the simple formatting admins type into an article:
 *   blank line → new paragraph     ## Heading / ### Smaller heading
 *   - bullet point                  > quote (e.g. an ayah or hadith)
 *   **bold**   *italic*   [link text](https://…)   bare https:// links
 * Builds React elements (never raw HTML), so article text can't inject scripts.
 */
export function ArticleBody({ text }: { text: string }) {
  const blocks = text.replace(/\r\n/g, "\n").split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);

  return (
    <div className="space-y-5 text-[17px] leading-8 text-slate-700">
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        if (block.startsWith("### ")) {
          return (
            <h3 key={i} className="pt-2 font-serif text-xl font-semibold text-navy-950">
              {inline(block.slice(4))}
            </h3>
          );
        }
        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="pt-4 font-serif text-2xl font-semibold text-navy-950">
              {inline(block.slice(3))}
            </h2>
          );
        }
        if (lines.every((l) => /^[-*] /.test(l))) {
          return (
            <ul key={i} className="list-disc space-y-1.5 pl-6 marker:text-gold-500">
              {lines.map((l, j) => (
                <li key={j}>{inline(l.slice(2))}</li>
              ))}
            </ul>
          );
        }
        if (lines.every((l) => l.startsWith(">"))) {
          return (
            <blockquote key={i} className="border-l-4 border-gold-400 bg-navy-50 px-5 py-3 italic text-navy-900">
              {joinLines(lines.map((l) => l.replace(/^>\s?/, "")))}
            </blockquote>
          );
        }
        return <p key={i}>{joinLines(lines)}</p>;
      })}
    </div>
  );
}

function joinLines(lines: string[]) {
  return lines.map((line, i) => (
    <span key={i}>
      {i > 0 && <br />}
      {inline(line)}
    </span>
  ));
}

const INLINE = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s)]+)/g;

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(INLINE)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const [, bold, italic, label, href, bare] = m;
    const key = m.index;
    if (bold) out.push(<strong key={key} className="font-semibold text-navy-950">{bold}</strong>);
    else if (italic) out.push(<em key={key}>{italic}</em>);
    else
      out.push(
        <a
          key={key}
          href={href ?? bare}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-navy-700 underline decoration-gold-400 underline-offset-2 hover:text-navy-950"
        >
          {label ?? bare}
        </a>,
      );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** YouTube links become an embedded player; anything else (Instagram, Drive…) a button. */
export function ArticleVideo({ url }: { url: string }) {
  const id = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/)?.[1];
  if (id) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-navy-950">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title="Video"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700"
    >
      ▶ Watch the video
    </a>
  );
}
