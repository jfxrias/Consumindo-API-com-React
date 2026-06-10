import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Email inválido");
      return;
    }
    if (password.length < 4) {
      setError("Senha muito curta");
      return;
    }
    login(email, password);
    navigate("/home");
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2 className={styles.title}>Bloco de Notas</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>Entrar</button>
          <a href="#" className={styles.link}>Esqueceu a senha?</a>
        </form>
      </div>
    </div>
  );
}
