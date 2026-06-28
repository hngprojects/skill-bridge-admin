import type { ConfidenceLevel, TalentTrack } from "./talents";

export type IntegrityStats = {
  totalViolations: number;
  voidedAttempts: number;
  stage3ViolationRate: number;
};

export type VoidedAttempt = {
  id: string;
  candidateId: string;
  candidateName: string;
  track: TalentTrack;
  violationCount: number;
  confidenceLevel: ConfidenceLevel;
  sessionDate: string;
};
