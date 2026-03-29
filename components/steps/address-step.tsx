"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addressSchema } from "@/lib/schemas";
import { useRegistration } from "@/contexts/registration-context";
import {
  MailingAddress,
  RegisteredAddress
} from "@/lib/types";
import {
  addressHolderOptions,
  mailingAddressOptions
} from "@/lib/constants";
import { StepCard } from "@/components/ui/step-card";
import { FormField, SelectField, TextInput } from "@/components/ui/form-field";
import { RadioGroup } from "@/components/ui/radio-group";
import { StepActions } from "@/components/wizard/step-actions";

type AddressFormValues = z.infer<typeof addressSchema>;

export function AddressStep() {
  const { data, updateData, goToNextStep, goToPreviousStep } = useRegistration();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
    defaultValues: {
      registeredAddress: data.registeredAddress,
      mailingAddress: data.mailingAddress
    }
  });

  const mailingType = watch("mailingAddress.type");
  const holderType = watch("registeredAddress.holderType");
  const founderIndex = watch("registeredAddress.founderIndex");

  useEffect(() => {
    const subscription = watch((values) => {
      updateData({
        registeredAddress: (values.registeredAddress
          ? { ...data.registeredAddress, ...values.registeredAddress }
          : data.registeredAddress) as RegisteredAddress,
        mailingAddress: (values.mailingAddress
          ? { ...data.mailingAddress, ...values.mailingAddress }
          : data.mailingAddress) as MailingAddress
      });
    });

    return () => subscription.unsubscribe();
  }, [watch, updateData, data.registeredAddress, data.mailingAddress]);

  useEffect(() => {
    if (holderType !== "founderAddress") {
      return;
    }

    const founder = data.founders[Number(founderIndex)];
    if (!founder) {
      return;
    }

    setValue("registeredAddress.city", founder.address.city, { shouldDirty: true, shouldValidate: true });
    setValue("registeredAddress.street", founder.address.street, { shouldDirty: true, shouldValidate: true });
    setValue("registeredAddress.houseNumber", founder.address.houseNumber, {
      shouldDirty: true,
      shouldValidate: true
    });
    setValue("registeredAddress.entrance", founder.address.entrance, { shouldDirty: true });
    setValue("registeredAddress.apartment", founder.address.apartment, { shouldDirty: true });
    setValue("registeredAddress.floor", founder.address.floor, { shouldDirty: true });
    setValue("registeredAddress.postalCode", founder.address.postalCode, { shouldDirty: true });
    setValue("registeredAddress.careOf", founder.address.careOf, { shouldDirty: true });
  }, [holderType, founderIndex, data.founders, setValue]);

  const onSubmit = (values: AddressFormValues) => {
    updateData({
      registeredAddress: values.registeredAddress as RegisteredAddress,
      mailingAddress: values.mailingAddress as MailingAddress
    });
    goToNextStep();
  };

  return (
    <StepCard
      title="כתובת"
      description="יש למלא את מען העמותה הרשום ואת אופן קבלת הדואר. בהתאם לבחירה, יוצגו רק השדות הרלוונטיים כדי לשמור על מסך ברור ונוח."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <section className="space-y-5 rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              label="סוג הכתובת הרשומה"
              required
              error={errors.registeredAddress?.holderType?.message}
            >
              <SelectField {...register("registeredAddress.holderType")}>
                {addressHolderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SelectField>
            </FormField>
            {holderType === "founderAddress" ? (
              <FormField
                label="בחירת מייסד"
                required
                info="הכתובת של המייסד הנבחר תימשך אוטומטית לשדות הכתובת הרשמית."
                error={errors.registeredAddress?.founderIndex?.message}
              >
                <SelectField {...register("registeredAddress.founderIndex")}>
                  <option value="">בחרו מייסד</option>
                  {data.founders.map((founder, index) => (
                    <option key={`${founder.idNumber}-${index}`} value={String(index)}>
                      {founder.fullName || `מייסד ${index + 1}`}
                    </option>
                  ))}
                </SelectField>
              </FormField>
            ) : null}
            <FormField label="עיר" required error={errors.registeredAddress?.city?.message}>
              <TextInput {...register("registeredAddress.city")} placeholder="לדוגמה: ירושלים" />
            </FormField>
            <FormField label="רחוב" required error={errors.registeredAddress?.street?.message}>
              <TextInput {...register("registeredAddress.street")} placeholder="שם הרחוב" />
            </FormField>
            <FormField label="בית" required error={errors.registeredAddress?.houseNumber?.message}>
              <TextInput {...register("registeredAddress.houseNumber")} placeholder="מספר בית" />
            </FormField>
            <FormField label="כניסה" error={errors.registeredAddress?.entrance?.message}>
              <TextInput {...register("registeredAddress.entrance")} placeholder="אם קיים" />
            </FormField>
            <FormField label="דירה" error={errors.registeredAddress?.apartment?.message}>
              <TextInput {...register("registeredAddress.apartment")} placeholder="אם קיים" />
            </FormField>
            <FormField label="קומה" error={errors.registeredAddress?.floor?.message}>
              <TextInput {...register("registeredAddress.floor")} placeholder="אם קיים" />
            </FormField>
            <FormField label="מיקוד" error={errors.registeredAddress?.postalCode?.message}>
              <TextInput {...register("registeredAddress.postalCode")} placeholder="לא חובה" />
            </FormField>
            <FormField
              label="אצל"
              info="יש למלא אם הדואר מיועד לאדם או גורם מסוים בתוך הכתובת."
              error={errors.registeredAddress?.careOf?.message}
            >
              <TextInput {...register("registeredAddress.careOf")} placeholder="לא חובה" />
            </FormField>
          </div>
        </section>

        <section className="space-y-5 rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
          <div>
            <h3 className="text-lg font-bold text-ink">כתובת למשלוח דואר</h3>
            <p className="mt-1 text-sm text-slate-600">
              ניתן לבחור אם הדואר יישלח לכתובת הרשמית, לכתובת נוספת או לתיבת דואר.
            </p>
          </div>

          <FormField label="אופן משלוח הדואר" required error={errors.mailingAddress?.type?.message}>
            <RadioGroup
              name="mailingAddress.type"
              value={mailingType}
              onChange={(value) =>
                setValue("mailingAddress.type", value as "same" | "additional" | "poBox", {
                  shouldValidate: true,
                  shouldDirty: true
                })
              }
              options={mailingAddressOptions}
            />
          </FormField>

          {mailingType === "additional" ? (
            <div className="grid gap-5 md:grid-cols-2">
              <FormField label="עיר" required error={errors.mailingAddress?.city?.message}>
                <TextInput {...register("mailingAddress.city")} placeholder="עיר למשלוח דואר" />
              </FormField>
              <FormField label="רחוב" required error={errors.mailingAddress?.street?.message}>
                <TextInput {...register("mailingAddress.street")} placeholder="רחוב למשלוח דואר" />
              </FormField>
              <FormField label="בית" required error={errors.mailingAddress?.houseNumber?.message}>
                <TextInput {...register("mailingAddress.houseNumber")} placeholder="מספר בית" />
              </FormField>
              <FormField label="מיקוד" error={errors.mailingAddress?.postalCode?.message}>
                <TextInput {...register("mailingAddress.postalCode")} placeholder="לא חובה" />
              </FormField>
              <FormField label="אצל" error={errors.mailingAddress?.careOf?.message}>
                <TextInput {...register("mailingAddress.careOf")} placeholder="אם רלוונטי" />
              </FormField>
            </div>
          ) : null}

          {mailingType === "poBox" ? (
            <div className="grid gap-5 md:grid-cols-2">
              <FormField label="תיבת דואר" required error={errors.mailingAddress?.poBox?.message}>
                <TextInput {...register("mailingAddress.poBox")} placeholder="מספר תיבת דואר" />
              </FormField>
              <FormField label="עיר" error={errors.mailingAddress?.city?.message}>
                <TextInput {...register("mailingAddress.city")} placeholder="עיר" />
              </FormField>
              <FormField label="מיקוד" error={errors.mailingAddress?.postalCode?.message}>
                <TextInput {...register("mailingAddress.postalCode")} placeholder="לא חובה" />
              </FormField>
              <FormField label="אצל" error={errors.mailingAddress?.careOf?.message}>
                <TextInput {...register("mailingAddress.careOf")} placeholder="אם רלוונטי" />
              </FormField>
            </div>
          ) : null}
        </section>

        <StepActions canGoBack onBack={goToPreviousStep} isNextDisabled={!isValid} />
      </form>
    </StepCard>
  );
}
