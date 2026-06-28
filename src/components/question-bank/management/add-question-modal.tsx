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
  const [track, setTrack] = React.useState("");
  const [stage, setStage] = React.useState("");
  const [level, setLevel] = React.useState("");
  const [questionText, setQuestionText] = React.useState("");
  const [options, setOptions] = React.useState<AnswerOption[]>(INITIAL_OPTIONS);
  const [correctId, setCorrectId] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const filledOptions = options.filter((o) => o.text.trim() !== "");
  const canSave =
    track !== "" &&
    stage !== "" &&
    level !== "" &&
    questionText.trim() !== "" &&
    filledOptions.length >= 2 &&
    correctId !== "" &&
    filledOptions.some((o) => o.id === correctId);

  function resetForm() {
    setTrack("");
    setStage("");
    setLevel("");
    setQuestionText("");
    setOptions([
      { id: "opt-1", text: "" },
      { id: "opt-2", text: "" },
    ]);
    setCorrectId("");
    setNotes("");
  }

  function handleOpenChange(next: boolean) {
    if (!next) resetForm();
    onOpenChange(next);
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
    // TODO: mutation — create question with status=Active, source=Manual
    onOpenChange(false);
    resetForm();
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Question Manually</DialogTitle>
        </DialogHeader>

        <AddQuestionForm
          track={track}
          stage={stage}
          level={level}
          questionText={questionText}
          options={options}
          correctId={correctId}
          notes={notes}
          filledOptions={filledOptions}
          onTrackChange={setTrack}
          onStageChange={setStage}
          onLevelChange={setLevel}
          onQuestionTextChange={setQuestionText}
          onUpdateOption={updateOption}
          onAddOption={addOption}
          onRemoveOption={removeOption}
          onCorrectIdChange={setCorrectId}
          onNotesChange={setNotes}
        />

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button disabled={!canSave} onClick={handleSave}>
            Save question
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
