"use client";

import { StatCard } from "@/components/shared/stat-card";
import { useEngagementStats } from "@/hooks/api/use-engagement";

export function EngagementStatCards() {
  const { data, isLoading } = useEngagementStats();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Minor assessment adoption rate"
        value={data?.minorAssessmentAdoptionRate.value}
        format="percent"
        trend={
          data ? { value: data.minorAssessmentAdoptionRate.trend } : undefined
        }
        isLoading={isLoading}
      />

      <StatCard
        label="Minor assessment completion rate"
        value={data?.minorAssessmentCompletionRate.value}
        format="percent"
        trend={
          data ? { value: data.minorAssessmentCompletionRate.trend } : undefined
        }
        isLoading={isLoading}
      />

      <StatCard
        label="Retake conversion rate"
        value={data?.retakeConversionRate.value}
        format="percent"
        trend={data ? { value: data.retakeConversionRate.trend } : undefined}
        isLoading={isLoading}
      />

      <StatCard
        label="Avg. time to retake"
        value={data?.averageTimeToRetakeAfterGateClears.value}
        trend={
          data
            ? { value: data.averageTimeToRetakeAfterGateClears.trend }
            : undefined
        }
        isLoading={isLoading}
      />
    </div>
  );
}
