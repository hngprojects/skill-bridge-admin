import { cn } from "@/lib/utils";
import type { AdminNotification } from "@/constants/admin-notifications";

type AdminNotificationPreviewItemProps = {
  notification: AdminNotification;
  compact?: boolean;
};

export function AdminNotificationPreviewItem({
  notification,
  compact = false,
}: AdminNotificationPreviewItemProps) {
  return (
    <div
      className={cn(
        "flex gap-3 border-b border-border/60 px-4 py-3 last:border-b-0",
        !notification.isRead && "bg-primary-50/40",
        compact && "px-3 py-2.5",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "mt-1.5 size-2 shrink-0 rounded-full",
          notification.isRead ? "bg-transparent" : "bg-success",
        )}
      />
      <div className="min-w-0 flex-1 space-y-1">
        <p
          className={cn(
            "text-sm leading-snug text-foreground",
            !notification.isRead && "font-medium",
          )}
        >
          {notification.title}
        </p>
        {!compact ? (
          <p className="text-xs leading-relaxed text-muted-foreground">
            {notification.body}
          </p>
        ) : null}
        <p className="text-xs text-muted-foreground">{notification.time}</p>
      </div>
    </div>
  );
}
