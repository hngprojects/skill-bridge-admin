import type { StatusPillVariant } from "@/components/shared/status-pill";
import type {
  EmployerRoleStatus,
  EmployerVerificationStatus,
  OfferLifecycleStatus,
} from "@/types/api/employers";
import type { SubscriptionStatus } from "@/types/api/talents";

export const verificationVariantMap: Record<
  EmployerVerificationStatus,
  StatusPillVariant
> = {
  Verified: "success",
  Pending: "warning",
  Unverified: "error",
};

export const roleStatusVariantMap: Record<
  EmployerRoleStatus,
  StatusPillVariant
> = {
  Active: "success",
  Closed: "muted",
};

export const offerStatusVariantMap: Record<
  OfferLifecycleStatus,
  StatusPillVariant
> = {
  Accepted: "success",
  Viewed: "info",
  Sent: "default",
  Declined: "error",
  Expired: "warning",
  Withdrawn: "muted",
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
