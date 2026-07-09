"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useRetakeDropoff } from "@/hooks/api/use-engagement";

const chartConfig = {
  retakes: {
    label: "Candidates",
    color: "#663f85",
  },
} satisfies ChartConfig;

export function RetakeDropoffChart() {
  const { data, isLoading } = useRetakeDropoff();
  const chartData = data?.buckets ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Retake Drop-off by Attempt</CardTitle>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <Skeleton className="h-72 w-full rounded-xl" />
        ) : data?.empty || chartData.length === 0 ? (
          <Empty className="h-72 border-0">
            <EmptyHeader>
              <EmptyTitle className="text-sm font-medium">
                Not enough data yet
              </EmptyTitle>
              <EmptyDescription>
                {data?.empty_message ?? "Not enough retake data yet."}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ChartContainer config={chartConfig} className="h-72 w-full">
            <BarChart data={chartData} barSize={36}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="attempt"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11 }}
                tickFormatter={(value) => `Attempt ${value}`}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11 }}
                allowDecimals={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="retakes"
                fill="var(--color-retakes)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
