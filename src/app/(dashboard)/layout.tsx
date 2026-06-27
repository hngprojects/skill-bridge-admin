import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ROUTES } from "@/constants/admin-routes";
import { auth } from "@/lib/auth";
import type { AdminRole } from "@/types/api/auth";

function resolveRole(role: string | undefined): AdminRole | null {
  if (role === "super_admin" || role === "admin" || role === "reviewer") {
    return role;
  }
  return null;
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect(ROUTES.login);
  }

  const role = resolveRole(session.user.role);

  if (!role) {
    redirect(ROUTES.login);
  }

  return (
    <DashboardShell role={role} user={session.user}>
      {children}
    </DashboardShell>
  );
}
