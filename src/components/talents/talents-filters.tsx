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
import { TALENT_TRACKS } from "@/types/api/talents";
import type { TalentTier } from "@/types/api/talents";
import { FilterChip } from "./filter-chip";

export type ScoreRange = { min: string; max: string };
export type DateRange = { from: string; to: string };

const TIER_OPTIONS: TalentTier[] = ["Rejected", "Emerging", "Job Ready"];

type TalentsFiltersProps = {
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
  const hasScoreFilter = scoreRange.min !== "" || scoreRange.max !== "";
  const hasDateFilter = dateRange.from !== "" || dateRange.to !== "";
  const hasActiveFilters =
    !!trackFilter || !!tierFilter || hasScoreFilter || hasDateFilter;

  const scoreChipLabel =
    scoreRange.min !== "" && scoreRange.max !== ""
      ? `Score: ${scoreRange.min}–${scoreRange.max}`
      : scoreRange.min !== ""
        ? `Score ≥ ${scoreRange.min}`
        : `Score ≤ ${scoreRange.max}`;

  return (
    <div className="flex flex-col gap-3">
      {/* Controls row */}
      <div className="flex flex-wrap items-center gap-2">
        <Select value={trackFilter} onValueChange={onTrackChange}>
          <SelectTrigger size="sm" className="w-40">
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

        <Select value={tierFilter} onValueChange={onTierChange}>
          <SelectTrigger size="sm" className="w-36">
            <SelectValue placeholder="Tier" />
          </SelectTrigger>
          <SelectContent>
            {TIER_OPTIONS.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Score range */}
        <div className="flex items-center gap-1.5">
          <Input
            type="number"
            placeholder="Min score"
            min={0}
            max={100}
            value={scoreRange.min}
            onChange={(e) =>
              onScoreRangeChange({ ...scoreRange, min: e.target.value })
            }
            className="h-8 w-24 rounded-full text-sm"
          />
          <span className="text-xs text-muted-foreground">–</span>
          <Input
            type="number"
            placeholder="Max score"
            min={0}
            max={100}
            value={scoreRange.max}
            onChange={(e) =>
              onScoreRangeChange({ ...scoreRange, max: e.target.value })
            }
            className="h-8 w-24 rounded-full text-sm"
          />
        </div>

        {/* Date range */}
        <div className="flex items-center gap-1.5">
          <Input
            type="date"
            value={dateRange.from}
            onChange={(e) =>
              onDateRangeChange({ ...dateRange, from: e.target.value })
            }
            className="h-8 w-36 rounded-full text-sm"
          />
          <span className="text-xs text-muted-foreground">–</span>
          <Input
            type="date"
            value={dateRange.to}
            onChange={(e) =>
              onDateRangeChange({ ...dateRange, to: e.target.value })
            }
            className="h-8 w-36 rounded-full text-sm"
          />
        </div>
      </div>

      {/* Active chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5">
          {trackFilter && (
            <FilterChip
              label={`Track: ${trackFilter}`}
              onRemove={() => onTrackChange("")}
            />
          )}
          {tierFilter && (
            <FilterChip
              label={`Tier: ${tierFilter}`}
              onRemove={() => onTierChange("")}
            />
          )}
          {hasScoreFilter && (
            <FilterChip
              label={scoreChipLabel}
              onRemove={() => onScoreRangeChange({ min: "", max: "" })}
            />
          )}
          {hasDateFilter && (
            <FilterChip
              label={`Onboarded: ${dateRange.from || "start"} – ${dateRange.to || "end"}`}
              onRemove={() => onDateRangeChange({ from: "", to: "" })}
            />
          )}
          <Button variant="ghost" size="xs" onClick={onClearAll}>
            Clear all
          </Button>
        </div>
      )}

      {/* Candidate count */}
      {!isLoading && (
        <p className="text-sm text-muted-foreground">
          {candidateCount} {candidateCount === 1 ? "candidate" : "candidates"}
          {hasActiveFilters ? " match your filters" : " total"}
        </p>
      )}
    </div>
  );
}
