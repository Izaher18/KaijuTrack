import type { DailyLog } from "@/generated/prisma/client";
import { dateToKey } from "@/lib/xp";

export type MilestoneId =
  | "first_log"
  | "first_perfect"
  | "streak_7"
  | "streak_30"
  | "apps_100"
  | "apex";

export type Milestone = {
  id: MilestoneId;
  title: string;
  description: string;
  unlocked: boolean;
};

export type MilestoneInput = {
  logs: Pick<
    DailyLog,
    "date" | "perfectDay" | "applicationsCount" | "xpEarned"
  >[];
  streak: number;
  stage: number;
  totalXp: number;
};

export function evaluateMilestones(input: MilestoneInput): Milestone[] {
  const { logs, streak, stage, totalXp } = input;
  const hasLog = logs.length > 0;
  const hasPerfect = logs.some((log) => log.perfectDay);
  const apps = logs.reduce((sum, log) => sum + log.applicationsCount, 0);

  return [
    {
      id: "first_log",
      title: "First footprint",
      description: "Save your first daily log",
      unlocked: hasLog,
    },
    {
      id: "first_perfect",
      title: "Perfect day",
      description: "Hit all four goals in one day",
      unlocked: hasPerfect,
    },
    {
      id: "streak_7",
      title: "Week warrior",
      description: "Hold a 7-day perfect streak",
      unlocked: streak >= 7,
    },
    {
      id: "streak_30",
      title: "Month of fire",
      description: "Hold a 30-day perfect streak",
      unlocked: streak >= 30,
    },
    {
      id: "apps_100",
      title: "Hundred applications",
      description: "Log 100 job applications total",
      unlocked: apps >= 100,
    },
    {
      id: "apex",
      title: "Apex form",
      description: "Reach the Apex creature stage",
      unlocked: stage >= 4 || totalXp >= 1500,
    },
  ];
}

export function unlockedCount(milestones: Milestone[]): number {
  return milestones.filter((m) => m.unlocked).length;
}

/** Oldest unlocked date for a perfect-day style milestone, if any. */
export function firstPerfectDate(
  logs: Pick<DailyLog, "date" | "perfectDay">[],
): string | null {
  const perfect = logs
    .filter((log) => log.perfectDay)
    .map((log) => dateToKey(log.date))
    .sort();
  return perfect[0] ?? null;
}
