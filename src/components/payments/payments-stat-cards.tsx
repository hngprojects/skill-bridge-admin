"use client";

import { StatCard } from "@/components/shared/stat-card";
import { usePaymentsStats } from "@/hooks/api/use-payments";

export function PaymentsStatCards() {
  const { data, isLoading } = usePaymentsStats();

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatCard
        label="Total Revenue"
        value={data?.total_revenue?.value}
        format="currency"
        isLoading={isLoading}
      />
      <StatCard
        label="Active Employer Subscriptions"
        value={data?.active_employer_subscriptions}
        format="number"
        isLoading={isLoading}
      />
      <StatCard
        label="Active Talent Subscriptions"
        value={data?.active_talent_subscriptions}
        format="number"
        isLoading={isLoading}
      />
      <StatCard
        label="Failed / Declined Payments"
        value={data?.failed_payment_count}
        format="number"
        isLoading={isLoading}
      />
    </div>
  );
}
