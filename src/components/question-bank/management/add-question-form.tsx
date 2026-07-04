import { Button } from "@/components/ui/button";
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
import { TALENT_TRACKS } from "@/types/api/talents";
const STAGES = ["Stage 1", "Stage 2", "Stage 3"] as const;
const LEVELS = ["Junior", "Mid", "Senior"] as const;

type AnswerOption = { id: string; text: string };

export type AddQuestionFormProps = {
  track: string;
  stage: string;
  level: string;
  questionText: string;
  options: AnswerOption[];
  correctId: string;
  notes: string;
  filledOptions: AnswerOption[];
  onTrackChange: (v: string) => void;
  onStageChange: (v: string) => void;
  onLevelChange: (v: string) => void;
  onQuestionTextChange: (v: string) => void;
  onUpdateOption: (id: string, text: string) => void;
  onAddOption: () => void;
  onRemoveOption: (id: string) => void;
  onCorrectIdChange: (v: string) => void;
  onNotesChange: (v: string) => void;
};

export function AddQuestionForm({
  track,
  stage,
  level,
  questionText,
  options,
  correctId,
  notes,
  filledOptions,
  onTrackChange,
  onStageChange,
  onLevelChange,
  onQuestionTextChange,
  onUpdateOption,
  onAddOption,
  onRemoveOption,
  onCorrectIdChange,
  onNotesChange,
}: AddQuestionFormProps) {
  return (
    <div className="flex flex-col gap-5 py-2">
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label>Track</Label>
          <Select value={track} onValueChange={onTrackChange}>
            <SelectTrigger>
              <SelectValue placeholder="Track" />
            </SelectTrigger>
            <SelectContent>
              {TALENT_TRACKS.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Stage</Label>
          <Select value={stage} onValueChange={onStageChange}>
            <SelectTrigger>
              <SelectValue placeholder="Stage" />
            </SelectTrigger>
            <SelectContent>
              {STAGES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Level</Label>
          <Select value={level} onValueChange={onLevelChange}>
            <SelectTrigger>
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              {LEVELS.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
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

      <div className="flex flex-col gap-2">
        <Label>Answer options</Label>
        {options.map((opt, i) => (
          <div key={opt.id} className="flex items-center gap-2">
            <Input
              value={opt.text}
              onChange={(e) => onUpdateOption(opt.id, e.target.value)}
              placeholder={`Option ${i + 1}`}
            />
            {options.length > 2 && (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => onRemoveOption(opt.id)}
                aria-label="Remove option"
              >
                ×
              </Button>
            )}
          </div>
        ))}
        {options.length < 6 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="self-start"
            onClick={onAddOption}
          >
            + Add option
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Correct answer</Label>
        <Select value={correctId} onValueChange={onCorrectIdChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select the correct option" />
          </SelectTrigger>
          <SelectContent>
            {filledOptions.map((o) => (
              <SelectItem key={o.id} value={o.id}>
                {o.text}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>
          Notes{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Any additional context for reviewers…"
          rows={2}
        />
      </div>
    </div>
  );
}
