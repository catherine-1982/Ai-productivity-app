"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

const nav = [
  ["Dashboard", "/dashboard", "dashboard"],
  ["Tasks", "/tasks", "check"],
  ["Calendar", "/calendar", "calendar"],
  ["Reminders", "/reminders", "bell"],
  ["AI Assistant", "/assistant", "bot"],
  ["Analytics", "/analytics", "analytics"],
  ["Profile", "/profile", "user"],
  ["Settings", "/settings", "settings"],
] as const;

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const content = (
    <aside className="flex h-full w-72 flex-col border-r border-[var(--line)] bg-[var(--surface)] p-4">
      <div className="mb-7 flex items-center gap-3 px-2">
        <span className="grid size-11 place-items-center rounded-2xl bg-[var(--ink)] text-[var(--surface)]"><Icon name="sparkles" /></span>
        <div>
          <p className="font-semibold">Productivity AI</p>
          <p className="text-xs text-muted">Intelligent companion</p>
        </div>
      </div>
      <nav className="space-y-1">
        {nav.map(([label, href, icon]) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} onClick={onClose} className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition ${active ? "bg-[var(--ink)] text-[var(--surface)]" : "text-muted hover:bg-[var(--background)] hover:text-[var(--ink)]"}`}>
              <Icon name={icon} /> {label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-3xl bg-[var(--background)] p-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-full bg-[var(--accent)] font-semibold text-white">AJ</div>
          <div>
            <p className="text-sm font-semibold">Alex Johnson</p>
            <p className="text-xs text-muted">CS Student</p>
          </div>
        </div>
        <button className="flex w-full items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold text-muted hover:bg-[var(--surface)]" onClick={() => router.push("/login")}>
          <Icon name="logout" /> Logout
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden lg:block">{content}</div>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button aria-label="Close menu" className="absolute inset-0 bg-black/40" onClick={onClose} />
          <div className="relative h-full">{content}</div>
        </div>
      )}
    </>
  );
}
