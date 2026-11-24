import type { DailyLog } from "@/generated/prisma/client";
import { dateToKey, shiftDateKey, toDateKey } from "@/lib/xp";
import { goalsCompleted } from "@/lib/stats";

export type YesterdayNudge = {
  show: boolean;
  date: string;
  goalsHit: number;
  message: string;
};

/**
 * Nudge when yesterday exists in history but was not a perfect day.
 * No nudge if there is no yesterday log (day off / before tracking started).
 */
export function getYesterdayNudge(
  logs: Pick<
    DailyLog,
    | "date"
    | "leetcodeDone"
    | "systemDesignDone"
    | "applicationsCount"
    | "projectDone"
    | "perfectDay"
  >[],
  todayKey: string = toDateKey(),
): YesterdayNudge {
  const yesterdayKey = shiftDateKey(todayKey, -1);
  const yesterday = logs.find((log) => dateToKey(log.date) === yesterdayKey);

  if (!yesterday) {
    return {
      show: false,
      date: yesterdayKey,
      goalsHit: 0,
      message: "",
    };
  }

  if (yesterday.perfectDay) {
    return {
      show: false,
      date: yesterdayKey,
      goalsHit: 4,
      message: "",
    };
  }

  const goalsHit = goalsCompleted(yesterday);
  return {
    show: true,
    date: yesterdayKey,
    goalsHit,
    message: `Yesterday (${yesterdayKey}) ended at ${goalsHit}/4 goals. Protect today’s streak.`,
  };
}
