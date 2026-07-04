"use client";

import * as React from "react";

import type { AdminRole } from "@/types/api/auth";
import type { Question } from "@/types/api/question-bank";
import { QuestionBankHealth } from "./health/question-bank-health";
import { QuestionManagement } from "./management/question-management";
import { AIGenerationTracking } from "./tracking/ai-generation-tracking";
import { QualityNotesLog } from "./quality-log/quality-notes-log";

type QuestionBankShellProps = {
  role: AdminRole;
};

export function QuestionBankShell({ role }: QuestionBankShellProps) {
  const isReadOnly = role === "admin";

  // Shared state: the detail panel is driven from both Section B (question list)
  // and Section D (quality notes log — row click navigates to the question).
  const [selectedQuestion, setSelectedQuestion] =
    React.useState<Question | null>(null);
  const [panelOpen, setPanelOpen] = React.useState(false);

  function openPanel(question: Question) {
    setSelectedQuestion(question);
    setPanelOpen(true);
  }

  function closePanel() {
    setPanelOpen(false);
    // Keep selectedQuestion populated while the panel animates out
    setTimeout(() => setSelectedQuestion(null), 300);
  }

  return (
    <div className="flex flex-col gap-10">
      <section aria-labelledby="health-heading">
        <h2
          id="health-heading"
          className="mb-4 text-base font-semibold tracking-tight"
        >
          Question Bank Health
        </h2>
        <QuestionBankHealth />
      </section>

      <section aria-labelledby="management-heading">
        <h2
          id="management-heading"
          className="mb-4 text-base font-semibold tracking-tight"
        >
          Question Management
        </h2>
        <React.Suspense
          fallback={<div className="h-64 animate-pulse rounded-2xl bg-muted" />}
        >
          <QuestionManagement
            isReadOnly={isReadOnly}
            selectedQuestion={selectedQuestion}
            panelOpen={panelOpen}
            onOpenPanel={openPanel}
            onClosePanel={closePanel}
          />
        </React.Suspense>
      </section>

      <section aria-labelledby="tracking-heading">
        <h2
          id="tracking-heading"
          className="mb-4 text-base font-semibold tracking-tight"
        >
          AI Generation Tracking
        </h2>
        <AIGenerationTracking />
      </section>

      <section aria-labelledby="quality-heading">
        <h2
          id="quality-heading"
          className="mb-4 text-base font-semibold tracking-tight"
        >
          Quality Notes Log
        </h2>
        <QualityNotesLog isReadOnly={isReadOnly} />
      </section>
    </div>
  );
}
