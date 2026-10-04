import type { ReactNode } from "react";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="ui-feedback-panel ui-feedback-panel--empty">
      {icon && <div className="ui-feedback-panel__icon">{icon}</div>}
      <h3>{title}</h3>
      <p>{description}</p>
      {action && <div className="ui-feedback-panel__action">{action}</div>}
    </div>
  );
}

export default EmptyState;
