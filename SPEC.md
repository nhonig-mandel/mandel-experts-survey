# Mandel Experts Survey - Product and Technical Specification

## 1. Project overview

Build a complete Hebrew RTL survey application for the Mandel Foundation Israel Experts Interface.

The application allows experts to update:

1. Their content expertise fields
2. Their main content expertise fields
3. Their secondary content expertise fields
4. Their professional activity types
5. Their main professional activity types
6. Their secondary professional activity types
7. Suggestions for missing content fields or activity types

The application will be deployed to Vercel.

Survey responses must be sent through a secure server-side Vercel API route to a Microsoft Power Automate flow, which will add each response as a new row in an Excel table stored in OneDrive for Business or SharePoint.

Do not create a separate database.

Excel will serve as the response management interface for this version. Do not build an admin dashboard in version 1.

## 2. Existing project and technology

The project already uses:

- Next.js 16
- TypeScript
- App Router
- Tailwind CSS
- A `src` directory
- Vercel-compatible project structure

Use the existing project.

Do not replace Next.js with another framework.

Use:

- React functional components
- TypeScript
- Tailwind CSS
- Next.js App Router
- A server-side route handler at `/api/submit`
- Reusable components
- Central constants for all option lists

Avoid unnecessary dependencies.

A small validation library such as Zod may be added if useful.

## 3. Language and direction

The entire user-facing application must be in Hebrew.

Requirements:

- Full RTL layout
- Set the document language to Hebrew
- Set the document direction to RTL
- Correct right alignment for text, labels, buttons and validation messages
- Correct RTL behavior in grids, dialogs and navigation
- Do not display English interface labels to respondents
- Use only the exact Hebrew wording supplied in this specification

## 4. Visual identity

Create a professional, restrained and elegant design suitable for the Mandel Foundation Israel.

### Colors

Primary dark blue:

`#123B63`

Secondary dark blue:

`#0D2F4F`

Light blue:

`#EAF1F7`

Page background:

`#F6F8FA`

Card background:

`#FFFFFF`

Main text:

`#1F2937`

Secondary text:

`#64748B`

Borders:

`#D7E0E8`

Error:

`#B42318`

Success:

`#027A48`

### Design requirements

- Clean and spacious layout
- Professional appearance
- No gradients
- No bright or saturated decorative colors
- Rounded cards
- Subtle shadows
- Clear visual hierarchy
- High contrast
- Large, readable Hebrew typography
- Responsive layout
- Visible keyboard focus states
- Accessible controls
- Consistent button design
- Clear selected, hover and disabled states

The main survey container should be centered and have a comfortable maximum width.

### Logo

Use the official Mandel Foundation Israel logo from:

`/public/mandel-israel-logo.png`

Display it:

- On the welcome screen
- On the thank-you screen

Preserve the logo proportions.

Do not crop, distort or recolor it.

Do not use a placeholder letter, invented logo or generic icon if the file is missing. Keep the expected image path and report that the asset must be added.

## 5. Survey structure

Create a multi-step survey.

The respondent sees four conceptual parts:

- חלק א' - פרטים
- חלק ב' - תחומי התוכן
- חלק ג' - סוגי עשייה
- חלק ד' - לסיום

Some parts contain two internal screens.

The complete flow is:

1. Welcome screen
2. Part A - Personal details
3. Part B1 - Select all content fields
4. Part B2 - Select main content fields
5. Part C1 - Select all activity types
6. Part C2 - Select main activity types
7. Part D - Final optional question
8. Review screen
9. Thank-you screen

If no activity type is selected in Part C1, skip Part C2 automatically.

## 6. Progress and navigation

Display a clear but unobtrusive progress indicator.

The progress indicator should communicate the four main parts rather than presenting the survey as nine unrelated pages.

Requirements:

- Previous button
- Next button
- Final submit button
- Preserve all answers when navigating backward or forward
- Do not reset selections when changing steps
- Do not display a live selection counter
- Disable the Next button only when a required field on the current screen is invalid
- Use clear Hebrew button labels

Suggested labels:

- הקודם
- הבא
- מעבר לסיכום
- שליחת הטופס

## 7. Welcome screen

Display the official Mandel Foundation Israel logo.

### Title

עדכון תחומי המומחיות בממשק המומחים

### Body text

שלום,

אנו מעדכנים בימים אלו את מבנה תחומי המומחיות בממשק המומחים של קרן מנדל, במטרה לשפר את יכולות איתור המומחים, לעודד יצירת שיתופי פעולה ולשקף בצורה מדויקת יותר את תחומי הידע והעשייה של כל מומחה ומומחית.

לאחר מיפוי מקיף של תחומי המומחיות בממשק, עודכנה רשימת תחומי התוכן ונוספה גם אפשרות להבחין בין תחומי המומחיות המרכזיים לבין תחומי מומחיות נוספים, וכן בין תחומי התוכן לבין סוגי העשייה המקצועית.

הטופס כולל ארבעה חלקים קצרים, ואורך מילויו כ-5 דקות.

תודה רבה על שיתוף הפעולה!

### Primary button

התחלת הטופס

## 8. Part A - Personal details

### Section title

חלק א' - פרטים

### Field

שם מלא

Requirements:

- Required
- Single-line text field
- Trim leading and trailing spaces
- Do not allow an empty value
- Maximum length: 150 characters
- Use autocomplete where appropriate

### Validation message

יש למלא שם מלא כדי להמשיך.

## 9. Part B1 - Select content fields

### Section title

חלק ב' - תחומי התוכן

### Instruction

יש לבחור את כל תחומי התוכן הרלוונטיים לעשייה המקצועית ולתחומי המומחיות שלך.

### Display

Display all options in a responsive, table-like grid of selectable cells or cards.

The visual presentation should resemble a well-organized table rather than one long list.

Suggested layout:

- Large desktop: 4 columns
- Medium desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

Each option must:

- Be one independent selectable item
- Include a checkbox
- Show the complete label
- Be selectable by clicking anywhere in the cell
- Have a clear dark-blue selected state
- Have a visible keyboard focus state

Use each line below as one separate option.

Preserve the exact wording and exact order.

Do not add commas, numbering, bullets or punctuation to the labels.

Do not sort the array automatically. The order below is already the required order.

### Content fields

אחריות תאגידית
אי שוויון
אמנויות
ארכיטקטורה
אסלאם
אתיקה וערכים
בינוי קהילה
בריאות הציבור
גלובליזציה
הגות פוליטית
החברה האזרחית בישראל
החברה בישראל
החברה החרדית בישראל
החברה הערבית והבדואית בישראל
הובלת תהליכי שינוי
היסטוריה
המגזר העסקי בישראל
הכשרת מורים
השכלה גבוהה
זהות
חברה ומשפט
חברה מגוונת וטוב משותף
חוסן
חדשנות
חינוך
חינוך בלתי פורמלי
חשיבה אסטרטגית
יהדות ומחשבת ישראל
יזמות
ייעוץ ארגוני
כלכלה
לימודי הוראה - תעודת הוראה
לימודי מקום
מגדר
מדיניות ומנהל ציבורי
מנהיגות
מערכת החינוך בישראל
מסורתיות
מרכז-פריפריה
ניהול
ניהול שותפויות
ספרות
סוציולוגיה ואנתרופולוגיה
עמיות יהודית
אוכלוסיות במצבי סיכון
פדגוגיה
פילוסופיה
פוליטיקה של זהויות
פסיכולוגיה
צבא וחברה
קיימות
רב-תרבותיות
שלטון מקומי
תרבות
תרבות יהודית
תקשורת חזותית
תקשורת מדיה ודיגיטל

### Validation

At least one content field is required.

There is no maximum number of selections on this screen.

### Validation message

יש לבחור לפחות תחום תוכן אחד כדי להמשיך.

## 10. Part B2 - Select main content fields

### Title

תחומי המומחיות המרכזיים

### Question

מתוך התחומים שנבחרו, מהם תחומי המומחיות המרכזיים שלך?

### Instruction

מומלץ לבחור בין 3 ל-5 תחומים, המייצגים בצורה הטובה ביותר את מוקדי הידע והעשייה המרכזיים.

### Logic

- Display only the content fields selected in Part B1
- Preserve their order from the central content field list
- Use the same selectable grid design
- Selecting fewer than 3 is allowed
- Selecting no main content field is allowed
- Maximum selection: 5
- Do not display a counter
- Prevent selection of a sixth main field

If an attempt is made to select more than 5, display:

ניתן לבחור עד 5 תחומי מומחיות מרכזיים.

### Automatic classification

- Items selected on this screen become `main_content_fields`
- All items selected in Part B1 but not selected here automatically become `secondary_content_fields`
- Do not ask respondents to select secondary fields manually

The calculation must always use the latest selections.

## 11. Part C1 - Select activity types

### Section title

חלק ג' - סוגי עשייה

### Introductory text

לצד תחומי התוכן, נוספה בממשק קטגוריה חדשה של סוגי עשייה, שמטרתה לשקף את אופני העבודה המקצועיים שבהם ניתן להיעזר במומחה או במומחית.

### Instruction

יש לבחור את כל סוגי העשייה הרלוונטיים עבורך.

### Display

Use the same responsive, table-like selectable grid used for content fields.

Use each line below as one separate option.

Preserve the exact wording and exact order.

Do not add commas, numbering, bullets or punctuation to the labels.

### Activity types

הנחיה אישית
הנחיית קבוצות
הרצאות
כתיבה
מדידה והערכה
מנטורינג
סטוריטלינג והעברת מסרים
עיצוב גרפי
עריכה
פיתוח תוכן

### Validation

This part is optional.

Allow continuing without selecting any activity type.

## 12. Part C2 - Select main activity types

### Title

סוגי העשייה המרכזיים

### Question

מתוך סוגי העשייה שנבחרו, מהם סוגי העשייה המרכזיים?

### Instruction

מומלץ לבחור עד 3 סוגי עשייה, המייצגים בצורה הטובה ביותר את עיקר הפעילות המקצועית.

### Logic

- Display only activity types selected in Part C1
- Preserve their original order
- Use the same selectable grid
- Selecting fewer than 3 is allowed
- Selecting none is allowed
- Maximum selection: 3
- Do not display a counter
- Prevent selection of a fourth activity type

If an attempt is made to select more than 3, display:

ניתן לבחור עד 3 סוגי עשייה מרכזיים.

### Automatic classification

- Items selected on this screen become `main_activity_types`
- Items selected in Part C1 but not selected here automatically become `secondary_activity_types`
- Do not ask respondents to select secondary activity types manually

If no activity type was selected in Part C1:

- Skip this screen
- Set `selected_activity_types` to an empty array
- Set `main_activity_types` to an empty array
- Set `secondary_activity_types` to an empty array

## 13. Part D - Final optional question

### Section title

חלק ד' - לסיום

### Question

האם לדעתך חסר תחום תוכן או סוג עשייה שהיה נכון לכלול בממשק?

### Field

- Multiline textarea
- Optional
- Maximum length: 1,000 characters

### Note

שאלה זו אינה חובה.

## 14. Review screen

Before submission, display a concise and clearly structured review of the answers.

Show:

- שם מלא
- כל תחומי התוכן שנבחרו
- תחומי המומחיות המרכזיים
- תחומי המומחיות המשניים
- כל סוגי העשייה שנבחרו
- סוגי העשייה המרכזיים
- סוגי העשייה המשניים
- ההצעה שנכתבה, אם קיימת

Display selected fields as readable tags or grouped text.

If an optional group is empty, show:

לא נבחרו

Allow returning to previous steps to edit answers.

### Submit button

שליחת הטופס

## 15. Thank-you screen

Display the official Mandel Foundation Israel logo.

### Title

תודה רבה!

### Body text

תודה על הקדשת הזמן לעדכון פרטיך.

המידע יסייע להמשיך ולפתח את ממשק המומחים ככלי מרכזי לאיתור מומחים, יצירת שיתופי פעולה ושיתוף ידע בקרן מנדל.

Do not allow the same response to be submitted again accidentally from this screen.

## 16. Form state

Preserve answers throughout the complete survey flow.

Use React state as the primary form state.

Temporary browser session storage may be used only to preserve an unfinished form during the current browser session.

Do not use browser storage as permanent response storage.

Requirements:

- Preserve answers when moving backward
- Preserve answers after a failed submission
- Do not create partial Excel responses
- Do not clear the form before successful confirmation
- Warn before leaving the page when unsaved answers exist, if practical
- Clear temporary session data only after successful submission

## 17. Response data model

Define a typed response object containing:

```ts
type SurveyResponse = {
  participant_name: string;
  selected_content_fields: string[];
  main_content_fields: string[];
  secondary_content_fields: string[];
  selected_activity_types: string[];
  main_activity_types: string[];
  secondary_activity_types: string[];
  missing_field_suggestion: string;
};
