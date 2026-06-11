import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login.jsx";
import Home from "../pages/Home";
import MyNotes from "../pages/MinhasNotas";
import NoteDetail from "../pages/DetalheNota";
import Admin from "../pages/Admin";
import PrivateRoute from "./PrivateRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/mynotes" element={<MyNotes />} />

        <Route path="/nota/:id" element={<NoteDetail />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
