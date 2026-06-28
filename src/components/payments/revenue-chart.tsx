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
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useRevenueData } from "@/hooks/api/use-payments";
import type { RevenuePeriod } from "@/types/api/payments";

const PERIODS: { label: string; value: RevenuePeriod }[] = [
  { label: "Yearly", value: "yearly" },
  { label: "Monthly", value: "monthly" },
  { label: "Weekly", value: "weekly" },
  { label: "Daily", value: "daily" },
];

const chartConfig = {
  employerRevenue: {
    label: "Employer Packages",
    color: "#663f85",
  },
  talentRevenue: {
    label: "Talent Subscriptions",
    color: "#a78bfa",
  },
} satisfies ChartConfig;

export function RevenueChart() {
  const [period, setPeriod] = React.useState<RevenuePeriod>("monthly");
  const { data, isLoading } = useRevenueData(period);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle>Revenue</CardTitle>
          <Tabs
            value={period}
            onValueChange={(v) => setPeriod(v as RevenuePeriod)}
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
        ) : (data?.data ?? []).length === 0 ? (
          <div className="flex h-52 items-center justify-center text-sm text-muted-foreground">
            Not enough revenue data yet.
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-52 w-full">
            <BarChart data={data?.data ?? []} barSize={22}>
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
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) =>
                      `$${new Intl.NumberFormat().format(Number(value))}`
                    }
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="employerRevenue"
                stackId="a"
                fill="var(--color-employerRevenue)"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="talentRevenue"
                stackId="a"
                fill="var(--color-talentRevenue)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
