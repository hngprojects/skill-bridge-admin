import { format } from "date-fns";

import { StatusPill } from "@/components/shared/status-pill";
import type { EmployerDetail } from "@/types/api/employers";
import {
  Field,
  offerStatusVariantMap,
  roleStatusVariantMap,
  Section,
} from "./detail-helpers";

export function EmployerActivityTab({ data }: { data: EmployerDetail }) {
  return (
    <div className="flex flex-col gap-6 px-6 py-5">
      <Section title="Roles Created">
        {data.rolesCreated.length === 0 ? (
          <p className="text-sm text-muted-foreground">No roles created yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {data.rolesCreated.map((role) => (
              <div
                key={role.id}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm">{role.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(role.createdAt), "MMM d, yyyy")}
                  </span>
                </div>
                <StatusPill
                  status={role.status}
                  variant={roleStatusVariantMap[role.status]}
                />
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section title="Offers Sent">
        {data.offersSent.length === 0 ? (
          <p className="text-sm text-muted-foreground">No offers sent yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {data.offersSent.map((offer) => (
              <div
                key={offer.id}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm">{offer.candidateName}</span>
                  <span className="text-xs text-muted-foreground">
                    {offer.roleTitle}
                  </span>
                </div>
                <StatusPill
                  status={offer.status}
                  variant={offerStatusVariantMap[offer.status]}
                />
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section title="Hire History">
        <Field label="Total Hires">{data.hireCount}</Field>
        {data.hireHistory.length === 0 ? (
          <p className="text-sm text-muted-foreground">No hires yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {data.hireHistory.map((hire) => (
              <div
                key={hire.id}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm">{hire.candidateName}</span>
                  <span className="text-xs text-muted-foreground">
                    {hire.roleTitle}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(hire.acceptedAt), "MMM d, yyyy")}
                </span>
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
