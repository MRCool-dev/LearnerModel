import { useState } from "react";
import { D, mono, serif } from "../../tokens";

export default function EventLoopDemo() {
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState([]);

  const steps = [
    { label: "console.log('1 — sync') executes", phase: "sync", color: "#3b82f6", out: "1 — sync", desc: "Synchronous code always runs first. It goes straight onto the Call Stack and executes immediately." },
    { label: "setTimeout(fn, 0) is registered", phase: "sync", color: "#3b82f6", out: null, desc: "Node hands the timer to the OS. It says 'run this callback after 0ms'. Node does NOT wait — it moves on immediately." },
    { label: "Promise.resolve().then(fn) queued", phase: "sync", color: "#3b82f6", out: null, desc: "The Promise callback is added to the Microtask Queue — a high-priority queue that runs before any timers." },
    { label: "console.log('2 — sync') executes", phase: "sync", color: "#3b82f6", out: "2 — sync", desc: "Still synchronous. All sync code on the Call Stack finishes before ANY async callback can run." },
    { label: "▶ Call Stack empty — check Microtask Queue", phase: "micro", color: "#8b5cf6", out: null, desc: "The Call Stack is now empty. The Event Loop checks: are there any Microtasks (Promises, nextTick)? Yes!" },
    { label: "Promise .then callback fires", phase: "micro", color: "#8b5cf6", out: "3 — promise", desc: "ALL microtasks drain completely. Promises always beat setTimeout. This is critical to understand." },
    { label: "▶ Microtasks empty — check Timer Queue", phase: "macro", color: "#f59e0b", out: null, desc: "No more microtasks. The Event Loop moves to the Timer phase — checking for expired setTimeouts." },
    { label: "setTimeout callback finally fires", phase: "macro", color: "#f59e0b", out: "4 — timeout", desc: "Only now does the setTimeout run. Even though we said 0ms, it had to wait for all sync code AND all microtasks first." },
  ];

  const run = async () => {
    setRunning(true); setStep(-1); setOutput([]);
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 800));
      setStep(i);
      if (steps[i].out) setOutput(p => [...p, { text: steps[i].out, color: steps[i].color }]);
    }
    setRunning(false);
  };

  return (
    <div style={{ padding: 14, background: D.surfaceLowest, border: `1px solid ${D.outline}`, borderRadius: 10 }}>
      <div style={{ fontSize: 10, color: D.muted, fontFamily: mono, letterSpacing: 1, marginBottom: 10 }}>🧪 LIVE — watch exactly what runs and when</div>
      <div style={{ background: D.surface, borderRadius: 7, padding: "10px 14px", marginBottom: 12, fontFamily: mono, fontSize: 11 }}>
        <div style={{ color: D.muted }}>{"// What does this print? And in what order?"}</div>
        {[
          { t: "console.log('1 — sync');", c: "#3b82f6" },
          { t: "setTimeout(() => console.log('4 — timeout'), 0);", c: "#f59e0b" },
          { t: "Promise.resolve().then(() => console.log('3 — promise'));", c: "#8b5cf6" },
          { t: "console.log('2 — sync');", c: "#3b82f6" },
        ].map((l, i) => <div key={i} style={{ color: l.c, padding: "1px 0" }}>{l.t}</div>)}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "7px 10px", background: step === i ? s.color + "15" : step > i ? s.color + "07" : D.surface, border: `1px solid ${step >= i ? s.color + "40" : D.outline}`, borderRadius: 6, transition: "all 0.35s" }}>
            <span style={{ fontSize: 14, width: 20, flexShrink: 0 }}>{step > i ? "✅" : step === i ? "⏳" : "○"}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: step >= i ? s.color : D.muted, fontFamily: mono, fontWeight: step === i ? 700 : 400 }}>{s.label}</div>
              {step === i && <div style={{ fontSize: 11, color: D.muted, fontFamily: serif, marginTop: 4, lineHeight: 1.6 }}>{s.desc}</div>}
            </div>
            <span style={{ fontSize: 9, padding: "2px 7px", background: (step >= i ? s.color : D.muted) + "18", borderRadius: 3, color: step >= i ? s.color : D.muted, fontFamily: mono, flexShrink: 0, alignSelf: "flex-start" }}>{s.phase}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={run} disabled={running}
          style={{ padding: "6px 16px", background: running ? D.muted + "18" : D.greenBg, border: `1px solid ${running ? D.outline : D.green}`, color: running ? D.muted : D.greenText, borderRadius: 5, cursor: running ? "default" : "pointer", fontSize: 11, fontFamily: mono }}>
          {running ? "● running..." : "▶ Run it"}
        </button>
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, color: D.muted, fontFamily: mono }}>console output:</span>
          {output.length === 0 ? <span style={{ fontSize: 10, color: D.muted, fontFamily: mono }}>press Run ▶</span>
            : output.map((o, i) => <span key={i} style={{ fontSize: 11, fontWeight: 700, color: o.color, fontFamily: mono, padding: "2px 8px", background: o.color + "18", borderRadius: 3 }}>{o.text}</span>)}
        </div>
      </div>
    </div>
  );
}
