"use client";

import { startTransition, useActionState, type FormEvent } from "react";
import { saveSettings, type FormState } from "@/app/admin/actions";
import { Field, FormMessage, SaveButton, inputClass } from "@/components/admin/ui";
import type { SiteSettings } from "@/lib/content-types";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveSettings, undefined);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    startTransition(() => action(form));
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Field label="WhatsApp announcement group link" hint="In WhatsApp: open the community → Invite via link → Copy.">
        <input
          type="url"
          name="whatsappCommunity"
          defaultValue={settings.whatsappCommunity}
          required
          className={inputClass}
        />
      </Field>
      <Field label="GoFundMe link" hint="Every Donate button on the site goes here.">
        <input type="url" name="goFundMe" defaultValue={settings.goFundMe} required className={inputClass} />
      </Field>
      <Field label="Instagram link">
        <input type="url" name="instagram" defaultValue={settings.instagram} required className={inputClass} />
      </Field>
      <Field label="Contact email">
        <input type="email" name="email" defaultValue={settings.email} required className={inputClass} />
      </Field>
      <FormMessage error={state?.error} success={state?.saved ? "Saved — the website is updated." : undefined} />
      <SaveButton pending={pending}>Save settings</SaveButton>
    </form>
  );
}
