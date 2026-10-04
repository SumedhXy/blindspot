import type { ReactNode } from "react";

interface MainContentProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function MainContent({ children, className = "", id = "main-content" }: MainContentProps) {
  return (
    <main id={id} className={`main ${className}`.trim()} tabIndex={-1}>
      {children}
    </main>
  );
}
