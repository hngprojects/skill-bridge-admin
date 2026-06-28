"use client";

import * as React from "react";

import { DataTable } from "@/components/shared/data-table";
import { useEmployers } from "@/hooks/api/use-employers";
import type { EmployerListItem } from "@/types/api/employers";
import { getAccountAgeBucket } from "./account-age";
import { employerColumns } from "./columns";
import { EmployerDetailPanel } from "./employer-detail-panel";
import { EmployersFilters } from "./employers-filters";

export function EmployersTable() {
  const [verificationFilter, setVerificationFilter] = React.useState("");
  const [tierFilter, setTierFilter] = React.useState("");
  const [accountAgeFilter, setAccountAgeFilter] = React.useState("");
  const [regionFilter, setRegionFilter] = React.useState("");
  const [industryFilter, setIndustryFilter] = React.useState("");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [panelOpen, setPanelOpen] = React.useState(false);

  const { data: employers = [], isLoading } = useEmployers();

  const filtered = React.useMemo(() => {
    return employers.filter((employer) => {
      if (
        verificationFilter &&
        employer.verificationStatus !== verificationFilter
      )
        return false;
      if (tierFilter && employer.packageTier !== tierFilter) return false;
      if (
        accountAgeFilter &&
        getAccountAgeBucket(employer.signupDate) !== accountAgeFilter
      )
        return false;
      if (regionFilter && employer.region !== regionFilter) return false;
      if (industryFilter && employer.industry !== industryFilter) return false;
      return true;
    });
  }, [
    employers,
    verificationFilter,
    tierFilter,
    accountAgeFilter,
    regionFilter,
    industryFilter,
  ]);

  function handleRowClick(employer: EmployerListItem) {
    setSelectedId(employer.id);
    setPanelOpen(true);
  }

  function clearAllFilters() {
    setVerificationFilter("");
    setTierFilter("");
    setAccountAgeFilter("");
    setRegionFilter("");
    setIndustryFilter("");
  }

  return (
    <div className="flex flex-col gap-4">
      <EmployersFilters
        verificationFilter={verificationFilter}
        onVerificationChange={setVerificationFilter}
        tierFilter={tierFilter}
        onTierChange={setTierFilter}
        accountAgeFilter={accountAgeFilter}
        onAccountAgeChange={setAccountAgeFilter}
        regionFilter={regionFilter}
        onRegionChange={setRegionFilter}
        industryFilter={industryFilter}
        onIndustryChange={setIndustryFilter}
        onClearAll={clearAllFilters}
        employerCount={filtered.length}
        isLoading={isLoading}
      />

      <DataTable
        columns={employerColumns}
        data={filtered}
        isLoading={isLoading}
        emptyTitle="No employers found"
        emptyMessage="No employers match your current filters."
        onRowClick={handleRowClick}
        searchPlaceholder="Search by company name…"
      />

      <EmployerDetailPanel
        employerId={selectedId}
        open={panelOpen}
        onOpenChange={setPanelOpen}
      />
    </div>
  );
}
