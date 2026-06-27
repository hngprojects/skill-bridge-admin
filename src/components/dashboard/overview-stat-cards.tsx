"use client";

import { StatCard } from "@/components/shared/stat-card";
import { useOverviewStats } from "@/hooks/api/use-overview";

export function OverviewStatCards() {
  const { data, isLoading } = useOverviewStats();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <StatCard
        label="Total Candidates"
        value={data?.totalCandidates.value}
        format="number"
        trend={data ? { value: data.totalCandidates.trend } : undefined}
        isLoading={isLoading}
      />
      <StatCard
        label="Job Ready Rate"
        value={data?.jobReadyRate.value}
        format="percent"
        trend={data ? { value: data.jobReadyRate.trend } : undefined}
        isLoading={isLoading}
      />
      <StatCard
        label="Active Employers"
        value={data?.activeEmployers.value}
        format="number"
        trend={data ? { value: data.activeEmployers.trend } : undefined}
        isLoading={isLoading}
      />
      <StatCard
        label="Offers Sent This Month"
        value={data?.offersSentThisMonth.value}
        format="number"
        trend={data ? { value: data.offersSentThisMonth.trend } : undefined}
        isLoading={isLoading}
      />
      <StatCard
        label="Total Revenue"
        value={data?.totalRevenue.value}
        format="currency"
        trend={data ? { value: data.totalRevenue.trend } : undefined}
        isLoading={isLoading}
      />
    </div>
  );
}
