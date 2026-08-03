"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ACTIVITY_TYPES, CONTENT_FIELDS, PART_LABELS } from "../lib/surveyConstants";
import { useSurveyFlow } from "../hooks/useSurveyFlow";
import { SelectableOptionGrid } from "./SelectableOptionGrid";
import { ReviewSummary } from "./ReviewSummary";

export function SurveyShell() {
  const {
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
  } = useSurveyFlow();
  const [logoError, setLogoError] = useState(false);

  const progress = useMemo(() => {
    const steps = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    return ((currentStep + 1) / steps.length) * 100;
  }, [currentStep]);

  const toggleContentField = (value: string) => {
    const nextValues = formData.selectedContentFields.includes(value)
      ? formData.selectedContentFields.filter((item) => item !== value)
      : [...formData.selectedContentFields, value];
    setSelectedContentFields(nextValues);
  };

  const toggleMainContentField = (value: string) => {
    const nextValues = formData.mainContentFields.includes(value)
      ? formData.mainContentFields.filter((item) => item !== value)
      : formData.mainContentFields.length < 5
        ? [...formData.mainContentFields, value]
        : formData.mainContentFields;

    if (nextValues.length === formData.mainContentFields.length && !formData.mainContentFields.includes(value)) {
      return;
    }

    setMainContentFields(nextValues);
  };

  const toggleActivityType = (value: string) => {
    const nextValues = formData.selectedActivityTypes.includes(value)
      ? formData.selectedActivityTypes.filter((item) => item !== value)
      : [...formData.selectedActivityTypes, value];
    setSelectedActivityTypes(nextValues);
  };

  const toggleMainActivityType = (value: string) => {
    const nextValues = formData.mainActivityTypes.includes(value)
      ? formData.mainActivityTypes.filter((item) => item !== value)
      : formData.mainActivityTypes.length < 3
        ? [...formData.mainActivityTypes, value]
        : formData.mainActivityTypes;

    if (nextValues.length === formData.mainActivityTypes.length && !formData.mainActivityTypes.includes(value)) {
      return;
    }

    setMainActivityTypes(nextValues);
  };

  const renderStep = () => {
    if (currentStep === 0) {
      return (
        <div className="space-y-6 text-right">
          <div className="flex justify-center">
            <div className="relative h-24 w-40 rounded-2xl border border-dashed border-slate-300 bg-[#F6F8FA] p-4">
              {logoError ? (
                <div className="flex h-full items-center justify-center text-center text-sm text-slate-600">
                  יש להוסיף את הלוגו הממשלתי באססט /mandel-israel-logo.png
                </div>
              ) : (
                <Image
                  src="/mandel-israel-logo.png"
                  alt="Mandel Foundation Israel logo"
                  fill
                  className="object-contain"
                  onError={() => setLogoError(true)}
                />
              )}
            </div>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold text-[#123B63]">עדכון תחומי המומחיות בממשק המומחים</h1>
            <p className="text-lg leading-8 text-slate-700">
              שלום,
              <br />
              אנו מעדכנים בימים אלו את מבנה תחומי המומחיות בממשק המומחים של קרן מנדל, במטרה לשפר את יכולות איתור המומחים, לעודד יצירת שיתופי פעולה ולשקף בצורה מדויקת יותר את תחומי הידע והעשייה של כל מומחה ומומחית.
            </p>
            <p className="text-lg leading-8 text-slate-700">
              לאחר מיפוי מקיף של תחומי המומחיות בממשק, עודכנה רשימת תחומי התוכן ונוספה גם אפשרות להבחין בין תחומי המומחיות המרכזיים לבין תחומי מומחיות נוספים, וכן בין תחומי התוכן לבין סוגי העשייה המקצועית.
            </p>
            <p className="text-lg leading-8 text-slate-700">
              הטופס כולל ארבעה חלקים קצרים, ואורך מילויו כ-5 דקות.
            </p>
            <p className="text-lg leading-8 text-slate-700">תודה רבה על שיתוף הפעולה!</p>
          </div>
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className="rounded-full bg-[#123B63] px-6 py-3 text-lg font-semibold text-white shadow-sm transition hover:bg-[#0D2F4F]"
          >
            התחלת הטופס
          </button>
        </div>
      );
    }

    if (currentStep === 1) {
      return (
        <div className="space-y-6 text-right">
          <div>
            <h2 className="text-2xl font-semibold text-[#123B63]">{PART_LABELS[0]}</h2>
            <p className="mt-2 text-sm text-slate-600">יש למלא את הפרטים הבאים.</p>
          </div>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#123B63]">שם מלא</span>
            <input
              autoComplete="name"
              value={formData.participantName}
              maxLength={150}
              onChange={(event) => updateField("participantName", event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right shadow-sm focus:outline-none focus:ring-2 focus:ring-[#123B63]"
              placeholder="שם מלא"
            />
            {!canGoNext ? <p className="text-sm text-[#B42318]">יש למלא שם מלא כדי להמשיך.</p> : null}
          </label>
        </div>
      );
    }

    if (currentStep === 2) {
      return (
        <div className="space-y-6 text-right">
          <div>
            <h2 className="text-2xl font-semibold text-[#123B63]">{PART_LABELS[1]}</h2>
            <p className="mt-2 text-sm text-slate-600">יש לבחור את כל תחומי התוכן הרלוונטיים לעשייה המקצועית ולתחומי המומחיות שלך.</p>
          </div>
          <SelectableOptionGrid
            title="תחומי התוכן"
            options={CONTENT_FIELDS}
            selectedValues={formData.selectedContentFields}
            onToggle={toggleContentField}
          />
          {!canGoNext ? <p className="text-sm text-[#B42318]">יש לבחור לפחות תחום תוכן אחד כדי להמשיך.</p> : null}
        </div>
      );
    }

    if (currentStep === 3) {
      return (
        <div className="space-y-6 text-right">
          <div>
            <h2 className="text-2xl font-semibold text-[#123B63]">תחומי המומחיות המרכזיים</h2>
            <p className="mt-2 text-sm text-slate-600">מתוך התחומים שנבחרו, מהם תחומי המומחיות המרכזיים שלך?</p>
            <p className="mt-2 text-sm text-slate-600">מומלץ לבחור בין 3 ל-5 תחומים, המייצגים בצורה הטובה ביותר את מוקדי הידע והעשייה המרכזיים.</p>
          </div>
          <SelectableOptionGrid
            title="תחומי המומחיות המרכזיים"
            options={formData.selectedContentFields}
            selectedValues={formData.mainContentFields}
            onToggle={toggleMainContentField}
            maxSelections={5}
            maxSelectionMessage="ניתן לבחור עד 5 תחומי מומחיות מרכזיים."
          />
        </div>
      );
    }

    if (currentStep === 4) {
      return (
        <div className="space-y-6 text-right">
          <div>
            <h2 className="text-2xl font-semibold text-[#123B63]">{PART_LABELS[2]}</h2>
            <p className="mt-2 text-sm text-slate-600">לצד תחומי התוכן, נוספה בממשק קטגוריה חדשה של סוגי עשייה, שמטרתה לשקף את אופני העבודה המקצועיים שבהם ניתן להיעזר במומחה או במומחית.</p>
            <p className="mt-2 text-sm text-slate-600">יש לבחור את כל סוגי העשייה הרלוונטיים עבורך.</p>
          </div>
          <SelectableOptionGrid
            title="סוגי העשייה"
            options={ACTIVITY_TYPES}
            selectedValues={formData.selectedActivityTypes}
            onToggle={toggleActivityType}
          />
        </div>
      );
    }

    if (currentStep === 5) {
      return (
        <div className="space-y-6 text-right">
          <div>
            <h2 className="text-2xl font-semibold text-[#123B63]">סוגי העשייה המרכזיים</h2>
            <p className="mt-2 text-sm text-slate-600">מתוך סוגי העשייה שנבחרו, מהם סוגי העשייה המרכזיים?</p>
            <p className="mt-2 text-sm text-slate-600">מומלץ לבחור עד 3 סוגי עשייה, המייצגים בצורה הטובה ביותר את עיקר הפעילות המקצועית.</p>
          </div>
          <SelectableOptionGrid
            title="סוגי העשייה המרכזיים"
            options={formData.selectedActivityTypes}
            selectedValues={formData.mainActivityTypes}
            onToggle={toggleMainActivityType}
            maxSelections={3}
            maxSelectionMessage="ניתן לבחור עד 3 סוגי עשייה מרכזיים."
          />
        </div>
      );
    }

    if (currentStep === 6) {
      return (
        <div className="space-y-6 text-right">
          <div>
            <h2 className="text-2xl font-semibold text-[#123B63]">{PART_LABELS[3]}</h2>
            <p className="mt-2 text-sm text-slate-600">האם לדעתך חסר תחום תוכן או סוג עשייה שהיה נכון לכלול בממשק?</p>
          </div>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#123B63]">הצעה</span>
            <textarea
              value={formData.missingFieldSuggestion}
              maxLength={1000}
              onChange={(event) => updateField("missingFieldSuggestion", event.target.value)}
              className="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right shadow-sm focus:outline-none focus:ring-2 focus:ring-[#123B63]"
              placeholder="שאלה זו אינה חובה."
            />
          </label>
        </div>
      );
    }

    if (currentStep === 7) {
      return (
        <div className="space-y-6 text-right">
          <div>
            <h2 className="text-2xl font-semibold text-[#123B63]">סקירת תשובות</h2>
            <p className="mt-2 text-sm text-slate-600">לפני השליחה, יש לסקור את התשובות.</p>
          </div>
          <ReviewSummary formData={formData} />
        </div>
      );
    }

    return (
      <div className="space-y-6 text-right">
        <div className="flex justify-center">
          <div className="relative h-24 w-40 rounded-2xl border border-dashed border-slate-300 bg-[#F6F8FA] p-4">
            {logoError ? (
              <div className="flex h-full items-center justify-center text-center text-sm text-slate-600">
                יש להוסיף את הלוגו הממשלתי באססט /mandel-israel-logo.png
              </div>
            ) : (
              <Image
                src="/mandel-israel-logo.png"
                alt="Mandel Foundation Israel logo"
                fill
                className="object-contain"
                onError={() => setLogoError(true)}
              />
            )}
          </div>
        </div>
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold text-[#123B63]">תודה רבה!</h2>
          <p className="text-lg leading-8 text-slate-700">תודה על הקדשת הזמן לעדכון פרטיך.</p>
          <p className="text-lg leading-8 text-slate-700">
            המידע יסייע להמשיך ולפתח את ממשק המומחים ככלי מרכזי לאיתור מומחים, יצירת שיתופי פעולה ושיתוף ידע בקרן מנדל.
          </p>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#F6F8FA] px-4 py-6 text-right text-[#1F2937] sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="mb-2 h-2 overflow-hidden rounded-full bg-[#EAF1F7]">
                <div className="h-full rounded-full bg-[#123B63] transition-all" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-sm text-slate-500">{PART_LABELS[Math.min(currentStep, 3)]}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-[#F6F8FA] p-6">
            {renderStep()}
          </div>
        </div>

        {status === "submitting" ? <p className="text-center text-[#123B63]">שולח...</p> : null}
        {errorMessage ? <p className="text-center text-[#B42318]">{errorMessage}</p> : null}

        <div className="flex flex-wrap justify-between gap-3">
          {currentStep > 0 && currentStep < 8 ? (
            <button
              type="button"
              onClick={handlePrevious}
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-lg font-semibold text-[#123B63] shadow-sm transition hover:bg-[#EAF1F7]"
            >
              הקודם
            </button>
          ) : null}

          {currentStep < 7 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canGoNext}
              className="rounded-full bg-[#123B63] px-6 py-3 text-lg font-semibold text-white shadow-sm transition hover:bg-[#0D2F4F] disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {currentStep === 6 ? "מעבר לסיכום" : "הבא"}
            </button>
          ) : null}

          {currentStep === 7 ? (
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-full bg-[#123B63] px-6 py-3 text-lg font-semibold text-white shadow-sm transition hover:bg-[#0D2F4F]"
            >
              שליחת הטופס
            </button>
          ) : null}
        </div>
      </div>
    </main>
  );
}
