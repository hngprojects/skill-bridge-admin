"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { useDebounce } from "@/hooks/use-debounce";
import { ServerDataTable } from "@/components/shared/server-data-table";
import { useTalents } from "@/hooks/api/use-talents";
import type { TalentListItem } from "@/types/api/talents";
import { CandidateDetailPanel } from "./candidate-detail-panel";
import { talentColumns } from "./columns";
import { readTalentsParams } from "./search-params";
import { TalentsFilters } from "./talents-filters";
import type { DateRange, ScoreRange } from "./talents-filters";

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

export function TalentsTable() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = React.useMemo(
    () => readTalentsParams((key) => searchParams.get(key) ?? undefined),
    [searchParams],
  );

  const { data, isLoading } = useTalents(params);
  const talents = data?.items ?? [];
  const totalPages = data?.totalPages ?? 0;
  const total = data?.total ?? 0;

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

  const trackFilter = params.track ?? "";
  const tierFilter = params.tier ?? "";

  const scoreRange: ScoreRange = {
    min: params.score_min !== undefined ? String(params.score_min) : "",
    max: params.score_max !== undefined ? String(params.score_max) : "",
  };

  const dateRange: DateRange = {
    from: params.date_from ?? "",
    to: params.date_to ?? "",
  };

  // Deep-link: initialize from ?talent=<id> on page load
  const [selectedId, setSelectedId] = React.useState<string | null>(() =>
    searchParams.get("talent"),
  );
  const [panelOpen, setPanelOpen] = React.useState(
    () => searchParams.get("talent") !== null,
  );

  function handleTrackChange(value: string) {
    setParams({ track: value || null, page: null });
  }

  function handleTierChange(value: string) {
    setParams({ tier: value || null, page: null });
  }

  function handleScoreRangeChange(range: ScoreRange) {
    setParams({
      score_min: range.min || null,
      score_max: range.max || null,
      page: null,
    });
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
      track: null,
      tier: null,
      score_min: null,
      score_max: null,
      date_from: null,
      date_to: null,
      page: null,
    });
  }

  function handlePageChange(pageIndex: number) {
    const nextPage = pageIndex + 1;
    setParams({ page: nextPage > 1 ? String(nextPage) : null });
  }

  function handleRowClick(talent: TalentListItem) {
    setSelectedId(talent.id);
    setPanelOpen(true);
    setParams({ talent: talent.id });
  }

  function handlePanelOpenChange(open: boolean) {
    setPanelOpen(open);
    if (!open) setParams({ talent: null });
  }

  return (
    <div className="flex flex-col gap-4">
      <TalentsFilters
        search={searchInput}
        onSearchChange={setSearchInput}
        trackFilter={trackFilter}
        onTrackChange={handleTrackChange}
        tierFilter={tierFilter}
        onTierChange={handleTierChange}
        scoreRange={scoreRange}
        onScoreRangeChange={handleScoreRangeChange}
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        onClearAll={clearAllFilters}
        candidateCount={total}
        isLoading={isLoading}
      />

      <ServerDataTable
        columns={talentColumns}
        data={talents}
        pageIndex={(params.page ?? 1) - 1}
        pageCount={totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoading}
        emptyTitle="No candidates found"
        emptyMessage="No candidates match your current filters."
        onRowClick={handleRowClick}
      />

      <CandidateDetailPanel
        talentId={selectedId}
        open={panelOpen}
        onOpenChange={handlePanelOpenChange}
      />
    </div>
  );
}
