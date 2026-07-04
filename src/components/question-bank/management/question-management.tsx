"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { ServerDataTable } from "@/components/shared/server-data-table";
import { useDebounce } from "@/hooks/use-debounce";
import { useQuestions } from "@/hooks/api/use-question-bank";
import type { Question } from "@/types/api/question-bank";
import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import { questionColumns } from "./columns";
import { QuestionDetailPanel } from "./question-detail-panel";
import { AddQuestionModal } from "./add-question-modal";
import { GenerateQuestionsModal } from "./generate-questions-modal";
import { QuestionManagementToolbar } from "./question-management-toolbar";
import { readParams } from "./question-management-params";

type QuestionManagementProps = {
  isReadOnly: boolean;
  selectedQuestion: Question | null;
  panelOpen: boolean;
  onOpenPanel: (question: Question) => void;
  onClosePanel: () => void;
};

export function QuestionManagement({
  isReadOnly,
  selectedQuestion,
  panelOpen,
  onOpenPanel,
  onClosePanel,
}: QuestionManagementProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = React.useMemo(
    () => readParams((key) => searchParams.get(key)),
    [searchParams],
  );

  const { data, isLoading } = useQuestions(params);
  const questions = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = data
    ? Math.ceil(data.total / (data.limit || DEFAULT_PAGE_SIZE))
    : 0;

  const [addOpen, setAddOpen] = React.useState(false);
  const [generateOpen, setGenerateOpen] = React.useState(false);

  function setParams(updates: Record<string, string | null>) {
    const next = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === "") next.delete(key);
      else next.set(key, value);
    }
    const query = next.toString();
    window.history.replaceState(
      null,
      "",
      query ? `${pathname}?${query}` : pathname,
    );
  }

  const [searchInput, setSearchInput] = React.useState(
    () => searchParams.get("qb_search") ?? "",
  );
  const debouncedSearch = useDebounce(searchInput, 300);
  const prevSearch = React.useRef(debouncedSearch);

  React.useEffect(() => {
    if (debouncedSearch !== prevSearch.current) {
      prevSearch.current = debouncedSearch;
      setParams({ qb_search: debouncedSearch || null, qb_page: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  function handleAssessmentChange(value: string) {
    setParams({ qb_assessment: value || null, qb_page: null });
  }

  function handleLevelChange(value: string) {
    setParams({ qb_level: value || null, qb_page: null });
  }

  function handlePageChange(pageIndex: number) {
    const nextPage = pageIndex + 1;
    setParams({ qb_page: nextPage > 1 ? String(nextPage) : null });
  }

  return (
    <div className="flex flex-col gap-4">
      <QuestionManagementToolbar
        searchInput={searchInput}
        onSearchChange={setSearchInput}
        assessmentFilter={params.assessment_type ?? ""}
        onAssessmentChange={handleAssessmentChange}
        levelFilter={params.verified_level ?? ""}
        onLevelChange={handleLevelChange}
        isLoading={isLoading}
        total={total}
        isReadOnly={isReadOnly}
        onAddClick={() => setAddOpen(true)}
        onGenerateClick={() => setGenerateOpen(true)}
      />

      <ServerDataTable
        columns={questionColumns}
        data={questions}
        pageIndex={(params.page ?? 1) - 1}
        pageCount={totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoading}
        emptyTitle="No questions found"
        emptyMessage="Try adjusting your filters."
        onRowClick={onOpenPanel}
      />

      <QuestionDetailPanel
        question={selectedQuestion}
        open={panelOpen}
        onClose={onClosePanel}
        isReadOnly={isReadOnly}
      />

      {!isReadOnly && (
        <>
          <AddQuestionModal open={addOpen} onOpenChange={setAddOpen} />
          <GenerateQuestionsModal
            open={generateOpen}
            onOpenChange={setGenerateOpen}
          />
        </>
      )}
    </div>
  );
}
