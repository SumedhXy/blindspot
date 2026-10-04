import { LayoutDashboard, Layers3, BrainCircuit, BookOpen, type LucideIcon } from "lucide-react";

export type ViewId = "overview" | "workspace" | "showcase";

export const NAV_ITEMS: { id: ViewId; label: string; icon: LucideIcon }[] = [
  { id: "workspace", label: "Decision Audit", icon: BrainCircuit },
  { id: "overview", label: "Solution Brief", icon: BookOpen },
  { id: "showcase", label: "Component Kit", icon: Layers3 },
];

interface SidebarProps {
  active: ViewId;
  onNavigate: (id: ViewId) => void;
}

export default function Sidebar({ active, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar">
      <nav aria-label="Main">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={id === active ? "nav-item on" : "nav-item"}
            aria-current={id === active ? "page" : undefined}
            onClick={() => onNavigate(id)}
          >
            <Icon size={18} aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
