import { useEffect, useRef, useId, type ReactNode } from "react";

import { CheckCircle } from "lucide-react";
import ComplyButtons from "../atoms/complyButtons";
type SummaryItem = {
  label: string;
  value: ReactNode;
};

type SuccessDialogProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: ReactNode;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  className?: string;
  panelClassName?: string;
  summary?: SummaryItem[];
};

const FOCUSABLE =
  "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";

const SuccessModalDialog = ({
  open,
  onCancel,
  onConfirm,
  title = "User Added Successfully!",
  description = "The user has been added to the system. You can now view their profile or continue adding more users.",
  confirmLabel = "Add Another User",
  cancelLabel = "Close",
  panelClassName = "",
  summary,
}: SuccessDialogProps) => {
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
    <section
      className="fixed inset-0 bg-black bg-opacity-50 grid items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      {/* before targeted div */}
      <div
        className={`mx-auto w-[440px] rounded-2xl border border-primary-100 bg-white px-6 py-10 text-center shadow-sm ${panelClassName}`}
        ref={dialRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
          <CheckCircle className="h-8 w-8 text-comp-green" />
        </div>
        {/* desc */}
        <h3 id={titleId} className="mb-4 font-bold text-2xl text-slate-900">
          {title}
        </h3>
        <p id={descId} className="mb-7 text-slate-600 text-lg ">
          {description}
        </p>
        {summary?.length ? (
          <div className="mb-7 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left">
            <dl className="space-y-3">
              {summary.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start justify-between gap-4 text-sm"
                >
                  <dt className="text-slate-500">{item.label}</dt>
                  <dd className="text-right font-semibold text-slate-900">
                    {item.value ?? "—"}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
        {/* buttons  */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-6 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium transition-colors "
          >
            {cancelLabel}
          </button>
          <ComplyButtons
            onClick={onConfirm}
            buttonsClass="rounded-md py-6.5 font-medium text-base"
            type="primary"
            content={confirmLabel}
          />
        </div>
      </div>
    </section>
  );
};

export default SuccessModalDialog;
