"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/components/providers/AppProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Form";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";

export default function DashboardPage() {
  const { tasks, events, addTask, addEvent, addReminder, toggleTask } = useApp();
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState<"" | "task" | "event" | "reminder">("");
  const completed = tasks.filter((task) => task.completed).length;
  const visibleTasks = tasks.filter((task) => filter === "All" || task.priority === filter).slice(0, 5);
  const score = Math.round((completed / tasks.length) * 100);
  const stats = [
    ["Total Tasks", tasks.length, "check"],
    ["Completed Tasks", completed, "sparkles"],
    ["Upcoming Events", events.length, "calendar"],
    ["Productivity Score", `${score}%`, "analytics"],
  ] as const;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1fr_auto]">
        <div>
          <h2 className="text-4xl font-semibold">Good morning, Alex 👋</h2>
          <p className="mt-2 text-muted">Here is what your day looks like.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setModal("task")}><Icon name="plus" /> Add Task</Button>
          <Button variant="secondary" onClick={() => setModal("event")}><Icon name="calendar" /> Add Event</Button>
          <Button variant="secondary" onClick={() => setModal("reminder")}><Icon name="bell" /> Add Reminder</Button>
          <Link href="/assistant" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold"><Icon name="bot" /> Ask AI</Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value, icon]) => (
          <article key={label} className="panel rounded-3xl p-5">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-sm text-muted">{label}</span>
              <span className="grid size-10 place-items-center rounded-2xl bg-[var(--background)] text-[var(--accent)]"><Icon name={icon} /></span>
            </div>
            <p className="text-4xl font-semibold">{value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
        <div className="panel rounded-3xl p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-semibold">Today&apos;s Tasks</h3>
            <div className="flex gap-2">{["All", "High", "Medium", "Low"].map((item) => <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-3 py-1.5 text-sm font-semibold ${filter === item ? "bg-[var(--ink)] text-[var(--surface)]" : "bg-[var(--background)] text-muted"}`}>{item}</button>)}</div>
          </div>
          <div className="space-y-3">
            {visibleTasks.map((task) => (
              <button key={task.id} onClick={() => toggleTask(task.id)} className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-[var(--line)] p-4 text-left transition hover:bg-[var(--background)]">
                <span className={`grid size-6 place-items-center rounded-full border ${task.completed ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-[var(--line)]"}`}>{task.completed && <Icon name="check" className="size-4" />}</span>
                <span><span className={`block font-semibold ${task.completed ? "line-through text-muted" : ""}`}>{task.title}</span><span className="text-sm text-muted">Due {task.deadline}</span></span>
                <Badge tone={task.priority === "High" ? "red" : task.priority === "Medium" ? "amber" : "green"}>{task.priority}</Badge>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="panel rounded-3xl p-5">
            <h3 className="mb-4 text-xl font-semibold">Today&apos;s Schedule</h3>
            <div className="space-y-3">
              {events.slice(0, 5).map((event) => (
                <div key={event.id} className="flex gap-4 rounded-2xl bg-[var(--background)] p-4">
                  <span className="w-16 text-sm font-semibold text-[var(--accent)]">{formatTime(event.startTime)}</span>
                  <div><p className="font-semibold">{event.title}</p><p className="text-sm text-muted">{event.description}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-[var(--ink)] p-6 text-[var(--surface)]">
            <div className="mb-3 flex items-center gap-2 font-semibold"><Icon name="sparkles" /> AI Recommendation</div>
            <p className="leading-7 opacity-80">Your Django project is due sooner than your other tasks. I recommend completing the API structure before your evening study session.</p>
            <div className="mt-5 flex gap-2">
              <Link href="/assistant" className="rounded-2xl bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--ink)]">View Plan</Link>
              <Link href="/assistant" className="rounded-2xl border border-white/20 px-4 py-2 text-sm font-semibold">Ask AI</Link>
            </div>
          </div>
        </div>
      </section>

      <QuickModal type={modal} onClose={() => setModal("")} onTask={(title) => addTask({ title, description: "Added from dashboard quick add.", priority: "Medium", status: "Pending", deadline: "Today", category: "School" })} onEvent={(title) => addEvent({ title, date: "2026-08-26", startTime: "18:00", endTime: "19:00", category: "School", description: "Added from dashboard quick add." })} onReminder={(title) => addReminder({ title, linkedItem: title, dateGroup: "Today", time: "6:00 PM", status: "Enabled", leadTime: "30 minutes before" })} />
    </div>
  );
}

function formatTime(value: string) {
  const [hour, minute] = value.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 || 12;
  return `${display}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function QuickModal({ type, onClose, onTask, onEvent, onReminder }: { type: "" | "task" | "event" | "reminder"; onClose: () => void; onTask: (title: string) => void; onEvent: (title: string) => void; onReminder: (title: string) => void }) {
  const [title, setTitle] = useState("");
  const label = type === "task" ? "Task title" : type === "event" ? "Event title" : "Reminder title";
  function save() {
    if (!title.trim()) return;
    if (type === "task") onTask(title);
    if (type === "event") onEvent(title);
    if (type === "reminder") onReminder(title);
    setTitle("");
    onClose();
  }
  return (
    <Modal title={`Add ${type || "item"}`} open={Boolean(type)} onClose={onClose}>
      <div className="space-y-4">
        <Field label={label}><input className={inputClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Enter a clear title" /></Field>
        <Button onClick={save} className="w-full"><Icon name="plus" /> Save</Button>
      </div>
    </Modal>
  );
}
