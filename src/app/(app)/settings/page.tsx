import { connection } from "next/server";
import { ensureCreature } from "@/lib/creature";
import { SettingsForm } from "./settings-form";

export default async function SettingsPage() {
  await connection();
  const creature = await ensureCreature();

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
        Preferences
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-[var(--fog)]">
        Settings
      </h1>
      <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
        Name your companion and pick a form. Dragon art ships later; XP and
        stages already work for both.
      </p>
      <SettingsForm name={creature.name} type={creature.type} />
    </div>
  );
}
