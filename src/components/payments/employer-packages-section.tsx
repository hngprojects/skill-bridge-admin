"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusPill } from "@/components/shared/status-pill";
import { useEmployerPackages } from "@/hooks/api/use-payments";

export function EmployerPackagesSection() {
  const { data: packages = [], isLoading } = useEmployerPackages();

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="text-sm font-semibold">Employer Packages</h2>
        <p className="text-xs text-muted-foreground">
          Active subscriber counts and MRR per package tier.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl ring-1 ring-foreground/10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Package</TableHead>
              <TableHead>Monthly Price</TableHead>
              <TableHead>Offers / Month</TableHead>
              <TableHead>Other Features</TableHead>
              <TableHead className="text-right">Active Subscribers</TableHead>
              <TableHead className="text-right">MRR</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-4 w-full rounded-md" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : packages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <span>{pkg.name}</span>
                        {pkg.isPending && (
                          <StatusPill status="Pending" variant="warning" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {pkg.monthlyPrice === "TBD" ? (
                        <span className="text-muted-foreground">TBD</span>
                      ) : pkg.monthlyPrice === 0 ? (
                        "Free"
                      ) : (
                        `$${pkg.monthlyPrice}/mo`
                      )}
                    </TableCell>
                    <TableCell>
                      {pkg.offersPerMonth === "TBD" ? (
                        <span className="text-muted-foreground">TBD</span>
                      ) : (
                        pkg.offersPerMonth
                      )}
                    </TableCell>
                    <TableCell>
                      {pkg.otherFeatures.length === 0 ? (
                        <span className="text-muted-foreground">—</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          {pkg.otherFeatures.join(", ")}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {pkg.isPending ? (
                        <span className="text-muted-foreground">—</span>
                      ) : (
                        new Intl.NumberFormat().format(pkg.activeSubscribers)
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {pkg.mrr === "TBD" || pkg.mrr === 0 ? (
                        <span className="text-muted-foreground">—</span>
                      ) : (
                        `$${new Intl.NumberFormat().format(pkg.mrr)}`
                      )}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      <p className="text-xs text-muted-foreground">
        Tier names, prices, and feature sets above Free are pending product
        finalization (OQ-04). Structure is built ahead of the data.
      </p>
    </div>
  );
}
