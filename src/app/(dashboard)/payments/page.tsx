import type { Metadata } from "next";
import { forbidden, redirect } from "next/navigation";

import { PaymentsShell } from "@/components/payments/payments-shell";
import { ROUTES } from "@/constants/admin-routes";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Payments",
};

export default async function PaymentsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect(ROUTES.login);
  }

  if (session.user.role !== "super_admin") {
    forbidden();
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Payments</h1>
        <p className="text-sm text-muted-foreground">
          Revenue, subscriptions, and transaction history across all accounts.
        </p>
      </div>

      <PaymentsShell />
    </div>
  );
}
