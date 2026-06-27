"use client";

import * as React from "react";
import { format, formatDistanceToNowStrict, isFuture } from "date-fns";

import { SlideOverPanel } from "@/components/shared/slide-over-panel";
import { StatusPill } from "@/components/shared/status-pill";
import type { StatusPillVariant } from "@/components/shared/status-pill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCandidateDetail } from "@/hooks/api/use-talents";
import type {
  ConfidenceLevel,
  SubscriptionStatus,
  TalentTier,
} from "@/types/api/talents";

// ---------------------------------------------------------------------------
// Variant maps
// ---------------------------------------------------------------------------

const tierVariantMap: Record<TalentTier, StatusPillVariant> = {
  "Job Ready": "success",
  Emerging: "info",
  Rejected: "error",
};

const confidenceVariantMap: Record<ConfidenceLevel, StatusPillVariant> = {
  High: "success",
  Medium: "warning",
  Low: "error",
};

const subscriptionVariantMap: Record<SubscriptionStatus, StatusPillVariant> = {
  Active: "success",
  "Past Due": "warning",
  Cancelled: "error",
};

// ---------------------------------------------------------------------------
// Layout helpers
// ---------------------------------------------------------------------------

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border-t border-border px-6 py-5 first:border-0">
      <p className="text-sm font-semibold">{title}</p>
      {children}
    </div>
  );
}

function Field({
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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type CandidateDetailPanelProps = {
  talentId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CandidateDetailPanel({
  talentId,
  open,
  onOpenChange,
}: CandidateDetailPanelProps) {
  const { data, isLoading } = useCandidateDetail(talentId);

  const isGated =
    !!data?.stage3?.retakeGateExpiresAt &&
    isFuture(new Date(data.stage3.retakeGateExpiresAt));

  return (
    <SlideOverPanel
      open={open}
      onOpenChange={onOpenChange}
      title={data?.name ?? "Candidate Detail"}
      description={data?.email}
      isLoading={isLoading || (talentId !== null && !data)}
    >
      <div className="flex flex-col pb-6">
        {/* Profile Basics */}
        <Section title="Profile">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Track">{data?.track}</Field>
            <Field label="Region">{data?.region}</Field>
            <Field label="Onboarding Date">
              {data?.onboardingDate
                ? format(new Date(data.onboardingDate), "MMM d, yyyy")
                : "—"}
            </Field>
          </div>
        </Section>

        {/* Stage 1 */}
        <Section title="Stage 1 — Self-Assessment">
          <div className="flex flex-col gap-3">
            <Field label="Specialisation">
              {data?.stage1?.specialisation ?? "—"}
            </Field>
            <Field label="Tools & Stack">
              <div className="mt-1 flex flex-wrap gap-1">
                {data?.stage1?.toolsAndStack.map((tool) => (
                  <Badge key={tool} variant="outline" className="text-xs">
                    {tool}
                  </Badge>
                ))}
              </div>
            </Field>
            <Field label="Claimed Experience Level">
              {data?.stage1?.claimedExperienceLevel ?? "—"}
            </Field>
            <Field label="Work Preferences">
              <div className="mt-1 flex flex-wrap gap-1">
                {data?.stage1?.workPreferences.map((pref) => (
                  <Badge key={pref} variant="outline" className="text-xs">
                    {pref}
                  </Badge>
                ))}
              </div>
            </Field>
          </div>
        </Section>

        {/* Stage 2 */}
        <Section title="Stage 2 — Validated Level">
          {data?.stage2 ? (
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

        {/* Stage 3 */}
        <Section title="Stage 3 — Assessment">
          {data?.stage3 ? (
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

        {/* Integrity */}
        <Section title="Integrity Flags">
          {data?.integrity && (
            <div className="grid grid-cols-2 gap-3">
              <Field label="Violations">{data.integrity.violationCount}</Field>
              <Field label="Voided Attempts">
                {data.integrity.voidedAttempts}
              </Field>
              <Field label="Confidence Level">
                <StatusPill
                  status={data.integrity.confidenceLevel}
                  variant={confidenceVariantMap[data.integrity.confidenceLevel]}
                />
              </Field>
            </div>
          )}
        </Section>

        {/* Minor Assessments */}
        <Section title="Minor Assessments">
          {!data?.minorAssessments || data.minorAssessments.length === 0 ? (
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

        {/* Subscription */}
        <Section title="Subscription">
          {data?.subscription &&
            (data.subscription.status ? (
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
            ))}
        </Section>

        {/* Verified Profile — Job Ready only */}
        {data?.profileUrl && (
          <Section title="Verified Profile">
            <Button variant="outline" size="sm" className="w-fit" asChild>
              <a
                href={data.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View live profile ↗
              </a>
            </Button>
          </Section>
        )}
      </div>
    </SlideOverPanel>
  );
}
