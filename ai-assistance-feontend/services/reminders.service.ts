import { initialReminders } from "@/data/reminders";
import { Reminder } from "@/types";
import { mockDelay } from "./api";

export const remindersService = {
  list: () => mockDelay(initialReminders),
  create: (reminder: Reminder) => mockDelay(reminder),
};
