import { Reminder } from "@/types";

export const initialReminders: Reminder[] = [
  { id: "rem-1", title: "Project Meeting", linkedItem: "Project Meeting", dateGroup: "Today", time: "1:30 PM", status: "Enabled", leadTime: "30 minutes before" },
  { id: "rem-2", title: "Study CSC 410", linkedItem: "Study Session", dateGroup: "Today", time: "7:00 PM", status: "Enabled", leadTime: "At start time" },
  { id: "rem-3", title: "Django planning", linkedItem: "Django Backend Planning", dateGroup: "Tomorrow", time: "6:00 PM", status: "Enabled", leadTime: "30 minutes before" },
  { id: "rem-4", title: "Presentation review", linkedItem: "Review project presentation", dateGroup: "Upcoming", time: "Thursday, 9:00 AM", status: "Disabled", leadTime: "1 hour before" },
];
