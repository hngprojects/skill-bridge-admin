import { formatDistanceToNowStrict } from "date-fns";

import { StatusPill } from "@/components/shared/status-pill";
import { Badge } from "@/components/ui/badge";
import type { CandidateDetail } from "@/types/api/talents";
import { Field, Section, tierLabels, tierVariantMap } from "./detail-helpers";

type ResultsTabProps = {
  data: CandidateDetail;
  isGated: boolean;
};

export function ResultsTab({ data, isGated }: ResultsTabProps) {
  const s2 = data.stage2_result;
  const s3 = data.stage3_result;

  return (
    <div className="flex flex-col gap-6 px-6 py-5">
      <Section title="Stage 2 — Validated Level">
        {s2 ? (
          <div className="grid grid-cols-2 gap-3">
            {s2.validated_level && (
              <Field label="Validated Level">
                <Badge variant="secondary">{s2.validated_level}</Badge>
              </Field>
            )}
            {s2.score !== null && <Field label="Score">{s2.score}</Field>}
            <Field label="Retakes Used">
              {s2.retakes_used} / {s2.max_attempts}
            </Field>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Not yet completed.</p>
        )}
      </Section>

      <Section title="Stage 3 — Assessment">
        {s3 ? (
          <div className="grid grid-cols-2 gap-3">
            {s3.tier && (
              <Field label="Tier">
                <StatusPill
                  status={tierLabels[s3.tier]}
                  variant={tierVariantMap[s3.tier]}
                />
              </Field>
            )}
            {s3.score !== null && <Field label="Score">{s3.score}</Field>}
            <Field label="Retakes Used">{s3.retakes_used}</Field>
            {isGated && s3.retake_gate && (
              <Field label="Retake Gate">
                Available in{" "}
                {formatDistanceToNowStrict(
                  new Date(s3.retake_gate.locked_until),
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
