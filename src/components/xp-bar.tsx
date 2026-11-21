import { nextStageProgress } from "@/lib/xp";

export function XpBar({ totalXp }: { totalXp: number }) {
  const { current, next, progress, xpIntoStage, xpForNext } =
    nextStageProgress(totalXp);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            Stage
          </p>
          <p className="font-[family-name:var(--font-display)] text-xl text-[var(--fog)]">
            {current.name}
          </p>
        </div>
        <p className="text-sm text-[var(--muted)]">
          {next
            ? `${xpIntoStage} / ${xpForNext} XP → ${next.name}`
            : `${totalXp} XP · Max stage`}
        </p>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-[var(--panel-strong)] ring-1 ring-white/5">
        <div
          className="xp-fill h-full rounded-full bg-gradient-to-r from-[var(--accent-dim)] to-[var(--accent)]"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-[var(--muted)]">{totalXp} total XP</p>
    </div>
  );
}
