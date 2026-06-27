export type AdminNotification = {
  id: string;
  title: string;
  body: string;
  time: string;
  isRead: boolean;
};

export const ADMIN_NOTIFICATIONS: AdminNotification[] = [
  {
    id: "1",
    title: "New question submitted for review",
    body: "Frontend fundamentals batch · 12 items awaiting approval.",
    time: "2 hours ago",
    isRead: false,
  },
  {
    id: "2",
    title: "Integrity flag raised",
    body: "Session #4821 flagged for review in the integrity queue.",
    time: "5 hours ago",
    isRead: false,
  },
  {
    id: "3",
    title: "Talent profile pending review",
    body: "Amara Okafor submitted a profile update for moderation.",
    time: "Yesterday",
    isRead: false,
  },
  {
    id: "4",
    title: "Offer requires admin attention",
    body: "Northwind Labs offer is waiting on final approval.",
    time: "2 days ago",
    isRead: true,
  },
  {
    id: "5",
    title: "Weekly platform summary ready",
    body: "Engagement and support metrics are available for review.",
    time: "3 days ago",
    isRead: true,
  },
];

export const ADMIN_NOTIFICATION_PREVIEW_LIMIT = 3;

export function getUnreadNotificationCount(
  notifications: readonly AdminNotification[],
): number {
  return notifications.filter((notification) => !notification.isRead).length;
}
