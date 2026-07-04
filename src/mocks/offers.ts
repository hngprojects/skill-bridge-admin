import type {
  OfferFunnelData,
  OfferListItem,
  OffersStats,
} from "@/types/api/offers";

export const MOCK_OFFERS_STATS: OffersStats = {
  totalOffersSent: {
    value: 312,
    trend: 12,
  },
  offerAcceptanceRate: {
    value: 48,
    trend: 6,
  },
  offerToHireRate: {
    value: 25,
    trend: 4,
  },
  averageTimeToHire: {
    value: "6 days",
    trend: -2,
  },
};

export const MOCK_OFFERS_FUNNEL: OfferFunnelData = {
  total: 312,
  empty: false,
  stages: [
    {
      stage: "Pending",
      count: 312,
      segments: [
        {
          label: "Pending",
          count: 312,
          status: "pending",
        },
      ],
    },
    {
      stage: "Assessment Unlocked",
      count: 246,
      dropOffPercent: 21,
      segments: [
        {
          label: "Assessment Unlocked",
          count: 246,
          status: "assessment_unlocked",
        },
      ],
    },
    {
      stage: "Assessment Completed",
      count: 172,
      dropOffPercent: 30,
      segments: [
        {
          label: "Assessment Completed",
          count: 172,
          status: "assessment_completed",
        },
      ],
    },
    {
      stage: "Passed",
      count: 128,
      dropOffPercent: 26,
      segments: [
        {
          label: "Passed",
          count: 128,
          status: "passed",
        },
      ],
    },
    {
      stage: "Failed",
      count: 44,
      segments: [
        {
          label: "Failed",
          count: 44,
          status: "failed",
        },
      ],
    },
    {
      stage: "Accepted",
      count: 78,
      dropOffPercent: 39,
      segments: [
        {
          label: "Accepted",
          count: 78,
          status: "accepted",
        },
      ],
    },
    {
      stage: "Declined",
      count: 34,
      segments: [
        {
          label: "Declined",
          count: 34,
          status: "declined",
        },
      ],
    },
    {
      stage: "Expired",
      count: 19,
      segments: [
        {
          label: "Expired",
          count: 19,
          status: "expired",
        },
      ],
    },
    {
      stage: "Hired",
      count: 62,
      segments: [
        {
          label: "Hired",
          count: 62,
          status: "hired",
        },
      ],
    },
    {
      stage: "Withdrawn",
      count: 11,
      segments: [
        {
          label: "Withdrawn",
          count: 11,
          status: "withdrawn",
        },
      ],
    },
  ],
};

export const MOCK_OFFERS: OfferListItem[] = [
  {
    id: "offer-001",
    candidateName: "Amina Yusuf",
    employerName: "BridgePay",
    role: "Frontend Engineer",
    status: "Pending",
    dateSent: "2026-06-01",
    dateResolved: null,
  },
  {
    id: "offer-002",
    candidateName: "Tolu Adeyemi",
    employerName: "CredLane",
    role: "Product Designer",
    status: "Assessment Unlocked",
    dateSent: "2026-06-03",
    dateResolved: null,
  },
  {
    id: "offer-003",
    candidateName: "Chinedu Okafor",
    employerName: "NovaWorks",
    role: "Backend Engineer",
    status: "Assessment Completed",
    dateSent: "2026-06-05",
    dateResolved: null,
  },
  {
    id: "offer-004",
    candidateName: "Sarah Ibrahim",
    employerName: "TalentGrid",
    role: "Data Analyst",
    status: "Passed",
    dateSent: "2026-06-07",
    dateResolved: "2026-06-09",
  },
  {
    id: "offer-005",
    candidateName: "David Mensah",
    employerName: "SkillBridge",
    role: "QA Engineer",
    status: "Failed",
    dateSent: "2026-06-08",
    dateResolved: "2026-06-10",
  },
  {
    id: "offer-006",
    candidateName: "Mariam Bello",
    employerName: "HireBase",
    role: "Product Manager",
    status: "Accepted",
    dateSent: "2026-06-10",
    dateResolved: "2026-06-12",
  },
  {
    id: "offer-007",
    candidateName: "Daniel Eze",
    employerName: "BridgePay",
    role: "Mobile Engineer",
    status: "Declined",
    dateSent: "2026-06-11",
    dateResolved: "2026-06-14",
  },
  {
    id: "offer-008",
    candidateName: "Kemi Johnson",
    employerName: "CredLane",
    role: "Growth Associate",
    status: "Expired",
    dateSent: "2026-06-12",
    dateResolved: "2026-06-19",
  },
  {
    id: "offer-009",
    candidateName: "Ifeanyi Nwosu",
    employerName: "NovaWorks",
    role: "DevOps Engineer",
    status: "Hired",
    dateSent: "2026-06-15",
    dateResolved: "2026-06-20",
  },
  {
    id: "offer-010",
    candidateName: "Zainab Musa",
    employerName: "TalentGrid",
    role: "UX Researcher",
    status: "Withdrawn",
    dateSent: "2026-06-16",
    dateResolved: "2026-06-18",
  },
];
