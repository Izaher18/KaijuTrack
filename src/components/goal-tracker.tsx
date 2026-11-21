"use client";

import { useActionState, useEffect, useState } from "react";
import {
  updateTodayGoals,
  type GoalActionState,
} from "@/lib/goal-actions";
import { XP } from "@/lib/xp";

type GoalTrackerProps = {
  initial: {
    leetcodeDone: boolean;
    systemDesignDone: boolean;
    applicationsCount: number;
    projectDone: boolean;
    projectNote: string | null;
    projectMinutes: number | null;
    xpEarned: number;
    perfectDay: boolean;
  };
};

const initialState: GoalActionState = { error: null, ok: false };

export function GoalTracker({ initial }: GoalTrackerProps) {
  const [leetcodeDone, setLeetcodeDone] = useState(initial.leetcodeDone);
  const [systemDesignDone, setSystemDesignDone] = useState(
    initial.systemDesignDone,
  );
  const [applicationsCount, setApplicationsCount] = useState(
    initial.applicationsCount,
  );
  const [projectDone, setProjectDone] = useState(initial.projectDone);
  const [projectNote, setProjectNote] = useState(initial.projectNote ?? "");
  const [projectMinutes, setProjectMinutes] = useState(
    initial.projectMinutes?.toString() ?? "",
  );

  const [state, formAction, pending] = useActionState(
    updateTodayGoals,
    initialState,
  );

  useEffect(() => {
    if (state.ok) {
      // Soft refresh so creature XP/stage updates without a full remount flash.
      window.setTimeout(() => {
        window.location.reload();
      }, 250);
    }
  }, [state.ok]);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="leetcodeDone" value={leetcodeDone ? "1" : "0"} />
      <input
        type="hidden"
        name="systemDesignDone"
        value={systemDesignDone ? "1" : "0"}
      />
      <input type="hidden" name="projectDone" value={projectDone ? "1" : "0"} />

      <GoalToggle
        label="LeetCode problem"
        detail={`+${XP.leetcode} XP`}
        checked={leetcodeDone}
        onChange={setLeetcodeDone}
      />
      <GoalToggle
        label="System design"
        detail={`+${XP.systemDesign} XP`}
        checked={systemDesignDone}
        onChange={setSystemDesignDone}
      />

      <div className="rounded-xl border border-white/5 bg-[var(--panel)]/70 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-medium text-[var(--fog)]">Job applications</p>
            <p className="text-sm text-[var(--muted)]">
              Target {XP.applicationCap} · +{XP.application} XP each
            </p>
          </div>
          <p className="font-[family-name:var(--font-display)] text-2xl text-[var(--accent)]">
            {applicationsCount}
            <span className="text-base text-[var(--muted)]">
              /{XP.applicationCap}
            </span>
          </p>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-[var(--fog)] hover:border-[var(--accent)]/40"
            onClick={() =>
              setApplicationsCount((n) => Math.max(0, n - 1))
            }
          >
            −
          </button>
          <input
            name="applicationsCount"
            type="number"
            min={0}
            max={200}
            value={applicationsCount}
            onChange={(e) =>
              setApplicationsCount(Math.max(0, Number(e.target.value) || 0))
            }
            className="w-full rounded-lg border border-white/10 bg-[var(--panel-strong)] px-3 py-2 text-sm text-[var(--fog)] outline-none focus:border-[var(--accent)]/50"
          />
          <button
            type="button"
            className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-[var(--fog)] hover:border-[var(--accent)]/40"
            onClick={() => setApplicationsCount((n) => n + 1)}
          >
            +
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-white/5 bg-[var(--panel)]/70 p-4">
        <GoalToggle
          label="GitHub project work"
          detail={`+${XP.project} XP`}
          checked={projectDone}
          onChange={setProjectDone}
          bare
        />
        <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_120px]">
          <input
            name="projectNote"
            type="text"
            value={projectNote}
            onChange={(e) => setProjectNote(e.target.value)}
            placeholder="What did you ship?"
            className="rounded-lg border border-white/10 bg-[var(--panel-strong)] px-3 py-2 text-sm text-[var(--fog)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]/50"
          />
          <input
            name="projectMinutes"
            type="number"
            min={0}
            value={projectMinutes}
            onChange={(e) => setProjectMinutes(e.target.value)}
            placeholder="Minutes"
            className="rounded-lg border border-white/10 bg-[var(--panel-strong)] px-3 py-2 text-sm text-[var(--fog)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]/50"
          />
        </div>
      </div>

      {state.error ? (
        <p role="alert" className="text-sm text-rose-400">
          {state.error}
        </p>
      ) : null}

      {state.ok ? (
        <p className="text-sm text-[var(--accent)]">Saved. Kaiju grows…</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-[#0b1408] transition hover:brightness-110 disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save today’s progress"}
      </button>

      <p className="text-center text-xs text-[var(--muted)]">
        Perfect day bonus: +{XP.perfectDayBonus} XP when all four goals are met
        {initial.perfectDay ? " · unlocked today" : ""}
      </p>
    </form>
  );
}

function GoalToggle({
  label,
  detail,
  checked,
  onChange,
  bare = false,
}: {
  label: string;
  detail: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  bare?: boolean;
}) {
  const inner = (
    <label className="flex cursor-pointer items-center justify-between gap-3">
      <span>
        <span className="block font-medium text-[var(--fog)]">{label}</span>
        <span className="block text-sm text-[var(--muted)]">{detail}</span>
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 rounded-full transition ${
          checked ? "bg-[var(--accent)]" : "bg-[var(--panel-strong)]"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white transition ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </label>
  );

  if (bare) return inner;

  return (
    <div className="rounded-xl border border-white/5 bg-[var(--panel)]/70 p-4">
      {inner}
    </div>
  );
}
