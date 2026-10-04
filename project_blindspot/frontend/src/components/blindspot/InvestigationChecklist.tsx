import { useState } from "react";
import { CheckSquare, Square, Plus, Copy, Check, CheckCircle2, ListChecks } from "lucide-react";

interface InvestigationChecklistProps {
  items: string[];
  decisionSummary: string;
}

export default function InvestigationChecklist({
  items: initialItems,
  decisionSummary,
}: InvestigationChecklistProps) {
  const [items, setItems] = useState<Array<{ id: number; text: string; done: boolean }>>(
    initialItems.map((text, idx) => ({ id: idx, text, done: false }))
  );
  const [newText, setNewText] = useState("");
  const [copied, setCopied] = useState(false);

  const toggleItem = (id: number) => {
    setItems(items.map((it) => (it.id === id ? { ...it, done: !it.done } : it)));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    setItems([...items, { id: Date.now(), text: newText.trim(), done: false }]);
    setNewText("");
  };

  const copyMarkdown = () => {
    const md = [
      `# BlindSpot Decision Audit — Investigation Plan`,
      `**Decision**: ${decisionSummary}`,
      ``,
      `## Investigation Checklist`,
      ...items.map((it) => `- [${it.done ? "x" : " "}] ${it.text}`),
    ].join("\n");

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const completedCount = items.filter((i) => i.done).length;
  const progressPercent = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  return (
    <div className="mc-card" style={{ padding: "2.5rem 3rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1.25rem" }}>
        <div>
          <div className="mc-eyebrow" style={{ marginBottom: "8px" }}>
            <span className="mc-dot" style={{ background: "#2E8B57" }} />
            <span style={{ color: "#1e633d" }}>STAGE 5 • ACTIONABLE INVESTIGATION PLAN</span>
          </div>
          <h2 style={{ fontSize: "2.1rem", fontWeight: 500, color: "var(--ink-black)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Verify Before You Decide
          </h2>
        </div>

        <button
          type="button"
          onClick={copyMarkdown}
          className="mc-btn-secondary"
          style={{ padding: "10px 22px", fontSize: "15px" }}
        >
          {copied ? <Check size={16} color="#2E8B57" /> : <Copy size={16} />}
          {copied ? "Plan Copied to Clipboard" : "Export Markdown Action Plan"}
        </button>
      </div>

      <p style={{ fontSize: "17.5px", color: "var(--slate-gray)", marginTop: "8px", lineHeight: "1.55" }}>
        BlindSpot does not make your decision for you. Use these targeted investigation questions to gather empirical evidence and resolve critical uncertainties.
      </p>

      {/* Progress Bar */}
      <div style={{ margin: "1.5rem 0 1rem", display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{ flex: 1, height: "8px", background: "rgba(0,0,0,0.08)", borderRadius: "999px", overflow: "hidden" }}>
          <div
            style={{
              width: `${progressPercent}%`,
              height: "100%",
              background: progressPercent === 100 ? "#2E8B57" : "var(--signal-orange)",
              borderRadius: "999px",
              transition: "width 0.25s ease",
            }}
          />
        </div>
        <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--ink-black)", whiteSpace: "nowrap" }}>
          {completedCount} of {items.length} verified ({progressPercent}%)
        </span>
      </div>

      {/* Checklist List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "1rem 0 1.5rem" }}>
        {items.map((it) => (
          <div
            key={it.id}
            onClick={() => toggleItem(it.id)}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "14px",
              padding: "16px 20px",
              background: it.done ? "var(--soft-bone)" : "var(--surface-white)",
              border: it.done ? "1.5px solid var(--border-warm)" : "1.5px solid var(--border-warm)",
              borderRadius: "20px",
              cursor: "pointer",
              transition: "all 0.15s ease",
              boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ marginTop: "2px", color: it.done ? "#2E8B57" : "var(--slate-gray)" }}>
              {it.done ? <CheckSquare size={20} /> : <Square size={20} />}
            </div>
            <span
              style={{
                fontSize: "17px",
                color: it.done ? "var(--slate-gray)" : "var(--ink-black)",
                textDecoration: it.done ? "line-through" : "none",
                lineHeight: "1.5",
                fontWeight: it.done ? 400 : 500,
              }}
            >
              {it.text}
            </span>
          </div>
        ))}
      </div>

      {/* Add Custom Item */}
      <form onSubmit={handleAddItem} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <input
          type="text"
          className="ui-input"
          placeholder="Add custom question or verification task..."
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          style={{ flex: 1, borderRadius: "20px", padding: "14px 20px", fontSize: "16.5px" }}
        />
        <button
          type="submit"
          disabled={!newText.trim()}
          className="mc-btn-primary"
          style={{ padding: "14px 28px", fontSize: "16px", borderRadius: "20px" }}
        >
          <Plus size={16} /> Add Task
        </button>
      </form>
    </div>
  );
}

