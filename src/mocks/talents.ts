import type {
  CandidateDetail,
  ConfidenceLevel,
  SubscriptionStatus,
  TalentListItem,
  TalentTier,
  TalentTrack,
} from "@/types/api/talents";

// ---------------------------------------------------------------------------
// List items
// ---------------------------------------------------------------------------

export const MOCK_TALENTS: TalentListItem[] = [
  {
    id: "t01",
    name: "Chioma Adeyemi",
    email: "chioma.adeyemi@mail.com",
    track: "frontend_developer",
    tier: "Job Ready",
    latest_stage3_score: 88,
    onboarding_date: "2025-01-12",
    last_activity_date: "2025-06-20",
  },
  {
    id: "t02",
    name: "Emeka Okafor",
    email: "emeka.okafor@mail.com",
    track: "backend_developer",
    tier: "Emerging",
    latest_stage3_score: 63,
    onboarding_date: "2025-02-03",
    last_activity_date: "2025-06-18",
  },
  {
    id: "t03",
    name: "Fatima Bello",
    email: "fatima.bello@mail.com",
    track: "data_scientist",
    tier: "Job Ready",
    latest_stage3_score: 91,
    onboarding_date: "2024-11-20",
    last_activity_date: "2025-06-25",
  },
  {
    id: "t04",
    name: "Seun Adebayo",
    email: "seun.adebayo@mail.com",
    track: "cloud_devops",
    tier: "Emerging",
    latest_stage3_score: 55,
    onboarding_date: "2025-03-14",
    last_activity_date: "2025-06-10",
  },
  {
    id: "t05",
    name: "Ngozi Eze",
    email: "ngozi.eze@mail.com",
    track: "product_designer",
    tier: "Rejected",
    latest_stage3_score: 38,
    onboarding_date: "2025-01-28",
    last_activity_date: "2025-05-30",
  },
  {
    id: "t06",
    name: "Tunde Fashola",
    email: "tunde.fashola@mail.com",
    track: "frontend_developer",
    tier: "Emerging",
    latest_stage3_score: 67,
    onboarding_date: "2025-02-19",
    last_activity_date: "2025-06-22",
  },
  {
    id: "t07",
    name: "Ifeoma Chukwu",
    email: "ifeoma.chukwu@mail.com",
    track: "backend_developer",
    tier: "Rejected",
    latest_stage3_score: 29,
    onboarding_date: "2025-04-05",
    last_activity_date: "2025-06-01",
  },
  {
    id: "t08",
    name: "Chukwuemeka Obi",
    email: "chuks.obi@mail.com",
    track: "data_scientist",
    tier: "Emerging",
    latest_stage3_score: 71,
    onboarding_date: "2025-03-22",
    last_activity_date: "2025-06-19",
  },
  {
    id: "t09",
    name: "Zara Musa",
    email: "zara.musa@mail.com",
    track: "product_designer",
    tier: "Job Ready",
    latest_stage3_score: 83,
    onboarding_date: "2024-12-08",
    last_activity_date: "2025-06-24",
  },
  {
    id: "t10",
    name: "Adaeze Ibe",
    email: "adaeze.ibe@mail.com",
    track: "frontend_developer",
    tier: "Job Ready",
    latest_stage3_score: 79,
    onboarding_date: "2024-10-15",
    last_activity_date: "2025-06-23",
  },
  {
    id: "t11",
    name: "Kemi Abiodun",
    email: "kemi.abiodun@mail.com",
    track: "backend_developer",
    tier: "Emerging",
    latest_stage3_score: 60,
    onboarding_date: "2025-04-18",
    last_activity_date: "2025-06-15",
  },
  {
    id: "t12",
    name: "Oluwaseun Alabi",
    email: "seun.alabi@mail.com",
    track: "cloud_devops",
    tier: "Rejected",
    latest_stage3_score: 41,
    onboarding_date: "2025-05-02",
    last_activity_date: "2025-06-08",
  },
  {
    id: "t13",
    name: "Mide Coker",
    email: "mide.coker@mail.com",
    track: "data_scientist",
    tier: "Job Ready",
    latest_stage3_score: 86,
    onboarding_date: "2025-01-07",
    last_activity_date: "2025-06-26",
  },
  {
    id: "t14",
    name: "Tosin Ogundimu",
    email: "tosin.ogundimu@mail.com",
    track: "frontend_developer",
    tier: "Emerging",
    latest_stage3_score: 58,
    onboarding_date: "2025-02-27",
    last_activity_date: "2025-06-12",
  },
  {
    id: "t15",
    name: "Blessing Udo",
    email: "blessing.udo@mail.com",
    track: "product_designer",
    tier: "Emerging",
    latest_stage3_score: 64,
    onboarding_date: "2025-03-10",
    last_activity_date: "2025-06-17",
  },
  {
    id: "t16",
    name: "Amara Nwosu",
    email: "amara.nwosu@mail.com",
    track: "backend_developer",
    tier: "Job Ready",
    latest_stage3_score: 92,
    onboarding_date: "2024-09-30",
    last_activity_date: "2025-06-25",
  },
  {
    id: "t17",
    name: "Damilola Osei",
    email: "dami.osei@mail.com",
    track: "cloud_devops",
    tier: "Emerging",
    latest_stage3_score: 52,
    onboarding_date: "2025-04-28",
    last_activity_date: "2025-06-05",
  },
  {
    id: "t18",
    name: "Precious Obi",
    email: "precious.obi@mail.com",
    track: "frontend_developer",
    tier: "Rejected",
    latest_stage3_score: 33,
    onboarding_date: "2025-05-15",
    last_activity_date: "2025-06-02",
  },
  {
    id: "t19",
    name: "Uchenna Nkem",
    email: "uchenna.nkem@mail.com",
    track: "data_scientist",
    tier: "Emerging",
    latest_stage3_score: 68,
    onboarding_date: "2025-02-12",
    last_activity_date: "2025-06-21",
  },
  {
    id: "t20",
    name: "Chidera Agu",
    email: "chidera.agu@mail.com",
    track: "product_designer",
    tier: "Rejected",
    latest_stage3_score: 22,
    onboarding_date: "2025-05-20",
    last_activity_date: "2025-05-28",
  },
  {
    id: "t21",
    name: "Folake Adeleke",
    email: "folake.adeleke@mail.com",
    track: "backend_developer",
    tier: "Job Ready",
    latest_stage3_score: 77,
    onboarding_date: "2024-12-22",
    last_activity_date: "2025-06-23",
  },
  {
    id: "t22",
    name: "Taiwo Oladele",
    email: "taiwo.oladele@mail.com",
    track: "frontend_developer",
    tier: "Emerging",
    latest_stage3_score: 61,
    onboarding_date: "2025-03-31",
    last_activity_date: "2025-06-14",
  },
  {
    id: "t23",
    name: "Obiora Nwobi",
    email: "obiora.nwobi@mail.com",
    track: "cloud_devops",
    tier: "Rejected",
    latest_stage3_score: null,
    onboarding_date: "2025-06-10",
    last_activity_date: "2025-06-27",
  },
  {
    id: "t24",
    name: "Sade Bankole",
    email: "sade.bankole@mail.com",
    track: "data_scientist",
    tier: "Emerging",
    latest_stage3_score: 73,
    onboarding_date: "2025-01-25",
    last_activity_date: "2025-06-20",
  },
  {
    id: "t25",
    name: "Bayo Okafor",
    email: "bayo.okafor@mail.com",
    track: "product_designer",
    tier: "Job Ready",
    latest_stage3_score: 85,
    onboarding_date: "2024-11-05",
    last_activity_date: "2025-06-24",
  },
  {
    id: "t26",
    name: "Nkechi Okonkwo",
    email: "nkechi.okonkwo@mail.com",
    track: "frontend_developer",
    tier: "Rejected",
    latest_stage3_score: 44,
    onboarding_date: "2025-04-12",
    last_activity_date: "2025-06-03",
  },
  {
    id: "t27",
    name: "Ifeanyi Okeke",
    email: "ifeanyi.okeke@mail.com",
    track: "backend_developer",
    tier: "Emerging",
    latest_stage3_score: 56,
    onboarding_date: "2025-03-05",
    last_activity_date: "2025-06-16",
  },
  {
    id: "t28",
    name: "Yetunde Salami",
    email: "yetunde.salami@mail.com",
    track: "cloud_devops",
    tier: "Job Ready",
    latest_stage3_score: 80,
    onboarding_date: "2024-10-28",
    last_activity_date: "2025-06-22",
  },
  {
    id: "t29",
    name: "Abiodun Ojo",
    email: "abiodun.ojo@mail.com",
    track: "data_scientist",
    tier: "Rejected",
    latest_stage3_score: null,
    onboarding_date: "2025-06-20",
    last_activity_date: "2025-06-27",
  },
  {
    id: "t30",
    name: "Chiamaka Igwe",
    email: "chiamaka.igwe@mail.com",
    track: "product_designer",
    tier: "Emerging",
    latest_stage3_score: 69,
    onboarding_date: "2025-02-08",
    last_activity_date: "2025-06-18",
  },
];

// ---------------------------------------------------------------------------
// Detail builder
// ---------------------------------------------------------------------------

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

  // Deterministic variation from ID suffix
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
