import type { ReactNode } from "react";
import AppShell from "../components/layout/AppShell";
import Header from "../components/layout/Header";
import Sidebar, { type ViewId } from "../components/layout/Sidebar";

interface Props {
  active: ViewId;
  onNavigate: (id: ViewId) => void;
  children: ReactNode;
}

/** Analytics, monitoring, admin: Header, then Sidebar + Main. */
export default function DashboardLayout({ active, onNavigate, children }: Props) {
  return (
    <AppShell>
      <Header />
      <div className="body-grid">
        <Sidebar active={active} onNavigate={onNavigate} />
        <main className="main">{children}</main>
      </div>
    </AppShell>
  );
}
