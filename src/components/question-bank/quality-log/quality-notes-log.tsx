"use client";

import { DataTable } from "@/components/shared/data-table";
import type { FilterConfig } from "@/components/shared/data-table";
import { useQualityNotes } from "@/hooks/api/use-question-bank";
import type { FlagReason, NoteStatus } from "@/types/api/question-bank";
import { TALENT_TRACKS } from "@/types/api/talents";
import { buildQualityNotesColumns } from "./quality-notes-columns";

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

export function QualityNotesLog({ isReadOnly }: QualityNotesLogProps) {
  const { data: notes = [], isLoading } = useQualityNotes();

  function handleResolve(noteId: string) {
    console.log("resolve", noteId);
  }

  function handleViewQuestion(questionId: string) {
    console.log("view question", questionId);
  }

  const columns = buildQualityNotesColumns(
    isReadOnly,
    handleResolve,
    handleViewQuestion,
  );

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
