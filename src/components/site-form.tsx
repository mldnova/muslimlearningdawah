"use client";

import { FormEvent, useState } from "react";
import { submitForm } from "@/app/(site)/actions";
import { submissionKinds, type SubmissionKind } from "@/lib/content-types";
import { forms } from "@/lib/site-config";

type Props = {
  /** Which inbox category this lands in */
  kind: SubmissionKind;
  fields: Array<{
    name: string;
    label: string;
    type?: "text" | "email" | "tel" | "textarea" | "select" | "url";
    required?: boolean;
    placeholder?: string;
    options?: string[];
    rows?: number;
  }>;
  submitLabel?: string;
  successMessage?: string;
  /** Offered if sending fails */
  fallbackEmail: string;
};

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-navy-950 placeholder:text-slate-400 outline-none transition focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20";

/**
 * Every submission is saved to the admin inbox (/admin/inbox). When a Web3Forms key is set,
 * a copy is also emailed to the address the key was created with.
 */
export function SiteForm({
  kind,
  fields,
  submitLabel = "Send message",
  successMessage = "Thank you — we received your message and will respond soon, in shaa Allah.",
  fallbackEmail,
}: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return; // filled in by spam bots only

    const byLabel: Record<string, string> = {};
    for (const field of fields) byLabel[field.label] = String(data.get(field.name) ?? "");

    const saved = await submitForm(kind, byLabel).catch(() => ({ ok: false, error: undefined }));
    if (!saved.ok) {
      setStatus("error");
      setError(saved.error ?? `Something went wrong. Please try again or email us at ${fallbackEmail}.`);
      return;
    }

    if (forms.accessKey) {
      data.append("access_key", forms.accessKey);
      data.append("subject", `MLD Website — ${submissionKinds[kind]}`);
      // Already saved to the inbox, so a failed email doesn't need to bother the visitor.
      await fetch("https://api.web3forms.com/submit", { method: "POST", body: data }).catch(() => {});
    }

    setStatus("success");
    form.reset();
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-navy-200 bg-navy-50 p-6 text-navy-900">
        {successMessage}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="mb-1.5 block text-sm font-medium text-navy-950">
            {field.label}
            {field.required && <span className="text-red-600"> *</span>}
          </label>
          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              required={field.required}
              rows={field.rows ?? 5}
              placeholder={field.placeholder}
              className={inputClass}
            />
          ) : field.type === "select" && field.options ? (
            <select
              id={field.name}
              name={field.name}
              required={field.required}
              className={inputClass}
            >
              <option value="">Select…</option>
              {field.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type ?? "text"}
              required={field.required}
              placeholder={field.placeholder}
              className={inputClass}
            />
          )}
        </div>
      ))}
      {status === "error" && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-700 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
