"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TALENT_TRACKS } from "@/types/api/talents";
import type { ConfidenceLevel } from "@/types/api/talents";
import { DateRangeInput } from "./date-range-input";
import { FilterChip } from "./filter-chip";

export type DateRange = { from: string; to: string };

const CONFIDENCE_OPTIONS: ConfidenceLevel[] = ["High", "Medium", "Low"];

type IntegrityFiltersProps = {
  confidenceFilter: string;
  onConfidenceChange: (value: string) => void;
  trackFilter: string;
  onTrackChange: (value: string) => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  onClearAll: () => void;
  attemptCount: number;
  isLoading: boolean;
};

export function IntegrityFilters({
  confidenceFilter,
  onConfidenceChange,
  trackFilter,
  onTrackChange,
  dateRange,
  onDateRangeChange,
  onClearAll,
  attemptCount,
  isLoading,
}: IntegrityFiltersProps) {
  const hasDateFilter = dateRange.from !== "" || dateRange.to !== "";
  const hasActiveFilters = !!confidenceFilter || !!trackFilter || hasDateFilter;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Select value={confidenceFilter} onValueChange={onConfidenceChange}>
          <SelectTrigger size="sm" className="w-40">
            <SelectValue placeholder="Confidence" />
          </SelectTrigger>
          <SelectContent>
            {CONFIDENCE_OPTIONS.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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

        <DateRangeInput value={dateRange} onChange={onDateRangeChange} />
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5">
          {confidenceFilter && (
            <FilterChip
              label={`Confidence: ${confidenceFilter}`}
              onRemove={() => onConfidenceChange("")}
            />
          )}
          {trackFilter && (
            <FilterChip
              label={`Track: ${trackFilter}`}
              onRemove={() => onTrackChange("")}
            />
          )}
          {hasDateFilter && (
            <FilterChip
              label={`Session: ${dateRange.from || "start"} – ${dateRange.to || "end"}`}
              onRemove={() => onDateRangeChange({ from: "", to: "" })}
            />
          )}
          <Button variant="ghost" size="xs" onClick={onClearAll}>
            Clear all
          </Button>
        </div>
      )}

      {!isLoading && (
        <p className="text-sm text-muted-foreground">
          {attemptCount}{" "}
          {attemptCount === 1 ? "voided attempt" : "voided attempts"}
          {hasActiveFilters ? " match your filters" : " this period"}
        </p>
      )}
    </div>
  );
}
