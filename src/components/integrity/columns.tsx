import { format } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";

import { StatusPill } from "@/components/shared/status-pill";
import type { StatusPillVariant } from "@/components/shared/status-pill";
import type { VoidedAttempt } from "@/types/api/integrity";

function humanize(value: string): string {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function confidenceVariant(confidence: string): StatusPillVariant {
  switch (confidence.toLowerCase()) {
    case "high":
      return "error";
    case "medium":
      return "warning";
    default:
      return "muted";
  }
}

export const voidedAttemptColumns: ColumnDef<VoidedAttempt>[] = [
  {
    accessorKey: "talent_name",
    header: "Talent",
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <span className="text-sm">{row.original.talent_name}</span>
        <span className="text-xs text-muted-foreground">
          {row.original.talent_email}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "track",
    header: "Track",
    cell: ({ row }) => humanize(row.original.track),
  },
  {
    accessorKey: "assessment_type",
    header: "Assessment",
    cell: ({ row }) => humanize(row.original.assessment_type),
  },
  {
    accessorKey: "tab_switch_count",
    header: "Tab Switches",
  },
  {
    accessorKey: "copy_paste_count",
    header: "Copy / Paste",
  },
  {
    accessorKey: "violation_count",
    header: "Violations",
  },
  {
    accessorKey: "highest_confidence",
    header: "Confidence",
    cell: ({ row }) => {
      const confidence = row.original.highest_confidence;
      if (!confidence) {
        return <span className="text-muted-foreground">—</span>;
      }
      return (
        <StatusPill
          status={humanize(confidence)}
          variant={confidenceVariant(confidence)}
        />
      );
    },
  },
  {
    accessorKey: "completed_at",
    header: "Session Date",
    cell: ({ row }) => {
      const date = row.original.completed_at;
      if (!date) return <span className="text-muted-foreground">—</span>;
      return format(new Date(date), "MMM d, yyyy");
    },
  },
];
