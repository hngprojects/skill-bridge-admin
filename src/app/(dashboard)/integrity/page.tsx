import type { Metadata } from "next";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import {
  integrityStatsQueryOptions,
  voidedAttemptsQueryOptions,
} from "@/hooks/api/use-integrity";
import { readVoidedAttemptsParams } from "@/components/integrity/search-params";
import { IntegrityStatCards } from "@/components/integrity/integrity-stat-cards";
import { VoidedAttemptsTable } from "@/components/integrity/voided-attempts-table";

export const metadata: Metadata = {
  title: "Integrity",
};

type SearchParams = Record<string, string | string[] | undefined>;

export default async function IntegrityPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolved = await searchParams;
  const params = readVoidedAttemptsParams((key) => {
    const value = resolved[key];
    return Array.isArray(value) ? value[0] : value;
  });

  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 30_000 } },
  });
  await Promise.all([
    queryClient.prefetchQuery(integrityStatsQueryOptions()),
    queryClient.prefetchQuery(voidedAttemptsQueryOptions(params)),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Integrity</h1>
        <p className="text-sm text-muted-foreground">
          Assessment violations and voided attempts for the current period.
        </p>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <IntegrityStatCards />

        <div className="flex flex-col gap-3">
          <h2 className="text-base font-semibold">Voided Attempts</h2>
          <VoidedAttemptsTable />
        </div>
      </HydrationBoundary>
    </div>
  );
}
