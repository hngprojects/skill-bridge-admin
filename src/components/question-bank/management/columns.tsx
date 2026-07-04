import { format } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";

import { StatusPill } from "@/components/shared/status-pill";
import type { Question } from "@/types/api/question-bank";

function snakeToTitle(value: string): string {
  return value
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export const questionColumns: ColumnDef<Question>[] = [
  {
    accessorKey: "question_text",
    header: "Question",
    cell: ({ row }) => (
      <span className="line-clamp-2 max-w-xs text-sm">
        {row.original.question_text}
      </span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "assessment_type",
    header: "Type",
    cell: ({ row }) => snakeToTitle(row.original.assessment_type),
  },
  {
    accessorKey: "track",
    header: "Track",
    cell: ({ row }) => snakeToTitle(row.original.track),
  },
  {
    accessorKey: "verified_level",
    header: "Level",
    cell: ({ row }) => (
      <span className="capitalize">{row.original.verified_level}</span>
    ),
  },
  {
    accessorKey: "competency",
    header: "Competency",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {snakeToTitle(row.original.competency)}
      </span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "is_live",
    header: "Live",
    cell: ({ row }) =>
      row.original.is_live ? (
        <StatusPill status="Live" variant="success" />
      ) : (
        <StatusPill status="Off" variant="muted" />
      ),
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => (
      <span className="capitalize text-sm text-muted-foreground">
        {snakeToTitle(row.original.source)}
      </span>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Added",
    cell: ({ row }) => format(new Date(row.original.created_at), "MMM d, yyyy"),
  },
];
