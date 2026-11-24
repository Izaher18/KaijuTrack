import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getYesterdayNudge } from "./nudge";
import { parseDateKey } from "./xp";

describe("getYesterdayNudge", () => {
  it("hides when yesterday has no log", () => {
    const nudge = getYesterdayNudge([], "2026-11-24");
    assert.equal(nudge.show, false);
  });

  it("hides when yesterday was perfect", () => {
    const nudge = getYesterdayNudge(
      [
        {
          date: parseDateKey("2026-11-23"),
          leetcodeDone: true,
          systemDesignDone: true,
          applicationsCount: 20,
          projectDone: true,
          perfectDay: true,
        },
      ],
      "2026-11-24",
    );
    assert.equal(nudge.show, false);
  });

  it("shows when yesterday was incomplete", () => {
    const nudge = getYesterdayNudge(
      [
        {
          date: parseDateKey("2026-11-23"),
          leetcodeDone: true,
          systemDesignDone: false,
          applicationsCount: 5,
          projectDone: false,
          perfectDay: false,
        },
      ],
      "2026-11-24",
    );
    assert.equal(nudge.show, true);
    assert.equal(nudge.goalsHit, 1);
    assert.match(nudge.message, /1\/4 goals/);
  });
});
