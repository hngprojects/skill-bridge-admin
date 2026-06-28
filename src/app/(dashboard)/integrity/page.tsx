import type { Metadata } from "next";

import { IntegrityStatCards } from "@/components/integrity/integrity-stat-cards";
import { VoidedAttemptsTable } from "@/components/integrity/voided-attempts-table";

export const metadata: Metadata = {
  title: "Integrity",
};

export default function IntegrityPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Integrity</h1>
        <p className="text-sm text-muted-foreground">
          Assessment violations and voided attempts for the current period.
        </p>
      </div>

      <IntegrityStatCards />

      <div className="flex flex-col gap-3">
        <h2 className="text-base font-semibold">Voided Attempts</h2>
        <VoidedAttemptsTable />
      </div>
    </div>
  );
}
