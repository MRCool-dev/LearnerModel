import { useState } from "react";
import { D, mono } from "../../tokens";

export default function TypeScriptErrorDemo() {
  const [mode, setMode] = useState("js");
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const jsSteps = [
    { label: "Code written", code: "const user = getUser();\nconsole.log(user.nmae.toUpperCase());", color: D.muted },
    { label: "✅ No editor warning — JS is dynamic", code: "// JS has no type info — 'nmae' looks fine", color: "#f59e0b" },
    { label: "✅ Build succeeds — no compile step", code: "$ node server.js — Started on port 3000", color: D.green },
    { label: "User visits the page…", code: "GET /profile — request received", color: "#3b82f6" },
    { label: "💥 RUNTIME crash — server returns 500", code: "TypeError: Cannot read properties of undefined (reading 'toUpperCase')\n  at /server.js:12:28\n  — caught 1 hour later in production", color: D.red },
  ];
  const tsSteps = [
    { label: "Code written", code: "const user: User = getUser();\nconsole.log(user.nmae.toUpperCase());", color: D.muted },
    { label: "❌ Editor shows red squiggle immediately", code: "Property 'nmae' does not exist on type 'User'.\nDid you mean 'name'?  ts(2551)", color: D.red },
    { label: "Developer fixes typo in seconds", code: "console.log(user.name.toUpperCase()); // ✅", color: D.green },
    { label: "✅ TypeScript compiles successfully", code: "$ tsc — 0 errors", color: D.green },
    { label: "✅ Server runs — zero runtime crash", code: "GET /profile — 200 OK\nAlice", color: D.green },
  ];
  const steps = mode === "js" ? jsSteps : tsSteps;
  const run = async () => {
    setRunning(true); setStep(-1);
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 700));
      setStep(i);
    }
    setRunning(false);
  };
  return (
    <div style={{ padding: 14, background: D.surfaceLowest, border: `1px solid ${D.outline}`, borderRadius: 10 }}>
      <div style={{ fontSize: 10, color: D.muted, fontFamily: mono, letterSpacing: 1, marginBottom: 10 }}>🧪 LIVE — same typo: JS vs TypeScript</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {[["js","🟡 JavaScript",D.red],["ts","🔷 TypeScript",D.green]].map(([m,label,c]) => (
          <button key={m} onClick={() => { setMode(m); setStep(-1); }} style={{ padding: "6px 14px", background: mode === m ? c + "22" : "transparent", color: mode === m ? c : D.muted, border: `1px solid ${mode === m ? c : D.outline}`, borderRadius: 5, cursor: "pointer", fontSize: 11, fontFamily: mono }}>{label}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 12 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ padding: "8px 12px", background: step >= i ? s.color + "12" : D.surface, border: `1px solid ${step >= i ? s.color + "44" : D.outline}`, borderRadius: 6, transition: "all 0.3s" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <span style={{ fontSize: 12, flexShrink: 0, marginTop: 1 }}>{step > i ? "✅" : step === i ? "⏳" : "○"}</span>
              <div>
                <div style={{ fontSize: 11, fontFamily: mono, color: step >= i ? s.color : D.muted, fontWeight: step === i ? 700 : 400 }}>{s.label}</div>
                {step === i && <pre style={{ margin: "4px 0 0", fontSize: 10, fontFamily: mono, color: s.color, background: "#00000033", padding: "4px 8px", borderRadius: 4, whiteSpace: "pre-wrap" }}>{s.code}</pre>}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={run} disabled={running} style={{ padding: "6px 16px", background: mode === "js" ? "#f59e0b" : "#3b82f6", color: "#fff", border: "none", borderRadius: 5, cursor: running ? "default" : "pointer", fontSize: 11, fontFamily: mono, opacity: running ? 0.7 : 1 }}>
        {running ? "Running…" : "▶ Trace Execution"}
      </button>
    </div>
  );
}
