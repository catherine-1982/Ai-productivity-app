"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { initialEvents } from "@/data/events";
import { initialReminders } from "@/data/reminders";
import { initialTasks } from "@/data/tasks";
import { mockUser } from "@/data/user";
import { AppState, CalendarEvent, Reminder, Task, ThemePreference, User } from "@/types";

interface AppContextValue extends AppState {
  setTheme: (theme: ThemePreference) => void;
  setUser: (user: User) => void;
  addTask: (task: Omit<Task, "id" | "completed">) => Task;
  updateTask: (task: Task) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  addEvent: (event: Omit<CalendarEvent, "id">) => CalendarEvent;
  addReminder: (reminder: Omit<Reminder, "id">) => Reminder;
  toggleReminder: (id: string) => void;
  deleteReminder: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);
const storageKey = "productivity-ai-state";

const initialState: AppState = {
  user: mockUser,
  tasks: initialTasks,
  events: initialEvents,
  reminders: initialReminders,
  theme: "light",
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const idCounter = useRef(1000);
  const [state, setState] = useState<AppState>(() => {
    if (typeof window === "undefined") return initialState;
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return initialState;
    try {
      return { ...initialState, ...JSON.parse(saved) } as AppState;
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const useDark = state.theme === "dark" || (state.theme === "system" && prefersDark);
    root.classList.toggle("dark", useDark);
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  const value = useMemo<AppContextValue>(() => ({
    ...state,
    setTheme: (theme) => setState((current) => ({ ...current, theme })),
    setUser: (user) => setState((current) => ({ ...current, user })),
    addTask: (task) => {
      const created: Task = { ...task, id: `task-${idCounter.current++}`, completed: task.status === "Completed" };
      setState((current) => ({ ...current, tasks: [created, ...current.tasks] }));
      return created;
    },
    updateTask: (task) => setState((current) => ({ ...current, tasks: current.tasks.map((item) => (item.id === task.id ? task : item)) })),
    toggleTask: (id) =>
      setState((current) => ({
        ...current,
        tasks: current.tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed, status: !task.completed ? "Completed" : "Pending" } : task,
        ),
      })),
    deleteTask: (id) => setState((current) => ({ ...current, tasks: current.tasks.filter((task) => task.id !== id) })),
    addEvent: (event) => {
      const created = { ...event, id: `event-${idCounter.current++}` };
      setState((current) => ({ ...current, events: [created, ...current.events] }));
      return created;
    },
    addReminder: (reminder) => {
      const created = { ...reminder, id: `rem-${idCounter.current++}` };
      setState((current) => ({ ...current, reminders: [created, ...current.reminders] }));
      return created;
    },
    toggleReminder: (id) =>
      setState((current) => ({
        ...current,
        reminders: current.reminders.map((reminder) =>
          reminder.id === id ? { ...reminder, status: reminder.status === "Enabled" ? "Disabled" : "Enabled" } : reminder,
        ),
      })),
    deleteReminder: (id) => setState((current) => ({ ...current, reminders: current.reminders.filter((reminder) => reminder.id !== id) })),
  }), [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
