import type { ColumnDef } from "@tanstack/react-table";

import { StatusPill } from "@/components/shared/status-pill";
import type { StatusPillVariant } from "@/components/shared/status-pill";
import type {
  Question,
  QuestionStatus,
  QuestionSource,
} from "@/types/api/question-bank";

function statusVariant(status: QuestionStatus): StatusPillVariant {
  if (status === "Active") return "success";
  if (status === "Flagged") return "warning";
  return "muted";
}

function sourceVariant(source: QuestionSource): StatusPillVariant {
  if (source === "AI-generated") return "info";
  if (source === "Imported") return "default";
  return "muted";
}

export const questionColumns: ColumnDef<Question>[] = [
  {
    accessorKey: "text",
    header: "Question",
    cell: ({ row }) => (
      <span className="line-clamp-2 max-w-xs text-sm">{row.original.text}</span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "track",
    header: "Track",
    filterFn: "exact",
  },
  {
    accessorKey: "stage",
    header: "Stage",
    filterFn: "exact",
  },
  {
    accessorKey: "level",
    header: "Level",
    filterFn: "exact",
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: "exact",
    cell: ({ row }) => (
      <StatusPill
        status={row.original.status}
        variant={statusVariant(row.original.status)}
      />
    ),
  },
  {
    accessorKey: "dateAdded",
    header: "Date Added",
    cell: ({ row }) =>
      new Date(row.original.dateAdded).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => (
      <StatusPill
        status={row.original.source}
        variant={sourceVariant(row.original.source)}
      />
    ),
  },
  {
    id: "flagged",
    header: "Flagged",
    cell: ({ row }) =>
      row.original.flagHistory.some((f) => f.status === "Open") ? (
        <StatusPill status="Yes" variant="warning" />
      ) : (
        <span className="text-sm text-muted-foreground">—</span>
      ),
  },
];
