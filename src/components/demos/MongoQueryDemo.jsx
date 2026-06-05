import { useState } from "react";
import { D, mono } from "../../tokens";

export default function MongoQueryDemo() {
  const [query, setQuery] = useState("find");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const db = [
    { _id: "1", name: "Alice", age: 28, role: "admin", city: "Mumbai", score: 95 },
    { _id: "2", name: "Bob", age: 35, role: "user", city: "Delhi", score: 72 },
    { _id: "3", name: "Carol", age: 22, role: "user", city: "Mumbai", score: 88 },
    { _id: "4", name: "Dave", age: 41, role: "admin", city: "Pune", score: 60 },
    { _id: "5", name: "Eve", age: 29, role: "user", city: "Mumbai", score: 91 },
  ];
  const queries = {
    find: { label: "find({ city: 'Mumbai' })", fn: () => db.filter(d => d.city === "Mumbai") },
    filter: { label: "find({ age: { $gte: 28 }, role: 'user' })", fn: () => db.filter(d => d.age >= 28 && d.role === "user") },
    sort: { label: "find().sort({ score: -1 }).limit(3)", fn: () => [...db].sort((a,b) => b.score - a.score).slice(0,3) },
    project: { label: "find({}, { name:1, score:1, _id:0 })", fn: () => db.map(({ name, score }) => ({ name, score })) },
    aggregate: { label: "aggregate: $group by city → avg score", fn: () => {
      const groups = {};
      db.forEach(d => { if (!groups[d.city]) groups[d.city] = []; groups[d.city].push(d.score); });
      return Object.entries(groups).map(([city, scores]) => ({ city, avgScore: Math.round(scores.reduce((a,b)=>a+b,0)/scores.length), count: scores.length }));
    }},
  };
  const run = async () => {
    setRunning(true); setResult(null);
    await new Promise(r => setTimeout(r, 400));
    setResult(queries[query].fn());
    setRunning(false);
  };
  return (
    <div style={{ padding: 14, background: D.surfaceLowest, border: `1px solid ${D.outline}`, borderRadius: 10 }}>
      <div style={{ fontSize: 10, color: D.muted, fontFamily: mono, letterSpacing: 1, marginBottom: 10 }}>🧪 LIVE — run MongoDB queries against sample data</div>
      <div style={{ marginBottom: 10, padding: "8px 10px", background: D.surface, borderRadius: 6, fontSize: 10, fontFamily: mono, color: D.muted }}>
        Collection: users (5 documents) — Alice, Bob, Carol, Dave, Eve
      </div>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
        {Object.entries(queries).map(([k, v]) => (
          <button key={k} onClick={() => { setQuery(k); setResult(null); }} style={{ padding: "5px 10px", background: query === k ? "#14b8a622" : "transparent", border: `1px solid ${query === k ? "#14b8a6" : D.outline}`, color: query === k ? "#14b8a6" : D.muted, borderRadius: 5, cursor: "pointer", fontSize: 10, fontFamily: mono }}>{k}</button>
        ))}
      </div>
      <div style={{ padding: "8px 12px", background: "#14b8a608", border: "1px solid #14b8a633", borderRadius: 6, marginBottom: 10, fontFamily: mono, fontSize: 11, color: "#14b8a6" }}>
        User.{queries[query].label}
      </div>
      <button onClick={run} disabled={running} style={{ padding: "6px 14px", background: "#14b8a6", color: "#fff", border: "none", borderRadius: 5, cursor: running ? "default" : "pointer", fontSize: 11, fontFamily: mono, marginBottom: 10, opacity: running ? 0.7 : 1 }}>
        {running ? "Querying…" : "▶ Execute Query"}
      </button>
      {result && (
        <div style={{ background: D.surface, border: `1px solid ${D.outline}`, borderRadius: 6, padding: "10px 12px" }}>
          <div style={{ fontSize: 10, color: D.muted, fontFamily: mono, marginBottom: 6 }}>RESULT — {result.length} document{result.length !== 1 ? "s" : ""}</div>
          {result.map((r, i) => (
            <div key={i} style={{ fontFamily: mono, fontSize: 11, color: D.text, padding: "3px 0", borderBottom: i < result.length - 1 ? `1px solid ${D.outline}` : "none" }}>
              {JSON.stringify(r)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
