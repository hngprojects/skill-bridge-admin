import type { Metadata } from "next";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { employersQueryOptions } from "@/hooks/api/use-employers";
import { EmployersTable } from "@/components/employers/employers-table";
import { readEmployersParams } from "@/components/employers/search-params";

export const metadata: Metadata = {
  title: "Employers",
};

type SearchParams = Record<string, string | string[] | undefined>;

export default async function EmployersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolved = await searchParams;
  const params = readEmployersParams((key) => {
    const value = resolved[key];
    return Array.isArray(value) ? value[0] : value;
  });

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(employersQueryOptions(params));

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
