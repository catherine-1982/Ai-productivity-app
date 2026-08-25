"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { authService } from "@/services/auth.service";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Form";
import { Icon } from "@/components/ui/Icon";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setError("");
    if (!data.get("name") || !data.get("email") || !data.get("password") || !data.get("confirm")) {
      setError("Please complete all fields.");
      return;
    }
    if (data.get("password") !== data.get("confirm")) {
      setError("Passwords must match.");
      return;
    }
    setLoading(true);
    await authService.register();
    router.push("/dashboard");
  }

  return (
    <main className="grid min-h-screen place-items-center p-5">
      <form onSubmit={submit} className="panel w-full max-w-xl rounded-[2rem] p-6 md:p-10">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted"><Icon name="arrowRight" className="rotate-180" /> Back home</Link>
        <div className="mb-7 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-[var(--ink)] text-[var(--surface)]"><Icon name="sparkles" /></span><div><h1 className="text-3xl font-semibold">Create account</h1><p className="text-muted">Start the mock dashboard immediately.</p></div></div>
        <div className="space-y-4">
          <Field label="Full Name"><input className={inputClass} name="name" placeholder="Alex Johnson" /></Field>
          <Field label="Email"><input className={inputClass} name="email" type="email" placeholder="alex@example.com" /></Field>
          <Field label="Password"><input className={inputClass} name="password" type="password" /></Field>
          <Field label="Confirm Password"><input className={inputClass} name="confirm" type="password" /></Field>
        </div>
        {error && <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-400/10 dark:text-red-200">{error}</p>}
        <Button className="mt-6 w-full" disabled={loading}>{loading ? "Creating..." : "Create Account"}</Button>
        <p className="mt-6 text-center text-sm text-muted">Already have an account? <Link href="/login" className="font-semibold text-[var(--accent)]">Login</Link></p>
      </form>
    </main>
  );
}
