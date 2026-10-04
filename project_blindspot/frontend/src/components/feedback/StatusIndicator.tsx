export type StatusType = "ready" | "processing" | "success" | "warning" | "error" | "offline";

export interface StatusIndicatorProps {
  status: StatusType;
  label: string;
}

const STATUS_LABELS: Record<StatusType, string> = {
  ready: "Ready",
  processing: "Processing",
  success: "Success",
  warning: "Warning",
  error: "Error",
  offline: "Offline",
};

export function StatusIndicator({ status, label }: StatusIndicatorProps) {
  return (
    <div className="ui-status" aria-live="polite">
      <span className={["ui-status__dot", `ui-status__dot--${status}`].filter(Boolean).join(" ")} aria-hidden="true" />
      <span>{label}</span>
      <span className="ui-status__text">{STATUS_LABELS[status]}</span>
    </div>
  );
}

export default StatusIndicator;
