"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { SearchIcon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangeInput } from "./date-range-input";
import { FilterChip } from "./filter-chip";

export type DateRange = { from: string; to: string };

const ASSESSMENT_TYPE_OPTIONS = [
  { value: "skill", label: "Skill" },
  { value: "advanced", label: "Advanced" },
] as const;

type IntegrityFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  assessmentType: string;
  onAssessmentTypeChange: (value: string) => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  onClearAll: () => void;
  total: number;
  isLoading: boolean;
};

function assessmentTypeLabel(value: string): string {
  return (
    ASSESSMENT_TYPE_OPTIONS.find((option) => option.value === value)?.label ??
    value
  );
}

export function IntegrityFilters({
  search,
  onSearchChange,
  assessmentType,
  onAssessmentTypeChange,
  dateRange,
  onDateRangeChange,
  onClearAll,
  total,
  isLoading,
}: IntegrityFiltersProps) {
  const hasDateFilter = dateRange.from !== "" || dateRange.to !== "";
  const hasActiveFilters = !!search || !!assessmentType || hasDateFilter;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <InputGroup className="w-60">
          <InputGroupAddon align="inline-start">
            <HugeiconsIcon
              icon={SearchIcon}
              strokeWidth={2}
              className="size-4"
            />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search by talent name or email…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </InputGroup>

        <Select value={assessmentType} onValueChange={onAssessmentTypeChange}>
          <SelectTrigger size="sm" className="w-40">
            <SelectValue placeholder="Assessment type" />
          </SelectTrigger>
          <SelectContent>
            {ASSESSMENT_TYPE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DateRangeInput value={dateRange} onChange={onDateRangeChange} />
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5">
          {search && (
            <FilterChip
              label={`Search: ${search}`}
              onRemove={() => onSearchChange("")}
            />
          )}
          {assessmentType && (
            <FilterChip
              label={`Assessment: ${assessmentTypeLabel(assessmentType)}`}
              onRemove={() => onAssessmentTypeChange("")}
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
          {total} {total === 1 ? "voided attempt" : "voided attempts"}
          {hasActiveFilters ? " match your filters" : " total"}
        </p>
      )}
    </div>
  );
}
