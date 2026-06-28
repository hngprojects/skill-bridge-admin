import { format } from "date-fns";

import { StatusPill } from "@/components/shared/status-pill";
import type { EmployerDetail } from "@/types/api/employers";
import { formatAccountAge } from "./account-age";
import {
  Field,
  Section,
  subscriptionVariantMap,
  verificationVariantMap,
} from "./detail-helpers";

export function EmployerProfileTab({ data }: { data: EmployerDetail }) {
  return (
    <div className="flex flex-col gap-6 px-6 py-5">
      <Section title="Company Profile">
        <div className="flex flex-col gap-3">
          <Field label="Website">
            <a
              href={data.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 hover:underline"
            >
              {data.website.replace(/^https?:\/\//, "")}
            </a>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Industry">{data.industry}</Field>
            <Field label="Company Size">{data.size}</Field>
            <Field label="Region">{data.region}</Field>
            <Field label="LinkedIn">
              <a
                href={data.linkedinUrl}
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
          <StatusPill
            status={data.verificationStatus}
            variant={verificationVariantMap[data.verificationStatus]}
          />
        </div>
        <div className="flex flex-col gap-2">
          {data.verificationCriteria.map((criterion) => (
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
          <Field label="Package Tier">{data.packageTier}</Field>
          <Field label="Subscription">
            {data.subscriptionStatus ? (
              <StatusPill
                status={data.subscriptionStatus}
                variant={subscriptionVariantMap[data.subscriptionStatus]}
              />
            ) : (
              <StatusPill status="Free" variant="muted" />
            )}
          </Field>
        </div>
      </Section>

      <Section title="Account Info">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Account Age">{formatAccountAge(data.signupDate)}</Field>
          <Field label="Signup Date">
            {format(new Date(data.signupDate), "MMM d, yyyy")}
          </Field>
        </div>
      </Section>
    </div>
  );
}
