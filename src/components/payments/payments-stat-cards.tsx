"use client";

import { StatCard } from "@/components/shared/stat-card";
import { usePaymentsStats } from "@/hooks/api/use-payments";

export function PaymentsStatCards() {
  const { data: stats, isLoading } = usePaymentsStats();

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatCard
        label="Total Revenue"
        value={stats?.totalRevenue.value}
        format="currency"
        trend={
          stats?.totalRevenue.trend !== undefined
            ? { value: stats.totalRevenue.trend }
            : undefined
        }
        isLoading={isLoading}
      />
      <StatCard
        label="Active Employer Subscriptions"
        value={stats?.activeEmployerSubscriptions.value}
        format="number"
        trend={
          stats?.activeEmployerSubscriptions.trend !== undefined
            ? { value: stats.activeEmployerSubscriptions.trend }
            : undefined
        }
        isLoading={isLoading}
      />
      <StatCard
        label="Active Talent Subscriptions"
        value={stats?.activeTalentSubscriptions.value}
        format="number"
        trend={
          stats?.activeTalentSubscriptions.trend !== undefined
            ? { value: stats.activeTalentSubscriptions.trend }
            : undefined
        }
        isLoading={isLoading}
      />
      <StatCard
        label="Failed / Declined Payments"
        value={stats?.failedPayments.value}
        format="number"
        trend={
          stats?.failedPayments.trend !== undefined
            ? { value: stats.failedPayments.trend }
            : undefined
        }
        isLoading={isLoading}
      />
    </div>
  );
}
