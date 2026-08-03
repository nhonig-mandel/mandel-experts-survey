type ReviewSummaryProps = {
  formData: {
    participantName: string;
    selectedContentFields: string[];
    mainContentFields: string[];
    secondaryContentFields: string[];
    selectedActivityTypes: string[];
    mainActivityTypes: string[];
    secondaryActivityTypes: string[];
    missingFieldSuggestion: string;
  };
};

function renderList(items: string[]) {
  if (items.length === 0) {
    return "לא נבחרו";
  }

  return items.join(", ");
}

export function ReviewSummary({ formData }: ReviewSummaryProps) {
  return (
    <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-[#123B63]">סיכום</h2>
      <div className="space-y-4 text-right text-sm text-slate-700">
        <div>
          <h3 className="font-semibold text-[#123B63]">שם מלא</h3>
          <p>{formData.participantName || "לא נבחר"}</p>
        </div>
        <div>
          <h3 className="font-semibold text-[#123B63]">כל תחומי התוכן שנבחרו</h3>
          <p>{renderList(formData.selectedContentFields)}</p>
        </div>
        <div>
          <h3 className="font-semibold text-[#123B63]">תחומי המומחיות המרכזיים</h3>
          <p>{renderList(formData.mainContentFields)}</p>
        </div>
        <div>
          <h3 className="font-semibold text-[#123B63]">תחומי המומחיות המשניים</h3>
          <p>{renderList(formData.secondaryContentFields)}</p>
        </div>
        <div>
          <h3 className="font-semibold text-[#123B63]">כל סוגי העשייה שנבחרו</h3>
          <p>{renderList(formData.selectedActivityTypes)}</p>
        </div>
        <div>
          <h3 className="font-semibold text-[#123B63]">סוגי העשייה המרכזיים</h3>
          <p>{renderList(formData.mainActivityTypes)}</p>
        </div>
        <div>
          <h3 className="font-semibold text-[#123B63]">סוגי העשייה המשניים</h3>
          <p>{renderList(formData.secondaryActivityTypes)}</p>
        </div>
        <div>
          <h3 className="font-semibold text-[#123B63]">ההצעה שנכתבה</h3>
          <p>{formData.missingFieldSuggestion || "לא נכתבה"}</p>
        </div>
      </div>
    </section>
  );
}
