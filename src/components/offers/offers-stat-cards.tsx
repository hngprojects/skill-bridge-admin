"use client";

import { StatCard } from "@/components/shared/stat-card";
import { useOffersStats } from "@/hooks/api/use-offers";
import type { OfferStatMetric } from "@/types/api/offers";

function getTrend(metric?: OfferStatMetric) {
  if (!metric || metric.trend === undefined) {
    return undefined;
  }

  return { value: metric.trend };
}

export function OffersStatCards() {
  const { data, isLoading } = useOffersStats();

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Total Offers Sent"
        value={data?.totalOffersSent.value ?? 0}
        trend={getTrend(data?.totalOffersSent)}
        isLoading={isLoading}
      />

      <StatCard
        label="Offer Acceptance Rate"
        value={data?.offerAcceptanceRate.value ?? 0}
        format="percent"
        trend={getTrend(data?.offerAcceptanceRate)}
        isLoading={isLoading}
      />

      <StatCard
        label="Offer-to-Hire Rate"
        value={data?.offerToHireRate.value ?? 0}
        format="percent"
        trend={getTrend(data?.offerToHireRate)}
        isLoading={isLoading}
      />

      <StatCard
        label="Average Time to Hire"
        value={data?.averageTimeToHire.value ?? "0 days"}
        trend={getTrend(data?.averageTimeToHire)}
        isLoading={isLoading}
      />
    </div>
  );
}
