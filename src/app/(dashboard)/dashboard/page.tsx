import type { Metadata } from "next";

import { AIConsumptionChart } from "@/components/dashboard/ai-consumption-chart";
import { NewUsersTable } from "@/components/dashboard/new-users-table";
import { OverviewStatCards } from "@/components/dashboard/overview-stat-cards";
import { ScoreDistributionChart } from "@/components/dashboard/score-distribution-chart";

export const metadata: Metadata = {
  title: "Overview",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground">
          Platform health and activity at a glance.
        </p>
      </div>

      <OverviewStatCards />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ScoreDistributionChart />
        <AIConsumptionChart />
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-base font-semibold">New Users</h2>
        <NewUsersTable />
      </div>
    </div>
  );
}
