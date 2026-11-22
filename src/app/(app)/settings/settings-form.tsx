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
          className="block text-sm font-medium text-[var(--ink)]"
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
          className="input-field mt-2 w-full rounded-xl px-3 py-2.5 text-sm"
        />
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-[var(--ink)]">
          Creature type
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="cursor-pointer rounded-2xl border border-[var(--line)] bg-white p-4 has-[:checked]:border-[var(--accent)] has-[:checked]:bg-[var(--accent-soft)]/40">
            <input
              type="radio"
              name="type"
              value="GODZILLA"
              defaultChecked={type === "GODZILLA"}
              className="mr-2 accent-[var(--accent)]"
            />
            <span className="text-[var(--ink)]">Godzilla</span>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Live art and stage growth
            </p>
          </label>
          <label className="cursor-pointer rounded-2xl border border-[var(--line)] bg-white p-4 has-[:checked]:border-[var(--accent)] has-[:checked]:bg-[var(--accent-soft)]/40">
            <input
              type="radio"
              name="type"
              value="DRAGON"
              defaultChecked={type === "DRAGON"}
              className="mr-2 accent-[var(--accent)]"
            />
            <span className="text-[var(--ink)]">Dragon</span>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Wings, horns, and fire breath
            </p>
          </label>
        </div>
      </fieldset>

      {state.error ? (
        <p role="alert" className="text-sm text-rose-600">
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p className="text-sm text-[var(--accent)]">Settings saved.</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="btn-primary rounded-full px-5 py-2.5 text-sm font-semibold disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}
