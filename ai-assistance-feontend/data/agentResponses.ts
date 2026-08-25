import { AgentActivity, ChatMessage } from "@/types";

export const defaultAgentFlow: AgentActivity[] = [
  { id: "agent-1", agent: "Coordinator Agent", action: "Analyzing request...", result: "Request understood", status: "idle" },
  { id: "agent-2", agent: "Task Agent", action: "Creating task...", result: "Task created", status: "idle" },
  { id: "agent-3", agent: "Priority Agent", action: "Evaluating urgency...", result: "Priority: High", status: "idle" },
  { id: "agent-4", agent: "Calendar Agent", action: "Finding suitable time...", result: "Scheduled 7:00 PM", status: "idle" },
  { id: "agent-5", agent: "Reminder Agent", action: "Creating reminder...", result: "Reminder created", status: "idle" },
];

export const welcomeMessages: ChatMessage[] = [
  {
    id: "chat-welcome",
    role: "assistant",
    content: "Tell me what you need to accomplish and I will turn it into tasks, schedule blocks, priorities, and reminders.",
  },
];
