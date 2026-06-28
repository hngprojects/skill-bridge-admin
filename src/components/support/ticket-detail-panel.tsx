"use client";

import * as React from "react";

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
import type { SupportTicket, TicketStatus } from "@/types/api/support";

const ADMINS = ["Sarah Chen", "James Okafor", "Amira Osei"];
const STATUSES: TicketStatus[] = ["Open", "In Progress", "Resolved"];

function statusVariant(status: TicketStatus) {
  if (status === "Open") return "warning";
  if (status === "In Progress") return "info";
  return "success";
}

type TicketDetailPanelProps = {
  ticket: SupportTicket | null;
  open: boolean;
  onClose: () => void;
};

export function TicketDetailPanel({
  ticket,
  open,
  onClose,
}: TicketDetailPanelProps) {
  const [status, setStatus] = React.useState<TicketStatus>("Open");
  const [assignedAdmin, setAssignedAdmin] = React.useState<string>("");

  React.useEffect(() => {
    const syncTicket = () => {
      if (ticket) {
        setStatus(ticket.status);
        setAssignedAdmin(ticket.assignedAdmin ?? "");
      }
    };
    syncTicket();
  }, [ticket]);

  if (!ticket) return null;

  function handleSave() {
    // TODO: mutation — update ticket status and assignment
    onClose();
  }

  return (
    <SlideOverPanel
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
      title={ticket.ticketNumber}
      description={ticket.subject}
    >
      <div className="flex flex-col gap-6 p-6 pt-2">
        <div className="flex flex-wrap gap-2">
          <StatusPill
            status={ticket.status}
            variant={statusVariant(ticket.status)}
          />
          <StatusPill status={ticket.type} variant="default" />
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Submitted by</p>
            <p className="font-medium">{ticket.submittedBy}</p>
            <p className="text-xs capitalize text-muted-foreground">
              {ticket.submitterType}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Date submitted</p>
            <p>
              {new Date(ticket.dateSubmitted).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Thread
          </p>
          <div className="flex flex-col gap-3">
            {ticket.thread.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-xl border p-3 text-sm ${msg.authorRole === "admin" ? "border-primary/20 bg-primary/5" : "border-border bg-muted/30"}`}
              >
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="font-medium">{msg.authorName}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(msg.sentAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
                <p className="text-muted-foreground">{msg.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Controls
          </p>
          <div className="flex flex-col gap-1.5">
            <Label>Status</Label>
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as TicketStatus)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Assign admin</Label>
            <Select value={assignedAdmin} onValueChange={setAssignedAdmin}>
              <SelectTrigger>
                <SelectValue placeholder="Unassigned" />
              </SelectTrigger>
              <SelectContent>
                {ADMINS.map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSave} className="self-end">
            Save changes
          </Button>
        </div>
      </div>
    </SlideOverPanel>
  );
}
