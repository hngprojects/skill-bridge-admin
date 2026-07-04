import type { ColumnDef } from "@tanstack/react-table";

import { StatusPill } from "@/components/shared/status-pill";
import { Button } from "@/components/ui/button";
import type { QualityNote } from "@/types/api/question-bank";

export function buildQualityNotesColumns(
  isReadOnly: boolean,
  onResolve: (noteId: string) => void,
  onViewQuestion: (questionId: string) => void,
): ColumnDef<QualityNote>[] {
  return [
    {
      accessorKey: "questionPreview",
      header: "Question",
      cell: ({ row }) => (
        <button
          className="max-w-xs truncate text-left text-sm underline-offset-2 hover:underline"
          onClick={() => onViewQuestion(row.original.questionId)}
        >
          {row.original.questionPreview}
        </button>
      ),
      enableSorting: false,
    },
    { accessorKey: "track", header: "Track", filterFn: "exact" },
    { accessorKey: "stage", header: "Stage", filterFn: "exact" },
    { accessorKey: "reason", header: "Reason", filterFn: "exact" },
    {
      accessorKey: "note",
      header: "Note",
      cell: ({ row }) => (
        <span className="line-clamp-2 max-w-xs text-sm text-muted-foreground">
          {row.original.note || "—"}
        </span>
      ),
      enableSorting: false,
    },
    { accessorKey: "loggedBy", header: "Logged by" },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) =>
        new Date(row.original.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
    },
    {
      accessorKey: "status",
      header: "Status",
      filterFn: "exact",
      cell: ({ row }) => (
        <StatusPill
          status={row.original.status}
          variant={row.original.status === "Open" ? "warning" : "muted"}
        />
      ),
    },
    ...(isReadOnly
      ? []
      : [
          {
            id: "actions",
            header: "",
            cell: ({ row }: { row: { original: QualityNote } }) =>
              row.original.status === "Open" ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onResolve(row.original.id);
                  }}
                >
                  Mark resolved
                </Button>
              ) : null,
          } as ColumnDef<QualityNote>,
        ]),
  ];
}
