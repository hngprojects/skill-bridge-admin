import { StatusPill } from "@/components/shared/status-pill";
import type { EmployerDetail } from "@/types/api/employers";
import { formatDate } from "@/lib/format-date";
import {
  Field,
  offerStatusVariantMap,
  roleStatusVariantMap,
  Section,
} from "./detail-helpers";

export function EmployerActivityTab({ data }: { data: EmployerDetail }) {
  const roles = data.roles_created;
  const offers = data.offers_sent;
  const hires = data.hire_history;

  return (
    <div className="flex flex-col gap-6 px-6 py-5">
      <Section title="Roles Created">
        {roles.items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {roles.empty_message ?? "No roles created yet."}
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {roles.items.map((role) => (
              <div
                key={role.id}
                className="flex items-center justify-between gap-2"
              >
                <span className="text-sm">{role.title}</span>
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
        {offers.items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {offers.empty_message ?? "No offers sent yet."}
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {offers.items.map((offer) => (
              <div
                key={offer.id}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm">{offer.candidate_name}</span>
                  <span className="text-xs text-muted-foreground">
                    {offer.role_title}
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
        <Field label="Total Hires">{hires.hire_count}</Field>
        {hires.items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No hires yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {hires.items.map((hire) => (
              <div
                key={hire.id}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm">{hire.candidate_name}</span>
                  <span className="text-xs text-muted-foreground">
                    {hire.role_title}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDate(hire.accepted_at)}
                </span>
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
