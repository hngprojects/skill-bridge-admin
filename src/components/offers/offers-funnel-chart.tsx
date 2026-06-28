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
};

export function OffersFunnelChart() {
  const { data, isLoading } = useOffersFunnel();

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
        ) : stages.length === 0 ? (
          <div className="flex h-72 items-center justify-center rounded-xl border border-dashed border-border">
            <p className="text-sm text-muted-foreground">No offers sent yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {stages.map((stage) => {
              const stageWidth = `${Math.max(
                (stage.count / maxCount) * 100,
                12,
              )}%`;

              const segments = stage.segments ?? [
                {
                  label: stage.stage,
                  count: stage.count,
                  status: "assessment_unlocked" as OfferFunnelSegmentStatus,
                },
              ];

              return (
                <div key={stage.stage} className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{stage.stage}</p>

                      {stage.dropOffPercent !== undefined && (
                        <p className="text-xs text-muted-foreground">
                          {stage.dropOffPercent}% drop-off from previous stage
                        </p>
                      )}
                    </div>

                    <p className="text-sm font-semibold">
                      {new Intl.NumberFormat().format(stage.count)}
                    </p>
                  </div>

                  <div className="h-8 overflow-hidden rounded-full bg-muted">
                    <div
                      className="flex h-full overflow-hidden rounded-full"
                      style={{ width: stageWidth }}
                    >
                      {segments.map((segment) => {
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

                  {segments.length > 1 && (
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {segments.map((segment) => (
                        <div
                          key={`${stage.stage}-${segment.label}-legend`}
                          className="flex items-center gap-1.5 text-xs text-muted-foreground"
                        >
                          <span
                            className={cn(
                              "size-2 rounded-full",
                              segmentColorMap[segment.status],
                            )}
                          />
                          <span>
                            {segment.label}:{" "}
                            {new Intl.NumberFormat().format(segment.count)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
