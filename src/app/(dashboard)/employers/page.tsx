import type { Metadata } from "next";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import { employersQueryOptions } from "@/hooks/api/use-employers";
import { EmployersTable } from "@/components/employers/employers-table";

export const metadata: Metadata = {
  title: "Employers",
};

export default async function EmployersPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    employersQueryOptions({ page: 1, limit: DEFAULT_PAGE_SIZE }),
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Employers</h1>
        <p className="text-sm text-muted-foreground">
          Company records, verification status, hiring activity, and
          subscriptions.
        </p>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <EmployersTable />
      </HydrationBoundary>
    </div>
  );
}
