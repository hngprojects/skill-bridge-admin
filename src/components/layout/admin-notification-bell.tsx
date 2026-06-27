"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Notification01Icon } from "@hugeicons/core-free-icons";

import { AdminNotificationPreviewItem } from "@/components/notifications/admin-notification-preview-item";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ADMIN_NOTIFICATIONS,
  ADMIN_NOTIFICATION_PREVIEW_LIMIT,
  getUnreadNotificationCount,
} from "@/constants/admin-notifications";
import { ROUTES } from "@/constants/admin-routes";
import { cn } from "@/lib/utils";

export function AdminNotificationBell() {
  const unreadCount = getUnreadNotificationCount(ADMIN_NOTIFICATIONS);
  const previewItems = ADMIN_NOTIFICATIONS.slice(
    0,
    ADMIN_NOTIFICATION_PREVIEW_LIMIT,
  );
  const capped =
    unreadCount > 99 ? "99+" : unreadCount > 0 ? String(unreadCount) : null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative size-9 shrink-0 hover:bg-muted"
          aria-label={
            capped ? `Notifications, ${capped} unread` : "Notifications"
          }
        >
          <HugeiconsIcon
            icon={Notification01Icon}
            size={20}
            strokeWidth={1.5}
            className="text-muted-foreground"
            aria-hidden
          />
          {capped ? (
            <span
              aria-hidden
              className={cn(
                "absolute -right-0.5 -top-0.5 flex min-w-4.5 items-center justify-center",
                "rounded-full bg-error px-1 text-[10px] font-semibold leading-none text-white",
                unreadCount > 9 ? "h-4.5" : "size-4.5",
              )}
            >
              {capped}
            </span>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <DropdownMenuLabel className="border-b border-border px-4 py-3 font-normal">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-foreground">
              Notifications
            </span>
            {unreadCount > 0 ? (
              <span className="text-xs text-muted-foreground">
                {unreadCount} unread
              </span>
            ) : null}
          </div>
        </DropdownMenuLabel>

        {previewItems.length > 0 ? (
          <div className="max-h-72 overflow-y-auto">
            {previewItems.map((notification) => (
              <AdminNotificationPreviewItem
                key={notification.id}
                notification={notification}
                compact
              />
            ))}
          </div>
        ) : (
          <p className="px-4 py-6 text-center text-sm text-muted-foreground">
            No notifications yet.
          </p>
        )}

        <DropdownMenuSeparator className="m-0" />
        <DropdownMenuItem asChild className="rounded-none px-4 py-3">
          <Link href={ROUTES.notifications}>View all notifications</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
