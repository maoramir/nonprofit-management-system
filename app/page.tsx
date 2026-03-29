import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Timer,
  UserRoundCheck
} from "lucide-react";
import { RegistrationWizard } from "@/components/wizard/registration-wizard";

const trustPoints = [
  "איסוף מסודר של כל המידע הדרוש לפתיחת עמותה",
  "שמירה אוטומטית לאורך התהליך ללא אובדן פרטים",
  "שפה ברורה ומלווה במקום בלבול טכני"
];

const processSteps = [
  {
    title: "ממלאים פרטים בסיסיים",
    description: "מזינים שם עמותה, מייסדים, כתובת ופרטי פעילות בסדר ברור."
  },
  {
    title: "המערכת מרכזת הכול",
    description: "כל המידע נשמר במקום אחד ומוצג בצורה מסודרת לבדיקה."
  },
  {
    title: "עוברים על הסיכום",
    description: "בודקים את הנתונים, מתקנים במידת הצורך ומאשרים להמשך טיפול."
  },
  {
    title: "מתקדמים לרישום",
    description: "המידע מוכן לעבודה מסודרת מול תהליך הרישום הרשמי."
  }
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "אמינות וסדר",
    description: "כל שלב מחולק בצורה ברורה כדי להפוך את המילוי לנעים ובטוח יותר."
  },
  {
    icon: FileText,
    title: "הפחתת עומס",
    description: "במקום הודעות מפוזרות בוואטסאפ, כל הפרטים מרוכזים בטופס אחיד ונוח."
  },
  {
    icon: UserRoundCheck,
    title: "ליווי מקצועי",
    description: "האתר בנוי כמו תהליך עבודה מסודר של שירות משפטי־עסקי ולא כמו טופס גנרי."
  },
  {
    icon: LockKeyhole,
    title: "פרטיות ואבטחה",
    description: "המידע נשמר לצורך הטיפול בתהליך בלבד ומוצג בצורה מבוקרת ומסודרת."
  }
];

const testimonials = [
  {
    quote:
      "הכול היה ברור מאוד. במקום לשלוח פרטים בפיזור, מילאנו פעם אחת והרגשנו שיש סדר בתהליך.",
    name: "נועה א.",
    role: "מייסדת עמותה קהילתית"
  },
  {
    quote:
      "הטופס היה נעים, מסודר ולא מלחיץ. היה ברור מה צריך להכין ומה השלב הבא בכל רגע.",
    name: "אלעד ש.",
    role: "יוזם עמותת חינוך"
  },
  {
    quote:
      "זה הרגיש מקצועי ומאוד אמין. היה קל לעבור על הכול גם מהמחשב וגם מהנייד.",
    name: "יעל מ.",
    role: "מנהלת יוזמה חברתית"
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f4f1ea] text-ink">
      <div className="absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_top,_rgba(30,58,95,0.16),_transparent_40%),linear-gradient(180deg,_#f8f6f1_0%,_#f4f1ea_100%)]" />
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between rounded-full border border-white/80 bg-white/70 px-5 py-3 shadow-soft backdrop-blur">
          <div>
            <p className="text-sm font-bold tracking-[0.18em] text-brand-700">AMUTA PROCESS</p>
            <p className="text-xs text-slate-500">ליווי מסודר לפתיחת עמותה</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="#wizard"
              className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              התחל תהליך
            </Link>
            <Link
              href="/admin"
              className="rounded-full border border-brand-500 px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
            >
              מסך ניהול
            </Link>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="rounded-[2.5rem] border border-white/80 bg-white/75 p-7 shadow-soft backdrop-blur sm:p-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
              <Sparkles className="h-4 w-4" />
              פתיחת עמותה בצורה פשוטה ומקצועית
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight text-[#1f2a37] sm:text-5xl">
              תהליך דיגיטלי ברור, רגוע ומסודר לאיסוף כל הפרטים הראשוניים לפתיחת עמותה
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              במקום לאסוף מידע בצורה מפוזרת, הלקוח ממלא תהליך אחד מסודר, שומר על רצף,
              ומרגיש שיש לו ליווי מקצועי מהשלב הראשון ועד לסיכום המלא.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#wizard"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1e3a5f] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#17314f]"
              >
                התחל תהליך
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-base font-semibold text-slate-700 transition hover:border-slate-400"
              >
                איך זה עובד
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <InfoChip icon={Timer} title="מילוי הדרגתי" text="שלב אחר שלב" />
              <InfoChip icon={ShieldCheck} title="תהליך אמין" text="מבנה ברור ומקצועי" />
              <InfoChip icon={LockKeyhole} title="שמירה בטוחה" text="פרטים נשמרים אוטומטית" />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem] border border-[#d9e4e1] bg-[linear-gradient(160deg,_#1f3c37_0%,_#284f47_48%,_#d9c19a_140%)] p-7 text-white shadow-soft sm:p-9">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.2),_transparent_38%)]" />
            <div className="relative space-y-5">
              <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-semibold text-white/80">למה לקוחות מרגישים בטוחים יותר כאן</p>
                <ul className="mt-4 space-y-3">
                  {trustPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm leading-7 text-white/90">
                      <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-[#f1d4a4]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <StatCard value="4 שלבים" label="תהליך ברור וקצר" />
                <StatCard value="RTL מלא" label="עברית ברורה ונוחה" />
                <StatCard value="שמירה רציפה" label="גם ברענון הדף" />
                <StatCard value="סיכום מסודר" label="מוכן לעבודה" />
              </div>
            </div>
          </div>
        </section>

        <SectionShell id="how-it-works">
          <SectionHeading
            eyebrow="איך זה עובד"
            title="תהליך עבודה ברור שמפחית בלבול ומגדיל השלמת טפסים"
            description="הדף בנוי כמו שירות מלווה: המשתמש מבין בכל רגע מה הוא ממלא, למה זה חשוב, ומה הצעד הבא."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-[2rem] border border-[#dfe7e5] bg-[#fcfbf8] p-6 shadow-[0_18px_40px_rgba(16,32,51,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-soft"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-lg font-bold text-brand-700">
                  0{index + 1}
                </span>
                <h3 className="mt-5 text-xl font-bold text-ink">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{step.description}</p>
              </article>
            ))}
          </div>
        </SectionShell>

        <SectionShell>
          <SectionHeading
            eyebrow="למה לבחור בנו"
            title="חוויה דיגיטלית שמרגישה כמו שירות מקצועי ולא כמו טופס גנרי"
            description="העיצוב, המבנה וההסברים נועדו להפוך את מילוי הפרטים לחוויה רגועה, פשוטה ואמינה יותר."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-[2rem] border border-white/80 bg-white p-6 shadow-[0_14px_34px_rgba(16,32,51,0.06)]"
              >
                <benefit.icon className="h-10 w-10 rounded-2xl bg-brand-50 p-2 text-brand-700" />
                <h3 className="mt-5 text-xl font-bold text-ink">{benefit.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{benefit.description}</p>
              </article>
            ))}
          </div>
        </SectionShell>

        <section
          id="wizard"
          className="rounded-[2.5rem] border border-[#d9e4e1] bg-[linear-gradient(180deg,_rgba(255,255,255,0.92),_rgba(247,250,249,0.94))] p-4 shadow-soft sm:p-6 lg:p-8"
        >
          <div className="mb-8 grid gap-6 rounded-[2rem] border border-white/80 bg-white/70 p-6 backdrop-blur lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold tracking-[0.16em] text-brand-700">האזור המלווה</p>
              <h2 className="mt-3 text-3xl font-extrabold text-ink">
                ממלאים את הפרטים פעם אחת, בצורה ברורה ומסודרת
              </h2>
              <p className="mt-3 max-w-3xl leading-8 text-slate-600">
                הטופס מחולק לשלבים הגיוניים, כולל שמירה אוטומטית, הסברים קצרים ויכולת לחזור
                אחורה בלי לאבד מידע.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:w-[24rem]">
              <MiniBadge title="שלבים ברורים" text="שם, מייסדים, כתובת ופרטים" />
              <MiniBadge title="שמירה אוטומטית" text="הנתונים נשמרים לאורך הדרך" />
              <MiniBadge title="סיכום מסודר" text="מוכן לבדיקה והעתקה" />
            </div>
          </div>

          <RegistrationWizard />
        </section>

        <SectionShell>
          <SectionHeading
            eyebrow="לקוחות מספרים"
            title="תחושת סדר וביטחון מעלה את סיכויי ההשלמה"
            description="כשהממשק ברור והטופס מרגיש מקצועי, אנשים ממלאים יותר בנוחות ומשאירים פרטים בצורה מלאה."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="rounded-[2rem] border border-white/80 bg-white p-6 shadow-[0_14px_34px_rgba(16,32,51,0.06)]"
              >
                <p className="text-lg leading-8 text-slate-700">“{testimonial.quote}”</p>
                <div className="mt-6 border-t border-slate-200 pt-4">
                  <p className="font-bold text-ink">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </article>
            ))}
          </div>
        </SectionShell>

        <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/80 bg-white p-7 shadow-soft">
            <p className="text-sm font-semibold tracking-[0.16em] text-brand-700">פרטיות ואמון</p>
            <h2 className="mt-3 text-3xl font-extrabold text-ink">המידע נשמר לצורך התהליך בלבד</h2>
            <p className="mt-4 max-w-2xl leading-8 text-slate-600">
              המשתמש צריך להרגיש שהוא נמצא בתהליך מכובד, ברור ואחראי. לכן חשוב להציג באופן
              בולט שהמידע נשמר באופן מסודר, לא נועד לשימוש חיצוני, וניתן לחזור ולהמשיך את
              המילוי בכל שלב.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <PrivacyLine text="המידע נועד לצורך ליווי תהליך פתיחת העמותה בלבד" />
              <PrivacyLine text="הטופס שומר נתונים ומאפשר חזרה נוחה להמשך מילוי" />
              <PrivacyLine text="כל שלב מלווה בהסבר ברור ובשפה מכבדת ולא מלחיצה" />
              <PrivacyLine text="הלקוח יודע בכל רגע מה כבר מולא ומה הצעד הבא" />
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#d9c19a] bg-[linear-gradient(160deg,_#233b37_0%,_#17314f_100%)] p-7 text-white shadow-soft">
            <p className="text-sm font-semibold tracking-[0.16em] text-[#f1d4a4]">מוכנים להתחיל?</p>
            <h2 className="mt-3 text-3xl font-extrabold">בונים תהליך פתיחת עמותה מסודר יותר כבר עכשיו</h2>
            <p className="mt-4 leading-8 text-white/80">
              במקום לאסוף פרטים באופן לא עקבי, מתחילים תהליך נעים וברור שמגדיל אמון ומקל על
              העבודה בהמשך.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="#wizard"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-[#17314f] transition hover:bg-slate-100"
              >
                התחל תהליך
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link
                href="/admin"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                פתח מסך ניהול
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function SectionShell({
  children,
  id
}: {
  children: ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className="rounded-[2.5rem] border border-white/80 bg-white/72 p-5 shadow-soft backdrop-blur sm:p-7"
    >
      {children}
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-7 max-w-3xl">
      <p className="text-sm font-semibold tracking-[0.16em] text-brand-700">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">{title}</h2>
      <p className="mt-4 leading-8 text-slate-600">{description}</p>
    </div>
  );
}

function InfoChip({
  icon: Icon,
  title,
  text
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-[#fbfaf7] p-4">
      <Icon className="h-5 w-5 text-brand-700" />
      <p className="mt-3 text-sm font-bold text-ink">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{text}</p>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/8 p-4 backdrop-blur">
      <p className="text-lg font-extrabold text-white">{value}</p>
      <p className="mt-1 text-sm text-white/75">{label}</p>
    </div>
  );
}

function MiniBadge({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-[#fbfaf7] p-4">
      <p className="text-sm font-bold text-ink">{title}</p>
      <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

function PrivacyLine({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-[#fbfaf7] p-4">
      <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-brand-700" />
      <p className="text-sm leading-7 text-slate-600">{text}</p>
    </div>
  );
}
