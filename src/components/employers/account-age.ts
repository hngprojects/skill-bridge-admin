import { differenceInMonths, formatDistanceToNowStrict } from "date-fns";

/** Buckets used by the "Account Age" filter (§6.1). */
export const ACCOUNT_AGE_BUCKETS = [
  { value: "0-3", label: "0–3 months" },
  { value: "3-6", label: "3–6 months" },
  { value: "6-12", label: "6–12 months" },
  { value: "12+", label: "1 year+" },
] as const;

/** Human-readable account age, e.g. "2 years", derived from the signup date. */
export function formatAccountAge(signupDate: string): string {
  return formatDistanceToNowStrict(new Date(signupDate));
}

/** Maps a signup date to one of the ACCOUNT_AGE_BUCKETS values. */
export function getAccountAgeBucket(signupDate: string): string {
  const months = differenceInMonths(new Date(), new Date(signupDate));
  if (months < 3) return "0-3";
  if (months < 6) return "3-6";
  if (months < 12) return "6-12";
  return "12+";
}
