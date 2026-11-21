import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  computeDayXp,
  computeStreak,
  stageFromXp,
  shiftDateKey,
} from "./xp";

describe("computeDayXp", () => {
  it("sums goal XP and perfect-day bonus", () => {
    const result = computeDayXp({
      leetcodeDone: true,
      systemDesignDone: true,
      applicationsCount: 20,
      projectDone: true,
    });
    assert.equal(result.perfectDay, true);
    assert.equal(result.xpEarned, 25 + 25 + 40 + 30 + 50);
  });

  it("caps application XP at 20", () => {
    const result = computeDayXp({
      leetcodeDone: false,
      systemDesignDone: false,
      applicationsCount: 50,
      projectDone: false,
    });
    assert.equal(result.xpEarned, 40);
    assert.equal(result.perfectDay, false);
  });
});

describe("stageFromXp", () => {
  it("maps thresholds", () => {
    assert.equal(stageFromXp(0), 0);
    assert.equal(stageFromXp(100), 1);
    assert.equal(stageFromXp(299), 1);
    assert.equal(stageFromXp(300), 2);
    assert.equal(stageFromXp(1500), 4);
  });
});

describe("computeStreak", () => {
  it("counts consecutive perfect days including today", () => {
    const dates = new Set(["2026-11-21", "2026-11-20", "2026-11-19"]);
    assert.equal(computeStreak(dates, "2026-11-21"), 3);
  });

  it("falls back to yesterday when today is incomplete", () => {
    const dates = new Set(["2026-11-20", "2026-11-19"]);
    assert.equal(computeStreak(dates, "2026-11-21"), 2);
  });
});

describe("shiftDateKey", () => {
  it("shifts across month boundaries", () => {
    assert.equal(shiftDateKey("2026-12-01", -1), "2026-11-30");
  });
});
