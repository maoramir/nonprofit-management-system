import { RegistrationFormData, StepId, SubmissionStatus } from "@/lib/types";

export const wizardSteps: { id: StepId; title: string; shortTitle: string }[] = [
  { id: "name", title: "שם העמותה", shortTitle: "שם" },
  { id: "founders", title: "מייסדים", shortTitle: "מייסדים" },
  { id: "address", title: "כתובת", shortTitle: "כתובת" },
  { id: "details", title: "פרטי עמותה", shortTitle: "פרטים" },
  { id: "summary", title: "סיכום", shortTitle: "סיכום" }
];

export const identificationTypes = ["תעודת זהות", "דרכון", "מספר מזהה אחר"];
export const founderRoles = ["מייסד", "יושב ראש", "חבר ועד", "אחר"];
export const citizenshipOptions = ["ישראלי", "זר"];

export const addressHolderOptions = [
  { value: "associationOffice", label: "משרד העמותה" },
  { value: "founderAddress", label: "כתובת של אחד המייסדים" },
  { value: "other", label: "כתובת אחרת" }
] as const;

export const mailingAddressOptions = [
  { value: "same", label: "זהה לכתובת הרשמית" },
  { value: "additional", label: "כתובת נוספת" },
  { value: "poBox", label: "תיבת דואר" }
] as const;

export const primaryFields = [
  "חינוך",
  "רווחה",
  "קהילה וחברה",
  "דת ומסורת",
  "בריאות",
  "תרבות ופנאי",
  "ספורט",
  "סביבה",
  "אחר"
];

export const secondaryFields = [
  "סיוע לנוער",
  "סיוע למשפחות",
  "חינוך בלתי פורמלי",
  "בית כנסת",
  "קהילה מקומית",
  "תמיכה רפואית",
  "אחר"
];

export const yesNoOptions = [
  { value: "yes", label: "כן" },
  { value: "no", label: "לא" }
] as const;

export const defaultRegistrationData: RegistrationFormData = {
  names: [
    { hebrew: "", english: "" },
    { hebrew: "", english: "" },
    { hebrew: "", english: "" }
  ],
  foundersCount: 2,
  founders: [
    {
      fullName: "",
      idNumber: "",
      identificationType: "תעודת זהות",
      role: "מייסד",
      citizenship: "ישראלי",
      idCardFront: "",
      idCardBack: "",
      address: {
        city: "",
        street: "",
        houseNumber: "",
        entrance: "",
        apartment: "",
        floor: "",
        postalCode: "",
        careOf: ""
      }
    },
    {
      fullName: "",
      idNumber: "",
      identificationType: "תעודת זהות",
      role: "מייסד",
      citizenship: "ישראלי",
      idCardFront: "",
      idCardBack: "",
      address: {
        city: "",
        street: "",
        houseNumber: "",
        entrance: "",
        apartment: "",
        floor: "",
        postalCode: "",
        careOf: ""
      }
    }
  ],
  registeredAddress: {
    holderType: "associationOffice",
    founderIndex: "",
    city: "",
    street: "",
    houseNumber: "",
    entrance: "",
    apartment: "",
    floor: "",
    postalCode: "",
    careOf: ""
  },
  mailingAddress: {
    type: "same",
    city: "",
    street: "",
    houseNumber: "",
    postalCode: "",
    poBox: "",
    careOf: ""
  },
  organizationDetails: {
    primaryField: "",
    secondaryField: "",
    basedOnOttomanAssociation: "no",
    forSynagogueManagement: "no",
    managedUnderOtherCorporation: "no",
    objectives: [{ purpose: "", settlement: "" }]
  }
};

export const storageKey = "amuta-registration-wizard";

export const submissionStatusOptions: {
  value: SubmissionStatus;
  label: string;
}[] = [
  { value: "new", label: "חדש" },
  { value: "missing_info", label: "ממתין להשלמה" },
  { value: "ready_to_transfer", label: "מוכן להעברה" },
  { value: "completed", label: "הושלם" }
];
