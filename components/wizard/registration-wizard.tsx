"use client";

import { Building2, ClipboardList, MapPinned, Users } from "lucide-react";
import { useRegistration } from "@/contexts/registration-context";
import { wizardSteps } from "@/lib/constants";
import { NameStep } from "@/components/steps/name-step";
import { FoundersStep } from "@/components/steps/founders-step";
import { AddressStep } from "@/components/steps/address-step";
import { OrganizationDetailsStep } from "@/components/steps/organization-details-step";
import { SummaryStep } from "@/components/steps/summary-step";

const stepIcons = {
  name: Building2,
  founders: Users,
  address: MapPinned,
  details: ClipboardList,
  summary: ClipboardList
};

export function RegistrationWizard() {
  const { currentStep, hydrated, resetForm } = useRegistration();
  const currentIndex = wizardSteps.findIndex((step) => step.id === currentStep);
  const progress = ((currentIndex + 1) / wizardSteps.length) * 100;

  if (!hydrated) {
    return (
      <div className="rounded-[2rem] bg-white/90 p-10 text-center shadow-soft">
        טוען טופס שמור...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <span className="inline-flex rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
              איסוף פרטים ראשוניים לרישום עמותה
            </span>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                טופס דיגיטלי מסודר להגשת נתוני הלקוח
              </h1>
              <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
                הטופס מרכז את כל השלבים הראשוניים לרישום עמותה בצורה נקייה, ברורה ונוחה
                יותר לעבודה. ניתן לעבור בין השלבים לפי הסדר, והמידע נשמר אוטומטית גם לאחר
                רענון.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="print-hidden rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-danger hover:text-danger"
          >
            נקה טופס
          </button>
        </div>

        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-500">
            <span>התקדמות מילוי</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-3 rounded-full bg-mist">
            <div
              className="h-3 rounded-full bg-gradient-to-l from-brand-500 to-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <ol className="mt-8 grid gap-3 md:grid-cols-5">
          {wizardSteps.map((step, index) => {
            const Icon = stepIcons[step.id];
            const isActive = step.id === currentStep;
            const isCompleted = index < currentIndex;

            return (
              <li
                key={step.id}
                className={`rounded-3xl border p-4 transition ${
                  isActive
                    ? "border-brand-500 bg-brand-50"
                    : isCompleted
                      ? "border-brand-100 bg-white"
                      : "border-slate-200 bg-white/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${
                      isActive || isCompleted ? "bg-brand-500 text-white" : "bg-mist text-slate-500"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">שלב {index + 1}</p>
                    <p className="font-bold text-ink">{step.title}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </header>

      {currentStep === "name" ? <NameStep /> : null}
      {currentStep === "founders" ? <FoundersStep /> : null}
      {currentStep === "address" ? <AddressStep /> : null}
      {currentStep === "details" ? <OrganizationDetailsStep /> : null}
      {currentStep === "summary" ? <SummaryStep /> : null}
    </div>
  );
}
