import type { ReactNode } from "react";
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from "lucide-react";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

export function Alert({
  variant = "info",
  title,
  children,
  onClose,
  className = "",
}: AlertProps) {
  const icons = {
    info: <Info size={18} className="ui-alert__icon" />,
    success: <CheckCircle size={18} className="ui-alert__icon" />,
    warning: <AlertTriangle size={18} className="ui-alert__icon" />,
    danger: <AlertCircle size={18} className="ui-alert__icon" />,
  };

  return (
    <div
      role="alert"
      className={`ui-alert ui-alert--${variant} ${className}`.trim()}
    >
      <div className="ui-alert__icon-wrap">{icons[variant]}</div>
      <div className="ui-alert__content">
        {title && <h4 className="ui-alert__title">{title}</h4>}
        <div className="ui-alert__message">{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          aria-label="Dismiss alert"
          className="ui-alert__close"
          onClick={onClose}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default Alert;
