import type { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  footer?: ReactNode;
  clickable?: boolean;
}

function CardRoot({ title, description, footer, clickable = false, children, className = "", ...props }: CardProps) {
  return (
    <div
      className={["ui-card", clickable ? "ui-card--clickable" : "", className].filter(Boolean).join(" ")}
      {...props}
    >
      {(title || description) && (
        <div className="ui-card__header">
          {title && <h3 className="ui-card__title">{title}</h3>}
          {description && <p className="ui-card__description">{description}</p>}
        </div>
      )}

      {children && <div className="ui-card__body">{children}</div>}
      {footer && <div className="ui-card__footer">{footer}</div>}
    </div>
  );
}

function CardHeader({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={["ui-card__header", className].filter(Boolean).join(" ")}>{children}</div>;
}

function CardBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={["ui-card__body", className].filter(Boolean).join(" ")}>{children}</div>;
}

function CardFooter({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={["ui-card__footer", className].filter(Boolean).join(" ")}>{children}</div>;
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

export default Card;
