"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useOffersFunnel } from "@/hooks/api/use-offers";
import { cn } from "@/lib/utils";
import type { OfferFunnelSegmentStatus } from "@/types/api/offers";

const segmentColorMap: Record<OfferFunnelSegmentStatus, string> = {
  pending: "bg-muted-foreground/45",
  assessment_unlocked: "bg-primary",
  assessment_completed: "bg-primary/80",
  passed: "bg-success",
  failed: "bg-error",
  accepted: "bg-success",
  declined: "bg-error",
  expired: "bg-amber-500",
  hired: "bg-success",
  withdrawn: "bg-muted-foreground/45",
};

export function OffersFunnelChart() {
  const { data, isLoading, isError } = useOffersFunnel();

  const stages = data?.stages ?? [];
  const maxCount = Math.max(...stages.map((stage) => stage.count), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Offer Funnel</CardTitle>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <Skeleton className="h-72 w-full rounded-xl" />
        ) : isError ? (
          <div className="flex h-72 items-center justify-center rounded-xl border border-dashed border-border">
            <p className="text-sm text-muted-foreground">
              Unable to load offer funnel.
            </p>
          </div>
        ) : stages.length === 0 || data?.empty ? (
          <div className="flex h-72 items-center justify-center rounded-xl border border-dashed border-border">
            <p className="text-sm text-muted-foreground">No offers sent yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {stages.map((stage) => {
              const stageWidth =
                stage.count > 0
                  ? `${Math.max((stage.count / maxCount) * 100, 8)}%`
                  : "0%";

              return (
                <div key={stage.stage} className="space-y-2">
                  <div className="flex items-center justify-between gap-1">
                    <div>
                      <p className="text-sm font-medium">{stage.stage}</p>

                      {stage.dropOffPercent !== undefined && (
                        <p className="text-xs text-muted-foreground">
                          {stage.dropOffPercent}% drop-off
                        </p>
                      )}
                    </div>

                    <p className="text-sm font-semibold">
                      {new Intl.NumberFormat().format(stage.count)}
                    </p>
                  </div>

                  <div className="h-4 overflow-hidden rounded-full bg-muted">
                    <div
                      className="flex h-full overflow-hidden rounded-full"
                      style={{ width: stageWidth }}
                    >
                      {stage.segments.map((segment) => {
                        const segmentWidth =
                          stage.count > 0
                            ? `${(segment.count / stage.count) * 100}%`
                            : "0%";

                        return (
                          <div
                            key={`${stage.stage}-${segment.label}`}
                            className={cn(
                              "h-full transition-all",
                              segmentColorMap[segment.status],
                            )}
                            style={{ width: segmentWidth }}
                            title={`${segment.label}: ${segment.count}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
