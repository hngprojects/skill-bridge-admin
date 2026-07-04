import type { ConfidenceLevel } from "@/types/api/talents";
import type { IntegrityStats, VoidedAttempt } from "@/types/api/integrity";
import { MOCK_TALENTS } from "@/mocks/talents";

export const MOCK_INTEGRITY_STATS: IntegrityStats = {
  totalViolations: 67,
  voidedAttempts: 28,
  stage3ViolationRate: 7.1,
};

type VoidedSource = {
  talentId: string;
  violationCount: number;
  confidenceLevel: ConfidenceLevel;
  sessionDate: string;
};

const VOIDED_SOURCE: VoidedSource[] = [
  {
    talentId: "t01",
    violationCount: 3,
    confidenceLevel: "High",
    sessionDate: "2026-06-27",
  },
  {
    talentId: "t02",
    violationCount: 2,
    confidenceLevel: "Medium",
    sessionDate: "2026-06-26",
  },
  {
    talentId: "t03",
    violationCount: 1,
    confidenceLevel: "Low",
    sessionDate: "2026-06-24",
  },
  {
    talentId: "t04",
    violationCount: 4,
    confidenceLevel: "High",
    sessionDate: "2026-06-23",
  },
  {
    talentId: "t05",
    violationCount: 3,
    confidenceLevel: "High",
    sessionDate: "2026-06-21",
  },
  {
    talentId: "t06",
    violationCount: 2,
    confidenceLevel: "Medium",
    sessionDate: "2026-06-20",
  },
  {
    talentId: "t07",
    violationCount: 5,
    confidenceLevel: "High",
    sessionDate: "2026-06-18",
  },
  {
    talentId: "t08",
    violationCount: 1,
    confidenceLevel: "Low",
    sessionDate: "2026-06-17",
  },
  {
    talentId: "t09",
    violationCount: 2,
    confidenceLevel: "Medium",
    sessionDate: "2026-06-15",
  },
  {
    talentId: "t10",
    violationCount: 3,
    confidenceLevel: "High",
    sessionDate: "2026-06-14",
  },
  {
    talentId: "t11",
    violationCount: 2,
    confidenceLevel: "Medium",
    sessionDate: "2026-06-12",
  },
  {
    talentId: "t12",
    violationCount: 4,
    confidenceLevel: "High",
    sessionDate: "2026-06-11",
  },
  {
    talentId: "t13",
    violationCount: 1,
    confidenceLevel: "Low",
    sessionDate: "2026-06-09",
  },
  {
    talentId: "t14",
    violationCount: 1,
    confidenceLevel: "Low",
    sessionDate: "2026-06-06",
  },
  {
    talentId: "t15",
    violationCount: 2,
    confidenceLevel: "Medium",
    sessionDate: "2026-06-04",
  },
  {
    talentId: "t16",
    violationCount: 4,
    confidenceLevel: "High",
    sessionDate: "2026-06-02",
  },
  {
    talentId: "t17",
    violationCount: 2,
    confidenceLevel: "Medium",
    sessionDate: "2026-05-30",
  },
  {
    talentId: "t18",
    violationCount: 1,
    confidenceLevel: "Low",
    sessionDate: "2026-05-28",
  },
  {
    talentId: "t19",
    violationCount: 3,
    confidenceLevel: "Medium",
    sessionDate: "2026-05-26",
  },
  {
    talentId: "t20",
    violationCount: 3,
    confidenceLevel: "Medium",
    sessionDate: "2026-05-23",
  },
  {
    talentId: "t21",
    violationCount: 2,
    confidenceLevel: "High",
    sessionDate: "2026-05-20",
  },
  {
    talentId: "t22",
    violationCount: 2,
    confidenceLevel: "High",
    sessionDate: "2026-05-17",
  },
  {
    talentId: "t24",
    violationCount: 1,
    confidenceLevel: "Low",
    sessionDate: "2026-05-14",
  },
  {
    talentId: "t25",
    violationCount: 3,
    confidenceLevel: "High",
    sessionDate: "2026-05-10",
  },
  {
    talentId: "t26",
    violationCount: 5,
    confidenceLevel: "High",
    sessionDate: "2026-05-06",
  },
  {
    talentId: "t27",
    violationCount: 2,
    confidenceLevel: "Medium",
    sessionDate: "2026-04-29",
  },
  {
    talentId: "t28",
    violationCount: 2,
    confidenceLevel: "Medium",
    sessionDate: "2026-04-22",
  },
  {
    talentId: "t30",
    violationCount: 1,
    confidenceLevel: "Low",
    sessionDate: "2026-04-14",
  },
];

export const MOCK_VOIDED_ATTEMPTS: VoidedAttempt[] = VOIDED_SOURCE.map(
  (source) => {
    const talent = MOCK_TALENTS.find((t) => t.id === source.talentId);
    return {
      id: `va-${source.talentId}`,
      candidateId: source.talentId,
      candidateName: talent?.name ?? "Unknown Candidate",
      track: talent?.track ?? "frontend_developer",
      violationCount: source.violationCount,
      confidenceLevel: source.confidenceLevel,
      sessionDate: source.sessionDate,
    };
  },
);
