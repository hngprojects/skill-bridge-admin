import { EngagementStatCards } from "./engagement-stat-cards";
import { MinorAssessmentUptakeChart } from "./minor-assessment-uptake-chart";
import { RetakeDropoffChart } from "./retake-dropoff-chart";

export function EngagementShell() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold tracking-tight">Engagement</h1>
        <p className="text-sm text-muted-foreground">
          Track candidate retakes and minor assessment engagement across the
          platform.
        </p>
      </div>

      <EngagementStatCards />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <RetakeDropoffChart />
        <MinorAssessmentUptakeChart />
      </div>
    </div>
  );
}
