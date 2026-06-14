import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import styles from "./NavBar.module.css";
import { useTranslation } from "react-i18next";

export default function NavBar() {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation(); 

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
        <li><Link to="/home">{t("home")}</Link></li>
        <li><Link to="/minhasnotas">{t("myNotes")}</Link></li>
        <li><Link to="/configuracoes">{t("settings")}</Link></li>
      </ul>

      <div className={styles.navActions}>
        <button 
          onClick={toggleTheme} 
          className={styles.themeButton}
        >
          {darkMode ? "☀️ Claro" : `🌙 ${t("darkMode")}`}
        </button>

        <button 
          onClick={logout} 
          className={styles.logoutButton}
        >
          {t("logout")}
        </button>
      </div>
    </nav>
  );
}
