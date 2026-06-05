import { useState } from "react";
import { D, mono } from "../../tokens";

export default function SqlQueryDemo() {
  const [query, setQuery] = useState("select");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const users = [
    { id:1, name:"Alice", age:28, city:"Mumbai", dept_id:1 },
    { id:2, name:"Bob",   age:35, city:"Delhi",  dept_id:2 },
    { id:3, name:"Carol", age:22, city:"Mumbai", dept_id:1 },
    { id:4, name:"Dave",  age:41, city:"Pune",   dept_id:2 },
    { id:5, name:"Eve",   age:29, city:"Mumbai", dept_id:3 },
  ];
  const depts = [{ id:1, name:"Engineering" }, { id:2, name:"Design" }];
  const queries = {
    select: { label: "SELECT name, age FROM users WHERE city = 'Mumbai'", fn: () => users.filter(u=>u.city==="Mumbai").map(({name,age})=>({name,age})) },
    orderby: { label: "SELECT * FROM users ORDER BY age DESC LIMIT 3", fn: () => [...users].sort((a,b)=>b.age-a.age).slice(0,3) },
    innerjoin: { label: "SELECT u.name, d.name AS dept FROM users u INNER JOIN depts d ON u.dept_id = d.id", fn: () => users.filter(u=>depts.find(d=>d.id===u.dept_id)).map(u=>({ name:u.name, dept: depts.find(d=>d.id===u.dept_id)?.name||null })) },
    leftjoin: { label: "SELECT u.name, d.name AS dept FROM users u LEFT JOIN depts d ON u.dept_id = d.id", fn: () => users.map(u=>({ name:u.name, dept: depts.find(d=>d.id===u.dept_id)?.name||null })) },
    groupby: { label: "SELECT city, COUNT(*) AS total, AVG(age) AS avg_age FROM users GROUP BY city", fn: () => {
      const g = {};
      users.forEach(u => { if(!g[u.city]) g[u.city]={city:u.city,total:0,ages:[]}; g[u.city].total++; g[u.city].ages.push(u.age); });
      return Object.values(g).map(({city,total,ages})=>({city,total,avg_age:Math.round(ages.reduce((a,b)=>a+b,0)/ages.length)}));
    }},
  };
  const run = async () => {
    setRunning(true); setResult(null);
    await new Promise(r => setTimeout(r, 350));
    setResult(queries[query].fn());
    setRunning(false);
  };
  return (
    <div style={{ padding: 14, background: D.surfaceLowest, border: `1px solid ${D.outline}`, borderRadius: 10 }}>
      <div style={{ fontSize: 10, color: D.muted, fontFamily: mono, letterSpacing: 1, marginBottom: 10 }}>🧪 LIVE — execute SQL queries against sample tables</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <div style={{ fontSize: 10, fontFamily: mono, color: "#3b82f6", padding: "4px 8px", background: "#3b82f60d", borderRadius: 4, border: "1px solid #3b82f622" }}>users (5 rows)</div>
        <div style={{ fontSize: 10, fontFamily: mono, color: "#8b5cf6", padding: "4px 8px", background: "#8b5cf60d", borderRadius: 4, border: "1px solid #8b5cf622" }}>depts (2 rows: Engineering, Design)</div>
      </div>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
        {Object.entries(queries).map(([k]) => (
          <button key={k} onClick={() => { setQuery(k); setResult(null); }} style={{ padding: "5px 10px", background: query === k ? "#3b82f622" : "transparent", border: `1px solid ${query === k ? "#3b82f6" : D.outline}`, color: query === k ? "#3b82f6" : D.muted, borderRadius: 5, cursor: "pointer", fontSize: 10, fontFamily: mono }}>{k}</button>
        ))}
      </div>
      <div style={{ padding: "8px 12px", background: "#3b82f608", border: "1px solid #3b82f633", borderRadius: 6, marginBottom: 10, fontFamily: mono, fontSize: 10, color: "#3b82f6", wordBreak: "break-word" }}>
        {queries[query].label}
      </div>
      <button onClick={run} disabled={running} style={{ padding: "6px 14px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: 5, cursor: running ? "default" : "pointer", fontSize: 11, fontFamily: mono, marginBottom: 10, opacity: running ? 0.7 : 1 }}>
        {running ? "Running…" : "▶ Execute SQL"}
      </button>
      {result && (
        <div style={{ background: D.surface, border: `1px solid ${D.outline}`, borderRadius: 6, padding: "10px 12px", overflowX: "auto" }}>
          <div style={{ fontSize: 10, color: D.muted, fontFamily: mono, marginBottom: 6 }}>RESULT — {result.length} row{result.length !== 1 ? "s" : ""}</div>
          {result.length > 0 && (
            <table style={{ borderCollapse: "collapse", fontFamily: mono, fontSize: 10, width: "100%" }}>
              <thead><tr>{Object.keys(result[0]).map(k => <th key={k} style={{ padding: "4px 10px", background: D.surfaceHighest, color: "#3b82f6", textAlign: "left", borderBottom: `1px solid ${D.outline}` }}>{k}</th>)}</tr></thead>
              <tbody>{result.map((r,i) => <tr key={i}>{Object.values(r).map((v,j) => <td key={j} style={{ padding: "4px 10px", color: D.muted, borderBottom: `1px solid ${D.outline}` }}>{String(v)}</td>)}</tr>)}</tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
