import type { HTMLAttributes } from "react";

export type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ variant = "default", className = "", children, ...props }: BadgeProps) {
  return (
    <span className={["ui-badge", `ui-badge--${variant}`, className].filter(Boolean).join(" ")} {...props}>
      {children}
    </span>
  );
}

export default Badge;
