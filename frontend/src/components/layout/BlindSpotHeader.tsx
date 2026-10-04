import { Sparkles, ArrowRight, RotateCcw } from "lucide-react";

interface BlindSpotHeaderProps {
  currentStage: "input" | "audit";
  onReset: () => void;
  onLoadSample: () => void;
  isAuditing: boolean;
}

export default function BlindSpotHeader({
  currentStage,
  onReset,
  onLoadSample,
}: BlindSpotHeaderProps) {
  return (
    <nav className="mc-floating-nav" aria-label="Main Navigation">
      {/* Brand Identity with Mastercard-style Overlapping Circles */}
      <div
        style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}
        onClick={onReset}
      >
        <div className="mc-brand-circles" aria-hidden="true">
          <div className="mc-circle-red" />
          <div className="mc-circle-yellow" />
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
          <span style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--ink-black)", letterSpacing: "-0.02em" }}>
            BlindSpot
          </span>
          <span style={{ fontSize: "0.8rem", color: "var(--slate-gray)", fontWeight: 450 }}>
            Audit Magazine
          </span>
        </div>
      </div>

      {/* Stage Navigation with Eyebrow Accent Dots */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: currentStage === "input" ? "var(--ink-black)" : "var(--slate-gray)",
          }}
        >
          <span className="mc-dot" style={{ opacity: currentStage === "input" ? 1 : 0.4 }} />
          <span>Framing & Grounding</span>
        </div>

        <span style={{ color: "var(--dust-taupe)", fontSize: "14px" }}>—</span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: currentStage === "audit" ? "var(--ink-black)" : "var(--slate-gray)",
          }}
        >
          <span className="mc-dot" style={{ opacity: currentStage === "audit" ? 1 : 0.4 }} />
          <span>Multi-Agent Stress Test</span>
        </div>
      </div>

      {/* Primary Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {currentStage === "input" ? (
          <button
            type="button"
            onClick={onLoadSample}
            className="mc-btn-secondary"
            style={{ padding: "6px 18px", fontSize: "13.5px" }}
          >
            Sample Dilemma
          </button>
        ) : (
          <button
            type="button"
            onClick={onReset}
            className="mc-btn-secondary"
            style={{ padding: "6px 18px", fontSize: "13.5px", display: "flex", alignItems: "center", gap: "5px" }}
          >
            <RotateCcw size={13} /> New Audit
          </button>
        )}

        <span
          className="mc-badge"
          style={{
            background: "rgba(207, 69, 0, 0.08)",
            color: "var(--signal-orange)",
            border: "1px solid rgba(207, 69, 0, 0.2)",
            fontSize: "11px",
            fontWeight: 700,
            padding: "4px 10px",
          }}
        >
          • KERNEL ACTIVE
        </span>
      </div>
    </nav>
  );
}
