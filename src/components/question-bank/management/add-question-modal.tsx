"use client";

import * as React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addQuestion } from "@/actions/question-bank";
import type { AddQuestionPayload } from "@/actions/question-bank";
import { questionBankKeys } from "@/hooks/api/keys";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddQuestionForm } from "./add-question-form";

type AnswerOption = { id: string; text: string };

const INITIAL_OPTIONS: AnswerOption[] = [
  { id: "opt-1", text: "" },
  { id: "opt-2", text: "" },
];

type AddQuestionModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddQuestionModal({
  open,
  onOpenChange,
}: AddQuestionModalProps) {
  const [assessmentType, setAssessmentType] = React.useState("");
  const [questionType, setQuestionType] = React.useState("");
  const [track, setTrack] = React.useState("");
  const [verifiedLevel, setVerifiedLevel] = React.useState("");
  const [questionText, setQuestionText] = React.useState("");
  const [options, setOptions] = React.useState<AnswerOption[]>(INITIAL_OPTIONS);
  const [correctId, setCorrectId] = React.useState("");
  const [competency, setCompetency] = React.useState("");
  const [slotType, setSlotType] = React.useState("");

  const queryClient = useQueryClient();

  const isMcq = questionType === "single_pick" || questionType === "multi_pick";
  const filledOptions = options.filter((o) => o.text.trim() !== "");

  const canSave =
    assessmentType !== "" &&
    questionType !== "" &&
    track !== "" &&
    verifiedLevel !== "" &&
    questionText.trim() !== "" &&
    (!isMcq || filledOptions.length >= 2) &&
    (questionType !== "single_pick" ||
      (correctId !== "" && filledOptions.some((o) => o.id === correctId)));

  const mutation = useMutation({
    mutationFn: (payload: AddQuestionPayload) => addQuestion(payload),
    onSuccess: () => {
      toast.success("Question added to the bank.");
      queryClient.invalidateQueries({ queryKey: questionBankKeys.questions() });
      queryClient.invalidateQueries({ queryKey: questionBankKeys.health() });
      handleOpenChange(false);
    },
    onError: () => {
      toast.error("Failed to add question. Please try again.");
    },
  });

  function resetForm() {
    setAssessmentType("");
    setQuestionType("");
    setTrack("");
    setVerifiedLevel("");
    setQuestionText("");
    setOptions([
      { id: "opt-1", text: "" },
      { id: "opt-2", text: "" },
    ]);
    setCorrectId("");
    setCompetency("");
    setSlotType("");
  }

  function handleOpenChange(next: boolean) {
    if (!next) resetForm();
    onOpenChange(next);
  }

  function handleQuestionTypeChange(v: string) {
    setQuestionType(v);
    // Clear MCQ-specific state when switching away from MCQ types
    if (v !== "single_pick" && v !== "multi_pick") {
      setOptions([
        { id: "opt-1", text: "" },
        { id: "opt-2", text: "" },
      ]);
      setCorrectId("");
    }
  }

  function addOption() {
    setOptions((prev) => [...prev, { id: `opt-${prev.length + 1}`, text: "" }]);
  }

  function removeOption(id: string) {
    setOptions((prev) => prev.filter((o) => o.id !== id));
    if (correctId === id) setCorrectId("");
  }

  function updateOption(id: string, text: string) {
    setOptions((prev) => prev.map((o) => (o.id === id ? { ...o, text } : o)));
  }

  function handleSave() {
    const payload: AddQuestionPayload = {
      assessmentType: assessmentType as AddQuestionPayload["assessmentType"],
      questionType: questionType as AddQuestionPayload["questionType"],
      questionText: questionText.trim(),
      track,
      verifiedLevel: verifiedLevel as AddQuestionPayload["verifiedLevel"],
    };

    if (isMcq) {
      payload.options = filledOptions.map((o) => o.text);
      if (questionType === "single_pick" && correctId) {
        const correct = filledOptions.find((o) => o.id === correctId);
        if (correct) payload.correctAnswer = correct.text;
      }
    }

    if (competency.trim()) payload.competency = competency.trim();
    if (slotType) payload.slotType = slotType as AddQuestionPayload["slotType"];

    mutation.mutate(payload);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Question Manually</DialogTitle>
        </DialogHeader>

        <AddQuestionForm
          assessmentType={assessmentType}
          questionType={questionType}
          track={track}
          verifiedLevel={verifiedLevel}
          questionText={questionText}
          options={options}
          correctId={correctId}
          competency={competency}
          slotType={slotType}
          filledOptions={filledOptions}
          onAssessmentTypeChange={setAssessmentType}
          onQuestionTypeChange={handleQuestionTypeChange}
          onTrackChange={setTrack}
          onVerifiedLevelChange={setVerifiedLevel}
          onQuestionTextChange={setQuestionText}
          onUpdateOption={updateOption}
          onAddOption={addOption}
          onRemoveOption={removeOption}
          onCorrectIdChange={setCorrectId}
          onCompetencyChange={setCompetency}
          onSlotTypeChange={setSlotType}
        />

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <Button
            disabled={!canSave || mutation.isPending}
            onClick={handleSave}
          >
            {mutation.isPending ? "Saving…" : "Save question"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
