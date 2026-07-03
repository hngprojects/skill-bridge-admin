"use server";

import { authApi } from "@/lib/api/clients";
import type { ApiEnvelope } from "@/types/api";
import type {
  EmployerPackage,
  Nested,
  PaymentsStats,
  RevenueData,
  RevenuePeriod,
  Subscription,
  SubscriptionsPage,
  TalentSubscriptionSummary,
  Transaction,
  TransactionsPage,
} from "@/types/api/payments";
import { unwrapData } from "./utils";

export async function getPaymentsStats(): Promise<PaymentsStats> {
  const res = await authApi.get<ApiEnvelope<Nested<PaymentsStats>>>(
    "/admin/payments/stats",
  );
  return unwrapData(res).data;
}

export async function getRevenueData(
  period: RevenuePeriod,
): Promise<RevenueData> {
  const res = await authApi.get<ApiEnvelope<Nested<RevenueData>>>(
    "/admin/payments/revenue-chart",
    { params: { period } },
  );
  return unwrapData(res).data;
}

export async function getEmployerPackages(): Promise<EmployerPackage[]> {
  const res = await authApi.get<ApiEnvelope<Nested<EmployerPackage[]>>>(
    "/admin/payments/employer-packages",
  );
  return unwrapData(res).data;
}

export async function getTalentSubscriptionSummary(): Promise<TalentSubscriptionSummary> {
  const res = await authApi.get<ApiEnvelope<Nested<TalentSubscriptionSummary>>>(
    "/admin/payments/talent-subscriptions",
  );
  return unwrapData(res).data;
}

export async function getSubscriptions(): Promise<Subscription[]> {
  const res = await authApi.get<ApiEnvelope<Nested<SubscriptionsPage>>>(
    "/admin/payments/subscriptions",
    { params: { page: 1, limit: 20 } },
  );
  return unwrapData(res).data.items;
}

export async function getTransactions(): Promise<Transaction[]> {
  const res = await authApi.get<ApiEnvelope<Nested<TransactionsPage>>>(
    "/admin/payments/transactions",
    { params: { page: 1, limit: 20 } },
  );
  return unwrapData(res).data.items;
}
