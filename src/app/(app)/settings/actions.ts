"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { CreatureType } from "@/generated/prisma/client";
import { hasSession } from "@/lib/auth";
import { updateCreatureProfile } from "@/lib/creature";

export type SettingsState = { error: string | null; ok: boolean };

export async function updateSettings(
  _prev: SettingsState,
  form: FormData,
): Promise<SettingsState> {
  if (!(await hasSession())) {
    redirect("/login");
  }

  const name = String(form.get("name") ?? "").trim();
  const typeRaw = String(form.get("type") ?? "GODZILLA");
  const type: CreatureType =
    typeRaw === "DRAGON" ? "DRAGON" : "GODZILLA";

  if (!name) {
    return { error: "Give your creature a name.", ok: false };
  }

  if (name.length > 40) {
    return { error: "Name must be 40 characters or fewer.", ok: false };
  }

  await updateCreatureProfile({ name, type });
  revalidatePath("/dashboard");
  revalidatePath("/settings");
  return { error: null, ok: true };
}
