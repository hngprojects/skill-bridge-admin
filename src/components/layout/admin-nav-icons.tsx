import { HugeiconsIcon } from "@hugeicons/react";
import {
  BriefcaseBusinessIcon,
  Building2Icon,
  CreditCardIcon,
  DashboardSquare01Icon,
  HeadphonesIcon,
  HelpCircleIcon,
  Megaphone01Icon,
  Notification01Icon,
  Settings01Icon,
  Shield01Icon,
  UserGroupIcon,
  UserSettings01Icon,
} from "@hugeicons/core-free-icons";

const ADMIN_NAV_ICON_MAP = {
  dashboard: DashboardSquare01Icon,
  users: UserGroupIcon,
  building: Building2Icon,
  question: HelpCircleIcon,
  shield: Shield01Icon,
  offer: BriefcaseBusinessIcon,
  payment: CreditCardIcon,
  engagement: Megaphone01Icon,
  support: HeadphonesIcon,
  settings: Settings01Icon,
  admin: UserSettings01Icon,
  notification: Notification01Icon,
} as const;

export type AdminNavIconName = keyof typeof ADMIN_NAV_ICON_MAP;

export function AdminNavIcon({
  name,
  className,
  size = 16,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const icon =
    name in ADMIN_NAV_ICON_MAP
      ? ADMIN_NAV_ICON_MAP[name as AdminNavIconName]
      : DashboardSquare01Icon;

  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      strokeWidth={1.5}
      className={className}
      aria-hidden
    />
  );
}
