import styles from "./FilterBar.module.css";

export default function FilterBar({
  searchTerm = "",
  onSearchChange,
  darkMode = false,
}) {
  const themeVars = {
    "--border-color": darkMode ? "#444" : "#d0d0d0",
    "--bg-color": darkMode ? "#1e1e3a" : "#f5f5f5",
    "--text-color": darkMode ? "#e0e0e0" : "#333",
    "--icon-color": darkMode ? "#aaa" : "#888",
    "--btn-bg": darkMode ? "#2a2a4a" : "#ececec",
    "--btn-text": darkMode ? "#ccc" : "#555",
    "--btn-hover": darkMode ? "#333360" : "#ddd",
  };

  return (
    <div className={styles.container} style={themeVars} role="search" aria-label="Filtrar notas">
      <div className={styles.searchWrapper}>
        <svg className={styles.searchIcon} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          placeholder="Buscar notas..."
          value={searchTerm}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          className={styles.input}
          aria-label="Buscar notas por título"
        />
      </div>
      {searchTerm && (
        <button
          onClick={() => onSearchChange("")}
          className={styles.clearBtn}
          aria-label="Limpar busca"
        >
          Limpar
        </button>
      )}
    </div>
  );
}
