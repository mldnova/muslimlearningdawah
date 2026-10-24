import Image from "next/image";
import { deletePhoto, updatePhoto } from "@/app/admin/actions";
import { PhotoUploadForm } from "@/components/admin/photo-upload-form";
import { ActionButton, inputClass } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { loadContent } from "@/lib/content";

export default async function AdminGalleryPage() {
  await requireAdmin();
  const gallery = [...(await loadContent()).gallery].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <h1 className="font-serif text-3xl font-semibold text-navy-950">Gallery</h1>
      <p className="mt-1 text-sm text-slate-600">
        Photos and flyers on the Gallery page. The newest four also show on the home page.
      </p>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="font-serif text-xl font-semibold text-navy-950">Add a photo</h2>
        <div className="mt-4">
          <PhotoUploadForm />
        </div>
      </section>

      <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
        On the site ({gallery.length})
      </h2>
      <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((photo) => (
          <li key={photo.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="relative aspect-[4/5] bg-navy-100">
              <Image src={photo.src} alt={photo.caption} fill className="object-cover" sizes="(max-width:640px) 100vw, 33vw" />
            </div>
            <form action={updatePhoto} className="space-y-2 p-3">
              <input type="hidden" name="id" value={photo.id} />
              <input name="caption" defaultValue={photo.caption} required aria-label="Caption" className={inputClass} />
              <div className="flex items-center gap-2">
                <input type="date" name="date" defaultValue={photo.date} required aria-label="Date" className={inputClass} />
                <ActionButton pendingText="Saving…">Save</ActionButton>
              </div>
            </form>
            <form action={deletePhoto} className="border-t border-slate-100 px-3 py-2 text-right">
              <input type="hidden" name="id" value={photo.id} />
              <ActionButton tone="danger" pendingText="Deleting…" confirm="Delete this photo from the gallery?">
                Delete photo
              </ActionButton>
            </form>
          </li>
        ))}
      </ul>
    </>
  );
}
