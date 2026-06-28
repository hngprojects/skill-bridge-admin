"use client";

import * as React from "react";

import { DataTable } from "@/components/shared/data-table";
import type { DateRangeValue } from "@/components/shared/date-range-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOffers } from "@/hooks/api/use-offers";
import type { OfferListItem } from "@/types/api/offers";
import { offerColumns } from "./columns";
import { OffersFilters } from "./offers-filters";

export function OffersTable() {
  const [statusFilter, setStatusFilter] = React.useState("");
  const [dateRange, setDateRange] = React.useState<DateRangeValue>({
    from: "",
    to: "",
  });

  const { data: offers = [], isLoading } = useOffers();

  const filtered = React.useMemo(() => {
    return offers.filter((offer: OfferListItem) => {
      if (statusFilter && offer.status !== statusFilter) return false;
      if (dateRange.from && offer.dateSent < dateRange.from) return false;
      if (dateRange.to && offer.dateSent > dateRange.to) return false;

      return true;
    });
  }, [offers, statusFilter, dateRange]);

  function clearAllFilters() {
    setStatusFilter("");
    setDateRange({ from: "", to: "" });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Offers</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <OffersFilters
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onClearAll={clearAllFilters}
          offerCount={filtered.length}
          isLoading={isLoading}
        />

        <DataTable
          columns={offerColumns}
          data={filtered}
          isLoading={isLoading}
          emptyTitle="No offers found"
          emptyMessage="No offers match your current filters."
          searchPlaceholder="Search by candidate or employer…"
        />
      </CardContent>
    </Card>
  );
}
