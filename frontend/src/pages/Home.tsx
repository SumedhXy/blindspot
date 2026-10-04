import { ArrowRight, CheckCircle2, Clock, Sparkles, Wand2 } from "lucide-react";
import { PremiumText } from "../components/ui/PremiumText";

const STATUS: [string, "Ready" | "Pending"][] = [
  ["Frontend", "Ready"],
  ["Theme System", "Ready"],
  ["Layouts", "Ready"],
  ["API Layer", "Pending"],
  ["AI Layer", "Pending"],
  ["Agents", "Pending"],
];

const HIGHLIGHTS = [
  { label: "Design system", value: "12" },
  { label: "Workflows", value: "8" },
  { label: "AI prompts", value: "24" },
];

export default function Home() {
  return (
    <>
      <section className="hero premium-hero">
        <div className="hero-copy">
          <PremiumText as="div" variant="eyebrow" className="premium-eyebrow">
            <Sparkles size={12} aria-hidden="true" />
            Prompt Designer
          </PremiumText>

          <PremiumText as="h1" variant="display" className="premium-text--gradient">
            Design rich AI experiences.
          </PremiumText>

          <p className="hero-description">
            Craft premium workflows with reusable components, polished interactions, and a refined visual language for modern AI tools.
          </p>

          <div className="hero-actions">
            <button className="primary-button">
              Launch Studio
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <button className="secondary-button">Preview flow</button>
          </div>

          <div className="hero-meta">
            {HIGHLIGHTS.map((item) => (
              <div key={item.label} className="mini-stat">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="designer-card" aria-label="Prompt designer preview">
          <div className="designer-card__top">
            <span className="live-pill">
              <span className="live-dot" aria-hidden="true" />
              Live
            </span>
            <Wand2 size={16} aria-hidden="true" />
          </div>

          <div className="prompt-box">
            <span className="prompt-label">System</span>
            <p>Turn product vision into clear, actionable workflows with a luxury-grade UI.</p>
          </div>

          <div className="prompt-grid">
            <div className="prompt-chip">
              <span>Context</span>
              <strong>High</strong>
            </div>
            <div className="prompt-chip">
              <span>Tone</span>
              <strong>Premium</strong>
            </div>
            <div className="prompt-chip featured">
              <span>Output</span>
              <strong>Polished</strong>
            </div>
          </div>

          <div className="prompt-preview">
            <span className="preview-label">Preview</span>
            <div className="preview-line"><i /> <b>Structuring clarity</b></div>
            <div className="preview-line"><i /> <b>Sharpening context</b></div>
            <div className="preview-line"><i /> <b>Optimizing prompts</b></div>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="eyebrow">Status</div>
        <ul className="status-list">
          {STATUS.map(([name, state]) => (
            <li key={name}>
              <span>{name}</span>
              <span className={state === "Ready" ? "tag ok" : "tag"}>
                {state === "Ready" ? <CheckCircle2 size={14} aria-hidden="true" /> : <Clock size={14} aria-hidden="true" />}
                {state}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
