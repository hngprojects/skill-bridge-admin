import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  Bell,
  Building2,
  CircleHelp,
  CreditCard,
  Headphones,
  LayoutDashboard,
  Megaphone,
  Settings,
  Shield,
  UserCog,
  Users,
} from "lucide-react";

const ADMIN_NAV_ICON_MAP = {
  dashboard: LayoutDashboard,
  users: Users,
  building: Building2,
  question: CircleHelp,
  shield: Shield,
  offer: BriefcaseBusiness,
  payment: CreditCard,
  engagement: Megaphone,
  support: Headphones,
  settings: Settings,
  admin: UserCog,
  notification: Bell,
} as const satisfies Record<string, LucideIcon>;

export type AdminNavIconName = keyof typeof ADMIN_NAV_ICON_MAP;

export function AdminNavIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon =
    name in ADMIN_NAV_ICON_MAP
      ? ADMIN_NAV_ICON_MAP[name as AdminNavIconName]
      : LayoutDashboard;

  return <Icon className={className} aria-hidden />;
}
