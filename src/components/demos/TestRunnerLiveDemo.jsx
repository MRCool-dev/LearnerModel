import { useState } from "react";
import { D, mono } from "../../tokens";

export default function TestRunnerLiveDemo() {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState([]);
  const tests = [
    { name: "add(2, 3) === 5", fn: () => 2 + 3 === 5 },
    { name: "add(-1, 1) === 0", fn: () => -1 + 1 === 0 },
    { name: "typeof 'hello' === 'string'", fn: () => typeof "hello" === "string" },
    { name: "[] instanceof Array", fn: () => [] instanceof Array },
    { name: "JSON.parse(JSON.stringify({a:1})).a === 1", fn: () => JSON.parse(JSON.stringify({a:1})).a === 1 },
    { name: "Promise resolves to 42", fn: async () => await Promise.resolve(42) === 42 },
    { name: "null == undefined (loose)", fn: () => null == undefined },
    { name: "null === undefined (strict) — FAILS", fn: () => null === undefined },
  ];
  const run = async () => {
    setRunning(true); setResults([]);
    for (const t of tests) {
      await new Promise(r => setTimeout(r, 350));
      try {
        const ok = await t.fn();
        setResults(p => [...p, { name: t.name, ok, err: null }]);
      } catch (e) {
        setResults(p => [...p, { name: t.name, ok: false, err: e.message }]);
      }
    }
    setRunning(false);
  };
  const passed = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok).length;
  return (
    <div style={{ padding: 14, background: D.surfaceLowest, border: `1px solid ${D.outline}`, borderRadius: 10 }}>
      <div style={{ fontSize: 10, color: D.muted, fontFamily: mono, letterSpacing: 1, marginBottom: 10 }}>🧪 LIVE — watch tests run in real time</div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
        <button onClick={run} disabled={running} style={{ padding: "6px 16px", background: "#f59e0b", color: "#fff", border: "none", borderRadius: 5, cursor: running ? "default" : "pointer", fontSize: 11, fontFamily: mono, opacity: running ? 0.7 : 1 }}>
          {running ? "▶ Running tests…" : "▶ Run Test Suite"}
        </button>
        {results.length > 0 && (
          <>
            <span style={{ fontSize: 11, color: D.green, fontFamily: mono }}>✅ {passed} passed</span>
            <span style={{ fontSize: 11, color: D.red, fontFamily: mono }}>❌ {failed} failed</span>
          </>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {tests.map((t, i) => {
          const r = results[i];
          return (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "7px 10px", background: !r ? D.surface : r.ok ? D.green + "0d" : D.red + "0d", border: `1px solid ${!r ? D.outline : r.ok ? D.green + "44" : D.red + "44"}`, borderRadius: 5, transition: "all 0.3s" }}>
              <span style={{ fontSize: 12, flexShrink: 0, width: 16 }}>{!r ? (running && i === results.length ? "⏳" : "○") : r.ok ? "✅" : "❌"}</span>
              <span style={{ fontSize: 11, fontFamily: mono, color: !r ? D.muted : r.ok ? D.green : D.red }}>{t.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
