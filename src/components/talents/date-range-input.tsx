"use client";

import * as React from "react";
import { format } from "date-fns";
import type { DateRange as DayPickerRange } from "react-day-picker";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar03Icon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { DateRange } from "./talents-filters";

type DateRangeInputProps = {
  value: DateRange;
  onChange: (range: DateRange) => void;
};

function toPickerRange(value: DateRange): DayPickerRange {
  return {
    from: value.from ? new Date(value.from) : undefined,
    to: value.to ? new Date(value.to) : undefined,
  };
}

function toStringRange(range: DayPickerRange | undefined): DateRange {
  return {
    from: range?.from ? format(range.from, "yyyy-MM-dd") : "",
    to: range?.to ? format(range.to, "yyyy-MM-dd") : "",
  };
}

function formatLabel(value: DateRange): string {
  if (!value.from && !value.to) return "Onboarding date";
  if (value.from && value.to)
    return `${format(new Date(value.from), "MMM d")} – ${format(new Date(value.to), "MMM d, yyyy")}`;
  if (value.from) return `From ${format(new Date(value.from), "MMM d, yyyy")}`;
  return `Until ${format(new Date(value.to), "MMM d, yyyy")}`;
}

export function DateRangeInput({ value, onChange }: DateRangeInputProps) {
  const [open, setOpen] = React.useState(false);
  const hasValue = value.from !== "" || value.to !== "";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 rounded-full font-normal"
          data-active={hasValue || undefined}
        >
          <HugeiconsIcon
            icon={Calendar03Icon}
            strokeWidth={2}
            className="size-3.5"
          />
          {formatLabel(value)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={toPickerRange(value)}
          onSelect={(range) => onChange(toStringRange(range))}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
