import { AdminLoginForm } from "@/components/auth/admin-login-form";
import { LOGIN_FORM_COPY } from "@/constants/login-page";

export function LoginFormCard() {
  return (
    <div className="rounded-[28px] border border-white/80 bg-white p-7 shadow-[0_20px_60px_-24px_rgba(13,32,37,0.28)] sm:p-9">
      <div className="mb-8 space-y-3 text-center lg:text-left">
        <h2 className="text-[1.75rem] leading-tight font-bold tracking-tight text-landing-ink">
          {LOGIN_FORM_COPY.title}
        </h2>
        <p className="text-[15px] leading-relaxed text-[#64748B]">
          {LOGIN_FORM_COPY.subcopy}
        </p>
      </div>

      <AdminLoginForm />
    </div>
  );
}
