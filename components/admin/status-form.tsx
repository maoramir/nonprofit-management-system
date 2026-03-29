"use client";

import { useState, useTransition } from "react";
import { submissionStatusOptions } from "@/lib/constants";
import { SubmissionStatus } from "@/lib/types";

export function StatusForm({
  submissionId,
  currentStatus
}: {
  submissionId: string;
  currentStatus: SubmissionStatus;
}) {
  const [status, setStatus] = useState<SubmissionStatus>(currentStatus);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const updateStatus = (nextStatus: SubmissionStatus) => {
    setStatus(nextStatus);
    startTransition(async () => {
      const response = await fetch(`/api/submissions/${submissionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: nextStatus })
      });

      setMessage(response.ok ? "הסטטוס נשמר." : "שמירת הסטטוס נכשלה.");
      window.setTimeout(() => setMessage(""), 2500);
    });
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-ink">סטטוס פנייה</label>
      <select
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
        value={status}
        onChange={(event) => updateStatus(event.target.value as SubmissionStatus)}
        disabled={isPending}
      >
        {submissionStatusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {message ? <p className="text-sm text-brand-700">{message}</p> : null}
    </div>
  );
}
