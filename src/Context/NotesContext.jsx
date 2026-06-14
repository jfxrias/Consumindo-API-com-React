import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await api.get("/blocos/listar");
      setNotes(res.data);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (newNote) => {
    await api.post("/blocos/adicionar", newNote);
    await fetchNotes();
  };

  const updateNote = async (idBloco, updatedNote) => {
    await api.put(`/blocos/atualizar/${idBloco}`, updatedNote);
    await fetchNotes();
  };

  const deleteNote = async (idBloco) => {
    await api.delete(`/blocos/remover/${idBloco}`);
    await fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <NotesContext.Provider
      value={{ notes, loading, addNote, updateNote, deleteNote }}
    >
      {children}
    </NotesContext.Provider>
  );
}
