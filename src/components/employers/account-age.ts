export function formatAccountAgeDays(days: number): string {
  if (days < 1) return "Today";
  if (days < 30) return `${days} day${days === 1 ? "" : "s"}`;
  if (days < 365) {
    const months = Math.floor(days / 30);
    return `${months} month${months === 1 ? "" : "s"}`;
  }
  const years = Math.floor(days / 365);
  return `${years} year${years === 1 ? "" : "s"}`;
}
