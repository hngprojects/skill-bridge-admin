"use client";

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AlertCircleIcon,
  EyeIcon,
  EyeOffIcon,
} from "@hugeicons/core-free-icons";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const formFieldRootClass = "flex w-full flex-col items-stretch gap-2";

const formFieldLabelClass = "text-sm font-medium leading-none text-[#0D2025]";

const formFieldControlClass =
  "h-11 w-full min-w-0 rounded-lg border border-[#D5DEE3] bg-white px-3.5 text-[15px] leading-5 text-[#0D2025] shadow-none outline-none transition-[color,box-shadow,border-color] placeholder:text-[#64748B] focus-visible:border-[#3F7F95] focus-visible:ring-[3px] focus-visible:ring-[#3F7F95]/15 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-error aria-invalid:ring-[3px] aria-invalid:ring-error/15";

const formFieldErrorClass = "text-sm leading-[18px] text-error";

type FormInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "id" | "type" | "className"
> & {
  id?: string;
  label: string;
  required?: boolean;
  type?: "text" | "email" | "password";
  validateEmail?: boolean;
  error?: string;
  className?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function FormInput({
  id,
  label,
  required,
  placeholder,
  error,
  className,
  type = "text",
  validateEmail,
  ...inputProps
}: FormInputProps) {
  const [internalError, setInternalError] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const fieldId = React.useId();
  const inputId = id ?? fieldId;
  const errorId = `${inputId}-error`;
  const displayError = error || internalError;
  const hasError = Boolean(displayError);

  const runEmailValidation = (value: string) => {
    const isEmailField = type === "email" || validateEmail;
    if (!isEmailField) return;

    const trimmed = value.trim();
    if (!trimmed) {
      setInternalError(required ? "Email is required." : "");
      return;
    }

    if (!EMAIL_REGEX.test(trimmed)) {
      setInternalError("Please enter a valid email address.");
      return;
    }

    setInternalError("");
  };

  return (
    <div className={cn(formFieldRootClass, className)}>
      <Label htmlFor={inputId} className={formFieldLabelClass}>
        {label}
      </Label>

      <div className="relative flex w-full flex-row items-center">
        <Input
          {...inputProps}
          id={inputId}
          required={required}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={cn(
            formFieldControlClass,
            type === "password" ? (hasError ? "pr-20" : "pr-11") : "",
          )}
          onBlur={(event) => {
            inputProps.onBlur?.(event);
            runEmailValidation(event.currentTarget.value);
          }}
        />

        {type === "password" ? (
          <div className="absolute inset-y-0 right-2 flex items-center gap-1">
            {hasError ? (
              <HugeiconsIcon
                icon={AlertCircleIcon}
                size={16}
                strokeWidth={1.5}
                className="text-error"
                aria-hidden
              />
            ) : null}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="flex size-8 items-center justify-center rounded-md text-[#64748B] transition-colors hover:bg-[#F1F5F9] hover:text-[#0D2025]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <HugeiconsIcon
                  icon={EyeOffIcon}
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden
                />
              ) : (
                <HugeiconsIcon
                  icon={EyeIcon}
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden
                />
              )}
            </button>
          </div>
        ) : null}
      </div>

      {displayError ? (
        <p id={errorId} className={formFieldErrorClass} role="alert">
          {displayError}
        </p>
      ) : null}
    </div>
  );
}

export { FormInput };
