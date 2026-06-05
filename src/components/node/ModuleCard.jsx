import { useState } from "react";
import { D, mono, serif } from "../../tokens";

export default function ModuleCard({ name, color, icon, tagline, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1px solid ${color}33`, borderRadius: 10, overflow: "hidden", marginBottom: 10 }}>
      <button onClick={() => setOpen(p => !p)} style={{ width: "100%", padding: "13px 16px", background: open ? color + "12" : color + "07", border: "none", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 24 }}>{icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 900, color, fontFamily: mono }}>require('{name}')</div>
          <div style={{ fontSize: 12, color: D.muted, fontFamily: serif, marginTop: 2 }}>{tagline}</div>
        </div>
        <span style={{ fontSize: 11, color, fontFamily: mono, flexShrink: 0 }}>{open ? "▲ collapse" : "▼ expand"}</span>
      </button>
      {open && <div style={{ padding: "16px 18px", borderTop: `1px solid ${color}22` }}>{children}</div>}
    </div>
  );
}
