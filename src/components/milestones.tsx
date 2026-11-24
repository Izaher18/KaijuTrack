import type { Milestone } from "@/lib/milestones";
import { unlockedCount } from "@/lib/milestones";

export function Milestones({ milestones }: { milestones: Milestone[] }) {
  const unlocked = unlockedCount(milestones);

  return (
    <div>
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
            Achievements
          </p>
          <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[var(--ink)]">
            Milestones
          </h3>
        </div>
        <p className="text-sm text-[var(--muted)]">
          {unlocked}/{milestones.length} unlocked
        </p>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {milestones.map((milestone) => (
          <li
            key={milestone.id}
            className={`rounded-2xl border px-4 py-3 ${
              milestone.unlocked
                ? "border-[var(--accent)]/30 bg-[var(--accent-soft)]/40"
                : "border-[var(--line)] bg-white"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <p
                className={`font-medium ${
                  milestone.unlocked
                    ? "text-[var(--ink)]"
                    : "text-[var(--muted)]"
                }`}
              >
                {milestone.title}
              </p>
              <span
                className={`text-xs font-medium ${
                  milestone.unlocked
                    ? "text-[var(--accent)]"
                    : "text-[var(--muted)]"
                }`}
              >
                {milestone.unlocked ? "Unlocked" : "Locked"}
              </span>
            </div>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {milestone.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
