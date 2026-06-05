import { D, mono, serif } from "../../tokens";

export default function EasyBox({ emoji, title, color, children }) {
  return (
    <div style={{ margin: "12px 0", padding: "13px 16px", background: color + "09", border: `1px solid ${color}35`, borderRadius: 10 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color, fontFamily: mono, marginBottom: 7 }}>{emoji} {title}</div>
      <div style={{ fontSize: 12, color: D.muted, lineHeight: 1.95, fontFamily: serif }}>{children}</div>
    </div>
  );
}
