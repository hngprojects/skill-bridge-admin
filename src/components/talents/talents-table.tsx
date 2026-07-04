"use client";

import { ServerDataTable } from "@/components/shared/server-data-table";
import { useTalentsState } from "@/hooks/use-talents-state";
import { CandidateDetailPanel } from "./candidate-detail-panel";
import { talentColumns } from "./columns";
import { TalentsFilters } from "./talents-filters";

export function TalentsTable() {
  const {
    params,
    talents,
    totalPages,
    total,
    isLoading,
    searchInput,
    setSearchInput,
    trackFilter,
    tierFilter,
    scoreRange,
    dateRange,
    selectedId,
    panelOpen,
    handleTrackChange,
    handleTierChange,
    handleScoreRangeChange,
    handleDateRangeChange,
    clearAllFilters,
    handlePageChange,
    handleRowClick,
    handlePanelOpenChange,
  } = useTalentsState();

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
