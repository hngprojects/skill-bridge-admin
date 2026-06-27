import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/admin-routes";

export function MarketingNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-landing-nav backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href={ROUTES.home}
          className="relative h-9 w-32 shrink-0 md:h-10 md:w-40"
        >
          <Image
            src="/assets/logo/logo-with-text-white.svg"
            alt="SkillBridge"
            fill
            className="object-contain object-left"
            priority
            sizes="(max-width: 768px) 128px, 160px"
          />
        </Link>

        <Button
          asChild
          className="rounded-lg bg-white px-6 py-5 text-sm font-semibold text-landing-nav hover:bg-white/90"
        >
          <Link href={ROUTES.login}>Sign in</Link>
        </Button>
      </div>
    </header>
  );
}
