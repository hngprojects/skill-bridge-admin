"use client";

import * as React from "react";

import { DataTable } from "@/components/shared/data-table";
import { useAdminAccounts } from "@/hooks/api/use-admin-management";
import type { ManagedAdminAccount } from "@/types/api/admin-management";
import {
  ChangeEmailDialog,
  ChangeRoleDialog,
  ResetPasswordDialog,
  ToggleActivationDialog,
} from "./admin-action-dialogs";
import { getAdminAccountColumns } from "./columns";

type ActionType = "reset" | "email" | "role" | "deactivate" | "reactivate";

export function AdminAccountsTable() {
  const [selectedAdmin, setSelectedAdmin] =
    React.useState<ManagedAdminAccount | null>(null);
  const [actionType, setActionType] = React.useState<ActionType | null>(null);

  const { data, isLoading, isError } = useAdminAccounts();
  const admins = data?.items ?? [];

  function openActionDialog(admin: ManagedAdminAccount, type: ActionType) {
    setSelectedAdmin(admin);
    setActionType(type);
  }

  function closeActionDialog() {
    setSelectedAdmin(null);
    setActionType(null);
  }

  const columns = React.useMemo(
    () =>
      getAdminAccountColumns({
        onResetPassword: (admin) => openActionDialog(admin, "reset"),
        onChangeEmail: (admin) => openActionDialog(admin, "email"),
        onChangeRole: (admin) => openActionDialog(admin, "role"),
        onDeactivate: (admin) => openActionDialog(admin, "deactivate"),
        onReactivate: (admin) => openActionDialog(admin, "reactivate"),
      }),
    [],
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={admins}
        isLoading={isLoading}
        emptyTitle={isError ? "Failed to load accounts" : "No admin accounts"}
        emptyMessage={
          isError
            ? "Something went wrong. Refresh to try again."
            : "No admin accounts have been created yet."
        }
        searchPlaceholder="Search by name or email…"
      />

      <ResetPasswordDialog
        admin={selectedAdmin}
        open={actionType === "reset" && !!selectedAdmin}
        onClose={closeActionDialog}
      />
      <ChangeEmailDialog
        key={`email-${selectedAdmin?.id}`}
        admin={selectedAdmin}
        open={actionType === "email" && !!selectedAdmin}
        onClose={closeActionDialog}
      />
      <ChangeRoleDialog
        key={`role-${selectedAdmin?.id}`}
        admin={selectedAdmin}
        open={actionType === "role" && !!selectedAdmin}
        onClose={closeActionDialog}
      />
      <ToggleActivationDialog
        mode="deactivate"
        admin={selectedAdmin}
        open={actionType === "deactivate" && !!selectedAdmin}
        onClose={closeActionDialog}
      />
      <ToggleActivationDialog
        mode="reactivate"
        admin={selectedAdmin}
        open={actionType === "reactivate" && !!selectedAdmin}
        onClose={closeActionDialog}
      />
    </>
  );
}
