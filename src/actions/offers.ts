import type {
  OfferFunnelData,
  OfferListItem,
  OffersStats,
} from "@/types/api/offers";

import {
  MOCK_OFFERS,
  MOCK_OFFERS_FUNNEL,
  MOCK_OFFERS_STATS,
} from "@/mocks/offers";

// TODO: replace mock bodies with real API calls once endpoints are available.

export async function getOffersStats(): Promise<OffersStats> {
  return MOCK_OFFERS_STATS;
}

export async function getOffersFunnel(): Promise<OfferFunnelData> {
  return MOCK_OFFERS_FUNNEL;
}

export async function getOffers(): Promise<OfferListItem[]> {
  return MOCK_OFFERS;
}
