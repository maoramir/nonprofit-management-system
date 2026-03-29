import Link from "next/link";
import { StatusBadge } from "@/components/admin/status-badge";
import { listSubmissions } from "@/lib/server/submissions-repository";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const submissions = await listSubmissions();

  return (
    <main className="min-h-screen bg-sand px-4 py-8 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-soft">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-brand-700">מסך ניהול</p>
              <h1 className="mt-2 text-3xl font-extrabold">פניות רישום עמותה</h1>
              <p className="mt-3 max-w-3xl text-slate-600">
                כאן אפשר לראות את כל הטפסים שנשלחו, לעבור על המידע המלא, ולעדכן סטטוס פנימי
                לפני העברה ידנית לרשם העמותות.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
            >
              חזרה לטופס
            </Link>
          </div>
        </header>

        <section className="rounded-[2rem] border border-white/70 bg-white/90 p-4 shadow-soft sm:p-6">
          {submissions.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
              עדיין לא נשלחו פניות. לאחר שליחה ממסך הסיכום הן יופיעו כאן.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-right text-sm font-semibold text-slate-500">
                    <th className="px-4 py-2">שם/כותרת</th>
                    <th className="px-4 py-2">שם עמותה</th>
                    <th className="px-4 py-2">מייסדים</th>
                    <th className="px-4 py-2">סטטוס</th>
                    <th className="px-4 py-2">נוצר</th>
                    <th className="px-4 py-2">פעולה</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission) => (
                    <tr key={submission.id} className="rounded-3xl bg-slate-50/80">
                      <td className="rounded-s-3xl px-4 py-4 font-bold">{submission.clientLabel}</td>
                      <td className="px-4 py-4">{submission.data.names[0]?.hebrew}</td>
                      <td className="px-4 py-4">{submission.data.founders.length}</td>
                      <td className="px-4 py-4">
                        <StatusBadge status={submission.status} />
                      </td>
                      <td className="px-4 py-4">
                        {new Date(submission.createdAt).toLocaleString("he-IL")}
                      </td>
                      <td className="rounded-e-3xl px-4 py-4">
                        <Link
                          href={`/admin/${submission.id}`}
                          className="inline-flex rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                          פתח פנייה
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
