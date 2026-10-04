/**
 * BlindSpot Design Tokens & Theme Configuration.
 * Optimized for high contrast (WCAG AA), dark mode, glassmorphism, and clear cognitive cues.
 */

export const BLINDSPOT_THEME = {
  appName: "BlindSpot",
  tagline: "AI Decision Stress-Testing & Reasoning Audit",
  version: "1.0.0",
  primaryColor: "#6366f1", // Indigo 500
  primaryHover: "#4f46e5", // Indigo 600
  accentColor: "#ec4899",  // Pink 500
  bgDark: "#090d16",
  cardBg: "rgba(17, 24, 39, 0.85)",
  cardBorder: "rgba(255, 255, 255, 0.08)",
  
  impactBadges: {
    HIGH: {
      label: "HIGH IMPACT",
      bg: "rgba(239, 68, 68, 0.15)",
      text: "#f87171",
      border: "rgba(239, 68, 68, 0.3)",
      dotColor: "#ef4444",
    },
    MEDIUM: {
      label: "MEDIUM IMPACT",
      bg: "rgba(245, 158, 11, 0.15)",
      text: "#fbbf24",
      border: "rgba(245, 158, 11, 0.3)",
      dotColor: "#f59e0b",
    },
    LOW: {
      label: "LOW IMPACT",
      bg: "rgba(16, 185, 129, 0.15)",
      text: "#34d399",
      border: "rgba(16, 185, 129, 0.3)",
      dotColor: "#10b981",
    },
  },

  lensMeta: {
    assumptions: {
      id: "assumptions",
      label: "Assumptions",
      tag: "Lens 1",
      icon: "AlertCircle",
      color: "#ef4444",
      description: "Unproven beliefs taken as axiomatic facts",
    },
    missingInfo: {
      id: "missingInfo",
      label: "Missing Information",
      tag: "Lens 2",
      icon: "HelpCircle",
      color: "#f59e0b",
      description: "Critical unknown variables that alter the outcome",
    },
    tensions: {
      id: "tensions",
      label: "Reasoning Tensions",
      tag: "Lens 3",
      icon: "GitCommit",
      color: "#3b82f6",
      description: "Internal friction between stated priorities and provided rationale",
    },
    perspectives: {
      id: "perspectives",
      label: "Alternative Perspectives",
      tag: "Lens 4",
      icon: "Compass",
      color: "#a855f7",
      description: "Academic, Opportunity Cost, Future Self & Counterparty viewpoints",
    },
    evidenceGaps: {
      id: "evidenceGaps",
      label: "Evidence Gaps",
      tag: "Lens 5",
      icon: "Search",
      color: "#10b981",
      description: "Distinguishing verified facts from unevidenced beliefs",
    },
  },

  defaultPriorities: [
    "Career growth",
    "Learning",
    "Education",
    "Money",
    "Convenience",
    "Stability",
    "Family",
    "Personal growth",
  ],
};
