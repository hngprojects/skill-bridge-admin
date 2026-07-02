"use client";

import * as React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import { useScoreDistribution } from "@/hooks/api/use-overview";

const MIN_ASSESSMENTS = 10;

const TRACKS = [
  { label: "All Tracks", value: "all" },
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "Data Science", value: "data-science" },
  { label: "DevOps", value: "devops" },
  { label: "Design", value: "design" },
];

const chartConfig = {
  count: {
    label: "Candidates",
    color: "#5a9cb6",
  },
} satisfies ChartConfig;

export function ScoreDistributionChart() {
  const [track, setTrack] = React.useState("all");
  const { data, isLoading } = useScoreDistribution(track);

  const hasEnoughData =
    !data?.empty && (data?.total_completed ?? 0) >= MIN_ASSESSMENTS;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle>Score Distribution</CardTitle>
          <Select value={track} onValueChange={setTrack}>
            <SelectTrigger size="sm" className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TRACKS.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-52 w-full rounded-xl" />
        ) : !hasEnoughData ? (
          <Empty className="h-52 border-0">
            <EmptyHeader>
              <EmptyTitle className="text-sm font-medium">
                Not enough data yet
              </EmptyTitle>
              <EmptyDescription>
                Not enough data yet to show a score distribution.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ChartContainer config={chartConfig} className="h-52 w-full">
            <BarChart data={data?.buckets ?? []} barSize={28}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="range"
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
                dataKey="count"
                fill="var(--color-count)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
