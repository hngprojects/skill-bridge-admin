"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { ServerDataTable } from "@/components/shared/server-data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/use-debounce";
import { useQuestions } from "@/hooks/api/use-question-bank";
import type { Question, QuestionsQueryParams } from "@/types/api/question-bank";
import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import { questionColumns } from "./columns";
import { QuestionDetailPanel } from "./question-detail-panel";
import { AddQuestionModal } from "./add-question-modal";
import { GenerateQuestionsModal } from "./generate-questions-modal";

const ASSESSMENT_TYPES = ["skill", "advanced"] as const;
const LEVELS = ["junior", "mid", "senior", "expert"] as const;

function snakeToTitle(value: string): string {
  return value
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function readParams(get: (key: string) => string | null): QuestionsQueryParams {
  const params: QuestionsQueryParams = { limit: DEFAULT_PAGE_SIZE };
  const page = Number(get("qb_page"));
  params.page = Number.isInteger(page) && page > 0 ? page : 1;
  const search = get("qb_search");
  if (search) params.search = search;
  const assessment = get("qb_assessment");
  if (assessment) params.assessment_type = assessment;
  const track = get("qb_track");
  if (track) params.track = track;
  const level = get("qb_level");
  if (level) params.verified_level = level;
  return params;
}

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

  // Search with debounce
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

  const assessmentFilter = params.assessment_type ?? "";
  const levelFilter = params.verified_level ?? "";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Input
            className="h-8 w-56 text-sm"
            placeholder="Search questions…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          <Select
            value={assessmentFilter}
            onValueChange={handleAssessmentChange}
          >
            <SelectTrigger size="sm" className="w-36">
              <SelectValue placeholder="Assessment" />
            </SelectTrigger>
            <SelectContent>
              {ASSESSMENT_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {snakeToTitle(t)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={levelFilter} onValueChange={handleLevelChange}>
            <SelectTrigger size="sm" className="w-32">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              {LEVELS.map((l) => (
                <SelectItem key={l} value={l}>
                  <span className="capitalize">{l}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {!isLoading && (
            <span className="text-sm text-muted-foreground">
              {total.toLocaleString()} questions
            </span>
          )}
        </div>

        {!isReadOnly && (
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setGenerateOpen(true)}>
              Generate with AI
            </Button>
            <Button onClick={() => setAddOpen(true)}>
              Add Question Manually
            </Button>
          </div>
        )}
      </div>

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
