"use client";

import { useState, type ChangeEvent } from "react";

/** Phone photos can be 5–10 MB; shrink them in the browser so uploads stay fast and under the size limit. */
async function shrinkImage(file: File, maxSide = 1600): Promise<File> {
  if (file.type === "image/gif") return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    // Browser can't decode it (e.g. some HEIC files) — send as-is and let the server explain.
    return file;
  }
}

export function ImageField({
  label,
  current,
  required = false,
}: {
  label: string;
  current?: string;
  required?: boolean;
}) {
  const [preview, setPreview] = useState(current);
  const [busy, setBusy] = useState(false);
  const [remove, setRemove] = useState(false);

  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    setBusy(true);
    const small = await shrinkImage(file);
    const files = new DataTransfer();
    files.items.add(small);
    input.files = files.files;
    setPreview(URL.createObjectURL(small));
    setRemove(false);
    setBusy(false);
  }

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-navy-950">{label}</span>
      <div className="flex flex-wrap items-start gap-4">
        <div className="flex h-36 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50">
          {preview && !remove ? (
            // eslint-disable-next-line @next/next/no-img-element -- local preview of an unsaved file
            <img src={preview} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="px-2 text-center text-xs text-slate-400">No image</span>
          )}
        </div>
        <div className="space-y-2 text-sm">
          <input
            type="file"
            name="image"
            accept="image/*"
            required={required}
            onChange={onChange}
            className="block text-sm text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-navy-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-navy-900 hover:file:bg-navy-200"
          />
          {busy && <p className="text-xs text-slate-500">Preparing image…</p>}
          <p className="text-xs text-slate-500">JPG or PNG. Large photos are resized automatically.</p>
          {current && (
            <label className="flex items-center gap-2 text-slate-600">
              <input
                type="checkbox"
                name="removeImage"
                checked={remove}
                onChange={(e) => setRemove(e.target.checked)}
              />
              Remove current image
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
