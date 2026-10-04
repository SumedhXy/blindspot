// Mastercard-inspired Editorial Design Theme
export const theme = {
  appName: "BlindSpot",
  tagline: "AI Decision Stress-Testing & Reasoning Audit",
  logoText: "🧠",

  // Editorial Magazine Theme
  appearance: "light" as "light" | "dark" | "system",

  colors: {
    primary: "#141413", // Ink Black primary CTA
    secondary: "#CF4500", // Signal Orange accent
    accentOrange: "#F37338", // Light Signal Orange orbital accent
    background: "#F3F0EE", // Canvas Cream
    surface: "#FCFBFA", // Lifted Cream (paper on paper)
    surfaceWhite: "#FFFFFF", // Pure White floating pill / cards
    text: "#141413", // Ink Black typography (weight 450/500)
    muted: "#696969", // Slate Gray
    border: "#E2DDD8", // Subtle warm border
    success: "#2E8B57", // Forest Emerald
    warning: "#CF4500", // Signal Orange
    danger: "#EB001B", // Mastercard Brand Red
  },

  darkColors: {
    background: "#141413",
    surface: "#222221",
    surfaceWhite: "#2A2A29",
    text: "#F3F0EE",
    muted: "#A8A39C",
    border: "#3A3937",
  },

  radius: {
    sm: "6px",
    md: "20px", // Signature 20px button radius
    lg: "40px", // Signature 40px hero/card radius
    pill: "999px", // Full pill
  },
};

type Colors = typeof theme.colors;

/** Writes theme values to CSS variables. */
export function applyTheme(): void {
  const root = document.documentElement;
  const colors = theme.colors;

  root.style.setProperty("--color-canvas", colors.background);
  root.style.setProperty("--color-lifted", colors.surface);
  root.style.setProperty("--color-white", colors.surfaceWhite);
  root.style.setProperty("--color-ink", colors.text);
  root.style.setProperty("--color-slate", colors.muted);
  root.style.setProperty("--color-signal-orange", colors.secondary);
  root.style.setProperty("--color-light-orange", colors.accentOrange);
  root.style.setProperty("--color-border", colors.border);
  root.style.setProperty("--radius-btn", theme.radius.md);
  root.style.setProperty("--radius-stadium", theme.radius.lg);
  root.style.setProperty("--radius-pill", theme.radius.pill);

  document.title = theme.appName;
}
