import React from "react";

export default function FilterBar({
  searchTerm = "",
  onSearchChange,
  selectedCategory = "",
  onCategoryChange,
  categories = [],
  darkMode = false,
}) {
  const borderColor = darkMode ? "#444" : "#d0d0d0";
  const bgColor = darkMode ? "#1e1e3a" : "#f5f5f5";
  const textColor = darkMode ? "#e0e0e0" : "#333";
  const accentBorder = "#f5a623";

  const inputStyle = {
    width: "100%",
    padding: "8px 12px 8px 34px",
    borderRadius: "24px",
    border: `1px solid ${borderColor}`,
    fontSize: "14px",
    outline: "none",
    backgroundColor: bgColor,
    color: textColor,
    boxSizing: "border-box",
    transition: "border-color 0.2s, background-color 0.2s",
  };

  const selectStyle = {
    padding: "8px 12px",
    borderRadius: "24px",
    border: `1px solid ${borderColor}`,
    fontSize: "14px",
    backgroundColor: bgColor,
    color: textColor,
    cursor: "pointer",
    outline: "none",
    minWidth: "140px",
    transition: "border-color 0.2s",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap",
        padding: "10px 0",
      }}
      role="search"
      aria-label="Filtrar notas"
    >
      <div style={{ position: "relative", flexGrow: 1, minWidth: "180px" }}>
        <svg
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "16px",
            height: "16px",
            color: darkMode ? "#aaa" : "#888",
            pointerEvents: "none",
          }}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          placeholder="Buscar notas..."
          value={searchTerm}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = accentBorder;
            e.target.style.backgroundColor = darkMode ? "#252545" : "#fff";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = borderColor;
            e.target.style.backgroundColor = bgColor;
          }}
          aria-label="Buscar notas por título"
        />
      </div>
      {categories.length > 0 && (
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
          style={selectStyle}
          onFocus={(e) => (e.target.style.borderColor = accentBorder)}
          onBlur={(e) => (e.target.style.borderColor = borderColor)}
          aria-label="Filtrar por categoria"
        >
          <option value="">Todas as categorias</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      )}
      {(searchTerm || selectedCategory) && (
        <button
          onClick={() => {
            onSearchChange && onSearchChange("");
            onCategoryChange && onCategoryChange("");
          }}
          style={{
            padding: "8px 14px",
            borderRadius: "24px",
            border: "none",
            backgroundColor: darkMode ? "#2a2a4a" : "#ececec",
            fontSize: "13px",
            cursor: "pointer",
            color: darkMode ? "#ccc" : "#555",
            fontWeight: 500,
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = darkMode ? "#333360" : "#ddd")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = darkMode ? "#2a2a4a" : "#ececec")
          }
          aria-label="Limpar filtros"
        >
          Limpar filtros
        </button>
      )}
    </div>
  );
}