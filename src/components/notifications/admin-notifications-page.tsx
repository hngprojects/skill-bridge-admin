import { AdminNotificationPreviewItem } from "@/components/notifications/admin-notification-preview-item";
import { Badge } from "@/components/ui/badge";
import {
  ADMIN_NOTIFICATIONS,
  getUnreadNotificationCount,
} from "@/constants/admin-notifications";

export function AdminNotificationsPage() {
  const unreadCount = getUnreadNotificationCount(ADMIN_NOTIFICATIONS);

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h2 className="section-h2 text-foreground">Notifications</h2>
          <p className="body text-muted-foreground">
            View platform activity and review alerts. Full notification delivery
            will connect to the admin API in a follow-up.
          </p>
        </div>
        {unreadCount > 0 ? (
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            {unreadCount} unread
          </Badge>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {ADMIN_NOTIFICATIONS.length > 0 ? (
          ADMIN_NOTIFICATIONS.map((notification) => (
            <AdminNotificationPreviewItem
              key={notification.id}
              notification={notification}
            />
          ))
        ) : (
          <p className="px-4 py-10 text-center text-sm text-muted-foreground">
            No notifications yet.
          </p>
        )}
      </div>
    </section>
  );
}
