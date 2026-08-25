"use client";

import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="min-w-0 flex-1">
        <Header onMenu={() => setOpen(true)} />
        <main className="mx-auto w-full max-w-7xl p-4 md:p-7">{children}</main>
      </div>
    </div>
  );
}
