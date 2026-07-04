import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  QB_TRACKS,
  ASSESSMENT_TYPES,
  QUESTION_TYPES,
  LEVELS,
  SLOT_TYPES,
  snakeToTitle,
} from "./add-question-constants";
import type { AddQuestionFormProps } from "./add-question-constants";
import { McqOptionsEditor } from "./mcq-options-editor";

export type { AddQuestionFormProps };

export function AddQuestionForm({
  assessmentType,
  questionType,
  track,
  verifiedLevel,
  questionText,
  options,
  correctId,
  competency,
  slotType,
  filledOptions,
  onAssessmentTypeChange,
  onQuestionTypeChange,
  onTrackChange,
  onVerifiedLevelChange,
  onQuestionTextChange,
  onUpdateOption,
  onAddOption,
  onRemoveOption,
  onCorrectIdChange,
  onCompetencyChange,
  onSlotTypeChange,
}: AddQuestionFormProps) {
  const isMcq = questionType === "single_pick" || questionType === "multi_pick";

  return (
    <div className="flex flex-col gap-5 py-2">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label>Assessment type</Label>
          <Select value={assessmentType} onValueChange={onAssessmentTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent>
              {ASSESSMENT_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Question type</Label>
          <Select value={questionType} onValueChange={onQuestionTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent>
              {QUESTION_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label>Track</Label>
          <Select value={track} onValueChange={onTrackChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent>
              {QB_TRACKS.map((t) => (
                <SelectItem key={t} value={t}>
                  {snakeToTitle(t)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Level</Label>
          <Select value={verifiedLevel} onValueChange={onVerifiedLevelChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent>
              {LEVELS.map((l) => (
                <SelectItem key={l.value} value={l.value}>
                  {l.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Question text</Label>
        <Textarea
          value={questionText}
          onChange={(e) => onQuestionTextChange(e.target.value)}
          placeholder="Enter the question…"
          rows={3}
        />
      </div>

      {isMcq && (
        <McqOptionsEditor
          questionType={questionType}
          options={options}
          correctId={correctId}
          filledOptions={filledOptions}
          onUpdateOption={onUpdateOption}
          onAddOption={onAddOption}
          onRemoveOption={onRemoveOption}
          onCorrectIdChange={onCorrectIdChange}
        />
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label>
            Competency{" "}
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
          </Label>
          <Input
            value={competency}
            onChange={(e) => onCompetencyChange(e.target.value)}
            placeholder="e.g. api_design"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>
            Slot type{" "}
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
          </Label>
          <Select value={slotType} onValueChange={onSlotTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent>
              {SLOT_TYPES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
