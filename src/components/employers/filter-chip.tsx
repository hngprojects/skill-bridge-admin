"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

import { Badge } from "@/components/ui/badge";

type FilterChipProps = {
  label: string;
  onRemove: () => void;
};

export function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <Badge variant="outline" className="h-6 gap-1 pr-1 text-xs font-normal">
      <span>{label}</span>
      <button
        type="button"
        onClick={onRemove}
        className="ml-0.5 flex items-center rounded-full p-0.5 hover:bg-muted"
        aria-label={`Remove ${label} filter`}
      >
        <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="size-3" />
      </button>
    </Badge>
  );
}
