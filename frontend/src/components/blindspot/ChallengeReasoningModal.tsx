import { useState, useEffect } from "react";
import { Swords, ThumbsUp, ThumbsDown, Loader2, X, AlertTriangle, ShieldCheck } from "lucide-react";
import type { ChallengeReasoningResponse } from "../../../../project_blindspot/types";
import { challengeReasoning } from "../../services/blindspotApi";

interface ChallengeReasoningModalProps {
  isOpen: boolean;
  onClose: () => void;
  decisionPrompt: string;
  contextReasoning: string;
  priorities: string[];
  document_context?: string;
}

export default function ChallengeReasoningModal({
  isOpen,
  onClose,
  decisionPrompt,
  contextReasoning,
  priorities,
  document_context,
}: ChallengeReasoningModalProps) {
  const [data, setData] = useState<ChallengeReasoningResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && !data) {
      setLoading(true);
      setError(null);
      challengeReasoning({
        decision_prompt: decisionPrompt,
        context_reasoning: contextReasoning,
        priorities,
        document_context,
      })
        .then((res) => setData(res))
        .catch((err) => setError(err.message || "Failed to generate challenge"))
        .finally(() => setLoading(false));
    }
  }, [isOpen, data, decisionPrompt, contextReasoning, priorities, document_context]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(20, 20, 19, 0.65)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div
        style={{
          background: "var(--surface-white)",
          border: "1.5px solid var(--border-warm)",
          borderRadius: "36px",
          width: "100%",
          maxWidth: "760px",
          maxHeight: "88vh",
          overflowY: "auto",
          padding: "2.5rem 3rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          boxShadow: "var(--shadow-halo)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div className="mc-eyebrow" style={{ marginBottom: "6px" }}>
              <span className="mc-dot mc-dot-pulse" style={{ background: "var(--clay-rust)" }} />
              <span>ADVERSARIAL CONSTRUCTIVE CHALLENGE</span>
            </div>
            <h2 style={{ fontSize: "1.85rem", fontWeight: 500, color: "var(--ink-black)", letterSpacing: "-0.02em" }}>
              Steel-Manned Adversarial Case
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "var(--soft-bone)",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              border: "1px solid var(--border-warm)",
            }}
          >
            <X size={20} color="var(--ink-black)" />
          </button>
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: "3.5rem 0", color: "var(--slate-gray)" }}>
            <Loader2 size={36} className="spin" style={{ margin: "0 auto 1rem", color: "var(--signal-orange)" }} />
            <p style={{ fontSize: "17.5px", fontWeight: 500, color: "var(--ink-black)" }}>
              The Cynic agent is constructing an adversarial counter-case...
            </p>
          </div>
        )}

        {error && (
          <div style={{ padding: "14px 18px", background: "rgba(235, 0, 27, 0.08)", border: "1.5px solid var(--mastercard-red)", borderRadius: "18px", color: "var(--mastercard-red)", fontSize: "15px" }}>
            {error}
          </div>
        )}

        {data && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Dual Column Arguments */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px" }}>
              <div style={{ background: "rgba(46, 139, 87, 0.08)", border: "1.5px solid rgba(46, 139, 87, 0.25)", borderRadius: "24px", padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <ShieldCheck size={16} color="#1e633d" />
                  <span style={{ fontSize: "12.5px", color: "#1e633d", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    STRONGEST SUPPORTING ARGUMENT
                  </span>
                </div>
                <p style={{ fontSize: "16px", color: "var(--ink-black)", lineHeight: "1.55" }}>
                  {data.strongest_argument}
                </p>
              </div>

              <div style={{ background: "rgba(207, 69, 0, 0.08)", border: "1.5px solid rgba(207, 69, 0, 0.25)", borderRadius: "24px", padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <AlertTriangle size={16} color="var(--clay-rust)" />
                  <span style={{ fontSize: "12.5px", color: "var(--clay-rust)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    CORE VULNERABILITY
                  </span>
                </div>
                <p style={{ fontSize: "16px", color: "var(--ink-black)", lineHeight: "1.55" }}>
                  {data.strongest_assumption}
                </p>
              </div>
            </div>

            {/* Counter Perspective */}
            <div style={{ background: "var(--soft-bone)", border: "1.5px solid var(--border-warm)", borderRadius: "24px", padding: "18px 22px" }}>
              <span className="mc-eyebrow" style={{ fontSize: "12.5px", marginBottom: "6px" }}>
                CONSTRUCTIVE COUNTER-PERSPECTIVE
              </span>
              <p style={{ fontSize: "16.5px", color: "var(--ink-black)", marginTop: "4px", lineHeight: "1.55" }}>
                {data.counter_perspective}
              </p>
            </div>

            {/* Evidence that Strengthens vs Weakens */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "14px" }}>
              <div style={{ background: "var(--surface-white)", border: "1.5px solid var(--border-warm)", borderRadius: "22px", padding: "16px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <ThumbsUp size={16} color="#2E8B57" />
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#1e633d" }}>Evidence That Strengthens</span>
                </div>
                <ul style={{ margin: "0 0 0 1.25rem", padding: 0, fontSize: "15px", color: "var(--charcoal)", lineHeight: "1.5" }}>
                  {data.evidence_that_strengthens.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div style={{ background: "var(--surface-white)", border: "1.5px solid var(--border-warm)", borderRadius: "22px", padding: "16px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <ThumbsDown size={16} color="var(--mastercard-red)" />
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--clay-rust)" }}>Evidence That Weakens</span>
                </div>
                <ul style={{ margin: "0 0 0 1.25rem", padding: 0, fontSize: "15px", color: "var(--charcoal)", lineHeight: "1.5" }}>
                  {data.evidence_that_weakens.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Critical Decisive Question */}
            <div
              style={{
                background: "rgba(207, 69, 0, 0.08)",
                borderLeft: "4px solid var(--signal-orange)",
                borderRadius: "0 18px 18px 0",
                padding: "16px 20px",
                fontSize: "16px",
                color: "var(--ink-black)",
                lineHeight: "1.5",
              }}
            >
              <strong style={{ color: "var(--signal-orange)" }}>Decisive Inquiry: </strong>
              "{data.critical_investigation_question}"
            </div>

            <button
              onClick={onClose}
              className="mc-btn-primary"
              style={{ padding: "14px 28px", fontSize: "16.5px", borderRadius: "22px", marginTop: "0.5rem" }}
            >
              Done Reviewing Challenge
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

