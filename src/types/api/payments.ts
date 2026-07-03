export type SubscriberType = "employer" | "talent";

export type SubscriptionStatus = "active" | "past_due" | "cancelled" | "free";

export type TransactionStatus = "successful" | "failed" | "refunded";

export type PaymentsStats = {
  total_revenue: { value: number; currency: string };
  active_employer_subscriptions: number;
  active_talent_subscriptions: number;
  failed_payment_count: number;
};

export type RevenuePeriod = "yearly" | "monthly" | "weekly" | "daily";

export type RevenueEntry = { period: string; amount: number };

export type RevenueData = {
  employer_revenue: RevenueEntry[];
  talent_revenue: RevenueEntry[];
};

export type EmployerPackage = {
  id: string;
  name: string;
  price: number;
  offer_limit: number | null;
  features: string[] | null;
  is_free: boolean;
};

export type TalentSubscriptionSummary = {
  total_active: number;
  total_cancelled: number;
  monthly_price: number | null;
};

export type Subscription = {
  id: string;
  subscriber_name: string;
  type: SubscriberType;
  package_tier: string;
  monthly_price: number | null;
  status: SubscriptionStatus;
  start_date: string;
  next_billing_date: string | null;
  days_left_in_grace: number | null;
};

export type Transaction = {
  id: string;
  subscriber_name: string;
  type: SubscriberType;
  amount: number;
  currency: string;
  date: string;
  status: TransactionStatus;
  linked_subscription_id: string;
};

export type AccountSettings = {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin" | "reviewer";
  admin_tier: string;
  role_badge: string;
};
