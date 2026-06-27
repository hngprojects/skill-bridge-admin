import { ROUTES } from "@/constants/admin-routes";

const EXACT_MATCH_HREFS = new Set<string>([ROUTES.dashboard]);

export function isNavLinkActive(pathname: string, href: string): boolean {
  if (EXACT_MATCH_HREFS.has(href)) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
