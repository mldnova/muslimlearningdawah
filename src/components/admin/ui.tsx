"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-navy-950 placeholder:text-slate-400 outline-none transition focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-navy-950">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

export function FormMessage({ error, success }: { error?: string; success?: string }) {
  if (error) return <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>;
  if (success) return <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{success}</p>;
  return null;
}

export function SaveButton({ pending, children }: { pending: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex rounded-full bg-navy-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700 disabled:opacity-60"
    >
      {pending ? "Saving…" : children}
    </button>
  );
}

/** Submit button for small server-action forms; asks first when `confirm` is set. */
export function ActionButton({
  children,
  pendingText,
  confirm,
  tone = "default",
}: {
  children: ReactNode;
  pendingText: string;
  confirm?: string;
  tone?: "default" | "danger";
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault();
      }}
      className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition disabled:opacity-60 ${
        tone === "danger"
          ? "text-red-700 hover:bg-red-50"
          : "border border-slate-300 text-navy-900 hover:bg-navy-50"
      }`}
    >
      {pending ? pendingText : children}
    </button>
  );
}
