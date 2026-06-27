import { ComingSoon } from "@/components/custom/coming-soon";
import { ROUTES } from "@/constants/admin-routes";

type AdminPagePlaceholderProps = {
  description?: string;
  backHref?: string;
};

export function AdminPagePlaceholder({
  description,
  backHref = ROUTES.dashboard,
}: AdminPagePlaceholderProps) {
  return (
    <ComingSoon
      description={description}
      backHref={backHref}
      backLabel="Back to overview"
    />
  );
}
