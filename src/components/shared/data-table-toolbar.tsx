"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, SearchIcon } from "@hugeicons/core-free-icons";

import { Badge } from "@/components/ui/badge";
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
import type { FilterConfig } from "./data-table";

type DataTableToolbarProps = {
  searchInput: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  filters: FilterConfig[];
  activeFilters: Record<string, string>;
  onFilterChange: (id: string, value: string) => void;
  onFilterRemove: (id: string) => void;
  onClearAllFilters: () => void;
};

export function DataTableToolbar({
  searchInput,
  onSearchChange,
  searchPlaceholder,
  filters,
  activeFilters,
  onFilterChange,
  onFilterRemove,
  onClearAllFilters,
}: DataTableToolbarProps) {
  const activeChips = Object.entries(activeFilters).filter(([, v]) => v !== "");

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
            placeholder={searchPlaceholder}
            value={searchInput}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </InputGroup>

        {filters.map((filter) => (
          <Select
            key={filter.id}
            value={activeFilters[filter.id] ?? ""}
            onValueChange={(val) => onFilterChange(filter.id, val)}
          >
            <SelectTrigger size="sm" className="w-auto">
              <SelectValue placeholder={filter.label} />
            </SelectTrigger>
            <SelectContent>
              {filter.options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>

      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {activeChips.map(([id, value]) => {
            const filterConfig = filters.find((f) => f.id === id);
            const option = filterConfig?.options.find((o) => o.value === value);
            return (
              <Badge
                key={id}
                variant="outline"
                className="h-6 gap-1 pr-1 text-xs font-normal"
              >
                <span className="text-muted-foreground">
                  {filterConfig?.label}:
                </span>
                <span>{option?.label ?? value}</span>
                <button
                  type="button"
                  onClick={() => onFilterRemove(id)}
                  className="ml-0.5 flex items-center rounded-full p-0.5 hover:bg-muted"
                  aria-label={`Remove ${filterConfig?.label} filter`}
                >
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    strokeWidth={2}
                    className="size-3"
                  />
                </button>
              </Badge>
            );
          })}
          {activeChips.length > 1 && (
            <Button variant="ghost" size="xs" onClick={onClearAllFilters}>
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
