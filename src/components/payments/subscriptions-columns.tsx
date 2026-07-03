import type { ColumnDef } from "@tanstack/react-table";
import { StatusPill } from "@/components/shared/status-pill";
import type { Subscription, SubscriptionStatus } from "@/types/api/payments";

function subscriptionStatusVariant(status: SubscriptionStatus) {
  if (status === "active") return "success";
  if (status === "past_due") return "warning";
  if (status === "cancelled") return "error";
  return "muted"; // free
}

function subscriptionStatusLabel(
  status: SubscriptionStatus,
  daysLeft: number | null,
) {
  if (status === "past_due" && daysLeft != null) {
    return `Past Due · ${daysLeft}d left`;
  }
  const labels: Record<SubscriptionStatus, string> = {
    active: "Active",
    past_due: "Past Due",
    cancelled: "Cancelled",
    free: "Free",
  };
  return labels[status];
}

export const subscriptionColumns: ColumnDef<Subscription>[] = [
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
    filterFn: "exact",
    enableGlobalFilter: false,
    cell: ({ row }) => <span className="capitalize">{row.original.type}</span>,
  },
  {
    accessorKey: "package_tier",
    header: "Package / Tier",
    enableGlobalFilter: false,
  },
  {
    accessorKey: "monthly_price",
    header: "Monthly Price",
    enableGlobalFilter: false,
    cell: ({ row }) =>
      row.original.monthly_price === null ||
      row.original.monthly_price === 0 ? (
        <span className="text-muted-foreground">—</span>
      ) : (
        `$${row.original.monthly_price}`
      ),
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: "exact",
    enableGlobalFilter: false,
    cell: ({ row }) => {
      const { status, days_left_in_grace } = row.original;
      return (
        <StatusPill
          status={subscriptionStatusLabel(status, days_left_in_grace)}
          variant={subscriptionStatusVariant(status)}
        />
      );
    },
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
    enableGlobalFilter: false,
    cell: ({ row }) =>
      new Date(row.original.start_date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
  },
  {
    accessorKey: "next_billing_date",
    header: "Next Billing Date",
    enableGlobalFilter: false,
    cell: ({ row }) =>
      row.original.next_billing_date ? (
        new Date(row.original.next_billing_date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
];
