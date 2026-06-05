import { useState } from "react";
import { D, mono } from "../../tokens";

export default function CodeBlock({ label, code }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ margin: "10px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontSize: 10, color: D.muted, letterSpacing: 2, textTransform: "uppercase", fontFamily: mono }}>{label}</span>
        <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
          style={{ background: "transparent", border: `1px solid ${copied ? D.green : D.outline}`, color: copied ? D.green : D.muted, borderRadius: 3, padding: "2px 9px", fontSize: 10, cursor: "pointer", fontFamily: mono }}>
          {copied ? "✓ copied" : "copy"}
        </button>
      </div>
      <pre style={{ margin: 0, padding: "12px 14px", background: D.surfaceLowest, border: `1px solid ${D.outline}`, borderRadius: 7, fontSize: 11, lineHeight: 1.9, overflowX: "auto", color: D.text, fontFamily: mono, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
