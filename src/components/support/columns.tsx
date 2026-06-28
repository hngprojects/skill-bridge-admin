import type { ColumnDef } from "@tanstack/react-table";
import { StatusPill } from "@/components/shared/status-pill";
import type { SupportTicket, TicketStatus } from "@/types/api/support";

function statusVariant(status: TicketStatus) {
  if (status === "Open") return "warning";
  if (status === "In Progress") return "info";
  return "success";
}

export const supportColumns: ColumnDef<SupportTicket>[] = [
  {
    accessorKey: "ticketNumber",
    header: "Ticket ID",
    enableGlobalFilter: false,
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">
        {row.original.ticketNumber}
      </span>
    ),
  },
  {
    accessorKey: "submittedBy",
    header: "Submitted By",
    enableGlobalFilter: true,
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.submittedBy}</p>
        <p className="text-xs capitalize text-muted-foreground">
          {row.original.submitterType}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    filterFn: "exact",
    enableGlobalFilter: false,
  },
  {
    accessorKey: "subject",
    header: "Subject",
    enableGlobalFilter: false,
    cell: ({ row }) => (
      <span className="line-clamp-1 max-w-56">{row.original.subject}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: "exact",
    enableGlobalFilter: false,
    cell: ({ row }) => (
      <StatusPill
        status={row.original.status}
        variant={statusVariant(row.original.status)}
      />
    ),
  },
  {
    accessorKey: "dateSubmitted",
    header: "Date Submitted",
    enableGlobalFilter: false,
    cell: ({ row }) =>
      new Date(row.original.dateSubmitted).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
  },
  {
    accessorKey: "assignedAdmin",
    header: "Assigned Admin",
    enableGlobalFilter: false,
    cell: ({ row }) =>
      row.original.assignedAdmin ?? (
        <span className="text-muted-foreground">—</span>
      ),
  },
];
