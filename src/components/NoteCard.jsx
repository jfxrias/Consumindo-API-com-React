import React from "react";
import { getNoteTextColor } from "../utils/noteColors";

export default function NoteCard({ note, onClick }) {
  const { title, content, color = "#FFD966", category } = note;
  const textColor = getNoteTextColor(color);

  return (
    <div
      onClick={() => onClick && onClick(note)}
      style={{
        backgroundColor: color,
        color: textColor,
        borderRadius: "4px",
        padding: "12px 14px 18px",
        minHeight: "120px",
        cursor: "pointer",
        position: "relative",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        wordBreak: "break-word",
        userSelect: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)";
      }}
      role="button"
      tabIndex={0}
      aria-label={`Nota: ${title}`}
      onKeyDown={(e) => e.key === "Enter" && onClick && onClick(note)}
    >
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 0,
          height: 0,
          borderStyle: "solid",
          borderWidth: "0 0 20px 20px",
          borderColor: "transparent transparent rgba(0,0,0,0.12) transparent",
        }}
      />
      <p
        style={{
          fontWeight: 700,
          fontSize: "14px",
          lineHeight: "1.4",
          margin: 0,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {title || "(sem título)"}
      </p>
      {content && (
        <p
          style={{
            fontSize: "12px",
            lineHeight: "1.5",
            margin: 0,
            opacity: 0.85,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {content}
        </p>
      )}
      {category && (
        <span
          style={{
            marginTop: "auto",
            display: "inline-block",
            fontSize: "10px",
            fontWeight: 600,
            padding: "2px 7px",
            borderRadius: "999px",
            backgroundColor: "rgba(0,0,0,0.12)",
            alignSelf: "flex-start",
            letterSpacing: "0.03em",
          }}
        >
          {category}
        </span>
      )}
    </div>
  );
}