import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NotesContext } from "../../Context/NotesContext.jsx";
import { ThemeContext } from "../../Context/ThemeContext.jsx";
import { getNoteTextColor } from "../../utils/noteColors";
import jsPDF from "jspdf";
import styles from "./DetalheNota.module.css";

export default function DetalheNota() {
  const { id } = useParams();
  const { notes } = useContext(NotesContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const theme = {
    bg: darkMode ? "#1a1a2e" : "#f8f8f8",
    text: darkMode ? "#e0e0e0" : "#333",
  };

  const note = notes.find((n) => String(n.idBloco) === String(id));

  if (!note) {
    return (
      <div className={styles.container} style={{ backgroundColor: theme.bg, color: theme.text }}>
        <p>Nota não encontrada</p>
        <button onClick={() => navigate("/home")} className={styles.backBtn}>
          ← Voltar para Home
        </button>
      </div>
    );
  }

  const { texto, cor = "#FFD966", categoria, createdAt } = note;
  const textColor = getNoteTextColor(cor);

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    alert("Conteúdo copiado para a área de transferência!");
  }

  function exportToPDF(note) {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Nota: ${note.texto || "(sem título)"}`, 10, 20);
    doc.setFontSize(12);
    doc.text(`Categoria: ${note.categoria || "Sem categoria"}`, 10, 30);
    doc.text(`Conteúdo: ${note.texto || "Sem conteúdo"}`, 10, 40);
    doc.save(`nota-${note.idBloco}.pdf`);
  }

function sendByEmail(note) {
  const subject = encodeURIComponent("Compartilhando nota");
  const body = encodeURIComponent(`Nota: ${note.texto}\n\n${note.texto}`);
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`, "_blank");
}


  return (
    <div className={styles.container} style={{ backgroundColor: theme.bg, color: theme.text }}>
      <div className={styles.inner}>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          ← Voltar
        </button>
        <div className={styles.noteCard} style={{ backgroundColor: cor, color: textColor }}>
          {categoria && <span className={styles.noteCategory}>{categoria}</span>}
          <h1 className={styles.noteTitle}>{texto || "(sem título)"}</h1>
          {createdAt && <p className={styles.noteDate}>Adicionado em: {createdAt}</p>}
          <p className={styles.noteContent}>
            {texto ? texto : <em style={{ opacity: 0.5 }}>Sem conteúdo.</em>}
          </p>
        </div>
        <div className={styles.actions}>
          <button onClick={() => copyToClipboard(note.texto)} className={styles.shareBtn}>
            Copiar
          </button>
          <button onClick={() => exportToPDF(note)} className={styles.shareBtn}>
            Exportar PDF
          </button>
          <button onClick={() => sendByEmail(note)} className={styles.shareBtn}>
            Enviar Email
          </button>
        </div>
      </div>
    </div>
  );
}
