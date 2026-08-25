"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { authService } from "@/services/auth.service";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Form";
import { Icon } from "@/components/ui/Icon";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const data = new FormData(event.currentTarget);
    if (!data.get("email") || !data.get("password")) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }
    await authService.login();
    router.push("/dashboard");
  }

  return (
    <main className="grid min-h-screen place-items-center p-5">
      <div className="glass grid w-full max-w-5xl overflow-hidden rounded-[2rem] md:grid-cols-[.9fr_1.1fr]">
        <section className="hidden bg-[var(--ink)] p-10 text-[var(--surface)] md:block">
          <div className="mb-16 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-white/10"><Icon name="sparkles" /></span><strong>Productivity AI</strong></div>
          <h1 className="text-4xl font-semibold leading-tight">Welcome back to your command center.</h1>
          <p className="mt-4 leading-7 opacity-75">Open a polished prototype dashboard with tasks, calendar, reminders, analytics, and the multi-agent assistant.</p>
          <div className="mt-10 rounded-3xl bg-white/10 p-5">
            <p className="text-sm opacity-75">Today&apos;s focus</p>
            <p className="mt-2 text-2xl font-semibold">Finish Django project architecture before 4:00 PM</p>
          </div>
        </section>
        <form onSubmit={submit} className="bg-[var(--surface)] p-6 md:p-10">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted"><Icon name="arrowRight" className="rotate-180" /> Back home</Link>
          <h2 className="text-3xl font-semibold">Login</h2>
          <p className="mt-2 text-muted">Use any email and password for the mock demo.</p>
          <div className="mt-8 space-y-4">
            <Field label="Email"><input className={inputClass} name="email" type="email" placeholder="alex@example.com" /></Field>
            <Field label="Password"><input className={inputClass} name="password" type="password" placeholder="••••••••" /></Field>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 text-sm">
            <label className="flex items-center gap-2 text-muted"><input type="checkbox" className="size-4 accent-[var(--accent)]" /> Remember me</label>
            <button type="button" className="font-semibold text-[var(--accent)]">Forgot password?</button>
          </div>
          {error && <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-400/10 dark:text-red-200">{error}</p>}
          <Button className="mt-6 w-full" disabled={loading}>{loading ? "Logging in..." : "Login"}</Button>
          <Button type="button" variant="secondary" className="mt-3 w-full" onClick={() => router.push("/dashboard")}><Icon name="sparkles" /> Continue with Google</Button>
          <p className="mt-6 text-center text-sm text-muted">Don&apos;t have an account? <Link href="/register" className="font-semibold text-[var(--accent)]">Create account</Link></p>
        </form>
      </div>
    </main>
  );
}
