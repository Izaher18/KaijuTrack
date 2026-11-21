"use client";

import { useActionState } from "react";
import { signIn, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-[var(--fog)]"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 w-full rounded-xl border border-white/10 bg-[var(--panel-strong)] px-3 py-2.5 text-sm text-[var(--fog)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]/50"
          placeholder="••••••••"
        />
      </div>

      {state.error ? (
        <p role="alert" className="text-sm text-rose-400">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[#0b1408] transition hover:brightness-110 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Enter the lair"}
      </button>
    </form>
  );
}
