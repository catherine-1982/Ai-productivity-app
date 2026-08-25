import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
