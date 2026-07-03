import type {
  EmployerPackage,
  PaymentsStats,
  RevenueData,
  RevenuePeriod,
  Subscription,
  TalentSubscriptionSummary,
  Transaction,
} from "@/types/api/payments";

export const MOCK_PAYMENTS_STATS: PaymentsStats = {
  total_revenue: { value: 284750, currency: "USD" },
  active_employer_subscriptions: 47,
  active_talent_subscriptions: 312,
  failed_payment_count: 8,
};

const REVENUE_BY_PERIOD: Record<RevenuePeriod, RevenueData> = {
  yearly: {
    employer_revenue: [
      { period: "2021-01-01T00:00:00.000Z", amount: 18400 },
      { period: "2022-01-01T00:00:00.000Z", amount: 34200 },
      { period: "2023-01-01T00:00:00.000Z", amount: 67800 },
      { period: "2024-01-01T00:00:00.000Z", amount: 124300 },
      { period: "2025-01-01T00:00:00.000Z", amount: 198700 },
    ],
    talent_revenue: [
      { period: "2021-01-01T00:00:00.000Z", amount: 6200 },
      { period: "2022-01-01T00:00:00.000Z", amount: 12800 },
      { period: "2023-01-01T00:00:00.000Z", amount: 24600 },
      { period: "2024-01-01T00:00:00.000Z", amount: 48900 },
      { period: "2025-01-01T00:00:00.000Z", amount: 86050 },
    ],
  },
  monthly: {
    employer_revenue: [
      { period: "2026-01-01T00:00:00.000Z", amount: 14200 },
      { period: "2026-02-01T00:00:00.000Z", amount: 15800 },
      { period: "2026-03-01T00:00:00.000Z", amount: 17400 },
      { period: "2026-04-01T00:00:00.000Z", amount: 16900 },
      { period: "2026-05-01T00:00:00.000Z", amount: 19200 },
      { period: "2026-06-01T00:00:00.000Z", amount: 22100 },
    ],
    talent_revenue: [
      { period: "2026-01-01T00:00:00.000Z", amount: 5600 },
      { period: "2026-02-01T00:00:00.000Z", amount: 6100 },
      { period: "2026-03-01T00:00:00.000Z", amount: 6800 },
      { period: "2026-04-01T00:00:00.000Z", amount: 6500 },
      { period: "2026-05-01T00:00:00.000Z", amount: 7400 },
      { period: "2026-06-01T00:00:00.000Z", amount: 8300 },
    ],
  },
  weekly: {
    employer_revenue: [
      { period: "2026-06-22T00:00:00.000Z", amount: 3800 },
      { period: "2026-06-23T00:00:00.000Z", amount: 4200 },
      { period: "2026-06-24T00:00:00.000Z", amount: 3900 },
      { period: "2026-06-25T00:00:00.000Z", amount: 4600 },
      { period: "2026-06-26T00:00:00.000Z", amount: 4100 },
      { period: "2026-06-27T00:00:00.000Z", amount: 1200 },
      { period: "2026-06-28T00:00:00.000Z", amount: 900 },
    ],
    talent_revenue: [
      { period: "2026-06-22T00:00:00.000Z", amount: 1400 },
      { period: "2026-06-23T00:00:00.000Z", amount: 1600 },
      { period: "2026-06-24T00:00:00.000Z", amount: 1500 },
      { period: "2026-06-25T00:00:00.000Z", amount: 1800 },
      { period: "2026-06-26T00:00:00.000Z", amount: 1600 },
      { period: "2026-06-27T00:00:00.000Z", amount: 500 },
      { period: "2026-06-28T00:00:00.000Z", amount: 380 },
    ],
  },
  daily: {
    employer_revenue: [
      { period: "2026-06-28T00:00:00.000Z", amount: 120 },
      { period: "2026-06-28T04:00:00.000Z", amount: 50 },
      { period: "2026-06-28T08:00:00.000Z", amount: 680 },
      { period: "2026-06-28T12:00:00.000Z", amount: 1180 },
      { period: "2026-06-28T16:00:00.000Z", amount: 1560 },
      { period: "2026-06-28T20:00:00.000Z", amount: 630 },
    ],
    talent_revenue: [
      { period: "2026-06-28T00:00:00.000Z", amount: 48 },
      { period: "2026-06-28T04:00:00.000Z", amount: 20 },
      { period: "2026-06-28T08:00:00.000Z", amount: 260 },
      { period: "2026-06-28T12:00:00.000Z", amount: 450 },
      { period: "2026-06-28T16:00:00.000Z", amount: 590 },
      { period: "2026-06-28T20:00:00.000Z", amount: 240 },
    ],
  },
};

export function getMockRevenueData(period: RevenuePeriod): RevenueData {
  return REVENUE_BY_PERIOD[period];
}

export const MOCK_EMPLOYER_PACKAGES: EmployerPackage[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    offer_limit: 2,
    features: null,
    is_free: true,
  },
  {
    id: "starter",
    name: "Starter",
    price: 99,
    offer_limit: 10,
    features: ["Priority support", "Bulk exports"],
    is_free: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: 249,
    offer_limit: 30,
    features: ["Priority support", "Bulk exports", "API access"],
    is_free: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 799,
    offer_limit: null,
    features: ["Dedicated support", "Unlimited seats"],
    is_free: false,
  },
];

export const MOCK_TALENT_SUBSCRIPTION: TalentSubscriptionSummary = {
  total_active: 312,
  total_cancelled: 23,
  monthly_price: 14.99,
};

function daysAgo(n: number) {
  const d = new Date("2026-06-28");
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

function daysFromNow(n: number) {
  const d = new Date("2026-06-28");
  d.setDate(d.getDate() + n);
  return d.toISOString();
}

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: "s1",
    subscriber_name: "TechNova Ltd",
    type: "employer",
    package_tier: "Growth",
    monthly_price: 249,
    status: "active",
    start_date: daysAgo(120),
    next_billing_date: daysFromNow(12),
    days_left_in_grace: null,
  },
  {
    id: "s2",
    subscriber_name: "Chioma Adeyemi",
    type: "talent",
    package_tier: "Retake Pass",
    monthly_price: 14.99,
    status: "active",
    start_date: daysAgo(45),
    next_billing_date: daysFromNow(17),
    days_left_in_grace: null,
  },
  {
    id: "s3",
    subscriber_name: "DataBridge Corp",
    type: "employer",
    package_tier: "Enterprise",
    monthly_price: 799,
    status: "active",
    start_date: daysAgo(200),
    next_billing_date: daysFromNow(3),
    days_left_in_grace: null,
  },
  {
    id: "s4",
    subscriber_name: "Emeka Okafor",
    type: "talent",
    package_tier: "Retake Pass",
    monthly_price: 14.99,
    status: "past_due",
    start_date: daysAgo(80),
    next_billing_date: daysAgo(4),
    days_left_in_grace: 3,
  },
  {
    id: "s5",
    subscriber_name: "Kola Systems",
    type: "employer",
    package_tier: "Free",
    monthly_price: null,
    status: "free",
    start_date: daysAgo(60),
    next_billing_date: null,
    days_left_in_grace: null,
  },
  {
    id: "s6",
    subscriber_name: "Bright Solutions Inc",
    type: "employer",
    package_tier: "Starter",
    monthly_price: 99,
    status: "active",
    start_date: daysAgo(90),
    next_billing_date: daysFromNow(8),
    days_left_in_grace: null,
  },
  {
    id: "s7",
    subscriber_name: "Fatima Bello",
    type: "talent",
    package_tier: "Retake Pass",
    monthly_price: 14.99,
    status: "cancelled",
    start_date: daysAgo(150),
    next_billing_date: null,
    days_left_in_grace: null,
  },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx1",
    subscriber_name: "TechNova Ltd",
    type: "employer",
    amount: 249,
    currency: "USD",
    date: daysAgo(0),
    status: "successful",
    linked_subscription_id: "s1",
  },
  {
    id: "tx2",
    subscriber_name: "Chioma Adeyemi",
    type: "talent",
    amount: 14.99,
    currency: "USD",
    date: daysAgo(1),
    status: "successful",
    linked_subscription_id: "s2",
  },
  {
    id: "tx3",
    subscriber_name: "Emeka Okafor",
    type: "talent",
    amount: 14.99,
    currency: "USD",
    date: daysAgo(4),
    status: "failed",
    linked_subscription_id: "s4",
  },
  {
    id: "tx4",
    subscriber_name: "DataBridge Corp",
    type: "employer",
    amount: 799,
    currency: "USD",
    date: daysAgo(5),
    status: "successful",
    linked_subscription_id: "s3",
  },
  {
    id: "tx5",
    subscriber_name: "Fatima Bello",
    type: "talent",
    amount: 14.99,
    currency: "USD",
    date: daysAgo(8),
    status: "refunded",
    linked_subscription_id: "s7",
  },
];
