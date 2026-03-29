"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { defaultRegistrationData, wizardSteps } from "@/lib/constants";
import { RegistrationFormData, StepId } from "@/lib/types";
import {
  clearRegistrationData,
  loadRegistrationData,
  saveRegistrationData
} from "@/lib/storage";
import { mergeWithDefaults } from "@/lib/utils";

type RegistrationContextValue = {
  data: RegistrationFormData;
  currentStep: StepId;
  hydrated: boolean;
  updateData: (patch: Partial<RegistrationFormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: StepId) => void;
  resetForm: () => void;
};

const RegistrationContext = createContext<RegistrationContextValue | null>(null);

export function RegistrationProvider({
  children
}: {
  children: ReactNode;
}) {
  const [data, setData] = useState<RegistrationFormData>(defaultRegistrationData);
  const [currentStep, setCurrentStep] = useState<StepId>("name");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void loadRegistrationData().then((persisted) => {
      if (cancelled) {
        return;
      }
      if (persisted) {
        setData(persisted);
      }
      setHydrated(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    void saveRegistrationData(data);
  }, [data, hydrated]);

  const value = useMemo<RegistrationContextValue>(
    () => ({
      data,
      currentStep,
      hydrated,
      updateData: (patch) => {
        setData((previous) => mergeWithDefaults({ ...previous, ...patch }));
      },
      goToNextStep: () => {
        const currentIndex = wizardSteps.findIndex((step) => step.id === currentStep);
        const nextStep = wizardSteps[currentIndex + 1];
        if (nextStep) {
          setCurrentStep(nextStep.id);
        }
      },
      goToPreviousStep: () => {
        const currentIndex = wizardSteps.findIndex((step) => step.id === currentStep);
        const previousStep = wizardSteps[currentIndex - 1];
        if (previousStep) {
          setCurrentStep(previousStep.id);
        }
      },
      goToStep: (step) => setCurrentStep(step),
      resetForm: () => {
        setData(defaultRegistrationData);
        setCurrentStep("name");
        void clearRegistrationData();
      }
    }),
    [currentStep, data, hydrated]
  );

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error("useRegistration must be used within RegistrationProvider");
  }
  return context;
}
