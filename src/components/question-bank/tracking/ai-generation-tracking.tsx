"use client";

import * as React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useAIGenerationLogs } from "@/hooks/api/use-question-bank";
import { TALENT_TRACKS } from "@/types/api/talents";
import type { AIGenerationLog } from "@/types/api/question-bank";

type Period = "yearly" | "monthly" | "weekly" | "daily";

const PERIODS: { label: string; value: Period }[] = [
  { label: "Yearly", value: "yearly" },
  { label: "Monthly", value: "monthly" },
  { label: "Weekly", value: "weekly" },
  { label: "Daily", value: "daily" },
];

const chartConfig = {
  requested: {
    label: "Requested",
    color: "#663f85",
  },
  accepted: {
    label: "Accepted",
    color: "#a78bce",
  },
} satisfies ChartConfig;

function bucketLabel(timestamp: string, period: Period): string {
  const date = new Date(timestamp);
  switch (period) {
    case "yearly":
      return String(date.getFullYear());
    case "monthly":
      return date.toLocaleDateString("en-GB", {
        month: "short",
        year: "2-digit",
      });
    case "weekly": {
      const week = Math.ceil(date.getDate() / 7);
      return `W${week} ${date.toLocaleDateString("en-GB", { month: "short" })}`;
    }
    case "daily":
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      });
  }
}

function aggregateLogs(
  logs: AIGenerationLog[],
  track: string,
  period: Period,
): { label: string; requested: number; accepted: number }[] {
  const filtered =
    track === "all" ? logs : logs.filter((l) => l.track === track);

  const buckets = new Map<string, { requested: number; accepted: number }>();
  for (const log of filtered) {
    const label = bucketLabel(log.timestamp, period);
    const existing = buckets.get(label) ?? { requested: 0, accepted: 0 };
    buckets.set(label, {
      requested: existing.requested + log.countRequested,
      accepted: existing.accepted + log.countAccepted,
    });
  }

  return Array.from(buckets.entries()).map(([label, counts]) => ({
    label,
    ...counts,
  }));
}

export function AIGenerationTracking() {
  const [period, setPeriod] = React.useState<Period>("monthly");
  const [trackFilter, setTrackFilter] = React.useState("all");
  const { data: logs = [], isLoading } = useAIGenerationLogs();

  const chartData = React.useMemo(
    () => aggregateLogs(logs, trackFilter, period),
    [logs, trackFilter, period],
  );

  const isEmpty = !isLoading && chartData.length === 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle>AI Generation Activity</CardTitle>
          <div className="flex items-center gap-3">
            <Select value={trackFilter} onValueChange={setTrackFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="All tracks" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All tracks</SelectItem>
                {TALENT_TRACKS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Tabs value={period} onValueChange={(v) => setPeriod(v as Period)}>
              <TabsList>
                {PERIODS.map((p) => (
                  <TabsTrigger key={p.value} value={p.value}>
                    {p.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-52 w-full rounded-xl" />
        ) : isEmpty ? (
          <div className="flex h-52 items-center justify-center text-sm text-muted-foreground">
            No AI generation activity yet.
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-52 w-full">
            <BarChart data={chartData} barSize={20} barCategoryGap="30%">
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11 }}
                allowDecimals={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="requested"
                fill="var(--color-requested)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="accepted"
                fill="var(--color-accepted)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
