"use client";

import { useActionState } from "react";
import type { CreatureType } from "@/generated/prisma/client";
import { updateSettings, type SettingsState } from "./actions";

const initialState: SettingsState = { error: null, ok: false };

export function SettingsForm({
  name,
  type,
}: {
  name: string;
  type: CreatureType;
}) {
  const [state, formAction, pending] = useActionState(
    updateSettings,
    initialState,
  );

  return (
    <form action={formAction} className="mt-8 max-w-md space-y-5">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-[var(--fog)]"
        >
          Creature name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={name}
          maxLength={40}
          required
          className="mt-2 w-full rounded-xl border border-white/10 bg-[var(--panel-strong)] px-3 py-2.5 text-sm text-[var(--fog)] outline-none focus:border-[var(--accent)]/50"
        />
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-[var(--fog)]">
          Creature type
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="cursor-pointer rounded-xl border border-white/10 bg-[var(--panel)]/70 p-4 has-[:checked]:border-[var(--accent)]/60">
            <input
              type="radio"
              name="type"
              value="GODZILLA"
              defaultChecked={type === "GODZILLA"}
              className="mr-2 accent-[var(--accent)]"
            />
            <span className="text-[var(--fog)]">Godzilla</span>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Live art and stage growth
            </p>
          </label>
          <label className="cursor-pointer rounded-xl border border-white/10 bg-[var(--panel)]/70 p-4 has-[:checked]:border-[var(--accent)]/60">
            <input
              type="radio"
              name="type"
              value="DRAGON"
              defaultChecked={type === "DRAGON"}
              className="mr-2 accent-[var(--accent)]"
            />
            <span className="text-[var(--fog)]">Dragon</span>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Coming soon — selectable stub
            </p>
          </label>
        </div>
      </fieldset>

      {state.error ? (
        <p role="alert" className="text-sm text-rose-400">
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p className="text-sm text-[var(--accent)]">Settings saved.</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[#0b1408] transition hover:brightness-110 disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}
