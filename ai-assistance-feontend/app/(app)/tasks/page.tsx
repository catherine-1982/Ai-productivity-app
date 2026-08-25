"use client";

import { FormEvent, useMemo, useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Form";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import { Priority, Task, TaskStatus } from "@/types";

export default function TasksPage() {
  const { tasks, addTask, updateTask, toggleTask, deleteTask } = useApp();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [sort, setSort] = useState("Priority");
  const [editing, setEditing] = useState<Task | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const priorityRank = { High: 0, Medium: 1, Low: 2 };
    return tasks
      .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()) || task.category.toLowerCase().includes(search.toLowerCase()))
      .filter((task) => status === "All" || task.status === status)
      .filter((task) => priority === "All" || task.priority === priority)
      .sort((a, b) => sort === "Priority" ? priorityRank[a.priority] - priorityRank[b.priority] : a.title.localeCompare(b.title));
  }, [tasks, search, status, priority, sort]);

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <h2 className="text-3xl font-semibold">Task Management</h2>
          <p className="mt-2 text-muted">Create, filter, prioritize, and complete mock tasks.</p>
        </div>
        <Button onClick={() => { setEditing(null); setOpen(true); }}><Icon name="plus" /> Add Task</Button>
      </section>

      <section className="panel rounded-3xl p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_160px_160px_160px]">
          <label className="relative">
            <Icon name="search" className="absolute left-4 top-3.5 text-muted" />
            <input className={`${inputClass} pl-12`} value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tasks or categories" />
          </label>
          <select className={inputClass} value={status} onChange={(event) => setStatus(event.target.value)}>
            {["All", "Pending", "In Progress", "Completed"].map((item) => <option key={item}>{item}</option>)}
          </select>
          <select className={inputClass} value={priority} onChange={(event) => setPriority(event.target.value)}>
            {["All", "High", "Medium", "Low"].map((item) => <option key={item}>{item}</option>)}
          </select>
          <select className={inputClass} value={sort} onChange={(event) => setSort(event.target.value)}>
            {["Priority", "Title"].map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
      </section>

      <section className="grid gap-4">
        {filtered.map((task) => (
          <article key={task.id} className="panel rounded-3xl p-5 transition hover:-translate-y-0.5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <button onClick={() => toggleTask(task.id)} className={`grid size-8 place-items-center rounded-full border ${task.completed ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-[var(--line)]"}`} aria-label="Toggle complete">
                {task.completed && <Icon name="check" />}
              </button>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className={`text-lg font-semibold ${task.completed ? "line-through text-muted" : ""}`}>{task.title}</h3>
                  <Badge tone={task.priority === "High" ? "red" : task.priority === "Medium" ? "amber" : "green"}>{task.priority}</Badge>
                  <Badge tone={task.status === "Completed" ? "green" : task.status === "In Progress" ? "blue" : "neutral"}>{task.status}</Badge>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">{task.description}</p>
                <p className="mt-3 text-sm"><span className="font-semibold">Deadline:</span> {task.deadline} <span className="mx-2 text-muted">•</span> <span className="font-semibold">Category:</span> {task.category}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" className="size-11 px-0" onClick={() => { setEditing(task); setOpen(true); }} title="Edit task"><Icon name="edit" /></Button>
                <Button variant="secondary" className="size-11 px-0 text-red-600" onClick={() => deleteTask(task.id)} title="Delete task"><Icon name="trash" /></Button>
              </div>
            </div>
          </article>
        ))}
        {!filtered.length && <div className="panel rounded-3xl p-10 text-center"><Icon name="filter" className="mx-auto mb-3 text-muted" /><p className="font-semibold">No tasks match this view.</p><p className="text-muted">Adjust the filters or add a new task.</p></div>}
      </section>

      <TaskModal open={open} editing={editing} onClose={() => setOpen(false)} onSave={(task) => {
        if ("id" in task) updateTask(task);
        else addTask(task);
        setOpen(false);
      }} />
    </div>
  );
}

function TaskModal({ open, editing, onClose, onSave }: { open: boolean; editing: Task | null; onClose: () => void; onSave: (task: Task | Omit<Task, "id" | "completed">) => void }) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      title: String(data.get("title")),
      description: String(data.get("description")),
      priority: String(data.get("priority")) as Priority,
      status: String(data.get("status")) as TaskStatus,
      deadline: String(data.get("deadline")),
      category: String(data.get("category")) as Task["category"],
    };
    if (!payload.title.trim()) return;
    onSave(editing ? { ...editing, ...payload, completed: payload.status === "Completed" } : payload);
  }

  return (
    <Modal title={editing ? "Edit Task" : "Add Task"} open={open} onClose={onClose}>
      <form onSubmit={submit} className="grid gap-4">
        <Field label="Task Title"><input className={inputClass} name="title" defaultValue={editing?.title} required /></Field>
        <Field label="Description"><textarea className={inputClass} name="description" rows={3} defaultValue={editing?.description} /></Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Priority"><select className={inputClass} name="priority" defaultValue={editing?.priority ?? "Medium"}>{["High", "Medium", "Low"].map((item) => <option key={item}>{item}</option>)}</select></Field>
          <Field label="Status"><select className={inputClass} name="status" defaultValue={editing?.status ?? "Pending"}>{["Pending", "In Progress", "Completed"].map((item) => <option key={item}>{item}</option>)}</select></Field>
          <Field label="Deadline"><input className={inputClass} name="deadline" defaultValue={editing?.deadline ?? "Tomorrow"} /></Field>
          <Field label="Category"><select className={inputClass} name="category" defaultValue={editing?.category ?? "School"}>{["School", "Work", "Personal", "Development"].map((item) => <option key={item}>{item}</option>)}</select></Field>
        </div>
        <Button><Icon name="check" /> Save Task</Button>
      </form>
    </Modal>
  );
}
