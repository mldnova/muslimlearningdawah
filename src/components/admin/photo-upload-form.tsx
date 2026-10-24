"use client";

import { startTransition, useActionState, type FormEvent } from "react";
import { addPhoto, type FormState } from "@/app/admin/actions";
import { ImageField } from "@/components/admin/image-field";
import { Field, FormMessage, SaveButton, inputClass } from "@/components/admin/ui";

export function PhotoUploadForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(addPhoto, undefined);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    startTransition(() => action(form));
  }

  return (
    // A new key after each upload clears the form for the next photo.
    <form key={state?.savedAt ?? 0} onSubmit={onSubmit} className="space-y-5">
      <ImageField label="Photo or flyer" required />
      <div className="grid gap-5 sm:grid-cols-[2fr_1fr]">
        <Field label="Caption" hint="Short description, e.g. “Salaams & Sips — Oct 2026”.">
          <input name="caption" required className={inputClass} />
        </Field>
        <Field label="Date (optional)" hint="Newest photos show first. Defaults to today.">
          <input type="date" name="date" className={inputClass} />
        </Field>
      </div>
      <FormMessage error={state?.error} success={state?.saved ? "Photo added to the gallery." : undefined} />
      <SaveButton pending={pending}>Upload photo</SaveButton>
    </form>
  );
}
