"use server";

import { randomUUID } from "node:crypto";
import { submissionKinds, type SubmissionKind } from "@/lib/content-types";
import { saveSubmission } from "@/lib/storage";

const MAX_FIELDS = 20;
const MAX_LENGTH = 5000;

/** Saves a website form to the admin inbox (/admin/inbox). Keys are the field labels people saw. */
export async function submitForm(
  kind: SubmissionKind,
  fields: Record<string, string>,
): Promise<{ ok: boolean; error?: string }> {
  if (!(kind in submissionKinds)) return { ok: false, error: "This form isn't recognised." };

  const clean: Record<string, string> = {};
  for (const [label, value] of Object.entries(fields).slice(0, MAX_FIELDS)) {
    if (typeof value !== "string") continue;
    const text = value.trim().slice(0, MAX_LENGTH);
    if (text) clean[label.slice(0, 80)] = text;
  }
  if (Object.keys(clean).length === 0) return { ok: false, error: "Please fill in the form first." };

  await saveSubmission({ id: randomUUID(), kind, receivedAt: new Date().toISOString(), fields: clean });
  return { ok: true };
}
