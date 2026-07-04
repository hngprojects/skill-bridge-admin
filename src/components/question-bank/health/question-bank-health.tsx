"use client";

import * as React from "react";

import { useHealthGrid } from "@/hooks/api/use-question-bank";
import type { HealthCell } from "@/types/api/question-bank";
import { HealthFilters } from "./health-filters";
import { HealthTable } from "./health-table";

const PAGE_SIZE = 10;

export function QuestionBankHealth() {
  const { data, isLoading } = useHealthGrid();
  const [assessmentFilter, setAssessmentFilter] = React.useState("all");
  const [trackFilter, setTrackFilter] = React.useState("all");
  const [page, setPage] = React.useState(0);

  const cells = React.useMemo(() => data?.cells ?? [], [data]);

  const assessmentTypes = React.useMemo(
    () => ["all", ...Array.from(new Set(cells.map((c) => c.assessment_type)))],
    [cells],
  );

  const tracks = React.useMemo(
    () => ["all", ...Array.from(new Set(cells.map((c) => c.track))).sort()],
    [cells],
  );

  const filtered = React.useMemo(
    () =>
      cells.filter((c: HealthCell) => {
        if (
          assessmentFilter !== "all" &&
          c.assessment_type !== assessmentFilter
        )
          return false;
        if (trackFilter !== "all" && c.track !== trackFilter) return false;
        return true;
      }),
    [cells, assessmentFilter, trackFilter],
  );

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-3">
      <HealthFilters
        assessmentFilter={assessmentFilter}
        assessmentTypes={assessmentTypes}
        onAssessmentChange={(v) => {
          setAssessmentFilter(v);
          setPage(0);
        }}
        trackFilter={trackFilter}
        tracks={tracks}
        onTrackChange={(v) => {
          setTrackFilter(v);
          setPage(0);
        }}
      />
      <HealthTable
        isLoading={isLoading}
        rows={paged}
        hasRows={filtered.length > 0}
        page={page}
        pageCount={pageCount}
        onPrevPage={() => setPage((p) => p - 1)}
        onNextPage={() => setPage((p) => p + 1)}
      />
    </div>
  );
}
