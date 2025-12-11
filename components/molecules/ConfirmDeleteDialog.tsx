import { useEffect, useRef, useId, type ReactNode } from "react";
import { Button } from "../ui/button";

type DialogProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: ReactNode;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmLoading?: boolean;
  confirmDisabled?: boolean;
  className?: string;
  panelClassName?: string;
};

const FOCUSABLE =
  "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";

const ConfirmDeleteDialog = ({
  open,
  onCancel,
  onConfirm,
  title = "Confirm delete",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  confirmLoading = false,
  confirmDisabled = false,
  panelClassName = "",
}: DialogProps) => {
  const dialRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();
  const descId = useId();

  // after modal opened
  useEffect(() => {
    if (!open) return;
    const prevActive = document.activeElement as HTMLElement | null;
    // finding first button/input/... and move focus to it
    const dialog = dialRef.current;
    if (dialog) {
      const focused = dialog.querySelectorAll<HTMLElement>(FOCUSABLE);
      (focused[0] ?? dialog).focus();
    }
    // restoring focus to original element after closing dialog
    return () => {
      if (prevActive && typeof prevActive.focus === "function") {
        prevActive.focus();
      }
    };
  }, [open]);

  // closing on Esc + focus trap
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      // if key was esc call onCancel
      if (e.key === "Escape") {
        e.preventDefault();
        onCancel();
        return;
      }
      // if key was something other than tab/esc return.
      if (e.key !== "Tab") return;

      const dialog = dialRef.current;
      if (!dialog) return;
      const focused = dialog.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focused.length) return;
      const firstElement = focused[0];
      const lastElement = focused[focused.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (activeElement === firstElement || !dialog.contains(activeElement)) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (activeElement === lastElement || !dialog.contains(activeElement)) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-md supports-backdrop-filter:bg-muted/30"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        className={`bg-muted rounded-lg shadow-2xl p-6 max-w-sm w-full ${panelClassName}`}
        ref={dialRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
      >
        <h2 id={titleId} className="font-semibold text-lg">
          {title}
        </h2>
        <p id={descId} className="mt-2 text-sm">
          {description}
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <Button size="sm" variant="ghost" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={onConfirm}
            disabled={confirmDisabled || confirmLoading}
          >
            {confirmLoading ? "Deleting…" : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteDialog;
