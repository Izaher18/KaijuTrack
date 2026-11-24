import type { HeatmapCell } from "@/lib/stats";

const LEVEL_CLASS = [
  "bg-[var(--panel-strong)]",
  "bg-teal-100",
  "bg-teal-300",
  "bg-teal-500",
  "bg-teal-700",
] as const;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function Heatmap({ cells }: { cells: HeatmapCell[] }) {
  // GitHub-style: columns are weeks, rows are Sun→Sat
  const weeks: HeatmapCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  const monthLabels: { index: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, index) => {
    const first = week[0];
    if (!first) return;
    const month = Number(first.date.slice(5, 7)) - 1;
    if (month !== lastMonth) {
      monthLabels.push({ index, label: MONTHS[month] });
      lastMonth = month;
    }
  });

  return (
    <div>
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
            Consistency
          </p>
          <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[var(--ink)]">
            Activity
          </h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-[var(--muted)]">
          <span>Less</span>
          {LEVEL_CLASS.map((cls, i) => (
            <span
              key={cls}
              className={`inline-block h-2.5 w-2.5 rounded-sm ${cls}`}
              title={`Level ${i}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-max">
          <div
            className="mb-1 grid gap-1"
            style={{
              gridTemplateColumns: `repeat(${weeks.length}, 0.65rem)`,
              marginLeft: "1.25rem",
            }}
          >
            {weeks.map((_, index) => {
              const label = monthLabels.find((m) => m.index === index);
              return (
                <span
                  key={`m-${index}`}
                  className="text-[10px] text-[var(--muted)]"
                >
                  {label?.label ?? ""}
                </span>
              );
            })}
          </div>

          <div className="flex gap-1">
            <div className="flex w-4 flex-col justify-around pr-1 text-[9px] leading-none text-[var(--muted)]">
              <span />
              <span>M</span>
              <span />
              <span>W</span>
              <span />
              <span>F</span>
              <span />
            </div>
            <div className="flex gap-1">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-1">
                  {week.map((cell) => (
                    <div
                      key={cell.date}
                      title={`${cell.date}: ${cell.intensity}/4 goals${cell.perfectDay ? " · perfect" : ""}${cell.xp ? ` · ${cell.xp} XP` : ""}`}
                      className={`h-2.5 w-2.5 rounded-sm ${LEVEL_CLASS[cell.intensity]} ${cell.perfectDay ? "ring-1 ring-[var(--ink)]/20" : ""}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
