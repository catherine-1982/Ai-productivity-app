import { CalendarEvent } from "@/types";

export const initialEvents: CalendarEvent[] = [
  { id: "event-1", title: "CSC Lecture", date: "2026-08-25", startTime: "09:00", endTime: "10:30", category: "School", description: "Lecture block for CSC 410." },
  { id: "event-2", title: "Lunch", date: "2026-08-25", startTime: "12:30", endTime: "13:00", category: "Personal", description: "Break and reset." },
  { id: "event-3", title: "Project Meeting", date: "2026-08-25", startTime: "14:00", endTime: "15:00", category: "Development", description: "Discuss architecture and demo scope." },
  { id: "event-4", title: "AI Productivity Project", date: "2026-08-25", startTime: "16:00", endTime: "18:00", category: "Development", description: "Frontend prototype review." },
  { id: "event-5", title: "Study Session", date: "2026-08-25", startTime: "19:00", endTime: "21:00", category: "School", description: "Study CSC 410." },
  { id: "event-6", title: "Django Backend Planning", date: "2026-08-26", startTime: "18:30", endTime: "20:00", category: "Development", description: "Prepare API endpoints for next phase." },
];
