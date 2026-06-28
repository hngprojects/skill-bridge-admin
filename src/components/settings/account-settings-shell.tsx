"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Logout01Icon } from "@hugeicons/core-free-icons";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ADMIN_ROLE_LABELS } from "@/constants/admin-roles";
import { ROUTES } from "@/constants/admin-routes";
import type { AdminRole } from "@/types/api/auth";
import { StatusPill } from "@/components/shared/status-pill";
import type { StatusPillVariant } from "@/components/shared/status-pill";

type AccountSettingsShellProps = {
  name: string | null | undefined;
  email: string | null | undefined;
  role: AdminRole;
};

function roleVariant(role: AdminRole): StatusPillVariant {
  if (role === "super_admin") return "info";
  if (role === "admin") return "default";
  return "muted";
}

type FieldRowProps = {
  label: string;
  children: React.ReactNode;
};

function FieldRow({ label, children }: FieldRowProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{children}</p>
    </div>
  );
}

export function AccountSettingsShell({
  name,
  email,
  role,
}: AccountSettingsShellProps) {
  return (
    <div className="flex max-w-md flex-col gap-6">
      <Card>
        <CardContent className="flex flex-col gap-5 pt-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Profile
          </p>

          <FieldRow label="Name">{name ?? "—"}</FieldRow>

          <FieldRow label="Email">{email ?? "—"}</FieldRow>

          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Role</p>
            <StatusPill
              status={ADMIN_ROLE_LABELS[role]}
              variant={roleVariant(role)}
            />
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
