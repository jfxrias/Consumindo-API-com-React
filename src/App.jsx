import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import { AuthProvider } from "./Context/AuthContext";
import { ThemeProvider } from "./Context/ThemeContext";
import { NotesProvider } from "./Context/NotesContext";
import Admin from "./pages/Admin/Admin";
import "./App.css";
import NavBar from "./components/NavBar.jsx";
import MinhasNotas from "./pages/MinhasNotas/MinhasNotas.jsx";

function Layout({ children }) {
  const location = useLocation();
  const hideNav = location.pathname === "/" || location.pathname === "/login";

  return (
    <>
      {!hideNav && <NavBar />}
      {children}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NotesProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/minhasnotas" element={<MinhasNotas />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </NotesProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
