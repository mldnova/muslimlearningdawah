import Link from "next/link";
import { deleteMessage } from "@/app/admin/actions";
import { ActionButton } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { submissionKinds, type SubmissionKind } from "@/lib/content-types";
import { listSubmissions, MissingSecretError } from "@/lib/storage";

const kindStyles: Record<SubmissionKind, string> = {
  contact: "bg-navy-100 text-navy-800",
  "event-idea": "bg-gold-100 text-gold-700",
  "sisters-group": "bg-pink-50 text-pink-700",
};

export default async function InboxPage({ searchParams }: PageProps<"/admin/inbox">) {
  await requireAdmin();
  const filter = (await searchParams).type;
  let all: Awaited<ReturnType<typeof listSubmissions>>;
  try {
    all = await listSubmissions();
  } catch (err) {
    if (!(err instanceof MissingSecretError)) throw err;
    return (
      <>
        <h1 className="font-serif text-3xl font-semibold text-navy-950">Inbox</h1>
        <p className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-6 text-sm text-amber-900">
          The inbox isn&apos;t set up yet: add <code>SUBMISSIONS_SECRET</code> in Vercel → Settings → Environment
          Variables, then redeploy. Form messages are still emailed to the team in the meantime.
        </p>
      </>
    );
  }
  const messages = typeof filter === "string" && filter in submissionKinds ? all.filter((m) => m.kind === filter) : all;

  return (
    <>
      <h1 className="font-serif text-3xl font-semibold text-navy-950">Inbox</h1>
      <p className="mt-1 text-sm text-slate-600">
        Everything sent through the website forms — contact messages, event ideas and sisters&apos;
        group requests. Delete a message once it&apos;s been handled.
      </p>

      <nav className="mt-6 flex flex-wrap gap-2 text-sm" aria-label="Filter messages">
        <FilterLink href="/admin/inbox" active={!filter} label={`All (${all.length})`} />
        {(Object.keys(submissionKinds) as SubmissionKind[]).map((kind) => (
          <FilterLink
            key={kind}
            href={`/admin/inbox?type=${kind}`}
            active={filter === kind}
            label={`${submissionKinds[kind]} (${all.filter((m) => m.kind === kind).length})`}
          />
        ))}
      </nav>

      {messages.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
          No messages here yet.
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {messages.map((m) => {
            const email = Object.values(m.fields).find((v) => /^\S+@\S+\.\S+$/.test(v));
            return (
              <li key={m.storageKey} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${kindStyles[m.kind]}`}>
                    {submissionKinds[m.kind]}
                  </span>
                  <time dateTime={m.receivedAt} className="text-xs text-slate-500">
                    {new Date(m.receivedAt).toLocaleString("en-US", {
                      timeZone: "America/New_York",
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </time>
                </div>
                <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[minmax(0,12rem)_1fr]">
                  {Object.entries(m.fields).map(([label, value]) => (
                    <div key={label} className="contents">
                      <dt className="font-medium text-slate-500">{label}</dt>
                      <dd className="whitespace-pre-wrap break-words text-navy-950">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4 flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 pt-3">
                  {email && (
                    <a
                      href={`mailto:${email}?subject=${encodeURIComponent(`Re: ${submissionKinds[m.kind]} — MLD`)}`}
                      className="rounded-full border border-slate-300 px-3.5 py-1.5 text-sm font-medium text-navy-900 transition hover:bg-navy-50"
                    >
                      Reply by email
                    </a>
                  )}
                  <form action={deleteMessage}>
                    <input type="hidden" name="key" value={m.storageKey} />
                    <ActionButton tone="danger" pendingText="Deleting…" confirm="Delete this message?">
                      Delete
                    </ActionButton>
                  </form>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

function FilterLink({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <Link
      href={href}
      className={`rounded-full px-3 py-1.5 font-medium transition ${
        active ? "bg-navy-900 text-white" : "border border-slate-300 bg-white text-navy-900 hover:bg-navy-50"
      }`}
    >
      {label}
    </Link>
  );
}
