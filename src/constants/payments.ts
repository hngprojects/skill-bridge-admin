import type { FilterConfig } from "@/components/shared/data-table";
import type { RevenuePeriod } from "@/types/api/payments";

export const REVENUE_PERIODS: { label: string; value: RevenuePeriod }[] = [
  { label: "Yearly", value: "yearly" },
  { label: "Monthly", value: "monthly" },
  { label: "Weekly", value: "weekly" },
  { label: "Daily", value: "daily" },
];

export const SUBSCRIPTION_FILTERS: FilterConfig[] = [
  {
    id: "type",
    label: "Type",
    options: [
      { label: "Employer", value: "employer" },
      { label: "Talent", value: "talent" },
    ],
  },
  {
    id: "status",
    label: "Status",
    options: [
      { label: "Active", value: "active" },
      { label: "Past Due", value: "past_due" },
      { label: "Cancelled", value: "cancelled" },
      { label: "Free", value: "free" },
    ],
  },
];

export const TRANSACTION_FILTERS: FilterConfig[] = [
  {
    id: "status",
    label: "Status",
    options: [
      { label: "Successful", value: "successful" },
      { label: "Failed", value: "failed" },
      { label: "Refunded", value: "refunded" },
    ],
  },
];
