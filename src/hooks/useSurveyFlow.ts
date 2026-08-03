"use client";

import { useEffect, useMemo, useState } from "react";
import { INITIAL_FORM_DATA } from "../lib/surveyConstants";
import type { SurveyFormData } from "../lib/surveyTypes";
import { isStepValid } from "../lib/surveyValidation";

export type SurveyStatus = "idle" | "submitting" | "submitted" | "error";

const STORAGE_KEY = "mandel-experts-survey";

function readStoredState() {
  if (typeof window === "undefined") {
    return null;
  }

  const saved = window.sessionStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved) as {
      formData?: SurveyFormData;
      currentStep?: number;
    };
  } catch {
    return null;
  }
}

export function useSurveyFlow() {
  const [formData, setFormData] = useState<SurveyFormData>(() => {
    const stored = readStoredState();
    return stored?.formData ?? INITIAL_FORM_DATA;
  });
  const [currentStep, setCurrentStep] = useState<number>(() => {
    const stored = readStoredState();
    return stored?.currentStep ?? 0;
  });
  const [status, setStatus] = useState<SurveyStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined" || status === "submitted") {
      return;
    }

    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ formData, currentStep }),
    );
  }, [currentStep, formData, status]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (status !== "submitted") {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [status]);

  const updateField = <K extends keyof SurveyFormData>(field: K, value: SurveyFormData[K]) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
  };

  const setSelectedContentFields = (values: string[]) => {
    setFormData((previous) => {
      const nextMainContentFields = previous.mainContentFields.filter((item) => values.includes(item));
      return {
        ...previous,
        selectedContentFields: values,
        mainContentFields: nextMainContentFields,
        secondaryContentFields: values.filter((item) => !nextMainContentFields.includes(item)),
      };
    });
  };

  const setMainContentFields = (values: string[]) => {
    setFormData((previous) => ({
      ...previous,
      mainContentFields: values,
      secondaryContentFields: previous.selectedContentFields.filter((item) => !values.includes(item)),
    }));
  };

  const setSelectedActivityTypes = (values: string[]) => {
    setFormData((previous) => {
      const nextMainActivityTypes = previous.mainActivityTypes.filter((item) => values.includes(item));
      return {
        ...previous,
        selectedActivityTypes: values,
        mainActivityTypes: nextMainActivityTypes,
        secondaryActivityTypes: values.filter((item) => !nextMainActivityTypes.includes(item)),
      };
    });
  };

  const setMainActivityTypes = (values: string[]) => {
    setFormData((previous) => ({
      ...previous,
      mainActivityTypes: values,
      secondaryActivityTypes: previous.selectedActivityTypes.filter((item) => !values.includes(item)),
    }));
  };

  const canGoNext = useMemo(() => {
    if (currentStep === 1) {
      return isStepValid(1, formData);
    }
    if (currentStep === 2) {
      return isStepValid(2, formData);
    }
    return true;
  }, [currentStep, formData]);

  const handleNext = () => {
    if (!canGoNext) {
      return;
    }

    if (currentStep === 4) {
      setCurrentStep(formData.selectedActivityTypes.length === 0 ? 6 : 5);
      return;
    }

    if (currentStep === 5) {
      setCurrentStep(6);
      return;
    }

    if (currentStep < 7) {
      setCurrentStep((previous) => previous + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((previous) => previous - 1);
    }
  };

  const handleSubmit = async () => {
    setStatus("submitting");
    setErrorMessage("");

    const payload = {
      participant_name: formData.participantName.trim(),
      selected_content_fields: formData.selectedContentFields,
      main_content_fields: formData.mainContentFields,
      secondary_content_fields: formData.selectedContentFields.filter(
        (item) => !formData.mainContentFields.includes(item),
      ),
      selected_activity_types: formData.selectedActivityTypes,
      main_activity_types: formData.mainActivityTypes,
      secondary_activity_types: formData.selectedActivityTypes.filter(
        (item) => !formData.mainActivityTypes.includes(item),
      ),
      missing_field_suggestion: formData.missingFieldSuggestion.trim(),
    };

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("ההגשה נכשלה. אנא נסה שוב.");
      }

      window.sessionStorage.removeItem(STORAGE_KEY);
      setStatus("submitted");
      setCurrentStep(8);
    } catch {
      setStatus("error");
      setErrorMessage("ההגשה נכשלה. אנא נסה שוב.");
    }
  };

  return {
    formData,
    currentStep,
    status,
    errorMessage,
    canGoNext,
    setSelectedContentFields,
    setMainContentFields,
    setSelectedActivityTypes,
    setMainActivityTypes,
    updateField,
    handleNext,
    handlePrevious,
    handleSubmit,
    setCurrentStep,
    setStatus,
  };
}
