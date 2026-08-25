"use client";

import { usePathname } from "next/navigation";
import { useApp } from "@/components/providers/AppProvider";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/tasks": "Tasks",
  "/calendar": "Calendar",
  "/reminders": "Reminders",
  "/assistant": "AI Assistant",
  "/analytics": "Analytics",
  "/profile": "Profile",
  "/settings": "Settings",
};

export function Header({ onMenu }: { onMenu: () => void }) {
  const pathname = usePathname();
  const { theme, setTheme } = useApp();
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[var(--line)] bg-[var(--background)]/80 px-4 backdrop-blur-xl md:px-7">
      <div className="flex items-center gap-3">
        <button className="focus-ring rounded-2xl p-2 hover:bg-[var(--surface)] lg:hidden" onClick={onMenu} aria-label="Open menu"><Icon name="menu" /></button>
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">{titles[pathname] ?? "Productivity AI"}</h1>
          <p className="hidden text-sm text-muted sm:block">Local prototype connected to mock state.</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="size-11 px-0" title="Toggle theme">
          <Icon name={theme === "dark" ? "sun" : "moon"} />
        </Button>
        <div className="hidden items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2 md:flex">
          <div className="grid size-8 place-items-center rounded-full bg-[var(--accent)] text-sm font-semibold text-white">AJ</div>
          <span className="text-sm font-semibold">Alex</span>
        </div>
      </div>
    </header>
  );
}
