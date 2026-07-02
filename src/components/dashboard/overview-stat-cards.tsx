"use client";

import { StatCard } from "@/components/shared/stat-card";
import { useOverviewStats } from "@/hooks/api/use-overview";

export function OverviewStatCards() {
  const { data, isLoading } = useOverviewStats();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <StatCard
        label="Total Candidates"
        value={data?.total_candidates?.value}
        format="number"
        trend={
          data?.total_candidates?.trend?.change_percent != null
            ? { value: data.total_candidates.trend.change_percent }
            : undefined
        }
        isLoading={isLoading}
      />
      <StatCard
        label="Job Ready Rate"
        value={data?.job_ready_rate?.value}
        format="percent"
        trend={
          data?.job_ready_rate?.trend?.change_percent != null
            ? { value: data.job_ready_rate.trend.change_percent }
            : undefined
        }
        isLoading={isLoading}
      />
      <StatCard
        label="Active Employers"
        value={data?.active_employers?.value}
        format="number"
        trend={
          data?.active_employers?.trend?.change_percent != null
            ? { value: data.active_employers.trend.change_percent }
            : undefined
        }
        isLoading={isLoading}
      />
      <StatCard
        label="Offers Sent This Month"
        value={data?.offers_sent_this_month?.value}
        format="number"
        trend={
          data?.offers_sent_this_month?.trend?.change_percent != null
            ? { value: data.offers_sent_this_month.trend.change_percent }
            : undefined
        }
        isLoading={isLoading}
      />
      <StatCard
        label="Total Revenue"
        value={data?.total_revenue?.value}
        format="currency"
        trend={
          data?.total_revenue?.trend?.change_percent != null
            ? { value: data.total_revenue.trend.change_percent }
            : undefined
        }
        isLoading={isLoading}
      />
    </div>
  );
}
