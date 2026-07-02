"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { DataTable } from "@/components/shared/data-table";
import { ROUTES } from "@/constants/admin-routes";
import { useVoidedAttempts } from "@/hooks/api/use-integrity";
import type { VoidedAttempt } from "@/types/api/integrity";
import { voidedAttemptColumns } from "./columns";
import { IntegrityFilters } from "./integrity-filters";
import type { DateRange } from "./integrity-filters";

export function VoidedAttemptsTable() {
  const router = useRouter();
  const [confidenceFilter, setConfidenceFilter] = React.useState("");
  const [trackFilter, setTrackFilter] = React.useState("");
  const [dateRange, setDateRange] = React.useState<DateRange>({
    from: "",
    to: "",
  });

  const { data: attempts = [], isLoading } = useVoidedAttempts();

  const filtered = React.useMemo(() => {
    return attempts.filter((attempt) => {
      if (confidenceFilter && attempt.confidenceLevel !== confidenceFilter)
        return false;
      if (trackFilter && attempt.track !== trackFilter) return false;
      if (dateRange.from && attempt.sessionDate < dateRange.from) return false;
      if (dateRange.to && attempt.sessionDate > dateRange.to) return false;
      return true;
    });
  }, [attempts, confidenceFilter, trackFilter, dateRange]);

  function clearAllFilters() {
    setConfidenceFilter("");
    setTrackFilter("");
    setDateRange({ from: "", to: "" });
  }

  function handleRowClick(attempt: VoidedAttempt) {
    router.push(`${ROUTES.talents}?talent=${attempt.candidateId}`);
  }

  return (
    <div className="flex flex-col gap-4">
      <IntegrityFilters
        confidenceFilter={confidenceFilter}
        onConfidenceChange={setConfidenceFilter}
        trackFilter={trackFilter}
        onTrackChange={setTrackFilter}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onClearAll={clearAllFilters}
        attemptCount={filtered.length}
        isLoading={isLoading}
      />

      <DataTable
        columns={voidedAttemptColumns}
        data={filtered}
        isLoading={isLoading}
        emptyTitle="No voided attempts"
        emptyMessage="No voided attempts in this period."
        onRowClick={handleRowClick}
        searchPlaceholder="Search by candidate name…"
      />
    </div>
  );
}
