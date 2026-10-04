import { useState, useRef } from "react";
import { AlertTriangle, ArrowRight, Shield, Sparkles } from "lucide-react";
import type {
  BlindSpotAnalyzeRequest,
  BlindSpotAnalysisResponse,
} from "../../../project_blindspot/types";
import {
  analyzeDecision,
  fetchSampleDecision,
} from "../services/blindspotApi";
import BlindSpotHeader from "../components/layout/BlindSpotHeader";
import DecisionInputForm from "../components/blindspot/DecisionInputForm";
import AgentTerminalTrace from "../components/blindspot/AgentTerminalTrace";
import ReasoningMap from "../components/blindspot/ReasoningMap";
import StressTestSection from "../components/blindspot/StressTestSection";
import ChallengeReasoningModal from "../components/blindspot/ChallengeReasoningModal";
import InvestigationChecklist from "../components/blindspot/InvestigationChecklist";

export default function BlindSpotApp() {
  const [requestData, setRequestData] = useState<BlindSpotAnalyzeRequest>({
    decision_prompt: "Should I accept this 6-month software engineering internship?",
    context_reasoning: "The company is well known. The stipend is ₹25,000 per month. It is 15 km from my home. I believe it will give me valuable industry experience.",
    priorities: ["Career growth", "Learning", "Education", "Money", "Convenience"],
    document_context:
      "OFFER LETTER CLAUSES:\n- Clause 1.1: Position: Engineering Intern (Frontend & QA Support)\n- Clause 2.4: Responsibilities: Assist engineering squads in bug triage and internal backlog maintenance.\n- Schedule B: Stipend: ₹25,000 per month, full-time on-site (9:00 AM - 6:30 PM, Monday-Friday).\n- Clause 4.1: Pre-Placement Offer (PPO) is discretionary and subject to annual headcount availability.",
  });

  const [analysis, setAnalysis] = useState<BlindSpotAnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);

  const stressTestRef = useRef<HTMLDivElement>(null);

  const handleRunAudit = async (payload: BlindSpotAnalyzeRequest) => {
    setRequestData(payload);
    setIsLoading(true);
    setError(null);
    try {
      const res = await analyzeDecision(payload);
      setAnalysis(res);
    } catch (err: any) {
      setError(err.message || "Failed to complete reasoning audit");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadSample = async () => {
    try {
      const sample = await fetchSampleDecision();
      setRequestData({
        ...sample,
        document_context:
          "OFFER LETTER CLAUSES:\n- Clause 1.1: Position: Engineering Intern (Frontend & QA Support)\n- Clause 2.4: Responsibilities: Assist engineering squads in bug triage and internal backlog maintenance.\n- Schedule B: Stipend: ₹25,000 per month, full-time on-site (9:00 AM - 6:30 PM, Monday-Friday).\n- Clause 4.1: Pre-Placement Offer (PPO) is discretionary and subject to annual headcount availability.",
      });
    } catch {
      setRequestData({
        decision_prompt: "Should I accept this 6-month software engineering internship?",
        context_reasoning: "The company is well known. The stipend is ₹25,000 per month. It is 15 km from my home. I believe it will give me valuable industry experience.",
        priorities: ["Career growth", "Learning", "Education", "Money", "Convenience"],
        document_context:
          "OFFER LETTER CLAUSES:\n- Clause 1.1: Position: Engineering Intern (Frontend & QA Support)\n- Clause 2.4: Responsibilities: Assist engineering squads in bug triage and internal backlog maintenance.\n- Schedule B: Stipend: ₹25,000 per month, full-time on-site (9:00 AM - 6:30 PM, Monday-Friday).\n- Clause 4.1: Pre-Placement Offer (PPO) is discretionary and subject to annual headcount availability.",
      });
    }
  };

  const scrollToStressTest = () => {
    stressTestRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddChecklistItems = (newItems: string[]) => {
    if (!analysis) return;
    setAnalysis({
      ...analysis,
      investigation_checklist: [...analysis.investigation_checklist, ...newItems],
    });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--canvas-cream)" }}>
      {/* 1. Floating Nav Pill */}
      <BlindSpotHeader
        currentStage={analysis ? "audit" : "input"}
        onReset={() => setAnalysis(null)}
        onLoadSample={handleLoadSample}
        isAuditing={isLoading}
      />

      {/* 2. Main Editorial Body */}
      <main
        style={{
          flex: 1,
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 1.5rem 2rem",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
          position: "relative",
        }}
      >
        {/* Ghost Watermark Background */}
        <div
          className="ghost-watermark"
          style={{ position: "absolute", top: "-20px", right: "20px", zIndex: 0 }}
        >
          {analysis ? "AUDIT MAP" : "BLINDSPOT"}
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              background: "rgba(235, 0, 27, 0.08)",
              border: "1.5px solid var(--mastercard-red)",
              borderRadius: "20px",
              padding: "1rem 1.5rem",
              color: "var(--mastercard-red)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              zIndex: 1,
            }}
          >
            <AlertTriangle size={20} />
            <span style={{ fontWeight: 500 }}>{error}</span>
          </div>
        )}

        {/* STAGE 1: Framing & Grounding Form */}
        {!analysis ? (
          <div className="mc-card" style={{ zIndex: 1, padding: "2.75rem 3.25rem" }}>
            <DecisionInputForm
              initialData={requestData}
              isLoading={isLoading}
              onSubmit={handleRunAudit}
              onLoadSample={handleLoadSample}
            />
          </div>
        ) : (
          /* STAGES 2-5: Full Reasoning Audit Output */
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", zIndex: 1 }}>
            {/* Visual Orbital Stage Progress Tracker */}
            <div className="mc-stage-tracker">
              <div className="mc-stage-step completed">
                <span className="mc-stage-icon">✓</span>
                <span>1. Framing & Grounding</span>
              </div>
              <span style={{ color: "var(--dust-taupe)" }}>→</span>
              <div className="mc-stage-step active">
                <span className="mc-stage-icon">2</span>
                <span>2. Multi-Agent Debate</span>
              </div>
              <span style={{ color: "var(--dust-taupe)" }}>→</span>
              <div className="mc-stage-step active">
                <span className="mc-stage-icon">3</span>
                <span>3. 6-Lens Audit</span>
              </div>
              <span style={{ color: "var(--dust-taupe)" }}>→</span>
              <div className="mc-stage-step active">
                <span className="mc-stage-icon">4</span>
                <span>4. Stress-Test</span>
              </div>
              <span style={{ color: "var(--dust-taupe)" }}>→</span>
              <div className="mc-stage-step">
                <span className="mc-stage-icon">5</span>
                <span>5. Action Plan</span>
              </div>
            </div>

            {/* Live Multi-Agent Execution Trace Drawer */}
            {analysis.agent_trace && (
              <AgentTerminalTrace
                trace={analysis.agent_trace}
                groundingActive={analysis.document_grounding_active}
              />
            )}

            {/* Reasoning Map (6 Lenses & Sensitivity) */}
            <ReasoningMap
              analysis={analysis}
              onOpenStressTest={scrollToStressTest}
              onOpenChallenge={() => setIsChallengeOpen(true)}
            />

            {/* STAGE 4: Interactive Stress Test (The Magic Moment) */}
            <div ref={stressTestRef}>
              <StressTestSection
                scenario={analysis.stress_test}
                decisionPrompt={analysis.decision_summary}
                contextReasoning={requestData.context_reasoning}
                onAddChecklistItems={handleAddChecklistItems}
              />
            </div>

            {/* STAGE 5: Actionable Investigation Checklist */}
            <InvestigationChecklist
              items={analysis.investigation_checklist}
              decisionSummary={analysis.decision_summary}
            />
          </div>
        )}
      </main>

      {/* 3. Mastercard Signature Dark Warm-Black Footer */}
      <footer className="mc-footer">
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1.5rem" }}>
            <div style={{ maxWidth: "550px" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 500, letterSpacing: "-0.02em" }}>
                Helping you discover what your reasoning deserves to question.
              </h2>
              <p style={{ marginTop: "8px", fontSize: "15px" }}>
                BlindSpot is built on the PromptWars Competition Kit utilizing Google Gemini 2.5 Flash with strict reasoning audit constraints.
              </p>
            </div>

            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <div className="mc-brand-circles">
                <div className="mc-circle-red" />
                <div className="mc-circle-yellow" />
              </div>
              <span style={{ fontSize: "1.2rem", fontWeight: 600, color: "#fff" }}>
                BlindSpot
              </span>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2rem",
              paddingTop: "2rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            <div>
              <div className="mc-eyebrow" style={{ color: "#a8a39c", marginBottom: "8px" }}>
                COGNITIVE LENSES
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px" }}>
                <li>Assumptions & Sensitivity</li>
                <li>Missing Variables</li>
                <li>Reasoning Tensions</li>
                <li>Alternative Angles</li>
                <li>Evidence Gaps</li>
              </ul>
            </div>

            <div>
              <div className="mc-eyebrow" style={{ color: "#a8a39c", marginBottom: "8px" }}>
                MULTI-AGENT KERNEL
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px" }}>
                <li>Agent 1: The Dissector (Analytical / Grounded)</li>
                <li>Agent 2: The Antagonist (The Ruthless Cynic)</li>
                <li>Agent 3: The Risk Auditor (Executive / Objective)</li>
                <li>Document Grounding Layer</li>
              </ul>
            </div>

            <div>
              <div className="mc-eyebrow" style={{ color: "#a8a39c", marginBottom: "8px" }}>
                NEGATIVE CONSTRAINTS
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px" }}>
                <li>No Decision Quality Scores</li>
                <li>No Prescriptive Advice</li>
                <li>No Fake Certainty</li>
                <li>Pure Reasoning Audit</li>
              </ul>
            </div>
          </div>

          <div
            style={{
              paddingTop: "1.5rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "13px",
              color: "#696969",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <span>© 2026 BlindSpot • PromptWars Competition Foundation. All rights reserved.</span>
            <span>WCAG AA Contrast Compliant • Privacy First</span>
          </div>
        </div>
      </footer>

      {/* Challenge Mode Modal */}
      {analysis && (
        <ChallengeReasoningModal
          isOpen={isChallengeOpen}
          onClose={() => setIsChallengeOpen(false)}
          decisionPrompt={analysis.decision_summary}
          contextReasoning={requestData.context_reasoning}
          priorities={requestData.priorities}
          document_context={requestData.document_context}
        />
      )}
    </div>
  );
}
