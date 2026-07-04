"use client";

import { format } from "date-fns";

import { SlideOverPanel } from "@/components/shared/slide-over-panel";
import { StatusPill } from "@/components/shared/status-pill";
import type { Question } from "@/types/api/question-bank";

function snakeToTitle(value: string): string {
  return value
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="text-sm text-foreground">{children}</div>
    </div>
  );
}

type QuestionDetailPanelProps = {
  question: Question | null;
  open: boolean;
  onClose: () => void;
  isReadOnly: boolean;
};

export function QuestionDetailPanel({
  question,
  open,
  onClose,
}: QuestionDetailPanelProps) {
  if (!question) return null;

  return (
    <SlideOverPanel
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
      title="Question Detail"
      description={`${snakeToTitle(question.track)} · ${snakeToTitle(question.assessment_type)} · ${question.verified_level}`}
    >
      <div className="flex flex-col gap-6 p-6 pt-2">
        {/* Status badges */}
        <div className="flex flex-wrap gap-2">
          <StatusPill
            status={question.is_live ? "Live" : "Off"}
            variant={question.is_live ? "success" : "muted"}
          />
          <StatusPill
            status={snakeToTitle(question.review_status)}
            variant="info"
          />
          <StatusPill
            status={snakeToTitle(question.source)}
            variant="default"
          />
        </div>

        {/* Question text */}
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Question #{question.question_number}
          </p>
          <p className="text-sm leading-relaxed">{question.question_text}</p>
        </div>

        {/* Metadata grid */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Assessment Type">
            {snakeToTitle(question.assessment_type)}
          </Field>
          <Field label="Question Type">
            {snakeToTitle(question.question_type)}
          </Field>
          <Field label="Track">{snakeToTitle(question.track)}</Field>
          <Field label="Level">
            <span className="capitalize">{question.verified_level}</span>
          </Field>
          <Field label="Competency">{snakeToTitle(question.competency)}</Field>
          <Field label="Slot Type">{snakeToTitle(question.slot_type)}</Field>
          <Field label="Added">
            {format(new Date(question.created_at), "MMM d, yyyy")}
          </Field>
          {question.added_by && (
            <Field label="Added By">{question.added_by}</Field>
          )}
        </div>
      </div>
    </SlideOverPanel>
  );
}
