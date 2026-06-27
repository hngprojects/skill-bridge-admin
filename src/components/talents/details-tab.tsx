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
  return (
    <div className="flex flex-col gap-6 px-6 py-5">
      <Section title="Integrity">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Violations">{data.integrity.violationCount}</Field>
          <Field label="Voided Attempts">{data.integrity.voidedAttempts}</Field>
          <Field label="Confidence">
            <StatusPill
              status={data.integrity.confidenceLevel}
              variant={confidenceVariantMap[data.integrity.confidenceLevel]}
            />
          </Field>
        </div>
      </Section>

      <Section title="Minor Assessments">
        {data.minorAssessments.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No minor assessments completed yet.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {data.minorAssessments.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm">{a.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(a.completedAt), "MMM d, yyyy")}
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
        {data.subscription.status ? (
          <Field label="Status">
            <StatusPill
              status={data.subscription.status}
              variant={subscriptionVariantMap[data.subscription.status]}
            />
          </Field>
        ) : (
          <Field label="Free Retakes Remaining">
            {data.subscription.freeRetakesRemaining}
          </Field>
        )}
      </Section>

      {data.profileUrl && (
        <Section title="Verified Profile">
          <Button variant="outline" size="sm" className="w-fit" asChild>
            <a href={data.profileUrl} target="_blank" rel="noopener noreferrer">
              View live profile ↗
            </a>
          </Button>
        </Section>
      )}
    </div>
  );
}
