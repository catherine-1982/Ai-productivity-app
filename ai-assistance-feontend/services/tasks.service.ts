import { initialTasks } from "@/data/tasks";
import { Task } from "@/types";
import { mockDelay } from "./api";

export const tasksService = {
  list: () => mockDelay(initialTasks),
  create: (task: Task) => mockDelay(task),
};
