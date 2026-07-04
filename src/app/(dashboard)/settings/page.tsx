import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AccountSettingsShell } from "@/components/settings/account-settings-shell";
import { ROUTES } from "@/constants/admin-routes";
import { auth } from "@/lib/auth";
import type { AdminRole } from "@/types/api/auth";

export const metadata: Metadata = {
  title: "Account Settings",
};

function resolveRole(role: string | undefined): AdminRole | null {
  if (role === "super_admin" || role === "admin" || role === "reviewer") {
    return role;
  }
  return null;
}

export default async function SettingsPage() {
  const session = await auth();
  const role = resolveRole(session?.user?.role);

  if (!role) {
    redirect(ROUTES.login);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">
          Account Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Your profile details. Read-only — contact a Super Admin to make
          changes.
        </p>
      </div>

      <AccountSettingsShell
        sessionName={session?.user?.name}
        sessionEmail={session?.user?.email}
        sessionRole={role}
      />
    </div>
  );
}
