import type { YesterdayNudge } from "@/lib/nudge";

export function YesterdayNudgeBanner({ nudge }: { nudge: YesterdayNudge }) {
  if (!nudge.show) return null;

  return (
    <div
      className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
      role="status"
    >
      <p className="font-medium">Yesterday wasn’t perfect</p>
      <p className="mt-1 text-amber-900/80">{nudge.message}</p>
    </div>
  );
}
