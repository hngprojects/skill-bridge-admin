import { format, isValid } from "date-fns";

export function formatDate(
  value: string | number | Date | null | undefined,
  dateFormat = "MMM d, yyyy",
  fallback = "—",
): string {
  if (value === null || value === undefined || value === "") return fallback;

  const date = new Date(value);
  return isValid(date) ? format(date, dateFormat) : fallback;
}
