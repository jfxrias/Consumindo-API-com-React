import React, { useState } from "react";
import axios from "axios";
import styles from "./Configuracoes.module.css";
import { useTranslation } from "react-i18next";
import { useFont } from "../../Context/FontContext";

export default function Configuracoes() {
  const [idioma, setIdioma] = useState("pt");
  const [mensagem, setMensagem] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [login, setLogin] = useState("");
  const { fontSize, setFontSize, fontFamily, setFontFamily } = useFont();
  const { t, i18n } = useTranslation();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const alterarSenha = async () => {
    try {
      const resp = await axios.post(
        `http://localhost:8080/configuracoes/alterar-senha/${userId}`,
        { senhaNova },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMensagem(resp.data.mensagem);
    } catch {
      setMensagem(t("errorChangePassword"));
    }
  };

  const atualizarPerfil = async () => {
    try {
      const resp = await axios.put(
        `http://localhost:8080/configuracoes/perfil/${userId}`,
        { login },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMensagem(resp.data.mensagem);
      if (resp.data.token) {
        localStorage.setItem("token", resp.data.token);
      }
    } catch {
      setMensagem(t("errorUpdateProfile"));
    }
  };

  const mudarIdioma = async (novoIdioma) => {
    setIdioma(novoIdioma);
    i18n.changeLanguage(novoIdioma);
    try {
      const resp = await axios.put(
        `http://localhost:8080/configuracoes/idioma/${userId}`,
        { idioma: novoIdioma },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMensagem(resp.data.mensagem);
    } catch {
      setMensagem(t("errorChangeLanguage"));
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("settings")}</h1>
      {mensagem && <p className={styles.feedback}>{mensagem}</p>}

      {/* Conta */}
      <section className={styles.section}>
        <h2>🔑 {t("account")}</h2>
        <input
          type="password"
          placeholder={t("newPassword")}
          value={senhaNova}
          onChange={(e) => setSenhaNova(e.target.value)}
          className={styles.input}
        />
        <button className={styles.button} onClick={alterarSenha}>
          {t("changePassword")}
        </button>

        <input
          type="text"
          placeholder={t("login")}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className={styles.input}
        />
        <button className={styles.button} onClick={atualizarPerfil}>
          {t("updateProfile")}
        </button>
      </section>

      {/* Idioma */}
      <section className={styles.section}>
        <h2>🌐 {t("language")}</h2>
        <select value={idioma} onChange={(e) => mudarIdioma(e.target.value)} className={styles.input}>
          <option value="pt">Português</option>
          <option value="en">English</option>
          <option value="es">Español</option>

        </select>
      </section>

     {/* Fonte */}
<section className={styles.section}>
  <h2>🔠 {t("fontPreferences")}</h2>

  <label className={styles.label}>{t("fontSize")}</label>
  <input
    type="range"
    min="12"
    max="48"
    value={fontSize}
    onChange={(e) => setFontSize(parseInt(e.target.value))}
    className={styles.slider}
  />

  <label className={styles.label}>{t("fontType")}</label>
  <select
    value={fontFamily}
    onChange={(e) => setFontFamily(e.target.value)}
    className={styles.input}
  >
    <option value="Arial">Arial</option>
    <option value="Verdana">Verdana</option>
    <option value="Times New Roman">Times New Roman</option>
    <option value="Courier New">Courier New</option>
    <option value="Georgia">Georgia</option>
    <option value="Tahoma">Tahoma</option>
    <option value="Trebuchet MS">Trebuchet MS</option>
    <option value="Impact">Impact</option>
    <option value="Comic Sans MS">Comic Sans MS</option>
    <option value="Lucida Console">Lucida Console</option>
    <option value="Palatino Linotype">Palatino Linotype</option>
    <option value="Segoe UI">Segoe UI</option>
    <option value="Helvetica">Helvetica</option>
  </select>

  <p
    className={styles.preview}
    style={{ fontSize: `${fontSize}px`, fontFamily }}
  >
    {t("previewText", { size: fontSize, font: fontFamily })}
  </p>
</section>

    </div>
  );
}
