"use client";

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

import {
  useDeactivateAdmin,
  useReactivateAdmin,
} from "@/hooks/api/use-admin-management";
import type { ManagedAdminAccount } from "@/types/api/admin-management";

type DialogProps = {
  admin: ManagedAdminAccount | null;
  open: boolean;
  onClose: () => void;
};

const toggleConfig = {
  deactivate: {
    title: "Deactivate account?",
    description: (name: string) =>
      `Deactivate ${name}'s account? They will no longer be able to log in.`,
    action: "Deactivate",
    actionClass: "bg-error text-white hover:bg-error/90",
  },
  reactivate: {
    title: "Reactivate account?",
    description: (name: string) =>
      `Reactivate ${name}'s account? They will be able to log in again.`,
    action: "Reactivate",
    actionClass: undefined,
  },
} as const;

type ToggleActivationDialogProps = DialogProps & {
  mode: "deactivate" | "reactivate";
};

export function ToggleActivationDialog({
  admin,
  open,
  onClose,
  mode,
}: ToggleActivationDialogProps) {
  const deactivate = useDeactivateAdmin(onClose);
  const reactivate = useReactivateAdmin(onClose);
  const mutation = mode === "deactivate" ? deactivate : reactivate;
  const { title, description, action, actionClass } = toggleConfig[mode];

  return (
    <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {admin?.name ? description(admin.name) : null}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={actionClass}
            onClick={() => admin && mutation.mutate(admin.id)}
          >
            {action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
