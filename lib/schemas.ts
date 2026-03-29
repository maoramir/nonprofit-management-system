import { z } from "zod";

const requiredMessage = "יש למלא שדה זה";
const idMessage = "יש להזין מספר זהות תקין";

const founderSchema = z.object({
  fullName: z.string().min(2, requiredMessage),
  idNumber: z.string().regex(/^\d{9}$/, idMessage),
  identificationType: z.string().min(1, requiredMessage),
  role: z.string().min(1, requiredMessage),
  citizenship: z.string().min(1, requiredMessage),
  idCardFront: z.string(),
  idCardBack: z.string(),
  address: z.object({
    city: z.string().min(2, requiredMessage),
    street: z.string().min(2, requiredMessage),
    houseNumber: z.string().min(1, requiredMessage),
    entrance: z.string(),
    apartment: z.string(),
    floor: z.string(),
    postalCode: z.string(),
    careOf: z.string()
  })
});

export const namesSchema = z.object({
  names: z.tuple([
    z.object({
      hebrew: z.string().min(2, requiredMessage),
      english: z.string()
    }),
    z.object({
      hebrew: z.string().min(2, requiredMessage),
      english: z.string()
    }),
    z.object({
      hebrew: z.string().min(2, requiredMessage),
      english: z.string()
    })
  ])
});

export const foundersSchema = z.object({
  foundersCount: z.coerce
    .number({ invalid_type_error: "יש להזין מספר תקין" })
    .min(2, "נדרשים לפחות שני מייסדים")
    .max(20, "ניתן להזין עד 20 מייסדים בשלב זה"),
  founders: z.array(founderSchema).min(2, "נדרשים לפחות שני מייסדים")
});

export const addressSchema = z
  .object({
    registeredAddress: z.object({
      holderType: z.string().min(1, requiredMessage),
      founderIndex: z.string(),
      city: z.string().min(2, requiredMessage),
      street: z.string().min(2, requiredMessage),
      houseNumber: z.string().min(1, requiredMessage),
      entrance: z.string(),
      apartment: z.string(),
      floor: z.string(),
      postalCode: z.string(),
      careOf: z.string()
    }),
    mailingAddress: z.object({
      type: z.enum(["same", "additional", "poBox"]),
      city: z.string(),
      street: z.string(),
      houseNumber: z.string(),
      postalCode: z.string(),
      poBox: z.string(),
      careOf: z.string()
    })
  })
  .superRefine((value, ctx) => {
    if (value.registeredAddress.holderType === "founderAddress" && !value.registeredAddress.founderIndex) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "יש לבחור מייסד",
        path: ["registeredAddress", "founderIndex"]
      });
    }

    if (value.mailingAddress.type === "additional") {
      if (value.mailingAddress.city.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: requiredMessage,
          path: ["mailingAddress", "city"]
        });
      }
      if (value.mailingAddress.street.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: requiredMessage,
          path: ["mailingAddress", "street"]
        });
      }
      if (!value.mailingAddress.houseNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: requiredMessage,
          path: ["mailingAddress", "houseNumber"]
        });
      }
    }

    if (value.mailingAddress.type === "poBox" && !value.mailingAddress.poBox) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: requiredMessage,
        path: ["mailingAddress", "poBox"]
      });
    }
  });

export const organizationDetailsSchema = z.object({
  organizationDetails: z.object({
    primaryField: z.string().min(1, requiredMessage),
    secondaryField: z.string().min(1, requiredMessage),
    basedOnOttomanAssociation: z.enum(["yes", "no"]),
    forSynagogueManagement: z.enum(["yes", "no"]),
    managedUnderOtherCorporation: z.enum(["yes", "no"]),
    objectives: z
      .array(
        z.object({
          purpose: z.string().min(2, "יש להזין מטרה"),
          settlement: z.string()
        })
      )
      .min(1, "יש להזין לפחות מטרה אחת")
  })
});
