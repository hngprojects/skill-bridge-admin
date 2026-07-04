"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function snakeToTitle(value: string): string {
  return value
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

type HealthFiltersProps = {
  assessmentFilter: string;
  assessmentTypes: string[];
  onAssessmentChange: (v: string) => void;
  trackFilter: string;
  tracks: string[];
  onTrackChange: (v: string) => void;
};

export function HealthFilters({
  assessmentFilter,
  assessmentTypes,
  onAssessmentChange,
  trackFilter,
  tracks,
  onTrackChange,
}: HealthFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select value={assessmentFilter} onValueChange={onAssessmentChange}>
        <SelectTrigger size="sm" className="w-40">
          <SelectValue placeholder="Assessment type" />
        </SelectTrigger>
        <SelectContent>
          {assessmentTypes.map((t) => (
            <SelectItem key={t} value={t}>
              {t === "all" ? "All types" : snakeToTitle(t)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={trackFilter} onValueChange={onTrackChange}>
        <SelectTrigger size="sm" className="w-44">
          <SelectValue placeholder="Track" />
        </SelectTrigger>
        <SelectContent>
          {tracks.map((t) => (
            <SelectItem key={t} value={t}>
              {t === "all" ? "All tracks" : snakeToTitle(t)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
