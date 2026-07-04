"use client";

import { Button } from "@/components/ui/button";
import { FilterChip } from "./filter-chip";
import type { ScoreRange, DateRange } from "./talents-filters";

const TIER_OPTIONS = [
  { value: "not_ready", label: "Rejected" },
  { value: "emerging", label: "Emerging" },
  { value: "job_ready", label: "Job Ready" },
] as const;

type ActiveFilterChipsProps = {
  search: string;
  trackFilter: string;
  tierFilter: string;
  scoreRange: ScoreRange;
  dateRange: DateRange;
  onSearchChange: (v: string) => void;
  onTrackChange: (v: string) => void;
  onTierChange: (v: string) => void;
  onScoreRangeChange: (r: ScoreRange) => void;
  onDateRangeChange: (r: DateRange) => void;
  onClearAll: () => void;
};

export function ActiveFilterChips({
  search,
  trackFilter,
  tierFilter,
  scoreRange,
  dateRange,
  onSearchChange,
  onTrackChange,
  onTierChange,
  onScoreRangeChange,
  onDateRangeChange,
  onClearAll,
}: ActiveFilterChipsProps) {
  const hasScoreFilter = scoreRange.min !== "" || scoreRange.max !== "";
  const hasDateFilter = dateRange.from !== "" || dateRange.to !== "";
  const hasActiveFilters =
    !!search ||
    !!trackFilter ||
    !!tierFilter ||
    hasScoreFilter ||
    hasDateFilter;

  if (!hasActiveFilters) return null;

  const tierLabel =
    TIER_OPTIONS.find((o) => o.value === tierFilter)?.label ?? tierFilter;

  const scoreChipLabel =
    scoreRange.min !== "" && scoreRange.max !== ""
      ? `Score: ${scoreRange.min}–${scoreRange.max}`
      : scoreRange.min !== ""
        ? `Score ≥ ${scoreRange.min}`
        : `Score ≤ ${scoreRange.max}`;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {search && (
        <FilterChip
          label={`Search: ${search}`}
          onRemove={() => onSearchChange("")}
        />
      )}
      {trackFilter && (
        <FilterChip
          label={`Track: ${trackFilter}`}
          onRemove={() => onTrackChange("")}
        />
      )}
      {tierFilter && (
        <FilterChip
          label={`Tier: ${tierLabel}`}
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
  );
}
