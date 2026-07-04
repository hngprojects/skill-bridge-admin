"use client";

import { StatCard } from "@/components/shared/stat-card";
import { useIntegrityStats } from "@/hooks/api/use-integrity";

export function IntegrityStatCards() {
  const { data, isLoading } = useIntegrityStats();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Flagged Attempts"
        value={data?.flagged_attempts?.value}
        format="number"
        trend={
          data?.flagged_attempts?.trend?.change_percent != null
            ? { value: data.flagged_attempts.trend.change_percent }
            : undefined
        }
        isLoading={isLoading}
      />
      <StatCard
        label="Voided Attempts"
        value={data?.voided_attempts?.value}
        format="number"
        trend={
          data?.voided_attempts?.trend?.change_percent != null
            ? { value: data.voided_attempts.trend.change_percent }
            : undefined
        }
        isLoading={isLoading}
      />
      <StatCard
        label="High-Confidence Flags"
        value={data?.high_confidence_flags?.value}
        format="number"
        trend={
          data?.high_confidence_flags?.trend?.change_percent != null
            ? { value: data.high_confidence_flags.trend.change_percent }
            : undefined
        }
        isLoading={isLoading}
      />
      <StatCard
        label="Violation Rate"
        value={data?.violation_rate_percent?.value}
        format="percent"
        trend={
          data?.violation_rate_percent?.trend?.change_percent != null
            ? { value: data.violation_rate_percent.trend.change_percent }
            : undefined
        }
        isLoading={isLoading}
      />
    </div>
  );
}
