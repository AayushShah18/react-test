function Header({ theme, onToggleTheme }) {
  return (
    <header className="header">
      <div>
        <h1>Task Manager</h1>
        <p className="subtitle">Plan your day, one task at a time.</p>
      </div>
      <button
        className="icon-btn"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        title="Toggle theme"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </header>
  );
}

export default Header;
