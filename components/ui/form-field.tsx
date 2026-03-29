import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes
} from "react";

type FormFieldProps = {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  info?: string;
  children: ReactNode;
};

export function FormField({
  label,
  required,
  error,
  hint,
  info,
  children
}: FormFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="flex items-center gap-2 text-sm font-semibold text-ink">
        {label}
        {required ? <span className="text-danger">*</span> : null}
        {info ? (
          <span className="group relative inline-flex">
            <Info className="h-4 w-4 text-brand-500" aria-hidden="true" />
            <span className="pointer-events-none absolute start-0 top-6 z-10 hidden w-56 rounded-2xl bg-ink px-3 py-2 text-xs font-normal text-white shadow-soft group-hover:block group-focus-within:block">
              {info}
            </span>
          </span>
        ) : null}
      </span>
      {children}
      {hint && !error ? <p className="text-xs text-slate-500">{hint}</p> : null}
      {error ? <p className="text-sm text-danger">{error}</p> : null}
    </label>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100",
        className
      )}
      {...props}
    />
  );
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100",
        className
      )}
      {...props}
    />
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function SelectField({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
