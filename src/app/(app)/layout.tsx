import Link from "next/link";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { signOut } from "@/lib/goal-actions";
import { hasSession } from "@/lib/auth";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();

  if (!(await hasSession())) {
    redirect("/login");
  }

  return (
    <div className="relative flex flex-1 flex-col">
      <div className="page-wash absolute inset-0 -z-10" aria-hidden />
      <header className="border-b border-[var(--line)] bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/dashboard"
            className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[var(--ink)]"
          >
            Kaiju
          </Link>
          <nav className="flex items-center gap-5 text-sm text-[var(--muted)]">
            <Link className="hover:text-[var(--ink)]" href="/dashboard">
              Today
            </Link>
            <Link className="hover:text-[var(--ink)]" href="/history">
              History
            </Link>
            <Link className="hover:text-[var(--ink)]" href="/settings">
              Settings
            </Link>
            <form action={signOut}>
              <button type="submit" className="hover:text-[var(--ink)]">
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">{children}</main>
    </div>
  );
}
