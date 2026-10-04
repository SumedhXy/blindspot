import type { ReactNode } from "react";
import AppShell from "../components/layout/AppShell";
import Header from "../components/layout/Header";
import Sidebar, { type ViewId } from "../components/layout/Sidebar";

interface Props {
  active: ViewId;
  onNavigate: (id: ViewId) => void;
  children: ReactNode;
}

/** Forms, guided steps, reports: Header, then a single centered workflow area. */
export default function WorkflowLayout({ active, onNavigate, children }: Props) {
  return (
    <AppShell>
      <Header />
      <div className="body-grid">
        <Sidebar active={active} onNavigate={onNavigate} />
        <main className="main">
          <section className="panel workflow">{children}</section>
        </main>
      </div>
    </AppShell>
  );
}
