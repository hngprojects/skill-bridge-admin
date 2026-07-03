import type { ColumnDef } from "@tanstack/react-table";
import { StatusPill } from "@/components/shared/status-pill";
import type { Transaction, TransactionStatus } from "@/types/api/payments";

function transactionStatusVariant(status: TransactionStatus) {
  if (status === "successful") return "success";
  if (status === "failed") return "error";
  return "warning"; // refunded
}

function transactionStatusLabel(status: TransactionStatus) {
  const labels: Record<TransactionStatus, string> = {
    successful: "Successful",
    failed: "Failed",
    refunded: "Refunded",
  };
  return labels[status];
}

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "subscriber_name",
    header: "Subscriber Name",
    enableGlobalFilter: true,
    cell: ({ row }) => (
      <span className="font-medium">{row.original.subscriber_name}</span>
    ),
  },
  {
    accessorKey: "type",
    header: "Subscriber Type",
    enableGlobalFilter: false,
    cell: ({ row }) => <span className="capitalize">{row.original.type}</span>,
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
        status={transactionStatusLabel(row.original.status)}
        variant={transactionStatusVariant(row.original.status)}
      />
    ),
  },
  {
    accessorKey: "linked_subscription_id",
    header: "Linked Subscription",
    enableGlobalFilter: false,
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">
        {row.original.linked_subscription_id}
      </span>
    ),
  },
];
