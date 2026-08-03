import type { SurveyFormData } from "./surveyTypes";

export function validateParticipantName(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return "יש למלא שם מלא כדי להמשיך.";
  }
  if (trimmed.length > 150) {
    return "יש למלא שם מלא כדי להמשיך.";
  }
  return null;
}

export function validateContentSelection(value: string[]): string | null {
  return value.length > 0 ? null : "יש לבחור לפחות תחום תוכן אחד כדי להמשיך.";
}

export function isStepValid(step: number, formData: SurveyFormData): boolean {
  switch (step) {
    case 1:
      return validateParticipantName(formData.participantName) === null;
    case 2:
      return validateContentSelection(formData.selectedContentFields) === null;
    default:
      return true;
  }
}
