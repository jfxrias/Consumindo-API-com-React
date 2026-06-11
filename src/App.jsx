import "./App.css"; 
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import NavBar from "./components/NavBar";
import Admin from "./pages/Admin";
import Home from "./pages/Home";

function App() {
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
    <ThemeProvider>
      <BrowserRouter>
        <NavBar />

        {/* Sistema de Rotas */}
        <Routes>
          <Route 
            path="/" 
            element={
              <div className="container mt-5 text-center">
                <h2 className="fw-light">Bem-vindo ao Bloco de Notas 📝</h2>
                <p className="text-muted">Use o menu superior para navegar até o Painel Admin.</p>
              </div>
            } 
          />

          <Route path="/admin" element={<Admin />} />
        </Routes>

        {showModal && (
          <div className="modal d-block bg-dark bg-opacity-50" tabIndex="-1" role="dialog">
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
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button className="btn btn success" onClick={addNote}> 
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

