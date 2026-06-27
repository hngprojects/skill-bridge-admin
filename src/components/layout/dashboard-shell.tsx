"use client";

import { AdminNavbar } from "@/components/layout/admin-navbar";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { AdminRole } from "@/types/api/auth";

type DashboardShellProps = {
  role: AdminRole;
  user: {
    name?: string | null;
    email?: string | null;
    role?: AdminRole;
  };
  children: React.ReactNode;
};

export function DashboardShell({ role, user, children }: DashboardShellProps) {
  return (
    <SidebarProvider>
      <AdminSidebar role={role} />
      <SidebarInset>
        <AdminNavbar user={user} />
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
