import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildHeatmap,
  computeWeeklyStats,
  goalsCompleted,
} from "./stats";
import { parseDateKey } from "./xp";

function fakeLog(
  dateKey: string,
  partial: Partial<{
    leetcodeDone: boolean;
    systemDesignDone: boolean;
    applicationsCount: number;
    projectDone: boolean;
    xpEarned: number;
    perfectDay: boolean;
  }> = {},
) {
  return {
    id: dateKey,
    date: parseDateKey(dateKey),
    leetcodeDone: partial.leetcodeDone ?? false,
    systemDesignDone: partial.systemDesignDone ?? false,
    applicationsCount: partial.applicationsCount ?? 0,
    projectDone: partial.projectDone ?? false,
    projectNote: null,
    projectMinutes: null,
    xpEarned: partial.xpEarned ?? 0,
    perfectDay: partial.perfectDay ?? false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

describe("goalsCompleted", () => {
  it("counts each of the four goals", () => {
    assert.equal(
      goalsCompleted({
        leetcodeDone: true,
        systemDesignDone: true,
        applicationsCount: 20,
        projectDone: true,
      }),
      4,
    );
    assert.equal(
      goalsCompleted({
        leetcodeDone: true,
        systemDesignDone: false,
        applicationsCount: 5,
        projectDone: false,
      }),
      1,
    );
  });
});

describe("buildHeatmap", () => {
  it("marks logged days with intensity", () => {
    const cells = buildHeatmap(
      [
        fakeLog("2026-11-20", {
          leetcodeDone: true,
          systemDesignDone: true,
          applicationsCount: 20,
          projectDone: true,
          xpEarned: 170,
          perfectDay: true,
        }),
      ],
      "2026-11-24",
      2,
    );
    const hit = cells.find((c) => c.date === "2026-11-20");
    assert.ok(hit);
    assert.equal(hit.intensity, 4);
    assert.equal(hit.perfectDay, true);
  });
});

describe("computeWeeklyStats", () => {
  it("aggregates the last seven days", () => {
    const stats = computeWeeklyStats(
      [
        fakeLog("2026-11-22", {
          leetcodeDone: true,
          applicationsCount: 10,
          xpEarned: 45,
        }),
        fakeLog("2026-11-24", {
          leetcodeDone: true,
          systemDesignDone: true,
          applicationsCount: 20,
          projectDone: true,
          xpEarned: 170,
          perfectDay: true,
        }),
        fakeLog("2026-11-10", { xpEarned: 999 }),
      ],
      "2026-11-24",
    );
    assert.equal(stats.daysLogged, 2);
    assert.equal(stats.perfectDays, 1);
    assert.equal(stats.applications, 30);
    assert.equal(stats.xpEarned, 215);
    assert.equal(stats.goalsHit, 5);
  });
});
