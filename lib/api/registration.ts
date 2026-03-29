import { RegistrationFormData } from "@/lib/types";

export async function submitRegistrationDraft(data: RegistrationFormData) {
  return Promise.resolve({
    ok: true,
    data
  });
}
