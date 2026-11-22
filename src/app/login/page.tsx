import Link from "next/link";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { hasSession } from "@/lib/auth";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  await connection();
  if (await hasSession()) {
    redirect("/dashboard");
  }

  return (
    <div className="relative flex flex-1 items-center justify-center px-6 py-16">
      <div className="page-wash absolute inset-0 -z-10" aria-hidden />
      <div className="surface w-full max-w-md rounded-3xl p-8 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
          Sign in
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--ink)]">
          Kaiju
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Shared password access. Feed the beast with today’s grind.
        </p>
        <LoginForm />
        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--ink)]">
            ← Back
          </Link>
        </p>
      </div>
    </div>
  );
}
