"use client";

import { FormEvent, useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Form";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import { Reminder } from "@/types";

export default function RemindersPage() {
  const { reminders, addReminder, toggleReminder, deleteReminder } = useApp();
  const [open, setOpen] = useState(false);
  const groups: Reminder["dateGroup"][] = ["Today", "Tomorrow", "Upcoming"];

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = String(data.get("title"));
    if (!title.trim()) return;
    addReminder({ title, linkedItem: String(data.get("linkedItem")), dateGroup: String(data.get("dateGroup")) as Reminder["dateGroup"], time: String(data.get("time")), status: "Enabled", leadTime: String(data.get("leadTime")) });
    setOpen(false);
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div><h2 className="text-3xl font-semibold">Reminders</h2><p className="mt-2 text-muted">Nudges grouped by when they need your attention.</p></div>
        <Button onClick={() => setOpen(true)}><Icon name="plus" /> Create Reminder</Button>
      </section>
      <div className="grid gap-5 lg:grid-cols-3">
        {groups.map((group) => (
          <section className="panel rounded-3xl p-5" key={group}>
            <h3 className="mb-4 text-xl font-semibold">{group}</h3>
            <div className="space-y-3">
              {reminders.filter((reminder) => reminder.dateGroup === group).map((reminder) => (
                <article key={reminder.id} className="rounded-2xl border border-[var(--line)] p-4">
                  <div className="mb-3 flex items-start justify-between gap-3"><h4 className="font-semibold">{reminder.title}</h4><Badge tone={reminder.status === "Enabled" ? "green" : "neutral"}>{reminder.status}</Badge></div>
                  <p className="text-sm text-muted">{reminder.linkedItem}</p>
                  <p className="mt-2 font-semibold">{reminder.time}</p>
                  <p className="mt-1 text-sm text-muted">Reminder: {reminder.leadTime}</p>
                  <div className="mt-4 flex gap-2">
                    <Button variant="secondary" className="flex-1" onClick={() => toggleReminder(reminder.id)}>{reminder.status === "Enabled" ? "Disable" : "Enable"}</Button>
                    <Button variant="secondary" className="size-11 px-0 text-red-600" onClick={() => deleteReminder(reminder.id)}><Icon name="trash" /></Button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
      <Modal title="Create Reminder" open={open} onClose={() => setOpen(false)}>
        <form onSubmit={submit} className="grid gap-4">
          <Field label="Title"><input className={inputClass} name="title" required /></Field>
          <Field label="Associated task/event"><input className={inputClass} name="linkedItem" defaultValue="CSC project" /></Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Group"><select className={inputClass} name="dateGroup">{groups.map((item) => <option key={item}>{item}</option>)}</select></Field>
            <Field label="Time"><input className={inputClass} name="time" defaultValue="7:00 PM" /></Field>
            <Field label="Lead time"><input className={inputClass} name="leadTime" defaultValue="30 minutes before" /></Field>
          </div>
          <Button><Icon name="bell" /> Save Reminder</Button>
        </form>
      </Modal>
    </div>
  );
}
