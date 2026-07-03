import type { ApiEnvelope } from "./common";

export type Nested<T> = {
  status: string;
  data: T;
};

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type EmployerListItem = {
  id: string;
  company_name: string;
  is_verified: boolean;
  package_tier: string;
  hire_count: number;
  offers_sent_count: number;
  roles_created_count: number;
  account_age_days: number;
  last_activity_date: string;
};

export type EmployerRoleStatus = "Active" | "Closed";

export type OfferLifecycleStatus =
  | "Sent"
  | "Viewed"
  | "Accepted"
  | "Declined"
  | "Expired"
  | "Withdrawn";

export type EmployerRole = {
  id: string;
  title: string;
  status: EmployerRoleStatus;
};

export type EmployerOffer = {
  id: string;
  candidate_name: string;
  role_title: string;
  status: OfferLifecycleStatus;
  sent_at: string;
};

export type EmployerHire = {
  id: string;
  candidate_name: string;
  role_title: string;
  accepted_at: string;
};

export type EmployerDetail = {
  company_profile: {
    name: string;
    website: string;
    industry: string;
    size: string;
    region: string;
    linkedin: string;
  };
  verification_status: {
    verified: boolean;
    criteria: {
      email_verified: boolean;
      website_resolvable: boolean;
      linkedin_provided: boolean;
    };
    banner_visible: boolean;
  };
  package_and_subscription: {
    package_tier: string;
    subscription_status: string | null;
  };
  roles_created: {
    items: EmployerRole[];
    empty_message: string | null;
  };
  offers_sent: {
    items: EmployerOffer[];
    empty_message: string | null;
  };
  hire_history: {
    hire_count: number;
    items: EmployerHire[];
  };
  account_info: {
    signup_date: string;
    account_age_days: number;
  };
};

export type GetEmployersResponse = ApiEnvelope<
  Nested<Paginated<EmployerListItem>>
>;

export type GetEmployerDetailResponse = ApiEnvelope<Nested<EmployerDetail>>;

export type EmployersQueryParams = {
  page?: number;
  limit?: number;
  is_verified?: boolean;
  region?: string;
  industry?: string;
  search?: string;
};

export type EmployersPage = Paginated<EmployerListItem>;
