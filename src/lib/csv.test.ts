import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { dailyLogsToCsv } from "./csv";
import { parseDateKey } from "./xp";

describe("dailyLogsToCsv", () => {
  it("serializes headers and rows", () => {
    const csv = dailyLogsToCsv([
      {
        id: "1",
        date: parseDateKey("2026-11-20"),
        leetcodeDone: true,
        systemDesignDone: false,
        applicationsCount: 12,
        projectDone: true,
        projectNote: 'Shipped "heatmap"',
        projectMinutes: 45,
        xpEarned: 79,
        perfectDay: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    assert.match(csv, /^date,leetcodeDone,/);
    assert.match(csv, /2026-11-20,1,0,12,1,45,"Shipped ""heatmap""",79,0/);
  });

  it("returns header-only csv for empty logs", () => {
    const csv = dailyLogsToCsv([]);
    assert.equal(
      csv,
      "date,leetcodeDone,systemDesignDone,applicationsCount,projectDone,projectMinutes,projectNote,xpEarned,perfectDay\n",
    );
  });
});
