"use client";

import { StatCard } from "@/components/shared/stat-card";
import { useTalentSubscriptionSummary } from "@/hooks/api/use-payments";

export function TalentSubscriptionsSection() {
  const { data, isLoading } = useTalentSubscriptionSummary();

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="text-sm font-semibold">Talent Subscriptions</h2>
        <p className="text-xs text-muted-foreground">
          Single paid tier — unlocks unlimited retakes past the free 3. Monthly
          price pending finalization (OQ-05).
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard
          label="Active Subscribers"
          value={data?.activeSubscribers}
          format="number"
          isLoading={isLoading}
        />
        <StatCard
          label="MRR from Talent"
          value={data?.mrr}
          format="currency"
          isLoading={isLoading}
        />
        <StatCard
          label="Churn This Period"
          value={data?.churn}
          format="number"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
