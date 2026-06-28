import type { ColumnDef } from "@tanstack/react-table";
import { StatusPill } from "@/components/shared/status-pill";
import type { Subscription, SubscriptionStatus } from "@/types/api/payments";

function subscriptionStatusVariant(status: SubscriptionStatus) {
  if (status === "Active") return "success";
  if (status === "Past Due") return "warning";
  if (status === "Cancelled") return "error";
  return "muted"; // Free
}

export const subscriptionColumns: ColumnDef<Subscription>[] = [
  {
    accessorKey: "subscriberName",
    header: "Subscriber",
    enableGlobalFilter: true,
  },
  {
    accessorKey: "subscriberType",
    header: "Type",
    filterFn: "exact",
    enableGlobalFilter: false,
  },
  {
    accessorKey: "packageName",
    header: "Package / Tier",
    enableGlobalFilter: false,
  },
  {
    accessorKey: "monthlyPrice",
    header: "Monthly Price",
    enableGlobalFilter: false,
    cell: ({ row }) =>
      row.original.monthlyPrice === null ? (
        <span className="text-muted-foreground">—</span>
      ) : (
        `$${row.original.monthlyPrice}`
      ),
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: "exact",
    enableGlobalFilter: false,
    cell: ({ row }) => {
      const { status, gracePeriodDaysLeft } = row.original;
      return (
        <div className="flex items-center gap-2">
          <StatusPill
            status={status}
            variant={subscriptionStatusVariant(status)}
          />
          {status === "Past Due" && gracePeriodDaysLeft !== undefined && (
            <span className="text-xs text-muted-foreground">
              {gracePeriodDaysLeft}d left
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    enableGlobalFilter: false,
    cell: ({ row }) =>
      new Date(row.original.startDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
  },
  {
    accessorKey: "nextBillingDate",
    header: "Next Billing",
    enableGlobalFilter: false,
    cell: ({ row }) =>
      row.original.nextBillingDate ? (
        new Date(row.original.nextBillingDate).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
];
