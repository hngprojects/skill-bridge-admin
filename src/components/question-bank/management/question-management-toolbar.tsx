"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ASSESSMENT_TYPES = ["skill", "advanced"] as const;
const LEVELS = ["junior", "mid", "senior", "expert"] as const;

function snakeToTitle(value: string): string {
  return value
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

type QuestionManagementToolbarProps = {
  searchInput: string;
  onSearchChange: (v: string) => void;
  assessmentFilter: string;
  onAssessmentChange: (v: string) => void;
  levelFilter: string;
  onLevelChange: (v: string) => void;
  isLoading: boolean;
  total: number;
  isReadOnly: boolean;
  onAddClick: () => void;
  onGenerateClick: () => void;
};

export function QuestionManagementToolbar({
  searchInput,
  onSearchChange,
  assessmentFilter,
  onAssessmentChange,
  levelFilter,
  onLevelChange,
  isLoading,
  total,
  isReadOnly,
  onAddClick,
  onGenerateClick,
}: QuestionManagementToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <Input
          className="h-8 w-56 text-sm"
          placeholder="Search questions…"
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <Select value={assessmentFilter} onValueChange={onAssessmentChange}>
          <SelectTrigger size="sm" className="w-36">
            <SelectValue placeholder="Assessment" />
          </SelectTrigger>
          <SelectContent>
            {ASSESSMENT_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {snakeToTitle(t)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={levelFilter} onValueChange={onLevelChange}>
          <SelectTrigger size="sm" className="w-32">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            {LEVELS.map((l) => (
              <SelectItem key={l} value={l}>
                <span className="capitalize">{l}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {!isLoading && (
          <span className="text-sm text-muted-foreground">
            {total.toLocaleString()} questions
          </span>
        )}
      </div>

      {!isReadOnly && (
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onGenerateClick}>
            Generate with AI
          </Button>
          <Button onClick={onAddClick}>Add Question Manually</Button>
        </div>
      )}
    </div>
  );
}
