import type { Metadata } from "next";

import { EmployersTable } from "@/components/employers/employers-table";

export const metadata: Metadata = {
  title: "Employers",
};

export default function EmployersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Employers</h1>
        <p className="text-sm text-muted-foreground">
          Company records, verification status, hiring activity, and
          subscriptions.
        </p>
      </div>

      <EmployersTable />
    </div>
  );
}
