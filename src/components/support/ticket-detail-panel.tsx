"use client";

import * as React from "react";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SlideOverPanel } from "@/components/shared/slide-over-panel";
import { StatusPill } from "@/components/shared/status-pill";
import {
  useTicketDetail,
  useAssignableAdmins,
  useUpdateTicket,
} from "@/hooks/api/use-support";
import type { TicketListItem, TicketStatus } from "@/types/api/support";
import { TICKET_STATUS_LABELS, TICKET_TYPE_LABELS } from "@/types/api/support";

function statusVariant(status: TicketStatus) {
  if (status === "open") return "warning";
  if (status === "in_progress") return "info";
  return "success";
}

type TicketDetailPanelProps = {
  ticket: TicketListItem | null;
  open: boolean;
  onClose: () => void;
};

export function TicketDetailPanel({
  ticket,
  open,
  onClose,
}: TicketDetailPanelProps) {
  const { data: detail, isLoading: detailLoading } = useTicketDetail(
    ticket?.id ?? null,
  );
  const { data: admins = [] } = useAssignableAdmins();
  const mutation = useUpdateTicket(ticket?.id ?? "");

  const [status, setStatus] = React.useState<TicketStatus>("open");
  const [assignedAdminId, setAssignedAdminId] = React.useState<string>("");
  const [syncedDetailId, setSyncedDetailId] = React.useState<string | null>(
    null,
  );

  // Adjust state during render when detail first arrives or ticket changes
  if (detail && detail.id !== syncedDetailId) {
    setSyncedDetailId(detail.id);
    setStatus(detail.status);
    setAssignedAdminId(detail.assigned_admin?.id ?? "");
  }

  if (!ticket) return null;

  const displayStatus = detail?.status ?? ticket.status;
  const displayType = detail?.type ?? ticket.type;
  const thread = detail?.thread ?? [];
  const controls = detail?.controls;
  const availableStatuses: TicketStatus[] = controls?.available_statuses ?? [
    "open",
    "in_progress",
    "resolved",
  ];
  const assignmentEnabled = controls?.assignment_enabled ?? true;

  function handleSave() {
    const body: { status?: TicketStatus; assigned_admin_id?: string | null } =
      {};

    if (status !== (detail?.status ?? ticket!.status)) body.status = status;

    const currentAdminId = detail?.assigned_admin?.id ?? "";
    if (assignedAdminId !== currentAdminId) {
      body.assigned_admin_id = assignedAdminId || null;
    }

    if (Object.keys(body).length === 0) {
      onClose();
      return;
    }

    mutation.mutate(body, {
      onSuccess: () => {
        toast.success("Ticket updated.");
        onClose();
      },
      onError: () => {
        toast.error("Failed to update ticket. Please try again.");
      },
    });
  }

  return (
    <SlideOverPanel
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
      title={ticket.ticket_id}
      description={ticket.subject}
    >
      <div className="flex flex-col gap-6 p-6 pt-2">
        <div className="flex flex-wrap gap-2">
          <StatusPill
            status={TICKET_STATUS_LABELS[displayStatus]}
            variant={statusVariant(displayStatus)}
          />
          <StatusPill
            status={TICKET_TYPE_LABELS[displayType] ?? displayType}
            variant="default"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Submitted by</p>
            <p className="font-medium">{ticket.submitted_by.name}</p>
            <p className="text-xs capitalize text-muted-foreground">
              {ticket.submitted_by.role}
            </p>
            <p className="text-xs text-muted-foreground">
              {ticket.submitted_by.email}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Date submitted</p>
            <p>
              {new Date(ticket.date_submitted).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Thread */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Thread
          </p>
          {detailLoading ? (
            <div className="h-24 animate-pulse rounded-xl bg-muted" />
          ) : thread.length === 0 ? (
            <p className="text-sm text-muted-foreground">No messages yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {thread.map((msg) => (
                <div
                  key={msg.id}
                  className={`rounded-xl border p-3 text-sm ${
                    msg.author_type === "admin"
                      ? "border-primary/20 bg-primary/5"
                      : "border-border bg-muted/30"
                  }`}
                >
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="font-medium">{msg.author.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(msg.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{msg.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reply — no endpoint yet; kept for when BE adds it */}
        <div className="rounded-xl border border-dashed p-4">
          <p className="text-xs text-muted-foreground">
            Reply / send message — endpoint pending (BE to confirm)
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4 rounded-xl border p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Controls
          </p>
          <div className="flex flex-col gap-1.5">
            <Label>Status</Label>
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as TicketStatus)}
              disabled={mutation.isPending}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableStatuses.map((s) => (
                  <SelectItem key={s} value={s}>
                    {TICKET_STATUS_LABELS[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>
              Assign admin
              {!assignmentEnabled && (
                <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                  (disabled by controls)
                </span>
              )}
            </Label>
            <Select
              value={assignedAdminId || "unassigned"}
              onValueChange={(v) =>
                setAssignedAdminId(v === "unassigned" ? "" : v)
              }
              disabled={!assignmentEnabled || mutation.isPending}
            >
              <SelectTrigger>
                <SelectValue placeholder="Unassigned" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                {admins.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSave}
            className="self-end"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </div>
    </SlideOverPanel>
  );
}
