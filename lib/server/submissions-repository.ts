import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { RegistrationFormData, RegistrationSubmission, SubmissionStatus } from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), "data");
const SUBMISSIONS_FILE = path.join(DATA_DIR, "submissions.json");

type SubmissionList = {
  submissions: RegistrationSubmission[];
};

async function ensureStore() {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(SUBMISSIONS_FILE, "utf8");
  } catch {
    await writeFile(
      SUBMISSIONS_FILE,
      JSON.stringify({ submissions: [] satisfies RegistrationSubmission[] }, null, 2),
      "utf8"
    );
  }
}

async function readStore(): Promise<SubmissionList> {
  await ensureStore();
  const raw = await readFile(SUBMISSIONS_FILE, "utf8");
  return JSON.parse(raw) as SubmissionList;
}

async function writeStore(store: SubmissionList) {
  await ensureStore();
  await writeFile(SUBMISSIONS_FILE, JSON.stringify(store, null, 2), "utf8");
}

function createClientLabel(data: RegistrationFormData) {
  const primaryName = data.names[0]?.hebrew || "עמותה ללא שם";
  const founder = data.founders[0]?.fullName || "ללא מייסד מוביל";
  return `${primaryName} | ${founder}`;
}

export async function createSubmission(data: RegistrationFormData) {
  const store = await readStore();
  const now = new Date().toISOString();
  const submission: RegistrationSubmission = {
    id: crypto.randomUUID(),
    clientLabel: createClientLabel(data),
    status: "new",
    createdAt: now,
    updatedAt: now,
    data
  };

  store.submissions.unshift(submission);
  await writeStore(store);
  return submission;
}

export async function listSubmissions() {
  const store = await readStore();
  return store.submissions;
}

export async function getSubmissionById(id: string) {
  const store = await readStore();
  return store.submissions.find((submission) => submission.id === id) ?? null;
}

export async function updateSubmissionStatus(id: string, status: SubmissionStatus) {
  const store = await readStore();
  const submission = store.submissions.find((entry) => entry.id === id);
  if (!submission) {
    return null;
  }

  submission.status = status;
  submission.updatedAt = new Date().toISOString();
  await writeStore(store);
  return submission;
}
