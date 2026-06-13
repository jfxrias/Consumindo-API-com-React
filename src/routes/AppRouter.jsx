import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login.jsx";
import Home from "../pages/Home/Home.jsx";
import MinhasNotas from "../pages/MinhasNotas/MinhasNotas.jsx";
import DetalheNota from "../pages/DetalheNota/DetalheNota.jsx";
import Admin from "../pages/Admin/Admin.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Home />} />
        <Route path="/minhasnotas" element={<MinhasNotas />} />
        <Route path="/nota/:id" element={<DetalheNota />} />

    
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />

        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
