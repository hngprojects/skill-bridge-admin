"use client";

import { Input } from "@/components/ui/input";
import type { ScoreRange } from "./talents-filters";

type ScoreRangeInputProps = {
  value: ScoreRange;
  onChange: (range: ScoreRange) => void;
};

export function ScoreRangeInput({ value, onChange }: ScoreRangeInputProps) {
  return (
    <div className="flex items-center gap-1.5">
      <Input
        type="number"
        placeholder="Min score"
        min={0}
        max={100}
        value={value.min}
        onChange={(e) => onChange({ ...value, min: e.target.value })}
        className="h-8 w-24 rounded-full text-sm"
      />
      <span className="text-xs text-muted-foreground">–</span>
      <Input
        type="number"
        placeholder="Max score"
        min={0}
        max={100}
        value={value.max}
        onChange={(e) => onChange({ ...value, max: e.target.value })}
        className="h-8 w-24 rounded-full text-sm"
      />
    </div>
  );
}
