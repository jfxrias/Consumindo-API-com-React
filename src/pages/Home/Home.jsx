import React, { useContext, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import FilterBar from "../components/FilterBar";
import { NotesContext } from "../context/NotesContext";
import { ThemeContext } from "../context/ThemeContext";

export default function Home() {
  const { notes } = useContext(NotesContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    document.title = `Bloco de Notas (${notes.length} nota${notes.length !== 1 ? "s" : ""})`;
    return () => {
      document.title = "Bloco de Notas";
    };
  }, [notes.length]);

  const categories = useMemo(() => {
    const cats = notes.map((n) => n.category).filter(Boolean);
    return [...new Set(cats)].sort();
  }, [notes]);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch =
        !searchTerm ||
        note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || note.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [notes, searchTerm, selectedCategory]);

  const theme = {
    bg: darkMode ? "#1a1a2e" : "#f8f8f8",
    surface: darkMode ? "#16213e" : "#ffffff",
    text: darkMode ? "#e0e0e0" : "#333333",
    subtext: darkMode ? "#888" : "#888",
    border: darkMode ? "#2a2a4a" : "#e0e0e0",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: theme.bg,
        color: theme.text,
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "24px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <h1 style={{ fontSize: "22px", fontWeight: 700, margin: 0 }}>
            Minhas Notas
          </h1>
          <span style={{ fontSize: "13px", color: theme.subtext }}>
            {filteredNotes.length}{" "}
            {filteredNotes.length === 1 ? "nota" : "notas"}
          </span>
        </div>
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
          darkMode={darkMode}
        />
        {filteredNotes.length === 0 ? (
          <EmptyState
            hasFilters={!!(searchTerm || selectedCategory)}
            darkMode={darkMode}
            onClear={() => {
              setSearchTerm("");
              setSelectedCategory("");
            }}
          />
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "16px",
              marginTop: "16px",
            }}
          >
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onClick={() => navigate(`/note/${note.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ hasFilters, darkMode, onClear }) {
  const color = darkMode ? "#555" : "#ccc";
  const textColor = darkMode ? "#777" : "#bbb";

  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <svg
        width="56"
        height="56"
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        style={{ marginBottom: "16px" }}
        aria-hidden="true"
      >
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="9" y1="16" x2="12" y2="16" />
      </svg>
      <p style={{ fontSize: "16px", fontWeight: 600, color: textColor, margin: "0 0 8px" }}>
        {hasFilters ? "Nenhuma nota encontrada" : "Nenhuma nota ainda"}
      </p>
      <p style={{ fontSize: "13px", color: textColor, margin: "0 0 16px" }}>
        {hasFilters
          ? "Tente outros termos ou categorias."
          : "Crie sua primeira nota para começar."}
      </p>
      {hasFilters && (
        <button
          onClick={onClear}
          style={{
            padding: "8px 20px",
            borderRadius: "24px",
            border: "none",
            backgroundColor: "#f5a623",
            color: "#fff",
            fontWeight: 600,
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Limpar filtros
        </button>
      )}
    </div>
  );
}
