import type { SubscriptionStatus } from "@/types/api/talents";
import type {
  EmployerDetail,
  EmployerHire,
  EmployerListItem,
  EmployerOffer,
  EmployerRole,
  OfferLifecycleStatus,
} from "@/types/api/employers";

export const MOCK_EMPLOYERS: EmployerListItem[] = [
  {
    id: "e01",
    companyName: "Paystack",
    verificationStatus: "Verified",
    packageTier: "Enterprise",
    hireCount: 42,
    offersSent: 96,
    rolesCreated: 18,
    signupDate: "2022-03-14",
    lastActivityDate: "2025-06-26",
    region: "Africa",
    industry: "Fintech",
  },
  {
    id: "e02",
    companyName: "Flutterwave",
    verificationStatus: "Verified",
    packageTier: "Scale",
    hireCount: 31,
    offersSent: 74,
    rolesCreated: 14,
    signupDate: "2022-07-02",
    lastActivityDate: "2025-06-25",
    region: "Africa",
    industry: "Fintech",
  },
  {
    id: "e03",
    companyName: "Helium Health",
    verificationStatus: "Verified",
    packageTier: "Growth",
    hireCount: 12,
    offersSent: 28,
    rolesCreated: 7,
    signupDate: "2023-01-19",
    lastActivityDate: "2025-06-22",
    region: "Africa",
    industry: "Healthtech",
  },
  {
    id: "e04",
    companyName: "Jumia",
    verificationStatus: "Verified",
    packageTier: "Enterprise",
    hireCount: 58,
    offersSent: 132,
    rolesCreated: 23,
    signupDate: "2021-11-08",
    lastActivityDate: "2025-06-24",
    region: "Africa",
    industry: "E-commerce",
  },
  {
    id: "e05",
    companyName: "uLesson",
    verificationStatus: "Pending",
    packageTier: "Growth",
    hireCount: 6,
    offersSent: 19,
    rolesCreated: 5,
    signupDate: "2023-05-30",
    lastActivityDate: "2025-06-18",
    region: "Africa",
    industry: "EdTech",
  },
  {
    id: "e06",
    companyName: "Kobo360",
    verificationStatus: "Pending",
    packageTier: "Free",
    hireCount: 2,
    offersSent: 8,
    rolesCreated: 3,
    signupDate: "2024-02-11",
    lastActivityDate: "2025-06-10",
    region: "Africa",
    industry: "Logistics",
  },
  {
    id: "e07",
    companyName: "Stripe",
    verificationStatus: "Verified",
    packageTier: "Enterprise",
    hireCount: 73,
    offersSent: 154,
    rolesCreated: 29,
    signupDate: "2021-06-21",
    lastActivityDate: "2025-06-27",
    region: "North America",
    industry: "Fintech",
  },
  {
    id: "e08",
    companyName: "Shopify",
    verificationStatus: "Verified",
    packageTier: "Scale",
    hireCount: 39,
    offersSent: 88,
    rolesCreated: 16,
    signupDate: "2022-09-15",
    lastActivityDate: "2025-06-23",
    region: "North America",
    industry: "E-commerce",
  },
  {
    id: "e09",
    companyName: "Oscar Health",
    verificationStatus: "Pending",
    packageTier: "Growth",
    hireCount: 9,
    offersSent: 24,
    rolesCreated: 6,
    signupDate: "2023-08-04",
    lastActivityDate: "2025-06-15",
    region: "North America",
    industry: "Healthtech",
  },
  {
    id: "e10",
    companyName: "Duolingo",
    verificationStatus: "Verified",
    packageTier: "Scale",
    hireCount: 21,
    offersSent: 52,
    rolesCreated: 11,
    signupDate: "2022-12-01",
    lastActivityDate: "2025-06-21",
    region: "North America",
    industry: "EdTech",
  },
  {
    id: "e11",
    companyName: "Revolut",
    verificationStatus: "Verified",
    packageTier: "Enterprise",
    hireCount: 47,
    offersSent: 109,
    rolesCreated: 20,
    signupDate: "2021-09-27",
    lastActivityDate: "2025-06-26",
    region: "Europe",
    industry: "Fintech",
  },
  {
    id: "e12",
    companyName: "Zalando",
    verificationStatus: "Verified",
    packageTier: "Scale",
    hireCount: 28,
    offersSent: 63,
    rolesCreated: 13,
    signupDate: "2022-04-19",
    lastActivityDate: "2025-06-20",
    region: "Europe",
    industry: "E-commerce",
  },
  {
    id: "e13",
    companyName: "Babylon Health",
    verificationStatus: "Unverified",
    packageTier: "Free",
    hireCount: 0,
    offersSent: 4,
    rolesCreated: 2,
    signupDate: "2024-06-08",
    lastActivityDate: "2025-05-29",
    region: "Europe",
    industry: "Healthtech",
  },
  {
    id: "e14",
    companyName: "GoStudent",
    verificationStatus: "Pending",
    packageTier: "Growth",
    hireCount: 7,
    offersSent: 17,
    rolesCreated: 5,
    signupDate: "2023-10-12",
    lastActivityDate: "2025-06-14",
    region: "Europe",
    industry: "EdTech",
  },
  {
    id: "e15",
    companyName: "Grab",
    verificationStatus: "Verified",
    packageTier: "Enterprise",
    hireCount: 51,
    offersSent: 118,
    rolesCreated: 22,
    signupDate: "2021-12-15",
    lastActivityDate: "2025-06-25",
    region: "Asia",
    industry: "Logistics",
  },
  {
    id: "e16",
    companyName: "Razorpay",
    verificationStatus: "Verified",
    packageTier: "Scale",
    hireCount: 34,
    offersSent: 79,
    rolesCreated: 15,
    signupDate: "2022-06-07",
    lastActivityDate: "2025-06-24",
    region: "Asia",
    industry: "Fintech",
  },
  {
    id: "e17",
    companyName: "Sea Limited",
    verificationStatus: "Pending",
    packageTier: "Growth",
    hireCount: 11,
    offersSent: 31,
    rolesCreated: 8,
    signupDate: "2023-03-22",
    lastActivityDate: "2025-06-12",
    region: "Asia",
    industry: "Gaming",
  },
  {
    id: "e18",
    companyName: "Byju's",
    verificationStatus: "Unverified",
    packageTier: "Free",
    hireCount: 1,
    offersSent: 6,
    rolesCreated: 2,
    signupDate: "2024-04-30",
    lastActivityDate: "2025-06-03",
    region: "Asia",
    industry: "EdTech",
  },
  {
    id: "e19",
    companyName: "Nubank",
    verificationStatus: "Verified",
    packageTier: "Enterprise",
    hireCount: 44,
    offersSent: 101,
    rolesCreated: 19,
    signupDate: "2021-10-05",
    lastActivityDate: "2025-06-26",
    region: "South America",
    industry: "Fintech",
  },
  {
    id: "e20",
    companyName: "Rappi",
    verificationStatus: "Verified",
    packageTier: "Scale",
    hireCount: 26,
    offersSent: 58,
    rolesCreated: 12,
    signupDate: "2022-08-23",
    lastActivityDate: "2025-06-19",
    region: "South America",
    industry: "Logistics",
  },
  {
    id: "e21",
    companyName: "MercadoLibre",
    verificationStatus: "Pending",
    packageTier: "Growth",
    hireCount: 14,
    offersSent: 36,
    rolesCreated: 9,
    signupDate: "2023-07-17",
    lastActivityDate: "2025-06-16",
    region: "South America",
    industry: "E-commerce",
  },
  {
    id: "e22",
    companyName: "Wildlife Studios",
    verificationStatus: "Unverified",
    packageTier: "Free",
    hireCount: 0,
    offersSent: 3,
    rolesCreated: 1,
    signupDate: "2024-09-02",
    lastActivityDate: "2025-05-27",
    region: "South America",
    industry: "Gaming",
  },
  {
    id: "e23",
    companyName: "Andela",
    verificationStatus: "Verified",
    packageTier: "Growth",
    hireCount: 19,
    offersSent: 47,
    rolesCreated: 10,
    signupDate: "2023-02-08",
    lastActivityDate: "2025-06-22",
    region: "Africa",
    industry: "EdTech",
  },
  {
    id: "e24",
    companyName: "Carbon",
    verificationStatus: "Pending",
    packageTier: "Free",
    hireCount: 3,
    offersSent: 11,
    rolesCreated: 4,
    signupDate: "2024-01-25",
    lastActivityDate: "2025-06-09",
    region: "Africa",
    industry: "Fintech",
  },
];

const SIZE_BANDS = [
  "1–10 employees",
  "11–50 employees",
  "51–200 employees",
  "201–500 employees",
  "500+ employees",
];

const ROLE_TITLES = [
  "Senior Frontend Engineer",
  "Backend Engineer",
  "Product Designer",
  "DevOps Engineer",
  "Data Scientist",
  "Engineering Manager",
  "Mobile Engineer",
  "QA Engineer",
];

const CANDIDATE_NAMES = [
  "Chioma Adeyemi",
  "Emeka Okafor",
  "Fatima Bello",
  "Seun Adebayo",
  "Ngozi Eze",
  "Tunde Fashola",
  "Amara Nwosu",
  "Zara Musa",
];

const OFFER_STATUSES: OfferLifecycleStatus[] = [
  "Accepted",
  "Viewed",
  "Sent",
  "Declined",
  "Expired",
  "Withdrawn",
];

function buildRoles(count: number, idNum: number): EmployerRole[] {
  return Array.from({ length: Math.min(count, 8) }, (_, i) => ({
    id: `role-${idNum}-${i}`,
    title: ROLE_TITLES[(idNum + i) % ROLE_TITLES.length],
    status: (idNum + i) % 3 === 0 ? "Closed" : "Active",
    createdAt: `2024-${String(((idNum + i) % 12) + 1).padStart(2, "0")}-05`,
  }));
}

function buildOffers(count: number, idNum: number): EmployerOffer[] {
  return Array.from({ length: Math.min(count, 8) }, (_, i) => ({
    id: `offer-${idNum}-${i}`,
    candidateName: CANDIDATE_NAMES[(idNum + i) % CANDIDATE_NAMES.length],
    roleTitle: ROLE_TITLES[(idNum + i + 2) % ROLE_TITLES.length],
    status: OFFER_STATUSES[(idNum + i) % OFFER_STATUSES.length],
    sentAt: `2025-${String(((idNum + i) % 6) + 1).padStart(2, "0")}-12`,
  }));
}

function buildHires(count: number, idNum: number): EmployerHire[] {
  return Array.from({ length: Math.min(count, 6) }, (_, i) => ({
    id: `hire-${idNum}-${i}`,
    candidateName: CANDIDATE_NAMES[(idNum + i + 1) % CANDIDATE_NAMES.length],
    roleTitle: ROLE_TITLES[(idNum + i + 4) % ROLE_TITLES.length],
    acceptedAt: `2025-${String(((idNum + i) % 5) + 1).padStart(2, "0")}-20`,
  }));
}

export function getMockEmployerDetail(id: string): EmployerDetail {
  const item = MOCK_EMPLOYERS.find((e) => e.id === id);

  const companyName = item?.companyName ?? "Unknown Company";
  const industry = item?.industry ?? "Fintech";
  const region = item?.region ?? "Africa";
  const packageTier = item?.packageTier ?? "Free";
  const verificationStatus = item?.verificationStatus ?? "Pending";
  const signupDate = item?.signupDate ?? "2024-01-01";
  const hireCount = item?.hireCount ?? 0;

  const idNum = parseInt(id.replace(/\D/g, ""), 10) || 1;

  const criteriaMet: [boolean, boolean, boolean] =
    verificationStatus === "Verified"
      ? [true, true, true]
      : verificationStatus === "Pending"
        ? [true, idNum % 2 === 0, false]
        : [false, false, false];

  const subscriptionStatus: SubscriptionStatus | null =
    packageTier === "Free"
      ? null
      : idNum % 7 === 0
        ? "Past Due"
        : idNum % 11 === 0
          ? "Cancelled"
          : "Active";

  const slug = companyName.toLowerCase().replace(/[^a-z0-9]+/g, "");

  return {
    id,
    companyName,
    website: `https://www.${slug}.com`,
    industry,
    size: SIZE_BANDS[idNum % SIZE_BANDS.length],
    region,
    linkedinUrl: `https://www.linkedin.com/company/${slug}`,

    verificationStatus,
    verificationCriteria: [
      { label: "Business registration", met: criteriaMet[0] },
      { label: "Company domain verified", met: criteriaMet[1] },
      { label: "Payment method on file", met: criteriaMet[2] },
    ],

    packageTier,
    subscriptionStatus,

    rolesCreated: buildRoles(item?.rolesCreated ?? 0, idNum),
    offersSent: buildOffers(item?.offersSent ?? 0, idNum),

    hireCount,
    hireHistory: buildHires(hireCount, idNum),

    signupDate,
  };
}
