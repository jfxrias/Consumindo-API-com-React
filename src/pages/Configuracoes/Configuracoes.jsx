import React, { useState } from "react";
import axios from "axios";
import styles from "./configuracoes.module.css";
import { useTranslation } from "react-i18next";
import "../../Traducao/i18nIngles";

export default function Configuracoes() {
  const [idioma, setIdioma] = useState("pt");
  const [mensagem, setMensagem] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [login, setLogin] = useState("");
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [corCategoria, setCorCategoria] = useState("");
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
      setMensagem("Erro ao alterar senha");
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
      setMensagem("Erro ao atualizar perfil");
    }
  };

  const criarCategoria = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:8080/configuracoes/categorias",
        { nomeCategoria, corCategoria },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMensagem(resp.data.mensagem);
    } catch {
      setMensagem("Erro ao criar categoria");
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
      setMensagem("Erro ao mudar idioma");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("settings")}</h1>
      {mensagem && <p className={styles.feedback}>{mensagem}</p>}

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

      <section className={styles.section}>
        <h2>🌐 {t("language")}</h2>
        <select value={idioma} onChange={(e) => mudarIdioma(e.target.value)}>
          <option value="pt">Português</option>
          <option value="en">English</option>
        </select>
      </section>

      <section className={styles.section}>
        <h2>🗂️ {t("categories")}</h2>
        <input
          type="text"
          placeholder={t("categoryName")}
          value={nomeCategoria}
          onChange={(e) => setNomeCategoria(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder={t("categoryColor")}
          value={corCategoria}
          onChange={(e) => setCorCategoria(e.target.value)}
          className={styles.input}
        />
        <button className={styles.button} onClick={criarCategoria}>
          {t("createCategory")}
        </button>
      </section>
    </div>
  );
}
