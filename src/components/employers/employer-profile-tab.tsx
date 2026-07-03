import { format } from "date-fns";

import { StatusPill } from "@/components/shared/status-pill";
import type { EmployerDetail } from "@/types/api/employers";
import type { SubscriptionStatus } from "@/types/api/talents";
import { formatAccountAgeDays } from "./account-age";
import { Field, Section, subscriptionVariantMap } from "./detail-helpers";

export function EmployerProfileTab({ data }: { data: EmployerDetail }) {
  const profile = data.company_profile;
  const verification = data.verification_status;
  const subscription = data.package_and_subscription.subscription_status;

  const criteria = [
    { label: "Email verified", met: verification.criteria.email_verified },
    {
      label: "Website resolvable",
      met: verification.criteria.website_resolvable,
    },
    {
      label: "LinkedIn provided",
      met: verification.criteria.linkedin_provided,
    },
  ];

  return (
    <div className="flex flex-col gap-6 px-6 py-5">
      <Section title="Company Profile">
        <div className="flex flex-col gap-3">
          <Field label="Website">
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 hover:underline"
            >
              {profile.website.replace(/^https?:\/\//, "")}
            </a>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Industry">{profile.industry}</Field>
            <Field label="Company Size">{profile.size}</Field>
            <Field label="Region">{profile.region}</Field>
            <Field label="LinkedIn">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-700 hover:underline"
              >
                View profile ↗
              </a>
            </Field>
          </div>
        </div>
      </Section>

      <Section title="Verification Status">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm">Overall</span>
          {verification.verified ? (
            <StatusPill status="Verified" variant="success" />
          ) : (
            <StatusPill status="Unverified" variant="error" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          {criteria.map((criterion) => (
            <div
              key={criterion.label}
              className="flex items-center justify-between gap-2"
            >
              <span className="text-sm text-muted-foreground">
                {criterion.label}
              </span>
              <StatusPill
                status={criterion.met ? "Met" : "Not met"}
                variant={criterion.met ? "success" : "muted"}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Package & Subscription">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Package Tier">
            {data.package_and_subscription.package_tier}
          </Field>
          <Field label="Subscription">
            {subscription && subscription !== "Free" ? (
              <StatusPill
                status={subscription}
                variant={
                  subscriptionVariantMap[subscription as SubscriptionStatus] ??
                  "default"
                }
              />
            ) : (
              <StatusPill status="Free" variant="muted" />
            )}
          </Field>
        </div>
      </Section>

      <Section title="Account Info">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Account Age">
            {formatAccountAgeDays(data.account_info.account_age_days)}
          </Field>
          <Field label="Signup Date">
            {format(new Date(data.account_info.signup_date), "MMM d, yyyy")}
          </Field>
        </div>
      </Section>
    </div>
  );
}
