"use client";

import { useQuery } from "@tanstack/react-query";

import { getOffers, getOffersFunnel, getOffersStats } from "@/actions/offers";

import { offersKeys } from "./keys";

export function useOffersStats() {
  return useQuery({
    queryKey: offersKeys.stats(),
    queryFn: getOffersStats,
    refetchInterval: 60_000,
  });
}

export function useOffersFunnel() {
  return useQuery({
    queryKey: offersKeys.funnel(),
    queryFn: getOffersFunnel,
  });
}

export function useOffers() {
  return useQuery({
    queryKey: offersKeys.list(),
    queryFn: getOffers,
  });
}
