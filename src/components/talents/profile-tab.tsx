import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import type { CandidateDetail } from "@/types/api/talents";
import { Field, Section } from "./detail-helpers";

export function ProfileTab({ data }: { data: CandidateDetail }) {
  return (
    <div className="flex flex-col gap-6 px-6 py-5">
      <Section title="Basics">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Track">{data.track}</Field>
          <Field label="Region">{data.region}</Field>
          <Field label="Onboarding Date">
            {format(new Date(data.onboardingDate), "MMM d, yyyy")}
          </Field>
        </div>
      </Section>

      <Section title="Stage 1 — Self-Assessment">
        <div className="flex flex-col gap-3">
          <Field label="Specialisation">{data.stage1.specialisation}</Field>
          <Field label="Tools & Stack">
            <div className="mt-1 flex flex-wrap gap-1">
              {data.stage1.toolsAndStack.map((tool) => (
                <Badge key={tool} variant="outline" className="text-xs">
                  {tool}
                </Badge>
              ))}
            </div>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Claimed Level">
              {data.stage1.claimedExperienceLevel}
            </Field>
            <Field label="Work Preferences">
              <div className="mt-1 flex flex-wrap gap-1">
                {data.stage1.workPreferences.map((pref) => (
                  <Badge key={pref} variant="outline" className="text-xs">
                    {pref}
                  </Badge>
                ))}
              </div>
            </Field>
          </div>
        </div>
      </Section>
    </div>
  );
}
