import { ADMIN_NAV_LINKS } from "@/constants/admin-nav";
import { ROUTES } from "@/constants/admin-routes";
import { isNavLinkActive } from "@/lib/nav-utils";

export function getShortName(
  name: string | null | undefined,
  email: string | null | undefined,
) {
  const trimmed = name?.trim();
  if (trimmed) {
    return trimmed.split(/\s+/)[0] ?? trimmed;
  }

  return email?.split("@")[0] ?? "Admin";
}

export function getInitials(
  name: string | null | undefined,
  email: string | null | undefined,
) {
  const trimmed = name?.trim();
  if (trimmed) {
    const parts = trimmed.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0]?.[0] ?? ""}${parts[parts.length - 1]?.[0] ?? ""}`.toUpperCase();
    }
    return trimmed.slice(0, 2).toUpperCase();
  }

  return email?.slice(0, 2).toUpperCase() ?? "AD";
}

export function getPageTitle(pathname: string): string {
  if (isNavLinkActive(pathname, ROUTES.notifications)) {
    return "Notifications";
  }

  const match = ADMIN_NAV_LINKS.find((item) =>
    isNavLinkActive(pathname, item.href),
  );
  return match?.label ?? "Admin";
}
