import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
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
import type { TalentTrack } from "@/types/api/talents";

const STAGES = ["Stage 1", "Stage 2", "Stage 3"] as const;
const LEVELS = ["Junior", "Mid", "Senior"] as const;

type GenerateConfigStepProps = {
  track: TalentTrack | "";
  stage: string;
  level: string;
  count: string;
  promptHint: string;
  canGenerate: boolean;
  onTrackChange: (v: TalentTrack) => void;
  onStageChange: (v: string) => void;
  onLevelChange: (v: string) => void;
  onCountChange: (v: string) => void;
  onPromptHintChange: (v: string) => void;
  onGenerate: () => void;
  onClose: () => void;
};

export function GenerateConfigStep({
  track,
  stage,
  level,
  count,
  promptHint,
  canGenerate,
  onTrackChange,
  onStageChange,
  onLevelChange,
  onCountChange,
  onPromptHintChange,
  onGenerate,
  onClose,
}: GenerateConfigStepProps) {
  return (
    <>
      <div className="flex flex-col gap-5 py-2">
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label>Track</Label>
            <Select
              value={track}
              onValueChange={(v) => onTrackChange(v as TalentTrack)}
            >
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
          <Label>Number of questions (1–20)</Label>
          <Input
            type="number"
            min={1}
            max={20}
            value={count}
            onChange={(e) => onCountChange(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>
            Prompt hint{" "}
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
          </Label>
          <Textarea
            value={promptHint}
            onChange={(e) => onPromptHintChange(e.target.value)}
            placeholder="E.g. Focus on async patterns and error handling…"
            rows={3}
          />
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={!canGenerate} onClick={onGenerate}>
          Generate
        </Button>
      </DialogFooter>
    </>
  );
}
