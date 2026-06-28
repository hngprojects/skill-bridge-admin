"use server";

import {
  getMockRevenueData,
  MOCK_EMPLOYER_PACKAGES,
  MOCK_PAYMENTS_STATS,
  MOCK_SUBSCRIPTIONS,
  MOCK_TALENT_SUBSCRIPTION,
  MOCK_TRANSACTIONS,
} from "@/mocks/payments";
import type {
  EmployerPackage,
  PaymentsStats,
  RevenueData,
  RevenuePeriod,
  Subscription,
  Transaction,
} from "@/types/api/payments";

export async function getPaymentsStats(): Promise<PaymentsStats> {
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_PAYMENTS_STATS;
}

export async function getRevenueData(
  period: RevenuePeriod,
): Promise<RevenueData> {
  await new Promise((r) => setTimeout(r, 300));
  return getMockRevenueData(period);
}

export async function getEmployerPackages(): Promise<EmployerPackage[]> {
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_EMPLOYER_PACKAGES;
}

export async function getTalentSubscriptionSummary() {
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_TALENT_SUBSCRIPTION;
}

export async function getSubscriptions(): Promise<Subscription[]> {
  await new Promise((r) => setTimeout(r, 400));
  return MOCK_SUBSCRIPTIONS;
}

export async function getTransactions(): Promise<Transaction[]> {
  await new Promise((r) => setTimeout(r, 400));
  return MOCK_TRANSACTIONS;
}
