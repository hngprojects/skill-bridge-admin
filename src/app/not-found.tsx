import Image from "next/image";
import Link from "next/link";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center md:py-24">
      <div className="flex w-full max-w-2xl flex-col items-center">
        <Image
          src="/assets/404-illustration.svg"
          alt="404 illustration"
          width={700}
          height={471}
          priority
          className="h-auto w-full max-w-md md:max-w-lg"
        />

        <h1 className="section-h2 mt-6 text-primary-900">
          Oops! Page not found
        </h1>

        <p className="body mt-3 max-w-md text-muted-foreground">
          The page you are looking for doesn&apos;t exist. Try again later.
        </p>

        <Button asChild className="mt-6 md:mt-8">
          <Link href="/">
            <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} />
            Return to dashboard
          </Link>
        </Button>
      </div>
    </main>
  );
}
