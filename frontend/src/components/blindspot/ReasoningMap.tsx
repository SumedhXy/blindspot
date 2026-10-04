import { useState } from "react";
import {
  AlertCircle,
  HelpCircle,
  GitCommit,
  Compass,
  Search,
  Sliders,
  ShieldAlert,
  FileCheck,
  Swords,
  Filter,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { BlindSpotAnalysisResponse } from "../../../../project_blindspot/types";

interface ReasoningMapProps {
  analysis: BlindSpotAnalysisResponse;
  onOpenStressTest: () => void;
  onOpenChallenge: () => void;
}

type LensKey = "assumptions" | "missingInfo" | "tensions" | "perspectives" | "evidenceGaps" | "sensitivity";

export default function ReasoningMap({
  analysis,
  onOpenStressTest,
  onOpenChallenge,
}: ReasoningMapProps) {
  const [activeLens, setActiveLens] = useState<LensKey>("assumptions");
  const [filterHighOnly, setFilterHighOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getImpactBadge = (level: "HIGH" | "MEDIUM" | "LOW") => {
    return (
      <span
        className={`ui-badge ui-badge--${level === "HIGH" ? "danger" : level === "MEDIUM" ? "warning" : "success"}`}
        style={{ fontSize: "13px", padding: "4px 12px" }}
      >
        <span className="mc-dot" style={{ width: "6px", height: "6px" }} />
        {level} SENSITIVITY
      </span>
    );
  };

  const highSensitivityCount = analysis.assumptions.filter((a) => a.impact_level === "HIGH").length;

  const LENSES_CONFIG = [
    { key: "assumptions", label: "Assumptions", icon: AlertCircle, count: analysis.assumptions.length, desc: "Beliefs taken for granted", color: "var(--signal-orange)" },
    { key: "missingInfo", label: "Missing Variables", icon: HelpCircle, count: analysis.missing_information.length, desc: "Critical unseen unknowns", color: "var(--light-signal-orange)" },
    { key: "tensions", label: "Reasoning Tensions", icon: GitCommit, count: analysis.reasoning_tensions.length, desc: "Contradictions with goals", color: "var(--link-blue)" },
    { key: "perspectives", label: "Perspectives", icon: Compass, count: analysis.alternative_perspectives.length, desc: "Alternative stakeholder angles", color: "var(--charcoal)" },
    { key: "evidenceGaps", label: "Evidence Gaps", icon: Search, count: analysis.evidence_gaps.length, desc: "Claims lacking hard proof", color: "var(--clay-rust)" },
    { key: "sensitivity", label: "Sensitivity", icon: Sliders, count: analysis.sensitivity_factors.length, desc: "Fragile decision levers", color: "#2E8B57" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Top Banner Card with 40px Stadium Radius */}
      <div className="mc-card" style={{ padding: "2.5rem 3rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1.5rem" }}>
          <div style={{ maxWidth: "68%" }}>
            <div className="mc-eyebrow" style={{ marginBottom: "10px" }}>
              <span className="mc-dot mc-dot-pulse" />
              <span>STAGE 3 • 6-LENS REASONING AUDIT MAP</span>
              {analysis.document_grounding_active && (
                <span className="mc-badge ui-badge--success" style={{ marginLeft: "8px", fontSize: "13px" }}>
                  <FileCheck size={14} /> Grounded with Verified Documents
                </span>
              )}
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 500, color: "var(--ink-black)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              {analysis.decision_summary}
            </h2>
            <p style={{ fontSize: "17px", color: "var(--slate-gray)", marginTop: "8px" }}>
              Audited across 6 analytical lenses. Identify hidden friction points, unverified assumptions, and high-leverage sensitivities.
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            <button
              onClick={onOpenStressTest}
              className="mc-btn-primary"
              style={{ padding: "12px 26px", fontSize: "16px" }}
            >
              <ShieldAlert size={18} />
              Stress-Test Simulator
            </button>

            <button
              onClick={onOpenChallenge}
              className="mc-btn-secondary"
              style={{ padding: "12px 24px", fontSize: "16px" }}
            >
              <Swords size={18} />
              Adversarial Mode
            </button>
          </div>
        </div>

        {/* Visual Cognitive Constellation Grid (Interactive 6-Lens Quick Summary) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "12px",
            marginTop: "2rem",
            paddingTop: "1.75rem",
            borderTop: "1.5px solid var(--border-warm)",
          }}
        >
          {LENSES_CONFIG.map((lens) => {
            const Icon = lens.icon;
            const isCurrent = activeLens === lens.key;
            return (
              <div
                key={lens.key}
                onClick={() => setActiveLens(lens.key as LensKey)}
                style={{
                  background: isCurrent ? "var(--surface-white)" : "var(--lifted-cream)",
                  border: isCurrent ? "2px solid var(--ink-black)" : "1.5px solid var(--border-warm)",
                  borderRadius: "20px",
                  padding: "14px 16px",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  boxShadow: isCurrent ? "0 8px 20px rgba(0,0,0,0.08)" : "none",
                  transform: isCurrent ? "translateY(-2px)" : "none",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: isCurrent ? "var(--ink-black)" : "rgba(0,0,0,0.06)",
                      color: isCurrent ? "#fff" : "var(--ink-black)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Icon size={15} />
                  </div>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: isCurrent ? "var(--signal-orange)" : "var(--slate-gray)",
                    }}
                  >
                    {lens.count}
                  </span>
                </div>
                <span style={{ fontSize: "15px", fontWeight: isCurrent ? 700 : 500, color: "var(--ink-black)" }}>
                  {lens.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lens Navigation Tabs & Interactive Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        {/* Pill Tabs */}
        <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "4px" }}>
          {LENSES_CONFIG.map((item) => {
            const active = activeLens === item.key;
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => setActiveLens(item.key as LensKey)}
                style={{
                  padding: "10px 22px",
                  borderRadius: "999px",
                  fontSize: "16px",
                  fontWeight: active ? 600 : 450,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s ease",
                  background: active ? "var(--ink-black)" : "var(--surface-white)",
                  color: active ? "var(--canvas-cream)" : "var(--charcoal)",
                  border: active ? "1.5px solid var(--ink-black)" : "1.5px solid var(--border-warm)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <Icon size={16} />
                {item.label}
                <span
                  style={{
                    background: active ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.08)",
                    color: active ? "#fff" : "var(--ink-black)",
                    fontSize: "13px",
                    padding: "2px 8px",
                    borderRadius: "999px",
                    fontWeight: 700,
                  }}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            type="button"
            onClick={() => setFilterHighOnly(!filterHighOnly)}
            style={{
              padding: "8px 18px",
              borderRadius: "999px",
              fontSize: "14px",
              fontWeight: filterHighOnly ? 600 : 450,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: filterHighOnly ? "var(--clay-rust)" : "var(--surface-white)",
              color: filterHighOnly ? "#fff" : "var(--charcoal)",
              border: filterHighOnly ? "1.5px solid var(--clay-rust)" : "1.5px solid var(--border-warm)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
            }}
          >
            <Filter size={14} />
            {filterHighOnly ? "Showing High Impact Only" : "Filter High Impact"}
          </button>
        </div>
      </div>

      {/* Tab Content Display */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {/* 1. ASSUMPTIONS */}
        {activeLens === "assumptions" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {analysis.assumptions
              .filter((item) => (!filterHighOnly ? true : item.impact_level === "HIGH"))
              .map((item) => (
                <div key={item.id} className="mc-card-nested" style={{ padding: "1.75rem 2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1.5rem", flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: "1.35rem", fontWeight: 500, color: "var(--ink-black)", flex: 1 }}>
                      {item.title}
                    </h3>
                    {getImpactBadge(item.impact_level)}
                  </div>
                  <p style={{ fontSize: "17.5px", color: "var(--charcoal)", lineHeight: "1.6", marginTop: "10px" }}>
                    {item.explanation}
                  </p>

                  {item.adversary_challenge && (
                    <div
                      style={{
                        background: "rgba(207, 69, 0, 0.07)",
                        borderLeft: "4px solid var(--signal-orange)",
                        padding: "12px 18px",
                        borderRadius: "0 16px 16px 0",
                        fontSize: "16px",
                        color: "var(--clay-rust)",
                        marginTop: "14px",
                        lineHeight: "1.5",
                      }}
                    >
                      <strong style={{ color: "var(--clay-rust)" }}>😈 The Cynic's Objection: </strong>
                      {item.adversary_challenge}
                    </div>
                  )}

                  <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "14px", color: "var(--slate-gray)", fontWeight: 700 }}>
                      Decision Sensitivity Leverage:
                    </span>
                    <div style={{ flex: 1, minWidth: "160px", maxWidth: "240px", height: "8px", background: "rgba(0,0,0,0.08)", borderRadius: "999px", overflow: "hidden" }}>
                      <div
                        style={{
                          width: `${Math.round(item.sensitivity_score * 100)}%`,
                          height: "100%",
                          background: item.sensitivity_score > 0.75 ? "var(--signal-orange)" : "var(--light-signal-orange)",
                          borderRadius: "999px",
                        }}
                      />
                    </div>
                    <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--ink-black)" }}>
                      {Math.round(item.sensitivity_score * 100)}%
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* 2. MISSING INFORMATION */}
        {activeLens === "missingInfo" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {analysis.missing_information
              .filter((item) => (!filterHighOnly ? true : item.impact_level === "HIGH"))
              .map((item) => (
                <div key={item.id} className="mc-card-nested" style={{ padding: "1.75rem 2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                    <h3 style={{ fontSize: "1.35rem", fontWeight: 500, color: "var(--ink-black)" }}>
                      {item.item}
                    </h3>
                    {getImpactBadge(item.impact_level)}
                  </div>
                  <p style={{ fontSize: "17.5px", color: "var(--charcoal)", marginTop: "8px", lineHeight: "1.6" }}>
                    {item.why_it_matters}
                  </p>
                  <div
                    style={{
                      background: "rgba(243, 115, 56, 0.09)",
                      borderLeft: "4px solid var(--light-signal-orange)",
                      padding: "12px 18px",
                      borderRadius: "0 16px 16px 0",
                      fontSize: "16px",
                      color: "var(--clay-rust)",
                      marginTop: "14px",
                      lineHeight: "1.5",
                    }}
                  >
                    <strong>🔍 Investigative Question to Resolve: </strong>"{item.investigative_question}"
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* 3. REASONING TENSIONS */}
        {activeLens === "tensions" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {analysis.reasoning_tensions.map((item) => (
              <div key={item.id} className="mc-card-nested" style={{ padding: "1.75rem 2rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
                  <div style={{ background: "var(--soft-bone)", padding: "16px 20px", borderRadius: "18px", border: "1px solid var(--border-warm)" }}>
                    <span style={{ fontSize: "13px", color: "var(--link-blue)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                      Stated Goal / Priority
                    </span>
                    <p style={{ fontSize: "17.5px", fontWeight: 500, color: "var(--ink-black)", marginTop: "4px", lineHeight: "1.45" }}>
                      {item.stated_priority}
                    </p>
                  </div>
                  <div style={{ background: "var(--soft-bone)", padding: "16px 20px", borderRadius: "18px", border: "1px solid var(--border-warm)" }}>
                    <span style={{ fontSize: "13px", color: "var(--signal-orange)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                      Frictional Constraint / Conflict
                    </span>
                    <p style={{ fontSize: "17.5px", fontWeight: 500, color: "var(--ink-black)", marginTop: "4px", lineHeight: "1.45" }}>
                      {item.conflicting_reason}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(56, 96, 190, 0.08)",
                    borderLeft: "4px solid var(--link-blue)",
                    padding: "14px 18px",
                    borderRadius: "0 16px 16px 0",
                    fontSize: "16.5px",
                    color: "var(--link-blue)",
                    marginTop: "16px",
                    lineHeight: "1.5",
                  }}
                >
                  <strong>⚖️ Probing Socratic Question: </strong>"{item.probing_question}"
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. ALTERNATIVE PERSPECTIVES */}
        {activeLens === "perspectives" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
            {analysis.alternative_perspectives.map((item, idx) => (
              <div key={idx} className="mc-card-nested" style={{ display: "flex", flexDirection: "column", padding: "1.75rem" }}>
                <span style={{ fontSize: "17px", fontWeight: 700, color: "var(--ink-black)" }}>
                  🔭 {item.lens_name}
                </span>
                <p style={{ fontSize: "16.5px", color: "var(--charcoal)", lineHeight: "1.55", marginTop: "8px" }}>
                  {item.insight}
                </p>
                <div style={{ marginTop: "auto", paddingTop: "14px", borderTop: "1.5px solid var(--border-warm)", fontSize: "15px", color: "var(--slate-gray)" }}>
                  <strong style={{ color: "var(--ink-black)" }}>Critical Lens Angle: </strong>{item.critical_question}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 5. EVIDENCE GAPS */}
        {activeLens === "evidenceGaps" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {analysis.evidence_gaps.map((item, idx) => (
              <div key={idx} className="mc-card-nested" style={{ padding: "1.75rem 2rem" }}>
                <div>
                  <span style={{ fontSize: "13px", color: "var(--slate-gray)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                    CLAIM / ASSUMED BENEFIT:
                  </span>
                  <h3 style={{ fontSize: "1.35rem", fontWeight: 500, color: "var(--ink-black)", marginTop: "4px" }}>
                    "{item.claim}"
                  </h3>
                  <p style={{ fontSize: "16.5px", color: "var(--slate-gray)", marginTop: "6px" }}>
                    <strong style={{ color: "var(--charcoal)" }}>Evidence Provided: </strong>{item.current_evidence}
                  </p>
                  {item.document_excerpt && (
                    <div style={{ marginTop: "10px", padding: "10px 16px", background: "var(--soft-bone)", borderRadius: "14px", fontFamily: "'JetBrains Mono', monospace", fontSize: "14.5px", color: "var(--ink-black)", border: "1px solid var(--border-warm)" }}>
                      <strong style={{ color: "var(--signal-orange)" }}>[Document Excerpt]: </strong>{item.document_excerpt}
                    </div>
                  )}
                </div>
                <div style={{ marginTop: "14px" }}>
                  <span style={{ fontSize: "13px", color: "var(--slate-gray)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                    EVIDENCE TO SEEK BEFORE COMMITTING:
                  </span>
                  <ul style={{ margin: "6px 0 0 1.5rem", padding: 0, fontSize: "16.5px", color: "var(--charcoal)", lineHeight: "1.6" }}>
                    {item.evidence_to_seek.map((ev, i) => (
                      <li key={i}>{ev}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 6. SENSITIVITY RANKING */}
        {activeLens === "sensitivity" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {analysis.sensitivity_factors.map((item, idx) => (
              <div key={idx} className="mc-card-nested" style={{ padding: "1.75rem 2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 500, color: "var(--ink-black)" }}>
                    {item.factor_name}
                  </h3>
                  {getImpactBadge(item.impact)}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "10px" }}>
                  <div style={{ flex: 1, height: "8px", background: "rgba(0,0,0,0.08)", borderRadius: "999px", overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${item.sensitivity_percentage}%`,
                        height: "100%",
                        background: item.sensitivity_percentage > 70 ? "var(--signal-orange)" : "var(--light-signal-orange)",
                        borderRadius: "999px",
                      }}
                    />
                  </div>
                  <span style={{ fontSize: "16px", fontWeight: 700, color: "var(--ink-black)" }}>
                    {item.sensitivity_percentage}%
                  </span>
                </div>
                <p style={{ fontSize: "16.5px", color: "var(--slate-gray)", marginTop: "8px", lineHeight: "1.55" }}>
                  {item.reasoning}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

