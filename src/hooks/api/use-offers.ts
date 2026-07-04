"use client";

import { useQuery } from "@tanstack/react-query";

import { getOffers, getOffersFunnel, getOffersStats } from "@/actions/offers";
import type {
  OffersDateRangeParams,
  OffersListParams,
} from "@/types/api/offers";

import { offersKeys } from "./keys";

export function useOffersStats(params?: OffersDateRangeParams) {
  return useQuery({
    queryKey: offersKeys.stats(params),
    queryFn: () => getOffersStats(params),
    refetchInterval: 60_000,
  });
}

export function useOffersFunnel(params?: OffersDateRangeParams) {
  return useQuery({
    queryKey: offersKeys.funnel(params),
    queryFn: () => getOffersFunnel(params),
  });
}

export function useOffers(params?: OffersListParams) {
  return useQuery({
    queryKey: offersKeys.list(params),
    queryFn: () => getOffers(params),
  });
}
