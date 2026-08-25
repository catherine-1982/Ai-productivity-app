import { ChatMessage } from "@/types";
import { mockDelay } from "./api";

export const assistantService = {
  respond: (taskTitle: string): Promise<ChatMessage> =>
    mockDelay(
      {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: "I've created a suggested productivity plan and coordinated the task, calendar, priority, and reminder agents.",
        plan: {
          task: taskTitle,
          priority: "High",
          schedule: "Tomorrow, 7:00 PM - 9:00 PM",
          reminder: "30 minutes before",
        },
      },
      750,
    ),
};
