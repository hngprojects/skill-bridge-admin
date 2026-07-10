// import type {
//   EngagementStats,
//   MinorAssessmentUptakeData,
//   RetakeDropoffData,
// } from "@/types/api/engagement";

// export const MOCK_ENGAGEMENT_STATS: EngagementStats = {
//   minorAssessmentAdoptionRate: {
//     value: 64,
//     trend: 8,
//   },
//   minorAssessmentCompletionRate: {
//     value: 51,
//     trend: 5,
//   },
//   retakeConversionRate: {
//     value: 37,
//     trend: 4,
//   },
//   averageTimeToRetakeAfterGateClears: {
//     value: "2.8 days",
//     trend: -6,
//   },
// };

// export const MOCK_RETAKE_DROPOFF: RetakeDropoffData = {
//   data: [
//     {
//       attempt: "Attempt 1",
//       candidates: 420,
//     },
//     {
//       attempt: "Attempt 2",
//       candidates: 238,
//     },
//     {
//       attempt: "Attempt 3",
//       candidates: 96,
//     },
//   ],
// };

// const MINOR_ASSESSMENT_UPTAKE_BY_TRACK: Record<
//   string,
//   MinorAssessmentUptakeData
// > = {
//   all: {
//     data: [
//       {
//         type: "Language variants",
//         count: 184,
//       },
//       {
//         type: "Specialisation deep dives",
//         count: 267,
//       },
//       {
//         type: "Soft skill assessments",
//         count: 139,
//       },
//     ],
//   },
//   Frontend: {
//     data: [
//       {
//         type: "Language variants",
//         count: 72,
//       },
//       {
//         type: "Specialisation deep dives",
//         count: 98,
//       },
//       {
//         type: "Soft skill assessments",
//         count: 44,
//       },
//     ],
//   },
//   Backend: {
//     data: [
//       {
//         type: "Language variants",
//         count: 58,
//       },
//       {
//         type: "Specialisation deep dives",
//         count: 112,
//       },
//       {
//         type: "Soft skill assessments",
//         count: 39,
//       },
//     ],
//   },
//   "Product Design": {
//     data: [
//       {
//         type: "Language variants",
//         count: 34,
//       },
//       {
//         type: "Specialisation deep dives",
//         count: 41,
//       },
//       {
//         type: "Soft skill assessments",
//         count: 38,
//       },
//     ],
//   },
//   "Product Management": {
//     data: [
//       {
//         type: "Language variants",
//         count: 20,
//       },
//       {
//         type: "Specialisation deep dives",
//         count: 16,
//       },
//       {
//         type: "Soft skill assessments",
//         count: 18,
//       },
//     ],
//   },
// };

// export function getMockMinorAssessmentUptake(
//   track = "all",
// ): MinorAssessmentUptakeData {
//   return (
//     MINOR_ASSESSMENT_UPTAKE_BY_TRACK[track] ??
//     MINOR_ASSESSMENT_UPTAKE_BY_TRACK.all
//   );
// }
