"use client";

import { format } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  MoreVerticalCircle01Icon,
  MailEdit01Icon,
  PasswordValidationIcon,
  UserSwitchIcon,
  UserRemove01Icon,
  UserCheck01Icon,
} from "@hugeicons/core-free-icons";

import { StatusPill } from "@/components/shared/status-pill";
import type { StatusPillVariant } from "@/components/shared/status-pill";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type {
  AdminAccountStatus,
  ManagedAdminAccount,
} from "@/types/api/admin-management";
import { ADMIN_ROLE_LABELS } from "@/types/api/admin-management";
import type { AdminRole } from "@/types/api/auth";

const roleVariantMap: Record<AdminRole, StatusPillVariant> = {
  super_admin: "success",
  admin: "info",
  reviewer: "muted",
};

const statusVariantMap: Record<AdminAccountStatus, StatusPillVariant> = {
  Active: "success",
  "Pending Setup": "warning",
  Deactivated: "error",
};

type AdminColumnsParams = {
  onResetPassword: (admin: ManagedAdminAccount) => void;
  onChangeEmail: (admin: ManagedAdminAccount) => void;
  onChangeRole: (admin: ManagedAdminAccount) => void;
  onDeactivate: (admin: ManagedAdminAccount) => void;
  onReactivate: (admin: ManagedAdminAccount) => void;
};

export function getAdminAccountColumns({
  onResetPassword,
  onChangeEmail,
  onChangeRole,
  onDeactivate,
  onReactivate,
}: AdminColumnsParams): ColumnDef<ManagedAdminAccount>[] {
  return [
    {
      accessorKey: "name",
      header: "Name",
      enableSorting: true,
    },
    {
      accessorKey: "email",
      header: "Email",
      enableSorting: true,
    },
    {
      accessorKey: "role",
      header: "Role",
      enableSorting: true,
      cell: ({ row }) => (
        <StatusPill
          status={ADMIN_ROLE_LABELS[row.original.role]}
          variant={roleVariantMap[row.original.role]}
        />
      ),
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
      enableSorting: true,
      cell: ({ row }) =>
        row.original.lastLogin ? (
          format(new Date(row.original.lastLogin), "MMM d, yyyy · h:mm a")
        ) : (
          <span className="text-muted-foreground">—</span>
        ),
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: true,
      cell: ({ row }) => (
        <StatusPill
          status={row.original.status}
          variant={statusVariantMap[row.original.status]}
        />
      ),
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      cell: ({ row }) => {
        const admin = row.original;
        const isDeactivated = admin.status === "Deactivated";

        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label="Row actions">
                  <HugeiconsIcon
                    icon={MoreVerticalCircle01Icon}
                    strokeWidth={2}
                    className="size-4"
                  />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => onResetPassword(admin)}>
                  <HugeiconsIcon
                    icon={PasswordValidationIcon}
                    strokeWidth={2}
                    className="size-4"
                  />
                  Reset Password
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => onChangeEmail(admin)}>
                  <HugeiconsIcon
                    icon={MailEdit01Icon}
                    strokeWidth={2}
                    className="size-4"
                  />
                  Change Email
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => onChangeRole(admin)}>
                  <HugeiconsIcon
                    icon={UserSwitchIcon}
                    strokeWidth={2}
                    className="size-4"
                  />
                  Change Role
                </DropdownMenuItem>

                {isDeactivated ? (
                  <DropdownMenuItem onClick={() => onReactivate(admin)}>
                    <HugeiconsIcon
                      icon={UserCheck01Icon}
                      strokeWidth={2}
                      className="size-4"
                    />
                    Reactivate
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    onClick={() => onDeactivate(admin)}
                    className="text-error focus:text-error"
                  >
                    <HugeiconsIcon
                      icon={UserRemove01Icon}
                      strokeWidth={2}
                      className="size-4"
                    />
                    Deactivate
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}
