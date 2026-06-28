import type { SubscriptionStatus } from "./talents";

export type EmployerVerificationStatus = "Verified" | "Pending" | "Unverified";

export const EMPLOYER_PACKAGE_TIERS = [
  "Free",
  "Growth",
  "Scale",
  "Enterprise",
] as const;

export type EmployerPackageTier = (typeof EMPLOYER_PACKAGE_TIERS)[number];

export const EMPLOYER_INDUSTRIES = [
  "Fintech",
  "Healthtech",
  "E-commerce",
  "EdTech",
  "Logistics",
  "Gaming",
] as const;
export type EmployerIndustry = (typeof EMPLOYER_INDUSTRIES)[number];

export const EMPLOYER_REGIONS = [
  "North America",
  "Europe",
  "Africa",
  "Asia",
  "South America",
] as const;
export type EmployerRegion = (typeof EMPLOYER_REGIONS)[number];

export type EmployerListItem = {
  id: string;
  companyName: string;
  verificationStatus: EmployerVerificationStatus;
  packageTier: EmployerPackageTier;
  hireCount: number;
  offersSent: number;
  rolesCreated: number;
  signupDate: string;
  lastActivityDate: string;
  region: EmployerRegion;
  industry: EmployerIndustry;
};

export type EmployerRoleStatus = "Active" | "Closed";

export type OfferLifecycleStatus =
  | "Sent"
  | "Viewed"
  | "Accepted"
  | "Declined"
  | "Expired"
  | "Withdrawn";

export type EmployerVerificationCriterion = {
  label: string;
  met: boolean;
};

export type EmployerRole = {
  id: string;
  title: string;
  status: EmployerRoleStatus;
  createdAt: string;
};

export type EmployerOffer = {
  id: string;
  candidateName: string;
  roleTitle: string;
  status: OfferLifecycleStatus;
  sentAt: string;
};

export type EmployerHire = {
  id: string;
  candidateName: string;
  roleTitle: string;
  acceptedAt: string;
};

export type EmployerDetail = {
  id: string;
  companyName: string;
  website: string;
  industry: EmployerIndustry;
  size: string;
  region: EmployerRegion;
  linkedinUrl: string;

  verificationStatus: EmployerVerificationStatus;
  verificationCriteria: EmployerVerificationCriterion[];

  packageTier: EmployerPackageTier;
  subscriptionStatus: SubscriptionStatus | null;

  rolesCreated: EmployerRole[];
  offersSent: EmployerOffer[];

  hireCount: number;
  hireHistory: EmployerHire[];

  signupDate: string;
};
