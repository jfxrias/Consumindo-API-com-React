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

  
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("login", response.data.login);

      setUser({
        id: response.data.idUsuario,
        login: response.data.login,
        token: response.data.token,
      });
    } catch (err) {
      console.error("Erro no login", err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("login");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
