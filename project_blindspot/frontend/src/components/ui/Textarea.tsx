import { useId } from "react";
import type { TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export function Textarea({
  id,
  label,
  helperText,
  error,
  required,
  disabled,
  maxLength,
  value,
  className = "",
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const currentValue = typeof value === "string" ? value.length : 0;

  return (
    <div className="ui-field">
      {label && (
        <label className="ui-label" htmlFor={inputId}>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
      )}

      <textarea
        id={inputId}
        className={["ui-textarea", error ? "ui-textarea--error" : "", className].filter(Boolean).join(" ")}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={[helperId, errorId].filter(Boolean).join(" ") || undefined}
        required={required}
        maxLength={maxLength}
        value={value}
        {...props}
      />

      <div className="ui-field__meta">
        {(helperText || error) && (
          <div className={error ? "ui-field__message ui-field__message--error" : "ui-field__message"} id={error ? errorId : helperId}>
            {error ?? helperText}
          </div>
        )}
        {typeof maxLength === "number" && (
          <span className="ui-character-count" aria-live="polite">
            {currentValue}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}

export default Textarea;
