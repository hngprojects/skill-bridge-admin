import { useQuery } from "@tanstack/react-query";

import {
  getEmployerPackages,
  getPaymentsStats,
  getRevenueData,
  getSubscriptions,
  getTalentSubscriptionSummary,
  getTransactions,
} from "@/actions/payments";
import type { RevenuePeriod } from "@/types/api/payments";
import { paymentsKeys } from "./keys";

export function usePaymentsStats() {
  return useQuery({
    queryKey: paymentsKeys.stats(),
    queryFn: () => getPaymentsStats(),
    refetchInterval: 60_000,
  });
}

export function useRevenueData(period: RevenuePeriod) {
  return useQuery({
    queryKey: paymentsKeys.revenue(period),
    queryFn: () => getRevenueData(period),
  });
}

export function useEmployerPackages() {
  return useQuery({
    queryKey: paymentsKeys.employerPackages(),
    queryFn: () => getEmployerPackages(),
  });
}

export function useTalentSubscriptionSummary() {
  return useQuery({
    queryKey: paymentsKeys.talentSubscription(),
    queryFn: () => getTalentSubscriptionSummary(),
  });
}

export function useSubscriptions() {
  return useQuery({
    queryKey: paymentsKeys.subscriptions(),
    queryFn: () => getSubscriptions(),
  });
}

export function useTransactions() {
  return useQuery({
    queryKey: paymentsKeys.transactions(),
    queryFn: () => getTransactions(),
  });
}
