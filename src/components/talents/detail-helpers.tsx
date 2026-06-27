import type { StatusPillVariant } from "@/components/shared/status-pill";
import type {
  ConfidenceLevel,
  SubscriptionStatus,
  TalentTier,
} from "@/types/api/talents";

export const tierVariantMap: Record<TalentTier, StatusPillVariant> = {
  "Job Ready": "success",
  Emerging: "info",
  Rejected: "error",
};

export const confidenceVariantMap: Record<ConfidenceLevel, StatusPillVariant> =
  {
    High: "success",
    Medium: "warning",
    Low: "error",
  };

export const subscriptionVariantMap: Record<
  SubscriptionStatus,
  StatusPillVariant
> = {
  Active: "success",
  "Past Due": "warning",
  Cancelled: "error",
};

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      {children}
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="text-sm text-foreground">{children}</div>
    </div>
  );
}
