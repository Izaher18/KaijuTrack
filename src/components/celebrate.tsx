"use client";

import { useEffect, useState } from "react";

type CelebrateProps = {
  show: boolean;
  title: string;
  subtitle?: string;
};

export function Celebrate({ show, title, subtitle }: CelebrateProps) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!show) return;

    const timer = window.setTimeout(() => {
      setDismissed(true);
    }, 2800);

    return () => window.clearTimeout(timer);
  }, [show]);

  if (!show || dismissed) return null;

  const pieces = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div
      className="celebrate-overlay pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="absolute inset-0 overflow-hidden">
        {pieces.map((i) => (
          <span
            key={i}
            className="confetti-piece"
            style={{
              left: `${(i * 37) % 100}%`,
              animationDelay: `${(i % 8) * 0.08}s`,
              background:
                i % 3 === 0 ? "#0d9488" : i % 3 === 1 ? "#111827" : "#f59e0b",
            }}
          />
        ))}
      </div>
      <div className="celebrate-card relative mx-6 max-w-sm rounded-3xl border border-[var(--line)] bg-white px-8 py-7 text-center shadow-lg">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
          Nice work
        </p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--ink)]">
          {title}
        </p>
        {subtitle ? (
          <p className="mt-2 text-sm text-[var(--muted)]">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}
