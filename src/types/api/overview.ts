export type StatTrend = {
  direction: "up" | "down" | null;
  change_percent: number | null;
};

export type StatMetric = {
  value: number;
  trend: StatTrend;
};

export type OverviewStats = {
  total_candidates: StatMetric;
  job_ready_rate: StatMetric;
  active_employers: StatMetric;
  offers_sent_this_month: StatMetric;
  total_revenue: StatMetric;
};

export type ScoreDistributionBucket = {
  range: string;
  count: number;
};

export type ScoreDistribution = {
  buckets: ScoreDistributionBucket[];
  total_completed: number;
  empty: boolean;
};

export type AIConsumptionPeriod = "yearly" | "monthly" | "weekly" | "daily";

export type AIConsumptionData = {
  buckets: { range: string; count: number }[];
  total_completed: number;
  empty: boolean;
};

export type NewUserType = "talent" | "employer";

export type TalentStatus = "Onboarding" | "Verified" | "Job Ready" | "Emerging";
export type EmployerStatus = "Verified" | "Unverified";
export type NewUserStatus = TalentStatus | EmployerStatus;

export type NewUser = {
  name: string;
  type: NewUserType;
  signup_date: string;
  status: NewUserStatus;
};
