import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NotesContext } from "../context/NotesContext";
import { ThemeContext } from "../context/ThemeContext";
import { getNoteTextColor } from "../utils/noteColors";

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function makeBackBtnStyle(darkMode) {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 16px",
    borderRadius: "6px",
    border: `1px solid ${darkMode ? "#444" : "#ddd"}`,
    backgroundColor: darkMode ? "#1e1e3a" : "#fff",
    color: darkMode ? "#ccc" : "#555",
    fontWeight: 600,
    fontSize: "13px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };
}

export default function NoteDetail() {
  const { id } = useParams();
  const { notes, deleteNote } = useContext(NotesContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const theme = {
    bg: darkMode ? "#1a1a2e" : "#f8f8f8",
    text: darkMode ? "#e0e0e0" : "#333",
  };

  const backBtnStyle = makeBackBtnStyle(darkMode);
  const note = notes.find((n) => String(n.id) === String(id));

  if (!note) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: theme.bg,
          color: theme.text,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          padding: "20px",
        }}
      >
        <p style={{ fontSize: "18px", fontWeight: 600 }}>Nota não encontrada</p>
        <button onClick={() => navigate("/home")} style={backBtnStyle}>
          ← Voltar para Home
        </button>
      </div>
    );
  }

  const { title, content, color = "#FFD966", category, createdAt } = note;
  const textColor = getNoteTextColor(color);

  function handleDelete() {
    if (window.confirm("Tem certeza que deseja excluir esta nota?")) {
      deleteNote && deleteNote(note.id);
      navigate("/home");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: theme.bg,
        color: theme.text,
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "40px 20px" }}>
        <button onClick={() => navigate(-1)} style={backBtnStyle} aria-label="Voltar">
          ← Voltar
        </button>
        <div
          style={{
            backgroundColor: color,
            color: textColor,
            borderRadius: "8px",
            padding: "32px 36px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            position: "relative",
            marginTop: "16px",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: "0 0 32px 32px",
              borderColor: "transparent transparent rgba(0,0,0,0.1) transparent",
            }}
          />
          {category && (
            <span
              style={{
                display: "inline-block",
                fontSize: "11px",
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: "999px",
                backgroundColor: "rgba(0,0,0,0.12)",
                marginBottom: "14px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {category}
            </span>
          )}
          <h1
            style={{
              fontSize: "24px",
              fontWeight: 800,
              margin: "0 0 8px",
              lineHeight: "1.3",
            }}
          >
            {title || "(sem título)"}
          </h1>
          {createdAt && (
            <p
              style={{
                fontSize: "12px",
                opacity: 0.65,
                margin: "0 0 24px",
                fontWeight: 500,
              }}
            >
              Adicionado em: {formatDate(createdAt)}
            </p>
          )}
          <hr
            style={{
              border: "none",
              borderTop: "1px solid rgba(0,0,0,0.12)",
              margin: "0 0 20px",
            }}
          />
          <p
            style={{
              fontSize: "15px",
              lineHeight: "1.75",
              margin: 0,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {content ? content : <em style={{ opacity: 0.5 }}>Sem conteúdo.</em>}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => navigate(`/edit/${note.id}`)}
            style={{
              padding: "10px 28px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#4CAF50",
              color: "#fff",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#388e3c")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4CAF50")}
            aria-label="Editar nota"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            style={{
              padding: "10px 28px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#e53935",
              color: "#fff",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b71c1c")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e53935")}
            aria-label="Excluir nota"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}