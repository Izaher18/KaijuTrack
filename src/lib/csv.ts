import type { DailyLog } from "@/generated/prisma/client";
import { dateToKey } from "@/lib/xp";

const HEADER = [
  "date",
  "leetcodeDone",
  "systemDesignDone",
  "applicationsCount",
  "projectDone",
  "projectMinutes",
  "projectNote",
  "xpEarned",
  "perfectDay",
] as const;

function escapeCsv(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }
  return value;
}

export function dailyLogsToCsv(logs: DailyLog[]): string {
  const lines = [HEADER.join(",")];

  for (const log of logs) {
    const row = [
      dateToKey(log.date),
      log.leetcodeDone ? "1" : "0",
      log.systemDesignDone ? "1" : "0",
      String(log.applicationsCount),
      log.projectDone ? "1" : "0",
      log.projectMinutes == null ? "" : String(log.projectMinutes),
      escapeCsv(log.projectNote ?? ""),
      String(log.xpEarned),
      log.perfectDay ? "1" : "0",
    ];
    lines.push(row.join(","));
  }

  return `${lines.join("\n")}\n`;
}
