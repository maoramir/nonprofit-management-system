"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { namesSchema } from "@/lib/schemas";
import { z } from "zod";
import { useRegistration } from "@/contexts/registration-context";
import { StepCard } from "@/components/ui/step-card";
import { FormField, TextInput } from "@/components/ui/form-field";
import { StepActions } from "@/components/wizard/step-actions";

type NamesFormValues = z.infer<typeof namesSchema>;
const priorities = [
  { label: "ראשונה", index: 0 },
  { label: "שנייה", index: 1 },
  { label: "שלישית", index: 2 }
] as const;

export function NameStep() {
  const { data, updateData, goToNextStep } = useRegistration();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<NamesFormValues>({
    resolver: zodResolver(namesSchema),
    mode: "onChange",
    defaultValues: { names: data.names }
  });

  useEffect(() => {
    const subscription = watch((values) => {
      if (values.names) {
        updateData({ names: values.names as NamesFormValues["names"] });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, updateData]);

  const onSubmit = (values: NamesFormValues) => {
    updateData(values);
    goToNextStep();
  };

  return (
    <StepCard
      title="שם העמותה"
      description="יש להזין שלוש חלופות לשם העמותה לפי סדר עדיפות. בכל חלופה נדרש שם בעברית, ושם באנגלית ניתן להזין אם קיים."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {priorities.map(({ label, index }) => (
            <div key={label} className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
              <h3 className="mb-4 text-lg font-bold text-ink">עדיפות {label}</h3>
              <div className="space-y-5">
                <FormField
                  label="שם בעברית"
                  required
                  error={errors.names?.[index]?.hebrew?.message}
                >
                  <TextInput
                    {...register(`names.${index}.hebrew`)}
                    placeholder="לדוגמה: עמותת קהילה פעילה"
                  />
                </FormField>
                <FormField
                  label="שם באנגלית"
                  hint="שדה זה אינו חובה"
                  error={errors.names?.[index]?.english?.message}
                >
                  <TextInput
                    {...register(`names.${index}.english`)}
                    placeholder="Community Action Association"
                    dir="ltr"
                  />
                </FormField>
              </div>
            </div>
          ))}
        </div>
        <StepActions isNextDisabled={!isValid} />
      </form>
    </StepCard>
  );
}
