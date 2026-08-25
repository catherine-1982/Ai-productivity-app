"use client";

import { useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ThemePreference } from "@/types";

const notificationSettings = ["Task reminders", "Event reminders", "AI recommendations", "Daily summary"];
const aiSettings = ["Automatic priority suggestions", "Automatic scheduling recommendations", "Reminder recommendations", "Productivity insights"];

export default function SettingsPage() {
  const { theme, setTheme } = useApp();
  const [enabled, setEnabled] = useState<Record<string, boolean>>(Object.fromEntries([...notificationSettings, ...aiSettings].map((item) => [item, true])));

  return (
    <div className="space-y-6">
      <div><h2 className="text-3xl font-semibold">Settings</h2><p className="mt-2 text-muted">Mock preferences for appearance, notifications, and AI behavior.</p></div>
      <section className="panel rounded-3xl p-6">
        <h3 className="text-xl font-semibold">Appearance</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {(["light", "dark", "system"] as ThemePreference[]).map((item) => (
            <button key={item} onClick={() => setTheme(item)} className={`rounded-2xl px-5 py-3 text-sm font-semibold capitalize ${theme === item ? "bg-[var(--ink)] text-[var(--surface)]" : "bg-[var(--background)] text-muted"}`}>
              {item}
            </button>
          ))}
        </div>
      </section>
      <SettingGroup title="Notifications" items={notificationSettings} enabled={enabled} setEnabled={setEnabled} />
      <SettingGroup title="AI Preferences" items={aiSettings} enabled={enabled} setEnabled={setEnabled} />
      <section className="panel rounded-3xl p-6">
        <div className="mb-5 flex items-center justify-between"><h3 className="text-xl font-semibold">Account</h3><Badge tone="neutral">Mock only</Badge></div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary"><Icon name="settings" /> Change Password</Button>
          <Button variant="danger"><Icon name="trash" /> Delete Account</Button>
        </div>
      </section>
    </div>
  );
}

function SettingGroup({ title, items, enabled, setEnabled }: { title: string; items: string[]; enabled: Record<string, boolean>; setEnabled: React.Dispatch<React.SetStateAction<Record<string, boolean>>> }) {
  return (
    <section className="panel rounded-3xl p-6">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <label key={item} className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--line)] p-4">
            <span className="font-semibold">{item}</span>
            <input type="checkbox" checked={enabled[item]} onChange={() => setEnabled((current) => ({ ...current, [item]: !current[item] }))} className="size-5 accent-[var(--accent)]" />
          </label>
        ))}
      </div>
    </section>
  );
}
