"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Logout01Icon } from "@hugeicons/core-free-icons";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/constants/admin-routes";
import type { AdminRole } from "@/types/api/auth";
import { StatusPill } from "@/components/shared/status-pill";
import type { StatusPillVariant } from "@/components/shared/status-pill";
import { useAccountSettings } from "@/hooks/api/use-account";

type AccountSettingsShellProps = {
  sessionName: string | null | undefined;
  sessionEmail: string | null | undefined;
  sessionRole: AdminRole;
};

function roleVariant(role: AdminRole): StatusPillVariant {
  if (role === "super_admin") return "info";
  if (role === "admin") return "default";
  return "muted";
}

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{children}</p>
    </div>
  );
}

export function AccountSettingsShell({
  sessionName,
  sessionEmail,
  sessionRole,
}: AccountSettingsShellProps) {
  const { data: account, isLoading } = useAccountSettings();

  const name = account?.name ?? sessionName;
  const email = account?.email ?? sessionEmail;
  const role = (account?.role ?? sessionRole) as AdminRole;

  const roleBadge =
    account?.role_badge ??
    role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="flex max-w-md flex-col gap-6">
      <Card>
        <CardContent className="flex flex-col gap-5 pt-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Profile
          </p>

          <FieldRow label="Name">
            {isLoading && !name ? (
              <Skeleton className="h-4 w-40 rounded-md" />
            ) : (
              (name ?? "—")
            )}
          </FieldRow>

          <FieldRow label="Email">
            {isLoading && !email ? (
              <Skeleton className="h-4 w-52 rounded-md" />
            ) : (
              (email ?? "—")
            )}
          </FieldRow>

          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Role</p>
            {isLoading && !account ? (
              <Skeleton className="h-6 w-24 rounded-full" />
            ) : (
              <StatusPill status={roleBadge} variant={roleVariant(role)} />
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            To change your email or password, contact a Super Admin.
          </p>
        </CardContent>
      </Card>

      <Button
        variant="outline"
        className="w-fit gap-2 text-error hover:bg-error/5 hover:text-error"
        onClick={() => signOut({ callbackUrl: ROUTES.login })}
      >
        <HugeiconsIcon icon={Logout01Icon} strokeWidth={2} className="size-4" />
        Log out
      </Button>
    </div>
  );
}
