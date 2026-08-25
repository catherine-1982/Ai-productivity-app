"use client";

import { FormEvent, useMemo, useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Form";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";

export default function CalendarPage() {
  const { events, addEvent } = useApp();
  const [open, setOpen] = useState(false);
  const monthDays = useMemo(() => Array.from({ length: 35 }, (_, index) => index - 4), []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = String(data.get("title"));
    if (!title.trim()) return;
    addEvent({
      title,
      date: String(data.get("date")),
      startTime: String(data.get("start")),
      endTime: String(data.get("end")),
      category: String(data.get("category")),
      description: String(data.get("description")),
    });
    setOpen(false);
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div><h2 className="text-3xl font-semibold">Calendar</h2><p className="mt-2 text-muted">August 2026 schedule with mock planning events.</p></div>
        <Button onClick={() => setOpen(true)}><Icon name="plus" /> Add Event</Button>
      </section>
      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="panel rounded-3xl p-5">
          <div className="mb-5 flex items-center justify-between"><h3 className="text-xl font-semibold">August 2026</h3><Badge tone="blue">Current month</Badge></div>
          <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-muted">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => <div key={day}>{day}</div>)}</div>
          <div className="mt-3 grid grid-cols-7 gap-2">
            {monthDays.map((day, index) => {
              const realDay = day > 0 && day <= 31 ? day : null;
              const dayEvents = events.filter((item) => Number(item.date.split("-")[2]) === realDay).slice(0, 2);
              return (
                <div key={index} className={`min-h-28 rounded-2xl border p-2 ${realDay === 25 ? "border-[var(--accent)] bg-teal-50 dark:bg-teal-400/10" : "border-[var(--line)] bg-[var(--surface-strong)]"} ${!realDay ? "opacity-35" : ""}`}>
                  <p className="mb-2 text-sm font-semibold">{realDay ?? ""}</p>
                  <div className="space-y-1">
                    {dayEvents.map((item) => <p key={item.id} className="truncate rounded-lg bg-[var(--background)] px-2 py-1 text-xs">{item.title}</p>)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <aside className="space-y-4">
          <div className="panel rounded-3xl p-5">
            <h3 className="mb-4 text-xl font-semibold">Today&apos;s Agenda</h3>
            <div className="space-y-3">
              {events.slice(0, 6).map((event) => (
                <article key={event.id} className="rounded-2xl border border-[var(--line)] p-4">
                  <div className="flex items-start justify-between gap-3"><h4 className="font-semibold">{event.title}</h4><Badge>{event.category}</Badge></div>
                  <p className="mt-2 text-sm text-muted">{event.startTime} - {event.endTime}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{event.description}</p>
                </article>
              ))}
            </div>
          </div>
        </aside>
      </section>
      <Modal title="Add Event" open={open} onClose={() => setOpen(false)}>
        <form onSubmit={submit} className="grid gap-4">
          <Field label="Event Title"><input className={inputClass} name="title" required /></Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Date"><input className={inputClass} name="date" type="date" defaultValue="2026-08-26" /></Field>
            <Field label="Start Time"><input className={inputClass} name="start" type="time" defaultValue="19:00" /></Field>
            <Field label="End Time"><input className={inputClass} name="end" type="time" defaultValue="21:00" /></Field>
          </div>
          <Field label="Category"><select className={inputClass} name="category">{["School", "Development", "Meeting", "Personal"].map((item) => <option key={item}>{item}</option>)}</select></Field>
          <Field label="Description"><textarea className={inputClass} name="description" rows={3} /></Field>
          <Button><Icon name="calendar" /> Save Event</Button>
        </form>
      </Modal>
    </div>
  );
}
