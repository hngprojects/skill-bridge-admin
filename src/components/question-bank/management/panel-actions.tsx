import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FlagReason } from "@/types/api/question-bank";

const FLAG_REASONS: FlagReason[] = [
  "Miscalibrated",
  "Wrong track match",
  "Ambiguous",
  "Other",
];

// ---------------------------------------------------------------------------
// Inline flag form
// ---------------------------------------------------------------------------

type FlagFormProps = {
  flagReason: FlagReason | "";
  flagNote: string;
  onReasonChange: (r: FlagReason) => void;
  onNoteChange: (n: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

export function FlagForm({
  flagReason,
  flagNote,
  onReasonChange,
  onNoteChange,
  onSave,
  onCancel,
}: FlagFormProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-warning/30 bg-warning/5 p-4">
      <p className="text-sm font-medium">Flag this question</p>
      <div className="flex flex-col gap-1.5">
        <Label>Reason</Label>
        <Select
          value={flagReason}
          onValueChange={(v) => onReasonChange(v as FlagReason)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a reason" />
          </SelectTrigger>
          <SelectContent>
            {FLAG_REASONS.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Note (optional)</Label>
        <Textarea
          value={flagNote}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="Add any context for reviewers…"
          rows={3}
        />
      </div>
      <div className="flex gap-2">
        <Button size="sm" disabled={!flagReason} onClick={onSave}>
          Save flag
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Panel action buttons
// ---------------------------------------------------------------------------

type PanelMode = "view" | "flag" | "edit";

type PanelActionsProps = {
  mode: PanelMode;
  isActive: boolean;
  isFlagged: boolean;
  isRemoved: boolean;
  onEdit: () => void;
  onFlag: () => void;
  onRemove: () => void;
  onRestore: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
};

export function PanelActions({
  mode,
  isActive,
  isFlagged,
  isRemoved,
  onEdit,
  onFlag,
  onRemove,
  onRestore,
  onSaveEdit,
  onCancelEdit,
}: PanelActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 border-t border-border pt-4">
      {mode === "edit" ? (
        <>
          <Button size="sm" onClick={onSaveEdit}>
            Save changes
          </Button>
          <Button size="sm" variant="ghost" onClick={onCancelEdit}>
            Cancel
          </Button>
          <p className="w-full text-xs text-muted-foreground">
            Saving will set this question to Flagged pending re-review.
          </p>
        </>
      ) : (
        <>
          {(isActive || isFlagged) && (
            <Button size="sm" variant="outline" onClick={onEdit}>
              Edit
            </Button>
          )}
          {isActive && mode !== "flag" && (
            <Button size="sm" variant="outline" onClick={onFlag}>
              Flag
            </Button>
          )}
          {!isRemoved && (
            <Button size="sm" variant="destructive" onClick={onRemove}>
              Remove
            </Button>
          )}
          {isRemoved && (
            <Button size="sm" variant="outline" onClick={onRestore}>
              Restore
            </Button>
          )}
        </>
      )}
    </div>
  );
}
