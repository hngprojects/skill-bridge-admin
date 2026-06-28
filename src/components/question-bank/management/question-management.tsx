"use client";

import * as React from "react";

import { DataTable } from "@/components/shared/data-table";
import type { FilterConfig } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { useQuestions } from "@/hooks/api/use-question-bank";
import type { Question } from "@/types/api/question-bank";
import { TALENT_TRACKS } from "@/types/api/talents";
import { questionColumns } from "./columns";
import { QuestionDetailPanel } from "./question-detail-panel";
import { AddQuestionModal } from "./add-question-modal";
import { GenerateQuestionsModal } from "./generate-questions-modal";

const STAGES = ["Stage 1", "Stage 2", "Stage 3"] as const;
const LEVELS = ["Junior", "Mid", "Senior"] as const;
const STATUSES = ["Active", "Flagged", "Removed"] as const;

const FILTERS: FilterConfig[] = [
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
    id: "level",
    label: "Level",
    options: LEVELS.map((l) => ({ label: l, value: l })),
  },
  {
    id: "status",
    label: "Status",
    options: STATUSES.map((s) => ({ label: s, value: s })),
  },
];

type QuestionManagementProps = {
  isReadOnly: boolean;
  selectedQuestion: Question | null;
  panelOpen: boolean;
  onOpenPanel: (question: Question) => void;
  onClosePanel: () => void;
};

export function QuestionManagement({
  isReadOnly,
  selectedQuestion,
  panelOpen,
  onOpenPanel,
  onClosePanel,
}: QuestionManagementProps) {
  const { data: questions = [], isLoading } = useQuestions();
  const [addOpen, setAddOpen] = React.useState(false);
  const [generateOpen, setGenerateOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-4">
      {!isReadOnly && (
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" onClick={() => setGenerateOpen(true)}>
            Generate with AI
          </Button>
          <Button onClick={() => setAddOpen(true)}>
            Add Question Manually
          </Button>
        </div>
      )}

      <DataTable
        columns={questionColumns}
        data={questions}
        isLoading={isLoading}
        searchPlaceholder="Search questions…"
        filters={FILTERS}
        pageSize={20}
        emptyTitle="No questions found"
        emptyMessage="Try adjusting your filters or add a question manually."
        onRowClick={onOpenPanel}
      />

      <QuestionDetailPanel
        question={selectedQuestion}
        open={panelOpen}
        onClose={onClosePanel}
        isReadOnly={isReadOnly}
      />

      {!isReadOnly && (
        <>
          <AddQuestionModal open={addOpen} onOpenChange={setAddOpen} />
          <GenerateQuestionsModal
            open={generateOpen}
            onOpenChange={setGenerateOpen}
          />
        </>
      )}
    </div>
  );
}
