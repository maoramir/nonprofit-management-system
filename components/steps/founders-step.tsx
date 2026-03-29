"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { foundersSchema } from "@/lib/schemas";
import { useRegistration } from "@/contexts/registration-context";
import { fileToDataUrl, normalizeFounderArray } from "@/lib/utils";
import {
  citizenshipOptions,
  founderRoles,
  identificationTypes
} from "@/lib/constants";
import { Founder } from "@/lib/types";
import { StepCard } from "@/components/ui/step-card";
import { FormField, SelectField, TextInput } from "@/components/ui/form-field";
import { StepActions } from "@/components/wizard/step-actions";

type FoundersFormValues = z.infer<typeof foundersSchema>;

export function FoundersStep() {
  const { data, updateData, goToNextStep, goToPreviousStep } = useRegistration();
  const [trimWarning, setTrimWarning] = useState<string>("");

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<FoundersFormValues>({
    resolver: zodResolver(foundersSchema),
    mode: "onChange",
    defaultValues: {
      foundersCount: data.foundersCount,
      founders: normalizeFounderArray(data.founders, data.foundersCount)
    }
  });

  const { fields, replace } = useFieldArray({
    control,
    name: "founders"
  });

  const foundersCount = watch("foundersCount");
  const watchedFounders = watch("founders");

  useEffect(() => {
    if (!foundersCount || Number.isNaN(foundersCount)) {
      return;
    }

    const normalized = normalizeFounderArray(watchedFounders ?? [], foundersCount);
    if (foundersCount < (watchedFounders?.length ?? 0)) {
      setTrimWarning("צמצום מספר המייסדים יציג פחות כרטיסים. הנתונים מעבר למספר שנבחר לא יישמרו.");
    } else {
      setTrimWarning("");
    }
    replace(normalized);
  }, [foundersCount, replace]);

  useEffect(() => {
    const subscription = watch((values) => {
      const nextCount = values.foundersCount ?? data.foundersCount;
      const nextFounders = normalizeFounderArray(
        values.founders
          ? values.founders.map((founder, index) => normalizeFounder(founder, data.founders[index]))
          : data.founders,
        nextCount
      );

      updateData({
        foundersCount: nextCount,
        founders: nextFounders
      });
    });

    return () => subscription.unsubscribe();
  }, [watch, updateData, data.founders, data.foundersCount]);

  const onSubmit = (values: FoundersFormValues) => {
    updateData({
      foundersCount: values.foundersCount,
      founders: normalizeFounderArray(values.founders, values.foundersCount)
    });
    goToNextStep();
  };

  const handleImageUpload = async (
    index: number,
    side: "idCardFront" | "idCardBack",
    file?: File
  ) => {
    if (!file) {
      return;
    }

    const dataUrl = await fileToDataUrl(file);
    setValue(`founders.${index}.${side}`, dataUrl, {
      shouldDirty: true,
      shouldValidate: true
    });
  };

  return (
    <StepCard
      title="מייסדים"
      description="יש להזין את מספר המייסדים ולאחר מכן למלא את פרטי כל אחד מהם. ניתן לעדכן את המספר בכל שלב, והטפסים יתאימו את עצמם בהתאם."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="max-w-sm">
          <FormField
            label="כמה מייסדים יש לעמותה"
            required
            info="נדרשים לפחות שני מייסדים לצורך רישום עמותה."
            error={errors.foundersCount?.message}
          >
            <TextInput
              type="number"
              min={2}
              max={20}
              {...register("foundersCount", { valueAsNumber: true })}
              onChange={(event) => {
                const nextValue = Number(event.target.value || 2);
                setValue("foundersCount", nextValue, { shouldValidate: true, shouldDirty: true });
              }}
            />
          </FormField>
          {trimWarning ? <p className="mt-2 text-sm text-accent">{trimWarning}</p> : null}
        </div>

        <div className="space-y-5">
          {fields.map((field, index) => (
            <section key={field.id} className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xl font-bold text-ink">מייסד {index + 1}</h3>
                <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-500">
                  כרטיס פרטים
                </span>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  label="שם מלא"
                  required
                  error={errors.founders?.[index]?.fullName?.message}
                >
                  <TextInput
                    {...register(`founders.${index}.fullName`)}
                    placeholder="שם מלא כפי שמופיע בתעודה"
                  />
                </FormField>
                <FormField
                  label="מספר זהות"
                  required
                  error={errors.founders?.[index]?.idNumber?.message}
                >
                  <TextInput
                    inputMode="numeric"
                    maxLength={9}
                    {...register(`founders.${index}.idNumber`)}
                    placeholder="9 ספרות"
                  />
                </FormField>
                <FormField
                  label="סוג זיהוי"
                  required
                  error={errors.founders?.[index]?.identificationType?.message}
                >
                  <SelectField {...register(`founders.${index}.identificationType`)}>
                    {identificationTypes.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </SelectField>
                </FormField>
                <FormField
                  label="תפקיד"
                  required
                  error={errors.founders?.[index]?.role?.message}
                >
                  <SelectField {...register(`founders.${index}.role`)}>
                    {founderRoles.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </SelectField>
                </FormField>
                <FormField
                  label="אזרחות"
                  required
                  error={errors.founders?.[index]?.citizenship?.message}
                >
                  <SelectField {...register(`founders.${index}.citizenship`)}>
                    {citizenshipOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </SelectField>
                </FormField>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-5">
                <h4 className="mb-4 text-base font-bold text-ink">כתובת המייסד</h4>
                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    label="עיר"
                    required
                    error={errors.founders?.[index]?.address?.city?.message}
                  >
                    <TextInput
                      {...register(`founders.${index}.address.city`)}
                      placeholder="עיר מגורים"
                    />
                  </FormField>
                  <FormField
                    label="רחוב"
                    required
                    error={errors.founders?.[index]?.address?.street?.message}
                  >
                    <TextInput
                      {...register(`founders.${index}.address.street`)}
                      placeholder="רחוב"
                    />
                  </FormField>
                  <FormField
                    label="בית"
                    required
                    error={errors.founders?.[index]?.address?.houseNumber?.message}
                  >
                    <TextInput
                      {...register(`founders.${index}.address.houseNumber`)}
                      placeholder="מספר בית"
                    />
                  </FormField>
                  <FormField
                    label="כניסה"
                    error={errors.founders?.[index]?.address?.entrance?.message}
                  >
                    <TextInput
                      {...register(`founders.${index}.address.entrance`)}
                      placeholder="אם קיים"
                    />
                  </FormField>
                  <FormField
                    label="דירה"
                    error={errors.founders?.[index]?.address?.apartment?.message}
                  >
                    <TextInput
                      {...register(`founders.${index}.address.apartment`)}
                      placeholder="אם קיים"
                    />
                  </FormField>
                  <FormField
                    label="קומה"
                    error={errors.founders?.[index]?.address?.floor?.message}
                  >
                    <TextInput
                      {...register(`founders.${index}.address.floor`)}
                      placeholder="אם קיים"
                    />
                  </FormField>
                  <FormField
                    label="מיקוד"
                    error={errors.founders?.[index]?.address?.postalCode?.message}
                  >
                    <TextInput
                      {...register(`founders.${index}.address.postalCode`)}
                      placeholder="לא חובה"
                    />
                  </FormField>
                  <FormField
                    label="אצל"
                    error={errors.founders?.[index]?.address?.careOf?.message}
                  >
                    <TextInput
                      {...register(`founders.${index}.address.careOf`)}
                      placeholder="אם רלוונטי"
                    />
                  </FormField>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-5">
                <h4 className="mb-4 text-base font-bold text-ink">תמונות תעודת זהות</h4>
                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    label="צילום חזית"
                    hint="ניתן להעלות קובץ תמונה של צד קדמי."
                  >
                    <div className="space-y-3">
                      <TextInput
                        type="file"
                        accept="image/*"
                        onChange={(event) =>
                          handleImageUpload(index, "idCardFront", event.target.files?.[0])
                        }
                      />
                      {watch(`founders.${index}.idCardFront`) ? (
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3">
                          <Image
                            src={watch(`founders.${index}.idCardFront`)}
                            alt={`תעודת זהות חזית של מייסד ${index + 1}`}
                            width={480}
                            height={280}
                            className="h-44 w-full rounded-xl object-cover"
                            unoptimized
                          />
                        </div>
                      ) : null}
                    </div>
                  </FormField>

                  <FormField
                    label="צילום גב"
                    hint="ניתן להעלות קובץ תמונה של צד אחורי."
                  >
                    <div className="space-y-3">
                      <TextInput
                        type="file"
                        accept="image/*"
                        onChange={(event) =>
                          handleImageUpload(index, "idCardBack", event.target.files?.[0])
                        }
                      />
                      {watch(`founders.${index}.idCardBack`) ? (
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3">
                          <Image
                            src={watch(`founders.${index}.idCardBack`)}
                            alt={`תעודת זהות גב של מייסד ${index + 1}`}
                            width={480}
                            height={280}
                            className="h-44 w-full rounded-xl object-cover"
                            unoptimized
                          />
                        </div>
                      ) : null}
                    </div>
                  </FormField>
                </div>
              </div>
            </section>
          ))}
        </div>

        <StepActions canGoBack onBack={goToPreviousStep} isNextDisabled={!isValid} />
      </form>
    </StepCard>
  );
}

function normalizeFounder(
  founder:
    | (Omit<Partial<Founder>, "address"> & { address?: Partial<Founder["address"]> })
    | undefined,
  fallback?: Founder
): Founder {
  return {
    fullName: founder?.fullName ?? fallback?.fullName ?? "",
    idNumber: founder?.idNumber ?? fallback?.idNumber ?? "",
    identificationType:
      founder?.identificationType ?? fallback?.identificationType ?? "תעודת זהות",
    role: founder?.role ?? fallback?.role ?? "מייסד",
    citizenship: founder?.citizenship ?? fallback?.citizenship ?? "ישראלי",
    idCardFront: founder?.idCardFront ?? fallback?.idCardFront ?? "",
    idCardBack: founder?.idCardBack ?? fallback?.idCardBack ?? "",
    address: {
      city: founder?.address?.city ?? fallback?.address?.city ?? "",
      street: founder?.address?.street ?? fallback?.address?.street ?? "",
      houseNumber: founder?.address?.houseNumber ?? fallback?.address?.houseNumber ?? "",
      entrance: founder?.address?.entrance ?? fallback?.address?.entrance ?? "",
      apartment: founder?.address?.apartment ?? fallback?.address?.apartment ?? "",
      floor: founder?.address?.floor ?? fallback?.address?.floor ?? "",
      postalCode: founder?.address?.postalCode ?? fallback?.address?.postalCode ?? "",
      careOf: founder?.address?.careOf ?? fallback?.address?.careOf ?? ""
    }
  };
}
