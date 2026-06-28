import { format } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";

import { StatusPill } from "@/components/shared/status-pill";
import type { StatusPillVariant } from "@/components/shared/status-pill";
import type { ConfidenceLevel } from "@/types/api/talents";
import type { VoidedAttempt } from "@/types/api/integrity";

const confidenceVariantMap: Record<ConfidenceLevel, StatusPillVariant> = {
  High: "error",
  Medium: "warning",
  Low: "muted",
};

export const voidedAttemptColumns: ColumnDef<VoidedAttempt>[] = [
  {
    accessorKey: "candidateName",
    header: "Candidate Name",
    enableSorting: true,
  },
  {
    accessorKey: "track",
    header: "Track",
    enableSorting: false,
  },
  {
    accessorKey: "violationCount",
    header: "Violation Count",
    enableSorting: true,
  },
  {
    accessorKey: "confidenceLevel",
    header: "Confidence Level",
    enableSorting: false,
    cell: ({ row }) => (
      <StatusPill
        status={row.original.confidenceLevel}
        variant={confidenceVariantMap[row.original.confidenceLevel]}
      />
    ),
  },
  {
    accessorKey: "sessionDate",
    header: "Session Date",
    enableSorting: true,
    cell: ({ row }) =>
      format(new Date(row.original.sessionDate), "MMM d, yyyy"),
  },
];
