import { useState } from "react";
import { D, mono } from "../../tokens";

export default function NodeVsBrowserDemo() {
  const [env, setEnv] = useState("browser");
  const [output, setOutput] = useState([]);
  const [running, setRunning] = useState(false);
  const browserApis = [
    { code: "document.getElementById('app')", result: "<div id='app'>...</div>", ok: true },
    { code: "window.localStorage.setItem('key','val')", result: "✅ Stored in browser storage", ok: true },
    { code: "fetch('https://api.example.com/data')", result: "✅ HTTP request sent", ok: true },
    { code: "require('fs').readFileSync('data.txt')", result: "❌ ReferenceError: require is not defined", ok: false },
    { code: "process.env.DB_URL", result: "❌ ReferenceError: process is not defined", ok: false },
  ];
  const nodeApis = [
    { code: "require('fs').readFileSync('data.txt','utf8')", result: "✅ 'Hello from file!'", ok: true },
    { code: "process.env.DB_URL", result: "✅ 'postgresql://localhost/myapp'", ok: true },
    { code: "require('http').createServer(...)", result: "✅ HTTP server created on port 3000", ok: true },
    { code: "document.getElementById('app')", result: "❌ ReferenceError: document is not defined", ok: false },
    { code: "window.localStorage", result: "❌ ReferenceError: window is not defined", ok: false },
  ];
  const items = env === "browser" ? browserApis : nodeApis;
  const run = async () => {
    setRunning(true); setOutput([]);
    for (let i = 0; i < items.length; i++) {
      await new Promise(r => setTimeout(r, 500));
      setOutput(p => [...p, items[i]]);
    }
    setRunning(false);
  };
  return (
    <div style={{ padding: 14, background: D.surfaceLowest, border: `1px solid ${D.outline}`, borderRadius: 10 }}>
      <div style={{ fontSize: 10, color: D.muted, fontFamily: mono, letterSpacing: 1, marginBottom: 10 }}>🧪 LIVE — see what runs in each environment</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {["browser", "node"].map(e => (
          <button key={e} onClick={() => { setEnv(e); setOutput([]); }} style={{ padding: "6px 16px", background: env === e ? (e === "browser" ? "#3b82f6" : D.green) : "transparent", color: env === e ? "#fff" : D.muted, border: `1px solid ${env === e ? (e === "browser" ? "#3b82f6" : D.green) : D.outline}`, borderRadius: 5, cursor: "pointer", fontSize: 11, fontFamily: mono }}>
            {e === "browser" ? "🌐 Browser JS" : "🟢 Node.js"}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        {items.map((item, i) => {
          const done = output.find(o => o.code === item.code);
          return (
            <div key={i} style={{ padding: "8px 12px", background: done ? (done.ok ? D.green + "0d" : D.red + "0d") : D.surface, border: `1px solid ${done ? (done.ok ? D.green + "44" : D.red + "44") : D.outline}`, borderRadius: 6, transition: "all 0.3s" }}>
              <div style={{ fontSize: 11, fontFamily: mono, color: done ? (done.ok ? D.green : D.red) : D.muted }}>{item.code}</div>
              {done && <div style={{ fontSize: 11, color: D.muted, fontFamily: mono, marginTop: 3 }}>→ {done.result}</div>}
            </div>
          );
        })}
      </div>
      <button onClick={run} disabled={running} style={{ padding: "6px 16px", background: env === "browser" ? "#3b82f6" : D.green, color: "#fff", border: "none", borderRadius: 5, cursor: running ? "default" : "pointer", fontSize: 11, fontFamily: mono, opacity: running ? 0.7 : 1 }}>
        {running ? "▶ Running…" : "▶ Run All"}
      </button>
    </div>
  );
}
