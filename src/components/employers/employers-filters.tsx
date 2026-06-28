"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EMPLOYER_INDUSTRIES,
  EMPLOYER_PACKAGE_TIERS,
  EMPLOYER_REGIONS,
} from "@/types/api/employers";
import type { EmployerVerificationStatus } from "@/types/api/employers";
import { ACCOUNT_AGE_BUCKETS } from "./account-age";
import { FilterChip } from "./filter-chip";

const VERIFICATION_OPTIONS: EmployerVerificationStatus[] = [
  "Verified",
  "Pending",
  "Unverified",
];

type EmployersFiltersProps = {
  verificationFilter: string;
  onVerificationChange: (value: string) => void;
  tierFilter: string;
  onTierChange: (value: string) => void;
  accountAgeFilter: string;
  onAccountAgeChange: (value: string) => void;
  regionFilter: string;
  onRegionChange: (value: string) => void;
  industryFilter: string;
  onIndustryChange: (value: string) => void;
  onClearAll: () => void;
  employerCount: number;
  isLoading: boolean;
};

function accountAgeLabel(value: string): string {
  return ACCOUNT_AGE_BUCKETS.find((b) => b.value === value)?.label ?? value;
}

export function EmployersFilters({
  verificationFilter,
  onVerificationChange,
  tierFilter,
  onTierChange,
  accountAgeFilter,
  onAccountAgeChange,
  regionFilter,
  onRegionChange,
  industryFilter,
  onIndustryChange,
  onClearAll,
  employerCount,
  isLoading,
}: EmployersFiltersProps) {
  const hasActiveFilters =
    !!verificationFilter ||
    !!tierFilter ||
    !!accountAgeFilter ||
    !!regionFilter ||
    !!industryFilter;

  return (
    <div className="flex flex-col gap-3">
      {/* Controls row */}
      <div className="flex flex-wrap items-center gap-2">
        <Select value={verificationFilter} onValueChange={onVerificationChange}>
          <SelectTrigger size="sm" className="w-40">
            <SelectValue placeholder="Verification" />
          </SelectTrigger>
          <SelectContent>
            {VERIFICATION_OPTIONS.map((v) => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={tierFilter} onValueChange={onTierChange}>
          <SelectTrigger size="sm" className="w-36">
            <SelectValue placeholder="Package Tier" />
          </SelectTrigger>
          <SelectContent>
            {EMPLOYER_PACKAGE_TIERS.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={accountAgeFilter} onValueChange={onAccountAgeChange}>
          <SelectTrigger size="sm" className="w-36">
            <SelectValue placeholder="Account Age" />
          </SelectTrigger>
          <SelectContent>
            {ACCOUNT_AGE_BUCKETS.map((b) => (
              <SelectItem key={b.value} value={b.value}>
                {b.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={regionFilter} onValueChange={onRegionChange}>
          <SelectTrigger size="sm" className="w-40">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            {EMPLOYER_REGIONS.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={industryFilter} onValueChange={onIndustryChange}>
          <SelectTrigger size="sm" className="w-36">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            {EMPLOYER_INDUSTRIES.map((i) => (
              <SelectItem key={i} value={i}>
                {i}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5">
          {verificationFilter && (
            <FilterChip
              label={`Verification: ${verificationFilter}`}
              onRemove={() => onVerificationChange("")}
            />
          )}
          {tierFilter && (
            <FilterChip
              label={`Tier: ${tierFilter}`}
              onRemove={() => onTierChange("")}
            />
          )}
          {accountAgeFilter && (
            <FilterChip
              label={`Age: ${accountAgeLabel(accountAgeFilter)}`}
              onRemove={() => onAccountAgeChange("")}
            />
          )}
          {regionFilter && (
            <FilterChip
              label={`Region: ${regionFilter}`}
              onRemove={() => onRegionChange("")}
            />
          )}
          {industryFilter && (
            <FilterChip
              label={`Industry: ${industryFilter}`}
              onRemove={() => onIndustryChange("")}
            />
          )}
          <Button variant="ghost" size="xs" onClick={onClearAll}>
            Clear all
          </Button>
        </div>
      )}

      {/* Employer count */}
      {!isLoading && (
        <p className="text-sm text-muted-foreground">
          {employerCount} {employerCount === 1 ? "employer" : "employers"}
          {hasActiveFilters ? " match your filters" : " total"}
        </p>
      )}
    </div>
  );
}
