import type { DailyLog } from "@/generated/prisma/client";
import { syncCreatureXp } from "@/lib/creature";
import { prisma } from "@/lib/prisma";
import {
  computeDayXp,
  computeStreak,
  dateToKey,
  parseDateKey,
  toDateKey,
  type GoalInput,
} from "@/lib/xp";

export async function getTodayLog(): Promise<DailyLog | null> {
  return prisma.dailyLog.findUnique({
    where: { date: parseDateKey(toDateKey()) },
  });
}

export async function upsertTodayLog(
  goals: GoalInput & { projectNote?: string | null; projectMinutes?: number | null },
): Promise<DailyLog> {
  const dateKey = toDateKey();
  const date = parseDateKey(dateKey);
  const { xpEarned, perfectDay } = computeDayXp(goals);

  const log = await prisma.dailyLog.upsert({
    where: { date },
    create: {
      date,
      leetcodeDone: goals.leetcodeDone,
      systemDesignDone: goals.systemDesignDone,
      applicationsCount: Math.max(0, goals.applicationsCount),
      projectDone: goals.projectDone,
      projectNote: goals.projectNote ?? null,
      projectMinutes: goals.projectMinutes ?? null,
      xpEarned,
      perfectDay,
    },
    update: {
      leetcodeDone: goals.leetcodeDone,
      systemDesignDone: goals.systemDesignDone,
      applicationsCount: Math.max(0, goals.applicationsCount),
      projectDone: goals.projectDone,
      projectNote: goals.projectNote ?? null,
      projectMinutes: goals.projectMinutes ?? null,
      xpEarned,
      perfectDay,
    },
  });

  await syncCreatureXp();
  return log;
}

export async function listRecentLogs(limit = 30): Promise<DailyLog[]> {
  return prisma.dailyLog.findMany({
    orderBy: { date: "desc" },
    take: limit,
  });
}

export async function listAllLogs(): Promise<DailyLog[]> {
  return prisma.dailyLog.findMany({
    orderBy: { date: "asc" },
  });
}

export async function getCurrentStreak(): Promise<number> {
  const perfectLogs = await prisma.dailyLog.findMany({
    where: { perfectDay: true },
    select: { date: true },
  });
  const perfectDates = new Set(perfectLogs.map((log) => dateToKey(log.date)));
  return computeStreak(perfectDates, toDateKey());
}
