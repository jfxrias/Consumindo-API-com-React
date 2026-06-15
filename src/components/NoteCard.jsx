import { getNoteTextColor } from "../utils/noteColors";
import styles from "./NoteCard.module.css";

export default function NoteCard({ note, onClick, fontSize, fontFamily }) {
  const { title, content, color = "#FFD966" } = note;
  const textColor = getNoteTextColor(color);

  return (
    <div
      onClick={() => onClick && onClick(note)}
      className={styles.card}
      style={{ backgroundColor: color, color: textColor }}
      role="button"
      tabIndex={0}
      aria-label={`Nota: ${title}`}
      onKeyDown={(e) => e.key === "Enter" && onClick && onClick(note)}
    >
      <div className={styles.corner} />
      <p className={styles.title}>{title || "(sem título)"}</p>
      {content && (
        <p
          className={styles.content}
          style={{ fontSize: `${fontSize}px`, fontFamily }}
        >
          {content}
        </p>
      )}
    </div>
  );
}
