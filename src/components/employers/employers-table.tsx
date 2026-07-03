"use client";

import * as React from "react";

import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import { useDebounce } from "@/hooks/use-debounce";
import { ServerDataTable } from "@/components/shared/server-data-table";
import { useEmployers } from "@/hooks/api/use-employers";
import type {
  EmployerListItem,
  EmployersQueryParams,
} from "@/types/api/employers";
import { employerColumns } from "./columns";
import { EmployerDetailPanel } from "./employer-detail-panel";
import { EmployersFilters } from "./employers-filters";

export function EmployersTable() {
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [verification, setVerification] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [industry, setIndustry] = React.useState("");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [panelOpen, setPanelOpen] = React.useState(false);

  const debouncedSearch = useDebounce(search, 300);
  const debouncedRegion = useDebounce(region, 300);
  const debouncedIndustry = useDebounce(industry, 300);

  const params = React.useMemo<EmployersQueryParams>(() => {
    const next: EmployersQueryParams = { page, limit: DEFAULT_PAGE_SIZE };
    if (debouncedSearch) next.search = debouncedSearch;
    if (verification) next.is_verified = verification === "Verified";
    if (debouncedRegion) next.region = debouncedRegion;
    if (debouncedIndustry) next.industry = debouncedIndustry;
    return next;
  }, [page, debouncedSearch, verification, debouncedRegion, debouncedIndustry]);

  const { data, isLoading } = useEmployers(params);
  const employers = data?.items ?? [];
  const totalPages = data?.totalPages ?? 0;
  const total = data?.total ?? 0;

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleVerificationChange(value: string) {
    setVerification(value);
    setPage(1);
  }

  function handleRegionChange(value: string) {
    setRegion(value);
    setPage(1);
  }

  function handleIndustryChange(value: string) {
    setIndustry(value);
    setPage(1);
  }

  function clearAllFilters() {
    setSearch("");
    setVerification("");
    setRegion("");
    setIndustry("");
    setPage(1);
  }

  function handleRowClick(employer: EmployerListItem) {
    setSelectedId(employer.id);
    setPanelOpen(true);
  }

  return (
    <div className="flex flex-col gap-4">
      <EmployersFilters
        search={search}
        onSearchChange={handleSearchChange}
        verification={verification}
        onVerificationChange={handleVerificationChange}
        region={region}
        onRegionChange={handleRegionChange}
        industry={industry}
        onIndustryChange={handleIndustryChange}
        onClearAll={clearAllFilters}
        total={total}
        isLoading={isLoading}
      />

      <ServerDataTable
        columns={employerColumns}
        data={employers}
        pageIndex={page - 1}
        pageCount={totalPages}
        onPageChange={(pageIndex) => setPage(pageIndex + 1)}
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
