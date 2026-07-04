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
import { REVENUE_PERIODS } from "@/constants/payments";
import { useRevenueData } from "@/hooks/api/use-payments";
import type { RevenuePeriod } from "@/types/api/payments";

const chartConfig = {
  employer_revenue: {
    label: "Employer Packages",
    color: "#663f85",
  },
  talent_revenue: {
    label: "Talent Subscriptions",
    color: "#a78bfa",
  },
} satisfies ChartConfig;

function mergeRevenueData(
  employer: { period: string; amount: number }[],
  talent: { period: string; amount: number }[],
) {
  const map = new Map<
    string,
    { label: string; employer_revenue: number; talent_revenue: number }
  >();

  employer.forEach(({ period, amount }) => {
    const label = new Date(period).toLocaleDateString("en-GB", {
      month: "short",
      year: "2-digit",
    });
    map.set(period, { label, employer_revenue: amount, talent_revenue: 0 });
  });

  talent.forEach(({ period, amount }) => {
    if (map.has(period)) {
      map.get(period)!.talent_revenue = amount;
    } else {
      const label = new Date(period).toLocaleDateString("en-GB", {
        month: "short",
        year: "2-digit",
      });
      map.set(period, { label, employer_revenue: 0, talent_revenue: amount });
    }
  });

  return Array.from(map.values());
}

export function RevenueChart() {
  const [period, setPeriod] = React.useState<RevenuePeriod>("monthly");
  const { data, isLoading } = useRevenueData(period);

  const chartData = React.useMemo(() => {
    if (!data) return [];
    return mergeRevenueData(
      data.employer_revenue ?? [],
      data.talent_revenue ?? [],
    );
  }, [data]);

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
              {REVENUE_PERIODS.map((p) => (
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
        ) : chartData.length === 0 ? (
          <div className="flex h-52 items-center justify-center text-sm text-muted-foreground">
            Not enough revenue data yet.
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-52 w-full">
            <BarChart data={chartData} barSize={22}>
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
                dataKey="employer_revenue"
                stackId="a"
                fill="var(--color-employer_revenue)"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="talent_revenue"
                stackId="a"
                fill="var(--color-talent_revenue)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
