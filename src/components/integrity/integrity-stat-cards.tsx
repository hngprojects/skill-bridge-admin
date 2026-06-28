"use client";

import { StatCard } from "@/components/shared/stat-card";
import { useIntegrityStats } from "@/hooks/api/use-integrity";

export function IntegrityStatCards() {
  const { data, isLoading } = useIntegrityStats();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard
        label="Total Violations"
        value={data?.totalViolations}
        format="number"
        isLoading={isLoading}
      />
      <StatCard
        label="Voided Attempts"
        value={data?.voidedAttempts}
        format="number"
        isLoading={isLoading}
      />
      <StatCard
        label="Stage 3 Sessions With a Violation"
        value={data?.stage3ViolationRate}
        format="percent"
        isLoading={isLoading}
      />
    </div>
  );
}
