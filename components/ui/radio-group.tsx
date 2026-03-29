type RadioOption = {
  value: string;
  label: string;
};

type RadioGroupProps = {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly RadioOption[];
};

export function RadioGroup({ name, value, onChange, options }: RadioGroupProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <label
            key={option.value}
            className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition ${
              isSelected
                ? "border-brand-500 bg-brand-50"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <input
              type="radio"
              name={name}
              className="h-4 w-4 accent-[#277365]"
              checked={isSelected}
              onChange={() => onChange(option.value)}
            />
            <span className="font-medium">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}
