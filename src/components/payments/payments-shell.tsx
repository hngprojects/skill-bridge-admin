"use client";

import { PaymentsStatCards } from "./payments-stat-cards";
import { RevenueChart } from "./revenue-chart";
import { EmployerPackagesSection } from "./employer-packages-section";
import { TalentSubscriptionsSection } from "./talent-subscriptions-section";
import { SubscriptionsTable } from "./subscriptions-table";
import { TransactionsTable } from "./transactions-table";

export function PaymentsShell() {
  return (
    <div className="flex flex-col gap-8">
      <PaymentsStatCards />
      <RevenueChart />
      <EmployerPackagesSection />
      <TalentSubscriptionsSection />
      <SubscriptionsTable />
      <TransactionsTable />
    </div>
  );
}
