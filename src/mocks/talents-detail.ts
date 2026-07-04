import type {
  CandidateDetail,
  ConfidenceLevel,
  SubscriptionStatus,
  TalentTier,
  TalentTrack,
} from "@/types/api/talents";
import { MOCK_TALENTS } from "./talents";

const TOOLS_BY_TRACK: Record<TalentTrack, string[]> = {
  frontend_developer: [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Next.js",
    "Vite",
  ],
  backend_developer: ["Node.js", "PostgreSQL", "REST APIs", "Docker", "Redis"],
  fullstack_developer: [
    "React",
    "Node.js",
    "PostgreSQL",
    "TypeScript",
    "Docker",
  ],
  mobile_developer: ["React Native", "Flutter", "Swift", "Kotlin", "Expo"],
  cloud_devops: [
    "AWS",
    "Kubernetes",
    "Terraform",
    "GitHub Actions",
    "Prometheus",
  ],
  data_scientist: ["Python", "Pandas", "Scikit-learn", "SQL", "Jupyter"],
  data_analyst: ["SQL", "Excel", "Power BI", "Tableau", "Python"],
  product_designer: [
    "Figma",
    "User Research",
    "Prototyping",
    "Design Systems",
    "Framer",
  ],
  product_manager: ["Jira", "Confluence", "Figma", "SQL", "Google Analytics"],
};

function gateExpiry(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString();
}

export function getMockCandidateDetail(id: string): CandidateDetail {
  const item = MOCK_TALENTS.find((t) => t.id === id);

  const name = item?.name ?? "Unknown Candidate";
  const email = item?.email ?? "candidate@example.com";
  const track: TalentTrack = item?.track ?? "frontend_developer";
  const tier: TalentTier = item?.tier ?? "Emerging";
  const score = item?.latest_stage3_score ?? null;
  const onboarding_date = item?.onboarding_date ?? "2025-01-01";

  const idNum = parseInt(id.replace(/\D/g, ""), 10) || 1;
  const hasViolation = idNum % 6 === 0;
  const isGated = score !== null && idNum % 7 === 0;
  const hasSubscription = idNum % 3 === 0;
  const hasMinorAssessments = idNum % 4 !== 0;

  const confidenceLevel: ConfidenceLevel = hasViolation
    ? "Low"
    : idNum % 3 === 0
      ? "Medium"
      : "High";

  const subscriptionStatus: SubscriptionStatus | null = hasSubscription
    ? idNum % 9 === 0
      ? "Past Due"
      : "Active"
    : null;

  return {
    profile_basics: {
      name,
      email,
      track,
      region: [
        "Lagos, Nigeria",
        "Abuja, Nigeria",
        "Port Harcourt, Nigeria",
        "Kano, Nigeria",
        "Enugu, Nigeria",
      ][idNum % 5],
      onboarding_date,
    },
    stage1_summary: {
      specialisation: `${track} development`,
      tools_and_stack: TOOLS_BY_TRACK[track].slice(0, 4),
      claimed_experience_level: ["junior", "mid", "senior"][idNum % 3],
      work_preferences: idNum % 2 === 0 ? "remote" : "hybrid",
    },
    stage2_result: {
      validated_level: ["junior", "mid", "senior"][idNum % 3],
      score: 55 + (idNum % 30),
      retakes_used: idNum % 3,
      max_attempts: 3,
    },
    stage3_result:
      score !== null
        ? {
            score,
            tier,
            retakes_used: idNum % 2,
            retake_gate: isGated
              ? { locked_until: gateExpiry(3 + (idNum % 5)) }
              : null,
          }
        : null,
    integrity_flags: {
      violation_count: hasViolation ? 1 + (idNum % 3) : 0,
      voided_attempts: hasViolation ? idNum % 2 : 0,
      confidence_level: confidenceLevel,
    },
    minor_assessments: hasMinorAssessments
      ? [
          {
            id: `${id}-m1`,
            name: "Git & Version Control",
            badge: "Git Pro",
            completed_at: "2025-02-10",
          },
          {
            id: `${id}-m2`,
            name: "Technical Communication",
            badge: "Clear Communicator",
            completed_at: "2025-03-05",
          },
        ]
      : [],
    subscription_status: {
      free_retakes_remaining: hasSubscription ? 0 : 2 + (idNum % 3),
      status: subscriptionStatus,
    },
    verified_profile_link:
      tier === "Job Ready" ? `https://skillbridge.io/profile/${id}` : null,
  };
}
