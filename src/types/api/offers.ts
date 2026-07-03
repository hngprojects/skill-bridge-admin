export type OfferStatus =
  | "Pending"
  | "Assessment Unlocked"
  | "Assessment Completed"
  | "Passed"
  | "Failed"
  | "Accepted"
  | "Declined"
  | "Expired"
  | "Hired"
  | "Withdrawn";

export type OfferFunnelSegmentStatus =
  | "pending"
  | "assessment_unlocked"
  | "assessment_completed"
  | "passed"
  | "failed"
  | "accepted"
  | "declined"
  | "expired"
  | "hired"
  | "withdrawn";

export type OfferStatMetric = {
  value: number | string;
  trend?: number;
};

export type OffersStats = {
  totalOffersSent: OfferStatMetric;
  offerAcceptanceRate: OfferStatMetric;
  offerToHireRate: OfferStatMetric;
  averageTimeToHire: OfferStatMetric;
};

export type OfferFunnelSegment = {
  label: string;
  count: number;
  status: OfferFunnelSegmentStatus;
};

export type OfferFunnelStage = {
  stage: string;
  count: number;
  dropOffPercent?: number;
  segments: OfferFunnelSegment[];
};

export type OfferFunnelData = {
  stages: OfferFunnelStage[];
  total: number;
  empty: boolean;
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

export type OffersDateRangeParams = {
  dateFrom?: string;
  dateTo?: string;
};

export type OffersListParams = OffersDateRangeParams & {
  page?: number;
  limit?: number;
  status?: OfferStatus | "all";
  search?: string;
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
  "Hired",
  "Withdrawn",
];

export const OFFER_STATUS_OPTIONS = OFFER_STATUSES;
