import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StatusPill } from "@/components/shared/status-pill";
import type { GeneratedQuestionPreview } from "@/types/api/question-bank";

type PreviewCardProps = {
  preview: GeneratedQuestionPreview;
  isEditing: boolean;
  editDraft: string;
  onEditDraftChange: (v: string) => void;
  onSetStatus: (
    id: string,
    status: GeneratedQuestionPreview["reviewStatus"],
  ) => void;
  onStartEdit: (preview: GeneratedQuestionPreview) => void;
  onSaveEdit: (id: string) => void;
};

export function PreviewCard({
  preview,
  isEditing,
  editDraft,
  onEditDraftChange,
  onSetStatus,
  onStartEdit,
  onSaveEdit,
}: PreviewCardProps) {
  const statusLabel =
    preview.reviewStatus === "accepted"
      ? "Accepted"
      : preview.reviewStatus === "rejected"
        ? "Rejected"
        : "Pending";
  const statusVariant =
    preview.reviewStatus === "accepted"
      ? "success"
      : preview.reviewStatus === "rejected"
        ? "muted"
        : "default";
  const cardClass =
    preview.reviewStatus === "accepted"
      ? "border-success/30 bg-success/5"
      : preview.reviewStatus === "rejected"
        ? "border-border bg-muted/30 opacity-50"
        : "border-border";

  return (
    <div className={`rounded-xl border p-4 text-sm ${cardClass}`}>
      <div className="mb-2 flex items-start justify-between gap-2">
        <p className="font-medium leading-snug">
          {isEditing ? (
            <Textarea
              value={editDraft}
              onChange={(e) => onEditDraftChange(e.target.value)}
              rows={2}
              className="mt-1"
            />
          ) : (
            (preview.editedText ?? preview.text)
          )}
        </p>
        <StatusPill status={statusLabel} variant={statusVariant} />
      </div>

      <ul className="mb-3 space-y-1">
        {preview.options.map((opt) => (
          <li
            key={opt.id}
            className={
              opt.id === preview.correctAnswerId
                ? "font-medium text-success"
                : "text-muted-foreground"
            }
          >
            {opt.id === preview.correctAnswerId ? "✓ " : "· "}
            {opt.text}
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        {preview.reviewStatus !== "accepted" && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onSetStatus(preview.id, "accepted")}
          >
            Accept
          </Button>
        )}
        {isEditing ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onSaveEdit(preview.id)}
          >
            Save edit
          </Button>
        ) : (
          preview.reviewStatus !== "rejected" && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onStartEdit(preview)}
            >
              Edit
            </Button>
          )
        )}
        {preview.reviewStatus !== "rejected" && (
          <Button
            size="sm"
            variant="ghost"
            className="text-destructive hover:text-destructive"
            onClick={() => onSetStatus(preview.id, "rejected")}
          >
            Reject
          </Button>
        )}
        {preview.reviewStatus === "rejected" && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onSetStatus(preview.id, "pending")}
          >
            Undo
          </Button>
        )}
      </div>
    </div>
  );
}
