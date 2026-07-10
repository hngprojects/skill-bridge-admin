"use client";

import type { StatMetric } from "@/types/api/overview";
import { StatCard, type StatCardTrend } from "@/components/shared/stat-card";
import { useEngagementStats } from "@/hooks/api/use-engagement";

function toTrend(metric?: StatMetric): StatCardTrend | undefined {
  if (!metric || metric.trend.change_percent === null) return undefined;
  const magnitude = Math.abs(metric.trend.change_percent);
  return {
    value: metric.trend.direction === "down" ? -magnitude : magnitude,
  };
}

export function EngagementStatCards() {
  const { data, isLoading } = useEngagementStats();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Minor assessment adoption rate"
        value={data?.minor_assessment_adoption_rate.value}
        format="percent"
        trend={toTrend(data?.minor_assessment_adoption_rate)}
        isLoading={isLoading}
      />

      <StatCard
        label="Minor assessment completion rate"
        value={data?.minor_assessment_completion_rate.value}
        format="percent"
        trend={toTrend(data?.minor_assessment_completion_rate)}
        isLoading={isLoading}
      />

      <StatCard
        label="Retake conversion rate"
        value={data?.retake_conversion_rate.value}
        format="percent"
        trend={toTrend(data?.retake_conversion_rate)}
        isLoading={isLoading}
      />

      <StatCard
        label="Avg. time to retake"
        value={
          data?.avg_time_to_retake_after_gate_clears_days.value != null
            ? `${data.avg_time_to_retake_after_gate_clears_days.value} days`
            : undefined
        }
        trend={toTrend(data?.avg_time_to_retake_after_gate_clears_days)}
        isLoading={isLoading}
      />
    </div>
  );
}
