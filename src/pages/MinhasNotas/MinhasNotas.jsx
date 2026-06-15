import React, { useContext, useState } from "react";
import { NotesContext } from "../../Context/NotesContext.jsx";
import { useTranslation } from "react-i18next";
import { useFont } from "../../Context/FontContext";
import styles from "./MinhasNotas.module.css";

export default function MinhasNotas() {
  const { notes, addNote, updateNote, deleteNote } = useContext(NotesContext);
  const [texto, setTexto] = useState("");
  const [cor, setCor] = useState("#ffff88");
  const [editing, setEditing] = useState(null);
  const { t } = useTranslation();
  const { fontSize, fontFamily } = useFont();

  const handleAdd = () => {
    if (!texto.trim()) {
      alert(t("emptyTextAlert"));
      return;
    }
    addNote({ texto, cor });
    setTexto("");
  };

  return (
    <div className={styles.container}>
      <h1>{t("mural")}</h1>

      <div className={styles.form}>
        <textarea value={texto} onChange={(e) => setTexto(e.target.value)} />
        <input
          type="color"
          className={styles.colorPicker}
          value={cor}
          onChange={(e) => setCor(e.target.value)}
        />
        <button onClick={handleAdd}>{t("addNote")}</button>
      </div>

      {editing && (
        <div className={styles.form}>
          <textarea
            value={editing.texto}
            onChange={(e) => setEditing({ ...editing, texto: e.target.value })}
          />
          <input
            type="color"
            className={styles.colorPicker}
            value={editing.cor}
            onChange={(e) => setEditing({ ...editing, cor: e.target.value })}
          />
          <div className={styles.actions}>
            <button
              onClick={() => {
                updateNote(editing.idBloco, { texto: editing.texto, cor: editing.cor });
                setEditing(null);
              }}
            >
              {t("save")}
            </button>
            <button onClick={() => setEditing(null)}>{t("cancel")}</button>
          </div>
        </div>
      )}

      <div className={styles.grid}>
        {notes.map((note) => (
          <div
            key={note.idBloco}
            className={styles.postit}
            style={{ backgroundColor: note.cor }}
          >
            {/* Aplica tamanho e tipo de fonte apenas no texto da nota */}
            <p style={{ fontSize: `${fontSize}px`, fontFamily }}>{note.texto}</p>
            <div className={styles.actions}>
              <button onClick={() => deleteNote(note.idBloco)}>{t("delete")}</button>
              <button onClick={() => setEditing(note)}>{t("edit")}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
