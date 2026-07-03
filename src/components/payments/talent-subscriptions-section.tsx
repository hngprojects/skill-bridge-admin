"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTalentSubscriptionSummary } from "@/hooks/api/use-payments";

export function TalentSubscriptionsSection() {
  const { data, isLoading } = useTalentSubscriptionSummary();

  const items = [
    {
      label: "Active Subscribers",
      value:
        data?.total_active != null
          ? new Intl.NumberFormat().format(data.total_active)
          : undefined,
    },
    {
      label: "Cancelled Subscribers",
      value:
        data?.total_cancelled != null
          ? new Intl.NumberFormat().format(data.total_cancelled)
          : undefined,
    },
    {
      label: "Monthly Price",
      value:
        data?.monthly_price != null
          ? `$${Number(data.monthly_price).toFixed(2)}`
          : "Not set",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="text-sm font-semibold">Talent Subscriptions</h2>
        <p className="text-xs text-muted-foreground">
          Single paid tier — unlocks unlimited retakes past the free 3.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {items.map(({ label, value }) => (
          <Card key={label} size="sm">
            <CardContent className="flex flex-col gap-1">
              <p className="caption text-muted-foreground">{label}</p>
              {isLoading ? (
                <Skeleton className="h-7 w-1/2 rounded-lg" />
              ) : (
                <p className="section-h3 font-semibold tracking-tight">
                  {value ?? "—"}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
