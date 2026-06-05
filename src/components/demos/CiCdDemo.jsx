import { useState } from "react";
import { D, mono } from "../../tokens";

export default function CiCdDemo() {
  const [stage, setStage] = useState(-1);
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState([]);

  const stages = [
    { name: "Checkout", icon: "📥", color: "#3b82f6", log: "git clone https://github.com/user/api.git" },
    { name: "Install", icon: "📦", color: "#8b5cf6", log: "npm ci (installing 245 packages...)" },
    { name: "Lint", icon: "🔍", color: "#f59e0b", log: "eslint src/ (0 errors, 0 warnings)" },
    { name: "Test", icon: "🧪", color: "#f43f5e", log: "jest --coverage (142 tests passed)" },
    { name: "Build", icon: "🏗️", color: "#06b6d4", log: "vite build (dist/ 324KB)" },
    { name: "Deploy", icon: "🚀", color: D.green, log: "ssh prod-server 'pm2 reload api' (success)" },
  ];

  const run = async () => {
    setRunning(true); setStage(-1); setLogs([]);
    for (let i = 0; i < stages.length; i++) {
      await new Promise(r => setTimeout(r, 900));
      setStage(i);
      setLogs(prev => [...prev, stages[i].log]);
    }
    await new Promise(r => setTimeout(r, 500));
    setRunning(false);
  };

  return (
    <div style={{ padding: 14, background: D.surfaceLowest, border: `1px solid ${D.outline}`, borderRadius: 10 }}>
      <div style={{ fontSize: 10, color: D.muted, fontFamily: mono, letterSpacing: 1, marginBottom: 10 }}>🧪 LIVE — CI/CD pipeline simulator</div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {stages.map((s, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "8px 10px", background: stage >= i ? s.color + "15" : D.surface, border: `1px solid ${stage >= i ? s.color + "40" : D.outline}`, borderRadius: 6, minWidth: 70, transition: "all 0.4s", opacity: stage >= i ? 1 : 0.45 }}>
            <span style={{ fontSize: 16 }}>{stage > i ? "✅" : stage === i ? "⏳" : s.icon}</span>
            <span style={{ fontSize: 10, color: stage >= i ? s.color : D.muted, fontFamily: mono, fontWeight: stage === i ? 700 : 400 }}>{s.name}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: "8px 10px", background: D.surface, borderRadius: 6, marginBottom: 12, fontFamily: mono, fontSize: 10, minHeight: 80, maxHeight: 120, overflowY: "auto", color: D.muted }}>
        {logs.length === 0 ? "press Run to start pipeline..." : logs.map((l, i) => (
          <div key={i} style={{ color: stages[i]?.color || D.muted, padding: "1px 0" }}>
            <span style={{ opacity: 0.5 }}>$</span> {l}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button onClick={run} disabled={running}
          style={{ padding: "6px 16px", background: running ? D.muted + "18" : D.greenBg, border: `1px solid ${running ? D.outline : D.green}`, color: running ? D.muted : D.greenText, borderRadius: 5, cursor: running ? "default" : "pointer", fontSize: 11, fontFamily: mono }}>
          {running ? "● deploying..." : "▶ Run Pipeline"}
        </button>
        <span style={{ fontSize: 10, color: D.muted, fontFamily: mono }}>
          {stage === -1 ? "6 stages: checkout → install → lint → test → build → deploy" : stage >= stages.length - 1 ? "Deployed! 🚀" : `stage ${stage + 1} of ${stages.length}`}
        </span>
      </div>
    </div>
  );
}
