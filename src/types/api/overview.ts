export type OverviewStats = {
  totalCandidates: { value: number; trend: number };
  jobReadyRate: { value: number; trend: number };
  activeEmployers: { value: number; trend: number };
  offersSentThisMonth: { value: number; trend: number };
  totalRevenue: { value: number; trend: number };
};

export type ScoreDistributionBucket = {
  range: string;
  count: number;
};

export type ScoreDistribution = {
  buckets: ScoreDistributionBucket[];
  /** Total completed assessments — used to gate the empty-state threshold. */
  totalAssessments: number;
};

export type AIConsumptionPeriod = "yearly" | "monthly" | "weekly" | "daily";

export type AIConsumptionDataPoint = {
  label: string;
  count: number;
};

export type AIConsumptionData = {
  period: AIConsumptionPeriod;
  data: AIConsumptionDataPoint[];
};

export type NewUserType = "talent" | "employer";

export type TalentStatus = "Onboarding" | "Verified" | "Job Ready" | "Emerging";
export type EmployerStatus = "Verified" | "Unverified";
export type NewUserStatus = TalentStatus | EmployerStatus;

export type NewUser = {
  id: string;
  /** Talent full name or employer company name. */
  name: string;
  type: NewUserType;
  signupDate: string;
  status: NewUserStatus;
};
