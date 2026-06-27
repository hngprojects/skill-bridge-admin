export type TalentTier = "Rejected" | "Emerging" | "Job Ready";
export type ConfidenceLevel = "High" | "Medium" | "Low";
export type SubscriptionStatus = "Active" | "Past Due" | "Cancelled";

export const TALENT_TRACKS = [
  "Frontend",
  "Backend",
  "Data Science",
  "DevOps",
  "Design",
] as const;
export type TalentTrack = (typeof TALENT_TRACKS)[number];

export type TalentListItem = {
  id: string;
  name: string;
  email: string;
  track: TalentTrack;
  tier: TalentTier;
  /** null if Stage 3 not yet completed */
  latestStage3Score: number | null;
  onboardingDate: string;
  lastActivityDate: string;
};

export type CandidateDetail = {
  id: string;
  name: string;
  email: string;
  track: TalentTrack;
  region: string;
  onboardingDate: string;

  stage1: {
    specialisation: string;
    toolsAndStack: string[];
    claimedExperienceLevel: string;
    workPreferences: string[];
  };

  /** null if Stage 2 not yet completed */
  stage2: {
    validatedLevel: string;
    score: number;
    retakesUsed: number;
  } | null;

  /** null if Stage 3 not yet completed */
  stage3: {
    score: number;
    tier: TalentTier;
    retakesUsed: number;
    /** ISO date string; null if not currently gated */
    retakeGateExpiresAt: string | null;
  } | null;

  integrity: {
    violationCount: number;
    voidedAttempts: number;
    confidenceLevel: ConfidenceLevel;
  };

  minorAssessments: Array<{
    id: string;
    name: string;
    badge: string;
    completedAt: string;
  }>;

  subscription: {
    freeRetakesRemaining: number;
    /** null means free-tier (no subscription) */
    status: SubscriptionStatus | null;
  };

  /** Only present for Job Ready tier candidates */
  profileUrl: string | null;
};
