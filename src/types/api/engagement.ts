import type { StatMetric } from "./overview";

export type Nested<T> = { status: string; data: T };

export type EngagementStats = {
  minor_assessment_adoption_rate: StatMetric;
  minor_assessment_completion_rate: StatMetric;
  retake_conversion_rate: StatMetric;
  avg_time_to_retake_after_gate_clears_days: StatMetric;
};

export type RetakeDropoffBucket = {
  attempt: number;
  retakes: number;
};

export type RetakeDropoffData = {
  buckets: RetakeDropoffBucket[];
  empty: boolean;
  empty_message: string;
};

export type MinorAssessmentUptakeBucket = {
  type: string;
  count: number;
};

export type MinorAssessmentUptakeData = {
  buckets: MinorAssessmentUptakeBucket[];
  empty: boolean;
  empty_message: string;
};
