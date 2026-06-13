import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  return (
    <nav className={`${styles.navbar} ${darkMode ? styles.dark : styles.light}`}>
      <div className={styles.logo}>
        <Link to="/home">Bloco de Notas</Link>
      </div>

      <ul className={styles.navLinks}>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/minhasnotas">Minhas Notas</Link></li>
        <li><Link to="/admin">Admin</Link></li>
      </ul>

      <div className={styles.navActions}>
        <button 
          onClick={toggleTheme} 
          className={styles.themeButton}
        >
          {darkMode ? "☀️ Claro" : "🌙 Escuro"}
        </button>

        <button 
          onClick={logout} 
          className={styles.logoutButton}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
