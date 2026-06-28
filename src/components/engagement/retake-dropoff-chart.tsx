"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useRetakeDropoff } from "@/hooks/api/use-engagement";

const chartConfig = {
  candidates: {
    label: "Candidates",
    color: "#663f85",
  },
} satisfies ChartConfig;

export function RetakeDropoffChart() {
  const { data, isLoading } = useRetakeDropoff();
  const chartData = data?.data ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Retake Drop-off by Attempt</CardTitle>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <Skeleton className="h-72 w-full rounded-xl" />
        ) : chartData.length === 0 ? (
          <div className="flex h-72 items-center justify-center rounded-xl border border-dashed border-border">
            <p className="text-sm text-muted-foreground">
              Not enough retake data yet.
            </p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-72 w-full">
            <BarChart data={chartData} barSize={36}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="attempt"
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
                dataKey="candidates"
                fill="var(--color-candidates)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
