import { useState } from "react";
import { D, mono, serif } from "../../tokens";

export default function StreamDemo() {
  const [mode, setMode] = useState("stream");
  const [chunks, setChunks] = useState([]);
  const [running, setRunning] = useState(false);
  const total = 8;
  const run = async () => {
    setRunning(true); setChunks([]);
    if (mode === "buffer") {
      for (let i = 0; i < total; i++) await new Promise(r => setTimeout(r, 120));
      setChunks(Array.from({ length: total }, (_, i) => i));
    } else {
      for (let i = 0; i < total; i++) { await new Promise(r => setTimeout(r, 300)); setChunks(p => [...p, i]); }
    }
    setRunning(false);
  };
  return (
    <div style={{ padding: 14, background: D.surfaceLowest, border: `1px solid ${D.outline}`, borderRadius: 10 }}>
      <div style={{ fontSize: 10, color: D.muted, fontFamily: mono, letterSpacing: 1, marginBottom: 10 }}>🧪 LIVE — compare: buffer (load all) vs stream (chunk by chunk)</div>
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        {["stream", "buffer"].map(m => (
          <button key={m} onClick={() => { setMode(m); setChunks([]); }}
            style={{ padding: "4px 12px", background: mode === m ? D.greenBg : "transparent", border: `1px solid ${mode === m ? D.green : D.outline}`, color: mode === m ? D.greenText : D.muted, borderRadius: 4, cursor: "pointer", fontSize: 11, fontFamily: mono }}>{m}</button>
        ))}
        <button onClick={run} disabled={running}
          style={{ padding: "4px 14px", background: running ? D.muted + "18" : D.greenBg, border: `1px solid ${running ? D.outline : D.green}`, color: running ? D.muted : D.greenText, borderRadius: 4, cursor: running ? "default" : "pointer", fontSize: 11, fontFamily: mono }}>
          {running ? "● loading..." : "▶ Run"}
        </button>
      </div>
      <div style={{ fontSize: 11, color: D.muted, fontFamily: serif, marginBottom: 8 }}>
        {mode === "stream" ? "Each chunk appears as it arrives — you can start processing immediately ↓" : "Nothing appears until ALL chunks are loaded — then everything at once ↓"}
      </div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", minHeight: 44, marginBottom: 10 }}>
        {mode === "stream"
          ? chunks.map(c => <div key={c} style={{ width: 38, height: 38, background: D.greenBg, border: `1px solid ${D.green}`, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: D.greenText, fontFamily: mono }}>{c + 1}</div>)
          : running
            ? <div style={{ fontSize: 12, color: D.yellow, fontFamily: mono, padding: "8px 0" }}>⏳ loading all {total} chunks... you are stuck waiting</div>
            : chunks.map(c => <div key={c} style={{ width: 38, height: 38, background: D.yellow + "22", border: `1px solid ${D.yellow}55`, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: D.yellow, fontFamily: mono }}>{c + 1}</div>)}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 160, padding: "8px 10px", background: D.greenBg, border: `1px solid ${D.green}22`, borderRadius: 6 }}>
          <div style={{ fontSize: 10, color: D.greenText, fontFamily: mono, marginBottom: 3 }}>✅ STREAM — always use for large data</div>
          <div style={{ fontSize: 11, color: D.muted, fontFamily: serif }}>64KB at a time. A 4GB file uses ~100KB RAM. Can start processing immediately.</div>
        </div>
        <div style={{ flex: 1, minWidth: 160, padding: "8px 10px", background: D.red + "08", border: `1px solid ${D.red}22`, borderRadius: 6 }}>
          <div style={{ fontSize: 10, color: D.red, fontFamily: mono, marginBottom: 3 }}>❌ BUFFER — dangerous for large files</div>
          <div style={{ fontSize: 11, color: D.muted, fontFamily: serif }}>Loads everything into RAM first. A 4GB file needs 4GB RAM — process crashes.</div>
        </div>
      </div>
    </div>
  );
}
