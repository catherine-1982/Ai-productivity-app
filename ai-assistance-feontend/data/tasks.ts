import { Task } from "@/types";

export const initialTasks: Task[] = [
  { id: "task-1", title: "Complete Django API architecture", description: "Sketch models, serializers, endpoints, and agent handoff flow.", priority: "High", status: "In Progress", deadline: "Today, 4:00 PM", category: "Development", completed: false },
  { id: "task-2", title: "Study CSC 410", description: "Revise distributed systems notes and past questions.", priority: "High", status: "Pending", deadline: "Tomorrow", category: "School", completed: false },
  { id: "task-3", title: "Review project presentation", description: "Practice the demo flow and polish slides.", priority: "Medium", status: "Pending", deadline: "Thursday", category: "School", completed: false },
  { id: "task-4", title: "Read system analysis notes", description: "Summarize requirements modeling chapter.", priority: "Low", status: "Pending", deadline: "Friday", category: "School", completed: false },
  { id: "task-5", title: "Implement landing page content", description: "Add polished copy and mock dashboard visuals.", priority: "Medium", status: "Completed", deadline: "Yesterday", category: "Development", completed: true },
  { id: "task-6", title: "Prepare weekly budget", description: "Update personal expenses and savings target.", priority: "Low", status: "Pending", deadline: "Saturday", category: "Personal", completed: false },
  { id: "task-7", title: "Team standup notes", description: "Collect blockers and next actions for the project group.", priority: "Medium", status: "Completed", deadline: "Today, 10:00 AM", category: "Work", completed: true },
  { id: "task-8", title: "Refactor task service mock", description: "Prepare frontend API layer for Django REST integration.", priority: "High", status: "In Progress", deadline: "Tomorrow, 2:00 PM", category: "Development", completed: false },
  { id: "task-9", title: "Design database ER diagram", description: "Map users, tasks, events, reminders, and agent actions.", priority: "High", status: "Completed", deadline: "Monday", category: "School", completed: true },
  { id: "task-10", title: "Evening exercise", description: "Thirty-minute walk after study session.", priority: "Low", status: "Pending", deadline: "Today, 8:30 PM", category: "Personal", completed: false },
];
