import { Suspense } from "react";
import type { Metadata } from "next";

import { TalentsTable } from "@/components/talents/talents-table";

export const metadata: Metadata = {
  title: "Talents",
};

export default function TalentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Talents</h1>
        <p className="text-sm text-muted-foreground">
          Candidate records, assessment results, and audit trail.
        </p>
      </div>

      <Suspense>
        <TalentsTable />
      </Suspense>
    </div>
  );
}
