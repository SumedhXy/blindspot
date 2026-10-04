import { useState } from "react";
import { ShieldAlert, CheckCircle2, ArrowRight, Sliders, Zap, Check } from "lucide-react";
import type {
  StressTestScenario,
  StressTestFeedbackResponse,
} from "../../types";
import { submitStressTestFeedback } from "../../services/blindspotApi";

interface StressTestSectionProps {
  scenario: StressTestScenario;
  decisionPrompt: string;
  contextReasoning: string;
  onAddChecklistItems: (items: string[]) => void;
}

export default function StressTestSection({
  scenario,
  decisionPrompt,
  contextReasoning,
  onAddChecklistItems,
}: StressTestSectionProps) {
  const [selectedChoice, setSelectedChoice] = useState<"YES" | "MAYBE" | "NO" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<StressTestFeedbackResponse | null>(null);
  const [added, setAdded] = useState(false);
  const [sliderConfidence, setSliderConfidence] = useState(40);

  const handleChoice = async (choice: "YES" | "MAYBE" | "NO") => {
    setSelectedChoice(choice);
    setIsLoading(true);
    try {
      const res = await submitStressTestFeedback({
        decision_prompt: decisionPrompt,
        context_reasoning: contextReasoning,
        tested_assumption: scenario.tested_assumption_title,
        scenario_premise: scenario.scenario_premise,
        user_choice: choice,
      });
      setFeedback(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddActions = () => {
    if (feedback?.action_items_to_add) {
      onAddChecklistItems(feedback.action_items_to_add);
      setAdded(true);
    }
  };

  const getFragilityLabel = (val: number) => {
    if (val < 30) return { label: "High Vulnerability (Fragile Foundation)", color: "var(--mastercard-red)" };
    if (val < 70) return { label: "Moderate Sensitivity (Contingent on Conditions)", color: "var(--signal-orange)" };
    return { label: "High Resilience (Assumption Well-Tested)", color: "#2E8B57" };
  };

  const fragility = getFragilityLabel(sliderConfidence);

  return (
    <div className="mc-card" style={{ padding: "2.5rem 3rem" }}>
      {/* Editorial Eyebrow & Title */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div className="mc-eyebrow" style={{ marginBottom: "8px" }}>
            <span className="mc-dot mc-dot-pulse" style={{ background: "var(--signal-orange)" }} />
            <span style={{ color: "var(--signal-orange)" }}>STAGE 4 • THE COUNTERFACTUAL STRESS-TEST</span>
          </div>
          <h2 style={{ fontSize: "2.1rem", fontWeight: 500, color: "var(--ink-black)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Testing Core Premise: "{scenario.tested_assumption_title}"
          </h2>
        </div>

        <div className="mc-badge ui-badge--warning" style={{ fontSize: "13px", padding: "6px 14px" }}>
          <Zap size={14} /> Interactive Simulation
        </div>
      </div>

      <p style={{ fontSize: "17.5px", color: "var(--slate-gray)", marginTop: "8px", lineHeight: "1.55" }}>
        BlindSpot identifies the single assumption your choice relies upon most. If this reality flips, does your decision logic survive?
      </p>

      {/* Scenario Box (Paper on Paper) */}
      <div
        style={{
          background: "var(--surface-white)",
          border: "1.5px solid var(--border-warm)",
          borderRadius: "28px",
          padding: "1.75rem 2rem",
          margin: "1.75rem 0",
          boxShadow: "var(--shadow-nav)",
        }}
      >
        <span className="mc-eyebrow" style={{ fontSize: "13px", marginBottom: "8px" }}>
          WHAT-IF COUNTERFACTUAL PREMISE
        </span>
        <p style={{ fontSize: "19.5px", color: "var(--ink-black)", fontWeight: 500, lineHeight: "1.5" }}>
          "{scenario.scenario_premise}"
        </p>
      </div>

      {/* Interactive Assumption Breakpoint Slider */}
      <div
        style={{
          background: "var(--soft-bone)",
          border: "1.5px solid var(--border-warm)",
          borderRadius: "24px",
          padding: "1.25rem 1.75rem",
          marginBottom: "1.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Sliders size={16} color="var(--signal-orange)" />
            <span style={{ fontSize: "15.5px", fontWeight: 600, color: "var(--ink-black)" }}>
              Premise Probability / Tolerance Dial
            </span>
          </div>
          <span style={{ fontSize: "14px", fontWeight: 700, color: fragility.color }}>
            {fragility.label} ({sliderConfidence}%)
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={sliderConfidence}
          onChange={(e) => setSliderConfidence(Number(e.target.value))}
          className="mc-range-slider"
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px", color: "var(--slate-gray)", fontWeight: 500 }}>
          <span>0% (Premise Fails completely)</span>
          <span>50% (50/50 Coin Flip)</span>
          <span>100% (Premise Guaranteed)</span>
        </div>
      </div>

      {/* Question & 20px Pill Choices */}
      <div>
        <h3 style={{ fontSize: "18px", color: "var(--ink-black)", marginBottom: "14px", fontWeight: 600 }}>
          {scenario.prompt_question}
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
          {/* YES */}
          <button
            type="button"
            onClick={() => handleChoice("YES")}
            disabled={isLoading}
            className={selectedChoice === "YES" ? "mc-btn-primary" : "mc-btn-secondary"}
            style={{
              padding: "14px 22px",
              fontSize: "16.5px",
              borderRadius: "20px",
              background: selectedChoice === "YES" ? "var(--clay-rust)" : undefined,
              borderColor: selectedChoice === "YES" ? "var(--clay-rust)" : undefined,
              color: selectedChoice === "YES" ? "#fff" : undefined,
            }}
          >
            YES — Changes My Choice
          </button>

          {/* MAYBE */}
          <button
            type="button"
            onClick={() => handleChoice("MAYBE")}
            disabled={isLoading}
            className={selectedChoice === "MAYBE" ? "mc-btn-primary" : "mc-btn-secondary"}
            style={{
              padding: "14px 22px",
              fontSize: "16.5px",
              borderRadius: "20px",
              background: selectedChoice === "MAYBE" ? "var(--signal-orange)" : undefined,
              borderColor: selectedChoice === "MAYBE" ? "var(--signal-orange)" : undefined,
              color: selectedChoice === "MAYBE" ? "#fff" : undefined,
            }}
          >
            MAYBE — Requires Nuance
          </button>

          {/* NO */}
          <button
            type="button"
            onClick={() => handleChoice("NO")}
            disabled={isLoading}
            className={selectedChoice === "NO" ? "mc-btn-primary" : "mc-btn-secondary"}
            style={{
              padding: "14px 22px",
              fontSize: "16.5px",
              borderRadius: "20px",
              background: selectedChoice === "NO" ? "#2E8B57" : undefined,
              borderColor: selectedChoice === "NO" ? "#2E8B57" : undefined,
              color: selectedChoice === "NO" ? "#fff" : undefined,
            }}
          >
            NO — Decision Stands
          </button>
        </div>
      </div>

      {/* Dynamic AI Interrogation Feedback */}
      {feedback && (
        <div
          style={{
            background: "var(--surface-white)",
            border: "1.5px solid var(--border-warm)",
            borderRadius: "28px",
            padding: "1.75rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "2rem",
            boxShadow: "var(--shadow-nav)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
            <span style={{ fontSize: "18.5px", fontWeight: 600, color: "var(--ink-black)", letterSpacing: "-0.01em" }}>
              {feedback.verdict_title}
            </span>
            <span className="mc-badge ui-badge--info" style={{ fontSize: "13px" }}>
              Interrogation Response
            </span>
          </div>

          <p style={{ fontSize: "17.5px", color: "var(--charcoal)", lineHeight: "1.6" }}>
            {feedback.audit_insight}
          </p>

          <div
            style={{
              background: "var(--soft-bone)",
              borderLeft: "4px solid var(--light-signal-orange)",
              padding: "14px 20px",
              borderRadius: "0 16px 16px 0",
              fontSize: "16.5px",
              color: "var(--ink-black)",
              lineHeight: "1.55",
            }}
          >
            <strong style={{ color: "var(--signal-orange)" }}>Probing Interrogation: </strong>
            "{feedback.recommended_interrogation}"
          </div>

          {feedback.action_items_to_add?.length > 0 && (
            <div style={{ marginTop: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", paddingTop: "12px", borderTop: "1.5px solid var(--border-warm)" }}>
              <span style={{ fontSize: "15px", color: "var(--slate-gray)", fontWeight: 500 }}>
                {feedback.action_items_to_add.length} high-leverage verification items identified.
              </span>
              <button
                type="button"
                onClick={handleAddActions}
                disabled={added}
                className="mc-btn-secondary"
                style={{
                  padding: "10px 22px",
                  fontSize: "15px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "20px",
                }}
              >
                {added ? <CheckCircle2 size={16} color="#2E8B57" /> : <ArrowRight size={16} />}
                {added ? "Added to Action Plan" : "Add to Action Plan"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

