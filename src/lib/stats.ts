import type { DailyLog } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import {
  dateToKey,
  parseDateKey,
  shiftDateKey,
  toDateKey,
  XP,
} from "@/lib/xp";

export type DayIntensity = 0 | 1 | 2 | 3 | 4;

export function goalsCompleted(log: Pick<
  DailyLog,
  "leetcodeDone" | "systemDesignDone" | "applicationsCount" | "projectDone"
>): DayIntensity {
  let n = 0;
  if (log.leetcodeDone) n += 1;
  if (log.systemDesignDone) n += 1;
  if (log.applicationsCount >= XP.applicationCap) n += 1;
  if (log.projectDone) n += 1;
  return n as DayIntensity;
}

export type HeatmapCell = {
  date: string;
  intensity: DayIntensity;
  xp: number;
  perfectDay: boolean;
};

/** Build a GitHub-style grid covering the last `weeks` weeks ending today. */
export function buildHeatmap(
  logs: DailyLog[],
  todayKey: string,
  weeks = 16,
): HeatmapCell[] {
  const byDate = new Map(
    logs.map((log) => [
      dateToKey(log.date),
      {
        intensity: goalsCompleted(log),
        xp: log.xpEarned,
        perfectDay: log.perfectDay,
      },
    ]),
  );

  // Cover ~`weeks` weeks ending today, aligned so columns start on Sunday
  // (GitHub-style: rows = Sun→Sat).
  const roughStart = shiftDateKey(todayKey, -(weeks * 7 - 1));
  const startDow = parseDateKey(roughStart).getUTCDay();
  const startKey = shiftDateKey(roughStart, -startDow);

  const cells: HeatmapCell[] = [];
  let key = startKey;
  while (key <= todayKey) {
    const hit = byDate.get(key);
    cells.push({
      date: key,
      intensity: hit?.intensity ?? 0,
      xp: hit?.xp ?? 0,
      perfectDay: hit?.perfectDay ?? false,
    });
    key = shiftDateKey(key, 1);
  }
  return cells;
}

export type WeeklyStats = {
  daysLogged: number;
  perfectDays: number;
  applications: number;
  xpEarned: number;
  goalsHit: number;
  goalsPossible: number;
  completionRate: number;
};

export function computeWeeklyStats(
  logs: DailyLog[],
  todayKey: string,
): WeeklyStats {
  const weekStart = shiftDateKey(todayKey, -6);
  const weekLogs = logs.filter((log) => {
    const key = dateToKey(log.date);
    return key >= weekStart && key <= todayKey;
  });

  let goalsHit = 0;
  let applications = 0;
  let xpEarned = 0;
  let perfectDays = 0;

  for (const log of weekLogs) {
    goalsHit += goalsCompleted(log);
    applications += log.applicationsCount;
    xpEarned += log.xpEarned;
    if (log.perfectDay) perfectDays += 1;
  }

  const goalsPossible = 7 * 4;
  const completionRate =
    goalsPossible === 0 ? 0 : Math.round((goalsHit / goalsPossible) * 100);

  return {
    daysLogged: weekLogs.length,
    perfectDays,
    applications,
    xpEarned,
    goalsHit,
    goalsPossible,
    completionRate,
  };
}

export async function getDashboardStats(): Promise<{
  heatmap: HeatmapCell[];
  weekly: WeeklyStats;
}> {
  const todayKey = toDateKey();
  const since = parseDateKey(shiftDateKey(todayKey, -(16 * 7 + 7)));
  const logs = await prisma.dailyLog.findMany({
    where: { date: { gte: since } },
    orderBy: { date: "asc" },
  });

  return {
    heatmap: buildHeatmap(logs, todayKey),
    weekly: computeWeeklyStats(logs, todayKey),
  };
}
