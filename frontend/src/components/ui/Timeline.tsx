import type { ReactNode } from "react";
import { Check, Clock, AlertCircle } from "lucide-react";

export type TimelineItemStatus = "completed" | "current" | "pending" | "failed";

export interface TimelineItem {
  id: string | number;
  title: string;
  description?: ReactNode;
  timestamp?: string;
  status?: TimelineItemStatus;
  icon?: ReactNode;
  badge?: ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className = "" }: TimelineProps) {
  const getStatusIcon = (status: TimelineItemStatus = "pending") => {
    switch (status) {
      case "completed":
        return <Check size={14} />;
      case "current":
        return <Clock size={14} className="ui-timeline__spin" />;
      case "failed":
        return <AlertCircle size={14} />;
      default:
        return <div className="ui-timeline__dot" />;
    }
  };

  return (
    <ol className={`ui-timeline ${className}`.trim()} aria-label="Process timeline">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const status = item.status || "pending";

        return (
          <li
            key={item.id}
            className={`ui-timeline__item ui-timeline__item--${status}`}
          >
            <div className="ui-timeline__marker-container">
              <div
                className={`ui-timeline__marker ui-timeline__marker--${status}`}
                aria-hidden="true"
              >
                {item.icon || getStatusIcon(status)}
              </div>
              {!isLast && <div className="ui-timeline__line" aria-hidden="true" />}
            </div>

            <div className="ui-timeline__content">
              <div className="ui-timeline__header">
                <span className="ui-timeline__title">{item.title}</span>
                {item.badge}
                {item.timestamp && (
                  <time className="ui-timeline__timestamp">{item.timestamp}</time>
                )}
              </div>
              {item.description && (
                <div className="ui-timeline__description">{item.description}</div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default Timeline;
