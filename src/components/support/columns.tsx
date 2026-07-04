import type { ColumnDef } from "@tanstack/react-table";
import { StatusPill } from "@/components/shared/status-pill";
import type { TicketListItem, TicketStatus } from "@/types/api/support";
import { TICKET_STATUS_LABELS, TICKET_TYPE_LABELS } from "@/types/api/support";

function statusVariant(status: TicketStatus) {
  if (status === "open") return "warning";
  if (status === "in_progress") return "info";
  return "success";
}

export const supportColumns: ColumnDef<TicketListItem>[] = [
  {
    accessorKey: "ticket_id",
    header: "Ticket ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">
        {row.original.ticket_id}
      </span>
    ),
  },
  {
    accessorKey: "submitted_by",
    header: "Submitted By",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.submitted_by.name}</p>
        <p className="text-xs capitalize text-muted-foreground">
          {row.original.submitted_by.role}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) =>
      TICKET_TYPE_LABELS[row.original.type] ?? row.original.type,
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => (
      <span className="line-clamp-1 max-w-56">{row.original.subject}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusPill
        status={TICKET_STATUS_LABELS[row.original.status]}
        variant={statusVariant(row.original.status)}
      />
    ),
  },
  {
    accessorKey: "date_submitted",
    header: "Date Submitted",
    cell: ({ row }) =>
      new Date(row.original.date_submitted).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
  },
  {
    accessorKey: "assigned_admin",
    header: "Assigned Admin",
    cell: ({ row }) =>
      row.original.assigned_admin?.name ?? (
        <span className="text-muted-foreground">—</span>
      ),
  },
];
