"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AdminNavIcon } from "@/components/layout/admin-nav-icons";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { ADMIN_NAV_LINKS } from "@/constants/admin-nav";
import { ADMIN_ROLE_LABELS } from "@/constants/admin-roles";
import { ROUTES } from "@/constants/admin-routes";
import { filterNavByRole } from "@/lib/navigation";
import { isNavLinkActive } from "@/lib/nav-utils";
import type { AdminRole } from "@/types/api/auth";

type AdminSidebarProps = {
  role: AdminRole;
};

export function AdminSidebar({ role }: AdminSidebarProps) {
  const pathname = usePathname();
  const links = filterNavByRole(ADMIN_NAV_LINKS, role);

  return (
    <Sidebar collapsible="icon" className="border-r border-border/80">
      <SidebarHeader className="flex h-14 shrink-0 flex-row items-center gap-2 border-b border-border bg-linear-to-br from-primary-50/90 via-background to-secondary-50/40 p-0 px-3">
        <Link
          href={ROUTES.dashboard}
          className="flex items-center gap-2 overflow-hidden rounded-md px-1 py-0.5 group-data-[collapsible=icon]:justify-center"
        >
          <Image
            src="/assets/logo/logo.svg"
            alt="SkillBridge"
            width={28}
            height={28}
            className="hidden size-7 shrink-0 group-data-[collapsible=icon]:block"
          />
          <Image
            src="/assets/logo/logo-with-text.svg"
            alt="SkillBridge Admin"
            width={120}
            height={28}
            className="h-7 w-auto group-data-[collapsible=icon]:hidden"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isNavLinkActive(pathname, item.href)}
                    tooltip={item.label}
                    className="transition-colors data-[active=true]:bg-primary-100 data-[active=true]:font-medium data-[active=true]:text-primary-900"
                  >
                    <Link href={item.href}>
                      <AdminNavIcon
                        name={item.icon}
                        className="size-4 shrink-0"
                      />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3 group-data-[collapsible=icon]:hidden">
        <div className="rounded-xl bg-primary-50/80 px-3 py-2.5 ring-1 ring-primary-200/60">
          <Badge
            variant="secondary"
            className="mt-1.5 rounded-full bg-white/80 px-2.5 py-0.5 text-[11px] font-medium text-primary-800"
          >
            {ADMIN_ROLE_LABELS[role]}
          </Badge>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
