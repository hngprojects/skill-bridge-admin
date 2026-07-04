"use client";

import * as React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useAIConsumption } from "@/hooks/api/use-overview";
import type { AIConsumptionPeriod } from "@/types/api/overview";

const PERIODS: { label: string; value: AIConsumptionPeriod }[] = [
  { label: "Yearly", value: "yearly" },
  { label: "Monthly", value: "monthly" },
  { label: "Weekly", value: "weekly" },
  { label: "Daily", value: "daily" },
];

const chartConfig = {
  count: {
    label: "Questions",
    color: "#663f85",
  },
} satisfies ChartConfig;

export function AIConsumptionChart() {
  const [period, setPeriod] = React.useState<AIConsumptionPeriod>("monthly");
  const { data, isLoading } = useAIConsumption(period);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle>AI Question Generation</CardTitle>
          <Tabs
            value={period}
            onValueChange={(v) => setPeriod(v as AIConsumptionPeriod)}
          >
            <TabsList>
              {PERIODS.map((p) => (
                <TabsTrigger key={p.value} value={p.value}>
                  {p.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-52 w-full rounded-xl" />
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
