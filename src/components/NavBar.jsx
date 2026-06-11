import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; 

export default function NavBar() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        
        <Link className="navbar-brand fw-bold fs-4" to="/">
          Bloco de Notas
        </Link>

        <div className="d-flex align-items-center gap-3">
          <ul className="navbar-nav d-flex flex-row gap-3 mb-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/admin">Admin</Link>
            </li>
          </ul>

          <button 
            onClick={toggleTheme} 
            className="btn btn-outline-warning btn-sm ms-2"
            aria-label={darkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
          >
            {darkMode ? "☀️ Claro" : "🌙 Escuro"}
          </button>
        </div>

      </div>
    </nav>
  );
}