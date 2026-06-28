"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { getMockGeneratedQuestions } from "@/mocks/question-bank";
import type { GeneratedQuestionPreview } from "@/types/api/question-bank";
import type { TalentTrack } from "@/types/api/talents";
import { GenerateConfigStep } from "./generate-steps";
import { PreviewCard } from "./preview-card";

type Step = "config" | "loading" | "review" | "error";

type GenerateQuestionsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function GenerateQuestionsModal({
  open,
  onOpenChange,
}: GenerateQuestionsModalProps) {
  const [step, setStep] = React.useState<Step>("config");
  const [track, setTrack] = React.useState<TalentTrack | "">("");
  const [stage, setStage] = React.useState("");
  const [level, setLevel] = React.useState("");
  const [count, setCount] = React.useState("5");
  const [promptHint, setPromptHint] = React.useState("");
  const [previews, setPreviews] = React.useState<GeneratedQuestionPreview[]>(
    [],
  );
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editDraft, setEditDraft] = React.useState("");

  const canGenerate =
    track !== "" && stage !== "" && level !== "" && Number(count) >= 1;
  const acceptedCount = previews.filter(
    (p) => p.reviewStatus === "accepted",
  ).length;
  const pendingCount = previews.filter(
    (p) => p.reviewStatus === "pending",
  ).length;

  function handleGenerate() {
    setStep("loading");
    setTimeout(() => {
      try {
        setPreviews(
          getMockGeneratedQuestions(track as TalentTrack, Number(count)),
        );
        setStep("review");
      } catch {
        setStep("error");
      }
    }, 1800);
  }

  function setReviewStatus(
    id: string,
    status: GeneratedQuestionPreview["reviewStatus"],
  ) {
    setPreviews((prev) =>
      prev.map((p) => (p.id === id ? { ...p, reviewStatus: status } : p)),
    );
  }

  function startEdit(preview: GeneratedQuestionPreview) {
    setEditingId(preview.id);
    setEditDraft(preview.editedText ?? preview.text);
  }

  function saveEdit(id: string) {
    setPreviews((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, editedText: editDraft, reviewStatus: "accepted" }
          : p,
      ),
    );
    setEditingId(null);
  }

  function handleClose() {
    onOpenChange(false);
    setTimeout(() => {
      setStep("config");
      setTrack("");
      setStage("");
      setLevel("");
      setCount("5");
      setPromptHint("");
      setPreviews([]);
      setEditingId(null);
    }, 300);
  }

  function handleSaveAccepted() {
    // TODO: POST /question-bank/questions for each accepted preview
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) handleClose();
      }}
    >
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generate Questions with AI</DialogTitle>
        </DialogHeader>

        {step === "config" && (
          <GenerateConfigStep
            track={track}
            stage={stage}
            level={level}
            count={count}
            promptHint={promptHint}
            canGenerate={canGenerate}
            onTrackChange={setTrack}
            onStageChange={setStage}
            onLevelChange={setLevel}
            onCountChange={setCount}
            onPromptHintChange={setPromptHint}
            onGenerate={handleGenerate}
            onClose={handleClose}
          />
        )}

        {step === "loading" && (
          <div className="flex flex-col items-center justify-center gap-4 py-16">
            <Spinner className="size-8" />
            <p className="text-sm text-muted-foreground">
              Generating {count} questions for {track} · {stage} · {level}…
            </p>
          </div>
        )}

        {step === "review" && (
          <>
            <div className="flex items-center gap-3 py-1 text-sm text-muted-foreground">
              <span>{previews.length} generated</span>
              <span>·</span>
              <span className="text-success">{acceptedCount} accepted</span>
              {pendingCount > 0 && (
                <>
                  <span>·</span>
                  <span>{pendingCount} pending review</span>
                </>
              )}
            </div>

            <div className="flex flex-col gap-4 py-2">
              {previews.map((preview) => (
                <PreviewCard
                  key={preview.id}
                  preview={preview}
                  isEditing={editingId === preview.id}
                  editDraft={editDraft}
                  onEditDraftChange={setEditDraft}
                  onSetStatus={setReviewStatus}
                  onStartEdit={startEdit}
                  onSaveEdit={saveEdit}
                />
              ))}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Discard all
              </Button>
              <Button
                disabled={acceptedCount === 0}
                onClick={handleSaveAccepted}
              >
                Save {acceptedCount > 0 ? acceptedCount : ""} accepted
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "error" && (
          <>
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <p className="font-medium">Generation failed</p>
              <p className="text-sm text-muted-foreground">
                Try again or add questions manually.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
              <Button onClick={() => setStep("config")}>Try again</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
