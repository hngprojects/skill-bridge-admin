import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/constants/admin-routes";

export function MarketingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-landing-nav text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <Link href={ROUTES.home} className="relative block h-7 w-32 shrink-0">
          <Image
            src="/assets/logo/logo-with-text-white.svg"
            alt="SkillBridge"
            fill
            className="object-contain object-left"
            sizes="128px"
          />
        </Link>

        <p className="text-xs text-white/55 sm:text-center">
          © {year} SkillBridge. Authorized admin personnel only.
        </p>

        <Link
          href={ROUTES.login}
          className="text-xs font-medium text-white/70 transition-colors hover:text-white"
        >
          Sign in
        </Link>
      </div>
    </footer>
  );
}
