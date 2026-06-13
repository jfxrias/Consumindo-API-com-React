import { useState } from "react";

export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (newNote.trim() === "") return;
    setNotes([...notes, newNote]);
    setNewNote("");
    setShowModal(false);
  };

  return (
    <div className="container mt-5 text-center">
      <h2 className="fw-light">Bloco de Notas 📝</h2>
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Nova Nota
      </button>

      <ul className="list-group mt-3">
        {notes.map((note, i) => (
          <li key={i} className="list-group-item">{note}</li>
        ))}
      </ul>

      {showModal && (
        <div className="modal d-block bg-dark bg-opacity-50">
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <h5>Nova Nota</h5>
              <input
                className="form-control my-2"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Digite sua nota..."
              />
              <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button className="btn btn-success" onClick={addNote}>
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
