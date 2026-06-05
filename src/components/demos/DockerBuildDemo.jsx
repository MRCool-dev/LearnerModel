import { useState } from "react";
import { D, mono } from "../../tokens";

export default function DockerBuildDemo() {
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  const steps = [
    { label: "FROM node:20-alpine", color: "#06b6d4", logs: ["Pulling node:20-alpine from Docker Hub…", "✅ Image pulled (45MB)"] },
    { label: "WORKDIR /app", color: "#3b82f6", logs: ["Created working directory /app"] },
    { label: "COPY package*.json ./", color: "#8b5cf6", logs: ["Copying package.json, package-lock.json"] },
    { label: "RUN npm ci --only=production", color: "#f59e0b", logs: ["Installing 142 packages…", "✅ node_modules ready (28MB)", "Layer cached for future builds ⚡"] },
    { label: "COPY . .", color: "#8b5cf6", logs: ["Copying source files (1.2MB)"] },
    { label: "EXPOSE 3000", color: "#14b8a6", logs: ["Port 3000 declared"] },
    { label: "CMD [\"node\", \"server.js\"]", color: D.green, logs: ["Entry point set", "✅ Image built: myapp:latest (74MB)", "🚀 Run: docker run -p 3000:3000 myapp:latest"] },
  ];
  const run = async () => {
    setRunning(true); setStep(-1); setLogs([]);
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 700));
      setStep(i);
      for (const log of steps[i].logs) {
        await new Promise(r => setTimeout(r, 200));
        setLogs(p => [...p, { text: log, color: steps[i].color }]);
      }
    }
    setRunning(false);
  };
  return (
    <div style={{ padding: 14, background: D.surfaceLowest, border: `1px solid ${D.outline}`, borderRadius: 10 }}>
      <div style={{ fontSize: 10, color: D.muted, fontFamily: mono, letterSpacing: 1, marginBottom: 10 }}>🧪 LIVE — Docker build process step by step</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "7px 10px", background: step === i ? s.color + "15" : step > i ? s.color + "07" : D.surface, border: `1px solid ${step >= i ? s.color + "44" : D.outline}`, borderRadius: 5, transition: "all 0.3s" }}>
            <span style={{ fontSize: 12, width: 16, flexShrink: 0 }}>{step > i ? "✅" : step === i ? "⏳" : "○"}</span>
            <span style={{ fontSize: 11, fontFamily: mono, color: step >= i ? s.color : D.muted, fontWeight: step === i ? 700 : 400 }}>{s.label}</span>
          </div>
        ))}
      </div>
      <button onClick={run} disabled={running} style={{ padding: "6px 16px", background: "#06b6d4", color: "#fff", border: "none", borderRadius: 5, cursor: running ? "default" : "pointer", fontSize: 11, fontFamily: mono, marginBottom: 10, opacity: running ? 0.7 : 1 }}>
        {running ? "Building…" : "▶ docker build ."}
      </button>
      {logs.length > 0 && (
        <div style={{ background: "#000", borderRadius: 6, padding: "8px 10px", maxHeight: 120, overflowY: "auto" }}>
          {logs.map((l, i) => <div key={i} style={{ fontSize: 10, fontFamily: mono, color: l.color, lineHeight: 1.8 }}>{l.text}</div>)}
        </div>
      )}
    </div>
  );
}
