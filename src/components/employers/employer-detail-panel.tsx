"use client";

import { SlideOverPanel } from "@/components/shared/slide-over-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEmployerDetail } from "@/hooks/api/use-employers";
import { EmployerActivityTab } from "./employer-activity-tab";
import { EmployerProfileTab } from "./employer-profile-tab";

type EmployerDetailPanelProps = {
  employerId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EmployerDetailPanel({
  employerId,
  open,
  onOpenChange,
}: EmployerDetailPanelProps) {
  const { data, isLoading } = useEmployerDetail(employerId);

  return (
    <SlideOverPanel
      open={open}
      onOpenChange={onOpenChange}
      title={data?.companyName ?? "Employer Detail"}
      description={data?.industry}
      isLoading={isLoading || (employerId !== null && !data)}
    >
      <Tabs defaultValue="profile">
        <div className="border-b border-border px-6">
          <TabsList className="h-auto gap-0 rounded-none bg-transparent p-0">
            {(["profile", "activity"] as const).map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="rounded-none border-b-2 border-transparent capitalize data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {data && (
          <>
            <TabsContent value="profile" className="mt-0">
              <EmployerProfileTab data={data} />
            </TabsContent>
            <TabsContent value="activity" className="mt-0">
              <EmployerActivityTab data={data} />
            </TabsContent>
          </>
        )}
      </Tabs>
    </SlideOverPanel>
  );
}
