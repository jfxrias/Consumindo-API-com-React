import React, { useContext, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import NoteCard from "../../components/NoteCard.jsx";
import FilterBar from "../../components/FilterBar.jsx";
import { NotesContext } from "../../Context/NotesContext.jsx";
import { ThemeContext } from "../../Context/ThemeContext.jsx";
import { useTranslation } from "react-i18next";
import { useFont } from "../../Context/FontContext";
import styles from "./Home.module.css";

function filterNotes(notes, searchTerm) {
  return notes.filter(
    (note) =>
      !searchTerm ||
      note.texto?.toLowerCase().includes(searchTerm.toLowerCase()),
  );
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
const { fontSize, fontFamily } = useFont();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.title = `Bloco de Notas (${notes.length} ${
      notes.length === 1 ? t("notesCountSingular") : t("notesCountPlural")
    })`;
    return () => {
      document.title = "Bloco de Notas";
    };
  }, [notes.length, t]);

  const filteredNotes = useMemo(
    () => filterNotes(notes, searchTerm),
    [notes, searchTerm],
  );

  const theme = useMemo(() => getTheme(darkMode), [darkMode]);

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t("homeTitle")}</h1>
          <span className={styles.count} style={{ color: theme.subtext }}>
            {filteredNotes.length}{" "}
            {filteredNotes.length === 1
              ? t("notesCountSingular")
              : t("notesCountPlural")}
          </span>
        </div>

        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          darkMode={darkMode}
        />

        {filteredNotes.length === 0 ? (
          <EmptyState
            hasFilters={!!searchTerm}
            theme={theme}
            onClear={() => setSearchTerm("")}
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
                  color: note.cor,
                }}
                fontSize={fontSize}
                fontFamily={fontFamily}
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
