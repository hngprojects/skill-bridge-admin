import type {
  OfferFunnelData,
  OfferListItem,
  OffersStats,
} from "@/types/api/offers";

export const MOCK_OFFERS_STATS: OffersStats = {
  totalOffersSent: {
    value: 284,
    trend: 12,
  },
  offerAcceptanceRate: {
    value: 46,
    trend: 6,
  },
  offerToHireRate: {
    value: 31,
    trend: 4,
  },
  averageTimeToHire: {
    value: "8.4 days",
    trend: -9,
  },
};

export const MOCK_OFFERS_FUNNEL: OfferFunnelData = {
  stages: [
    {
      stage: "Pending",
      count: 284,
      segments: [
        {
          label: "Pending",
          count: 284,
          status: "pending",
        },
      ],
    },
    {
      stage: "Assessment Unlocked",
      count: 236,
      dropOffPercent: 17,
      segments: [
        {
          label: "Assessment Unlocked",
          count: 236,
          status: "assessment_unlocked",
        },
      ],
    },
    {
      stage: "Assessment Completed",
      count: 198,
      dropOffPercent: 16,
      segments: [
        {
          label: "Assessment Completed",
          count: 198,
          status: "assessment_completed",
        },
      ],
    },
    {
      stage: "Passed / Failed",
      count: 172,
      dropOffPercent: 13,
      segments: [
        {
          label: "Passed",
          count: 128,
          status: "passed",
        },
        {
          label: "Failed",
          count: 44,
          status: "failed",
        },
      ],
    },
    {
      stage: "Accepted / Declined / Expired",
      count: 131,
      dropOffPercent: 24,
      segments: [
        {
          label: "Accepted",
          count: 78,
          status: "accepted",
        },
        {
          label: "Declined",
          count: 34,
          status: "declined",
        },
        {
          label: "Expired",
          count: 19,
          status: "expired",
        },
      ],
    },
  ],
};

export const MOCK_OFFERS: OfferListItem[] = [
  {
    id: "offer-001",
    candidateName: "Ada Okafor",
    employerName: "Northstar Labs",
    role: "Frontend Engineer",
    status: "Accepted",
    dateSent: "2026-06-03",
    dateResolved: "2026-06-11",
  },
  {
    id: "offer-002",
    candidateName: "Tobi Adebayo",
    employerName: "Paywise Africa",
    role: "Backend Engineer",
    status: "Assessment Unlocked",
    dateSent: "2026-06-07",
    dateResolved: null,
  },
  {
    id: "offer-003",
    candidateName: "Mariam Bello",
    employerName: "Credify",
    role: "Product Designer",
    status: "Passed",
    dateSent: "2026-06-09",
    dateResolved: null,
  },
  {
    id: "offer-004",
    candidateName: "Daniel Mensah",
    employerName: "BridgePay",
    role: "Mobile Engineer",
    status: "Declined",
    dateSent: "2026-05-26",
    dateResolved: "2026-06-01",
  },
  {
    id: "offer-005",
    candidateName: "Kelechi Nwosu",
    employerName: "Stacklane",
    role: "Data Analyst",
    status: "Pending",
    dateSent: "2026-06-14",
    dateResolved: null,
  },
  {
    id: "offer-006",
    candidateName: "Ife Hassan",
    employerName: "Mondera",
    role: "QA Engineer",
    status: "Failed",
    dateSent: "2026-05-21",
    dateResolved: "2026-05-25",
  },
  {
    id: "offer-007",
    candidateName: "Samuel Eze",
    employerName: "TalentForge",
    role: "DevOps Engineer",
    status: "Expired",
    dateSent: "2026-05-12",
    dateResolved: "2026-05-26",
  },
  {
    id: "offer-008",
    candidateName: "Grace Udo",
    employerName: "ScaleGrid",
    role: "Product Manager",
    status: "Assessment Completed",
    dateSent: "2026-06-10",
    dateResolved: null,
  },
];
