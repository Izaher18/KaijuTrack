import type { WeeklyStats as WeeklyStatsData } from "@/lib/stats";

export function WeeklyStats({ stats }: { stats: WeeklyStatsData }) {
  const items = [
    { label: "Completion", value: `${stats.completionRate}%` },
    { label: "Days logged", value: String(stats.daysLogged) },
    { label: "Perfect days", value: String(stats.perfectDays) },
    { label: "Applications", value: String(stats.applications) },
    { label: "XP earned", value: String(stats.xpEarned) },
  ];

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
        This week
      </p>
      <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[var(--ink)]">
        Weekly stats
      </h3>
      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {items.map((item) => (
          <div key={item.label} className="border-t border-[var(--line)] pt-3">
            <dt className="text-xs text-[var(--muted)]">{item.label}</dt>
            <dd className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--ink)]">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-xs text-[var(--muted)]">
        {stats.goalsHit} of {stats.goalsPossible} weekly goals hit
      </p>
    </div>
  );
}
