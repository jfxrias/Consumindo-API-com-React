import React, { useContext, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import NoteCard from "../../components/NoteCard.jsx";
import FilterBar from "../../components/FilterBar.jsx";
import { NotesContext } from "../../Context/NotesContext.jsx";
import { ThemeContext } from "../../Context/ThemeContext.jsx";
import { useTranslation } from "react-i18next";
import styles from "./Home.module.css";

function filterNotes(notes, searchTerm, selectedCategory) {
  return notes.filter((note) => {
    const matchesSearch =
      !searchTerm ||
      note.texto?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || note.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });
}

function getCategories(notes) {
  const cats = notes.map((n) => n.categoria).filter(Boolean);
  return [...new Set(cats)].sort();
}

function getTheme(darkMode) {
  return {
    bg: darkMode ? "#1a1a2e" : "#f8f8f8",
    text: darkMode ? "#e0e0e0" : "#333333",
    subtext: "#888",
    border: darkMode ? "#2a2a4a" : "#e0e0e0",
  };
}

export default function Home() {
  const { notes } = useContext(NotesContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    document.title = `Bloco de Notas (${notes.length} ${notes.length === 1 ? t("notesCountSingular") : t("notesCountPlural")})`;
    return () => {
      document.title = "Bloco de Notas";
    };
  }, [notes.length, t]);

  const categories = useMemo(() => getCategories(notes), [notes]);
  const filteredNotes = useMemo(
    () => filterNotes(notes, searchTerm, selectedCategory),
    [notes, searchTerm, selectedCategory]
  );

  const theme = useMemo(() => getTheme(darkMode), [darkMode]);

  return (
    <div className={styles.container} style={{ backgroundColor: theme.bg, color: theme.text }}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t("homeTitle")}</h1>
          <span className={styles.count} style={{ color: theme.subtext }}>
            {filteredNotes.length} {filteredNotes.length === 1 ? t("notesCountSingular") : t("notesCountPlural")}
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
            theme={theme}
            onClear={() => {
              setSearchTerm("");
              setSelectedCategory("");
            }}
          />
        ) : (
          <div className={styles.grid}>
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.idBloco}
                note={{
                  id: note.idBloco,
                  title: note.texto,
                  content: note.texto,
                  category: note.categoria,
                  color: note.cor,
                }}
                onClick={() => navigate(`/note/${note.idBloco}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ hasFilters, theme, onClear }) {
  const { t } = useTranslation();
  return (
    <div className={styles.empty}>
      <p className={styles.emptyTitle} style={{ color: theme.subtext }}>
        {hasFilters ? t("noNotesFound") : t("noNotesYet")}
      </p>
      <p className={styles.emptyText} style={{ color: theme.subtext }}>
        {hasFilters ? t("tryOtherFilters") : t("createFirstNote")}
      </p>
      {hasFilters && (
        <button onClick={onClear} className={styles.clearButton}>
          {t("clearFilters")}
        </button>
      )}
    </div>
  );
}
