import type { IntegrityStats, VoidedAttempt } from "@/types/api/integrity";
import { MOCK_INTEGRITY_STATS, MOCK_VOIDED_ATTEMPTS } from "@/mocks/integrity";

export async function getIntegrityStats(): Promise<IntegrityStats> {
  return MOCK_INTEGRITY_STATS;
}

export async function getVoidedAttempts(): Promise<VoidedAttempt[]> {
  return MOCK_VOIDED_ATTEMPTS;
}
