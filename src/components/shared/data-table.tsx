"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type FilterFn,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SearchIcon,
  Cancel01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  UnfoldMoreIcon,
} from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";
import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";

export type FilterOption = {
  label: string;
  value: string;
};

export type FilterConfig = {
  /** Column id to apply the filter to */
  id: string;
  label: string;
  options: FilterOption[];
};

type DataTableProps<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyMessage?: string;
  onRowClick?: (row: TData) => void;
  searchPlaceholder?: string;
  filters?: FilterConfig[];
  pageSize?: number;
  className?: string;
};

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

const exactFilter: FilterFn<unknown> = (row, columnId, value: string) =>
  String(row.getValue(columnId)) === value;
exactFilter.autoRemove = (val: string) => !val;

export function DataTable<TData>({
  columns,
  data,
  isLoading = false,
  emptyTitle = "No results",
  emptyMessage = "No data to display.",
  onRowClick,
  searchPlaceholder = "Search…",
  filters = [],
  pageSize = DEFAULT_PAGE_SIZE,
  className,
}: DataTableProps<TData>) {
  "use no memo";
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [searchInput, setSearchInput] = React.useState("");
  const [activeFilters, setActiveFilters] = React.useState<
    Record<string, string>
  >({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize,
  });

  const debouncedSearch = useDebounce(searchInput, 300);

  const columnFilters = React.useMemo<ColumnFiltersState>(
    () =>
      Object.entries(activeFilters)
        .filter(([, v]) => v !== "")
        .map(([id, value]) => ({ id, value })),
    [activeFilters],
  );

  // Reset to first page whenever search or filters change
  React.useEffect(() => {
    setPagination((p) => (p.pageIndex === 0 ? p : { ...p, pageIndex: 0 }));
  }, [debouncedSearch, activeFilters]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    filterFns: { exact: exactFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      globalFilter: debouncedSearch,
      pagination,
    },
    globalFilterFn: "includesString",
  });

  function setFilter(id: string, value: string) {
    setActiveFilters((prev) => ({ ...prev, [id]: value }));
  }

  function removeFilter(id: string) {
    setActiveFilters((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  const activeChips = Object.entries(activeFilters).filter(([, v]) => v !== "");
  const rows = table.getRowModel().rows;
  const totalPages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Toolbar */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <InputGroup className="w-60">
            <InputGroupAddon align="inline-start">
              <HugeiconsIcon
                icon={SearchIcon}
                strokeWidth={2}
                className="size-4"
              />
            </InputGroupAddon>
            <InputGroupInput
              placeholder={searchPlaceholder}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </InputGroup>

          {filters.map((filter) => (
            <Select
              key={filter.id}
              value={activeFilters[filter.id] ?? ""}
              onValueChange={(val) => setFilter(filter.id, val)}
            >
              <SelectTrigger size="sm" className="w-auto">
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent>
                {filter.options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>

        {/* Active filter chips */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {activeChips.map(([id, value]) => {
              const filterConfig = filters.find((f) => f.id === id);
              const option = filterConfig?.options.find(
                (o) => o.value === value,
              );
              return (
                <Badge
                  key={id}
                  variant="outline"
                  className="h-6 gap-1 pr-1 text-xs font-normal"
                >
                  <span className="text-muted-foreground">
                    {filterConfig?.label}:
                  </span>
                  <span>{option?.label ?? value}</span>
                  <button
                    type="button"
                    onClick={() => removeFilter(id)}
                    className="ml-0.5 flex items-center rounded-full p-0.5 hover:bg-muted"
                    aria-label={`Remove ${filterConfig?.label} filter`}
                  >
                    <HugeiconsIcon
                      icon={Cancel01Icon}
                      strokeWidth={2}
                      className="size-3"
                    />
                  </button>
                </Badge>
              );
            })}
            {activeChips.length > 1 && (
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setActiveFilters({})}
              >
                Clear all
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl ring-1 ring-foreground/10">
        <Table>
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

          <TableBody>
            {isLoading ? (
              Array.from({ length: pageSize }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-full rounded-md" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : rows.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className="h-52 p-0">
                  <Empty className="border-0">
                    <EmptyHeader>
                      <EmptyTitle>{emptyTitle}</EmptyTitle>
                      <EmptyDescription>{emptyMessage}</EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  onClick={
                    onRowClick ? () => onRowClick(row.original) : undefined
                  }
                  className={cn(onRowClick && "cursor-pointer")}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination — hidden while loading or no rows */}
      {!isLoading && rows.length > 0 && (
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Page {currentPage + 1} of {totalPages || 1}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
