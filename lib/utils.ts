import { Founder, RegistrationFormData } from "@/lib/types";
import { defaultRegistrationData } from "@/lib/constants";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function normalizeFounderArray(founders: Founder[], count: number): Founder[] {
  const nextFounders = [...founders];
  while (nextFounders.length < count) {
    nextFounders.push({
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
    });
  }

  return nextFounders.slice(0, count);
}

export function mergeWithDefaults(
  incoming?: Partial<RegistrationFormData>
): RegistrationFormData {
  if (!incoming) {
    return defaultRegistrationData;
  }

  return {
    ...defaultRegistrationData,
    ...incoming,
    names: incoming.names ?? defaultRegistrationData.names,
    foundersCount: incoming.foundersCount ?? defaultRegistrationData.foundersCount,
    founders: normalizeFounderArray(
      incoming.founders ?? defaultRegistrationData.founders,
      incoming.foundersCount ?? defaultRegistrationData.foundersCount
    ),
    registeredAddress: {
      ...defaultRegistrationData.registeredAddress,
      ...incoming.registeredAddress
    },
    mailingAddress: {
      ...defaultRegistrationData.mailingAddress,
      ...incoming.mailingAddress
    },
    organizationDetails: {
      ...defaultRegistrationData.organizationDetails,
      ...incoming.organizationDetails,
      objectives:
        incoming.organizationDetails?.objectives?.length
          ? incoming.organizationDetails.objectives
          : defaultRegistrationData.organizationDetails.objectives
    }
  };
}

export function formatSummaryText(data: RegistrationFormData) {
  return [
    "סיכום פרטי רישום עמותה",
    "",
    "שמות מוצעים:",
    ...data.names.map(
      (name, index) =>
        `עדיפות ${index + 1}: ${name.hebrew}${name.english ? ` | ${name.english}` : ""}`
    ),
    "",
    "מייסדים:",
    ...data.founders.map(
      (founder, index) =>
        `מייסד ${index + 1}: ${founder.fullName}, ${founder.idNumber}, ${founder.identificationType}, ${founder.role}, ${founder.citizenship}, ${founder.address.city} ${founder.address.street} ${founder.address.houseNumber}, תעודת זהות קדמית: ${founder.idCardFront ? "צורפה" : "לא צורפה"}, תעודת זהות אחורית: ${founder.idCardBack ? "צורפה" : "לא צורפה"}`
    ),
    "",
    "כתובת רשמית:",
    `סוג כתובת: ${data.registeredAddress.holderType}`,
    `מייסד נבחר: ${
      data.registeredAddress.holderType === "founderAddress"
        ? data.founders[Number(data.registeredAddress.founderIndex)]?.fullName || "-"
        : "-"
    }`,
    `עיר: ${data.registeredAddress.city}`,
    `רחוב: ${data.registeredAddress.street}`,
    `בית: ${data.registeredAddress.houseNumber}`,
    `כניסה: ${data.registeredAddress.entrance || "-"}`,
    `דירה: ${data.registeredAddress.apartment || "-"}`,
    `קומה: ${data.registeredAddress.floor || "-"}`,
    `מיקוד: ${data.registeredAddress.postalCode || "-"}`,
    `אצל: ${data.registeredAddress.careOf || "-"}`,
    "",
    "כתובת למשלוח דואר:",
    `סוג: ${data.mailingAddress.type}`,
    `עיר: ${data.mailingAddress.city || "-"}`,
    `רחוב: ${data.mailingAddress.street || "-"}`,
    `בית: ${data.mailingAddress.houseNumber || "-"}`,
    `מיקוד: ${data.mailingAddress.postalCode || "-"}`,
    `ת.ד.: ${data.mailingAddress.poBox || "-"}`,
    `אצל: ${data.mailingAddress.careOf || "-"}`,
    "",
    "פרטי עמותה:",
    `תחום עיסוק עיקרי: ${data.organizationDetails.primaryField}`,
    `תת תחום: ${data.organizationDetails.secondaryField}`,
    `אגודה עות'מאנית: ${data.organizationDetails.basedOnOttomanAssociation}`,
    `ניהול בית כנסת: ${data.organizationDetails.forSynagogueManagement}`,
    `פעילות במסגרת תאגיד אחר: ${data.organizationDetails.managedUnderOtherCorporation}`,
    "",
    "מטרות:",
    ...data.organizationDetails.objectives.map(
      (objective, index) =>
        `${index + 1}. ${objective.purpose}${objective.settlement ? ` | יישוב: ${objective.settlement}` : ""}`
    )
  ].join("\n");
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("קריאת הקובץ נכשלה"));
    reader.readAsDataURL(file);
  });
}
