import { useState } from "react";
import { ChevronDown, ChevronUp, Shield, Flame, FileCheck, Sparkles } from "lucide-react";
import type { AgentExecutionTrace } from "../../types";

interface AgentTerminalTraceProps {
  trace: AgentExecutionTrace;
  groundingActive: boolean;
}

export default function AgentTerminalTrace({ trace, groundingActive }: AgentTerminalTraceProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeStepIdx, setActiveStepIdx] = useState<number | null>(null);

  if (!trace || !trace.steps?.length) return null;

  const getAgentMeta = (agentId: string) => {
    if (agentId.includes("dissector") || agentId.includes("1")) {
      return {
        icon: Sparkles,
        color: "var(--link-blue, #1E40AF)",
        badgeBg: "rgba(30, 64, 175, 0.1)",
        tag: "Agent 1 • The Dissector (Analytical / Grounded)",
        emoji: "🔍",
        roleDesc: "Extracts claims, hidden inferences, and baseline structural assumptions.",
        outputLabel: "Passes Structured Claims JSON",
      };
    }
    if (agentId.includes("antagonist") || agentId.includes("cynic") || agentId.includes("2")) {
      return {
        icon: Flame,
        color: "var(--mastercard-red, #EB001B)",
        badgeBg: "rgba(235, 0, 27, 0.1)",
        tag: "Agent 2 • The Antagonist (Critical Adversary)",
        emoji: "⚔️",
        roleDesc: "Actively challenges every claim, finds tensions, and maps missing variables.",
        outputLabel: "Passes Debated Claims + Risks",
      };
    }
    return {
      icon: Shield,
      color: "var(--signal-orange, #CF4500)",
      badgeBg: "rgba(207, 69, 0, 0.1)",
      tag: "Agent 3 • The Risk Auditor (Executive / Objective)",
      emoji: "📊",
      roleDesc: "Evaluates data volatility, scores impact, and builds the dynamic Stress-Test.",
      outputLabel: "Produces 6-Lens Reasoning Audit + Interactive Stress-Test",
    };
  };

  return (
    <div
      style={{
        border: "1.5px solid var(--border-warm)",
        borderRadius: "28px",
        overflow: "hidden",
        background: "var(--surface-white)",
        boxShadow: "var(--shadow-nav)",
      }}
    >
      {/* Titlebar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: "16px 26px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          background: "var(--lifted-cream)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <span className="mc-dot mc-dot-pulse" style={{ background: "var(--signal-orange)" }} />
          <span style={{ fontSize: "16px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "var(--ink-black)" }}>
            STAGE 2 • MULTI-AGENT KERNEL TRACE
          </span>
          <span style={{ fontSize: "14px", color: "var(--slate-gray)" }}>
            ({trace.steps.length} debate turns)
          </span>
          {groundingActive && (
            <span
              className="mc-badge ui-badge--success"
              style={{ fontSize: "12.5px", padding: "3px 10px" }}
            >
              <FileCheck size={13} /> Grounded with Verified Clauses
            </span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--ink-black)", fontSize: "14.5px", fontWeight: 500 }}>
          <span>{isOpen ? "Collapse Debate Log" : "Expand Multi-Agent Debate"}</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {/* Body with Visual Persona Cards */}
      {isOpen && (
        <div
          style={{
            padding: "20px 24px",
            borderTop: "1.5px solid var(--border-warm)",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            background: "var(--soft-bone)",
          }}
        >
          {/* 3-Agent Sequential Pipeline Flow Header */}
          <div
            style={{
              background: "var(--surface-white)",
              border: "1.5px solid var(--border-warm)",
              borderRadius: "18px",
              padding: "16px 20px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "14px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 700, color: "var(--link-blue, #1E40AF)" }}>
                <span>🔍</span> AGENT 1: THE DISSECTOR
              </div>
              <div style={{ fontSize: "13.5px", color: "var(--charcoal)" }}>
                Extracts claims, hidden inferences, and baseline structural assumptions.
              </div>
              <div style={{ fontSize: "12px", color: "var(--slate-gray)", fontFamily: "'JetBrains Mono', monospace" }}>
                ↳ Passes Structured Claims JSON
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 700, color: "var(--mastercard-red, #EB001B)" }}>
                <span>⚔️</span> AGENT 2: THE ANTAGONIST
              </div>
              <div style={{ fontSize: "13.5px", color: "var(--charcoal)" }}>
                Actively challenges every claim, finds tensions, and maps missing variables.
              </div>
              <div style={{ fontSize: "12px", color: "var(--slate-gray)", fontFamily: "'JetBrains Mono', monospace" }}>
                ↳ Passes Debated Claims + Risks
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 700, color: "var(--signal-orange, #CF4500)" }}>
                <span>📊</span> AGENT 3: THE RISK AUDITOR
              </div>
              <div style={{ fontSize: "13.5px", color: "var(--charcoal)" }}>
                Evaluates data volatility, scores impact, and builds the dynamic Stress-Test.
              </div>
              <div style={{ fontSize: "12px", color: "var(--slate-gray)", fontFamily: "'JetBrains Mono', monospace" }}>
                ↳ Final 6-Lens Audit & Simulation
              </div>
            </div>
          </div>

          {trace.steps.map((step, idx) => {
            const meta = getAgentMeta(step.agent_id);
            const isSelected = activeStepIdx === idx;

            return (
              <div
                key={idx}
                onClick={() => setActiveStepIdx(isSelected ? null : idx)}
                style={{
                  background: "var(--surface-white)",
                  border: isSelected ? `2px solid ${meta.color}` : "1.5px solid var(--border-warm)",
                  borderRadius: "20px",
                  padding: "16px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: meta.badgeBg,
                        color: meta.color,
                        display: "grid",
                        placeItems: "center",
                        fontSize: "16px",
                      }}
                    >
                      {meta.emoji}
                    </div>
                    <span style={{ color: "var(--ink-black)", fontWeight: 700, fontSize: "16px" }}>
                      {step.agent_name}
                    </span>
                    <span style={{ fontSize: "13px", color: "var(--slate-gray)" }}>
                      ({meta.tag})
                    </span>
                  </div>
                  <span style={{ color: "var(--slate-gray)", fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" }}>
                    +{step.timestamp_offset_ms}ms
                  </span>
                </div>

                <p style={{ color: "var(--charcoal)", lineHeight: "1.55", margin: "2px 0 0", fontSize: "16px" }}>
                  "{step.thought_summary}"
                </p>

                <div
                  style={{
                    background: "var(--soft-bone)",
                    borderRadius: "12px",
                    padding: "8px 14px",
                    fontSize: "15px",
                    color: "var(--ink-black)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <strong style={{ color: meta.color }}>Audited Key Finding:</strong>
                  <span>{step.extracted_finding}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
