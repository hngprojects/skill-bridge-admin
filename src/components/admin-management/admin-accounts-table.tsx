"use client";

import * as React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  changeAdminEmail,
  changeAdminRole,
  deactivateAdminAccount,
  reactivateAdminAccount,
  resetAdminPassword,
} from "@/actions/admin-management";
import { DataTable } from "@/components/shared/data-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { adminManagementKeys } from "@/hooks/api/keys";
import { useAdminAccounts } from "@/hooks/api/use-admin-management";
import type {
  ChangeAdminEmailInput,
  ChangeAdminRoleInput,
  ManagedAdminAccount,
} from "@/types/api/admin-management";
import { ADMIN_ROLE_LABELS, ADMIN_ROLES } from "@/types/api/admin-management";
import type { AdminRole } from "@/types/api/auth";
import { getAdminAccountColumns } from "./columns";

type ActionType = "reset" | "email" | "role" | "deactivate" | "reactivate";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function AdminAccountsTable() {
  const [selectedAdmin, setSelectedAdmin] =
    React.useState<ManagedAdminAccount | null>(null);
  const [actionType, setActionType] = React.useState<ActionType | null>(null);
  const [newEmail, setNewEmail] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState<AdminRole>("admin");
  const [emailError, setEmailError] = React.useState("");

  const queryClient = useQueryClient();
  const { data, isLoading } = useAdminAccounts();
  const admins = data?.items ?? [];

  async function handleResult(result: { ok: boolean; message: string }) {
    if (!result.ok) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    closeActionDialog();

    await queryClient.invalidateQueries({
      queryKey: adminManagementKeys.accounts(),
    });
  }

  const resetPasswordMutation = useMutation({
    mutationFn: resetAdminPassword,
    onSuccess: handleResult,
    onError: () => toast.error("Reset failed. Try again."),
  });

  const changeEmailMutation = useMutation({
    mutationFn: (input: ChangeAdminEmailInput) => changeAdminEmail(input),
    onSuccess: async (result) => {
      if (!result.ok) {
        setEmailError(result.message);
        toast.error(result.message);
        return;
      }

      await handleResult(result);
    },
    onError: () => toast.error("Email update failed. Try again."),
  });

  const changeRoleMutation = useMutation({
    mutationFn: (input: ChangeAdminRoleInput) => changeAdminRole(input),
    onSuccess: handleResult,
    onError: () => toast.error("Role update failed. Try again."),
  });

  const deactivateMutation = useMutation({
    mutationFn: deactivateAdminAccount,
    onSuccess: handleResult,
    onError: () => toast.error("Deactivation failed. Try again."),
  });

  const reactivateMutation = useMutation({
    mutationFn: reactivateAdminAccount,
    onSuccess: handleResult,
    onError: () => toast.error("Reactivation failed. Try again."),
  });

  function openActionDialog(admin: ManagedAdminAccount, type: ActionType) {
    setSelectedAdmin(admin);
    setActionType(type);
    setEmailError("");

    if (type === "email") {
      setNewEmail(admin.email);
    }

    if (type === "role") {
      setSelectedRole(admin.role);
    }
  }

  function closeActionDialog() {
    setSelectedAdmin(null);
    setActionType(null);
    setNewEmail("");
    setEmailError("");
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

  const isResetOpen = actionType === "reset" && !!selectedAdmin;
  const isEmailOpen = actionType === "email" && !!selectedAdmin;
  const isRoleOpen = actionType === "role" && !!selectedAdmin;
  const isDeactivateOpen = actionType === "deactivate" && !!selectedAdmin;
  const isReactivateOpen = actionType === "reactivate" && !!selectedAdmin;

  const isDowngradingSuperAdmin =
    selectedAdmin?.role === "super_admin" && selectedRole !== "super_admin";

  function submitEmailChange(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedAdmin) return;

    const trimmedEmail = newEmail.trim().toLowerCase();

    if (!isValidEmail(trimmedEmail)) {
      setEmailError("Enter a valid email address.");
      return;
    }

    setEmailError("");

    changeEmailMutation.mutate({
      id: selectedAdmin.id,
      email: trimmedEmail,
    });
  }

  function submitRoleChange(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedAdmin) return;

    changeRoleMutation.mutate({
      id: selectedAdmin.id,
      role: selectedRole,
      confirm_downgrade: isDowngradingSuperAdmin,
    });
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={admins}
        isLoading={isLoading}
        emptyTitle="No admin accounts"
        emptyMessage="No admin accounts have been created yet."
        searchPlaceholder="Search by name or email…"
      />

      <AlertDialog open={isResetOpen} onOpenChange={closeActionDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset password?</AlertDialogTitle>
            <AlertDialogDescription>
              Reset password for {selectedAdmin?.name}? They will need to set a
              new password before logging in again.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                selectedAdmin && resetPasswordMutation.mutate(selectedAdmin.id)
              }
            >
              Reset Password
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isEmailOpen} onOpenChange={closeActionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Email</DialogTitle>
            <DialogDescription>
              Update the email address for {selectedAdmin?.name}.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={submitEmailChange} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Current email</Label>
              <Input value={selectedAdmin?.email ?? ""} readOnly />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="new-email">New email</Label>
              <Input
                id="new-email"
                type="email"
                value={newEmail}
                onChange={(event) => {
                  setNewEmail(event.target.value);
                  setEmailError("");
                }}
              />

              {emailError && <p className="text-sm text-error">{emailError}</p>}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={closeActionDialog}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={changeEmailMutation.isPending}>
                {changeEmailMutation.isPending ? "Saving…" : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isRoleOpen} onOpenChange={closeActionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Role</DialogTitle>
            <DialogDescription>
              Change the dashboard access level for {selectedAdmin?.name}.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={submitRoleChange} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Role</Label>
              <Select
                value={selectedRole}
                onValueChange={(value) => setSelectedRole(value as AdminRole)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>

                <SelectContent>
                  {ADMIN_ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {ADMIN_ROLE_LABELS[role]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {isDowngradingSuperAdmin && (
              <div className="rounded-xl border border-error/20 bg-error/10 p-3 text-sm text-error">
                Downgrading this Super Admin will remove access to Payments and
                Admin Management immediately.
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={closeActionDialog}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={changeRoleMutation.isPending}>
                {changeRoleMutation.isPending ? "Saving…" : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeactivateOpen} onOpenChange={closeActionDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deactivate account?</AlertDialogTitle>
            <AlertDialogDescription>
              Deactivate {selectedAdmin?.name}&apos;s account? They will no
              longer be able to log in.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-error text-white hover:bg-error/90"
              onClick={() =>
                selectedAdmin && deactivateMutation.mutate(selectedAdmin.id)
              }
            >
              Deactivate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isReactivateOpen} onOpenChange={closeActionDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reactivate account?</AlertDialogTitle>
            <AlertDialogDescription>
              Reactivate {selectedAdmin?.name}&apos;s account? They will be able
              to log in again.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                selectedAdmin && reactivateMutation.mutate(selectedAdmin.id)
              }
            >
              Reactivate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
