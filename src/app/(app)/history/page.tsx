import { connection } from "next/server";
import { listRecentLogs } from "@/lib/logs";
import { dateToKey } from "@/lib/xp";

export default async function HistoryPage() {
  await connection();
  const logs = await listRecentLogs(45);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
            Archive
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--ink)]">
            History
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Recent days of grind. Perfect days keep the streak alive.
          </p>
        </div>
        <a
          href="/api/export/csv"
          className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:border-[var(--ink)]/20"
        >
          Export CSV
        </a>
      </div>

      {logs.length === 0 ? (
        <p className="mt-10 border border-dashed border-[var(--line)] p-8 text-center text-[var(--muted)]">
          No logs yet. Save today’s goals from the dashboard.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {logs.map((log) => (
            <li
              key={log.id}
              className="flex flex-wrap items-center justify-between gap-3 py-4"
            >
              <div>
                <p className="font-medium text-[var(--ink)]">
                  {dateToKey(log.date)}
                  {log.perfectDay ? (
                    <span className="ml-2 text-xs font-medium text-[var(--accent)]">
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
              <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--ink)]">
                +{log.xpEarned} XP
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
