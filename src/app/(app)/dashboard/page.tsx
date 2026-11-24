import { connection } from "next/server";
import { Dragon, Godzilla } from "@/components/godzilla";
import { GoalTracker } from "@/components/goal-tracker";
import { Heatmap } from "@/components/heatmap";
import { WeeklyStats } from "@/components/weekly-stats";
import { XpBar } from "@/components/xp-bar";
import { syncCreatureXp } from "@/lib/creature";
import { getCurrentStreak, getTodayLog } from "@/lib/logs";
import { getDashboardStats } from "@/lib/stats";
import { stageMeta } from "@/lib/xp";

export default async function DashboardPage() {
  await connection();

  const [creature, today, streak, stats] = await Promise.all([
    syncCreatureXp(),
    getTodayLog(),
    getCurrentStreak(),
    getDashboardStats(),
  ]);

  const stageName = stageMeta(creature.stage).name;

  return (
    <div className="space-y-12">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16">
        <section>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
                Companion
              </p>
              <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
                {creature.name}
              </h1>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {creature.type === "GODZILLA" ? "Godzilla" : "Dragon"} ·{" "}
                {stageName}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                Streak
              </p>
              <p className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--ink)]">
                {streak}
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            {creature.type === "GODZILLA" ? (
              <Godzilla stage={creature.stage} name={creature.name} />
            ) : (
              <Dragon stage={creature.stage} name={creature.name} />
            )}
          </div>

          <div className="mt-8">
            <XpBar totalXp={creature.totalXp} />
          </div>
        </section>

        <section>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
            Today
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ink)]">
            Daily grind
          </h2>
          <p className="mt-1 mb-8 text-sm text-[var(--muted)]">
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

      <section className="grid gap-10 border-t border-[var(--line)] pt-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <Heatmap cells={stats.heatmap} />
        <WeeklyStats stats={stats.weekly} />
      </section>
    </div>
  );
}
