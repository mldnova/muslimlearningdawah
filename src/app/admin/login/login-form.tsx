"use client";

import { useActionState } from "react";
import { login, type FormState } from "@/app/admin/actions";
import { FormMessage, inputClass } from "@/components/admin/ui";

export function LoginForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(login, undefined);

  return (
    <form action={action} className="mt-6 space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-navy-950">Password</span>
        <input type="password" name="password" required autoFocus autoComplete="current-password" className={inputClass} />
      </label>
      <FormMessage error={state?.error} />
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-navy-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
