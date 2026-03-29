export type StepId = "name" | "founders" | "address" | "details" | "summary";

export type NameOption = {
  hebrew: string;
  english: string;
};

export type Founder = {
  fullName: string;
  idNumber: string;
  identificationType: string;
  role: string;
  citizenship: string;
  idCardFront: string;
  idCardBack: string;
  address: {
    city: string;
    street: string;
    houseNumber: string;
    entrance: string;
    apartment: string;
    floor: string;
    postalCode: string;
    careOf: string;
  };
};

export type MailingAddressType = "same" | "additional" | "poBox";
export type AddressHolderType = "associationOffice" | "founderAddress" | "other";

export type RegisteredAddress = {
  holderType: AddressHolderType;
  founderIndex: string;
  city: string;
  street: string;
  houseNumber: string;
  entrance: string;
  apartment: string;
  floor: string;
  postalCode: string;
  careOf: string;
};

export type MailingAddress = {
  type: MailingAddressType;
  city: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  poBox: string;
  careOf: string;
};

export type Objective = {
  purpose: string;
  settlement: string;
};

export type OrganizationDetails = {
  primaryField: string;
  secondaryField: string;
  basedOnOttomanAssociation: "yes" | "no";
  forSynagogueManagement: "yes" | "no";
  managedUnderOtherCorporation: "yes" | "no";
  objectives: Objective[];
};

export type RegistrationFormData = {
  names: [NameOption, NameOption, NameOption];
  foundersCount: number;
  founders: Founder[];
  registeredAddress: RegisteredAddress;
  mailingAddress: MailingAddress;
  organizationDetails: OrganizationDetails;
};

export type SubmissionStatus = "new" | "missing_info" | "ready_to_transfer" | "completed";

export type RegistrationSubmission = {
  id: string;
  clientLabel: string;
  status: SubmissionStatus;
  createdAt: string;
  updatedAt: string;
  data: RegistrationFormData;
};
