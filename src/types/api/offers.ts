export type OfferStatus =
  | "Pending"
  | "Assessment Unlocked"
  | "Assessment Completed"
  | "Passed"
  | "Failed"
  | "Accepted"
  | "Declined"
  | "Expired";

export type OffersStats = {
  totalOffersSent: {
    value: number;
    trend: number;
  };
  offerAcceptanceRate: {
    value: number;
    trend: number;
  };
  offerToHireRate: {
    value: number;
    trend: number;
  };
  averageTimeToHire: {
    value: string;
    trend: number;
  };
};

export type OfferFunnelSegmentStatus =
  | "pending"
  | "assessment_unlocked"
  | "assessment_completed"
  | "passed"
  | "failed"
  | "accepted"
  | "declined"
  | "expired";

export type OfferFunnelSegment = {
  label: string;
  count: number;
  status: OfferFunnelSegmentStatus;
};

export type OfferFunnelStage = {
  stage: string;
  count: number;
  dropOffPercent?: number;
  segments?: OfferFunnelSegment[];
};

export type OfferFunnelData = {
  stages: OfferFunnelStage[];
};

export type OfferListItem = {
  id: string;
  candidateName: string;
  employerName: string;
  role: string;
  status: OfferStatus;
  dateSent: string;
  dateResolved: string | null;
};

export const OFFER_STATUSES: OfferStatus[] = [
  "Pending",
  "Assessment Unlocked",
  "Assessment Completed",
  "Passed",
  "Failed",
  "Accepted",
  "Declined",
  "Expired",
];
