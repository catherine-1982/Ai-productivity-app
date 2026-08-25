"use client";

import { FormEvent, useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Form";
import { Icon } from "@/components/ui/Icon";

export default function ProfilePage() {
  const { user, setUser } = useApp();
  const [saved, setSaved] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setUser({
      ...user,
      fullName: String(data.get("fullName")),
      email: String(data.get("email")),
      role: String(data.get("role")),
      timezone: String(data.get("timezone")),
      workingHours: String(data.get("workingHours")),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <aside className="panel rounded-3xl p-6">
        <div className="mx-auto grid size-28 place-items-center rounded-full bg-[var(--accent)] text-4xl font-semibold text-white">AJ</div>
        <h2 className="mt-5 text-center text-2xl font-semibold">{user.fullName}</h2>
        <p className="text-center text-muted">{user.role}</p>
        <div className="mt-6 space-y-3 rounded-3xl bg-[var(--background)] p-4 text-sm">
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Timezone:</span> {user.timezone}</p>
          <p><span className="font-semibold">Work hours:</span> {user.workingHours}</p>
        </div>
      </aside>
      <form onSubmit={submit} className="panel rounded-3xl p-6">
        <h3 className="text-2xl font-semibold">Profile Details</h3>
        <p className="mt-2 text-muted">Editable locally for the frontend prototype.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Field label="Full Name"><input className={inputClass} name="fullName" defaultValue={user.fullName} /></Field>
          <Field label="Email"><input className={inputClass} name="email" type="email" defaultValue={user.email} /></Field>
          <Field label="Role"><input className={inputClass} name="role" defaultValue={user.role} /></Field>
          <Field label="Timezone"><input className={inputClass} name="timezone" defaultValue={user.timezone} /></Field>
          <Field label="Preferred Working Hours"><input className={inputClass} name="workingHours" defaultValue={user.workingHours} /></Field>
        </div>
        <Button className="mt-6"><Icon name="check" /> Save Profile</Button>
        {saved && <span className="ml-3 text-sm font-semibold text-[var(--accent)]">Saved locally</span>}
      </form>
    </div>
  );
}
