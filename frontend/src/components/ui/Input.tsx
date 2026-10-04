import { useId } from "react";
import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export function Input({
  id,
  label,
  helperText,
  error,
  required,
  disabled,
  className = "",
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="ui-field">
      {label && (
        <label className="ui-label" htmlFor={inputId}>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
      )}

      <input
        id={inputId}
        className={["ui-input", error ? "ui-input--error" : "", className].filter(Boolean).join(" ")}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={[helperId, errorId].filter(Boolean).join(" ") || undefined}
        required={required}
        {...props}
      />

      {(helperText || error) && (
        <div className={error ? "ui-field__message ui-field__message--error" : "ui-field__message"} id={error ? errorId : helperId}>
          {error ?? helperText}
        </div>
      )}
    </div>
  );
}

export default Input;
