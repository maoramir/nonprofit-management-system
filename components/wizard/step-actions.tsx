type StepActionsProps = {
  canGoBack?: boolean;
  onBack?: () => void;
  isNextDisabled?: boolean;
  nextLabel?: string;
  backLabel?: string;
};

export function StepActions({
  canGoBack,
  onBack,
  isNextDisabled,
  nextLabel = "הבא",
  backLabel = "חזרה"
}: StepActionsProps) {
  return (
    <div className="print-hidden mt-10 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between">
      <button
        type="button"
        onClick={onBack}
        disabled={!canGoBack}
        className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {backLabel}
      </button>
      <button
        type="submit"
        disabled={isNextDisabled}
        className="rounded-full bg-ink px-6 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {nextLabel}
      </button>
    </div>
  );
}
