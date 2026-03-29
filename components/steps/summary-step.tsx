"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Copy, FileDown, Pencil, Printer, Save } from "lucide-react";
import { useRegistration } from "@/contexts/registration-context";
import { formatSummaryText } from "@/lib/utils";
import { StepCard } from "@/components/ui/step-card";

export function SummaryStep() {
  const { data, goToStep, goToPreviousStep } = useRegistration();
  const [copyMessage, setCopyMessage] = useState("");
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [submissionId, setSubmissionId] = useState("");
  const summaryRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatSummaryText(data));
      setCopyMessage("הסיכום הועתק ללוח.");
      window.setTimeout(() => setCopyMessage(""), 2500);
    } catch {
      setCopyMessage("לא ניתן היה להעתיק. נסו שוב מדפדפן אחר.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePdfDownload = async () => {
    if (!summaryRef.current || isExportingPdf) {
      return;
    }

    setIsExportingPdf(true);

    try {
      const canvas = await html2canvas(summaryRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff"
      });

      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? "landscape" : "portrait",
        unit: "px",
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imageData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("amuta-registration-summary.pdf");
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleSubmitToOffice = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionMessage("");

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data })
      });

      const payload = (await response.json()) as { submission?: { id: string } };

      if (!response.ok || !payload.submission) {
        throw new Error("submission_failed");
      }

      setSubmissionId(payload.submission.id);
      setSubmissionMessage("הטופס נשמר בהצלחה במסך הניהול.");
      router.refresh();
    } catch {
      setSubmissionMessage("שמירת הטופס נכשלה. נסו שוב.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StepCard
      title="סיכום פרטי הטופס"
      description="לפניכם תצוגה מסודרת של כלל הנתונים שהוזנו. אפשר לעבור על המידע, לחזור לעריכה, להעתיק הכול או להשתמש בהדפסה ובשמירה כ-PDF מתוך הדפדפן."
    >
      <div ref={summaryRef} className="space-y-6 print-surface">
        <section className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
          <h3 className="mb-4 text-xl font-bold text-ink">שם העמותה</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {data.names.map((name, index) => (
              <div key={index} className="rounded-2xl bg-white p-4">
                <p className="text-sm font-semibold text-slate-500">עדיפות {index + 1}</p>
                <p className="mt-2 text-lg font-bold text-ink">{name.hebrew}</p>
                <p className="mt-1 text-sm text-slate-500" dir="ltr">
                  {name.english || "לא הוזן שם באנגלית"}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
          <h3 className="mb-4 text-xl font-bold text-ink">מייסדים</h3>
          <div className="grid gap-4">
            {data.founders.map((founder, index) => (
              <div key={index} className="grid gap-3 rounded-2xl bg-white p-4 md:grid-cols-3">
                <SummaryItem label={`מייסד ${index + 1}`} value={founder.fullName} />
                <SummaryItem label="מספר זהות" value={founder.idNumber} />
                <SummaryItem label="סוג זיהוי" value={founder.identificationType} />
                <SummaryItem label="תפקיד" value={founder.role} />
                <SummaryItem label="אזרחות" value={founder.citizenship} />
                <SummaryItem
                  label="כתובת"
                  value={`${founder.address.city}, ${founder.address.street} ${founder.address.houseNumber}`}
                />
                <SummaryImageItem
                  label="צילום חזית"
                  src={founder.idCardFront}
                  alt={`צילום חזית של מייסד ${index + 1}`}
                />
                <SummaryImageItem
                  label="צילום גב"
                  src={founder.idCardBack}
                  alt={`צילום גב של מייסד ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
            <h3 className="mb-4 text-xl font-bold text-ink">הכתובת הרשמית</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <SummaryItem label="סוג כתובת" value={translateHolderType(data.registeredAddress.holderType)} />
              {data.registeredAddress.holderType === "founderAddress" ? (
                <SummaryItem
                  label="מייסד נבחר"
                  value={
                    data.founders[Number(data.registeredAddress.founderIndex)]?.fullName ||
                    "לא נבחר"
                  }
                />
              ) : null}
              <SummaryItem label="עיר" value={data.registeredAddress.city} />
              <SummaryItem label="רחוב" value={data.registeredAddress.street} />
              <SummaryItem label="בית" value={data.registeredAddress.houseNumber} />
              <SummaryItem label="כניסה" value={data.registeredAddress.entrance || "-"} />
              <SummaryItem label="דירה" value={data.registeredAddress.apartment || "-"} />
              <SummaryItem label="קומה" value={data.registeredAddress.floor || "-"} />
              <SummaryItem label="מיקוד" value={data.registeredAddress.postalCode || "-"} />
              <SummaryItem label="אצל" value={data.registeredAddress.careOf || "-"} />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
            <h3 className="mb-4 text-xl font-bold text-ink">כתובת למשלוח דואר</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <SummaryItem label="אופן משלוח" value={translateMailingType(data.mailingAddress.type)} />
              <SummaryItem label="עיר" value={data.mailingAddress.city || "-"} />
              <SummaryItem label="רחוב" value={data.mailingAddress.street || "-"} />
              <SummaryItem label="בית" value={data.mailingAddress.houseNumber || "-"} />
              <SummaryItem label="מיקוד" value={data.mailingAddress.postalCode || "-"} />
              <SummaryItem label="ת.ד." value={data.mailingAddress.poBox || "-"} />
              <SummaryItem label="אצל" value={data.mailingAddress.careOf || "-"} />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
          <h3 className="mb-4 text-xl font-bold text-ink">פרטי עמותה</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <SummaryItem label="תחום עיסוק עיקרי" value={data.organizationDetails.primaryField} />
            <SummaryItem label="תת תחום עיסוק" value={data.organizationDetails.secondaryField} />
            <SummaryItem
              label="אגודה עות'מאנית"
              value={translateYesNo(data.organizationDetails.basedOnOttomanAssociation)}
            />
            <SummaryItem
              label="ניהול בית כנסת"
              value={translateYesNo(data.organizationDetails.forSynagogueManagement)}
            />
            <SummaryItem
              label="פעילות במסגרת תאגיד אחר"
              value={translateYesNo(data.organizationDetails.managedUnderOtherCorporation)}
            />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
          <h3 className="mb-4 text-xl font-bold text-ink">מטרות</h3>
          <div className="space-y-3">
            {data.organizationDetails.objectives.map((objective, index) => (
              <div key={index} className="rounded-2xl bg-white p-4">
                <p className="font-semibold text-ink">
                  {index + 1}. {objective.purpose}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  יישוב: {objective.settlement || "לא הוזן"}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="print-hidden flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={handleSubmitToOffice}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-700"
            disabled={isSubmitting}
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? "שומר..." : "שמור בתיק הלקוחות"}
          </button>
          <button
            type="button"
            onClick={() => goToStep("name")}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:border-slate-400"
          >
            <Pencil className="h-4 w-4" />
            חזור לעריכה
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            <Copy className="h-4 w-4" />
            העתק הכול
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-500 px-5 py-3 font-semibold text-brand-700 transition hover:bg-brand-50"
          >
            <Printer className="h-4 w-4" />
            הדפס
          </button>
          <button
            type="button"
            onClick={handlePdfDownload}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-500 px-5 py-3 font-semibold text-brand-700 transition hover:bg-brand-50"
          >
            <FileDown className="h-4 w-4" />
            {isExportingPdf ? "מייצא PDF..." : "ייצא ל-PDF"}
          </button>
          <button
            type="button"
            onClick={goToPreviousStep}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:border-slate-400"
          >
            חזרה לשלב הקודם
          </button>
        </div>

        {copyMessage ? (
          <div className="print-hidden inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
            <CheckCircle2 className="h-4 w-4" />
            {copyMessage}
          </div>
        ) : null}
        {submissionMessage ? (
          <div className="print-hidden flex flex-col gap-3 rounded-3xl bg-brand-50 p-4 text-sm font-semibold text-brand-700 sm:flex-row sm:items-center sm:justify-between">
            <span>{submissionMessage}</span>
            <div className="flex gap-3">
              <Link
                href="/admin"
                className="rounded-full border border-brand-500 px-4 py-2 text-center"
              >
                פתח מסך ניהול
              </Link>
              {submissionId ? (
                <Link
                  href={`/admin/${submissionId}`}
                  className="rounded-full bg-brand-600 px-4 py-2 text-center text-white"
                >
                  פתח את הפנייה
                </Link>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </StepCard>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-base font-bold text-ink">{value}</p>
    </div>
  );
}

function SummaryImageItem({
  label,
  src,
  alt
}: {
  label: string;
  src: string;
  alt: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={480}
          height={280}
          className="mt-3 h-36 w-full rounded-xl object-cover"
          unoptimized
        />
      ) : (
        <p className="mt-1 text-base font-bold text-ink">לא צורף</p>
      )}
    </div>
  );
}

function translateYesNo(value: "yes" | "no") {
  return value === "yes" ? "כן" : "לא";
}

function translateMailingType(value: "same" | "additional" | "poBox") {
  switch (value) {
    case "same":
      return "זהה לכתובת הרשמית";
    case "additional":
      return "כתובת נוספת";
    default:
      return "תיבת דואר";
  }
}

function translateHolderType(value: "associationOffice" | "founderAddress" | "other") {
  switch (value) {
    case "associationOffice":
      return "משרד העמותה";
    case "founderAddress":
      return "כתובת של אחד המייסדים";
    default:
      return "כתובת אחרת";
  }
}
