"use client";

import * as React from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SlideOverPanel } from "@/components/shared/slide-over-panel";
import { StatusPill } from "@/components/shared/status-pill";
import { ConfirmationModal } from "@/components/shared/confirmation-modal";
import type { FlagReason, Question } from "@/types/api/question-bank";
import { AnswerOptions, FlagHistory } from "./panel-parts";
import { FlagForm, PanelActions } from "./panel-actions";

type QuestionDetailPanelProps = {
  question: Question | null;
  open: boolean;
  onClose: () => void;
  isReadOnly: boolean;
};

type PanelMode = "view" | "flag" | "edit";

export function QuestionDetailPanel({
  question,
  open,
  onClose,
  isReadOnly,
}: QuestionDetailPanelProps) {
  const [mode, setMode] = React.useState<PanelMode>("view");
  const [removeOpen, setRemoveOpen] = React.useState(false);
  const [flagReason, setFlagReason] = React.useState<FlagReason | "">("");
  const [flagNote, setFlagNote] = React.useState("");
  const [editText, setEditText] = React.useState("");
  const [editOptions, setEditOptions] = React.useState<
    { id: string; text: string }[]
  >([]);
  const [editCorrectId, setEditCorrectId] = React.useState("");

  React.useEffect(() => {
    const resetPanel = () => {
      if (question) {
        setEditText(question.text);
        setEditOptions(question.options.map((o) => ({ ...o })));
        setEditCorrectId(question.correctAnswerId);
      }
      setMode("view");
      setFlagReason("");
      setFlagNote("");
    };
    resetPanel();
  }, [question]);

  if (!question) return null;

  const isActive = question.status === "Active";
  const isFlagged = question.status === "Flagged";
  const isRemoved = question.status === "Removed";

  function handleSaveFlag() {
    // TODO: mutation — flag question, append FlagEntry, update QualityNotes
    setMode("view");
    setFlagReason("");
    setFlagNote("");
  }

  function handleSaveEdit() {
    // TODO: mutation — update question, set status to "Flagged"
    setMode("view");
  }

  function handleEditOption(id: string, text: string) {
    setEditOptions((prev) =>
      prev.map((o) => (o.id === id ? { ...o, text } : o)),
    );
  }

  return (
    <>
      <SlideOverPanel
        open={open}
        onOpenChange={(o) => {
          if (!o) onClose();
        }}
        title="Question Detail"
        description={`${question.track} · ${question.stage} · ${question.level}`}
      >
        <div className="flex flex-col gap-6 p-6 pt-2">
          <div className="flex flex-wrap gap-2">
            <StatusPill
              status={question.status}
              variant={isActive ? "success" : isFlagged ? "warning" : "muted"}
            />
            <StatusPill
              status={question.source}
              variant={
                question.source === "AI-generated"
                  ? "info"
                  : question.source === "Imported"
                    ? "default"
                    : "muted"
              }
            />
          </div>

          {mode === "edit" ? (
            <div className="flex flex-col gap-1.5">
              <Label>Question text</Label>
              <Textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                rows={4}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Question
              </p>
              <p className="text-sm">{question.text}</p>
            </div>
          )}

          <AnswerOptions
            options={question.options}
            correctAnswerId={question.correctAnswerId}
            isEditMode={mode === "edit"}
            editOptions={editOptions}
            editCorrectId={editCorrectId}
            onEditOption={handleEditOption}
            onEditCorrectId={setEditCorrectId}
          />

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Date added</p>
              <p>
                {new Date(question.dateAdded).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Added by</p>
              <p>{question.addedBy}</p>
            </div>
          </div>

          <FlagHistory entries={question.flagHistory} />

          {mode === "flag" && (
            <FlagForm
              flagReason={flagReason}
              flagNote={flagNote}
              onReasonChange={setFlagReason}
              onNoteChange={setFlagNote}
              onSave={handleSaveFlag}
              onCancel={() => setMode("view")}
            />
          )}

          {!isReadOnly && (
            <PanelActions
              mode={mode}
              isActive={isActive}
              isFlagged={isFlagged}
              isRemoved={isRemoved}
              onEdit={() => setMode("edit")}
              onFlag={() => setMode("flag")}
              onRemove={() => setRemoveOpen(true)}
              onRestore={() => {
                /* TODO: mutation */
              }}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={() => setMode("view")}
            />
          )}
        </div>
      </SlideOverPanel>

      <ConfirmationModal
        open={removeOpen}
        onOpenChange={setRemoveOpen}
        title="Remove question"
        description="Remove this question from the active pool? It will not be served to candidates. This can be undone."
        confirmLabel="Remove"
        isDestructive
        onConfirm={() => {
          /* TODO: mutation */ setRemoveOpen(false);
        }}
      />
    </>
  );
}
