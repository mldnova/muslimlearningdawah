import Image from "next/image";
import { LoginForm } from "@/app/admin/login/login-form";
import { adminConfigured } from "@/lib/auth";

export default function LoginPage() {
  return (
    <div className="bg-pattern flex min-h-full flex-1 items-center justify-center bg-navy-950 px-4 py-16">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl shadow-black/30">
        <Image src="/mld-logo.jpg" alt="" width={56} height={56} className="mx-auto h-14 w-14 rounded-full" />
        <h1 className="mt-4 text-center font-serif text-2xl font-semibold text-navy-950">MLD Admin</h1>
        <p className="mt-1 text-center text-sm text-slate-600">Update events, photos and links.</p>
        {adminConfigured() ? (
          <LoginForm />
        ) : (
          <p className="mt-6 rounded-xl bg-gold-100 px-4 py-3 text-sm text-gold-700">
            Admin isn&apos;t set up yet. Add an <code>ADMIN_PASSWORD</code> environment variable, then redeploy.
          </p>
        )}
      </div>
    </div>
  );
}
