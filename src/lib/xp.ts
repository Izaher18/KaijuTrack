export const XP = {
  leetcode: 25,
  systemDesign: 25,
  application: 2,
  applicationCap: 20,
  project: 30,
  perfectDayBonus: 50,
} as const;

export const STAGE_THRESHOLDS = [
  { stage: 0, name: "Egg", xp: 0 },
  { stage: 1, name: "Hatchling", xp: 100 },
  { stage: 2, name: "Juvenile", xp: 300 },
  { stage: 3, name: "City Stomper", xp: 700 },
  { stage: 4, name: "Apex", xp: 1500 },
] as const;

export type GoalInput = {
  leetcodeDone: boolean;
  systemDesignDone: boolean;
  applicationsCount: number;
  projectDone: boolean;
};

export function computeDayXp(goals: GoalInput): {
  xpEarned: number;
  perfectDay: boolean;
} {
  const apps = Math.max(
    0,
    Math.min(goals.applicationsCount, XP.applicationCap),
  );

  let xp = 0;
  if (goals.leetcodeDone) xp += XP.leetcode;
  if (goals.systemDesignDone) xp += XP.systemDesign;
  xp += apps * XP.application;
  if (goals.projectDone) xp += XP.project;

  const perfectDay =
    goals.leetcodeDone &&
    goals.systemDesignDone &&
    goals.applicationsCount >= XP.applicationCap &&
    goals.projectDone;

  if (perfectDay) xp += XP.perfectDayBonus;

  return { xpEarned: xp, perfectDay };
}

export function stageFromXp(totalXp: number): number {
  let stage = 0;
  for (const entry of STAGE_THRESHOLDS) {
    if (totalXp >= entry.xp) stage = entry.stage;
  }
  return stage;
}

export function stageMeta(stage: number) {
  return (
    STAGE_THRESHOLDS.find((entry) => entry.stage === stage) ??
    STAGE_THRESHOLDS[0]
  );
}

export function nextStageProgress(totalXp: number): {
  current: (typeof STAGE_THRESHOLDS)[number];
  next: (typeof STAGE_THRESHOLDS)[number] | null;
  progress: number;
  xpIntoStage: number;
  xpForNext: number;
} {
  const currentStage = stageFromXp(totalXp);
  const current = stageMeta(currentStage);
  const next =
    STAGE_THRESHOLDS.find((entry) => entry.stage === currentStage + 1) ?? null;

  if (!next) {
    return {
      current,
      next: null,
      progress: 1,
      xpIntoStage: 0,
      xpForNext: 0,
    };
  }

  const xpIntoStage = totalXp - current.xp;
  const xpForNext = next.xp - current.xp;
  const progress = Math.min(1, Math.max(0, xpIntoStage / xpForNext));

  return { current, next, progress, xpIntoStage, xpForNext };
}

/** Calendar date as YYYY-MM-DD in local timezone (for "today"). */
export function toDateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Convert a Prisma @db.Date (UTC midnight) to YYYY-MM-DD. */
export function dateToKey(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Parse YYYY-MM-DD into a Date at UTC midnight for Prisma @db.Date. */
export function parseDateKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function shiftDateKey(key: string, days: number): string {
  const date = parseDateKey(key);
  date.setUTCDate(date.getUTCDate() + days);
  return dateToKey(date);
}

/**
 * Count consecutive perfect days ending today (or yesterday if today is not
 * perfect yet — so a streak does not break mid-day).
 */
export function computeStreak(
  perfectDates: Set<string>,
  todayKey: string,
): number {
  let cursor = todayKey;
  if (!perfectDates.has(cursor)) {
    cursor = shiftDateKey(todayKey, -1);
  }

  let streak = 0;
  while (perfectDates.has(cursor)) {
    streak += 1;
    cursor = shiftDateKey(cursor, -1);
  }
  return streak;
}
