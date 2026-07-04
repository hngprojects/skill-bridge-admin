export type TalentTier = "Onboarding" | "Job Ready" | "Emerging" | "Rejected";

export type TierFilterParam = "not_ready" | "emerging" | "job_ready";

export type ConfidenceLevel = "High" | "Medium" | "Low";
export type SubscriptionStatus = "Active" | "Past Due" | "Cancelled";

export const TALENT_TRACKS = [
  "frontend_developer",
  "backend_developer",
  "fullstack_developer",
  "mobile_developer",
  "cloud_devops",
  "data_scientist",
  "data_analyst",
  "product_designer",
  "product_manager",
] as const;
export type TalentTrack = (typeof TALENT_TRACKS)[number];

export const TRACK_LABELS: Record<TalentTrack, string> = {
  frontend_developer: "Frontend Dev",
  backend_developer: "Backend Dev",
  fullstack_developer: "Fullstack Dev",
  mobile_developer: "Mobile Dev",
  cloud_devops: "Cloud / DevOps",
  data_scientist: "Data Scientist",
  data_analyst: "Data Analyst",
  product_designer: "Product Designer",
  product_manager: "Product Manager",
};

export type TalentsQueryParams = {
  page?: number;
  limit?: number;
  track?: string;
  tier?: TierFilterParam;
  score_min?: number;
  score_max?: number;
  date_from?: string;
  date_to?: string;
  search?: string;
};

export type TalentListItem = {
  id: string;
  name: string;
  email: string;
  track: TalentTrack | null;
  tier: TalentTier | null;
  /** null if Stage 3 not yet completed */
  latest_stage3_score: number | null;
  onboarding_date: string;
  last_activity_date: string;
};

export type TalentsPage = {
  items: TalentListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type CandidateDetail = {
  profile_basics: {
    name: string;
    email: string;
    track: TalentTrack | null;
    region: string;
    onboarding_date: string;
  };

  stage1_summary: {
    specialisation: string | null;
    tools_and_stack: string[] | null;
    claimed_experience_level: string;
    work_preferences: string | null;
  } | null;

  stage2_result: {
    validated_level: string | null;
    score: number | null;
    retakes_used: number;
    max_attempts: number;
  } | null;

  stage3_result: {
    score: number | null;
    tier: TalentTier | null;
    retakes_used: number;
    retake_gate: { locked_until: string } | null;
  } | null;

  integrity_flags: {
    violation_count: number;
    voided_attempts: number;
    confidence_level: ConfidenceLevel | null;
  } | null;

  minor_assessments: Array<{
    id: string;
    name: string;
    badge: string;
    completed_at: string;
  }>;

  subscription_status: {
    free_retakes_remaining: number;
    status?: SubscriptionStatus | null;
  } | null;

  verified_profile_link: string | null;
};
