"use client";

import { StatCard } from "@/components/shared/stat-card";
import { useOffersStats } from "@/hooks/api/use-offers";

export function OffersStatCards() {
  const { data, isLoading } = useOffersStats();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Total offers sent"
        value={data?.totalOffersSent.value}
        format="number"
        trend={data ? { value: data.totalOffersSent.trend } : undefined}
        isLoading={isLoading}
      />

      <StatCard
        label="Offer-to-acceptance rate"
        value={data?.offerAcceptanceRate.value}
        format="percent"
        trend={data ? { value: data.offerAcceptanceRate.trend } : undefined}
        isLoading={isLoading}
      />

      <StatCard
        label="Offer-to-hire rate"
        value={data?.offerToHireRate.value}
        format="percent"
        trend={data ? { value: data.offerToHireRate.trend } : undefined}
        isLoading={isLoading}
      />

      <StatCard
        label="Avg. time to hire"
        value={data?.averageTimeToHire.value}
        trend={data ? { value: data.averageTimeToHire.trend } : undefined}
        isLoading={isLoading}
      />
    </div>
  );
}
