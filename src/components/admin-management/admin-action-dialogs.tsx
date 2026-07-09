"use client";

import * as React from "react";
import {
  AlertDialog,
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
import {
  useChangeAdminEmail,
  useChangeAdminRole,
  useResetAdminPassword,
} from "@/hooks/api/use-admin-management";
import type { ManagedAdminAccount } from "@/types/api/admin-management";
import { ADMIN_ROLE_LABELS, ADMIN_ROLES } from "@/types/api/admin-management";
import type { AdminRole } from "@/types/api/auth";

type DialogProps = {
  admin: ManagedAdminAccount | null;
  open: boolean;
  onClose: () => void;
};

export function ResetPasswordDialog({ admin, open, onClose }: DialogProps) {
  const mutation = useResetAdminPassword(onClose);

  return (
    <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset password?</AlertDialogTitle>
          <AlertDialogDescription>
            Reset password for {admin?.name}? They will need to set a new
            password before logging in again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={mutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={() => admin && mutation.mutate(admin.id)}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Resetting…" : "Reset Password"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function ChangeEmailDialog({ admin, open, onClose }: DialogProps) {
  const [newEmail, setNewEmail] = React.useState(admin?.email ?? "");
  const mutation = useChangeAdminEmail(onClose);

  const serverError = mutation.data?.ok === false ? mutation.data.message : "";

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose();
          mutation.reset();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Email</DialogTitle>
          <DialogDescription>
            Update the email address for {admin?.name}.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (admin)
              mutation.mutate({
                id: admin.id,
                email: newEmail.trim().toLowerCase(),
              });
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <Label>Current email</Label>
            <Input value={admin?.email ?? ""} readOnly />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="new-email">New email</Label>
            <Input
              id="new-email"
              type="email"
              required
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            {serverError && <p className="text-sm text-error">{serverError}</p>}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving…" : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function ChangeRoleDialog({ admin, open, onClose }: DialogProps) {
  const [selectedRole, setSelectedRole] = React.useState<AdminRole>(
    admin?.role ?? "admin",
  );
  const mutation = useChangeAdminRole(onClose);

  const isDowngradingSuperAdmin =
    admin?.role === "super_admin" && selectedRole !== "super_admin";

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose();
          mutation.reset();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Role</DialogTitle>
          <DialogDescription>
            Change the dashboard access level for {admin?.name}.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (admin)
              mutation.mutate({
                id: admin.id,
                role: selectedRole,
                confirm_downgrade: isDowngradingSuperAdmin,
              });
          }}
          className="flex flex-col gap-4"
        >
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
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving…" : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
