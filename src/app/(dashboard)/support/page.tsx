import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { SupportShell } from "@/components/support/support-shell";
import { ROUTES } from "@/constants/admin-routes";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Support",
};

function resolveRole(role: string | undefined): "super_admin" | "admin" | null {
  if (role === "super_admin" || role === "admin") return role;
  return null;
}

export default async function SupportPage() {
  const session = await auth();
  const role = resolveRole(session?.user?.role);

  if (!role) {
    redirect(ROUTES.login);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Support</h1>
        <p className="text-sm text-muted-foreground">
          View and manage support tickets submitted by candidates and employers.
        </p>
      </div>

      <SupportShell />
    </div>
  );
}
