import { useState } from "react";
import { D, mono } from "../../tokens";

export default function PoolDemo() {
  const [poolSize, setPoolSize] = useState(5);
  const [requests, setRequests] = useState([]);
  const [running, setRunning] = useState(false);

  const run = async () => {
    setRunning(true);
    setRequests([]);
    const total = 12;
    const delay = 400;
    const active = new Set();
    const queue = [];

    for (let i = 0; i < total; i++) {
      await new Promise(r => setTimeout(r, delay));
      const id = i + 1;
      if (active.size < poolSize) {
        active.add(id);
        setRequests(prev => [...prev, { id, status: 'active', conn: Array.from(active).indexOf(id) + 1 }]);
        setTimeout(() => {
          setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'done' } : r));
          active.delete(id);
          if (queue.length > 0) {
            const next = queue.shift();
            active.add(next);
            setRequests(prev => prev.map(r => r.id === next ? { ...r, status: 'active', conn: Array.from(active).indexOf(next) + 1 } : r));
            setTimeout(() => {
              setRequests(prev => prev.map(r => r.id === next ? { ...r, status: 'done' } : r));
              active.delete(next);
            }, 600);
          }
        }, 600);
      } else {
        queue.push(id);
        setRequests(prev => [...prev, { id, status: 'waiting' }]);
        setTimeout(() => {
          setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'active', conn: Array.from(active).indexOf(id) + 1 } : r));
          setTimeout(() => {
            setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'done' } : r));
            active.delete(id);
          }, 600);
        }, queue.length * 600);
      }
    }
    await new Promise(r => setTimeout(r, 3000));
    setRunning(false);
  };

  return (
    <div style={{ padding: 14, background: D.surfaceLowest, border: `1px solid ${D.outline}`, borderRadius: 10 }}>
      <div style={{ fontSize: 10, color: D.muted, fontFamily: mono, letterSpacing: 1, marginBottom: 10 }}>🧪 LIVE — connection pool simulator</div>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, color: D.muted, fontFamily: mono }}>Pool size:</span>
        {[3, 5, 10].map(n => (
          <button key={n} onClick={() => { setPoolSize(n); setRequests([]); }} disabled={running}
            style={{ padding: "3px 10px", background: poolSize === n ? D.greenBg : "transparent", border: `1px solid ${poolSize === n ? D.green : D.outline}`, color: poolSize === n ? D.greenText : D.muted, borderRadius: 4, cursor: "pointer", fontSize: 11, fontFamily: mono }}>{n}</button>
        ))}
        <button onClick={run} disabled={running}
          style={{ padding: "4px 14px", background: running ? D.muted + "18" : D.greenBg, border: `1px solid ${running ? D.outline : D.green}`, color: running ? D.muted : D.greenText, borderRadius: 4, cursor: running ? "default" : "pointer", fontSize: 11, fontFamily: mono }}>
          {running ? "● running..." : "▶ Simulate 12 requests"}
        </button>
      </div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", minHeight: 60, marginBottom: 10 }}>
        {requests.map((r, i) => (
          <div key={i} style={{ width: 50, height: 50, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontFamily: mono, fontWeight: 700, border: `1px solid ${r.status === 'active' ? D.green : r.status === 'waiting' ? D.yellow : D.outline}`, background: r.status === 'active' ? D.greenBg : r.status === 'waiting' ? D.yellow + "18" : D.muted + "08", color: r.status === 'active' ? D.greenText : r.status === 'waiting' ? D.yellow : D.muted }}>
            {r.status === 'active' ? `C${r.conn}` : r.status === 'waiting' ? "⏳" : "✓"}
          </div>
        ))}
        {requests.length === 0 && <span style={{ fontSize: 11, color: D.muted, fontFamily: mono }}>press Simulate to watch pool behavior</span>}
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}><div style={{ width: 12, height: 12, background: D.greenBg, border: `1px solid ${D.green}`, borderRadius: 3 }} /><span style={{ fontSize: 10, color: D.muted, fontFamily: mono }}>Active connection</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}><div style={{ width: 12, height: 12, background: D.yellow + "18", border: `1px solid ${D.yellow}`, borderRadius: 3 }} /><span style={{ fontSize: 10, color: D.muted, fontFamily: mono }}>Waiting in queue</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}><div style={{ width: 12, height: 12, background: D.muted + "08", border: `1px solid ${D.outline}`, borderRadius: 3 }} /><span style={{ fontSize: 10, color: D.muted, fontFamily: mono }}>Done</span></div>
      </div>
    </div>
  );
}
