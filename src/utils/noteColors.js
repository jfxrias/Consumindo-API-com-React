export const NOTE_COLORS = [
  "#FFD966",
  "#81C995",
  "#FF8C69",
  "#77C7E7",
  "#F28B82",
  "#D7AEFB",
  "#FDCFE8",
  "#E6C9A8",
];

const NOTE_TEXT_COLORS = {
  "#FFD966": "#5a4a00",
  "#81C995": "#1a4a2e",
  "#FF8C69": "#6b2200",
  "#77C7E7": "#0a3a52",
  "#F28B82": "#5a1a14",
  "#D7AEFB": "#3d1a6e",
  "#FDCFE8": "#6b2a4a",
  "#E6C9A8": "#4a3010",
};

export function getNoteTextColor(bgColor) {
  return NOTE_TEXT_COLORS[bgColor] || "#333333";
}