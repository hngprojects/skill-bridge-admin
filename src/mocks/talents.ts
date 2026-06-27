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
    track: "Frontend",
    tier: "Job Ready",
    latestStage3Score: 88,
    onboardingDate: "2025-01-12",
    lastActivityDate: "2025-06-20",
  },
  {
    id: "t02",
    name: "Emeka Okafor",
    email: "emeka.okafor@mail.com",
    track: "Backend",
    tier: "Emerging",
    latestStage3Score: 63,
    onboardingDate: "2025-02-03",
    lastActivityDate: "2025-06-18",
  },
  {
    id: "t03",
    name: "Fatima Bello",
    email: "fatima.bello@mail.com",
    track: "Data Science",
    tier: "Job Ready",
    latestStage3Score: 91,
    onboardingDate: "2024-11-20",
    lastActivityDate: "2025-06-25",
  },
  {
    id: "t04",
    name: "Seun Adebayo",
    email: "seun.adebayo@mail.com",
    track: "DevOps",
    tier: "Emerging",
    latestStage3Score: 55,
    onboardingDate: "2025-03-14",
    lastActivityDate: "2025-06-10",
  },
  {
    id: "t05",
    name: "Ngozi Eze",
    email: "ngozi.eze@mail.com",
    track: "Design",
    tier: "Rejected",
    latestStage3Score: 38,
    onboardingDate: "2025-01-28",
    lastActivityDate: "2025-05-30",
  },
  {
    id: "t06",
    name: "Tunde Fashola",
    email: "tunde.fashola@mail.com",
    track: "Frontend",
    tier: "Emerging",
    latestStage3Score: 67,
    onboardingDate: "2025-02-19",
    lastActivityDate: "2025-06-22",
  },
  {
    id: "t07",
    name: "Ifeoma Chukwu",
    email: "ifeoma.chukwu@mail.com",
    track: "Backend",
    tier: "Rejected",
    latestStage3Score: 29,
    onboardingDate: "2025-04-05",
    lastActivityDate: "2025-06-01",
  },
  {
    id: "t08",
    name: "Chukwuemeka Obi",
    email: "chuks.obi@mail.com",
    track: "Data Science",
    tier: "Emerging",
    latestStage3Score: 71,
    onboardingDate: "2025-03-22",
    lastActivityDate: "2025-06-19",
  },
  {
    id: "t09",
    name: "Zara Musa",
    email: "zara.musa@mail.com",
    track: "Design",
    tier: "Job Ready",
    latestStage3Score: 83,
    onboardingDate: "2024-12-08",
    lastActivityDate: "2025-06-24",
  },
  {
    id: "t10",
    name: "Adaeze Ibe",
    email: "adaeze.ibe@mail.com",
    track: "Frontend",
    tier: "Job Ready",
    latestStage3Score: 79,
    onboardingDate: "2024-10-15",
    lastActivityDate: "2025-06-23",
  },
  {
    id: "t11",
    name: "Kemi Abiodun",
    email: "kemi.abiodun@mail.com",
    track: "Backend",
    tier: "Emerging",
    latestStage3Score: 60,
    onboardingDate: "2025-04-18",
    lastActivityDate: "2025-06-15",
  },
  {
    id: "t12",
    name: "Oluwaseun Alabi",
    email: "seun.alabi@mail.com",
    track: "DevOps",
    tier: "Rejected",
    latestStage3Score: 41,
    onboardingDate: "2025-05-02",
    lastActivityDate: "2025-06-08",
  },
  {
    id: "t13",
    name: "Mide Coker",
    email: "mide.coker@mail.com",
    track: "Data Science",
    tier: "Job Ready",
    latestStage3Score: 86,
    onboardingDate: "2025-01-07",
    lastActivityDate: "2025-06-26",
  },
  {
    id: "t14",
    name: "Tosin Ogundimu",
    email: "tosin.ogundimu@mail.com",
    track: "Frontend",
    tier: "Emerging",
    latestStage3Score: 58,
    onboardingDate: "2025-02-27",
    lastActivityDate: "2025-06-12",
  },
  {
    id: "t15",
    name: "Blessing Udo",
    email: "blessing.udo@mail.com",
    track: "Design",
    tier: "Emerging",
    latestStage3Score: 64,
    onboardingDate: "2025-03-10",
    lastActivityDate: "2025-06-17",
  },
  {
    id: "t16",
    name: "Amara Nwosu",
    email: "amara.nwosu@mail.com",
    track: "Backend",
    tier: "Job Ready",
    latestStage3Score: 92,
    onboardingDate: "2024-09-30",
    lastActivityDate: "2025-06-25",
  },
  {
    id: "t17",
    name: "Damilola Osei",
    email: "dami.osei@mail.com",
    track: "DevOps",
    tier: "Emerging",
    latestStage3Score: 52,
    onboardingDate: "2025-04-28",
    lastActivityDate: "2025-06-05",
  },
  {
    id: "t18",
    name: "Precious Obi",
    email: "precious.obi@mail.com",
    track: "Frontend",
    tier: "Rejected",
    latestStage3Score: 33,
    onboardingDate: "2025-05-15",
    lastActivityDate: "2025-06-02",
  },
  {
    id: "t19",
    name: "Uchenna Nkem",
    email: "uchenna.nkem@mail.com",
    track: "Data Science",
    tier: "Emerging",
    latestStage3Score: 68,
    onboardingDate: "2025-02-12",
    lastActivityDate: "2025-06-21",
  },
  {
    id: "t20",
    name: "Chidera Agu",
    email: "chidera.agu@mail.com",
    track: "Design",
    tier: "Rejected",
    latestStage3Score: 22,
    onboardingDate: "2025-05-20",
    lastActivityDate: "2025-05-28",
  },
  {
    id: "t21",
    name: "Folake Adeleke",
    email: "folake.adeleke@mail.com",
    track: "Backend",
    tier: "Job Ready",
    latestStage3Score: 77,
    onboardingDate: "2024-12-22",
    lastActivityDate: "2025-06-23",
  },
  {
    id: "t22",
    name: "Taiwo Oladele",
    email: "taiwo.oladele@mail.com",
    track: "Frontend",
    tier: "Emerging",
    latestStage3Score: 61,
    onboardingDate: "2025-03-31",
    lastActivityDate: "2025-06-14",
  },
  {
    id: "t23",
    name: "Obiora Nwobi",
    email: "obiora.nwobi@mail.com",
    track: "DevOps",
    tier: "Rejected",
    latestStage3Score: null,
    onboardingDate: "2025-06-10",
    lastActivityDate: "2025-06-27",
  },
  {
    id: "t24",
    name: "Sade Bankole",
    email: "sade.bankole@mail.com",
    track: "Data Science",
    tier: "Emerging",
    latestStage3Score: 73,
    onboardingDate: "2025-01-25",
    lastActivityDate: "2025-06-20",
  },
  {
    id: "t25",
    name: "Bayo Okafor",
    email: "bayo.okafor@mail.com",
    track: "Design",
    tier: "Job Ready",
    latestStage3Score: 85,
    onboardingDate: "2024-11-05",
    lastActivityDate: "2025-06-24",
  },
  {
    id: "t26",
    name: "Nkechi Okonkwo",
    email: "nkechi.okonkwo@mail.com",
    track: "Frontend",
    tier: "Rejected",
    latestStage3Score: 44,
    onboardingDate: "2025-04-12",
    lastActivityDate: "2025-06-03",
  },
  {
    id: "t27",
    name: "Ifeanyi Okeke",
    email: "ifeanyi.okeke@mail.com",
    track: "Backend",
    tier: "Emerging",
    latestStage3Score: 56,
    onboardingDate: "2025-03-05",
    lastActivityDate: "2025-06-16",
  },
  {
    id: "t28",
    name: "Yetunde Salami",
    email: "yetunde.salami@mail.com",
    track: "DevOps",
    tier: "Job Ready",
    latestStage3Score: 80,
    onboardingDate: "2024-10-28",
    lastActivityDate: "2025-06-22",
  },
  {
    id: "t29",
    name: "Abiodun Ojo",
    email: "abiodun.ojo@mail.com",
    track: "Data Science",
    tier: "Rejected",
    latestStage3Score: null,
    onboardingDate: "2025-06-20",
    lastActivityDate: "2025-06-27",
  },
  {
    id: "t30",
    name: "Chiamaka Igwe",
    email: "chiamaka.igwe@mail.com",
    track: "Design",
    tier: "Emerging",
    latestStage3Score: 69,
    onboardingDate: "2025-02-08",
    lastActivityDate: "2025-06-18",
  },
];

// ---------------------------------------------------------------------------
// Detail builder
// ---------------------------------------------------------------------------

const TOOLS_BY_TRACK: Record<TalentTrack, string[]> = {
  Frontend: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vite"],
  Backend: ["Node.js", "PostgreSQL", "REST APIs", "Docker", "Redis"],
  "Data Science": ["Python", "Pandas", "Scikit-learn", "SQL", "Jupyter"],
  DevOps: ["AWS", "Kubernetes", "Terraform", "GitHub Actions", "Prometheus"],
  Design: ["Figma", "User Research", "Prototyping", "Design Systems", "Framer"],
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
  const track: TalentTrack = item?.track ?? "Frontend";
  const tier: TalentTier = item?.tier ?? "Emerging";
  const score = item?.latestStage3Score ?? null;
  const onboardingDate = item?.onboardingDate ?? "2025-01-01";

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
    id,
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
    onboardingDate,

    stage1: {
      specialisation: `${track} Development`,
      toolsAndStack: TOOLS_BY_TRACK[track].slice(0, 4),
      claimedExperienceLevel: ["Junior", "Mid-level", "Senior"][idNum % 3],
      workPreferences:
        idNum % 2 === 0 ? ["Remote", "Contract"] : ["Hybrid", "Full-time"],
    },

    stage2: {
      validatedLevel: ["Junior", "Mid-level", "Senior"][idNum % 3],
      score: 55 + (idNum % 30),
      retakesUsed: idNum % 3,
    },

    stage3:
      score !== null
        ? {
            score,
            tier,
            retakesUsed: idNum % 2,
            retakeGateExpiresAt: isGated ? gateExpiry(3 + (idNum % 5)) : null,
          }
        : null,

    integrity: {
      violationCount: hasViolation ? 1 + (idNum % 3) : 0,
      voidedAttempts: hasViolation ? idNum % 2 : 0,
      confidenceLevel,
    },

    minorAssessments: hasMinorAssessments
      ? [
          {
            id: `${id}-m1`,
            name: "Git & Version Control",
            badge: "Git Pro",
            completedAt: "2025-02-10",
          },
          {
            id: `${id}-m2`,
            name: "Technical Communication",
            badge: "Clear Communicator",
            completedAt: "2025-03-05",
          },
        ]
      : [],

    subscription: {
      freeRetakesRemaining: hasSubscription ? 0 : 2 + (idNum % 3),
      status: subscriptionStatus,
    },

    profileUrl:
      tier === "Job Ready" ? `https://skillbridge.io/profile/${id}` : null,
  };
}
