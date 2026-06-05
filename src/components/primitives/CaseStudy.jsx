import { useState } from "react";
import { D, mono, serif } from "../../tokens";

export default function CaseStudy({ title, color, scenario, problem, solution, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ margin: "12px 0", border: `1px solid ${color}33`, borderRadius: 9, overflow: "hidden" }}>
      <button onClick={() => setOpen(p => !p)} style={{ width: "100%", padding: "11px 14px", background: color + "0d", border: "none", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 16 }}>📖</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color, fontFamily: mono }}>{title}</div>
          <div style={{ fontSize: 11, color: D.muted, fontFamily: serif }}>{scenario}</div>
        </div>
        <span style={{ color, fontSize: 11, fontFamily: mono }}>{open ? "▲ close" : "▼ open"}</span>
      </button>
      {open && (
        <div style={{ padding: "14px 16px", borderTop: `1px solid ${color}22` }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
            <div style={{ flex: 1, minWidth: 140, padding: "10px 12px", background: D.red + "0a", border: `1px solid ${D.red}22`, borderRadius: 7 }}>
              <div style={{ fontSize: 10, color: D.red, fontFamily: mono, marginBottom: 4 }}>❌ PROBLEM</div>
              <div style={{ fontSize: 11, color: D.muted, fontFamily: serif, lineHeight: 1.7 }}>{problem}</div>
            </div>
            <div style={{ flex: 1, minWidth: 140, padding: "10px 12px", background: D.greenBg, border: `1px solid ${D.green}22`, borderRadius: 7 }}>
              <div style={{ fontSize: 10, color: D.greenText, fontFamily: mono, marginBottom: 4 }}>✅ SOLUTION</div>
              <div style={{ fontSize: 11, color: D.muted, fontFamily: serif, lineHeight: 1.7 }}>{solution}</div>
            </div>
          </div>
          {children}
        </div>
      )}
    </div>
  );
}
