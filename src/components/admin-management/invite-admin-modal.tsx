"use client";

import * as React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { inviteAdmin } from "@/actions/admin-management";
import { adminManagementKeys } from "@/hooks/api/keys";
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

type InviteAdminModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function InviteAdminModal({
  open,
  onOpenChange,
}: InviteAdminModalProps) {
  const [email, setEmail] = React.useState("");
  const [fieldError, setFieldError] = React.useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: inviteAdmin,
    onSuccess: async (result) => {
      if (!result.ok) {
        setFieldError(result.message);
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      setEmail("");
      setFieldError("");
      onOpenChange(false);
      await queryClient.invalidateQueries({
        queryKey: adminManagementKeys.accounts(),
      });
    },
    onError: () => {
      toast.error("Invite failed. Try again.");
    },
  });

  const trimmedEmail = email.trim();
  const canSubmit = isValidEmail(trimmedEmail) && !mutation.isPending;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValidEmail(trimmedEmail)) {
      setFieldError("Enter a valid email address.");
      return;
    }

    setFieldError("");
    mutation.mutate({ email: trimmedEmail });
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setEmail("");
      setFieldError("");
    }

    onOpenChange(nextOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Admin</DialogTitle>
          <DialogDescription>
            Send an invite to create a new admin account.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="admin-email">Email address</Label>
            <Input
              id="admin-email"
              type="email"
              value={email}
              placeholder="admin@example.com"
              onChange={(event) => {
                setEmail(event.target.value);
                setFieldError("");
              }}
            />

            {fieldError && <p className="text-sm text-error">{fieldError}</p>}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!canSubmit}>
              {mutation.isPending ? "Sending…" : "Send Invite"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
