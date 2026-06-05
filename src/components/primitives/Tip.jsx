import { D, mono, serif } from "../../tokens";

export default function Tip({ icon = "💡", color = D.yellow, title, children }) {
  return (
    <div style={{ margin: "10px 0", padding: "10px 14px", background: color + "10", border: `1px solid ${color}40`, borderLeft: `4px solid ${color}`, borderRadius: "0 7px 7px 0" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color, marginBottom: 3, fontFamily: mono }}>{icon} {title}</div>
      <div style={{ fontSize: 12, color: D.muted, lineHeight: 1.75, fontFamily: serif }}>{children}</div>
    </div>
  );
}
