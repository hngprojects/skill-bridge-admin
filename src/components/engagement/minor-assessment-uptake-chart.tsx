"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useMinorAssessmentUptake } from "@/hooks/api/use-engagement";
import { TALENT_TRACKS } from "@/types/api/talents";

const chartConfig = {
  count: {
    label: "Assessments",
    color: "#663f85",
  },
} satisfies ChartConfig;

export function MinorAssessmentUptakeChart() {
  const [track, setTrack] = React.useState("all");
  const { data, isLoading } = useMinorAssessmentUptake(track);

  const chartData = data?.data ?? [];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle>Minor Assessment Uptake</CardTitle>

          <Select value={track} onValueChange={setTrack}>
            <SelectTrigger size="sm" className="w-44">
              <SelectValue placeholder="Track" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tracks</SelectItem>
              {TALENT_TRACKS.map((trackOption) => (
                <SelectItem key={trackOption} value={trackOption}>
                  {trackOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <Skeleton className="h-72 w-full rounded-xl" />
        ) : chartData.length === 0 ? (
          <div className="flex h-72 items-center justify-center rounded-xl border border-dashed border-border">
            <p className="text-sm text-muted-foreground">
              No minor assessment data yet.
            </p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-72 w-full">
            <BarChart data={chartData} barSize={36}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="type"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11 }}
                interval={0}
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
