import type { ApiEnvelope } from "./common";
import type { StatMetric } from "./overview";

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
};

export type IntegrityStats = {
  flagged_attempts: StatMetric;
  voided_attempts: StatMetric;
  high_confidence_flags: StatMetric;
  violation_rate_percent: StatMetric;
};

export type VoidedAttempt = {
  id: string;
  talent_name: string;
  talent_email: string;
  track: string;
  assessment_type: string;
  tab_switch_count: number;
  copy_paste_count: number;
  violation_count: number;
  highest_confidence: string | null;
  started_at: string;
  completed_at: string;
};

export type VoidedAttemptsQueryParams = {
  page?: number;
  limit?: number;
  assessment_type?: string;
  search?: string;
  date_from?: string;
  date_to?: string;
};

export type GetIntegrityStatsResponse = ApiEnvelope<IntegrityStats>;

export type GetVoidedAttemptsResponse = ApiEnvelope<Paginated<VoidedAttempt>>;

export type VoidedAttemptsPage = Paginated<VoidedAttempt>;
