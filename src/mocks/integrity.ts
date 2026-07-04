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
