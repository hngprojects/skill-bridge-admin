import { useQuery } from "@tanstack/react-query";

import { getIntegrityStats, getVoidedAttempts } from "@/actions/integrity";
import { integrityKeys } from "./keys";

export function useIntegrityStats() {
  return useQuery({
    queryKey: integrityKeys.stats(),
    queryFn: getIntegrityStats,
    refetchInterval: 60_000,
  });
}

export function useVoidedAttempts() {
  return useQuery({
    queryKey: integrityKeys.voidedAttempts(),
    queryFn: getVoidedAttempts,
  });
}
