import { submissionStatusOptions } from "@/lib/constants";
import { SubmissionStatus } from "@/lib/types";

const toneByStatus: Record<SubmissionStatus, string> = {
  new: "bg-sky-50 text-sky-700 border-sky-200",
  missing_info: "bg-amber-50 text-amber-700 border-amber-200",
  ready_to_transfer: "bg-violet-50 text-violet-700 border-violet-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200"
};

export function StatusBadge({ status }: { status: SubmissionStatus }) {
  const label =
    submissionStatusOptions.find((option) => option.value === status)?.label ?? status;

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${toneByStatus[status]}`}>
      {label}
    </span>
  );
}
