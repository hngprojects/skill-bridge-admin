"use client";

import * as React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

type SlideOverPanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
};

function SlideOverSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-6 pt-0">
      {/* Header block */}
      <div className="flex items-center gap-3">
        <Skeleton className="size-12 rounded-xl" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-36 rounded-md" />
          <Skeleton className="h-3 w-24 rounded-md" />
        </div>
      </div>
      {/* Detail rows */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <Skeleton className="h-3 w-20 rounded-md" />
          <Skeleton className="h-5 w-full rounded-lg" />
        </div>
      ))}
      {/* Wide block */}
      <Skeleton className="h-24 w-full rounded-xl" />
    </div>
  );
}

export function SlideOverPanel({
  open,
  onOpenChange,
  title,
  description,
  isLoading = false,
  children,
}: SlideOverPanelProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        {isLoading ? <SlideOverSkeleton /> : children}
      </SheetContent>
    </Sheet>
  );
}
