import { useState } from "react";
import { D, mono } from "../../tokens";

export default function TestRunnerDemo() {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState([]);
  const [passed, setPassed] = useState(0);
  const [failed, setFailed] = useState(0);

  const tests = [
    { name: "add(2, 3) returns 5", fn: () => 2 + 3 === 5, expected: true },
    { name: "divide(10, 2) returns 5", fn: () => 10 / 2 === 5, expected: true },
    { name: "divide(10, 0) throws", fn: () => { try { 10 / 0; return false; } catch (e) { return true; } }, expected: true },
    { name: "isEven(4) returns true", fn: () => 4 % 2 === 0, expected: true },
    { name: "isEven(3) returns false", fn: () => 3 % 2 === 0, expected: false },
    { name: "array contains 'hello'", fn: () => ['hello', 'world'].includes('hello'), expected: true },
  ];

  const run = async () => {
    setRunning(true);
    setResults([]);
    setPassed(0);
    setFailed(0);
    let p = 0, f = 0;
    for (let i = 0; i < tests.length; i++) {
      await new Promise(r => setTimeout(r, 400));
      const ok = tests[i].fn() === tests[i].expected;
      if (ok) p++; else f++;
      setResults(prev => [...prev, { ...tests[i], ok }]);
      setPassed(p);
      setFailed(f);
    }
    setRunning(false);
  };

  return (
    <div style={{ padding: 14, background: D.surfaceLowest, border: `1px solid ${D.outline}`, borderRadius: 10 }}>
      <div style={{ fontSize: 10, color: D.muted, fontFamily: mono, letterSpacing: 1, marginBottom: 10 }}>🧪 LIVE — mini test runner</div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
        <button onClick={run} disabled={running}
          style={{ padding: "6px 16px", background: running ? D.muted + "18" : D.greenBg, border: `1px solid ${running ? D.outline : D.green}`, color: running ? D.muted : D.greenText, borderRadius: 5, cursor: running ? "default" : "pointer", fontSize: 11, fontFamily: mono }}>
          {running ? "● running..." : "▶ Run 6 tests"}
        </button>
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{ fontSize: 11, color: D.greenText, fontFamily: mono, fontWeight: 700 }}>✓ {passed}</span>
          <span style={{ fontSize: 11, color: D.red, fontFamily: mono, fontWeight: 700 }}>✗ {failed}</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {results.map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 8, padding: "6px 10px", background: r.ok ? D.greenBg : D.red + "0a", border: `1px solid ${r.ok ? D.green + "33" : D.red + "33"}`, borderRadius: 5, transition: "all 0.3s" }}>
            <span style={{ fontSize: 12, flexShrink: 0 }}>{r.ok ? "✅" : "❌"}</span>
            <span style={{ fontSize: 11, color: r.ok ? D.greenText : D.red, fontFamily: mono }}>{r.name}</span>
          </div>
        ))}
        {results.length === 0 && <span style={{ fontSize: 11, color: D.muted, fontFamily: mono }}>press Run to execute tests</span>}
      </div>
    </div>
  );
}
