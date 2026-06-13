import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await api.get("/blocos/listar");
    setNotes(res.data);
  };

  const addNote = async (newNote) => {
    await api.post("/blocos/adicionar", newNote);
    await fetchNotes();
  };

  const updateNote = async (id, updatedNote) => {
    await api.put(`/blocos/atualizar/${id}`, updatedNote);
    await fetchNotes();
  };

  const deleteNote = async (id) => {
    await api.delete(`/blocos/remover/${id}`);
    await fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
}
