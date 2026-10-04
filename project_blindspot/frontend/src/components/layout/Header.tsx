import { theme } from "../../config/theme";

export default function Header() {
  return (
    <header className="header">
      <span className="logo" aria-hidden="true">{theme.logoText}</span>
      <div className="header-text">
        <b>{theme.appName}</b>
        <span>{theme.tagline}</span>
      </div>
    </header>
  );
}
