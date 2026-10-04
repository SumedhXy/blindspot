import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type PremiumTextProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  variant?: "display" | "heading" | "eyebrow" | "muted";
} & ComponentPropsWithoutRef<T>;

export function PremiumText<T extends ElementType = "span">({
  as,
  children,
  className,
  variant = "display",
  ...props
}: PremiumTextProps<T>) {
  const Component = as || "span";

  return (
    <Component
      className={["premium-text", `premium-text--${variant}`, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </Component>
  );
}
