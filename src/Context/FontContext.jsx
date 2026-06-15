import React, { createContext, useContext, useState, useEffect } from "react";

const FontContext = createContext();

export function FontProvider({ children }) {
  const [fontSize, setFontSize] = useState(
    parseInt(localStorage.getItem("fontSize")) || 14
  );
  const [fontFamily, setFontFamily] = useState(
    localStorage.getItem("fontFamily") || "Arial"
  );

  useEffect(() => {
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("fontFamily", fontFamily);
  }, [fontFamily]);

  return (
    <FontContext.Provider value={{ fontSize, setFontSize, fontFamily, setFontFamily }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  return useContext(FontContext);
}
