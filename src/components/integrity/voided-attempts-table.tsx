"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import { useDebounce } from "@/hooks/use-debounce";
import { ServerDataTable } from "@/components/shared/server-data-table";
import { useVoidedAttempts } from "@/hooks/api/use-integrity";
import { voidedAttemptColumns } from "./columns";
import { IntegrityFilters } from "./integrity-filters";
import type { DateRange } from "./integrity-filters";
import { readVoidedAttemptsParams } from "./search-params";

type SetParams = (updates: Record<string, string | null>) => void;

function useUrlTextFilter(
  key: string,
  urlValue: string,
  setParams: SetParams,
): [string, (value: string) => void] {
  const [value, setValue] = React.useState(urlValue);
  const [prevUrlValue, setPrevUrlValue] = React.useState(urlValue);

  if (urlValue !== prevUrlValue) {
    setPrevUrlValue(urlValue);
    setValue(urlValue);
  }

  const debounced = useDebounce(value, 300);

  React.useEffect(() => {
    if (debounced !== urlValue) {
      setParams({ [key]: debounced || null, page: null });
    }
  }, [debounced, urlValue, key, setParams]);

  return [value, setValue];
}

export function VoidedAttemptsTable() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = React.useMemo(
    () => readVoidedAttemptsParams((key) => searchParams.get(key) ?? undefined),
    [searchParams],
  );

  const { data, isLoading } = useVoidedAttempts(params);
  const attempts = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages =
    total > 0 ? Math.ceil(total / (params.limit ?? DEFAULT_PAGE_SIZE)) : 0;

  const setParams = React.useCallback<SetParams>(
    (updates) => {
      const next = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") next.delete(key);
        else next.set(key, value);
      }
      const query = next.toString();
      window.history.replaceState(
        null,
        "",
        query ? `${pathname}?${query}` : pathname,
      );
    },
    [pathname, searchParams],
  );

  const [searchInput, setSearchInput] = useUrlTextFilter(
    "search",
    params.search ?? "",
    setParams,
  );

  const assessmentType = params.assessment_type ?? "";
  const dateRange: DateRange = {
    from: params.date_from ?? "",
    to: params.date_to ?? "",
  };

  function handleAssessmentTypeChange(value: string) {
    setParams({ assessment_type: value || null, page: null });
  }

  function handleDateRangeChange(range: DateRange) {
    setParams({
      date_from: range.from || null,
      date_to: range.to || null,
      page: null,
    });
  }

  function clearAllFilters() {
    setParams({
      search: null,
      assessment_type: null,
      date_from: null,
      date_to: null,
      page: null,
    });
  }

  function handlePageChange(pageIndex: number) {
    const nextPage = pageIndex + 1;
    setParams({ page: nextPage > 1 ? String(nextPage) : null });
  }

  return (
    <div className="flex flex-col gap-4">
      <IntegrityFilters
        search={searchInput}
        onSearchChange={setSearchInput}
        assessmentType={assessmentType}
        onAssessmentTypeChange={handleAssessmentTypeChange}
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        onClearAll={clearAllFilters}
        total={total}
        isLoading={isLoading}
      />

      <ServerDataTable
        columns={voidedAttemptColumns}
        data={attempts}
        pageIndex={(params.page ?? 1) - 1}
        pageCount={totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoading}
        emptyTitle="No voided attempts"
        emptyMessage="No voided attempts match your current filters."
      />
    </div>
  );
}
