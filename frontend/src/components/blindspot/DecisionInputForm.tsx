import { useState } from "react";
import {
  ArrowRight,
  FileText,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  Briefcase,
  Rocket,
  DollarSign,
  GraduationCap,
} from "lucide-react";
import type { BlindSpotAnalyzeRequest } from "../../types";
import { BLINDSPOT_THEME } from "../../theme";

interface DecisionInputFormProps {
  initialData?: BlindSpotAnalyzeRequest;
  isLoading: boolean;
  onSubmit: (data: BlindSpotAnalyzeRequest) => void;
  onLoadSample: () => void;
}

const BENCHMARK_PRESETS = [
  {
    id: "internship",
    title: "Internship Offer vs PPO Reality",
    icon: Briefcase,
    category: "Group B • Career",
    prompt: "Should I accept this 6-month software engineering internship offer?",
    reasoning:
      "The company is well known. The stipend is ₹25,000/month. It is 15 km from my home. I assume doing this will give me high industry credibility and lead directly to a full-time PPO.",
    priorities: ["Career growth", "Learning", "Education", "Money"],
    document:
      "OFFER LETTER CLAUSES:\n- Clause 1.1: Position: Engineering Intern (Frontend & QA Support)\n- Clause 2.4: Responsibilities: Assist engineering squads in bug triage and internal backlog maintenance.\n- Schedule B: Stipend: ₹25,000 per month, full-time on-site (9:00 AM - 6:30 PM, Monday-Friday).\n- Clause 4.1: Pre-Placement Offer (PPO) is discretionary and subject to annual headcount availability.",
  },
  {
    id: "jee",
    title: "14-Hour Isolated Self-Study (Burnout Risk)",
    icon: GraduationCap,
    category: "Group A • Academic",
    prompt: "Should I prepare for the upcoming JEE Advanced exam by self-studying 14 hours a day at home?",
    reasoning:
      "Self-studying saves travel time to coaching institutes, gives me complete freedom over my schedule, and allows me to save money for college.",
    priorities: ["Learning Velocity", "Financial Stability", "Stress Management"],
    document:
      "EXAM SYLLABUS & SCHEDULE:\n- Total Chapters: 96 across Physics, Chemistry, Mathematics.\n- Daily Target: 14 hours self-study in isolation.\n- External Evaluation: None currently scheduled.",
  },
  {
    id: "sports_bike",
    title: "Sports Bike Loan vs Retiring at 30 (Contradiction)",
    icon: DollarSign,
    category: "Group E • Contradiction Trap",
    prompt: "Should I buy a high-end sports bike?",
    reasoning:
      "I want to save every single rupee to retire by age 30, and buying this bike requires taking out a high-interest personal loan.",
    priorities: ["Extreme Frugality", "Instant Gratification"],
    document:
      "LOAN QUOTE SHEET:\n- Principal: ₹6,50,000\n- Interest Rate: 16.5% per annum\n- Tenure: 48 months\n- Estimated Monthly EMI: ₹18,500",
  },
  {
    id: "web3",
    title: "Web3 Startup: 40% Pay Cut for High Equity",
    icon: Rocket,
    category: "Group B • Startup Risk",
    prompt: "Should I quit my stable tech job to join an early-stage Web3 startup that offers a 40% pay cut but high equity?",
    reasoning:
      "The founders graduated from IIT, the sector is booming, and getting in early means I will become a millionaire when the company goes public.",
    priorities: ["Career Growth", "Wealth Generation", "Stability"],
    document:
      "EQUITY GRANT TERMS:\n- 1.5% Common Stock, 4-year vesting with 1-year cliff.\n- Single-trigger acceleration on acquisition only if terminated within 60 days.\n- Cash Runway: Company currently has 11 months of operating runway before next funding round.",
  },
];

export default function DecisionInputForm({
  initialData,
  isLoading,
  onSubmit,
  onLoadSample,
}: DecisionInputFormProps) {
  const [decision, setDecision] = useState(
    initialData?.decision_prompt || "Should I accept this 6-month software engineering internship?"
  );
  const [reasoning, setReasoning] = useState(
    initialData?.context_reasoning ||
      "The company is well known. The stipend is ₹25,000 per month. It is 15 km from my home. I believe it will give me valuable industry experience."
  );
  const [documentContext, setDocumentContext] = useState(
    initialData?.document_context ||
      "OFFER LETTER CLAUSES:\n- Clause 1.1: Position: Engineering Intern (Frontend & QA Support)\n- Clause 2.4: Responsibilities: Assist engineering squads in bug triage and internal backlog maintenance.\n- Schedule B: Stipend: ₹25,000 per month, full-time on-site (9:00 AM - 6:30 PM, Monday-Friday).\n- Clause 4.1: Pre-Placement Offer (PPO) is discretionary and subject to annual headcount availability."
  );
  const [showDocContext, setShowDocContext] = useState(true);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>(
    initialData?.priorities || ["Career growth", "Learning", "Education", "Money"]
  );
  const [activePreset, setActivePreset] = useState<string | null>("internship");

  const togglePriority = (priority: string) => {
    if (selectedPriorities.includes(priority)) {
      setSelectedPriorities(selectedPriorities.filter((p) => p !== priority));
    } else {
      setSelectedPriorities([...selectedPriorities, priority]);
    }
  };

  const applyPreset = (preset: typeof BENCHMARK_PRESETS[0]) => {
    setActivePreset(preset.id);
    setDecision(preset.prompt);
    setReasoning(preset.reasoning);
    setDocumentContext(preset.document);
    setSelectedPriorities(preset.priorities);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!decision.trim() || !reasoning.trim()) return;
    onSubmit({
      decision_prompt: decision,
      context_reasoning: reasoning,
      priorities: selectedPriorities,
      document_context: documentContext.trim() ? documentContext : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2.25rem" }}>
      {/* Editorial Header with Circular Portrait Satellite */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
        <div style={{ maxWidth: "760px" }}>
          <div className="mc-eyebrow" style={{ marginBottom: "10px" }}>
            <span className="mc-dot mc-dot-pulse" />
            <span>STAGE 1 • REASONING FRAMING & GROUNDING</span>
          </div>
          <h1 style={{ fontSize: "2.7rem", fontWeight: 500, color: "var(--ink-black)", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            What decision deserves to be stress-tested?
          </h1>
          <p style={{ fontSize: "19px", color: "var(--slate-gray)", marginTop: "10px", fontWeight: 450, lineHeight: "1.6" }}>
            State your decision and rationale. BlindSpot stress-tests your beliefs across 6 analytical lenses, identifies unverified assumptions, and challenges reasoning gaps without ever telling you what to choose.
          </p>
        </div>

        {/* Circular Portrait with Satellite Arrow CTA */}
        <div className="mc-circle-portrait" style={{ cursor: "pointer" }} onClick={onLoadSample} title="Click to load benchmark sample">
          <span>🧠</span>
          <div className="mc-satellite-badge">
            <Sparkles size={14} color="var(--signal-orange)" />
          </div>
        </div>
      </div>

      {/* Interactive Quick Benchmark Presets */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <span className="mc-eyebrow" style={{ fontSize: "13px" }}>
            QUICK BENCHMARK SCENARIOS (CLICK TO EXPLORE)
          </span>
          <span style={{ fontSize: "13px", color: "var(--slate-gray)" }}>
            Instant ground-truth data
          </span>
        </div>
        <div className="mc-preset-grid">
          {BENCHMARK_PRESETS.map((p) => {
            const Icon = p.icon;
            const isSelected = activePreset === p.id && decision === p.prompt;
            return (
              <div
                key={p.id}
                className={`mc-preset-card ${isSelected ? "active" : ""}`}
                onClick={() => applyPreset(p)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: isSelected ? "var(--ink-black)" : "var(--soft-bone)",
                        color: isSelected ? "var(--canvas-cream)" : "var(--ink-black)",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--slate-gray)", textTransform: "uppercase" }}>
                      {p.category}
                    </span>
                  </div>
                  {isSelected && <span className="mc-dot" style={{ background: "var(--signal-orange)" }} />}
                </div>
                <span style={{ fontSize: "16px", fontWeight: 600, color: "var(--ink-black)", lineHeight: "1.3" }}>
                  {p.title}
                </span>
                <p style={{ fontSize: "13.5px", color: "var(--slate-gray)", margin: 0, lineClamp: 2, overflow: "hidden" }}>
                  {p.prompt}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
        {/* Decision Question Input */}
        <div>
          <label style={{ display: "block", fontSize: "18px", fontWeight: 600, color: "var(--ink-black)", marginBottom: "10px" }}>
            The Core Decision Question
          </label>
          <input
            type="text"
            className="ui-input"
            style={{ borderRadius: "20px", padding: "16px 22px", fontSize: "19px", fontWeight: 500 }}
            placeholder="e.g. Should I accept this 6-month software engineering internship?"
            value={decision}
            onChange={(e) => {
              setDecision(e.target.value);
              setActivePreset(null);
            }}
            required
            minLength={5}
          />
        </div>

        {/* Current Rationale Textarea */}
        <div>
          <label style={{ display: "block", fontSize: "18px", fontWeight: 600, color: "var(--ink-black)", marginBottom: "10px" }}>
            Your Rationale & Present Beliefs
          </label>
          <textarea
            rows={3}
            className="ui-textarea"
            style={{ borderRadius: "20px", padding: "16px 22px", fontSize: "18px", lineHeight: "1.6" }}
            placeholder="State why you are inclined toward this choice (e.g. reputation, compensation, commute, learning assumptions)..."
            value={reasoning}
            onChange={(e) => {
              setReasoning(e.target.value);
              setActivePreset(null);
            }}
            required
            minLength={10}
          />
        </div>

        {/* Priorities Selector (Pill Tags) */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <label style={{ fontSize: "17px", fontWeight: 600, color: "var(--ink-black)" }}>
              Context Priorities (Click to Toggle)
            </label>
            <span style={{ fontSize: "14px", color: "var(--slate-gray)" }}>
              {selectedPriorities.length} selected
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {BLINDSPOT_THEME.defaultPriorities.map((item) => {
              const active = selectedPriorities.includes(item);
              return (
                <button
                  type="button"
                  key={item}
                  onClick={() => togglePriority(item)}
                  style={{
                    padding: "10px 22px",
                    borderRadius: "999px",
                    fontSize: "16px",
                    fontWeight: active ? 600 : 450,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.15s ease",
                    background: active ? "var(--ink-black)" : "var(--surface-white)",
                    color: active ? "var(--canvas-cream)" : "var(--charcoal)",
                    border: active ? "1.5px solid var(--ink-black)" : "1.5px solid var(--border-warm)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  {active && <Check size={16} color="var(--canvas-cream)" />}
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {/* Document Grounding Layer */}
        <div
          style={{
            background: "var(--surface-white)",
            border: "1.5px solid var(--border-warm)",
            borderRadius: "28px",
            overflow: "hidden",
            boxShadow: "var(--shadow-nav)",
          }}
        >
          <div
            onClick={() => setShowDocContext(!showDocContext)}
            style={{
              padding: "18px 26px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <FileText size={20} color="var(--signal-orange)" />
              <span style={{ fontSize: "17.5px", fontWeight: 600, color: "var(--ink-black)" }}>
                External Document Grounding Layer
              </span>
              <span className="mc-badge ui-badge--info" style={{ fontSize: "12px" }}>
                Grounding Active
              </span>
            </div>
            {showDocContext ? <ChevronUp size={20} color="var(--slate-gray)" /> : <ChevronDown size={20} color="var(--slate-gray)" />}
          </div>

          {showDocContext && (
            <div style={{ padding: "0 26px 22px" }}>
              <p style={{ fontSize: "15px", color: "var(--slate-gray)", marginBottom: "12px", lineHeight: "1.5" }}>
                The Risk Auditor agent cross-references user claims against verified clauses (e.g. stipend terms, notice period, equity vesting).
              </p>
              <textarea
                rows={4}
                value={documentContext}
                onChange={(e) => setDocumentContext(e.target.value)}
                className="ui-textarea"
                style={{
                  borderRadius: "18px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "15px",
                  background: "var(--soft-bone)",
                  padding: "14px 18px",
                  lineHeight: "1.5",
                }}
                placeholder="Paste raw contract clauses, job description, syllabus, or term sheet..."
              />
            </div>
          )}
        </div>

        {/* Submit Button & Satellite */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "0.75rem" }}>
          <button
            type="submit"
            disabled={isLoading || !decision.trim() || !reasoning.trim()}
            className="mc-btn-primary"
            style={{
              flex: 1,
              padding: "18px 36px",
              fontSize: "18.5px",
              borderRadius: "26px",
            }}
          >
            {isLoading ? (
              <>Running Multi-Agent Reasoning Audit...</>
            ) : (
              <>
                Conduct Multi-Agent Reasoning Audit
                <ArrowRight size={20} />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onLoadSample}
            className="mc-satellite"
            title="Load default benchmark sample"
            style={{ width: "56px", height: "56px" }}
          >
            <BookOpen size={20} />
          </button>
        </div>
      </div>
    </form>
  );
}

