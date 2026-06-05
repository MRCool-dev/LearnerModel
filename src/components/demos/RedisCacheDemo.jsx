import { useState } from "react";
import { D, mono, serif } from "../../tokens";

export default function RedisCacheDemo() {
  const [cache, setCache] = useState({});
  const [log, setLog] = useState([]);
  const [key, setKey] = useState("user:1");
  const [dbHits, setDbHits] = useState(0);
  const [cacheHits, setCacheHits] = useState(0);
  const db = { "user:1": { name: "Alice", role: "admin" }, "user:2": { name: "Bob", role: "user" }, "post:1": { title: "Node.js Guide" } };
  const addLog = (msg, color) => setLog(p => [...p.slice(-6), { msg, color }]);
  const get = async () => {
    if (cache[key]) {
      setCacheHits(p => p+1);
      addLog(`CACHE HIT  "${key}" → ${JSON.stringify(cache[key])}`, D.green);
    } else {
      addLog(`CACHE MISS "${key}" — querying DB…`, "#f59e0b");
      await new Promise(r => setTimeout(r, 500));
      const val = db[key];
      if (val) {
        setCache(p => ({...p, [key]: val}));
        setDbHits(p => p+1);
        addLog(`DB HIT     "${key}" → stored in cache (TTL 60s)`, "#3b82f6");
      } else {
        addLog(`DB MISS    "${key}" — not found`, D.red);
      }
    }
  };
  const invalidate = () => {
    setCache(p => { const n={...p}; delete n[key]; return n; });
    addLog(`INVALIDATED "${key}" — removed from cache`, "#ec4899");
  };
  const flush = () => { setCache({}); addLog("FLUSH — all cache cleared", D.red); };
  return (
    <div style={{ padding: 14, background: D.surfaceLowest, border: `1px solid ${D.outline}`, borderRadius: 10 }}>
      <div style={{ fontSize: 10, color: D.muted, fontFamily: mono, letterSpacing: 1, marginBottom: 10 }}>🧪 LIVE — cache-aside pattern simulator</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        {["user:1","user:2","post:1","user:99"].map(k => (
          <button key={k} onClick={() => setKey(k)} style={{ padding: "4px 10px", fontSize: 10, fontFamily: mono, background: key === k ? "#f43f5e22" : "transparent", border: `1px solid ${key === k ? "#f43f5e" : D.outline}`, color: key === k ? "#f43f5e" : D.muted, borderRadius: 4, cursor: "pointer" }}>{k}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <button onClick={get} style={{ padding: "6px 14px", background: "#f43f5e", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontSize: 11, fontFamily: mono }}>GET "{key}"</button>
        <button onClick={invalidate} style={{ padding: "6px 14px", background: "transparent", border: `1px solid #f43f5e`, color: "#f43f5e", borderRadius: 5, cursor: "pointer", fontSize: 11, fontFamily: mono }}>DEL "{key}"</button>
        <button onClick={flush} style={{ padding: "6px 14px", background: "transparent", border: `1px solid ${D.outline}`, color: D.muted, borderRadius: 5, cursor: "pointer", fontSize: 11, fontFamily: mono }}>FLUSH ALL</button>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <div style={{ flex: 1, padding: "8px 10px", background: D.green + "0a", border: `1px solid ${D.green}33`, borderRadius: 6 }}>
          <div style={{ fontSize: 10, color: D.green, fontFamily: mono }}>REDIS CACHE</div>
          {Object.keys(cache).length === 0 ? <div style={{ fontSize: 10, color: D.muted, fontFamily: mono, marginTop: 4 }}>empty</div> :
            Object.entries(cache).map(([k, v]) => <div key={k} style={{ fontSize: 10, fontFamily: mono, color: D.muted, marginTop: 3 }}>{k}: {JSON.stringify(v)}</div>)}
        </div>
        <div style={{ padding: "8px 10px", background: D.surface, border: `1px solid ${D.outline}`, borderRadius: 6, minWidth: 100 }}>
          <div style={{ fontSize: 10, color: D.green, fontFamily: mono }}>✅ Cache: {cacheHits}</div>
          <div style={{ fontSize: 10, color: "#3b82f6", fontFamily: mono, marginTop: 3 }}>🗄 DB: {dbHits}</div>
        </div>
      </div>
      <div style={{ background: "#000", borderRadius: 6, padding: "8px 10px", minHeight: 60 }}>
        {log.map((l, i) => <div key={i} style={{ fontSize: 10, fontFamily: mono, color: l.color, lineHeight: 1.8 }}>{l.msg}</div>)}
      </div>
    </div>
  );
}
