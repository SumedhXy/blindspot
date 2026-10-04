import type { ReactNode } from "react";
import AppShell from "../components/layout/AppShell";
import Header from "../components/layout/Header";
import Sidebar, { type ViewId } from "../components/layout/Sidebar";

interface Props {
  active: ViewId;
  onNavigate: (id: ViewId) => void;
  input?: ReactNode;
  result?: ReactNode;
}

/** AI assistants, document analysis, chat: Header, then input area + result area. */
export default function WorkspaceLayout({ active, onNavigate, input, result }: Props) {
  return (
    <AppShell>
      <Header />
      <div className="body-grid">
        <Sidebar active={active} onNavigate={onNavigate} />
        <main className="main workspace">
          <section className="panel" aria-label="Input">{input}</section>
          <section className="panel" aria-label="Result">{result}</section>
        </main>
      </div>
    </AppShell>
  );
}
