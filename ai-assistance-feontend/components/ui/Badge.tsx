export function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "red" | "amber" | "green" | "blue" | "neutral" }) {
  const colors = {
    red: "bg-red-100 text-red-700 dark:bg-red-400/10 dark:text-red-200",
    amber: "bg-amber-100 text-amber-800 dark:bg-amber-400/10 dark:text-amber-200",
    green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200",
    blue: "bg-sky-100 text-sky-700 dark:bg-sky-400/10 dark:text-sky-200",
    neutral: "bg-[var(--background)] text-muted",
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${colors[tone]}`}>{children}</span>;
}
