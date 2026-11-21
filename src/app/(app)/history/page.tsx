import { connection } from "next/server";
import { listRecentLogs } from "@/lib/logs";
import { dateToKey } from "@/lib/xp";

export default async function HistoryPage() {
  await connection();
  const logs = await listRecentLogs(45);

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
        Archive
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-[var(--fog)]">
        History
      </h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Recent days of grind. Perfect days keep the streak alive.
      </p>

      {logs.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-white/10 p-8 text-center text-[var(--muted)]">
          No logs yet. Save today’s goals from the dashboard.
        </p>
      ) : (
        <ul className="mt-8 space-y-3">
          {logs.map((log) => (
            <li
              key={log.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/5 bg-[var(--panel)]/60 px-4 py-3"
            >
              <div>
                <p className="font-medium text-[var(--fog)]">
                  {dateToKey(log.date)}
                  {log.perfectDay ? (
                    <span className="ml-2 text-xs text-[var(--accent)]">
                      Perfect day
                    </span>
                  ) : null}
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  LC {log.leetcodeDone ? "✓" : "·"} · SD{" "}
                  {log.systemDesignDone ? "✓" : "·"} · Apps{" "}
                  {log.applicationsCount}/20 · Project{" "}
                  {log.projectDone ? "✓" : "·"}
                </p>
              </div>
              <p className="font-[family-name:var(--font-display)] text-lg text-[var(--accent)]">
                +{log.xpEarned} XP
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
