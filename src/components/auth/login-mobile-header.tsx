import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/constants/admin-routes";

export function LoginMobileHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-5 lg:hidden">
      <Link href={ROUTES.home} className="inline-flex">
        <Image
          src="/assets/logo/logo-with-text.svg"
          alt="SkillBridge"
          width={140}
          height={32}
          className="h-8 w-auto"
          priority
        />
      </Link>
    </header>
  );
}
