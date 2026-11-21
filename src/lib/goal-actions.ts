"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { endSession, hasSession } from "@/lib/auth";
import { upsertTodayLog } from "@/lib/logs";

export type GoalActionState = { error: string | null; ok: boolean };

export async function signOut(): Promise<void> {
  await endSession();
  redirect("/login");
}

export async function updateTodayGoals(
  _prev: GoalActionState,
  form: FormData,
): Promise<GoalActionState> {
  if (!(await hasSession())) {
    redirect("/login");
  }

  const leetcodeDone = form.get("leetcodeDone") === "1";
  const systemDesignDone = form.get("systemDesignDone") === "1";
  const projectDone = form.get("projectDone") === "1";
  const applicationsCount = Number(form.get("applicationsCount") ?? 0);
  const projectNoteRaw = String(form.get("projectNote") ?? "").trim();
  const minutesRaw = String(form.get("projectMinutes") ?? "").trim();
  const projectMinutes = minutesRaw === "" ? null : Number(minutesRaw);

  if (!Number.isFinite(applicationsCount) || applicationsCount < 0) {
    return { error: "Applications count must be a non-negative number.", ok: false };
  }

  if (
    projectMinutes !== null &&
    (!Number.isFinite(projectMinutes) || projectMinutes < 0)
  ) {
    return { error: "Minutes must be a non-negative number.", ok: false };
  }

  await upsertTodayLog({
    leetcodeDone,
    systemDesignDone,
    applicationsCount: Math.floor(applicationsCount),
    projectDone,
    projectNote: projectNoteRaw || null,
    projectMinutes:
      projectMinutes === null ? null : Math.floor(projectMinutes),
  });

  revalidatePath("/dashboard");
  revalidatePath("/history");
  return { error: null, ok: true };
}
