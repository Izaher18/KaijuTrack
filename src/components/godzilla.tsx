type GodzillaProps = {
  stage: number;
  name: string;
  className?: string;
};

const STAGE_SCALE = [0.55, 0.7, 0.85, 1, 1.15] as const;

export function Godzilla({ stage, name, className = "" }: GodzillaProps) {
  const clamped = Math.max(0, Math.min(4, stage));
  const scale = STAGE_SCALE[clamped];
  const showPlates = clamped >= 1;
  const showTail = clamped >= 2;
  const showGlow = clamped >= 3;
  const showApex = clamped >= 4;

  return (
    <div className={`godzilla-stage relative flex flex-col items-center ${className}`}>
      <div
        className="godzilla-idle relative"
        style={{ transform: `scale(${scale})`, transformOrigin: "center bottom" }}
      >
        {showGlow ? (
          <div
            className="pointer-events-none absolute inset-x-8 bottom-4 h-16 rounded-full bg-[var(--accent)]/30 blur-2xl"
            aria-hidden
          />
        ) : null}

        <svg
          viewBox="0 0 240 220"
          className="relative h-56 w-64 drop-shadow-[0_12px_24px_rgba(0,0,0,0.55)] sm:h-72 sm:w-80"
          role="img"
          aria-label={`${name} at stage ${clamped}`}
        >
          <defs>
            <linearGradient id="kaijuBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3d5c45" />
              <stop offset="55%" stopColor="#1f3326" />
              <stop offset="100%" stopColor="#0f1a14" />
            </linearGradient>
            <linearGradient id="kaijuGlow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c8ff3d" />
              <stop offset="100%" stopColor="#7adf1a" />
            </linearGradient>
            <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ground shadow */}
          <ellipse cx="120" cy="205" rx="70" ry="8" fill="#020617" opacity="0.55" />

          {/* Tail */}
          {showTail ? (
            <path
              d="M150 150 C190 145, 210 130, 225 110 C210 135, 185 160, 145 168 Z"
              fill="url(#kaijuBody)"
              opacity="0.95"
            />
          ) : null}

          {/* Legs */}
          <path d="M78 150 L68 198 L92 198 L98 155 Z" fill="url(#kaijuBody)" />
          <path d="M142 150 L138 198 L162 198 L152 152 Z" fill="url(#kaijuBody)" />

          {/* Body */}
          {clamped === 0 ? (
            <ellipse
              cx="120"
              cy="130"
              rx="42"
              ry="48"
              fill="url(#kaijuBody)"
              stroke="#c8ff3d"
              strokeWidth="2"
              strokeOpacity="0.35"
            />
          ) : (
            <path
              d="M95 70 C88 95, 78 125, 82 160 C95 175, 145 175, 158 160 C162 125, 152 95, 145 70 C135 55, 105 55, 95 70 Z"
              fill="url(#kaijuBody)"
            />
          )}

          {/* Arms */}
          {clamped >= 1 ? (
            <>
              <path
                d="M88 105 C60 115, 52 140, 58 155 C70 148, 85 135, 92 120 Z"
                fill="url(#kaijuBody)"
              />
              <path
                d="M152 105 C180 115, 188 140, 182 155 C170 148, 155 135, 148 120 Z"
                fill="url(#kaijuBody)"
              />
            </>
          ) : null}

          {/* Head */}
          {clamped >= 1 ? (
            <path
              d="M105 42 C100 58, 102 78, 120 82 C138 78, 140 58, 135 42 C128 32, 112 32, 105 42 Z"
              fill="url(#kaijuBody)"
            />
          ) : null}

          {/* Eyes */}
          {clamped >= 1 ? (
            <>
              <circle
                cx="112"
                cy="58"
                r={showApex ? 4.5 : 3.5}
                fill="url(#kaijuGlow)"
                filter={showGlow ? "url(#softGlow)" : undefined}
              />
              <circle
                cx="128"
                cy="58"
                r={showApex ? 4.5 : 3.5}
                fill="url(#kaijuGlow)"
                filter={showGlow ? "url(#softGlow)" : undefined}
              />
            </>
          ) : (
            <ellipse
              cx="120"
              cy="120"
              rx="8"
              ry="10"
              fill="url(#kaijuGlow)"
              opacity="0.7"
              filter="url(#softGlow)"
            />
          )}

          {/* Dorsal plates */}
          {showPlates ? (
            <g fill="#2a4532" stroke="#c8ff3d" strokeOpacity={showGlow ? 0.55 : 0.25} strokeWidth="1.5">
              <path d="M118 78 L112 48 L124 48 Z" />
              <path d="M126 95 L122 62 L134 68 Z" />
              {clamped >= 2 ? <path d="M132 118 L130 88 L142 98 Z" /> : null}
              {clamped >= 3 ? <path d="M136 140 L138 112 L150 124 Z" /> : null}
              {showApex ? (
                <path
                  d="M140 158 L146 132 L158 148 Z"
                  fill="#c8ff3d"
                  fillOpacity="0.35"
                />
              ) : null}
            </g>
          ) : null}

          {/* Atomic breath hint */}
          {showApex ? (
            <path
              d="M120 78 C118 95, 110 110, 95 118"
              stroke="url(#kaijuGlow)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
              filter="url(#softGlow)"
            />
          ) : null}
        </svg>
      </div>

      <p className="mt-3 font-[family-name:var(--font-display)] text-lg tracking-wide text-[var(--fog)]">
        {name}
      </p>
    </div>
  );
}

export function DragonStub({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-8 text-center">
      <div className="flex h-40 w-40 items-center justify-center rounded-full border border-dashed border-[var(--accent)]/40 bg-[var(--panel)]/60">
        <span className="font-[family-name:var(--font-display)] text-4xl text-[var(--accent)]/70">
          ?
        </span>
      </div>
      <p className="font-[family-name:var(--font-display)] text-lg text-[var(--fog)]">
        {name}
      </p>
      <p className="max-w-xs text-sm text-[var(--muted)]">
        Dragon form is coming soon. Your XP still counts — switch back to Godzilla
        anytime.
      </p>
    </div>
  );
}
