import { analytics } from "@/data/analytics";
import { Badge } from "@/components/ui/Badge";

export default function AnalyticsPage() {
  const stats = [
    ["Task Completion Rate", `${analytics.completionRate}%`],
    ["Tasks Completed This Week", analytics.completedThisWeek],
    ["Average Daily Tasks", analytics.averageDailyTasks],
    ["Focus Hours", `${analytics.focusHours}h`],
    ["Productivity Score", `${analytics.productivityScore}%`],
  ];
  const max = Math.max(...analytics.weeklyCompletion.map((item) => item.tasks));
  return (
    <div className="space-y-6">
      <div><h2 className="text-3xl font-semibold">Productivity Analytics</h2><p className="mt-2 text-muted">Mock insights designed for project demonstration.</p></div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {stats.map(([label, value]) => <article className="panel rounded-3xl p-5" key={label}><p className="text-sm text-muted">{label}</p><p className="mt-4 text-3xl font-semibold">{value}</p></article>)}
      </section>
      <section className="grid gap-6 xl:grid-cols-[1fr_.75fr]">
        <div className="panel rounded-3xl p-6">
          <h3 className="mb-6 text-xl font-semibold">Weekly Task Completion</h3>
          <div className="flex h-72 items-end gap-3">
            {analytics.weeklyCompletion.map((item) => (
              <div key={item.day} className="flex flex-1 flex-col items-center gap-3">
                <div className="flex w-full items-end rounded-2xl bg-[var(--background)] p-2" style={{ height: "220px" }}>
                  <div className="w-full rounded-xl bg-[var(--accent)] transition-all" style={{ height: `${(item.tasks / max) * 100}%` }} />
                </div>
                <span className="text-sm font-semibold">{item.day}</span>
                <span className="text-xs text-muted">{item.tasks}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="panel rounded-3xl p-6">
          <h3 className="mb-6 text-xl font-semibold">Task Category Distribution</h3>
          <div className="space-y-5">
            {analytics.categoryDistribution.map((item) => (
              <div key={item.category}>
                <div className="mb-2 flex justify-between text-sm"><span className="font-semibold">{item.category}</span><span className="text-muted">{item.percent}%</span></div>
                <div className="h-3 rounded-full bg-[var(--background)]"><div className="h-3 rounded-full bg-[var(--warm)]" style={{ width: `${item.percent}%` }} /></div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-3xl bg-[var(--background)] p-5">
            <Badge tone="green">Productivity Insight</Badge>
            <p className="mt-4 leading-7 text-muted">You complete 32% more tasks between 5 PM and 9 PM. Consider scheduling development and study sessions during this period.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
