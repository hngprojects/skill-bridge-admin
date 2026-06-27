import { LoginFormCard } from "@/components/auth/login-form-card";
import { LoginMobileHeader } from "@/components/auth/login-mobile-header";
import { LOGIN_FORM_COPY } from "@/constants/login-page";

export function LoginFormPanel() {
  return (
    <div className="flex min-h-dvh flex-col bg-landing-hero-bg lg:bg-[#F7F9FA]">
      <LoginMobileHeader />

      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <div className="w-full max-w-[440px]">
          <LoginFormCard />

          <p className="mt-6 text-center text-sm text-[#64748B] lg:text-left">
            {LOGIN_FORM_COPY.accessNote}{" "}
            <span className="font-medium text-foreground">
              {LOGIN_FORM_COPY.accessAction}
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}
