"use client";

import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { organizationDetailsSchema } from "@/lib/schemas";
import { useRegistration } from "@/contexts/registration-context";
import {
  primaryFields,
  secondaryFields,
  yesNoOptions
} from "@/lib/constants";
import { OrganizationDetails } from "@/lib/types";
import { StepCard } from "@/components/ui/step-card";
import { FormField, SelectField, TextInput } from "@/components/ui/form-field";
import { RadioGroup } from "@/components/ui/radio-group";
import { StepActions } from "@/components/wizard/step-actions";

type OrganizationDetailsFormValues = z.infer<typeof organizationDetailsSchema>;

export function OrganizationDetailsStep() {
  const { data, updateData, goToNextStep, goToPreviousStep } = useRegistration();
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<OrganizationDetailsFormValues>({
    resolver: zodResolver(organizationDetailsSchema),
    mode: "onChange",
    defaultValues: {
      organizationDetails: data.organizationDetails
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "organizationDetails.objectives"
  });

  useEffect(() => {
    const subscription = watch((values) => {
      updateData({
        organizationDetails: (values.organizationDetails
          ? {
              ...data.organizationDetails,
              ...values.organizationDetails,
              objectives:
                values.organizationDetails.objectives ?? data.organizationDetails.objectives
            }
          : data.organizationDetails) as OrganizationDetails
      });
    });

    return () => subscription.unsubscribe();
  }, [watch, updateData, data.organizationDetails]);

  const onSubmit = (values: OrganizationDetailsFormValues) => {
    updateData({
      organizationDetails: values.organizationDetails as OrganizationDetails
    });
    goToNextStep();
  };

  return (
    <StepCard
      title="פרטי עמותה"
      description="בשלב זה יש למלא את תחומי הפעילות, תשובות לשאלות היסוד על אופי ההתאגדות, ואת מטרות העמותה כפי שיוצגו בהמשך בתהליך הרישום."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <section className="grid gap-5 rounded-3xl border border-slate-200 bg-slate-50/70 p-5 md:grid-cols-2">
          <FormField
            label="תחום עיסוק עיקרי"
            required
            error={errors.organizationDetails?.primaryField?.message}
          >
            <SelectField {...register("organizationDetails.primaryField")}>
              <option value="">בחרו תחום עיסוק</option>
              {primaryFields.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </SelectField>
          </FormField>
          <FormField
            label="תת תחום עיסוק"
            required
            error={errors.organizationDetails?.secondaryField?.message}
          >
            <SelectField {...register("organizationDetails.secondaryField")}>
              <option value="">בחרו תת תחום</option>
              {secondaryFields.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </SelectField>
          </FormField>
        </section>

        <section className="space-y-5 rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
          <FormField
            label="האם העמותה רשומה בעקבות אגודה עות'מאנית"
            required
            error={errors.organizationDetails?.basedOnOttomanAssociation?.message}
          >
            <RadioGroup
              name="organizationDetails.basedOnOttomanAssociation"
              value={watch("organizationDetails.basedOnOttomanAssociation")}
              onChange={(value) =>
                setValue("organizationDetails.basedOnOttomanAssociation", value as "yes" | "no", {
                  shouldValidate: true,
                  shouldDirty: true
                })
              }
              options={yesNoOptions}
            />
          </FormField>

          <FormField
            label="האם העמותה מוקמת לצורך ניהול בית כנסת"
            required
            error={errors.organizationDetails?.forSynagogueManagement?.message}
          >
            <RadioGroup
              name="organizationDetails.forSynagogueManagement"
              value={watch("organizationDetails.forSynagogueManagement")}
              onChange={(value) =>
                setValue("organizationDetails.forSynagogueManagement", value as "yes" | "no", {
                  shouldValidate: true,
                  shouldDirty: true
                })
              }
              options={yesNoOptions}
            />
          </FormField>

          <FormField
            label="האם בכוונתכם לנהל במסגרת העמותה פעילות המנוהלת או שנוהלה בעבר במסגרת תאגיד אחר"
            required
            error={errors.organizationDetails?.managedUnderOtherCorporation?.message}
          >
            <RadioGroup
              name="organizationDetails.managedUnderOtherCorporation"
              value={watch("organizationDetails.managedUnderOtherCorporation")}
              onChange={(value) =>
                setValue("organizationDetails.managedUnderOtherCorporation", value as "yes" | "no", {
                  shouldValidate: true,
                  shouldDirty: true
                })
              }
              options={yesNoOptions}
            />
          </FormField>
        </section>

        <section className="space-y-5 rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-ink">מטרות העמותה</h3>
              <p className="mt-1 text-sm text-slate-600">
                ניתן להוסיף שורות נפרדות של מטרה ויישוב. לפחות מטרה אחת היא חובה.
              </p>
            </div>
            <button
              type="button"
              onClick={() => append({ purpose: "", settlement: "" })}
              className="print-hidden rounded-full border border-brand-500 px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
            >
              הוספה
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="rounded-3xl border border-white bg-white p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-semibold text-ink">מטרה {index + 1}</span>
                  {fields.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="print-hidden text-sm font-semibold text-danger"
                    >
                      הסרה
                    </button>
                  ) : null}
                </div>
                <div className="grid gap-5 md:grid-cols-[2fr_1fr]">
                  <FormField
                    label="מטרה"
                    required
                    error={errors.organizationDetails?.objectives?.[index]?.purpose?.message}
                  >
                    <TextInput
                      {...register(`organizationDetails.objectives.${index}.purpose`)}
                      placeholder="לדוגמה: קידום פעילויות קהילתיות וחינוכיות"
                    />
                  </FormField>
                  <FormField
                    label="יישוב"
                    error={errors.organizationDetails?.objectives?.[index]?.settlement?.message}
                  >
                    <TextInput
                      {...register(`organizationDetails.objectives.${index}.settlement`)}
                      placeholder="לא חובה"
                    />
                  </FormField>
                </div>
              </div>
            ))}
          </div>
        </section>

        <StepActions canGoBack onBack={goToPreviousStep} isNextDisabled={!isValid} nextLabel="לסיכום" />
      </form>
    </StepCard>
  );
}
