import React ,{ useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import styles from "./Login.module.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // login deve retornar o objeto com token, idUsuario e login
      const response = await login(email, password);

      // salva no localStorage para usar depois nos endpoints de configurações
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.idUsuario);
      localStorage.setItem("login", response.login);

      navigate("/home");
    } catch (err) {
      alert("Erro no login. Verifique email e senha.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bloco de Notas</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      <a href="#" className={styles.forgot}>
        Esqueceu a senha?
      </a>
    </div>
  );
}
