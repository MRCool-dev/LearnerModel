import { D, mono, serif } from "../../tokens";

export default function BigIdea({ number, title, color, children }) {
  return (
    <div style={{ margin: "12px 0", padding: "14px 16px", background: D.surfaceLowest, border: `1px solid ${color}33`, borderRadius: 10, borderLeft: `4px solid ${color}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: color + "22", border: `1px solid ${color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color, fontFamily: mono, flexShrink: 0 }}>{number}</div>
        <div style={{ fontSize: 13, fontWeight: 700, color, fontFamily: mono }}>{title}</div>
      </div>
      <div style={{ fontSize: 12, color: D.muted, lineHeight: 1.9, fontFamily: serif }}>{children}</div>
    </div>
  );
}
