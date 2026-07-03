"use server";

import type { ApiEnvelope } from "@/types/api";
import { authApi } from "@/lib/api/clients";
import { unwrapData } from "./utils";

import type {
  OfferFunnelData,
  OfferFunnelSegmentStatus,
  OfferListItem,
  OffersDateRangeParams,
  OffersListParams,
  OffersStats,
  OfferStatus,
} from "@/types/api/offers";

type Nested<T> = { status: string; data: T };

type ApiTrend = {
  direction: "up" | "down" | null;
  change_percent: number | null;
};

type ApiStatMetric = {
  value: number;
  trend?: ApiTrend;
};

type ApiOffersStats = {
  total_offers_sent: ApiStatMetric;
  offer_to_acceptance_rate: ApiStatMetric;
  offer_to_hire_rate: ApiStatMetric;
  avg_time_offer_to_hire_days: ApiStatMetric;
};

type ApiFunnelStage = {
  stage: string;
  count: number;
  drop_off_percent?: number;
};

type ApiOffersFunnel = {
  stages: ApiFunnelStage[];
  total: number;
  empty: boolean;
};

type ApiOffer = {
  id: string;
  candidate_name: string;
  employer_name: string;
  role_title: string;
  status: string;
  date_sent: string;
  date_resolved: string | null;
};

type ApiOffersList = {
  offers: ApiOffer[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    total_pages?: number;
    totalPages?: number;
  };
};

function buildDateParams(params?: OffersDateRangeParams) {
  const searchParams: Record<string, string> = {};

  if (params?.dateFrom) searchParams.date_from = params.dateFrom;
  if (params?.dateTo) searchParams.date_to = params.dateTo;

  return searchParams;
}

function trendToValue(trend?: ApiTrend): number {
  if (!trend || trend.change_percent == null) return 0;

  return trend.direction === "down"
    ? -trend.change_percent
    : trend.change_percent;
}

function formatAverageDays(value: number): string {
  if (value === 1) return "1 day";
  return `${value} days`;
}

function toTitleCaseStatus(status: string): OfferStatus {
  const statusMap: Record<string, OfferStatus> = {
    pending: "Pending",
    assessment_unlocked: "Assessment Unlocked",
    assessment_completed: "Assessment Completed",
    passed: "Passed",
    failed: "Failed",
    accepted: "Accepted",
    declined: "Declined",
    expired: "Expired",
    hired: "Hired",
    withdrawn: "Withdrawn",
  };

  return statusMap[status.toLowerCase()] ?? "Pending";
}

function toFunnelStatus(status: string): OfferFunnelSegmentStatus {
  const normalised = status.toLowerCase();

  const statusMap: Record<string, OfferFunnelSegmentStatus> = {
    pending: "pending",
    assessment_unlocked: "assessment_unlocked",
    assessment_completed: "assessment_completed",
    passed: "passed",
    failed: "failed",
    accepted: "accepted",
    declined: "declined",
    expired: "expired",
    hired: "hired",
    withdrawn: "withdrawn",
  };

  return statusMap[normalised] ?? "pending";
}

function formatStageLabel(stage: string): string {
  return stage
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function mapOffer(offer: ApiOffer): OfferListItem {
  return {
    id: offer.id,
    candidateName: offer.candidate_name,
    employerName: offer.employer_name,
    role: offer.role_title,
    status: toTitleCaseStatus(offer.status),
    dateSent: offer.date_sent,
    dateResolved: offer.date_resolved,
  };
}

export async function getOffersStats(
  params?: OffersDateRangeParams,
): Promise<OffersStats> {
  const res = await authApi.get<ApiEnvelope<Nested<ApiOffersStats>>>(
    "/admin/offers/stats",
    {
      params: buildDateParams(params),
    },
  );

  const data = unwrapData(res).data;

  return {
    totalOffersSent: {
      value: data.total_offers_sent.value,
      trend: trendToValue(data.total_offers_sent.trend),
    },
    offerAcceptanceRate: {
      value: data.offer_to_acceptance_rate.value,
      trend: trendToValue(data.offer_to_acceptance_rate.trend),
    },
    offerToHireRate: {
      value: data.offer_to_hire_rate.value,
      trend: trendToValue(data.offer_to_hire_rate.trend),
    },
    averageTimeToHire: {
      value: formatAverageDays(data.avg_time_offer_to_hire_days.value),
      trend: trendToValue(data.avg_time_offer_to_hire_days.trend),
    },
  };
}

export async function getOffersFunnel(
  params?: OffersDateRangeParams,
): Promise<OfferFunnelData> {
  const res = await authApi.get<ApiEnvelope<Nested<ApiOffersFunnel>>>(
    "/admin/offers/funnel",
    {
      params: buildDateParams(params),
    },
  );

  const data = unwrapData(res).data;

  return {
    total: data.total,
    empty: data.empty,
    stages: data.stages.map((stage) => {
      const label = formatStageLabel(stage.stage);

      return {
        stage: label,
        count: stage.count,
        dropOffPercent: stage.drop_off_percent,
        segments: [
          {
            label,
            count: stage.count,
            status: toFunnelStatus(stage.stage),
          },
        ],
      };
    }),
  };
}

export async function getOffers(
  params?: OffersListParams,
): Promise<OfferListItem[]> {
  const res = await authApi.get<ApiEnvelope<Nested<ApiOffersList>>>(
    "/admin/offers",
    {
      params: {
        page: params?.page ?? 1,
        limit: params?.limit ?? 100,
        status: params?.status,
        date_from: params?.dateFrom,
        date_to: params?.dateTo,
        search: params?.search,
      },
    },
  );

  const data = unwrapData(res).data;

  return data.offers.map(mapOffer);
}
