"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Logout01Icon } from "@hugeicons/core-free-icons";
import { usePathname } from "next/navigation";

import { AdminNavIcon } from "@/components/layout/admin-nav-icons";
import { AdminNotificationBell } from "@/components/layout/admin-notification-bell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ADMIN_NAV_LINKS } from "@/constants/admin-nav";
import { ADMIN_ROLE_LABELS } from "@/constants/admin-roles";
import { ROUTES } from "@/constants/admin-routes";
import {
  getInitials,
  getPageTitle,
  getShortName,
} from "@/lib/admin-navbar-utils";
import { isNavLinkActive } from "@/lib/nav-utils";
import type { AdminRole } from "@/types/api/auth";

type AdminNavbarProps = {
  user: {
    name?: string | null;
    email?: string | null;
    role?: AdminRole;
  };
};

export function AdminNavbar({ user }: AdminNavbarProps) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);
  const roleLabel = user.role ? ADMIN_ROLE_LABELS[user.role] : "Admin";
  const displayName = user.name?.trim() || user.email || "Admin user";
  const shortName = getShortName(user.name, user.email);
  const isSuperAdmin = user.role === "super_admin";
  const activeNavIcon =
    pathname === ROUTES.notifications
      ? "notification"
      : (ADMIN_NAV_LINKS.find((item) => isNavLinkActive(pathname, item.href))
          ?.icon ?? "dashboard");

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:px-6">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="hidden h-4 md:block" />

      <div className="flex min-w-0 flex-1 items-center gap-2">
        <AdminNavIcon
          name={activeNavIcon}
          className="size-4 shrink-0 text-muted-foreground"
        />
        <h1 className="truncate text-sm font-semibold text-foreground md:text-base">
          {pageTitle}
        </h1>
      </div>

      <div className="flex items-center gap-1">
        <AdminNotificationBell />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 gap-2 px-2 hover:bg-muted">
              <Avatar className="size-7">
                <AvatarFallback className="bg-primary-100 text-xs font-semibold text-primary-800">
                  {getInitials(user.name, user.email)}
                </AvatarFallback>
              </Avatar>
              <span className="hidden max-w-32 truncate text-sm font-medium md:inline">
                {displayName}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                <span className="text-sm font-medium text-foreground">
                  {shortName}
                </span>
                <span aria-hidden className="text-muted-foreground">
                  ·
                </span>
                <Badge
                  variant="secondary"
                  className="rounded-full px-2 py-0 text-[11px] font-medium"
                >
                  {roleLabel}
                </Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={ROUTES.settings}>
                <AdminNavIcon name="settings" className="size-4" />
                Account Settings
              </Link>
            </DropdownMenuItem>
            {isSuperAdmin ? (
              <DropdownMenuItem asChild>
                <Link href={ROUTES.adminManagement}>
                  <AdminNavIcon name="admin" className="size-4" />
                  Admin Management
                </Link>
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => void signOut({ callbackUrl: ROUTES.login })}
            >
              <HugeiconsIcon
                icon={Logout01Icon}
                size={16}
                strokeWidth={1.5}
                aria-hidden
              />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
