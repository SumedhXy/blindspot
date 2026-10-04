export interface LoadingStateProps {
  message: string;
  compact?: boolean;
}

export function LoadingState({ message, compact = false }: LoadingStateProps) {
  return (
    <div className={compact ? "ui-feedback ui-feedback--compact" : "ui-feedback"} role="status" aria-live="polite">
      <span className="ui-feedback__spinner" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}

export default LoadingState;
