import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "../ui/Button";

export interface ErrorStateProps {
  title: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ title, message, onRetry }: ErrorStateProps) {
  return (
    <div className="ui-feedback-panel ui-feedback-panel--error" role="alert">
      <AlertCircle size={20} aria-hidden="true" />
      <div>
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry} leftIcon={<RotateCcw size={14} aria-hidden="true" />}>
          Retry
        </Button>
      )}
    </div>
  );
}

export default ErrorState;
