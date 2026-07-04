import {
  keepPreviousData,
  queryOptions,
  useQuery,
} from "@tanstack/react-query";

import { getIntegrityStats, getVoidedAttempts } from "@/actions/integrity";
import type { VoidedAttemptsQueryParams } from "@/types/api/integrity";
import { integrityKeys } from "./keys";

export function integrityStatsQueryOptions() {
  return queryOptions({
    queryKey: integrityKeys.stats(),
    queryFn: getIntegrityStats,
    refetchInterval: 60_000,
  });
}

export function voidedAttemptsQueryOptions(params: VoidedAttemptsQueryParams) {
  return queryOptions({
    queryKey: integrityKeys.voidedAttempts(params),
    queryFn: () => getVoidedAttempts(params),
    placeholderData: keepPreviousData,
  });
}

export function useIntegrityStats() {
  return useQuery(integrityStatsQueryOptions());
}

export function useVoidedAttempts(params: VoidedAttemptsQueryParams) {
  return useQuery(voidedAttemptsQueryOptions(params));
}
