"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TALENT_TRACKS, TRACK_LABELS } from "@/types/api/talents";
import type { TierFilterParam } from "@/types/api/talents";
import { DateRangeInput } from "./date-range-input";
import { ScoreRangeInput } from "./score-range-input";
import { ActiveFilterChips } from "./active-filter-chips";

export type ScoreRange = { min: string; max: string };
export type DateRange = { from: string; to: string };

const TIER_OPTIONS: { value: TierFilterParam; label: string }[] = [
  { value: "not_ready", label: "Rejected" },
  { value: "emerging", label: "Emerging" },
  { value: "job_ready", label: "Job Ready" },
];

type TalentsFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  trackFilter: string;
  onTrackChange: (value: string) => void;
  tierFilter: string;
  onTierChange: (value: string) => void;
  scoreRange: ScoreRange;
  onScoreRangeChange: (range: ScoreRange) => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  onClearAll: () => void;
  candidateCount: number;
  isLoading: boolean;
};

export function TalentsFilters({
  search,
  onSearchChange,
  trackFilter,
  onTrackChange,
  tierFilter,
  onTierChange,
  scoreRange,
  onScoreRangeChange,
  dateRange,
  onDateRangeChange,
  onClearAll,
  candidateCount,
  isLoading,
}: TalentsFiltersProps) {
  const hasActiveFilters =
    !!search ||
    !!trackFilter ||
    !!tierFilter ||
    scoreRange.min !== "" ||
    scoreRange.max !== "" ||
    dateRange.from !== "" ||
    dateRange.to !== "";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Input
          className="h-8 w-56 text-sm"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <Select value={trackFilter} onValueChange={onTrackChange}>
          <SelectTrigger size="sm" className="w-40">
            <SelectValue placeholder="Track" />
          </SelectTrigger>
          <SelectContent>
            {TALENT_TRACKS.map((t) => (
              <SelectItem key={t} value={t}>
                {TRACK_LABELS[t]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={tierFilter} onValueChange={onTierChange}>
          <SelectTrigger size="sm" className="w-36">
            <SelectValue placeholder="Tier" />
          </SelectTrigger>
          <SelectContent>
            {TIER_OPTIONS.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <ScoreRangeInput value={scoreRange} onChange={onScoreRangeChange} />
        <DateRangeInput value={dateRange} onChange={onDateRangeChange} />
      </div>

      <ActiveFilterChips
        search={search}
        trackFilter={trackFilter}
        tierFilter={tierFilter}
        scoreRange={scoreRange}
        dateRange={dateRange}
        onSearchChange={onSearchChange}
        onTrackChange={onTrackChange}
        onTierChange={onTierChange}
        onScoreRangeChange={onScoreRangeChange}
        onDateRangeChange={onDateRangeChange}
        onClearAll={onClearAll}
      />

      {!isLoading && (
        <p className="text-sm text-muted-foreground">
          {candidateCount} {candidateCount === 1 ? "candidate" : "candidates"}
          {hasActiveFilters ? " match your filters" : " total"}
        </p>
      )}
    </div>
  );
}
