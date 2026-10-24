"use client";

import { startTransition, useActionState, useState, type FormEvent } from "react";
import { saveArticle, type FormState } from "@/app/admin/actions";
import { ImageField } from "@/components/admin/image-field";
import { Field, FormMessage, SaveButton, inputClass } from "@/components/admin/ui";
import { ArticleBody } from "@/components/article-body";
import type { Article } from "@/lib/content-types";

const formattingHelp = [
  ["Blank line", "starts a new paragraph"],
  ["## Heading", "section heading"],
  ["- item", "bullet point"],
  ["> text", "quote (ayah, hadith)"],
  ["**bold**", "bold"],
  ["*italic*", "italic"],
  ["[text](https://…)", "link"],
];

export function ArticleForm({ article }: { article?: Article }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveArticle, undefined);
  const [body, setBody] = useState(article?.body ?? "");
  const [tab, setTab] = useState<"write" | "preview">("write");

  // Submit manually so a validation error doesn't clear what was typed.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    startTransition(() => action(form));
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {article && <input type="hidden" name="id" value={article.id} />}
      <Field label="Title">
        <input name="title" defaultValue={article?.title} required className={inputClass} />
      </Field>
      <Field label="Short summary" hint="One or two sentences. Shown on the article cards and at the top of the article.">
        <textarea name="summary" defaultValue={article?.summary} required rows={2} className={inputClass} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Author (optional)">
          <input name="author" defaultValue={article?.author} placeholder="e.g. Sh. Hamad As-Surayh" className={inputClass} />
        </Field>
        <Field label="Date" hint="Newest articles show first. Defaults to today.">
          <input type="date" name="date" defaultValue={article?.date} className={inputClass} />
        </Field>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-sm font-medium text-navy-950">Article</span>
          <div className="flex rounded-full bg-slate-100 p-0.5 text-xs font-semibold">
            {(["write", "preview"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded-full px-3 py-1 capitalize transition ${
                  tab === t ? "bg-white text-navy-950 shadow-sm" : "text-slate-500 hover:text-navy-900"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        {/* The textarea stays mounted while previewing so its text is still submitted. */}
        <textarea
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={16}
          placeholder={"Write your article here.\n\n## A heading\n\nA paragraph with **bold** words and a [link](https://example.com)."}
          className={`${inputClass} font-mono text-[13px] leading-6 ${tab === "preview" ? "hidden" : ""}`}
        />
        {tab === "preview" && (
          <div className="min-h-64 rounded-xl border border-slate-200 bg-white p-6">
            {body.trim() ? <ArticleBody text={body} /> : <p className="text-sm text-slate-400">Nothing written yet.</p>}
          </div>
        )}
        <details className="mt-2 text-xs text-slate-500">
          <summary className="cursor-pointer font-medium text-navy-700">Formatting help</summary>
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 rounded-xl bg-slate-50 p-3">
            {formattingHelp.map(([code, meaning]) => (
              <div key={code} className="contents">
                <dt className="font-mono text-navy-900">{code}</dt>
                <dd>{meaning}</dd>
              </div>
            ))}
          </dl>
        </details>
      </div>

      <Field label="Video link (optional)" hint="YouTube links play right on the page; other links (Instagram, Drive) show a “Watch” button.">
        <input type="url" name="videoUrl" defaultValue={article?.videoUrl} placeholder="https://youtube.com/watch?v=…" className={inputClass} />
      </Field>
      <ImageField label="Cover image (optional)" current={article?.cover} />

      <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
        <input type="checkbox" name="published" defaultChecked={article?.published ?? true} className="mt-0.5" />
        <span>
          <span className="font-medium text-navy-950">Published</span>
          <span className="block text-slate-500">Untick to save as a draft that only admins can see.</span>
        </span>
      </label>

      <FormMessage error={state?.error} />
      <SaveButton pending={pending}>{article ? "Save changes" : "Save article"}</SaveButton>
    </form>
  );
}
