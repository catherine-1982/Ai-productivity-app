import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export default function Home() {
  const features = [
    ["Smart Task Management", "Capture tasks, deadlines, notes, and categories in one clean workspace."],
    ["AI Task Prioritization", "Let priority agents rank your workload by urgency, importance, and time available."],
    ["Intelligent Calendar", "Turn goals into realistic study, project, and personal time blocks."],
    ["Smart Reminders", "Get reminders that match the way each task needs to be handled."],
    ["Multi-Agent AI", "Coordinator, task, calendar, priority, and reminder agents work together."],
    ["Productivity Analytics", "See trends, focus hours, completion rates, and helpful insights."],
  ];
  const agents = [
    ["Coordinator Agent", "Understands your request and routes work to the right specialist."],
    ["Task Agent", "Creates, updates, and organizes actionable tasks."],
    ["Calendar Agent", "Finds practical time slots and creates schedule blocks."],
    ["Priority Agent", "Scores urgency and recommends what to do first."],
    ["Reminder Agent", "Creates timely nudges before deadlines and events."],
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-[var(--ink)] text-[var(--surface)]">
            <Icon name="sparkles" />
          </span>
          <span>
            <span className="block text-lg font-semibold">Productivity AI</span>
            <span className="text-sm text-muted">Your intelligent productivity companion</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          <Link className="rounded-full px-4 py-2 text-sm text-muted hover:bg-[var(--surface)]" href="#features">Features</Link>
          <Link className="rounded-full px-4 py-2 text-sm text-muted hover:bg-[var(--surface)]" href="#agents">Agents</Link>
          <Link className="rounded-full px-4 py-2 text-sm text-muted hover:bg-[var(--surface)]" href="/login">Login</Link>
          <Link className="rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-semibold text-[var(--surface)]" href="/register">Get Started</Link>
        </nav>
      </header>

      <main>
        <section className="mx-auto grid min-h-[calc(100vh-92px)] w-full max-w-7xl items-center gap-10 px-5 pb-16 pt-6 lg:grid-cols-[1fr_1.05fr]">
          <div className="animate-rise">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm text-muted">
              <Icon name="bot" /> Multi-agent productivity planning
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-normal md:text-7xl">
              Organize your life with an AI that understands your priorities.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Productivity AI uses specialized agents to manage tasks, schedules, reminders, and priorities so your day becomes easier to act on.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 font-semibold text-white shadow-lg shadow-teal-900/15" href="/register">
                Get Started <Icon name="arrowRight" />
              </Link>
              <Link className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-6 py-3 font-semibold" href="/dashboard">
                View Demo <Icon name="layout" />
              </Link>
            </div>
          </div>

          <div className="glass animate-rise rounded-[2rem] p-4 [animation-delay:120ms]">
            <div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-strong)] p-4">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted">Today</p>
                  <h2 className="text-2xl font-semibold">Good morning, Alex</h2>
                </div>
                <div className="rounded-2xl bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700 dark:bg-teal-400/10 dark:text-teal-200">84% score</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {["12 Total Tasks", "8 Completed", "4 Events", "3 AI actions"].map((item) => (
                  <div key={item} className="rounded-2xl border border-[var(--line)] p-4">
                    <p className="text-lg font-semibold">{item.split(" ")[0]}</p>
                    <p className="text-sm text-muted">{item.split(" ").slice(1).join(" ")}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
                <div className="rounded-2xl border border-[var(--line)] p-4">
                  <p className="mb-3 font-semibold">Today&apos;s Tasks</p>
                  {["Complete Django API architecture", "Study CSC 410", "Review project presentation"].map((task, index) => (
                    <div key={task} className="mb-3 flex items-center gap-3 rounded-xl bg-[var(--background)] p-3 last:mb-0">
                      <span className={`size-3 rounded-full ${index === 0 ? "bg-red-500" : "bg-amber-500"}`} />
                      <span className="flex-1 text-sm">{task}</span>
                      <span className="text-xs text-muted">{index === 0 ? "4:00 PM" : "Tomorrow"}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl bg-[var(--ink)] p-4 text-[var(--surface)]">
                  <div className="mb-4 flex items-center gap-2"><Icon name="sparkles" /> AI Recommendation</div>
                  <p className="text-sm leading-6 opacity-85">Complete the project architecture before your evening study session.</p>
                  <div className="mt-5 h-1 rounded-full bg-white/15"><div className="h-1 w-4/5 rounded-full bg-[var(--warm)]" /></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-5 py-20">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="font-semibold text-[var(--accent)]">Features</p>
              <h2 className="mt-2 text-4xl font-semibold">Built for a convincing productivity demo.</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map(([title, body], index) => (
              <article className="panel animate-rise rounded-3xl p-6" style={{ animationDelay: `${index * 50}ms` }} key={title}>
                <div className="mb-5 grid size-11 place-items-center rounded-2xl bg-[var(--background)] text-[var(--accent)]"><Icon name="sparkles" /></div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-muted">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12">
          <div className="panel rounded-[2rem] p-6 md:p-10">
            <h2 className="text-3xl font-semibold">How It Works</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {["Tell the AI what you need", "Coordinator Agent understands the request", "Specialized agents perform their jobs", "Your productivity system updates automatically"].map((step, index) => (
                <div key={step} className="relative rounded-3xl bg-[var(--background)] p-5">
                  <span className="mb-6 grid size-10 place-items-center rounded-full bg-[var(--ink)] text-sm font-semibold text-[var(--surface)]">{index + 1}</span>
                  <p className="font-semibold leading-6">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="agents" className="mx-auto max-w-7xl px-5 py-20">
          <p className="font-semibold text-[var(--accent)]">AI Agents</p>
          <h2 className="mt-2 text-4xl font-semibold">A visible architecture for your presentation.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {agents.map(([title, body]) => (
              <article key={title} className="panel rounded-3xl p-5">
                <div className="mb-4 text-[var(--accent)]"><Icon name="bot" /></div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20">
          <div className="rounded-[2rem] bg-[var(--ink)] p-8 text-[var(--surface)] md:p-12">
            <h2 className="max-w-2xl text-4xl font-semibold">Start organizing your day before the backend exists.</h2>
            <p className="mt-4 max-w-2xl opacity-75">Use the complete mock dashboard, AI chat flow, and local-state interactions to demonstrate the final product vision.</p>
            <Link href="/dashboard" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--surface)] px-6 py-3 font-semibold text-[var(--ink)]">Open Demo <Icon name="arrowRight" /></Link>
          </div>
        </section>
      </main>
    </div>
  );
}
