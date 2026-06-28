export type EngagementStats = {
  minorAssessmentAdoptionRate: {
    value: number;
    trend: number;
  };
  minorAssessmentCompletionRate: {
    value: number;
    trend: number;
  };
  retakeConversionRate: {
    value: number;
    trend: number;
  };
  averageTimeToRetakeAfterGateClears: {
    value: string;
    trend: number;
  };
};

export type RetakeDropoffDataPoint = {
  attempt: string;
  candidates: number;
};

export type RetakeDropoffData = {
  data: RetakeDropoffDataPoint[];
};

export type MinorAssessmentUptakeType =
  | "Language variants"
  | "Specialisation deep dives"
  | "Soft skill assessments";

export type MinorAssessmentUptakeDataPoint = {
  type: MinorAssessmentUptakeType;
  count: number;
};

export type MinorAssessmentUptakeData = {
  data: MinorAssessmentUptakeDataPoint[];
};
