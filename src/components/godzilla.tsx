"use client";

import { useId } from "react";

type GodzillaProps = {
  stage: number;
  name: string;
  className?: string;
};

const STAGE_SCALE = [0.62, 0.74, 0.86, 1, 1.1] as const;

export function Godzilla({ stage, name, className = "" }: GodzillaProps) {
  const uid = useId().replace(/:/g, "");
  const clamped = Math.max(0, Math.min(4, stage));
  const scale = STAGE_SCALE[clamped];

  const skin = `skin-${uid}`;
  const belly = `belly-${uid}`;
  const plate = `plate-${uid}`;
  const eye = `eye-${uid}`;
  const breath = `breath-${uid}`;

  return (
    <div className={`godzilla-stage relative flex flex-col items-center ${className}`}>
      <div
        className="godzilla-idle relative"
        style={{ transform: `scale(${scale})`, transformOrigin: "center bottom" }}
      >
        <svg
          viewBox="0 0 320 300"
          className="relative h-60 w-72 sm:h-80 sm:w-96"
          role="img"
          aria-label={`${name} at stage ${clamped}`}
        >
          <defs>
            <linearGradient id={skin} x1="0.15" y1="0" x2="0.9" y2="1">
              <stop offset="0%" stopColor="#4b5563" />
              <stop offset="40%" stopColor="#374151" />
              <stop offset="100%" stopColor="#1f2937" />
            </linearGradient>
            <linearGradient id={belly} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9ca3af" />
              <stop offset="100%" stopColor="#6b7280" />
            </linearGradient>
            <linearGradient id={plate} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="55%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#115e59" />
            </linearGradient>
            <radialGradient id={eye} cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#5eead4" />
              <stop offset="70%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#0f766e" />
            </radialGradient>
            <linearGradient id={breath} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#99f6e4" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Ground shadow */}
          <ellipse
            className="kaiju-shadow"
            cx="150"
            cy="278"
            rx={52 + clamped * 8}
            ry="9"
            fill="#111827"
            opacity="0.1"
          />

          {clamped === 0 ? (
            <g>
              <ellipse cx="150" cy="175" rx="52" ry="62" fill={`url(#${skin})`} />
              <ellipse cx="150" cy="185" rx="28" ry="34" fill={`url(#${belly})`} opacity="0.55" />
              <ellipse cx="150" cy="168" rx="14" ry="16" fill={`url(#${eye})`} opacity="0.45" />
              {/* Tiny plate buds on top of egg */}
              <path d="M138 128 L144 108 L152 126 Z" fill={`url(#${plate})`} />
              <path d="M152 126 L160 106 L168 128 Z" fill={`url(#${plate})`} opacity="0.85" />
              <path
                d="M128 150 C136 138, 164 138, 172 150"
                fill="none"
                stroke="#4b5563"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          ) : (
            <g>
              {/* ========== BACK / SPINE PLATES (drawn first so body overlaps base) ========== */}
              <g>
                {/* Tall row along the spine — behind the body silhouette */}
                <path
                  d="M168 78 L176 28 L192 72 Z"
                  fill={`url(#${plate})`}
                  stroke="#0f766e"
                  strokeWidth="1"
                />
                <path
                  d="M178 98 L190 42 L206 92 Z"
                  fill={`url(#${plate})`}
                  stroke="#0f766e"
                  strokeWidth="1"
                />
                {clamped >= 2 ? (
                  <path
                    d="M188 124 L204 68 L218 118 Z"
                    fill={`url(#${plate})`}
                    stroke="#0f766e"
                    strokeWidth="1"
                  />
                ) : null}
                {clamped >= 3 ? (
                  <path
                    d="M196 152 L214 100 L228 148 Z"
                    fill={`url(#${plate})`}
                    stroke="#0f766e"
                    strokeWidth="1"
                  />
                ) : null}
                {clamped >= 4 ? (
                  <path
                    d="M200 178 L220 132 L232 176 Z"
                    fill={`url(#${plate})`}
                    stroke="#0f766e"
                    strokeWidth="1"
                  />
                ) : null}

                {/* Secondary smaller plates tucked behind */}
                <path d="M162 92 L168 58 L178 88 Z" fill={`url(#${plate})`} opacity="0.7" />
                {clamped >= 2 ? (
                  <path d="M184 138 L194 96 L206 132 Z" fill={`url(#${plate})`} opacity="0.65" />
                ) : null}
              </g>

              {/* ========== TAIL ========== */}
              {clamped >= 2 ? (
                <g>
                  <path
                    d="M188 188
                       C220 182, 248 168, 272 140
                       C278 132, 286 128, 292 134
                       C280 152, 252 186, 214 206
                       C200 214, 186 208, 180 198 Z"
                    fill={`url(#${skin})`}
                  />
                  {/* Tail ridges */}
                  <path
                    d="M210 176 L218 158 L226 174"
                    fill="none"
                    stroke="#0f766e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.55"
                  />
                  <path
                    d="M236 160 L244 144 L252 158"
                    fill="none"
                    stroke="#0f766e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.45"
                  />
                  {clamped >= 3 ? (
                    <path
                      d="M254 148 L262 132 L270 146"
                      fill={`url(#${plate})`}
                      opacity="0.8"
                    />
                  ) : null}
                </g>
              ) : null}

              {/* ========== LEGS ========== */}
              <g>
                <path
                  d="M108 198 L96 262 L122 262 L132 204 Z"
                  fill={`url(#${skin})`}
                />
                <path
                  d="M156 200 L150 262 L176 262 L170 204 Z"
                  fill={`url(#${skin})`}
                />
                {/* Toes */}
                <path
                  d="M96 262 L90 268 L100 268 M108 262 L104 270 L114 268 M120 262 L118 270 L128 266"
                  fill="none"
                  stroke="#1f2937"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M150 262 L146 270 L156 268 M162 262 L160 270 L170 268 M174 262 L172 268 L180 266"
                  fill="none"
                  stroke="#1f2937"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Knee highlight */}
                <ellipse cx="116" cy="228" rx="6" ry="8" fill="#4b5563" opacity="0.35" />
                <ellipse cx="160" cy="230" rx="6" ry="8" fill="#4b5563" opacity="0.35" />
              </g>

              {/* ========== TORSO ========== */}
              <path
                d="M118 96
                   C108 126, 100 164, 106 204
                   C118 228, 168 230, 184 206
                   C194 170, 190 130, 180 100
                   C168 78, 132 76, 118 96 Z"
                fill={`url(#${skin})`}
              />

              {/* Belly plates */}
              <path
                d="M128 124
                   C124 150, 124 176, 130 198
                   C140 210, 160 210, 168 196
                   C172 172, 170 146, 164 124
                   C154 112, 138 112, 128 124 Z"
                fill={`url(#${belly})`}
                opacity="0.55"
              />
              <path
                d="M132 140 H162 M130 156 H164 M130 172 H162 M132 188 H158"
                fill="none"
                stroke="#4b5563"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.45"
              />

              {/* Scale marks on shoulder */}
              <g stroke="#1f2937" strokeWidth="1.2" opacity="0.35" fill="none">
                <path d="M124 112 C128 108, 134 108, 138 112" />
                <path d="M120 122 C124 118, 130 118, 134 122" />
                <path d="M168 118 C172 114, 178 114, 182 118" />
                <path d="M166 130 C170 126, 176 126, 180 130" />
              </g>

              {/* ========== ARMS ========== */}
              <g>
                <path
                  d="M118 128
                     C92 136, 74 158, 78 182
                     C84 190, 96 186, 104 176
                     C110 164, 118 148, 124 138 Z"
                  fill={`url(#${skin})`}
                />
                <path
                  d="M176 130
                     C200 138, 216 158, 214 180
                     C208 190, 196 186, 188 176
                     C182 164, 176 148, 172 138 Z"
                  fill={`url(#${skin})`}
                />
                {/* Claws */}
                <path
                  d="M78 182 L70 192 M82 186 L78 196 M88 184 L86 194"
                  fill="none"
                  stroke="#111827"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M214 180 L222 190 M210 186 L214 196 M204 184 L206 194"
                  fill="none"
                  stroke="#111827"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </g>

              {/* ========== HEAD ========== */}
              <g>
                <path
                  d="M126 64
                     C118 84, 122 108, 142 116
                     C162 110, 170 88, 166 66
                     C160 48, 136 48, 126 64 Z"
                  fill={`url(#${skin})`}
                />

                {/* Brow ridges */}
                <path
                  d="M128 72 C132 66, 140 66, 144 72"
                  fill="none"
                  stroke="#1f2937"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M148 70 C152 64, 160 64, 164 72"
                  fill="none"
                  stroke="#1f2937"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Eyes */}
                <ellipse cx="136" cy="80" rx="5" ry="4.5" fill={`url(#${eye})`} />
                <ellipse cx="156" cy="78" rx="5" ry="4.5" fill={`url(#${eye})`} />
                <circle cx="137" cy="80" r="1.6" fill="#042f2e" />
                <circle cx="157" cy="78" r="1.6" fill="#042f2e" />

                {/* Snout / nostrils */}
                <ellipse cx="146" cy="96" rx="10" ry="7" fill="#374151" />
                <circle cx="142" cy="96" r="1.4" fill="#111827" />
                <circle cx="150" cy="95" r="1.4" fill="#111827" />

                {/* Mouth with teeth hint */}
                <path
                  d="M134 104 C142 112, 152 112, 160 102"
                  fill="none"
                  stroke="#111827"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {clamped >= 2 ? (
                  <g fill="#e5e7eb">
                    <path d="M138 106 L140 112 L142 106 Z" />
                    <path d="M144 108 L146 114 L148 108 Z" />
                    <path d="M150 108 L152 114 L154 108 Z" />
                  </g>
                ) : null}

                {/* Ear fins / cheek spikes */}
                <path d="M122 78 L110 70 L120 88 Z" fill={`url(#${skin})`} />
                <path d="M168 74 L182 64 L172 86 Z" fill={`url(#${skin})`} />
              </g>

              {/* Neck folds */}
              <path
                d="M132 114 C138 120, 150 120, 158 112"
                fill="none"
                stroke="#1f2937"
                strokeWidth="1.5"
                opacity="0.35"
              />

              {/* ========== ATOMIC BREATH ========== */}
              {clamped >= 4 ? (
                <g>
                  <path
                    d="M136 100 C110 112, 78 124, 42 128"
                    fill="none"
                    stroke={`url(#${breath})`}
                    strokeWidth="10"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                  <path
                    d="M136 100 C112 108, 84 116, 52 118"
                    fill="none"
                    stroke="#ccfbf1"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                </g>
              ) : null}
            </g>
          )}
        </svg>
      </div>

      {name ? (
        <p className="mt-2 font-[family-name:var(--font-display)] text-base font-medium tracking-tight text-[var(--ink)]">
          {name}
        </p>
      ) : null}
    </div>
  );
}

type DragonProps = {
  stage: number;
  name: string;
  className?: string;
};

export function Dragon({ stage, name, className = "" }: DragonProps) {
  const uid = useId().replace(/:/g, "");
  const clamped = Math.max(0, Math.min(4, stage));
  const scale = STAGE_SCALE[clamped];

  const scaleGrad = `dscale-${uid}`;
  const bellyGrad = `dbelly-${uid}`;
  const wingGrad = `dwing-${uid}`;
  const fireGrad = `dfire-${uid}`;
  const eyeGrad = `deye-${uid}`;
  const hornGrad = `dhorn-${uid}`;

  return (
    <div className={`godzilla-stage relative flex flex-col items-center ${className}`}>
      <div
        className="godzilla-idle relative"
        style={{ transform: `scale(${scale})`, transformOrigin: "center bottom" }}
      >
        <svg
          viewBox="0 0 340 300"
          className="relative h-60 w-72 sm:h-80 sm:w-[26rem]"
          role="img"
          aria-label={`${name} dragon at stage ${clamped}`}
        >
          <defs>
            <linearGradient id={scaleGrad} x1="0.2" y1="0" x2="0.85" y2="1">
              <stop offset="0%" stopColor="#0f766e" />
              <stop offset="45%" stopColor="#115e59" />
              <stop offset="100%" stopColor="#134e4a" />
            </linearGradient>
            <linearGradient id={bellyGrad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fcd34d" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id={wingGrad} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#0d9488" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#134e4a" stopOpacity="0.75" />
            </linearGradient>
            <linearGradient id={fireGrad} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="40%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
            </linearGradient>
            <radialGradient id={eyeGrad} cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="70%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </radialGradient>
            <linearGradient id={hornGrad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e5e7eb" />
              <stop offset="100%" stopColor="#9ca3af" />
            </linearGradient>
          </defs>

          <ellipse
            className="kaiju-shadow"
            cx="155"
            cy="278"
            rx={54 + clamped * 8}
            ry="9"
            fill="#111827"
            opacity="0.1"
          />

          {clamped === 0 ? (
            <g>
              <ellipse cx="155" cy="178" rx="48" ry="56" fill={`url(#${scaleGrad})`} />
              <ellipse cx="155" cy="188" rx="26" ry="30" fill={`url(#${bellyGrad})`} opacity="0.7" />
              <path
                d="M140 140 C148 128, 162 128, 170 140"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="155" cy="170" r="8" fill={`url(#${eyeGrad})`} opacity="0.5" />
              {/* Crack lines on egg */}
              <path
                d="M142 156 L150 170 L146 186 M168 152 L160 168 L164 184"
                fill="none"
                stroke="#134e4a"
                strokeWidth="1.5"
                opacity="0.5"
              />
            </g>
          ) : (
            <g>
              {/* Wings — behind body */}
              {clamped >= 2 ? (
                <g>
                  <path
                    d="M168 120
                       C210 70, 260 58, 292 78
                       C270 96, 240 120, 210 146
                       C192 158, 176 148, 168 132 Z"
                    fill={`url(#${wingGrad})`}
                    stroke="#134e4a"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M176 126 C210 90, 248 78, 278 88"
                    fill="none"
                    stroke="#134e4a"
                    strokeWidth="1.5"
                    opacity="0.45"
                  />
                  <path
                    d="M180 138 C214 112, 246 104, 272 116"
                    fill="none"
                    stroke="#134e4a"
                    strokeWidth="1.5"
                    opacity="0.35"
                  />
                  {clamped >= 3 ? (
                    <path
                      d="M112 124
                         C70 78, 36 70, 18 92
                         C40 108, 72 132, 100 152
                         C112 158, 120 146, 112 124 Z"
                      fill={`url(#${wingGrad})`}
                      stroke="#134e4a"
                      strokeWidth="1.5"
                      opacity="0.85"
                    />
                  ) : null}
                </g>
              ) : null}

              {/* Tail */}
              <path
                d="M188 186
                   C230 178, 268 150, 296 112
                   C304 102, 314 106, 310 118
                   C292 158, 250 198, 204 214
                   C190 220, 178 208, 180 196 Z"
                fill={`url(#${scaleGrad})`}
              />
              {/* Tail tip spike */}
              {clamped >= 2 ? (
                <path
                  d="M296 112 L318 96 L308 120 Z"
                  fill={`url(#${hornGrad})`}
                />
              ) : null}
              {/* Tail scales */}
              <g fill="none" stroke="#0f766e" strokeWidth="1.5" opacity="0.4">
                <path d="M210 188 C216 180, 224 180, 230 188" />
                <path d="M236 176 C242 168, 250 168, 256 176" />
                <path d="M260 160 C266 152, 274 152, 280 160" />
              </g>

              {/* Hind legs */}
              <path
                d="M118 198 L104 262 L130 262 L140 204 Z"
                fill={`url(#${scaleGrad})`}
              />
              <path
                d="M158 200 L152 262 L178 262 L172 204 Z"
                fill={`url(#${scaleGrad})`}
              />
              {/* Clawed toes */}
              <path
                d="M104 262 L96 272 M114 262 L110 274 M126 262 L124 272"
                fill="none"
                stroke="#111827"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M152 262 L146 274 M164 262 L162 274 M176 262 L174 272"
                fill="none"
                stroke="#111827"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Body */}
              <path
                d="M120 100
                   C108 132, 104 168, 112 206
                   C126 228, 170 230, 186 208
                   C198 170, 194 132, 182 102
                   C168 80, 136 80, 120 100 Z"
                fill={`url(#${scaleGrad})`}
              />

              {/* Belly */}
              <path
                d="M132 128
                   C126 154, 128 180, 136 198
                   C146 210, 164 210, 172 196
                   C178 172, 176 146, 168 126
                   C156 114, 140 116, 132 128 Z"
                fill={`url(#${bellyGrad})`}
                opacity="0.85"
              />
              <path
                d="M136 144 H166 M134 160 H168 M136 176 H164 M140 190 H160"
                fill="none"
                stroke="#b45309"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity="0.45"
              />

              {/* Spine ridges along back edge */}
              <g fill={`url(#${hornGrad})`}>
                <path d="M170 96 L176 72 L186 94 Z" />
                <path d="M178 118 L186 90 L196 116 Z" />
                {clamped >= 2 ? <path d="M186 144 L196 114 L206 142 Z" /> : null}
                {clamped >= 3 ? <path d="M192 170 L204 140 L214 168 Z" /> : null}
              </g>

              {/* Forearms */}
              <path
                d="M122 132
                   C96 142, 80 164, 86 186
                   C94 194, 106 188, 114 176
                   C120 162, 126 146, 130 138 Z"
                fill={`url(#${scaleGrad})`}
              />
              <path
                d="M178 134
                   C202 144, 216 164, 212 186
                   C204 194, 192 188, 184 176
                   C178 162, 174 146, 172 138 Z"
                fill={`url(#${scaleGrad})`}
              />
              <path
                d="M86 186 L78 196 M90 190 L86 200 M98 188 L96 198"
                fill="none"
                stroke="#111827"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M212 186 L220 196 M208 190 L212 200 M200 188 L202 198"
                fill="none"
                stroke="#111827"
                strokeWidth="2.2"
                strokeLinecap="round"
              />

              {/* Head */}
              <path
                d="M128 62
                   C118 82, 124 108, 148 114
                   C170 108, 178 84, 172 62
                   C164 44, 138 44, 128 62 Z"
                fill={`url(#${scaleGrad})`}
              />

              {/* Snout */}
              <path
                d="M140 92
                   C136 104, 142 114, 156 116
                   C168 112, 172 100, 166 90
                   C158 84, 146 86, 140 92 Z"
                fill={`url(#${scaleGrad})`}
              />
              <ellipse cx="154" cy="102" rx="8" ry="5" fill={`url(#${bellyGrad})`} opacity="0.5" />

              {/* Horns */}
              <path d="M134 58 L128 28 L144 54 Z" fill={`url(#${hornGrad})`} />
              <path d="M158 54 L168 22 L174 56 Z" fill={`url(#${hornGrad})`} />
              {clamped >= 3 ? (
                <path d="M146 52 L150 34 L156 52 Z" fill={`url(#${hornGrad})`} opacity="0.85" />
              ) : null}

              {/* Ears / frills */}
              <path d="M124 74 L108 62 L120 88 Z" fill={`url(#${scaleGrad})`} />
              <path d="M172 70 L190 56 L178 86 Z" fill={`url(#${scaleGrad})`} />

              {/* Eyes */}
              <ellipse cx="140" cy="76" rx="5.5" ry="5" fill={`url(#${eyeGrad})`} />
              <ellipse cx="160" cy="74" rx="5.5" ry="5" fill={`url(#${eyeGrad})`} />
              <circle cx="141" cy="76" r="1.8" fill="#111827" />
              <circle cx="161" cy="74" r="1.8" fill="#111827" />

              {/* Nostrils */}
              <circle cx="148" cy="104" r="1.5" fill="#134e4a" />
              <circle cx="158" cy="103" r="1.5" fill="#134e4a" />

              {/* Mouth */}
              <path
                d="M142 110 C150 118, 160 118, 168 108"
                fill="none"
                stroke="#134e4a"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {clamped >= 2 ? (
                <g fill="#fef3c7">
                  <path d="M146 112 L148 118 L150 112 Z" />
                  <path d="M152 114 L154 120 L156 114 Z" />
                  <path d="M158 114 L160 120 L162 114 Z" />
                </g>
              ) : null}

              {/* Fire breath */}
              {clamped >= 4 ? (
                <g>
                  <path
                    d="M140 108 C108 118, 70 128, 28 132"
                    fill="none"
                    stroke={`url(#${fireGrad})`}
                    strokeWidth="12"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                  <path
                    d="M140 108 C112 114, 78 120, 40 122"
                    fill="none"
                    stroke="#fef3c7"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                </g>
              ) : null}
            </g>
          )}
        </svg>
      </div>

      {name ? (
        <p className="mt-2 font-[family-name:var(--font-display)] text-base font-medium tracking-tight text-[var(--ink)]">
          {name}
        </p>
      ) : null}
    </div>
  );
}

/** @deprecated Use Dragon — kept for any leftover imports */
export function DragonStub({
  name,
  stage = 3,
}: {
  name: string;
  stage?: number;
}) {
  return <Dragon stage={stage} name={name} />;
}
