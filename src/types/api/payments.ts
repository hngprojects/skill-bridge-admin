export type SubscriberType = "Employer" | "Talent";

export type SubscriptionStatus = "Active" | "Past Due" | "Cancelled" | "Free";

export type TransactionStatus = "Successful" | "Failed" | "Refunded";

export type PaymentsStats = {
  totalRevenue: { value: number; trend: number };
  activeEmployerSubscriptions: { value: number; trend: number };
  activeTalentSubscriptions: { value: number; trend: number };
  failedPayments: { value: number; trend: number };
};

export type RevenuePeriod = "yearly" | "monthly" | "weekly" | "daily";

export type RevenueDataPoint = {
  label: string;
  employerRevenue: number;
  talentRevenue: number;
};

export type RevenueData = {
  period: RevenuePeriod;
  data: RevenueDataPoint[];
};

export type EmployerPackage = {
  id: string;
  name: string;

  monthlyPrice: number | "TBD";
  offersPerMonth: number | "Unlimited" | "TBD";
  otherFeatures: string[];
  activeSubscribers: number;
  mrr: number | "TBD";

  isPending?: boolean;
};

export type Subscription = {
  id: string;
  subscriberName: string;
  subscriberType: SubscriberType;
  packageName: string;
  monthlyPrice: number | null;
  status: SubscriptionStatus;
  startDate: string;
  nextBillingDate: string | null;
  gracePeriodDaysLeft?: number;
};

export type Transaction = {
  id: string;
  subscriberName: string;
  subscriberType: SubscriberType;
  amount: number;
  date: string;
  status: TransactionStatus;
  linkedSubscription: string;
};
