"use client";

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUp01Icon, ArrowDown01Icon } from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export type StatCardFormat = "number" | "currency" | "percent";

export type StatCardTrend = {
  /** Positive = improvement, negative = decline */
  value: number;
  /** When true, displays as an absolute count change instead of percentage */
  isAbsolute?: boolean;
};

type StatCardProps = {
  label: string;
  value?: number | string;
  format?: StatCardFormat;
  /** Prepended to currency-formatted values. Defaults to "$". */
  currencySymbol?: string;
  trend?: StatCardTrend;
  /** True only on the initial fetch — background refetches should not set this. */
  isLoading?: boolean;
  className?: string;
};

function formatValue(
  value: number | string,
  format?: StatCardFormat,
  currencySymbol = "$",
): string {
  if (typeof value === "string") return value;
  const formatted = new Intl.NumberFormat().format(value);
  switch (format) {
    case "number":
      return formatted;
    case "currency":
      return `${currencySymbol}${formatted}`;
    case "percent":
      return `${value}%`;
    default:
      return String(value);
  }
}

function formatTrend(trend: StatCardTrend): string {
  const sign = trend.value >= 0 ? "+" : "";
  if (trend.isAbsolute) {
    return `${sign}${new Intl.NumberFormat().format(trend.value)}`;
  }
  return `${sign}${trend.value}%`;
}

/**
 * Auto-refreshes every 60 s when used with React Query.
 * Pass `refetchInterval: 60_000` to the query and use `isLoading` (not
 * `isFetching`) so background refreshes don't trigger the skeleton.
 */
export function StatCard({
  label,
  value,
  format,
  currencySymbol,
  trend,
  isLoading = false,
  className,
}: StatCardProps) {
  const isPositive = (trend?.value ?? 0) >= 0;

  return (
    <Card size="sm" className={className}>
      <CardContent className="flex flex-col gap-2">
        <p className="caption text-muted-foreground">{label}</p>

        {isLoading ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-1/3 rounded-md" />
          </div>
        ) : (
          <>
            <p className="section-h3 font-semibold tracking-tight">
              {value !== undefined
                ? formatValue(value, format, currencySymbol)
                : "—"}
            </p>

            {trend !== undefined && (
              <div
                className={cn(
                  "inline-flex items-center gap-0.5 text-sm font-medium",
                  isPositive ? "text-success" : "text-error",
                )}
              >
                <HugeiconsIcon
                  icon={isPositive ? ArrowUp01Icon : ArrowDown01Icon}
                  strokeWidth={2}
                  className="size-3.5"
                />
                <span>{formatTrend(trend)}</span>
                <span className="ml-0.5 font-normal text-muted-foreground">
                  vs prior period
                </span>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
