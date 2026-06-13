import React, { useContext, useState } from "react";
import { NotesContext } from "../../Context/NotesContext.jsx";
import styles from "./MinhasNotas.module.css";

export default function MinhasNotas() {
  const { notes, addNote, updateNote, deleteNote } = useContext(NotesContext);
  const [texto, setTexto] = useState("");
  const [cor, setCor] = useState("#ffff88");
  const [editing, setEditing] = useState(null);

  const handleAdd = () => {
    if (!texto.trim()) return;
    addNote({ texto, cor });
    setTexto("");
  };

  return (
    <div className={styles.container}>
      <h1>Minhas Notas</h1>

      <div className={styles.form}>
        <textarea value={texto} onChange={(e) => setTexto(e.target.value)} />
        <input
          type="color"
          className={styles.colorPicker}
          value={cor}
          onChange={(e) => setCor(e.target.value)}
        />
        <button onClick={handleAdd}>Adicionar Nota</button>
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
              Salvar
            </button>
            <button onClick={() => setEditing(null)}>Cancelar</button>
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
            <p>{note.texto}</p>
            <div className={styles.actions}>
              <button onClick={() => deleteNote(note.idBloco)}>Excluir</button>
              <button onClick={() => setEditing(note)}>Editar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
