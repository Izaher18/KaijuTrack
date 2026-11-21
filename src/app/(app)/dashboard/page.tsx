import { connection } from "next/server";
import { DragonStub, Godzilla } from "@/components/godzilla";
import { GoalTracker } from "@/components/goal-tracker";
import { XpBar } from "@/components/xp-bar";
import { syncCreatureXp } from "@/lib/creature";
import { getCurrentStreak, getTodayLog } from "@/lib/logs";
import { stageMeta } from "@/lib/xp";

export default async function DashboardPage() {
  await connection();

  const [creature, today, streak] = await Promise.all([
    syncCreatureXp(),
    getTodayLog(),
    getCurrentStreak(),
  ]);

  const stageName = stageMeta(creature.stage).name;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
      <section className="rounded-3xl border border-white/5 bg-[var(--panel)]/55 p-6 backdrop-blur-sm sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
              Companion
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--fog)] sm:text-4xl">
              {creature.name}
            </h1>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {creature.type === "GODZILLA" ? "Godzilla" : "Dragon"} ·{" "}
              {stageName}
            </p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-[var(--panel-strong)]/80 px-4 py-3 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              Streak
            </p>
            <p className="font-[family-name:var(--font-display)] text-3xl text-[var(--accent)]">
              {streak}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          {creature.type === "GODZILLA" ? (
            <Godzilla stage={creature.stage} name={creature.name} />
          ) : (
            <DragonStub name={creature.name} />
          )}
        </div>

        <div className="mt-6">
          <XpBar totalXp={creature.totalXp} />
        </div>
      </section>

      <section className="rounded-3xl border border-white/5 bg-[var(--panel)]/55 p-6 backdrop-blur-sm sm:p-8">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
          Today
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--fog)]">
          Daily grind
        </h2>
        <p className="mt-1 mb-6 text-sm text-[var(--muted)]">
          Log progress. Your kaiju feeds on consistency.
        </p>
        <GoalTracker
          initial={{
            leetcodeDone: today?.leetcodeDone ?? false,
            systemDesignDone: today?.systemDesignDone ?? false,
            applicationsCount: today?.applicationsCount ?? 0,
            projectDone: today?.projectDone ?? false,
            projectNote: today?.projectNote ?? null,
            projectMinutes: today?.projectMinutes ?? null,
            xpEarned: today?.xpEarned ?? 0,
            perfectDay: today?.perfectDay ?? false,
          }}
        />
      </section>
    </div>
  );
}
