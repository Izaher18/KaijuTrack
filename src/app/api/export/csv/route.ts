import { NextResponse } from "next/server";
import { hasSession } from "@/lib/auth";
import { dailyLogsToCsv } from "@/lib/csv";
import { listAllLogs } from "@/lib/logs";
import { toDateKey } from "@/lib/xp";

export async function GET() {
  if (!(await hasSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const logs = await listAllLogs();
  const csv = dailyLogsToCsv(logs);
  const filename = `kaiju-history-${toDateKey()}.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
