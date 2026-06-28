import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { QuestionBankShell } from "@/components/question-bank/question-bank-shell";
import { ROUTES } from "@/constants/admin-routes";
import { auth } from "@/lib/auth";
import type { AdminRole } from "@/types/api/auth";

export const metadata: Metadata = {
  title: "Question Bank",
};

function resolveRole(role: string | undefined): AdminRole | null {
  if (role === "super_admin" || role === "admin" || role === "reviewer") {
    return role;
  }
  return null;
}

export default async function QuestionBankPage() {
  const session = await auth();
  const role = resolveRole(session?.user?.role);

  if (!role) {
    redirect(ROUTES.login);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Question Bank</h1>
        <p className="text-sm text-muted-foreground">
          Manage assessment questions, monitor bank health, and track AI
          generation activity.
        </p>
      </div>

      <QuestionBankShell role={role} />
    </div>
  );
}
