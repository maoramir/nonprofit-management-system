import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/admin/status-badge";
import { StatusForm } from "@/components/admin/status-form";
import { getSubmissionById } from "@/lib/server/submissions-repository";

export const dynamic = "force-dynamic";

export default async function SubmissionDetailsPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const submission = await getSubmissionById(id);

  if (!submission) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-sand px-4 py-8 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-soft">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-brand-700">פירוט פנייה</p>
              <h1 className="mt-2 text-3xl font-extrabold">{submission.clientLabel}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <StatusBadge status={submission.status} />
                <span className="text-sm text-slate-500">
                  נוצר: {new Date(submission.createdAt).toLocaleString("he-IL")}
                </span>
                <span className="text-sm text-slate-500">
                  עודכן: {new Date(submission.updatedAt).toLocaleString("he-IL")}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:w-72">
              <StatusForm submissionId={submission.id} currentStatus={submission.status} />
              <Link
                href="/admin"
                className="inline-flex justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
              >
                חזרה לרשימה
              </Link>
            </div>
          </div>
        </header>

        <Section title="שם העמותה">
          <div className="grid gap-4 md:grid-cols-3">
            {submission.data.names.map((name, index) => (
              <InfoCard
                key={index}
                label={`עדיפות ${index + 1}`}
                value={`${name.hebrew}${name.english ? ` | ${name.english}` : ""}`}
              />
            ))}
          </div>
        </Section>

        <Section title="מייסדים">
          <div className="space-y-4">
            {submission.data.founders.map((founder, index) => (
              <div key={index} className="rounded-3xl bg-slate-50/80 p-5">
                <h3 className="mb-4 text-xl font-bold">מייסד {index + 1}</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <InfoCard label="שם מלא" value={founder.fullName} />
                  <InfoCard label="מספר זהות" value={founder.idNumber} />
                  <InfoCard label="סוג זיהוי" value={founder.identificationType} />
                  <InfoCard label="תפקיד" value={founder.role} />
                  <InfoCard label="אזרחות" value={founder.citizenship} />
                  <InfoCard
                    label="כתובת"
                    value={`${founder.address.city}, ${founder.address.street} ${founder.address.houseNumber}`}
                  />
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <ImageCard
                    title="צילום חזית תעודת זהות"
                    src={founder.idCardFront}
                    alt={`חזית תעודת זהות ${founder.fullName}`}
                  />
                  <ImageCard
                    title="צילום גב תעודת זהות"
                    src={founder.idCardBack}
                    alt={`גב תעודת זהות ${founder.fullName}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="כתובת">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl bg-slate-50/80 p-5">
              <h3 className="mb-4 text-xl font-bold">הכתובת הרשמית</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <InfoCard label="עיר" value={submission.data.registeredAddress.city} />
                <InfoCard label="רחוב" value={submission.data.registeredAddress.street} />
                <InfoCard label="בית" value={submission.data.registeredAddress.houseNumber} />
                <InfoCard
                  label="מקור הכתובת"
                  value={
                    submission.data.registeredAddress.holderType === "founderAddress"
                      ? submission.data.founders[
                          Number(submission.data.registeredAddress.founderIndex)
                        ]?.fullName || "כתובת של מייסד"
                      : submission.data.registeredAddress.holderType
                  }
                />
              </div>
            </div>
            <div className="rounded-3xl bg-slate-50/80 p-5">
              <h3 className="mb-4 text-xl font-bold">כתובת למשלוח דואר</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <InfoCard label="סוג" value={submission.data.mailingAddress.type} />
                <InfoCard label="עיר" value={submission.data.mailingAddress.city || "-"} />
                <InfoCard label="רחוב" value={submission.data.mailingAddress.street || "-"} />
                <InfoCard label="ת.ד." value={submission.data.mailingAddress.poBox || "-"} />
              </div>
            </div>
          </div>
        </Section>

        <Section title="פרטי עמותה">
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard label="תחום עיסוק עיקרי" value={submission.data.organizationDetails.primaryField} />
            <InfoCard label="תת תחום" value={submission.data.organizationDetails.secondaryField} />
            <InfoCard
              label="אגודה עות'מאנית"
              value={submission.data.organizationDetails.basedOnOttomanAssociation === "yes" ? "כן" : "לא"}
            />
            <InfoCard
              label="ניהול בית כנסת"
              value={submission.data.organizationDetails.forSynagogueManagement === "yes" ? "כן" : "לא"}
            />
            <InfoCard
              label="פעילות בתאגיד אחר"
              value={submission.data.organizationDetails.managedUnderOtherCorporation === "yes" ? "כן" : "לא"}
            />
          </div>
          <div className="mt-4 space-y-3">
            {submission.data.organizationDetails.objectives.map((objective, index) => (
              <div key={index} className="rounded-2xl bg-white p-4">
                <p className="font-bold">{index + 1}. {objective.purpose}</p>
                <p className="mt-1 text-sm text-slate-500">יישוב: {objective.settlement || "לא הוזן"}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-soft">
      <h2 className="mb-5 text-2xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-1 font-bold text-ink">{value}</p>
    </div>
  );
}

function ImageCard({ title, src, alt }: { title: string; src: string; alt: string }) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <p className="text-sm font-semibold text-slate-500">{title}</p>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={640}
          height={420}
          className="mt-3 h-56 w-full rounded-xl object-cover"
          unoptimized
        />
      ) : (
        <p className="mt-2 font-bold text-ink">לא צורפה תמונה</p>
      )}
    </div>
  );
}
