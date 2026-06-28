"use client";

import { DataTable } from "@/components/shared/data-table";
import type { FilterConfig } from "@/components/shared/data-table";
import { useSubscriptions } from "@/hooks/api/use-payments";
import { subscriptionColumns } from "./subscriptions-columns";

const FILTERS: FilterConfig[] = [
  {
    id: "subscriberType",
    label: "Type",
    options: [
      { label: "Employer", value: "Employer" },
      { label: "Talent", value: "Talent" },
    ],
  },
  {
    id: "status",
    label: "Status",
    options: [
      { label: "Active", value: "Active" },
      { label: "Past Due", value: "Past Due" },
      { label: "Cancelled", value: "Cancelled" },
      { label: "Free", value: "Free" },
    ],
  },
];

export function SubscriptionsTable() {
  const { data: subscriptions = [], isLoading } = useSubscriptions();

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="text-sm font-semibold">All Subscriptions</h2>
        <p className="text-xs text-muted-foreground">
          Employer and talent subscriptions across all tiers.
        </p>
      </div>
      <DataTable
        columns={subscriptionColumns}
        data={subscriptions}
        isLoading={isLoading}
        searchPlaceholder="Search by subscriber name…"
        filters={FILTERS}
        pageSize={20}
        emptyTitle="No subscriptions found"
        emptyMessage="Try adjusting your filters."
      />
    </div>
  );
}
