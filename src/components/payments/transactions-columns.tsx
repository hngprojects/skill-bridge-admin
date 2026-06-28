import type { ColumnDef } from "@tanstack/react-table";
import { StatusPill } from "@/components/shared/status-pill";
import type { Transaction, TransactionStatus } from "@/types/api/payments";

function transactionStatusVariant(status: TransactionStatus) {
  if (status === "Successful") return "success";
  if (status === "Failed") return "error";
  return "warning"; // Refunded
}

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "subscriberName",
    header: "Subscriber",
    enableGlobalFilter: true,
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.subscriberName}</p>
        <p className="text-xs text-muted-foreground">
          {row.original.subscriberType}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    enableGlobalFilter: false,
    cell: ({ row }) => `$${row.original.amount.toFixed(2)}`,
  },
  {
    accessorKey: "date",
    header: "Date",
    enableGlobalFilter: false,
    cell: ({ row }) =>
      new Date(row.original.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: "exact",
    enableGlobalFilter: false,
    cell: ({ row }) => (
      <StatusPill
        status={row.original.status}
        variant={transactionStatusVariant(row.original.status)}
      />
    ),
  },
  {
    accessorKey: "linkedSubscription",
    header: "Linked Subscription",
    enableGlobalFilter: false,
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.original.linkedSubscription}
      </span>
    ),
  },
];
