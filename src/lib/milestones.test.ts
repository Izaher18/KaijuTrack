import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { evaluateMilestones, unlockedCount } from "./milestones";
import { parseDateKey } from "./xp";

describe("evaluateMilestones", () => {
  it("starts locked with empty progress", () => {
    const milestones = evaluateMilestones({
      logs: [],
      streak: 0,
      stage: 0,
      totalXp: 0,
    });
    assert.equal(unlockedCount(milestones), 0);
  });

  it("unlocks first log and perfect day", () => {
    const milestones = evaluateMilestones({
      logs: [
        {
          date: parseDateKey("2026-11-20"),
          perfectDay: true,
          applicationsCount: 20,
          xpEarned: 170,
        },
      ],
      streak: 1,
      stage: 1,
      totalXp: 170,
    });
    const byId = Object.fromEntries(milestones.map((m) => [m.id, m.unlocked]));
    assert.equal(byId.first_log, true);
    assert.equal(byId.first_perfect, true);
    assert.equal(byId.streak_7, false);
    assert.equal(byId.apps_100, false);
  });

  it("unlocks streak, apps, and apex thresholds", () => {
    const milestones = evaluateMilestones({
      logs: [
        {
          date: parseDateKey("2026-11-01"),
          perfectDay: true,
          applicationsCount: 50,
          xpEarned: 170,
        },
        {
          date: parseDateKey("2026-11-02"),
          perfectDay: true,
          applicationsCount: 50,
          xpEarned: 170,
        },
      ],
      streak: 30,
      stage: 4,
      totalXp: 1600,
    });
    const byId = Object.fromEntries(milestones.map((m) => [m.id, m.unlocked]));
    assert.equal(byId.streak_7, true);
    assert.equal(byId.streak_30, true);
    assert.equal(byId.apps_100, true);
    assert.equal(byId.apex, true);
  });
});
