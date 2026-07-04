import { format } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";

import { StatusPill } from "@/components/shared/status-pill";
import type { StatusPillVariant } from "@/components/shared/status-pill";
import type { TalentListItem, TalentTier } from "@/types/api/talents";
import { TRACK_LABELS } from "@/types/api/talents";

export const tierLabels: Record<TalentTier, string> = {
  Onboarding: "Onboarding",
  "Job Ready": "Job Ready",
  Emerging: "Emerging",
  Rejected: "Rejected",
};

export const tierVariantMap: Record<TalentTier, StatusPillVariant> = {
  Onboarding: "muted",
  "Job Ready": "success",
  Emerging: "info",
  Rejected: "error",
};

export const talentColumns: ColumnDef<TalentListItem>[] = [
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="block max-w-[200px] truncate" title={row.original.name}>
        {row.original.name}
      </span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: false,
    cell: ({ row }) => (
      <span className="block max-w-[200px] truncate" title={row.original.email}>
        {row.original.email}
      </span>
    ),
  },
  {
    accessorKey: "track",
    header: "Track",
    enableSorting: true,
    cell: ({ row }) => {
      const t = row.original.track;
      return t ? (
        (TRACK_LABELS[t] ?? t)
      ) : (
        <span className="text-muted-foreground">—</span>
      );
    },
  },
  {
    accessorKey: "tier",
    header: "Tier",
    enableSorting: true,
    cell: ({ row }) => {
      const tier = row.original.tier as TalentTier | null | undefined;
      if (!tier || !tierLabels[tier]) {
        return <span className="text-muted-foreground">—</span>;
      }
      return (
        <StatusPill status={tierLabels[tier]} variant={tierVariantMap[tier]} />
      );
    },
  },
  {
    accessorKey: "latest_stage3_score",
    header: "Stage 3 Score",
    enableSorting: true,
    cell: ({ row }) =>
      row.original.latest_stage3_score !== null ? (
        row.original.latest_stage3_score
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
  {
    accessorKey: "onboarding_date",
    header: "Onboarding Date",
    enableSorting: true,
    cell: ({ row }) =>
      format(new Date(row.original.onboarding_date), "MMM d, yyyy"),
  },
  {
    accessorKey: "last_activity_date",
    header: "Last Activity",
    enableSorting: true,
    cell: ({ row }) =>
      format(new Date(row.original.last_activity_date), "MMM d, yyyy"),
  },
];
