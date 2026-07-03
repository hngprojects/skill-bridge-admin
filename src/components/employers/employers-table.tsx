"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { useDebounce } from "@/hooks/use-debounce";
import { ServerDataTable } from "@/components/shared/server-data-table";
import { useEmployers } from "@/hooks/api/use-employers";
import type { EmployerListItem } from "@/types/api/employers";
import { employerColumns } from "./columns";
import { EmployerDetailPanel } from "./employer-detail-panel";
import { EmployersFilters } from "./employers-filters";
import { readEmployersParams } from "./search-params";

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

export function EmployersTable() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = React.useMemo(
    () => readEmployersParams((key) => searchParams.get(key) ?? undefined),
    [searchParams],
  );

  const { data, isLoading } = useEmployers(params);
  const employers = data?.items ?? [];
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
  const [regionInput, setRegionInput] = useUrlTextFilter(
    "region",
    params.region ?? "",
    setParams,
  );
  const [industryInput, setIndustryInput] = useUrlTextFilter(
    "industry",
    params.industry ?? "",
    setParams,
  );

  const verification =
    params.is_verified === undefined
      ? ""
      : params.is_verified
        ? "Verified"
        : "Unverified";

  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [panelOpen, setPanelOpen] = React.useState(false);

  function handleVerificationChange(value: string) {
    setParams({
      is_verified:
        value === "Verified" ? "true" : value === "Unverified" ? "false" : null,
      page: null,
    });
  }

  function clearAllFilters() {
    setParams({
      search: null,
      region: null,
      industry: null,
      is_verified: null,
      page: null,
    });
  }

  function handlePageChange(pageIndex: number) {
    const nextPage = pageIndex + 1;
    setParams({ page: nextPage > 1 ? String(nextPage) : null });
  }

  function handleRowClick(employer: EmployerListItem) {
    setSelectedId(employer.id);
    setPanelOpen(true);
  }

  return (
    <div className="flex flex-col gap-4">
      <EmployersFilters
        search={searchInput}
        onSearchChange={setSearchInput}
        verification={verification}
        onVerificationChange={handleVerificationChange}
        region={regionInput}
        onRegionChange={setRegionInput}
        industry={industryInput}
        onIndustryChange={setIndustryInput}
        onClearAll={clearAllFilters}
        total={total}
        isLoading={isLoading}
      />

      <ServerDataTable
        columns={employerColumns}
        data={employers}
        pageIndex={(params.page ?? 1) - 1}
        pageCount={totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoading}
        emptyTitle="No employers found"
        emptyMessage="No employers match your current filters."
        onRowClick={handleRowClick}
      />

      <EmployerDetailPanel
        employerId={selectedId}
        open={panelOpen}
        onOpenChange={setPanelOpen}
      />
    </div>
  );
}
