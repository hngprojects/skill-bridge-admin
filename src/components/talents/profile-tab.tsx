import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import type { CandidateDetail } from "@/types/api/talents";
import { TRACK_LABELS } from "@/types/api/talents";
import { Field, Section } from "./detail-helpers";

const WORK_PREF_LABELS: Record<string, string> = {
  open_to_opportunities: "Open to Opportunities",
  actively_looking: "Actively Looking",
  not_looking: "Not Looking",
  freelance: "Freelance",
  remote_only: "Remote Only",
};

function formatSnakeLabel(value: string): string {
  return value
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function ProfileTab({ data }: { data: CandidateDetail }) {
  const { profile_basics: pb, stage1_summary: s1 } = data;

  return (
    <div className="flex flex-col gap-6 px-6 py-5">
      <Section title="Basics">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Track">
            {pb.track ? (TRACK_LABELS[pb.track] ?? pb.track) : "—"}
          </Field>
          <Field label="Region">{pb.region}</Field>
          <Field label="Onboarding Date">
            {format(new Date(pb.onboarding_date), "MMM d, yyyy")}
          </Field>
        </div>
      </Section>

      <Section title="Stage 1 — Self-Assessment">
        {s1 ? (
          <div className="flex flex-col gap-3">
            {s1.specialisation && (
              <Field label="Specialisation">
                {TRACK_LABELS[s1.specialisation as keyof typeof TRACK_LABELS] ??
                  formatSnakeLabel(s1.specialisation)}
              </Field>
            )}
            {s1.tools_and_stack && s1.tools_and_stack.length > 0 && (
              <Field label="Tools & Stack">
                <div className="mt-1 flex flex-wrap gap-1">
                  {s1.tools_and_stack.map((tool) => (
                    <Badge key={tool} variant="outline" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </Field>
            )}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Claimed Level">{s1.claimed_experience_level}</Field>
              {s1.work_preferences && (
                <Field label="Work Preferences">
                  {WORK_PREF_LABELS[s1.work_preferences] ??
                    formatSnakeLabel(s1.work_preferences)}
                </Field>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Not yet completed.</p>
        )}
      </Section>
    </div>
  );
}
