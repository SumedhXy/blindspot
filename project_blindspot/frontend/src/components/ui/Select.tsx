import { useId } from "react";
import type { SelectHTMLAttributes } from "react";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
}

export function Select({
  id,
  label,
  options,
  placeholder,
  error,
  required,
  disabled,
  className = "",
  value,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const describedBy = error ? `${selectId}-error` : undefined;

  return (
    <div className="ui-field">
      {label && (
        <label className="ui-label" htmlFor={selectId}>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
      )}

      <select
        id={selectId}
        className={["ui-select", error ? "ui-select--error" : "", className].filter(Boolean).join(" ")}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        required={required}
        value={value}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <div className="ui-field__message ui-field__message--error" id={describedBy}>
          {error}
        </div>
      )}
    </div>
  );
}

export default Select;
