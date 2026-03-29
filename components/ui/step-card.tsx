import { ReactNode } from "react";

type StepCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function StepCard({ title, description, children }: StepCardProps) {
  return (
    <section className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-soft backdrop-blur sm:p-8">
      <div className="mb-8 rounded-3xl border border-brand-100 bg-brand-50/80 p-5">
        <h2 className="mb-2 text-2xl font-bold text-ink">{title}</h2>
        <p className="max-w-3xl text-sm leading-7 text-slate-600">{description}</p>
      </div>
      {children}
    </section>
  );
}
