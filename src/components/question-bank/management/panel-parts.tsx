import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusPill } from "@/components/shared/status-pill";
import type { FlagEntry } from "@/types/api/question-bank";

// ---------------------------------------------------------------------------
// Answer options (view + edit mode)
// ---------------------------------------------------------------------------

type AnswerOption = { id: string; text: string };

type AnswerOptionsProps = {
  options: AnswerOption[];
  correctAnswerId: string;
  isEditMode: boolean;
  editOptions: AnswerOption[];
  editCorrectId: string;
  onEditOption: (id: string, text: string) => void;
  onEditCorrectId: (id: string) => void;
};

export function AnswerOptions({
  options,
  correctAnswerId,
  isEditMode,
  editOptions,
  editCorrectId,
  onEditOption,
  onEditCorrectId,
}: AnswerOptionsProps) {
  const displayOptions = isEditMode ? editOptions : options;
  const displayCorrectId = isEditMode ? editCorrectId : correctAnswerId;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Answer options
      </p>
      {displayOptions.map((opt) => {
        const isCorrect = opt.id === displayCorrectId;
        return (
          <div
            key={opt.id}
            className={`rounded-lg border px-3 py-2 text-sm ${isCorrect ? "border-success/30 bg-success/5 text-success" : "border-border bg-muted/30"}`}
          >
            {isEditMode ? (
              <input
                className="w-full bg-transparent outline-none"
                value={opt.text}
                onChange={(e) => onEditOption(opt.id, e.target.value)}
              />
            ) : (
              <span>
                {opt.text}
                {isCorrect && (
                  <span className="ml-2 text-xs font-semibold">✓ Correct</span>
                )}
              </span>
            )}
          </div>
        );
      })}
      {isEditMode && (
        <div className="flex flex-col gap-1.5">
          <Label>Correct answer</Label>
          <Select value={editCorrectId} onValueChange={onEditCorrectId}>
            <SelectTrigger>
              <SelectValue placeholder="Select correct option" />
            </SelectTrigger>
            <SelectContent>
              {editOptions.map((o) => (
                <SelectItem key={o.id} value={o.id}>
                  {o.text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Flag history accordion
// ---------------------------------------------------------------------------

export function FlagHistory({ entries }: { entries: FlagEntry[] }) {
  if (entries.length === 0) return null;
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="flags">
        <AccordionTrigger className="text-sm font-medium">
          Flag history ({entries.length})
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-3 pt-1">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{entry.reason}</span>
                  <StatusPill
                    status={entry.status}
                    variant={entry.status === "Open" ? "warning" : "muted"}
                  />
                </div>
                {entry.note && (
                  <p className="mt-1 text-muted-foreground">{entry.note}</p>
                )}
                <p className="mt-1 text-xs text-muted-foreground">
                  {entry.loggedBy} ·{" "}
                  {new Date(entry.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
