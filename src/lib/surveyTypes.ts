export type SurveyFormData = {
  participantName: string;
  selectedContentFields: string[];
  mainContentFields: string[];
  secondaryContentFields: string[];
  selectedActivityTypes: string[];
  mainActivityTypes: string[];
  secondaryActivityTypes: string[];
  missingFieldSuggestion: string;
};

export type SurveyStep =
  | "welcome"
  | "personalDetails"
  | "contentFields"
  | "mainContentFields"
  | "activityTypes"
  | "mainActivityTypes"
  | "finalQuestion"
  | "review"
  | "thankYou";
