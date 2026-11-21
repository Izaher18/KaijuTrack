import Link from "next/link";
import { connection } from "next/server";
import { Godzilla } from "@/components/godzilla";
import { hasSession } from "@/lib/auth";

export default async function HomePage() {
  await connection();
  const signedIn = await hasSession();

  return (
    <div className="relative flex flex-1 flex-col">
      <div className="skyline-bg absolute inset-0 -z-10" aria-hidden />

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <span className="font-[family-name:var(--font-display)] text-lg tracking-wide text-[var(--fog)]">
          Kaiju
        </span>
        <Link
          href={signedIn ? "/dashboard" : "/login"}
          className="text-sm text-[var(--muted)] transition hover:text-[var(--fog)]"
        >
          {signedIn ? "Dashboard" : "Sign in"}
        </Link>
      </header>

      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 pb-16 pt-6 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
        <div className="max-w-xl">
          <h1 className="font-[family-name:var(--font-display)] text-6xl leading-[0.95] tracking-tight text-[var(--fog)] sm:text-7xl md:text-8xl">
            Kaiju
          </h1>
          <p className="mt-5 text-lg text-[var(--muted)] sm:text-xl">
            Hit your daily grind. Watch the monster rise.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link
              href={signedIn ? "/dashboard" : "/login"}
              className="rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#0b1408] transition hover:brightness-110"
            >
              {signedIn ? "Open dashboard" : "Enter the lair"}
            </Link>
            <a
              href="#ritual"
              className="rounded-xl border border-white/15 px-5 py-3 text-sm text-[var(--fog)] transition hover:border-[var(--accent)]/40"
            >
              The daily ritual
            </a>
          </div>
        </div>

        <div className="mt-12 lg:mt-0">
          <Godzilla stage={3} name="Your companion" />
        </div>
      </section>

      <section
        id="ritual"
        className="border-t border-white/5 bg-[var(--ink)]/80 px-6 py-16"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--fog)]">
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
