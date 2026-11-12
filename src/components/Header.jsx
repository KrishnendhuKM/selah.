
import { Sun, Moon } from "lucide-react";

function Header({ theme, onToggleTheme }) {
  return (
    <header className="header">
      <a href="/" className="logo">
        selah<span>.</span>
      </a>

      <button
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        title="Change theme"
      >
        {theme === "light" ? (
          <Moon size={19} strokeWidth={1.6} />
        ) : (
          <Sun size={19} strokeWidth={1.6} />
        )}
      </button>
    </header>
  );
}

export default Header;
