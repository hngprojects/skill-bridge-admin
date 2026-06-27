"use client";

import { isFuture } from "date-fns";

import { SlideOverPanel } from "@/components/shared/slide-over-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCandidateDetail } from "@/hooks/api/use-talents";
import { DetailsTab } from "./details-tab";
import { ProfileTab } from "./profile-tab";
import { ResultsTab } from "./results-tab";

type CandidateDetailPanelProps = {
  talentId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CandidateDetailPanel({
  talentId,
  open,
  onOpenChange,
}: CandidateDetailPanelProps) {
  const { data, isLoading } = useCandidateDetail(talentId);

  const isGated =
    !!data?.stage3?.retakeGateExpiresAt &&
    isFuture(new Date(data.stage3.retakeGateExpiresAt));

  return (
    <SlideOverPanel
      open={open}
      onOpenChange={onOpenChange}
      title={data?.name ?? "Candidate Detail"}
      description={data?.email}
      isLoading={isLoading || (talentId !== null && !data)}
    >
      <Tabs defaultValue="profile">
        <div className="border-b border-border px-6">
          <TabsList className="h-auto gap-0 rounded-none bg-transparent p-0">
            {(["profile", "results", "details"] as const).map((tab) => (
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
              <ProfileTab data={data} />
            </TabsContent>
            <TabsContent value="results" className="mt-0">
              <ResultsTab data={data} isGated={isGated} />
            </TabsContent>
            <TabsContent value="details" className="mt-0">
              <DetailsTab data={data} />
            </TabsContent>
          </>
        )}
      </Tabs>
    </SlideOverPanel>
  );
}
