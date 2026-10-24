import { SettingsForm } from "@/components/admin/settings-form";
import { requireAdmin } from "@/lib/auth";
import { loadContent } from "@/lib/content";

export default async function AdminSettingsPage() {
  await requireAdmin();
  const { settings } = await loadContent();

  return (
    <>
      <h1 className="font-serif text-3xl font-semibold text-navy-950">Links & contact</h1>
      <p className="mt-1 text-sm text-slate-600">These links are used in buttons across the whole website.</p>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <SettingsForm settings={settings} />
      </div>
    </>
  );
}
