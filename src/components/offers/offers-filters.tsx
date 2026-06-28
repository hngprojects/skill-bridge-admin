"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangeInput } from "@/components/shared/date-range-input";
import type { DateRangeValue } from "@/components/shared/date-range-input";
import { FilterChip } from "@/components/talents/filter-chip";
import { OFFER_STATUSES } from "@/types/api/offers";
import type { OfferStatus } from "@/types/api/offers";

type OffersFiltersProps = {
  statusFilter: string;
  onStatusChange: (value: string) => void;
  dateRange: DateRangeValue;
  onDateRangeChange: (range: DateRangeValue) => void;
  onClearAll: () => void;
  offerCount: number;
  isLoading: boolean;
};

export function OffersFilters({
  statusFilter,
  onStatusChange,
  dateRange,
  onDateRangeChange,
  onClearAll,
  offerCount,
  isLoading,
}: OffersFiltersProps) {
  const hasDateFilter = dateRange.from !== "" || dateRange.to !== "";
  const hasActiveFilters = !!statusFilter || hasDateFilter;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger size="sm" className="w-52">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {OFFER_STATUSES.map((status: OfferStatus) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DateRangeInput
          value={dateRange}
          onChange={onDateRangeChange}
          placeholder="Date sent"
        />
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5">
          {statusFilter && (
            <FilterChip
              label={`Status: ${statusFilter}`}
              onRemove={() => onStatusChange("")}
            />
          )}

          {hasDateFilter && (
            <FilterChip
              label={`Date sent: ${dateRange.from || "start"} – ${
                dateRange.to || "end"
              }`}
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
          {offerCount} {offerCount === 1 ? "offer" : "offers"}
          {hasActiveFilters ? " match your filters" : " total"}
        </p>
      )}
    </div>
  );
}
