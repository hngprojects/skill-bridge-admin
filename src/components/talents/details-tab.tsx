import { format } from "date-fns";

import { StatusPill } from "@/components/shared/status-pill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CandidateDetail } from "@/types/api/talents";
import {
  confidenceVariantMap,
  Field,
  Section,
  subscriptionVariantMap,
} from "./detail-helpers";

export function DetailsTab({ data }: { data: CandidateDetail }) {
  const flags = data.integrity_flags;
  const sub = data.subscription_status;

  return (
    <div className="flex flex-col gap-6 px-6 py-5">
      <Section title="Integrity">
        {flags ? (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Violations">{flags.violation_count}</Field>
            <Field label="Voided Attempts">{flags.voided_attempts}</Field>
            {flags.confidence_level && (
              <Field label="Confidence">
                <StatusPill
                  status={flags.confidence_level}
                  variant={confidenceVariantMap[flags.confidence_level]}
                />
              </Field>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No data available.</p>
        )}
      </Section>

      <Section title="Minor Assessments">
        {data.minor_assessments.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No minor assessments completed yet.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {data.minor_assessments.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm">{a.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(a.completed_at), "MMM d, yyyy")}
                  </span>
                </div>
                <Badge variant="outline" className="shrink-0 text-xs">
                  {a.badge}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section title="Subscription">
        {sub ? (
          sub.status ? (
            <Field label="Status">
              <StatusPill
                status={sub.status}
                variant={subscriptionVariantMap[sub.status]}
              />
            </Field>
          ) : (
            <Field label="Free Retakes Remaining">
              {sub.free_retakes_remaining}
            </Field>
          )
        ) : (
          <p className="text-sm text-muted-foreground">No subscription data.</p>
        )}
      </Section>

      {data.verified_profile_link && (
        <Section title="Verified Profile">
          <Button variant="outline" size="sm" className="w-fit" asChild>
            <a
              href={data.verified_profile_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              View live profile ↗
            </a>
          </Button>
        </Section>
      )}
    </div>
  );
}
