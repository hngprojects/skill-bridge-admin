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
              <TableHead>Features</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 2 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 4 }).map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-4 w-full rounded-md" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : packages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell className="font-medium">{pkg.name}</TableCell>
                    <TableCell>
                      {pkg.is_free ? "Free" : `$${pkg.price}/mo`}
                    </TableCell>
                    <TableCell>
                      {pkg.offer_limit === null ? (
                        <span className="text-muted-foreground">Unlimited</span>
                      ) : (
                        pkg.offer_limit
                      )}
                    </TableCell>
                    <TableCell>
                      {!pkg.features?.length ? (
                        <span className="text-muted-foreground">—</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          {pkg.features.join(", ")}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
