export type Priority = "High" | "Medium" | "Low";
export type TaskStatus = "Pending" | "In Progress" | "Completed";
export type ThemePreference = "light" | "dark" | "system";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  timezone: string;
  workingHours: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  deadline: string;
  category: "School" | "Work" | "Personal" | "Development";
  completed: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  category: string;
  description: string;
}

export interface Reminder {
  id: string;
  title: string;
  linkedItem: string;
  dateGroup: "Today" | "Tomorrow" | "Upcoming";
  time: string;
  status: "Enabled" | "Disabled";
  leadTime: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  plan?: {
    task: string;
    priority: Priority;
    schedule: string;
    reminder: string;
  };
}

export interface AgentActivity {
  id: string;
  agent: string;
  action: string;
  result: string;
  status: "idle" | "processing" | "complete";
}

export interface ProductivityAnalytics {
  completionRate: number;
  completedThisWeek: number;
  averageDailyTasks: number;
  focusHours: number;
  productivityScore: number;
  weeklyCompletion: { day: string; tasks: number }[];
  categoryDistribution: { category: string; percent: number }[];
}

export interface AppState {
  user: User;
  tasks: Task[];
  events: CalendarEvent[];
  reminders: Reminder[];
  theme: ThemePreference;
}
