import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (login, senha) => {
    try {
      const response = await axios.post("http://localhost:8080/usuarios/login", {
        login,
        senha,
      });

      // salva no localStorage para usar depois nos endpoints de configurações
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.idUsuario);
      localStorage.setItem("login", response.data.login);

      // atualiza estado global do usuário
      setUser({
        id: response.data.idUsuario,
        login: response.data.login,
        token: response.data.token,
      });

      // retorna os dados para quem chamou
      return response.data;
    } catch (err) {
      console.error("Erro no login", err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("login");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
