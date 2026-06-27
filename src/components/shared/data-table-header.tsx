"use client";

import { flexRender, type Table } from "@tanstack/react-table";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUp01Icon,
  ArrowDown01Icon,
  UnfoldMoreIcon,
} from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

type DataTableHeaderProps<TData> = {
  table: Table<TData>;
};

export function DataTableHeader<TData>({ table }: DataTableHeaderProps<TData>) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((hg) => (
        <TableRow key={hg.id} className="bg-muted/30 hover:bg-muted/30">
          {hg.headers.map((header) => {
            const canSort = header.column.getCanSort();
            const sortDir = header.column.getIsSorted();
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder ? null : (
                  <button
                    type="button"
                    disabled={!canSort}
                    onClick={
                      canSort
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                    className={cn(
                      "inline-flex items-center gap-1",
                      canSort &&
                        "cursor-pointer select-none hover:text-foreground",
                    )}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {canSort && (
                      <HugeiconsIcon
                        icon={
                          sortDir === "asc"
                            ? ArrowUp01Icon
                            : sortDir === "desc"
                              ? ArrowDown01Icon
                              : UnfoldMoreIcon
                        }
                        strokeWidth={2}
                        className="size-3.5 text-muted-foreground"
                      />
                    )}
                  </button>
                )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}
