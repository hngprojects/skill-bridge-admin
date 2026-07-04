import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AnswerOption } from "./add-question-constants";

type McqOptionsEditorProps = {
  questionType: string;
  options: AnswerOption[];
  correctId: string;
  filledOptions: AnswerOption[];
  onUpdateOption: (id: string, text: string) => void;
  onAddOption: () => void;
  onRemoveOption: (id: string) => void;
  onCorrectIdChange: (v: string) => void;
};

export function McqOptionsEditor({
  questionType,
  options,
  correctId,
  filledOptions,
  onUpdateOption,
  onAddOption,
  onRemoveOption,
  onCorrectIdChange,
}: McqOptionsEditorProps) {
  return (
    <>
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

      {questionType === "single_pick" && (
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
      )}
    </>
  );
}
