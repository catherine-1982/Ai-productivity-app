"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { useApp } from "@/components/providers/AppProvider";
import { defaultAgentFlow, welcomeMessages } from "@/data/agentResponses";
import { assistantService } from "@/services/assistant.service";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ChatMessage, AgentActivity } from "@/types";

const suggestions = ["Plan my day", "What should I work on first?", "Add a task", "Schedule study time", "Show overdue tasks"];

export default function AssistantPage() {
  const { addTask, addEvent, addReminder } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>(welcomeMessages);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [agents, setAgents] = useState<AgentActivity[]>(defaultAgentFlow);
  const messageCounter = useRef(1000);

  async function processMessage(raw: string) {
    const content = raw.trim();
    if (!content || thinking) return;
    const userMessage: ChatMessage = { id: `user-${messageCounter.current++}`, role: "user", content };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setThinking(true);
    setAgents(defaultAgentFlow.map((agent) => ({ ...agent, status: "idle" })));

    for (let index = 0; index < defaultAgentFlow.length; index += 1) {
      setAgents((current) => current.map((agent, itemIndex) => itemIndex === index ? { ...agent, status: "processing" } : agent));
      await wait(180);
      setAgents((current) => current.map((agent, itemIndex) => itemIndex === index ? { ...agent, status: "complete" } : agent));
    }

    const taskTitle = inferTaskTitle(content);
    addTask({
      title: taskTitle,
      description: `Created by the AI assistant from: "${content}"`,
      priority: "High",
      status: "Pending",
      deadline: "Friday",
      category: "School",
    });
    addEvent({
      title: `Work on ${taskTitle}`,
      date: "2026-08-26",
      startTime: "19:00",
      endTime: "21:00",
      category: "School",
      description: "Scheduled by Calendar Agent for tomorrow evening.",
    });
    addReminder({
      title: `${taskTitle} reminder`,
      linkedItem: taskTitle,
      dateGroup: "Tomorrow",
      time: "6:30 PM",
      status: "Enabled",
      leadTime: "30 minutes before",
    });

    const response = await assistantService.respond(taskTitle);
    setMessages((current) => [...current, response]);
    setThinking(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void processMessage(input);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
      <section className="panel flex min-h-[calc(100vh-150px)] flex-col rounded-3xl">
        <header className="border-b border-[var(--line)] p-5">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold">Productivity Assistant</h2>
              <p className="mt-2 text-muted">Tell me what you need to accomplish and I&apos;ll help organize it.</p>
            </div>
            <Badge tone="green">Mock multi-agent mode</Badge>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button key={suggestion} onClick={() => void processMessage(suggestion)} className="rounded-full bg-[var(--background)] px-4 py-2 text-sm font-semibold text-muted hover:text-[var(--ink)]">{suggestion}</button>
            ))}
          </div>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.map((message) => (
            <article key={message.id} className={`max-w-3xl rounded-3xl p-5 ${message.role === "user" ? "ml-auto bg-[var(--accent)] text-white" : "bg-[var(--background)]"}`}>
              <p className="leading-7">{message.content}</p>
              {message.plan && (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <PlanItem label="TASK CREATED" value={message.plan.task} />
                  <PlanItem label="PRIORITY" value={message.plan.priority} />
                  <PlanItem label="SCHEDULE" value={message.plan.schedule} />
                  <PlanItem label="REMINDER" value={message.plan.reminder} />
                </div>
              )}
            </article>
          ))}
          {thinking && <div className="inline-flex items-center gap-3 rounded-full bg-[var(--background)] px-4 py-3 text-sm text-muted"><span className="size-2 rounded-full bg-[var(--accent)] agent-pulse" /> Assistant is coordinating agents...</div>}
        </div>

        <form onSubmit={submit} className="border-t border-[var(--line)] p-4">
          <div className="flex gap-3 rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-2">
            <input className="min-w-0 flex-1 bg-transparent px-3 outline-none" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask your productivity assistant..." />
            <Button disabled={thinking}><Icon name="arrowRight" /> Send</Button>
          </div>
          <p className="mt-3 text-sm text-muted">Presentation prompt: “I have a CSC project due Friday. Schedule time tomorrow evening to work on it, make it high priority and remind me 30 minutes before.”</p>
        </form>
      </section>

      <aside className="space-y-6">
        <section className="panel rounded-3xl p-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-semibold">Agent Activity</h3>
            <Icon name="bot" className="text-[var(--accent)]" />
          </div>
          <div className="space-y-3">
            {agents.map((agent) => (
              <article key={agent.id} className="rounded-2xl border border-[var(--line)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-semibold">{agent.agent}</h4>
                  <Status status={agent.status} />
                </div>
                <p className="mt-2 text-sm text-muted">{agent.status === "complete" ? agent.result : agent.action}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--background)]">
                  <div className={`h-full rounded-full bg-[var(--accent)] ${agent.status === "processing" ? "agent-pulse w-2/3" : agent.status === "complete" ? "w-full" : "w-0"}`} />
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="rounded-3xl bg-[var(--ink)] p-5 text-[var(--surface)]">
          <h3 className="text-xl font-semibold">Created items are reusable</h3>
          <p className="mt-3 leading-7 opacity-75">After the AI flow runs, the generated task, event, and reminder appear in the Tasks, Calendar, and Reminders pages through shared local state.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold" href="/tasks">Tasks</Link>
            <Link className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold" href="/calendar">Calendar</Link>
            <Link className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold" href="/reminders">Reminders</Link>
          </div>
        </section>
      </aside>
    </div>
  );
}

function PlanItem({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4"><p className="text-xs font-semibold text-[var(--accent)]">{label}</p><p className="mt-2 font-semibold">{value}</p></div>;
}

function Status({ status }: { status: AgentActivity["status"] }) {
  if (status === "complete") return <span className="text-sm font-semibold text-[var(--accent)]">Done</span>;
  if (status === "processing") return <span className="text-sm font-semibold text-[var(--warm)]">Working</span>;
  return <span className="text-sm text-muted">Idle</span>;
}

function inferTaskTitle(content: string) {
  const normalized = content.toLowerCase();
  if (normalized.includes("csc")) return "CSC project";
  if (normalized.includes("django")) return "Study Django";
  if (normalized.includes("study")) return "Study session";
  return "AI planned productivity task";
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
