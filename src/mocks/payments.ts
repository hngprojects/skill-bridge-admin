import type {
  EmployerPackage,
  PaymentsStats,
  RevenueData,
  RevenuePeriod,
  Subscription,
  Transaction,
} from "@/types/api/payments";

export const MOCK_PAYMENTS_STATS: PaymentsStats = {
  totalRevenue: { value: 284750, trend: 22.1 },
  activeEmployerSubscriptions: { value: 47, trend: 6.8 },
  activeTalentSubscriptions: { value: 312, trend: 14.3 },
  failedPayments: { value: 8, trend: -2 },
};

const REVENUE_BY_PERIOD: Record<RevenuePeriod, RevenueData> = {
  yearly: {
    period: "yearly",
    data: [
      { label: "2021", employerRevenue: 18400, talentRevenue: 6200 },
      { label: "2022", employerRevenue: 34200, talentRevenue: 12800 },
      { label: "2023", employerRevenue: 67800, talentRevenue: 24600 },
      { label: "2024", employerRevenue: 124300, talentRevenue: 48900 },
      { label: "2025", employerRevenue: 198700, talentRevenue: 86050 },
    ],
  },
  monthly: {
    period: "monthly",
    data: [
      { label: "Jan", employerRevenue: 14200, talentRevenue: 5600 },
      { label: "Feb", employerRevenue: 15800, talentRevenue: 6100 },
      { label: "Mar", employerRevenue: 17400, talentRevenue: 6800 },
      { label: "Apr", employerRevenue: 16900, talentRevenue: 6500 },
      { label: "May", employerRevenue: 19200, talentRevenue: 7400 },
      { label: "Jun", employerRevenue: 22100, talentRevenue: 8300 },
      { label: "Jul", employerRevenue: 21400, talentRevenue: 8000 },
      { label: "Aug", employerRevenue: 24600, talentRevenue: 9200 },
      { label: "Sep", employerRevenue: 23100, talentRevenue: 8700 },
      { label: "Oct", employerRevenue: 26800, talentRevenue: 10100 },
      { label: "Nov", employerRevenue: 29400, talentRevenue: 11200 },
      { label: "Dec", employerRevenue: 27850, talentRevenue: 10150 },
    ],
  },
  weekly: {
    period: "weekly",
    data: [
      { label: "Mon", employerRevenue: 3800, talentRevenue: 1400 },
      { label: "Tue", employerRevenue: 4200, talentRevenue: 1600 },
      { label: "Wed", employerRevenue: 3900, talentRevenue: 1500 },
      { label: "Thu", employerRevenue: 4600, talentRevenue: 1800 },
      { label: "Fri", employerRevenue: 4100, talentRevenue: 1600 },
      { label: "Sat", employerRevenue: 1200, talentRevenue: 500 },
      { label: "Sun", employerRevenue: 900, talentRevenue: 380 },
    ],
  },
  daily: {
    period: "daily",
    data: [
      { label: "00:00", employerRevenue: 120, talentRevenue: 48 },
      { label: "02:00", employerRevenue: 80, talentRevenue: 30 },
      { label: "04:00", employerRevenue: 50, talentRevenue: 20 },
      { label: "06:00", employerRevenue: 220, talentRevenue: 88 },
      { label: "08:00", employerRevenue: 680, talentRevenue: 260 },
      { label: "10:00", employerRevenue: 1340, talentRevenue: 510 },
      { label: "12:00", employerRevenue: 1180, talentRevenue: 450 },
      { label: "14:00", employerRevenue: 1420, talentRevenue: 540 },
      { label: "16:00", employerRevenue: 1560, talentRevenue: 590 },
      { label: "18:00", employerRevenue: 980, talentRevenue: 375 },
      { label: "20:00", employerRevenue: 630, talentRevenue: 240 },
      { label: "22:00", employerRevenue: 370, talentRevenue: 141 },
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
    monthlyPrice: 0,
    offersPerMonth: 2,
    otherFeatures: [],
    activeSubscribers: 337,
    mrr: 0,
  },
  {
    id: "tier-2-pending",
    name: "Tier 2 (name TBD)",
    monthlyPrice: "TBD",
    offersPerMonth: "TBD",
    otherFeatures: [],
    activeSubscribers: 0,
    mrr: "TBD",
    isPending: true,
  },
  {
    id: "tier-3-pending",
    name: "Tier 3 (name TBD)",
    monthlyPrice: "TBD",
    offersPerMonth: "TBD",
    otherFeatures: [],
    activeSubscribers: 0,
    mrr: "TBD",
    isPending: true,
  },
];

export const MOCK_TALENT_SUBSCRIPTION = {
  // Single paid tier — monthly price is OQ-05 (pending finalization).
  // Not rendered in the Talent Subscriptions stat cards; kept here only
  // for completeness once a real price is confirmed.
  activeSubscribers: 312,
  mrr: 4676.88,
  churn: 23,
};

function daysAgo(n: number) {
  const d = new Date("2026-06-28");
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
}

function daysFromNow(n: number) {
  const d = new Date("2026-06-28");
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: "s1",
    subscriberName: "TechNova Ltd",
    subscriberType: "Employer",
    packageName: "Growth",
    monthlyPrice: 249,
    status: "Active",
    startDate: daysAgo(120),
    nextBillingDate: daysFromNow(12),
  },
  {
    id: "s2",
    subscriberName: "Chioma Adeyemi",
    subscriberType: "Talent",
    packageName: "Retake Pass",
    monthlyPrice: 14.99,
    status: "Active",
    startDate: daysAgo(45),
    nextBillingDate: daysFromNow(17),
  },
  {
    id: "s3",
    subscriberName: "DataBridge Corp",
    subscriberType: "Employer",
    packageName: "Enterprise",
    monthlyPrice: 799,
    status: "Active",
    startDate: daysAgo(200),
    nextBillingDate: daysFromNow(3),
  },
  {
    id: "s4",
    subscriberName: "Emeka Okafor",
    subscriberType: "Talent",
    packageName: "Retake Pass",
    monthlyPrice: 14.99,
    status: "Past Due",
    startDate: daysAgo(80),
    nextBillingDate: daysAgo(4),
    gracePeriodDaysLeft: 3,
  },
  {
    id: "s5",
    subscriberName: "Kola Systems",
    subscriberType: "Employer",
    packageName: "Free",
    monthlyPrice: null,
    status: "Free",
    startDate: daysAgo(60),
    nextBillingDate: null,
  },
  {
    id: "s6",
    subscriberName: "Bright Solutions Inc",
    subscriberType: "Employer",
    packageName: "Starter",
    monthlyPrice: 99,
    status: "Active",
    startDate: daysAgo(90),
    nextBillingDate: daysFromNow(8),
  },
  {
    id: "s7",
    subscriberName: "Fatima Bello",
    subscriberType: "Talent",
    packageName: "Retake Pass",
    monthlyPrice: 14.99,
    status: "Cancelled",
    startDate: daysAgo(150),
    nextBillingDate: null,
  },
  {
    id: "s8",
    subscriberName: "NextGen Staffing",
    subscriberType: "Employer",
    packageName: "Growth",
    monthlyPrice: 249,
    status: "Active",
    startDate: daysAgo(30),
    nextBillingDate: daysFromNow(2),
  },
  {
    id: "s9",
    subscriberName: "Adaeze Ibe",
    subscriberType: "Talent",
    packageName: "Retake Pass",
    monthlyPrice: 14.99,
    status: "Active",
    startDate: daysAgo(22),
    nextBillingDate: daysFromNow(8),
  },
  {
    id: "s10",
    subscriberName: "CloudPath Africa",
    subscriberType: "Employer",
    packageName: "Starter",
    monthlyPrice: 99,
    status: "Past Due",
    startDate: daysAgo(110),
    nextBillingDate: daysAgo(2),
    gracePeriodDaysLeft: 5,
  },
  {
    id: "s11",
    subscriberName: "Apex Ventures",
    subscriberType: "Employer",
    packageName: "Free",
    monthlyPrice: null,
    status: "Free",
    startDate: daysAgo(15),
    nextBillingDate: null,
  },
  {
    id: "s12",
    subscriberName: "Seun Adebayo",
    subscriberType: "Talent",
    packageName: "Retake Pass",
    monthlyPrice: 14.99,
    status: "Active",
    startDate: daysAgo(7),
    nextBillingDate: daysFromNow(23),
  },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx1",
    subscriberName: "TechNova Ltd",
    subscriberType: "Employer",
    amount: 249,
    date: daysAgo(0),
    status: "Successful",
    linkedSubscription: "Growth",
  },
  {
    id: "tx2",
    subscriberName: "Chioma Adeyemi",
    subscriberType: "Talent",
    amount: 14.99,
    date: daysAgo(1),
    status: "Successful",
    linkedSubscription: "Retake Pass",
  },
  {
    id: "tx3",
    subscriberName: "Emeka Okafor",
    subscriberType: "Talent",
    amount: 14.99,
    date: daysAgo(4),
    status: "Failed",
    linkedSubscription: "Retake Pass",
  },
  {
    id: "tx4",
    subscriberName: "DataBridge Corp",
    subscriberType: "Employer",
    amount: 799,
    date: daysAgo(5),
    status: "Successful",
    linkedSubscription: "Enterprise",
  },
  {
    id: "tx5",
    subscriberName: "Fatima Bello",
    subscriberType: "Talent",
    amount: 14.99,
    date: daysAgo(8),
    status: "Refunded",
    linkedSubscription: "Retake Pass",
  },
  {
    id: "tx6",
    subscriberName: "Bright Solutions Inc",
    subscriberType: "Employer",
    amount: 99,
    date: daysAgo(10),
    status: "Successful",
    linkedSubscription: "Starter",
  },
  {
    id: "tx7",
    subscriberName: "CloudPath Africa",
    subscriberType: "Employer",
    amount: 99,
    date: daysAgo(12),
    status: "Failed",
    linkedSubscription: "Starter",
  },
  {
    id: "tx8",
    subscriberName: "NextGen Staffing",
    subscriberType: "Employer",
    amount: 249,
    date: daysAgo(14),
    status: "Successful",
    linkedSubscription: "Growth",
  },
  {
    id: "tx9",
    subscriberName: "Adaeze Ibe",
    subscriberType: "Talent",
    amount: 14.99,
    date: daysAgo(15),
    status: "Successful",
    linkedSubscription: "Retake Pass",
  },
  {
    id: "tx10",
    subscriberName: "Seun Adebayo",
    subscriberType: "Talent",
    amount: 14.99,
    date: daysAgo(21),
    status: "Successful",
    linkedSubscription: "Retake Pass",
  },
  {
    id: "tx11",
    subscriberName: "DataBridge Corp",
    subscriberType: "Employer",
    amount: 799,
    date: daysAgo(35),
    status: "Successful",
    linkedSubscription: "Enterprise",
  },
  {
    id: "tx12",
    subscriberName: "TechNova Ltd",
    subscriberType: "Employer",
    amount: 249,
    date: daysAgo(30),
    status: "Successful",
    linkedSubscription: "Growth",
  },
];
