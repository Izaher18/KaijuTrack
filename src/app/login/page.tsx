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
      <div className="skyline-bg absolute inset-0 -z-10" aria-hidden />
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[var(--panel)]/80 p-8 backdrop-blur-md">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
          Sign in
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-[var(--fog)]">
          Kaiju
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Shared password access. Feed the beast with today’s grind.
        </p>
        <LoginForm />
        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--fog)]">
            ← Back
          </Link>
        </p>
      </div>
    </div>
  );
}
