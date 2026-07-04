"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { SearchIcon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { FilterChip } from "./filter-chip";

const VERIFICATION_OPTIONS = ["Verified", "Unverified"] as const;

type EmployersFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  verification: string;
  onVerificationChange: (value: string) => void;
  region: string;
  onRegionChange: (value: string) => void;
  industry: string;
  onIndustryChange: (value: string) => void;
  onClearAll: () => void;
  total: number;
  isLoading: boolean;
};

export function EmployersFilters({
  search,
  onSearchChange,
  verification,
  onVerificationChange,
  region,
  onRegionChange,
  industry,
  onIndustryChange,
  onClearAll,
  total,
  isLoading,
}: EmployersFiltersProps) {
  const hasActiveFilters = !!search || !!verification || !!region || !!industry;

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
            placeholder="Search by company name…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </InputGroup>

        <Select value={verification} onValueChange={onVerificationChange}>
          <SelectTrigger size="sm" className="w-40">
            <SelectValue placeholder="Verification" />
          </SelectTrigger>
          <SelectContent>
            {VERIFICATION_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          className="h-8 w-40"
          placeholder="Region"
          value={region}
          onChange={(e) => onRegionChange(e.target.value)}
        />

        <Input
          className="h-8 w-40"
          placeholder="Industry"
          value={industry}
          onChange={(e) => onIndustryChange(e.target.value)}
        />
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5">
          {search && (
            <FilterChip
              label={`Search: ${search}`}
              onRemove={() => onSearchChange("")}
            />
          )}
          {verification && (
            <FilterChip
              label={`Verification: ${verification}`}
              onRemove={() => onVerificationChange("")}
            />
          )}
          {region && (
            <FilterChip
              label={`Region: ${region}`}
              onRemove={() => onRegionChange("")}
            />
          )}
          {industry && (
            <FilterChip
              label={`Industry: ${industry}`}
              onRemove={() => onIndustryChange("")}
            />
          )}
          <Button variant="ghost" size="xs" onClick={onClearAll}>
            Clear all
          </Button>
        </div>
      )}

      {!isLoading && (
        <p className="text-sm text-muted-foreground">
          {total} {total === 1 ? "employer" : "employers"}
          {hasActiveFilters ? " match your filters" : " total"}
        </p>
      )}
    </div>
  );
}
