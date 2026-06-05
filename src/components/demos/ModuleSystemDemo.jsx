import { useState } from "react";
import { D, mono } from "../../tokens";

export default function ModuleSystemDemo() {
  const [mode, setMode] = useState("cjs");
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const cjsSteps = [
    { label: "Node wraps file in module wrapper function", code: "(function(exports, require, module, __filename, __dirname) { ... })" },
    { label: "require('./math') — synchronously loads math.js", code: "Execution BLOCKS until math.js is fully loaded and executed" },
    { label: "math.js runs: module.exports = { add, multiply }", code: "module.exports object is returned to the caller" },
    { label: "const { add } = require('./math') destructures the export", code: "add is now available in this file's scope" },
    { label: "console.log(add(2, 3)) → 5", code: "✅ Output: 5" },
  ];
  const esmSteps = [
    { label: "import { add } from './math.js' — static analysis phase", code: "Bundlers/Node scans all imports BEFORE running any code" },
    { label: "Module graph built — all dependencies identified", code: "math.js is fetched and parsed (can be parallel in browsers)" },
    { label: "math.js exports: export function add(a,b) { return a+b; }", code: "Named export 'add' is live binding — updates automatically" },
    { label: "Evaluation phase — modules execute in dependency order", code: "math.js evaluates first, then the importing file" },
    { label: "console.log(add(2, 3)) → 5", code: "✅ Output: 5" },
  ];
  const steps = mode === "cjs" ? cjsSteps : esmSteps;
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
      <div style={{ fontSize: 10, color: D.muted, fontFamily: mono, letterSpacing: 1, marginBottom: 10 }}>🧪 LIVE — trace how modules load step by step</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {[["cjs", "📦 CommonJS (require)","#f59e0b"], ["esm", "🔷 ES Modules (import)","#3b82f6"]].map(([m, label, c]) => (
          <button key={m} onClick={() => { setMode(m); setStep(-1); }} style={{ padding: "6px 14px", background: mode === m ? c : "transparent", color: mode === m ? "#fff" : D.muted, border: `1px solid ${mode === m ? c : D.outline}`, borderRadius: 5, cursor: "pointer", fontSize: 11, fontFamily: mono }}>{label}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 12 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ padding: "9px 12px", background: step === i ? (mode === "cjs" ? "#f59e0b15" : "#3b82f615") : step > i ? D.surface : "transparent", border: `1px solid ${step >= i ? (mode === "cjs" ? "#f59e0b55" : "#3b82f655") : D.outline}`, borderRadius: 6, transition: "all 0.3s" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 12, flexShrink: 0 }}>{step > i ? "✅" : step === i ? "⏳" : "○"}</span>
              <div>
                <div style={{ fontSize: 11, fontFamily: mono, color: step >= i ? (mode === "cjs" ? "#f59e0b" : "#3b82f6") : D.muted, fontWeight: step === i ? 700 : 400 }}>{s.label}</div>
                {step === i && <div style={{ fontSize: 10, color: D.muted, fontFamily: mono, marginTop: 3, padding: "4px 8px", background: D.surface, borderRadius: 4 }}>{s.code}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={run} disabled={running} style={{ padding: "6px 16px", background: mode === "cjs" ? "#f59e0b" : "#3b82f6", color: "#fff", border: "none", borderRadius: 5, cursor: running ? "default" : "pointer", fontSize: 11, fontFamily: mono, opacity: running ? 0.7 : 1 }}>
        {running ? "▶ Loading…" : "▶ Trace Module Load"}
      </button>
    </div>
  );
}
