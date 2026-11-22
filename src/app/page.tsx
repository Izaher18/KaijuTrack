import Link from "next/link";
import { connection } from "next/server";
import { Dragon } from "@/components/godzilla";
import { hasSession } from "@/lib/auth";

export default async function HomePage() {
  await connection();
  const signedIn = await hasSession();

  return (
    <div className="relative flex flex-1 flex-col">
      <div className="page-wash absolute inset-0 -z-10" aria-hidden />

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[var(--ink)]">
          Kaiju
        </span>
        <Link
          href={signedIn ? "/dashboard" : "/login"}
          className="text-sm text-[var(--muted)] transition hover:text-[var(--ink)]"
        >
          {signedIn ? "Dashboard" : "Sign in"}
        </Link>
      </header>

      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-10 px-6 pb-20 pt-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="font-[family-name:var(--font-display)] text-6xl font-semibold leading-[0.95] tracking-tight text-[var(--ink)] sm:text-7xl md:text-8xl">
            Kaiju
          </h1>
          <p className="mt-5 text-lg text-[var(--muted)] sm:text-xl">
            Hit your daily grind. Watch the monster rise.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link
              href={signedIn ? "/dashboard" : "/login"}
              className="btn-primary rounded-full px-6 py-3 text-sm font-semibold"
            >
              {signedIn ? "Open dashboard" : "Get started"}
            </Link>
            <a
              href="#ritual"
              className="rounded-full border border-[var(--line)] bg-white px-6 py-3 text-sm font-medium text-[var(--ink)] transition hover:border-[var(--ink)]/20"
            >
              How it works
            </a>
          </div>
        </div>

        <div className="w-full max-w-md">
          <Dragon stage={3} name="" />
        </div>
      </section>

      <section id="ritual" className="border-t border-[var(--line)] bg-white px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ink)]">
            Four goals. One beast.
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            LeetCode, system design, twenty applications, and a push on your
            GitHub project. Perfect days stack streaks. XP grows Godzilla from
            egg to apex.
          </p>
        </div>
      </section>
    </div>
  );
}
