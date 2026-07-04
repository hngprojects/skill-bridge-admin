"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { login } from "@/actions/auth";
import { FormInput } from "@/components/custom/form-input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { getPostLoginPath } from "@/lib/navigation";
import {
  adminLoginFormSchema,
  type AdminLoginFormValues,
} from "@/types/form-schema";

export function AdminLoginForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const canSubmit = isValid && !isSubmitting;

  async function onSubmit(values: AdminLoginFormValues) {
    setFormError(null);

    let user: Awaited<ReturnType<typeof login>>["user"];
    try {
      const data = await login({
        email: values.email,
        password: values.password,
      });
      user = data.user;
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      return;
    }

    const signInResult = await signIn("credentials", {
      sessionUser: "true",
      userId: user.id,
      email: user.email,
      name: user.fullname,
      image: user.avatar_url ?? undefined,
      role: user.admin_tier ?? user.role,
      redirect: false,
    });

    if (signInResult?.error) {
      setFormError(
        "Signed in with the API, but couldn't start your session. Try again.",
      );
      return;
    }

    router.replace(getPostLoginPath(user.role));
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-full min-w-0 flex-col gap-5"
    >
      {formError ? (
        <div
          className="rounded-lg border border-error/20 bg-[#FEF2F2] px-3.5 py-3 text-sm leading-relaxed text-error"
          role="alert"
        >
          {formError}
        </div>
      ) : null}

      <FormInput
        label="Email"
        required
        type="email"
        validateEmail
        placeholder="Enter your email address"
        error={errors.email?.message}
        {...register("email")}
      />

      <FormInput
        label="Password"
        required
        type="password"
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register("password")}
      />

      <Button
        type="submit"
        disabled={!canSubmit}
        className="mt-1 h-12 w-full rounded-[10px] bg-primary-900 text-sm font-semibold text-white shadow-[0_8px_24px_-12px_rgba(13,32,37,0.65)] hover:bg-landing-dark disabled:opacity-50"
      >
        {isSubmitting ? (
          <span className="inline-flex items-center gap-2">
            <Spinner className="size-4 text-white" />
            Signing in...
          </span>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
}
