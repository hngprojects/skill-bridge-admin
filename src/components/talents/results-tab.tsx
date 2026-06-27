import { formatDistanceToNowStrict } from "date-fns";

import { StatusPill } from "@/components/shared/status-pill";
import { Badge } from "@/components/ui/badge";
import type { CandidateDetail } from "@/types/api/talents";
import { Field, Section, tierVariantMap } from "./detail-helpers";

type ResultsTabProps = {
  data: CandidateDetail;
  isGated: boolean;
};

export function ResultsTab({ data, isGated }: ResultsTabProps) {
  return (
    <div className="flex flex-col gap-6 px-6 py-5">
      <Section title="Stage 2 — Validated Level">
        {data.stage2 ? (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Validated Level">
              <Badge variant="secondary">{data.stage2.validatedLevel}</Badge>
            </Field>
            <Field label="Score">{data.stage2.score}</Field>
            <Field label="Retakes Used">{data.stage2.retakesUsed}</Field>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Not yet completed.</p>
        )}
      </Section>

      <Section title="Stage 3 — Assessment">
        {data.stage3 ? (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tier">
              <StatusPill
                status={data.stage3.tier}
                variant={tierVariantMap[data.stage3.tier]}
              />
            </Field>
            <Field label="Score">{data.stage3.score}</Field>
            <Field label="Retakes Used">{data.stage3.retakesUsed}</Field>
            {isGated && (
              <Field label="Retake Gate">
                Available in{" "}
                {formatDistanceToNowStrict(
                  new Date(data.stage3.retakeGateExpiresAt!),
                )}
              </Field>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Not yet completed.</p>
        )}
      </Section>
    </div>
  );
}
