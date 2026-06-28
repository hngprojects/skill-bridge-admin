"use client";

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserAdd01Icon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminAccountsTable } from "./admin-accounts-table";
import { InviteAdminModal } from "./invite-admin-modal";

export function AdminManagementShell() {
  const [inviteOpen, setInviteOpen] = React.useState(false);

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold tracking-tight">
              Admin Management
            </h1>
            <p className="text-sm text-muted-foreground">
              Invite admins, manage roles, and control dashboard access.
            </p>
          </div>

          <Button onClick={() => setInviteOpen(true)}>
            <HugeiconsIcon
              icon={UserAdd01Icon}
              strokeWidth={2}
              className="size-4"
            />
            Invite Admin
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Admin Accounts</CardTitle>
          </CardHeader>

          <CardContent>
            <AdminAccountsTable />
          </CardContent>
        </Card>
      </div>

      <InviteAdminModal open={inviteOpen} onOpenChange={setInviteOpen} />
    </>
  );
}
