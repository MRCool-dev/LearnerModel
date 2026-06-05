import { useState } from "react";
import { D, mono } from "../../tokens";

export default function MiddlewareOrderDemo() {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const steps = [
    { label: "Request arrives at /users", who: "Client", color: "#3b82f6", req: "GET /users", res: "" },
    { label: "app.use(logger) → logs request", who: "Middleware 1", color: "#f59e0b", req: "GET /users", res: "" },
    { label: "app.use(auth) → checks token", who: "Middleware 2", color: "#f59e0b", req: "GET /users", res: "" },
    { label: "app.use(express.json) → parse body", who: "Middleware 3", color: "#f59e0b", req: "GET /users", res: "" },
    { label: "app.get('/users') → route handler", who: "Route Handler", color: "#8b5cf6", req: "GET /users", res: "{ users: [...] }" },
    { label: "Response sent back to client", who: "Client", color: "#3b82f6", req: "", res: "{ users: [...] }" },
  ];
  const run = async () => {
    setRunning(true); setStep(0);
    for (let i = 1; i <= steps.length; i++) {
      await new Promise(r => setTimeout(r, 700));
      setStep(i);
    }
    setRunning(false);
  };
  return (
    <div style={{ padding: 14, background: D.surfaceLowest, border: `1px solid ${D.outline}`, borderRadius: 10 }}>
      <div style={{ fontSize: 10, color: D.muted, fontFamily: mono, letterSpacing: 1, marginBottom: 10 }}>🧪 LIVE — step through the middleware chain</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "7px 10px", background: step > i ? s.color + "15" : step === i ? s.color + "22" : D.surface, border: `1px solid ${step >= i ? s.color + "40" : D.outline}`, borderRadius: 6, transition: "all 0.35s", opacity: step >= i ? 1 : 0.45 }}>
            <span style={{ fontSize: 14, width: 20, flexShrink: 0 }}>{step > i ? "✅" : step === i ? "⏳" : "○"}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: step >= i ? s.color : D.muted, fontFamily: mono, fontWeight: step === i ? 700 : 400 }}>{s.who}: {s.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={run} disabled={running}
          style={{ padding: "6px 16px", background: running ? D.muted + "18" : D.greenBg, border: `1px solid ${running ? D.outline : D.green}`, color: running ? D.muted : D.greenText, borderRadius: 5, cursor: running ? "default" : "pointer", fontSize: 11, fontFamily: mono }}>
          {running ? "● running..." : "▶ Run it"}
        </button>
        <div style={{ fontSize: 10, color: D.muted, fontFamily: mono }}>
          {step === 0 ? "press Run to watch middleware execute in order" : step >= steps.length ? "Done! Notice middleware runs BEFORE the route handler." : `step ${step} of ${steps.length}`}
        </div>
      </div>
    </div>
  );
}
