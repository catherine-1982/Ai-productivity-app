import { ProductivityAnalytics } from "@/types";

export const analytics: ProductivityAnalytics = {
  completionRate: 67,
  completedThisWeek: 35,
  averageDailyTasks: 5,
  focusHours: 18,
  productivityScore: 84,
  weeklyCompletion: [
    { day: "Mon", tasks: 5 },
    { day: "Tue", tasks: 8 },
    { day: "Wed", tasks: 4 },
    { day: "Thu", tasks: 7 },
    { day: "Fri", tasks: 6 },
    { day: "Sat", tasks: 3 },
    { day: "Sun", tasks: 2 },
  ],
  categoryDistribution: [
    { category: "School", percent: 40 },
    { category: "Development", percent: 30 },
    { category: "Work", percent: 20 },
    { category: "Personal", percent: 10 },
  ],
};
