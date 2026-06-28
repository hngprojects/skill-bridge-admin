import { OffersFunnelChart } from "./offers-funnel-chart";
import { OffersStatCards } from "./offers-stat-cards";
import { OffersTable } from "./offers-table";

export function OffersShell() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold tracking-tight">Offers</h1>
        <p className="text-sm text-muted-foreground">
          Track offer volume, funnel drop-offs, and candidate offer outcomes.
        </p>
      </div>

      <OffersStatCards />

      <OffersFunnelChart />

      <OffersTable />
    </div>
  );
}
