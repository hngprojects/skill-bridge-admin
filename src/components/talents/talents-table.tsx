"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { DataTable } from "@/components/shared/data-table";
import { useTalents } from "@/hooks/api/use-talents";
import type { TalentListItem } from "@/types/api/talents";
import { CandidateDetailPanel } from "./candidate-detail-panel";
import { talentColumns } from "./columns";
import { TalentsFilters } from "./talents-filters";
import type { DateRange, ScoreRange } from "./talents-filters";

export function TalentsTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [trackFilter, setTrackFilter] = React.useState("");
  const [tierFilter, setTierFilter] = React.useState("");
  const [scoreRange, setScoreRange] = React.useState<ScoreRange>({
    min: "",
    max: "",
  });
  const [dateRange, setDateRange] = React.useState<DateRange>({
    from: "",
    to: "",
  });
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [panelOpen, setPanelOpen] = React.useState(false);

  const { data: talents = [], isLoading } = useTalents();

  // Open drawer when ?talent=<id> param is present (e.g. deep-link from voided attempts)
  React.useEffect(() => {
    const id = searchParams.get("talent");
    if (!id) return;
    function syncFromParam() {
      setSelectedId(id);
      setPanelOpen(true);
    }
    syncFromParam();
  }, [searchParams]);

  const filtered = React.useMemo(() => {
    const minScore = scoreRange.min !== "" ? Number(scoreRange.min) : null;
    const maxScore = scoreRange.max !== "" ? Number(scoreRange.max) : null;

    return talents.filter((t) => {
      if (trackFilter && t.track !== trackFilter) return false;
      if (tierFilter && t.tier !== tierFilter) return false;
      if (
        minScore !== null &&
        (t.latestStage3Score === null || t.latestStage3Score < minScore)
      )
        return false;
      if (
        maxScore !== null &&
        (t.latestStage3Score === null || t.latestStage3Score > maxScore)
      )
        return false;
      if (dateRange.from && t.onboardingDate < dateRange.from) return false;
      if (dateRange.to && t.onboardingDate > dateRange.to) return false;
      return true;
    });
  }, [talents, trackFilter, tierFilter, scoreRange, dateRange]);

  function handleRowClick(talent: TalentListItem) {
    setSelectedId(talent.id);
    setPanelOpen(true);
    router.replace(`${pathname}?talent=${talent.id}`);
  }

  function handlePanelOpenChange(open: boolean) {
    setPanelOpen(open);
    if (!open) router.replace(pathname);
  }

  function clearAllFilters() {
    setTrackFilter("");
    setTierFilter("");
    setScoreRange({ min: "", max: "" });
    setDateRange({ from: "", to: "" });
  }

  return (
    <div className="flex flex-col gap-4">
      <TalentsFilters
        trackFilter={trackFilter}
        onTrackChange={setTrackFilter}
        tierFilter={tierFilter}
        onTierChange={setTierFilter}
        scoreRange={scoreRange}
        onScoreRangeChange={setScoreRange}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onClearAll={clearAllFilters}
        candidateCount={filtered.length}
        isLoading={isLoading}
      />

      <DataTable
        columns={talentColumns}
        data={filtered}
        isLoading={isLoading}
        emptyTitle="No candidates found"
        emptyMessage="No candidates match your current filters."
        onRowClick={handleRowClick}
        searchPlaceholder="Search by name or email…"
      />

      <CandidateDetailPanel
        talentId={selectedId}
        open={panelOpen}
        onOpenChange={handlePanelOpenChange}
      />
    </div>
  );
}
