"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/shared/data-table";
import type { FilterConfig } from "@/components/shared/data-table";
import { StatusPill } from "@/components/shared/status-pill";
import { Button } from "@/components/ui/button";
import { useQualityNotes } from "@/hooks/api/use-question-bank";
import type {
  QualityNote,
  FlagReason,
  NoteStatus,
} from "@/types/api/question-bank";
import { TALENT_TRACKS } from "@/types/api/talents";

const STAGES = ["Stage 1", "Stage 2", "Stage 3"] as const;
const REASONS: FlagReason[] = [
  "Miscalibrated",
  "Wrong track match",
  "Ambiguous",
  "Other",
];
const STATUSES: NoteStatus[] = ["Open", "Resolved"];

const FILTERS: FilterConfig[] = [
  {
    id: "status",
    label: "Status",
    options: STATUSES.map((s) => ({ label: s, value: s })),
  },
  {
    id: "track",
    label: "Track",
    options: TALENT_TRACKS.map((t) => ({ label: t, value: t })),
  },
  {
    id: "stage",
    label: "Stage",
    options: STAGES.map((s) => ({ label: s, value: s })),
  },
  {
    id: "reason",
    label: "Reason",
    options: REASONS.map((r) => ({ label: r, value: r })),
  },
];

type QualityNotesLogProps = {
  isReadOnly: boolean;
};

function buildColumns(
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
      accessorKey: "reason",
      header: "Reason",
      filterFn: "exact",
    },
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
    {
      accessorKey: "loggedBy",
      header: "Logged by",
    },
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

export function QualityNotesLog({ isReadOnly }: QualityNotesLogProps) {
  const { data: notes = [], isLoading } = useQualityNotes();

  function handleResolve(noteId: string) {
    // TODO: mutation — set note status to "Resolved"
    console.log("resolve", noteId);
  }

  // Quality notes still use mock data — question lookup not wired until endpoint available
  function handleViewQuestion(questionId: string) {
    console.log("view question", questionId);
  }

  const columns = buildColumns(isReadOnly, handleResolve, handleViewQuestion);

  return (
    <DataTable
      columns={columns}
      data={notes}
      isLoading={isLoading}
      searchPlaceholder="Search notes…"
      filters={FILTERS}
      pageSize={20}
      emptyTitle="No quality notes"
      emptyMessage="No quality notes logged yet."
    />
  );
}
