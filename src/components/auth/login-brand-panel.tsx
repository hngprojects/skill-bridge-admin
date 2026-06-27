import Image from "next/image";
import Link from "next/link";

import { LoginBrandPanelCard } from "@/components/auth/login-brand-panel-card";
import { LOGIN_BRAND_CARDS, LOGIN_BRAND_COPY } from "@/constants/login-page";
import { ROUTES } from "@/constants/admin-routes";

export function LoginBrandPanel() {
  return (
    <aside className="relative hidden overflow-hidden bg-landing-nav lg:flex lg:flex-col lg:justify-between lg:p-10 xl:p-14">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      >
        <div className="absolute -top-24 -left-24 size-72 rounded-full bg-primary-600/30 blur-3xl" />
        <div className="absolute right-0 bottom-0 size-80 rounded-full bg-secondary-400/25 blur-3xl" />
      </div>

      <div className="relative z-10">
        <Link href={ROUTES.home} className="inline-flex">
          <Image
            src="/assets/logo/logo-with-text-white.svg"
            alt="SkillBridge"
            width={180}
            height={40}
            className="h-9 w-auto"
            priority
          />
        </Link>
      </div>

      <div className="relative z-10 max-w-lg space-y-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-landing-teal">
            {LOGIN_BRAND_COPY.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl leading-[1.08] font-bold tracking-tight text-white xl:text-[2.75rem]">
            {LOGIN_BRAND_COPY.headline}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            {LOGIN_BRAND_COPY.subcopy}
          </p>
        </div>

        <div className="grid gap-4">
          {LOGIN_BRAND_CARDS.map((card) => (
            <LoginBrandPanelCard key={card.title} {...card} />
          ))}
        </div>
      </div>

      <p className="relative z-10 text-sm text-white/45">
        {LOGIN_BRAND_COPY.disclaimer}
      </p>
    </aside>
  );
}
