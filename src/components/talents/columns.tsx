import { format } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";

import { StatusPill } from "@/components/shared/status-pill";
import type { StatusPillVariant } from "@/components/shared/status-pill";
import type { TalentListItem, TalentTier } from "@/types/api/talents";

export const tierVariantMap: Record<TalentTier, StatusPillVariant> = {
  "Job Ready": "success",
  Emerging: "info",
  Rejected: "error",
};

export const talentColumns: ColumnDef<TalentListItem>[] = [
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: false,
  },
  {
    accessorKey: "track",
    header: "Track",
    enableSorting: true,
  },
  {
    accessorKey: "tier",
    header: "Tier",
    enableSorting: true,
    cell: ({ row }) => (
      <StatusPill
        status={row.original.tier}
        variant={tierVariantMap[row.original.tier]}
      />
    ),
  },
  {
    accessorKey: "latestStage3Score",
    header: "Stage 3 Score",
    enableSorting: true,
    cell: ({ row }) =>
      row.original.latestStage3Score !== null ? (
        row.original.latestStage3Score
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
  {
    accessorKey: "onboardingDate",
    header: "Onboarding Date",
    enableSorting: true,
    cell: ({ row }) =>
      format(new Date(row.original.onboardingDate), "MMM d, yyyy"),
  },
  {
    accessorKey: "lastActivityDate",
    header: "Last Activity",
    enableSorting: true,
    cell: ({ row }) =>
      format(new Date(row.original.lastActivityDate), "MMM d, yyyy"),
  },
];
