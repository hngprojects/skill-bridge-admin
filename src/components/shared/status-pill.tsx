import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Semantic colour presets. Every section that uses StatusPill maps its own
 * status strings to one of these variants — never rely on colour alone.
 */
export type StatusPillVariant =
  | "success"
  | "error"
  | "warning"
  | "muted"
  | "info"
  | "default";

const variantClasses: Record<StatusPillVariant, string> = {
  success: "bg-success/10 text-success border-success/20",
  error: "bg-error/10 text-error border-error/20",
  warning:
    "bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-400",
  muted: "bg-muted text-muted-foreground border-border",
  info: "bg-primary-100 text-primary-700 border-primary-200",
  default: "bg-secondary text-secondary-foreground border-border",
};

type StatusPillProps = {
  /** The raw status value — always rendered as visible text. */
  status: string;
  variant?: StatusPillVariant;
  className?: string;
};

export function StatusPill({
  status,
  variant = "default",
  className,
}: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex h-5 w-fit items-center rounded-4xl border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        variantClasses[variant],
        className,
      )}
    >
      {status}
    </span>
  );
}
