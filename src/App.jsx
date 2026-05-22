import { useState, useRef, useEffect } from "react";
import "./App.css";
import ChartBot from "./ChartBot";

// ══════════════════════════════════════════════════════════════════════════════
// DESIGN SYSTEM TOKENS
// ══════════════════════════════════════════════════════════════════════════════
const D = {
  bg: "var(--surface)",
  surface: "var(--surface-container-low)",
  surfaceHi: "var(--surface-container-high)",
  surfaceHighest: "var(--surface-container-highest)",
  surfaceLowest: "var(--surface-container-lowest)",
  muted: "var(--on-surface-variant)",
  text: "var(--on-surface)",
  primary: "var(--primary)",
  green: "var(--secondary)",
  greenBg: "var(--secondary-container)",
  greenText: "var(--on-secondary-container)",
  yellow: "var(--tertiary)",
  red: "var(--error)",
  outline: "var(--outline-variant)",
};

const mono = "'Inter', monospace";
const display = "'Manrope', sans-serif";
const serif = "'Inter', sans-serif";
const para = { margin: "0 0 12px", fontSize: 13, color: D.muted, lineHeight: 1.95, fontFamily: serif };

// ══════════════════════════════════════════════════════════════════════════════
// PRIMITIVE COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════

function CodeBlock({ label, code }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ margin: "10px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontSize: 10, color: D.muted, letterSpacing: 2, textTransform: "uppercase", fontFamily: mono }}>{label}</span>
        <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
          style={{ background: "transparent", border: `1px solid ${copied ? D.green : D.outline}`, color: copied ? D.green : D.muted, borderRadius: 3, padding: "2px 9px", fontSize: 10, cursor: "pointer", fontFamily: mono }}>
          {copied ? "✓ copied" : "copy"}
        </button>
      </div>
      <pre style={{ margin: 0, padding: "12px 14px", background: D.surfaceLowest, border: `1px solid ${D.outline}`, borderRadius: 7, fontSize: 11, lineHeight: 1.9, overflowX: "auto", color: D.text, fontFamily: mono, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Tip({ icon = "💡", color = D.yellow, title, children }) {
  return (
    <div style={{ margin: "10px 0", padding: "10px 14px", background: color + "10", border: `1px solid ${color}40`, borderLeft: `4px solid ${color}`, borderRadius: "0 7px 7px 0" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color, marginBottom: 3, fontFamily: mono }}>{icon} {title}</div>
      <div style={{ fontSize: 12, color: D.muted, lineHeight: 1.75, fontFamily: serif }}>{children}</div>
    </div>
  );
}

function EasyBox({ emoji, title, color, children }) {
  return (
    <div style={{ margin: "12px 0", padding: "13px 16px", background: color + "09", border: `1px solid ${color}35`, borderRadius: 10 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color, fontFamily: mono, marginBottom: 7 }}>{emoji} {title}</div>
      <div style={{ fontSize: 12, color: D.muted, lineHeight: 1.95, fontFamily: serif }}>{children}</div>
    </div>
  );
}

function BigIdea({ number, title, color, children }) {
  return (
    <div style={{ margin: "12px 0", padding: "14px 16px", background: D.surfaceLowest, border: `1px solid ${color}33`, borderRadius: 10, borderLeft: `4px solid ${color}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: color + "22", border: `1px solid ${color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color, fontFamily: mono, flexShrink: 0 }}>{number}</div>
        <div style={{ fontSize: 13, fontWeight: 700, color, fontFamily: mono }}>{title}</div>
      </div>
      <div style={{ fontSize: 12, color: D.muted, lineHeight: 1.9, fontFamily: serif }}>{children}</div>
    </div>
  );
}

function QuizCard({ question, options, correct, explain }) {
  const [chosen, setChosen] = useState(null);
  return (
    <div style={{ margin: "12px 0", padding: "13px 16px", background: D.surfaceLowest, border: `1px solid ${D.outline}`, borderRadius: 9 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: D.text, fontFamily: serif, marginBottom: 10 }}>❓ {question}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {options.map((opt, i) => {
          const isChosen = chosen === i;
          const isCorrect = i === correct;
          const showResult = chosen !== null;
          let bg = "transparent", border = D.outline, color = D.muted;
          if (showResult && isCorrect) { bg = D.greenBg; border = D.green; color = D.greenText; }
          else if (showResult && isChosen && !isCorrect) { bg = D.red + "18"; border = D.red; color = D.red; }
          return (
            <button key={i} onClick={() => chosen === null && setChosen(i)}
              style={{ padding: "7px 12px", background: bg, border: `1px solid ${border}`, borderRadius: 5, cursor: chosen === null ? "pointer" : "default", textAlign: "left", fontSize: 12, color, fontFamily: serif, transition: "all 0.2s" }}>
              {showResult && isCorrect ? "✅ " : showResult && isChosen ? "❌ " : "○ "}{opt}
            </button>
          );
        })}
      </div>
      {chosen !== null && (
        <div style={{ marginTop: 10, padding: "8px 10px", background: D.greenBg, border: `1px solid ${D.green}22`, borderRadius: 5, fontSize: 11, color: D.muted, fontFamily: serif, lineHeight: 1.7 }}>
          💬 {explain}
        </div>
      )}
      {chosen !== null && <button onClick={() => setChosen(null)} style={{ marginTop: 8, padding: "3px 10px", background: "transparent", border: `1px solid ${D.outline}`, borderRadius: 4, cursor: "pointer", fontSize: 10, color: D.muted, fontFamily: mono }}>reset</button>}
    </div>
  );
}

function CaseStudy({ title, color, scenario, problem, solution, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ margin: "12px 0", border: `1px solid ${color}33`, borderRadius: 9, overflow: "hidden" }}>
      <button onClick={() => setOpen(p => !p)} style={{ width: "100%", padding: "11px 14px", background: color + "0d", border: "none", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 16 }}>📖</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color, fontFamily: mono }}>{title}</div>
          <div style={{ fontSize: 11, color: D.muted, fontFamily: serif }}>{scenario}</div>
        </div>
        <span style={{ color, fontSize: 11, fontFamily: mono }}>{open ? "▲ close" : "▼ open"}</span>
      </button>
      {open && (
        <div style={{ padding: "14px 16px", borderTop: `1px solid ${color}22` }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
            <div style={{ flex: 1, minWidth: 140, padding: "10px 12px", background: D.red + "0a", border: `1px solid ${D.red}22`, borderRadius: 7 }}>
              <div style={{ fontSize: 10, color: D.red, fontFamily: mono, marginBottom: 4 }}>❌ PROBLEM</div>
              <div style={{ fontSize: 11, color: D.muted, fontFamily: serif, lineHeight: 1.7 }}>{problem}</div>
            </div>
            <div style={{ flex: 1, minWidth: 140, padding: "10px 12px", background: D.greenBg, border: `1px solid ${D.green}22`, borderRadius: 7 }}>
              <div style={{ fontSize: 10, color: D.greenText, fontFamily: mono, marginBottom: 4 }}>✅ SOLUTION</div>
              <div style={{ fontSize: 11, color: D.muted, fontFamily: serif, lineHeight: 1.7 }}>{solution}</div>
            </div>
          </div>
          {children}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// LIVE DEMOS
// ══════════════════════════════════════════════════════════════════════════════

function EventLoopDemo() {
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

function StreamDemo() {
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

// ══════════════════════════════════════════════════════════════════════════════
// SECTION: WHAT IS NODE.JS
// ══════════════════════════════════════════════════════════════════════════════
function SectionWhatIsNode() {
  const [tab, setTab] = useState("story");
  const tabs = [
    { id: "story", label: "📖 The Story" },
    { id: "how", label: "⚙️ How it works" },
    { id: "browser", label: "🔀 Browser vs Node" },
    { id: "why", label: "🎯 Why use it?" },
    { id: "quiz", label: "🧠 Quick Quiz" },
  ];

  return (
    <div>
      <p style={para}>Before we write a single line of Node.js code, you need to understand <em>what it actually is</em>, <em>how it came to exist</em>, and <em>why it works the way it does</em>.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? D.greenBg : "transparent", border: `1px solid ${tab === t.id ? D.green : D.outline}`, color: tab === t.id ? D.greenText : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "story" && (
        <div>
          <BigIdea number="1" title="JavaScript was only for browsers" color="#3b82f6">When JavaScript was invented in 1995, it had one job: run inside web browsers to make web pages interactive. If you wanted to do anything on a <em>server</em> — read files, handle HTTP requests, talk to a database — you used a completely different language. Python. Ruby. Java. PHP. JavaScript couldn't do any of that. It was trapped inside the browser.</BigIdea>
          <BigIdea number="2" title="Ryan Dahl had a problem in 2009" color="#f59e0b">A developer named Ryan Dahl was frustrated. Traditional server languages handled each incoming request by creating a new thread — imagine a bank with one teller per customer. Threads are expensive (each costs ~1MB of RAM). When traffic spikes, you run out of threads and new requests wait in line. The server slows to a crawl.</BigIdea>
          <BigIdea number="3" title="His insight: JavaScript was already async" color="#8b5cf6">Ryan noticed that JavaScript in the browser was already designed around asynchronous, non-blocking patterns. You don't freeze the page waiting for an image to load — you set a callback and move on. What if you took that model and put it on a server?</BigIdea>
          <BigIdea number="4" title="Node.js was born" color={D.green}>In 2009, Ryan Dahl took Google's V8 engine, combined it with a C library called libuv, added built-in modules for file system, networking, and HTTP, and called it <strong>Node.js</strong>. JavaScript could now run on servers — and it was <em>fast</em>.</BigIdea>
          <EasyBox emoji="🎯" title="What Node.js actually is — one sentence" color={D.green}><strong>Node.js is a runtime environment</strong> — a program on your computer that can read and execute JavaScript files, giving that JavaScript access to your computer's file system, network, and other operating system features that browsers would never allow.</EasyBox>
          <Tip icon="🔑" color={D.yellow} title="Key insight">Node.js is NOT a framework and NOT a programming language. It's a runtime — like how the JVM lets you run Java on your computer, Node.js lets you run JavaScript on your computer (or server) outside of any browser.</Tip>
        </div>
      )}
      {tab === "how" && (
        <div>
          <p style={para}>Node.js has three main layers working together.</p>
          {[
            { layer: "Layer 1 — V8 Engine", color: "#3b82f6", icon: "⚙️", what: "Google's JavaScript engine, written in C++. This is the exact same engine inside Chrome. It takes your JavaScript code and compiles it to machine code that your CPU can run directly.", analogy: "V8 is like a translator who takes your JavaScript words and speaks them in the CPU's native language in real time.", facts: ["Written in C++ for maximum performance", "Uses JIT compilation — watches which code runs often and optimises it", "Handles garbage collection automatically", "You never interact with V8 directly"] },
            { layer: "Layer 2 — libuv", color: "#f59e0b", icon: "🔄", what: "A C library that gives Node its async superpowers. It provides the Event Loop, a thread pool for expensive I/O operations, and cross-platform support.", analogy: "libuv is the factory floor manager. When a task like reading a file comes in, libuv hands it to a worker and keeps a note. When the worker finishes, libuv delivers the result back to your JavaScript.", facts: ["Thread pool has 4 threads by default", "File reads, DNS lookups, and crypto operations use the thread pool", "The Event Loop itself runs on the main thread", "Network I/O uses OS-level async (epoll/kqueue)"] },
            { layer: "Layer 3 — Node.js APIs", color: "#3b82f6", icon: "📦", what: "The built-in modules you use daily — fs, http, path, crypto, os, events, stream, child_process. These are JavaScript wrappers around V8 and libuv.", analogy: "If V8 is the engine and libuv is the transmission, Node.js APIs are the steering wheel and pedals.", facts: ["All built-in — no npm install needed", "fs wraps libuv file operations", "http wraps libuv TCP/networking", "crypto wraps OpenSSL", "child_process wraps OS process creation"] },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 12, padding: "14px 16px", background: item.color + "08", border: `1px solid ${item.color}25`, borderRadius: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: item.color, fontFamily: mono, marginBottom: 8 }}>{item.icon} {item.layer}</div>
              <p style={{ ...para, marginBottom: 8 }}>{item.what}</p>
              <div style={{ padding: "7px 10px", background: item.color + "0a", border: `1px solid ${item.color}22`, borderRadius: 6, marginBottom: 8 }}>
                <div style={{ fontSize: 11, color: item.color, fontFamily: mono, marginBottom: 3 }}>🧠 Mental model</div>
                <div style={{ fontSize: 12, color: D.muted, fontFamily: serif, lineHeight: 1.7 }}>{item.analogy}</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 4 }}>
                {item.facts.map((f, j) => (
                  <div key={j} style={{ display: "flex", gap: 7 }}>
                    <span style={{ color: item.color, fontSize: 10, marginTop: 3, flexShrink: 0 }}>▸</span>
                    <span style={{ fontSize: 11, color: D.muted, fontFamily: serif, lineHeight: 1.6 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <CodeBlock label="the full architecture" code={`Your JavaScript Code (app.js)
         ↓
Node.js Built-in APIs  ← fs, http, crypto, path, os...
         ↓
V8 Engine              ← parses + compiles your JavaScript
         ↓
libuv                  ← Event Loop + thread pool + async I/O
         ↓
Operating System       ← Linux / macOS / Windows kernel`} />
        </div>
      )}
      {tab === "browser" && (
        <div>
          <p style={para}>JavaScript runs in two very different environments. The <em>language itself</em> is identical in both. But the environment gives them completely different powers.</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
            <div style={{ flex: 1, minWidth: 200, padding: "14px 16px", background: "#3b82f608", border: `1px solid #3b82f625`, borderRadius: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#3b82f6", fontFamily: mono, marginBottom: 10 }}>🌐 Browser JavaScript</div>
              {["window → browser tab size, URL, history", "document → HTML page elements", "localStorage → store small data", "fetch() → HTTP requests", "navigator → browser info, GPS, camera"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 8, padding: "4px 0", borderBottom: `1px solid ${D.outline}` }}>
                  <code style={{ fontSize: 11, color: "#3b82f6", fontFamily: mono, minWidth: 130 }}>{item.split(" → ")[0]}</code>
                  <span style={{ fontSize: 11, color: D.muted }}>{item.split(" → ")[1]}</span>
                </div>
              ))}
              <div style={{ marginTop: 8, fontSize: 11, color: D.red + "aa" }}>❌ Cannot access files, cannot create servers</div>
            </div>
            <div style={{ flex: 1, minWidth: 200, padding: "14px 16px", background: D.greenBg, border: `1px solid ${D.green}25`, borderRadius: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: D.greenText, fontFamily: mono, marginBottom: 10 }}>🟢 Node.js JavaScript</div>
              {["fs → read, write, delete files", "http → create servers", "path → build file paths", "os → CPU info, RAM, hostname", "crypto → hashing, encryption", "child_process → run shell commands", "stream → process large data chunk by chunk"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 8, padding: "4px 0", borderBottom: `1px solid ${D.outline}` }}>
                  <code style={{ fontSize: 11, color: D.greenText, fontFamily: mono, minWidth: 130 }}>{item.split(" → ")[0]}</code>
                  <span style={{ fontSize: 11, color: D.muted }}>{item.split(" → ")[1]}</span>
                </div>
              ))}
              <div style={{ marginTop: 8, fontSize: 11, color: D.red + "aa" }}>❌ No window, no document, no DOM</div>
            </div>
          </div>
        </div>
      )}
      {tab === "why" && (
        <div>
          {[
            { title: "One language for everything", color: "#06b6d4", icon: "🔗", desc: "Before Node.js, you'd write Python or Ruby on the server and JavaScript in the browser. Two languages, two mental contexts. With Node.js, your entire stack can all be JavaScript." },
            { title: "Non-blocking I/O", color: "#f59e0b", icon: "⚡", desc: "A Node.js server with a single thread can handle 10,000+ simultaneous connections. A traditional threaded server might create 10,000 threads (~1MB each = 10GB RAM). Node hands each connection's I/O to the OS and immediately moves on." },
            { title: "npm ecosystem", color: "#8b5cf6", icon: "📦", desc: "npm has over 2 million packages. Need to send emails? Validate forms? Connect to a database? Almost every problem has a ready-made package." },
            { title: "Perfect for APIs and real-time", color: D.green, icon: "🌐", desc: "Node.js excels at I/O-heavy workloads — REST APIs, GraphQL, WebSocket servers, microservices, streaming. Netflix, LinkedIn, Uber, and PayPal all use Node.js." },
            { title: "When NOT to use Node.js", color: D.red, icon: "⚠️", desc: "Node.js is NOT good at CPU-intensive work — image processing, machine learning, video encoding. Because JS runs on one thread, a heavy CPU task blocks ALL other requests." },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 10, padding: "13px 16px", background: item.color + "08", border: `1px solid ${item.color}25`, borderRadius: 9 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: mono, marginBottom: 7 }}>{item.icon} {item.title}</div>
              <p style={{ ...para, marginBottom: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What is Node.js?" options={["A JavaScript framework like React", "A runtime environment that runs JavaScript outside the browser", "A database for JavaScript applications", "A JavaScript version newer than ES6"]} correct={1} explain="Node.js is a runtime — a program that can execute JavaScript files on your computer or server, outside any browser. It's not a framework, not a language, not a database." />
          <QuizCard question="Which company created the V8 engine?" options={["Microsoft", "Mozilla", "Google", "Ryan Dahl"]} correct={2} explain="Google created V8 as the engine for Chrome. Ryan Dahl took V8 and wrapped it with libuv and Node APIs to create Node.js in 2009." />
          <QuizCard question="Which can you do in Node.js but NOT in browser JS?" options={["Use Promises", "Read files from the hard drive", "Use async/await", "Create arrays and objects"]} correct={1} explain="Reading files requires access to the OS file system — something browsers block for security. Node.js provides the fs module for this." />
          <QuizCard question="What does 'non-blocking I/O' mean?" options={["Node.js runs I/O operations very quickly", "Node.js doesn't wait for I/O to finish before continuing", "Node.js prevents I/O errors", "Node.js uses multiple threads for I/O"]} correct={1} explain="Non-blocking means Node hands the I/O task to the OS and immediately moves on to the next line of code. When the I/O finishes, Node runs your callback." />
          <QuizCard question="When should you NOT use Node.js?" options={["For building REST APIs", "For real-time chat applications", "For CPU-intensive tasks like image processing or ML", "For handling many concurrent connections"]} correct={2} explain="Node's single-threaded JS execution means CPU-heavy work blocks all other requests. For image processing, video encoding, or ML — use Python, Go, or worker_threads." />
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION: EVENT LOOP
// ══════════════════════════════════════════════════════════════════════════════
function SectionEventLoop() {
  const [tab, setTab] = useState("problem");
  const tabs = [
    { id: "problem", label: "😩 The Problem" },
    { id: "solution", label: "💡 The Solution" },
    { id: "phases", label: "🔄 Loop Phases" },
    { id: "order", label: "📊 Execution Order" },
    { id: "demo", label: "🧪 Live Demo" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>The Event Loop is the single most important concept in Node.js. If you understand this deeply, everything else makes sense.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? D.yellow + "22" : "transparent", border: `1px solid ${tab === t.id ? D.yellow : D.outline}`, color: tab === t.id ? D.yellow : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "problem" && (
        <div>
          <BigIdea number="1" title="Traditional servers: one thread per request" color={D.red}>Imagine a restaurant where every customer gets their own dedicated waiter who stands with them the entire meal and does nothing else. The waiter is "blocked". If 1,000 customers arrive, you need 1,000 waiters. Each waiter costs about 1MB of RAM. 1,000 threads = 1GB RAM just for waiting.</BigIdea>
          <BigIdea number="2" title="The problem with threads for I/O" color="#f59e0b">In a web server, most of the time is spent doing I/O — waiting for a database, waiting for a file read. The actual CPU work takes microseconds. But the thread is blocked the entire time, doing nothing, consuming resources. This is catastrophically wasteful.</BigIdea>
          <CodeBlock label="the traditional blocking model" code={`// Request 1 arrives → create Thread 1
Thread 1: SELECT * FROM users WHERE id = 1;
Thread 1: waiting... waiting... (50ms doing nothing)
Thread 1: got result → send response → thread freed

// Request 10,000 arrives → create Thread 10,000
// System runs out of memory. New requests time out. Server dies.

// Each thread costs: ~1MB RAM
// 10,000 concurrent users = 10GB RAM just for threads`} />
        </div>
      )}
      {tab === "solution" && (
        <div>
          <BigIdea number="1" title="Node's answer: one smart waiter" color={D.green}>There's ONE extremely efficient waiter. When a customer orders, the waiter writes it down, gives the order to the kitchen, and immediately walks to the next customer. The waiter never waits. One waiter serves hundreds of customers because they never block.</BigIdea>
          <BigIdea number="2" title="How Node.js does this" color="#3b82f6">Node.js has one JavaScript thread. When you call fs.readFile(), Node writes down your callback, hands the actual file read to the OS, and immediately runs the next line of code. When the OS finishes, it puts your callback in a queue. The Event Loop picks it up and runs it. No blocking. No waiting.</BigIdea>
          <EasyBox emoji="🔄" title="The Event Loop in plain English" color="#f59e0b">The Event Loop is just a loop that keeps asking: <strong>"Is the Call Stack empty?"</strong> → If yes: <strong>"Is there anything in the Microtask Queue?"</strong> → If yes: run it. → <strong>"Any setTimeout callbacks ready?"</strong> → repeat forever. That's it.</EasyBox>
        </div>
      )}
      {tab === "phases" && (
        <div>
          {[
            { phase: "timers", color: "#f59e0b", icon: "⏰", desc: "Runs callbacks from setTimeout() and setInterval() whose time has expired. Note: only guarantees a MINIMUM delay.", example: "setTimeout(fn, 100) → runs here, after ≥100ms" },
            { phase: "pending I/O", color: "#3b82f6", icon: "📥", desc: "I/O callbacks deferred from the previous loop iteration. Rarely something you interact with directly.", example: "Internal: certain system errors" },
            { phase: "idle / prepare", color: D.muted, icon: "💤", desc: "Internal use only. Node uses this internally between phases.", example: "Internal Node.js mechanics only" },
            { phase: "poll", color: D.green, icon: "🔍", desc: "The most important phase. Retrieves new I/O events. Executes their callbacks. If queue is empty and no timers, Node WAITS here for new I/O events.", example: "fs.readFile callback runs here, HTTP responses run here" },
            { phase: "check", color: "#8b5cf6", icon: "✓", desc: "Runs setImmediate() callbacks. Always runs after the poll phase completes.", example: "setImmediate(fn) → runs here" },
            { phase: "close events", color: D.red, icon: "🔒", desc: "Close event callbacks — when a socket or file handle is abruptly closed.", example: "socket.on('close', ...) runs here" },
            { phase: "⚡ microtasks", color: "#06b6d4", icon: "⚡", desc: "Microtasks run BETWEEN every phase, draining completely before the next phase starts. process.nextTick() runs first, then Promise .then/.catch.", example: "Highest priority — always beats setTimeout and setImmediate" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "10px 13px", background: item.color + "08", border: `1px solid ${item.color}22`, borderRadius: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: mono, marginBottom: 4 }}>{item.phase}</div>
                <div style={{ fontSize: 12, color: D.muted, fontFamily: serif, lineHeight: 1.7, marginBottom: 4 }}>{item.desc}</div>
                <div style={{ fontSize: 10, color: item.color + "99", fontFamily: mono }}>→ {item.example}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === "order" && (
        <div>
          {[
            { order: "1st", label: "Synchronous code", color: "#3b82f6", detail: "Everything on the call stack right now. Always runs first, no exceptions." },
            { order: "2nd", label: "process.nextTick()", color: "#06b6d4", detail: "Highest priority async. Runs before Promises. Use sparingly — mainly for library authors." },
            { order: "3rd", label: "Promise .then / .catch", color: "#8b5cf6", detail: "Microtasks. ALL microtasks drain completely — if a .then() creates another .then(), that also runs before any setTimeout." },
            { order: "4th", label: "setTimeout() / setInterval()", color: "#f59e0b", detail: "Macrotasks. Even setTimeout(fn, 0) waits for ALL sync code and ALL microtasks first." },
            { order: "5th", label: "setImmediate()", color: D.yellow, detail: "Runs in check phase, after poll phase. Similar to setTimeout(fn, 0) but always runs before setTimeout in I/O context." },
            { order: "6th", label: "I/O callbacks (fs, network)", color: D.green, detail: "File read callbacks, HTTP response callbacks — run in poll phase." },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 6, alignItems: "flex-start" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: item.color + "22", border: `1px solid ${item.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: item.color, fontFamily: mono, flexShrink: 0 }}>{item.order}</div>
              <div style={{ flex: 1, padding: "7px 11px", background: item.color + "08", border: `1px solid ${item.color}22`, borderRadius: 7 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: mono, marginBottom: 3 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: D.muted, fontFamily: serif, lineHeight: 1.7 }}>{item.detail}</div>
              </div>
            </div>
          ))}
          <CodeBlock label="classic interview question" code={`console.log('A');                          // sync
setTimeout(() => console.log('E'), 0);    // macrotask
Promise.resolve()
  .then(() => console.log('C'))           // microtask
  .then(() => console.log('D'));          // microtask
process.nextTick(() => console.log('B')); // microtask (nextTick first)
console.log('A2');                        // sync

// Output: A → A2 → B → C → D → E`} />
        </div>
      )}
      {tab === "demo" && <EventLoopDemo />}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What is the Event Loop?" options={["A for loop that processes requests", "A mechanism that checks queues and runs callbacks when the call stack is empty", "The V8 engine's JavaScript compiler", "A thread pool for handling I/O"]} correct={1} explain="The Event Loop is a continuous loop that checks the Call Stack and various callback queues, running callbacks in order of priority when the stack is empty." />
          <QuizCard question="Which runs FIRST after synchronous code finishes?" options={["setTimeout callback", "setImmediate callback", "process.nextTick callback", "I/O callback"]} correct={2} explain="process.nextTick has the highest priority of any async callback — it runs before even Promise .then callbacks." />
          <QuizCard question="setTimeout(fn, 0) means the function runs..." options={["Immediately, in the current tick", "After 0 milliseconds exactly", "After all sync code AND all microtasks finish", "Before Promise callbacks"]} correct={2} explain="Even with 0ms delay, setTimeout must wait for all synchronous code to finish AND for all microtasks to drain completely." />
          <QuizCard question="Why can Node.js handle 10,000 connections on a single thread?" options={["It creates threads automatically", "It runs JS faster than other languages", "I/O operations are handed to the OS — the single thread never blocks waiting", "It uses multiple CPU cores"]} correct={2} explain="Non-blocking I/O: Node hands file reads, network calls, etc. to the OS, then immediately continues. The single thread is always busy doing JS work, never waiting for I/O." />
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION: MODULES
// ══════════════════════════════════════════════════════════════════════════════
function SectionModules() {
  const [tab, setTab] = useState("what");
  const tabs = [{ id: "what", label: "🤔 What & Why" }, { id: "cjs", label: "📦 CommonJS" }, { id: "esm", label: "🔷 ES Modules" }, { id: "wrapper", label: "🎁 Module Wrapper" }, { id: "compare", label: "⚖️ Compare" }];
  return (
    <div>
      <p style={para}>Every file in Node.js is a module. Understanding modules is essential because <em>every single line of Node.js code you write</em> lives inside a module.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? D.yellow + "22" : "transparent", border: `1px solid ${tab === t.id ? D.yellow : D.outline}`, color: tab === t.id ? D.yellow : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "what" && (
        <div>
          <BigIdea number="1" title="What is a module?" color="#f59e0b">A module is just a file. But a special kind of file: its variables and functions are <em>private by default</em>. Nothing leaks out to other files. If you create a variable in one file, no other file can see it — unless you explicitly choose to export it.</BigIdea>
          <EasyBox emoji="🔒" title="Why private by default?" color="#3b82f6">Imagine you're building a large app with 50 files. Without modules, if any file creates a variable named <code>user</code>, it could accidentally overwrite another file's <code>user</code> variable. Chaos. Modules prevent this — each file has its own private scope.</EasyBox>
          <CodeBlock label="without modules — global scope chaos" code={`// file1.js
var user = 'Alice';  // global!

// file2.js
var user = 'Bob';    // overwrites Alice's user!

// file3.js
console.log(user);   // 'Bob' — but you expected 'Alice'`} />
          <CodeBlock label="with modules — private by default" code={`// file1.js
const user = 'Alice';  // private to this file

// file2.js
const user = 'Bob';    // completely separate variable

// To share, you must explicitly export:
export const user = 'Alice';  // intentionally shared
import { user } from './file1.js';
console.log(user); // 'Alice'`} />
        </div>
      )}
      {tab === "cjs" && (
        <div>
          <EasyBox emoji="📦" title="CommonJS — the original Node module system" color="#f59e0b">CommonJS (CJS) was created specifically for Node.js in 2009. It uses <code>require()</code> to import and <code>module.exports</code> to export. It loads modules <strong>synchronously</strong> — when you call require(), Node reads and executes that file right now, blocking until done.</EasyBox>
          <CodeBlock label="exporting from a module" code={`// PATTERN 1: Export an object with multiple things
module.exports = {
  add:      (a, b) => a + b,
  subtract: (a, b) => a - b,
  PI:       3.14159,
};

// PATTERN 2: Export a single thing
module.exports = function add(a, b) { return a + b; };

// PATTERN 3: Add exports one at a time
exports.add = (a, b) => a + b;

// ⚠️ THE TRAP — never do this:
exports = { add, subtract };
// This BREAKS because exports is a reference to module.exports.
// Reassigning exports creates a NEW object, disconnecting it.`} />
          <CodeBlock label="importing with require()" code={`// Get everything as an object:
const math = require('./math');
console.log(math.add(2, 3));     // 5

// Destructure on import:
const { add, subtract, PI } = require('./math');

// Import a Node CORE module (no path needed):
const fs   = require('fs');
const path = require('path');
const http = require('http');

// Import an NPM package:
const express = require('express');

// require() CACHES results:
// Second call returns the SAME object — file is NOT re-executed.`} />
        </div>
      )}
      {tab === "esm" && (
        <div>
          <EasyBox emoji="🔷" title="ES Modules — the modern standard" color="#3b82f6">ES Modules (ESM) were standardised in 2015. They use <code>import</code> and <code>export</code>. Unlike CJS which loads synchronously, ESM is designed to be asynchronous and <strong>statically analyzable</strong> — enabling tree-shaking (removing unused code). Use <code>.mjs</code> extension or add <code>"type": "module"</code> to package.json.</EasyBox>
          <CodeBlock label="exporting with ES modules" code={`// Named exports:
export const PI = 3.14159;
export function add(a, b) { return a + b; }

// Default export — one per file:
export default function mainAdd(a, b) { return a + b; }

// Re-export from another file:
export { add, subtract } from './basic-math.mjs';
export * from './advanced-math.mjs';`} />
          <CodeBlock label="importing with ES modules" code={`// Named imports:
import { add, PI } from './math.mjs';

// Default import:
import myAdd from './math.mjs';

// Both default AND named:
import Calculator, { add, PI } from './math.mjs';

// Rename on import:
import { add as mathAdd } from './math.mjs';

// Import everything as namespace:
import * as math from './math.mjs';

// Dynamic import:
const { add } = await import('./math.mjs');

// TOP-LEVEL AWAIT — ESM only:
const config = JSON.parse(await fs.promises.readFile('./config.json', 'utf8'));`} />
          <Tip icon="⚠️" color={D.yellow} title="No __dirname in ES Modules">CommonJS gives you <code>__dirname</code> and <code>__filename</code> for free. ES Modules don't have these. You need to build them from <code>import.meta.url</code>.</Tip>
          <CodeBlock label="__dirname replacement in ESM" code={`import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));`} />
        </div>
      )}
      {tab === "wrapper" && (
        <div>
          <EasyBox emoji="🎁" title="The Module Wrapper Function" color="#8b5cf6">Before running any CommonJS file, Node.js wraps the entire file contents inside a function. This is why <code>require</code>, <code>module</code>, <code>exports</code>, <code>__filename</code>, <code>__dirname</code> exist in every file without importing them — they're injected as function parameters.</EasyBox>
          <CodeBlock label="what Node actually runs" code={`// Node wraps your ENTIRE file in this function:
(function(exports, require, module, __filename, __dirname) {

  // ← YOUR CODE IS PLACED HERE BY NODE
  const PI = 3.14159;
  module.exports = { PI };

});

// The 5 injected parameters:
// exports   → shortcut reference to module.exports
// require   → the require() function
// module    → the current module object
// __filename → full absolute path to this file
// __dirname  → full absolute path to this file's directory`} />
          <CodeBlock label="why exports = {} doesn't work" code={`// exports is initially === module.exports
exports.PI = 3.14;        // ✅ modifies shared object
exports = { PI: 3.14 };   // ❌ creates NEW local variable
                          // module.exports still points to {}
module.exports = { PI };  // ✅ replaces module.exports directly`} />
        </div>
      )}
      {tab === "compare" && (
        <div>
          <div style={{ overflowX: "auto", marginBottom: 14 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: mono, fontSize: 11 }}>
              <thead><tr>{["Feature", "CommonJS (require)", "ES Modules (import)"].map((h, i) => (
                <th key={i} style={{ padding: "9px 12px", background: D.surface, color: [D.muted, "#f59e0b", "#3b82f6"][i], textAlign: "left", borderBottom: `1px solid ${D.outline}`, fontSize: 10 }}>{h}</th>
              ))}</tr></thead>
              <tbody>
                {[["Syntax", "require() / module.exports", "import / export"],["Loading", "Synchronous (blocks)", "Asynchronous"],["Top-level await", "❌ Cannot do this", "✅ Works natively"],["Tree-shaking", "❌ Bundlers struggle", "✅ Bundlers remove unused"],["__dirname", "✅ Free, always available", "❌ Must build from import.meta.url"],["Use in new projects", "Legacy codebases", "Yes — this is the standard now"]].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : D.surface + "06" }}>
                    {row.map((cell, j) => <td key={j} style={{ padding: "8px 12px", borderBottom: `1px solid ${D.outline}`, color: j === 0 ? D.text : D.muted }}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Tip icon="🎯" color="#3b82f6" title="Simple rule for 2025">New project: use ES Modules. Add <code>"type": "module"</code> to package.json. Learn CommonJS because you'll read it in older codebases daily — but write ESM.</Tip>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// CORE MODULES
// ══════════════════════════════════════════════════════════════════════════════
function ModuleCard({ name, color, icon, tagline, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1px solid ${color}33`, borderRadius: 10, overflow: "hidden", marginBottom: 10 }}>
      <button onClick={() => setOpen(p => !p)} style={{ width: "100%", padding: "13px 16px", background: open ? color + "12" : color + "07", border: "none", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 24 }}>{icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 900, color, fontFamily: mono }}>require('{name}')</div>
          <div style={{ fontSize: 12, color: D.muted, fontFamily: serif, marginTop: 2 }}>{tagline}</div>
        </div>
        <span style={{ fontSize: 11, color, fontFamily: mono, flexShrink: 0 }}>{open ? "▲ collapse" : "▼ expand"}</span>
      </button>
      {open && <div style={{ padding: "16px 18px", borderTop: `1px solid ${color}22` }}>{children}</div>}
    </div>
  );
}

function SectionCoreModules() {
  return (
    <div>
      <p style={para}>Node.js ships with <strong style={{ color: "#06b6d4" }}>built-in modules</strong> — ready to use with no npm install needed. Click any module to expand.</p>
      <ModuleCard name="fs" color={D.green} icon="📁" tagline="File System — read, write, copy, delete, watch files">
        <EasyBox emoji="📁" title="What is fs?" color={D.green}>The <code>fs</code> module gives your JavaScript program access to the computer's file system. <strong>The #1 rule:</strong> always use <code>fs.promises</code> (async) in servers. The synchronous versions block the entire Event Loop.</EasyBox>
        <CodeBlock label="reading files — the right way" code={`import fs from 'fs';
const fsp = fs.promises;

// READ a text file:
const text = await fsp.readFile('./data.txt', 'utf8');

// READ a binary file:
const imageBuffer = await fsp.readFile('./photo.jpg');

// READ and parse JSON:
const config = JSON.parse(await fsp.readFile('./config.json', 'utf8'));

// ❌ NEVER use readFileSync in a server:
const text = fs.readFileSync('./data.txt', 'utf8'); // blocks ALL requests!`} />
        <CodeBlock label="writing, appending, deleting" code={`await fsp.writeFile('./output.txt', 'Hello Node!', 'utf8');
await fsp.appendFile('./server.log', line + '\\n');
await fsp.unlink('./temp.txt');
await fsp.mkdir('./logs/2024', { recursive: true });
const files = await fsp.readdir('./src');
const exists = await fsp.access('./file.txt').then(() => true).catch(() => false);`} />
        <CodeBlock label="directories and file info" code={`const stats = await fsp.stat('./app.js');
stats.size;          // 4096 (bytes)
stats.mtime;         // Date — when last modified
stats.isFile();      // true
stats.isDirectory(); // false

await fsp.copyFile('./a.txt', './b.txt');
await fsp.rename('./old.txt', './new.txt');

fs.watch('./src', { recursive: true }, (event, filename) => {
  console.log(\`\${filename} was \${event}d\`);
});`} />
      </ModuleCard>
      <ModuleCard name="path" color="#3b82f6" icon="🛤️" tagline="File paths — build them safely across OSes">
        <EasyBox emoji="⚠️" title="Why you must use path" color={D.red}>On Mac/Linux, paths use <code>/</code>. On Windows, they use <code>\\</code>. If you build paths by string concatenation, your code works on your Mac, breaks on Windows. The <code>path</code> module handles this automatically.</EasyBox>
        <CodeBlock label="path methods" code={`import path from 'path';

path.join('/home', 'user', 'file.txt');   // '/home/user/file.txt'
path.resolve('src', 'app.js');            // '/cwd/src/app.js'
path.basename('/a/file.txt');             // 'file.txt'
path.basename('/a/file.txt', '.txt');     // 'file'
path.dirname('/a/file.txt');              // '/a'
path.extname('photo.jpg');                // '.jpg'
path.parse('/a/file.txt');                // { root, dir, base, name, ext }

// Most used pattern:
const cfg = path.join(__dirname, '..', 'config', 'db.json');`} />
      </ModuleCard>
      <ModuleCard name="os" color="#8b5cf6" icon="💻" tagline="Operating System info — CPU, memory, hostname">
        <CodeBlock label="os methods" code={`import os from 'os';

os.platform();     // 'linux' | 'darwin' | 'win32'
os.arch();         // 'x64' | 'arm64'
os.hostname();     // 'my-server-prod-1'
os.uptime();       // 86400 (seconds since reboot)
os.totalmem();     // 17179869184 → 17.2 GB
os.freemem();      // 4294967296  → 4.3 GB free
os.cpus().length;  // 8 (logical CPU cores)

// System health object:
function systemHealth() {
  const mem = os.totalmem(), free = os.freemem();
  return {
    cpuCores: os.cpus().length,
    totalRAM: (mem / 1e9).toFixed(1) + ' GB',
    usedRAM: ((1 - free / mem) * 100).toFixed(1) + '%',
    uptime: Math.floor(os.uptime() / 3600) + ' hours',
  };
}`} />
      </ModuleCard>
      <ModuleCard name="events" color="#f59e0b" icon="📡" tagline="EventEmitter — pub/sub, the foundation of Node.js I/O">
        <CodeBlock label="eventemitter basics" code={`import { EventEmitter } from 'events';

class OrderSystem extends EventEmitter {
  placeOrder(item, price) {
    this.emit('order', { item, price, time: new Date() });
    if (price > 100) this.emit('bigOrder', item);
  }
}

const shop = new OrderSystem();

// .on() — runs EVERY time:
shop.on('order', (data) => console.log(data));

// .once() — runs only the FIRST time:
shop.once('bigOrder', (item) => console.log('First big order!', item));

// ❗ ALWAYS handle 'error' events:
// Unhandled 'error' events crash Node IMMEDIATELY!
shop.on('error', (err) => console.error(err));`} />
      </ModuleCard>
      <ModuleCard name="http" color="#06b6d4" icon="🌐" tagline="Create HTTP servers — foundation under Express">
        <CodeBlock label="raw http server" code={`import http from 'http';

const server = http.createServer(async (req, res) => {
  const url  = new URL(req.url, \`http://\${req.headers.host}\`);
  const path = url.pathname;

  const body = await new Promise((resolve) => {
    let raw = '';
    req.on('data', c => raw += c);
    req.on('end', () => resolve(raw ? JSON.parse(raw) : null));
  });

  const json = (data, s = 200) => {
    res.writeHead(s, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  if (req.method === 'GET' && path === '/') {
    return json({ message: 'Hello from Node.js!' });
  }

  json({ error: 'Not found' }, 404);
});

server.listen(3000, () => console.log('🚀 http://localhost:3000'));`} />
      </ModuleCard>
      <ModuleCard name="crypto" color="#f43f5e" icon="🔐" tagline="Hashing, encryption, HMAC, secure random">
        <CodeBlock label="secure random & hashing" code={`import crypto from 'crypto';

// CRYPTOGRAPHICALLY SECURE random bytes:
const token = crypto.randomBytes(32).toString('hex');
const id    = crypto.randomUUID(); // built-in since Node 15

// SHA-256 hash:
const sha = s => crypto.createHash('sha256').update(s).digest('hex');

// ⚠️ NEVER hash passwords with SHA256 — use bcrypt or argon2!
// SHA-256 is fine for: checksums, cache keys, ETags`} />
        <CodeBlock label="HMAC — webhook verification" code={`const hmac = crypto.createHmac('sha256', process.env.SECRET)
  .update(rawRequestBody)
  .digest('hex');

// Use timingSafeEqual to compare — prevents timing attacks!
const valid = crypto.timingSafeEqual(
  Buffer.from(hmac),
  Buffer.from(req.headers['x-signature'])
);`} />
      </ModuleCard>
      <ModuleCard name="child_process" color="#f59e0b" icon="🔀" tagline="Run shell commands, scripts, other programs">
        <CodeBlock label="exec, spawn, fork" code={`import { exec, spawn, fork } from 'child_process';
import { promisify } from 'util';

// exec — buffers output in memory (1MB limit):
const execAsync = promisify(exec);
const { stdout } = await execAsync('git log --oneline -5');

// spawn — streams stdout/stderr, no size limit:
const proc = spawn('find', ['.', '-name', '*.ts']);
proc.stdout.on('data', c => process.stdout.write(c));

// fork — separate Node.js process with IPC:
const worker = fork('./worker.js');
worker.send({ task: 'resize', file: './img.jpg' });
worker.on('message', result => console.log(result));`} />
      </ModuleCard>
      <ModuleCard name="stream" color="#14b8a6" icon="🌊" tagline="Process data chunk by chunk — essential for large files">
        <EasyBox emoji="🌊" title="Why streams exist" color="#14b8a6">Reading a 4GB file loads 4GB into RAM. Most servers don't have 4GB free. The process crashes. Streams process data in ~64KB chunks. A 4GB file uses ~100KB RAM. Constant memory regardless of file size.</EasyBox>
        <CodeBlock label="pipeline — the safe way to chain streams" code={`import { pipeline } from 'stream';
import { promisify } from 'util';
const pipe = promisify(pipeline);

// ✅ Use pipeline() — it handles errors properly!
// pipe() doesn't clean up on error → memory leak
await pipe(
  fs.createReadStream('./data.json'),
  createGzip(),
  fs.createWriteStream('./data.json.gz')
);

// Process a 10GB file:
await pipe(
  fs.createReadStream('./10gb-export.csv'),
  new TransformCSVtoJSON(),
  fs.createWriteStream('./output.json')
);
// RAM used: ~200KB total. Not 10GB. ✅`} />
        <StreamDemo />
      </ModuleCard>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// KILL NOTES
// ══════════════════════════════════════════════════════════════════════════════
function KillNotes() {
  const groups = [
    { title: "What is Node.js", color: D.green, icon: "🟢", kills: ["Node.js is a runtime environment — runs JavaScript outside the browser using V8 + libuv + Node APIs.", "Created in 2009 by Ryan Dahl. Motivation: traditional servers wasted resources with one thread per connection.", "Node.js is NOT a framework, NOT a language — it's a runtime like the JVM for Java.", "Same V8 engine as Chrome — your JS knowledge transfers; only the APIs differ.", "Perfect for: APIs, real-time apps, microservices, CLI tools. Bad for: CPU-heavy tasks.", "npm has 2M+ packages — the largest package ecosystem in software."] },
    { title: "V8 + libuv + Architecture", color: "#f59e0b", icon: "⚙️", kills: ["V8 = Google's JS engine in C++. Compiles JS to native machine code via JIT.", "JIT = Just-In-Time compilation. V8 watches hot code paths and optimises them.", "libuv = C library providing the Event Loop, thread pool (4 threads default), and cross-platform async I/O.", "Thread pool handles: file reads, DNS lookups, crypto. Network I/O uses OS-level async.", "V8 handles garbage collection automatically — mark-and-sweep algorithm.", "UV_THREADPOOL_SIZE=8 increases the libuv thread pool size."] },
    { title: "Event Loop", color: "#f59e0b", icon: "🔄", kills: ["Order: sync → process.nextTick → Promise .then → setTimeout → setImmediate → I/O callbacks", "Microtasks (nextTick + Promises) drain COMPLETELY before ANY macrotask runs.", "process.nextTick fires before Promises — use sparingly, mainly for library authors.", "setTimeout(fn, 0) still runs AFTER all microtasks — '0ms' means 'minimum 0ms, after microtasks'.", "The poll phase is where Node WAITS for new I/O events.", "NEVER block the Event Loop: no readFileSync in servers, no heavy CPU loops.", "For CPU work: use worker_threads or child_process.fork()."] },
    { title: "CommonJS vs ES Modules", color: "#3b82f6", icon: "📦", kills: ["CJS: require() is synchronous and blocking. ESM: import is asynchronous and statically analyzed.", "exports is a reference to module.exports. NEVER do exports = {...} — creates a new object, breaks the link.", "require() caches modules — second require() returns the exact same cached object.", "ESM has no __dirname or __filename — must construct from dirname(fileURLToPath(import.meta.url)).", "Module Wrapper: Node wraps every CJS file in (function(exports, require, module, __filename, __dirname){}).", "Top-level await works ONLY in ES Modules. Cannot use in CommonJS.", "package.json 'type': 'module' makes all .js files ESM. Use .cjs to override per-file."] },
    { title: "fs module", color: D.green, icon: "📁", kills: ["Always use fs.promises (async). fs.readFileSync BLOCKS the Event Loop — never use in HTTP servers.", "Without 'utf8', readFile returns a Buffer (raw bytes). Always pass encoding for text.", "fsp.mkdir({ recursive: true }) — safe, no error if directory already exists.", "fsp.access() to check existence (no throw). Check err.code === 'ENOENT' for file-not-found.", "fs.createReadStream() for large files — constant memory usage regardless of file size.", "fs.watch() is unreliable cross-platform — use chokidar (npm) in production.", "fsp.rename() also MOVES files when you change the directory part of the path."] },
    { title: "path module", color: "#3b82f6", icon: "🛤️", kills: ["Mac/Linux uses / separators. Windows uses \\. path.join() picks the right one automatically.", "path.join() concatenates safely. path.resolve() makes an absolute path from CWD.", "__dirname (CJS) = directory of current file. Must be constructed in ESM from import.meta.url.", "path.basename(p) → filename. path.dirname(p) → directory. path.extname(p) → '.jpg'.", "path.normalize() removes .. and . and double slashes.", "path.parse() splits into { root, dir, base, name, ext }. path.format() is the reverse."] },
    { title: "events module", color: "#f59e0b", icon: "📡", kills: ["ALWAYS add an 'error' listener — unhandled 'error' events crash Node IMMEDIATELY.", ".once() auto-removes after first call. .on() stays until you call .off().", "Default max listeners = 10 per event. Getting a warning? Probably a listener leak.", "EventEmitter is the base class for streams, http.Server, net.Socket, child processes.", "emit() returns true if there were listeners, false if nobody was listening.", "Listeners fire synchronously in registration order."] },
    { title: "http module", color: "#06b6d4", icon: "🌐", kills: ["req.method, req.url, req.headers — your three tools to understand any incoming request.", "For POST body: collect chunks in req.on('data') → parse in req.on('end'). req is a stream.", "res.writeHead() MUST be called before res.end(). Sets status + headers.", "res.end() MUST always be called — browser hangs forever if you forget it.", "Use new URL(req.url, 'http://'+req.headers.host) to safely parse paths and query strings.", "req and res are streams — you can pipe req directly to a file for upload handling."] },
    { title: "crypto module", color: "#f43f5e", icon: "🔐", kills: ["NEVER hash passwords with SHA256 — use bcrypt or argon2 (npm). They're slow by design + salted.", "crypto.randomBytes(32) is cryptographically secure. Math.random() is not — never for security.", "HMAC = hash + secret key. Use for webhook verification. Use timingSafeEqual to compare signatures.", "timingSafeEqual prevents timing attacks — comparison time doesn't reveal key info.", "AES-256-GCM: always generate a fresh random IV for each encryption. Never reuse IVs.", "crypto.randomUUID() is built-in since Node 15 — no uuid npm package needed."] },
    { title: "child_process module", color: "#f59e0b", icon: "🔀", kills: ["exec() buffers ALL output in memory (1MB default). For large output use spawn().", "spawn() streams stdout/stderr — no size limit, handles large/long-running processes.", "execSync() BLOCKS the Event Loop — CLI scripts only. Never in HTTP servers.", "fork() creates a separate Node.js process with IPC channel. Use for CPU-heavy work.", "shell: true enables pipes/globs but is a security risk with any user input.", "Always handle child.on('error') and child.on('close'). Clean up processes on exit."] },
    { title: "stream module", color: "#14b8a6", icon: "🌊", kills: ["4 types: Readable (source), Writable (dest), Duplex (read+write), Transform (read+modify+write).", "Always use pipeline() not pipe() — pipeline properly destroys all streams on any error.", "Backpressure: when writable.write() returns false, pause readable until 'drain' event fires.", "highWaterMark controls buffer size (default 16KB). Tune per use case.", "objectMode: true — stream JS objects instead of Buffers.", "ALL HTTP req/res, net.Socket, fs.createRead/WriteStream, zlib, crypto cipher are streams."] },
  ];

  return (
    <div>
      <p style={para}>One card per topic. The precise facts that matter most — for interviews, for debugging, for real work.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {groups.map(n => (
          <div key={n.title} style={{ border: `1px solid ${n.color}33`, borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "10px 14px", background: n.color + "0d", borderBottom: `1px solid ${n.color}22`, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>{n.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 900, color: n.color, fontFamily: mono }}>{n.title}</span>
            </div>
            <div style={{ padding: "10px 14px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 6 }}>
              {n.kills.map((k, i) => (
                <div key={i} style={{ display: "flex", gap: 8 }}>
                  <span style={{ color: n.color, fontSize: 10, marginTop: 3, flexShrink: 0 }}>▸</span>
                  <span style={{ fontSize: 11, color: D.muted, lineHeight: 1.65, fontFamily: serif }}>{k}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SUPER CHEATSHEET
// ══════════════════════════════════════════════════════════════════════════════
function SuperCheatsheet() {
  const [tab, setTab] = useState("runtime");
  const tabs = [
    { id: "runtime", label: "⚙️ Runtime" },
    { id: "modules", label: "📦 Modules" },
    { id: "fs-path", label: "📁 fs + path" },
    { id: "net", label: "🌐 http + events" },
    { id: "power", label: "🔐 crypto + child + stream" },
    { id: "mistakes", label: "💀 Mistakes" },
  ];
  const content = {
    runtime: (
      <div>
        <CodeBlock label="execution order" code={`console.log('1');
process.nextTick(() => console.log('2'));
Promise.resolve().then(() => console.log('3'));
setTimeout(() => console.log('4'), 0);
setImmediate(() => console.log('5'));
console.log('6');
// Output: 1 → 6 → 2 → 3 → 4 → 5`} />
        <CodeBlock label="process — global reference" code={`process.env.NODE_ENV    // 'production' | 'development'
process.env.PORT        // '3000'
process.argv            // ['node', 'app.js', '--flag', 'value']
process.cwd()           // working directory
process.exit(0)         // success. process.exit(1) = error
process.uptime()        // seconds running
process.memoryUsage()   // { heapUsed, heapTotal, rss }
process.pid             // 12345
process.version         // 'v20.11.0'
process.platform        // 'linux' | 'darwin' | 'win32'

process.on('SIGTERM', async () => {
  server.close();
  await db.disconnect();
  process.exit(0);
});
process.on('uncaughtException',  err => { log(err); process.exit(1); });
process.on('unhandledRejection', err => { log(err); process.exit(1); });`} />
      </div>
    ),
    modules: (
      <div>
        <CodeBlock label="commonjs" code={`// Export:
module.exports = { fn1, fn2, VALUE };  // ✅ recommended
exports.fn1 = fn1;                     // ✅ one at a time
// exports = {...}                      // ❌ NEVER — breaks ref

// Import:
const { fn1 }   = require('./mod');
const fs        = require('fs');       // core
const express   = require('express'); // npm`} />
        <CodeBlock label="es modules" code={`// Export:
export const PI = 3.14;
export function add(a, b) { return a + b; }
export default class Calc {}

// Import:
import Calc             from './math.mjs';
import { add, PI }      from './math.mjs';
import { add as sum }   from './math.mjs';
import * as math        from './math.mjs';

// __dirname in ESM:
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Dynamic import:
const { add } = await import('./math.mjs');`} />
      </div>
    ),
    "fs-path": (
      <div>
        <CodeBlock label="fs.promises" code={`import { readFile, writeFile, appendFile, unlink,
         mkdir, readdir, stat, copyFile, rename, access } from 'fs/promises';

const text  = await readFile('./file.txt', 'utf8');
const buf   = await readFile('./img.png');

await writeFile('./out.txt', content, 'utf8');
await appendFile('./log.txt', line + '\\n');
await unlink('./tmp.txt');
await mkdir('./logs', { recursive: true });
const files = await readdir('./src');
const s     = await stat('./file.txt');
// s.isFile() s.isDirectory() s.size s.mtime

await copyFile('./a.txt', './b.txt');
await rename('./old.txt', './new.txt');
const ok = await access('./f.txt').then(() => true).catch(() => false);`} />
        <CodeBlock label="path" code={`import path from 'path';
path.join('/home', 'user', 'file.txt')  // '/home/user/file.txt'
path.resolve('src', 'app.js')           // '/cwd/src/app.js'
path.basename('/a/file.txt')            // 'file.txt'
path.basename('/a/file.txt', '.txt')    // 'file'
path.dirname('/a/file.txt')             // '/a'
path.extname('photo.jpg')               // '.jpg'
path.parse('/a/file.txt')               // { root, dir, base, name, ext }
path.normalize('/foo//bar/../baz')      // '/foo/baz'
const cfg = path.join(__dirname, '..', 'config', 'db.json');`} />
      </div>
    ),
    net: (
      <div>
        <CodeBlock label="http server" code={`const server = http.createServer(async (req, res) => {
  const url    = new URL(req.url, \`http://\${req.headers.host}\`);
  const path   = url.pathname;
  const params = url.searchParams;

  const body = await new Promise(r => {
    let raw = '';
    req.on('data', c => raw += c);
    req.on('end', () => r(raw ? JSON.parse(raw) : null));
  });

  const json = (data, s = 200) => {
    res.writeHead(s, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  if (req.method === 'GET' && path === '/') return json({ ok: true });
  json({ error: 'Not found' }, 404);
});
server.listen(3000);`} />
        <CodeBlock label="events" code={`import { EventEmitter, once } from 'events';
const em = new EventEmitter();

em.on('data', payload => handle(payload));
em.once('ready', ()   => console.log('Connected once!'));
em.emit('data', { value: 42 });
em.off('data', handler);

// ALWAYS:
em.on('error', err => console.error(err));

// Promisify an event:
const [data] = await once(em, 'result');`} />
      </div>
    ),
    power: (
      <div>
        <CodeBlock label="crypto" code={`import crypto from 'crypto';
const token = crypto.randomBytes(32).toString('hex');
const id    = crypto.randomUUID();
const sha   = s => crypto.createHash('sha256').update(s).digest('hex');
const hmac  = crypto.createHmac('sha256', secret).update(body).digest('hex');
const valid = crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));

function encrypt(text, key) {
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv('aes-256-gcm', key, iv);
  const enc = Buffer.concat([c.update(text, 'utf8'), c.final()]);
  return { iv: iv.toString('hex'), data: enc.toString('hex'), tag: c.getAuthTag().toString('hex') };
}`} />
        <CodeBlock label="child_process + stream" code={`import { spawn, fork } from 'child_process';
import { pipeline } from 'stream';
import { promisify } from 'util';

const execAsync = promisify(require('child_process').exec);
const pipe      = promisify(pipeline);

const { stdout } = await execAsync('git log --oneline -5');

const proc = spawn('find', ['.', '-name', '*.ts']);
proc.stdout.on('data', c => process.stdout.write(c));

const worker = fork('./worker.js');
worker.send({ task: 'resize', file: './img.jpg' });
const result = await new Promise(r => worker.once('message', r));

await pipe(
  createReadStream('./data.json'),
  createGzip(),
  createWriteStream('./data.json.gz')
);`} />
      </div>
    ),
    mistakes: (
      <div>
        {[
          { color: D.red, title: "readFileSync in a server — blocks ALL requests",
            bad: `app.get('/data', (req, res) => {
  const data = fs.readFileSync('./huge.json'); // ❌ blocks!
  res.json(JSON.parse(data));
});`,
            good: `app.get('/data', async (req, res) => {
  const data = await fs.promises.readFile('./huge.json', 'utf8');
  res.json(JSON.parse(data)); // ✅ event loop free
});` },
          { color: "#f59e0b", title: "exports = {} instead of module.exports",
            bad: `exports = { add, subtract };
// ❌ disconnects from module.exports
// require('./math') returns {} — nothing!`,
            good: `module.exports = { add, subtract }; // ✅` },
          { color: "#8b5cf6", title: "No 'error' listener on EventEmitter",
            bad: `const em = new EventEmitter();
em.emit('error', new Error('Oops'));
// ❌ Unhandled 'error' event → Node crashes!`,
            good: `em.on('error', err => {
  console.error('Caught:', err.message); // ✅ survives
});` },
          { color: "#f59e0b", title: "exec() for large command output",
            bad: `exec('find / -name "*.log"', (err, stdout) => {
  // ❌ stdout = gigabytes → crash
});`,
            good: `const proc = spawn('find', ['/', '-name', '*.log']);
proc.stdout.on('data', c => process.stdout.write(c)); // ✅` },
          { color: "#14b8a6", title: "pipe() instead of pipeline()",
            bad: `readStream.pipe(transform).pipe(writeStream);
// ❌ Error in transform → streams stay open → leak`,
            good: `const pipe = promisify(pipeline);
await pipe(readStream, transform, writeStream); // ✅` },
        ].map((item, i) => (
          <div key={i} style={{ border: `1px solid ${item.color}28`, borderRadius: 8, overflow: "hidden", marginBottom: 10 }}>
            <div style={{ padding: "8px 14px", background: item.color + "0d", fontSize: 11, fontWeight: 700, color: item.color, fontFamily: mono }}>💀 {item.title}</div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 160, padding: "10px 14px", borderRight: `1px solid ${D.outline}`, borderTop: `1px solid ${D.outline}` }}>
                <div style={{ fontSize: 9, color: D.red, fontFamily: mono, marginBottom: 4 }}>❌ WRONG</div>
                <pre style={{ margin: 0, fontSize: 10, color: D.red + "bb", fontFamily: mono, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{item.bad}</pre>
              </div>
              <div style={{ flex: 1, minWidth: 160, padding: "10px 14px", borderTop: `1px solid ${D.outline}` }}>
                <div style={{ fontSize: 9, color: D.greenText, fontFamily: mono, marginBottom: 4 }}>✅ CORRECT</div>
                <pre style={{ margin: 0, fontSize: 10, color: D.greenText + "bb", fontFamily: mono, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{item.good}</pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  };
  return (
    <div>
      <p style={para}>Everything on one page. <strong style={{ color: "#ec4899" }}>Bookmark this.</strong></p>
      <div style={{ display: "flex", gap: 5, marginBottom: 14, flexWrap: "wrap" }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#ec489922" : "transparent", border: `1px solid ${tab === t.id ? "#ec4899" : D.outline}`, color: tab === t.id ? "#ec4899" : D.muted, borderRadius: 5, cursor: "pointer", fontWeight: tab === t.id ? 700 : 400 }}>{t.label}</button>)}
      </div>
      {content[tab]}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// INTERVIEW SECTION
// ══════════════════════════════════════════════════════════════════════════════
function InterviewSection() {
  const [open, setOpen] = useState(null);
  const qs = [
    { q: "What is Node.js? Explain it to someone who has never heard of it.", level: "Junior", color: D.green,
      a: `Node.js is a runtime environment — a program installed on a computer that can read and execute JavaScript files, giving that JavaScript access to the computer's file system, network, and operating system.

Before Node.js (created in 2009), JavaScript could only run inside web browsers. You couldn't use JavaScript to build servers, read files, or create CLI tools. Node.js changed that.

It uses Google's V8 engine (the same engine inside Chrome) plus a C library called libuv to handle async I/O efficiently.

Key distinction: Node.js is NOT a framework and NOT a programming language. It's a runtime — like how the JVM lets you run Java, Node.js lets you run JavaScript on servers.`,
      code: `// Browser only:
document.getElementById('btn').click();

// With Node.js:
import fs from 'fs';
const data = await fs.promises.readFile('./data.json', 'utf8');

// Same language. Completely different powers.` },
    { q: "What is the Event Loop and why is it important?", level: "Junior", color: D.green,
      a: `The Event Loop is the mechanism that allows Node.js to handle many concurrent operations on a single JavaScript thread.

When you call an async operation (like reading a file), Node hands the work to the OS via libuv and immediately continues running other code. When the OS finishes, it puts your callback in a queue. The Event Loop continuously checks this queue and runs callbacks when the Call Stack is empty.

Why it matters: traditional servers create one thread per request (~1MB RAM each). At 10,000 concurrent users, that's 10GB just for threads. Node handles the same traffic with a single thread because it never blocks waiting.

The danger: any synchronous code that takes a long time (heavy loops, readFileSync) blocks the entire Event Loop. Every other request waits.`,
      code: `// Node can handle thousands of connections:
for (const request of 10000Requests) {
  db.query('SELECT * FROM users', callback);
  // Node doesn't wait — immediately starts next query
}

// The danger — blocking the Event Loop:
app.get('/slow', (req, res) => {
  for (let i = 0; i < 1e9; i++) {} // blocks 10 SECONDS!
  res.send('done');
});` },
    { q: "What is the execution order of async code in Node.js?", level: "Mid", color: "#3b82f6",
      a: `The exact order:

1. Synchronous code — runs first, always, no exceptions
2. process.nextTick() — highest priority async. Runs before Promises.
3. Promise .then/.catch callbacks — microtasks. ALL microtasks drain before any macrotask.
4. setTimeout() / setInterval() — macrotasks. Timer phase of Event Loop.
5. setImmediate() — runs in check phase, after poll phase.
6. I/O callbacks (fs, network) — run in poll phase.

The critical rule: ALL microtasks (nextTick + Promises) drain completely after each sync block and after each macrotask. If a .then() creates another .then(), that second one also runs before any setTimeout.`,
      code: `console.log('1');                            // sync
setTimeout(() => console.log('4'), 0);       // macrotask
Promise.resolve()
  .then(() => console.log('3'))              // microtask
  .then(() => console.log('D'));             // microtask
process.nextTick(() => console.log('2'));     // nextTick
console.log('1b');                           // sync

// Output: 1 → 1b → 2 → 3 → D → 4` },
    { q: "What is the difference between CommonJS and ES Modules?", level: "Junior", color: D.green,
      a: `CommonJS (CJS): Node's original system (2009). Uses require()/module.exports. Loads synchronously — require() blocks while reading and executing the file. Dynamic — you can require() inside if statements. Default for .js files.

ES Modules (ESM): The modern standard (2015). Uses import/export. Loads asynchronously. Static — imports must be at the top level, enabling tree-shaking. Requires .mjs or "type":"module" in package.json.

Key differences:
1. exports = {} BREAKS in CJS — use module.exports instead
2. __dirname doesn't exist in ESM — build it from import.meta.url
3. Top-level await only works in ESM
4. Dynamic import() is async in ESM`,
      code: `// CommonJS trap:
exports = { add };    // ❌ disconnects from module.exports
module.exports = { add }; // ✅ correct

// ESM __dirname:
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Top-level await — ESM only:
const config = await fs.promises.readFile('./config.json', 'utf8');
// Impossible in CommonJS!` },
    { q: "When and why would you use streams?", level: "Mid", color: "#3b82f6",
      a: `Streams solve the memory problem with large data.

Without streams: reading a 4GB file loads 4GB into RAM. Most servers don't have 4GB free. The process crashes.

With streams: data is processed in small chunks (~64KB at a time). A 4GB file uses ~100KB of RAM. Constant memory regardless of file size.

Additionally, streams allow you to START processing before the entire data arrives. With fs.readFile(), you wait for the complete file. With createReadStream(), you start processing after the first 64KB.

Always use pipeline() not pipe(). pipeline() properly destroys all streams on error — pipe() doesn't, which causes memory leaks.`,
      code: `// Without streams — dangerous:
const data = await fs.promises.readFile('./4gb-log.txt');
// Loads 4GB into RAM → process likely crashes

// With streams — safe:
import { pipeline } from 'stream';
import { promisify } from 'util';

await promisify(pipeline)(
  createReadStream('./4gb-log.txt'),
  createGzip(),
  createWriteStream('./log.gz')
);
// RAM used: ~200KB total, regardless of file size` },
    { q: "What is the Module Wrapper Function?", level: "Mid", color: "#3b82f6",
      a: `Before running any CommonJS file, Node.js wraps the entire file contents in a function:
(function(exports, require, module, __filename, __dirname) { /* your code */ })

This explains three mysteries:
1. Why require, module, exports, __filename, __dirname exist in every file without importing them — they're injected as function parameters.
2. Why variables don't leak between files — they're inside a function scope.
3. Why exports = {} doesn't work — you're reassigning a local function parameter, disconnecting it from module.exports.`,
      code: `// Your math.js file:
const PI = 3.14;
module.exports = { PI };

// What Node ACTUALLY executes:
(function(exports, require, module, __filename, __dirname) {
  const PI = 3.14; // scoped — doesn't leak!
  module.exports = { PI }; // sets the actual exports ✅
});

// The exports trap:
(function(exports, require, module, ...) {
  exports = { PI }; // ❌ reassigns LOCAL variable
                    // module.exports is still {}
});` },
    { q: "How do you handle errors properly in Node.js?", level: "Senior", color: "#8b5cf6",
      a: `Three categories of errors need different handling:

1. Async errors (try/catch with await): wrap await calls, check error codes like err.code === 'ENOENT'. Return defaults for expected errors, rethrow unexpected ones.

2. EventEmitter errors: ALWAYS add an 'error' event listener. Unhandled 'error' events crash Node immediately — no try/catch helps.

3. Process-level safety nets: process.on('uncaughtException') and process.on('unhandledRejection') for errors that slip through. Log and exit — don't try to recover.

For production servers: implement graceful shutdown on SIGTERM. Stop accepting new connections, let in-flight requests finish, close database connections, then exit cleanly.`,
      code: `// 1. Async — specific error codes:
async function loadFile(path) {
  try {
    return await fs.promises.readFile(path, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') return null; // expected → default
    throw err; // unexpected → let caller handle
  }
}

// 2. EventEmitter — ALWAYS:
server.on('error', err => { console.error(err); process.exit(1); });

// 3. Process safety nets:
process.on('uncaughtException',  err => { log(err); process.exit(1); });
process.on('unhandledRejection', err => { log(err); process.exit(1); });

// 4. Graceful shutdown:
process.on('SIGTERM', async () => {
  server.close();
  await db.disconnect();
  process.exit(0);
});` },
  ];
  return (
    <div>
      <p style={para}>These questions cover everything from "what is Node.js" to deep internals. Know these for any backend or full-stack interview.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {qs.map((q, i) => (
          <div key={i} style={{ border: `1px solid ${open === i ? q.color + "55" : D.outline}`, borderRadius: 9, overflow: "hidden", transition: "border-color 0.2s" }}>
            <button onClick={() => setOpen(open === i ? null : i)}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "11px 14px", background: open === i ? q.color + "0d" : "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontSize: 9, padding: "2px 6px", background: q.color + "22", border: `1px solid ${q.color}44`, borderRadius: 3, color: q.color, fontFamily: mono, fontWeight: 700, flexShrink: 0 }}>{q.level}</span>
              <span style={{ fontSize: 12, color: open === i ? q.color : D.text, fontFamily: serif, flex: 1, lineHeight: 1.4 }}>{q.q}</span>
              <span style={{ color: q.color, fontSize: 13, flexShrink: 0 }}>{open === i ? "▲" : "▼"}</span>
            </button>
            {open === i && (
              <div style={{ padding: "0 14px 14px", borderTop: `1px solid ${q.color}22` }}>
                <pre style={{ margin: "10px 0 0", fontSize: 12, color: D.muted, fontFamily: serif, lineHeight: 1.9, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{q.a}</pre>
                <CodeBlock label="code" code={q.code} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// EXPRESS.JS & MIDDLEWARE SECTIONS
// ══════════════════════════════════════════════════════════════════════════════

function MiddlewareOrderDemo() {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const steps = [
    { label: "Request arrives at /users", who: "Client", color: "#3b82f6", req: "GET /users", res: "" },
    { label: "app.use(logger) → logs request", who: "Middleware 1", color: "#f59e0b", req: "GET /users", res: "" },
    { label: "app.use(auth) → checks token", who: "Middleware 2", color: "#f59e0b", req: "GET /users", res: "" },
    { label: "app.use(express.json) → parse body", who: "Middleware 3", color: "#f59e0b", req: "GET /users", res: "" },
    { label: "app.get('/users') → route handler", who: "Route Handler", color: "#8b5cf6", req: "GET /users", res: "{ users: [...] }" },
    { label: "Response sent back to client", who: "Client", color: "#3b82f6", req: "", res: "{ users: [...] }" },
  ];
  const run = async () => {
    setRunning(true); setStep(0);
    for (let i = 1; i <= steps.length; i++) {
      await new Promise(r => setTimeout(r, 700));
      setStep(i);
    }
    setRunning(false);
  };
  return (
    <div style={{ padding: 14, background: D.surfaceLowest, border: `1px solid ${D.outline}`, borderRadius: 10 }}>
      <div style={{ fontSize: 10, color: D.muted, fontFamily: mono, letterSpacing: 1, marginBottom: 10 }}>🧪 LIVE — step through the middleware chain</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "7px 10px", background: step > i ? s.color + "15" : step === i ? s.color + "22" : D.surface, border: `1px solid ${step >= i ? s.color + "40" : D.outline}`, borderRadius: 6, transition: "all 0.35s", opacity: step >= i ? 1 : 0.45 }}>
            <span style={{ fontSize: 14, width: 20, flexShrink: 0 }}>{step > i ? "✅" : step === i ? "⏳" : "○"}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: step >= i ? s.color : D.muted, fontFamily: mono, fontWeight: step === i ? 700 : 400 }}>{s.who}: {s.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={run} disabled={running}
          style={{ padding: "6px 16px", background: running ? D.muted + "18" : D.greenBg, border: `1px solid ${running ? D.outline : D.green}`, color: running ? D.muted : D.greenText, borderRadius: 5, cursor: running ? "default" : "pointer", fontSize: 11, fontFamily: mono }}>
          {running ? "● running..." : "▶ Run it"}
        </button>
        <div style={{ fontSize: 10, color: D.muted, fontFamily: mono }}>
          {step === 0 ? "press Run to watch middleware execute in order" : step >= steps.length ? "Done! Notice middleware runs BEFORE the route handler." : `step ${step} of ${steps.length}`}
        </div>
      </div>
    </div>
  );
}

function SectionWhatIsExpress() {
  const [tab, setTab] = useState("story");
  const tabs = [
    { id: "story", label: "📖 The Story" },
    { id: "server", label: "🖥️ First Server" },
    { id: "why", label: "🎯 Why Express?" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Express.js is the de facto standard web framework for Node.js. It is minimal, unopinionated, and powers millions of production APIs.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#8b5cf622" : "transparent", border: `1px solid ${tab === t.id ? "#8b5cf6" : D.outline}`, color: tab === t.id ? "#8b5cf6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "story" && (
        <div>
          <BigIdea number="1" title="Node.js gave JavaScript superpowers" color="#3b82f6">In 2009, Node.js let JavaScript run on servers. But the built-in <code>http</code> module was verbose. You had to manually parse URLs, handle routing, and manage headers. Every developer was rewriting the same boilerplate.</BigIdea>
          <BigIdea number="2" title="TJ Holowaychuk built Express in 2010" color="#f59e0b">TJ Holowaychuk created Express.js as a thin layer on top of Node's <code>http</code> module. His insight: routing and middleware are the only primitives a web framework truly needs. Everything else is optional.</BigIdea>
          <BigIdea number="3" title="The middleware pattern changed everything" color="#8b5cf6">Instead of one giant request handler, Express broke processing into small, composable functions called <strong>middleware</strong>. Each middleware can inspect the request, modify it, or terminate it. This pattern became the standard for Node.js servers.</BigIdea>
          <EasyBox emoji="🎯" title="What Express actually is — one sentence" color="#8b5cf6"><strong>Express is a minimal, unopinionated web framework</strong> that provides a robust set of features for web and mobile applications: routing, middleware, template engine integration, and HTTP utility methods.</EasyBox>
          <Tip icon="🔑" color={D.yellow} title="Key insight">Express is NOT a full-stack framework like Django or Laravel. It does not dictate your database, ORM, or folder structure. It gives you routing + middleware — you choose everything else.</Tip>
        </div>
      )}
      {tab === "server" && (
        <div>
          <CodeBlock label="the simplest express server" code={`const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`} />
          <p style={para}>Four lines of logic, one route, one response. Compare this to the raw <code>http</code> module which needs ~20 lines just to parse the request body and route.</p>
          <CodeBlock label="run it" code={`node server.js
# Then visit http://localhost:3000 in your browser`} />
          <Tip icon="💡" color={D.yellow} title="req and res">Every route handler receives <code>req</code> (the request object) and <code>res</code> (the response object). Express extends Node's native objects with helpful methods like <code>res.json()</code>, <code>res.status()</code>, and <code>res.send()</code>.</Tip>
        </div>
      )}
      {tab === "why" && (
        <div>
          {[
            { title: "Minimal and fast", color: "#06b6d4", icon: "⚡", desc: "Express adds almost zero overhead. A hello-world Express app can handle 20,000+ requests per second on modest hardware. It is one of the fastest web frameworks in any language." },
            { title: "Middleware ecosystem", color: "#f59e0b", icon: "🧩", desc: "Thousands of middleware packages on npm: CORS, body parsing, compression, rate limiting, authentication. Drop them in with app.use() and they just work." },
            { title: "Unopinionated flexibility", color: D.green, icon: "🔧", desc: "Want MongoDB? Use Mongoose. Want PostgreSQL? Use Prisma. Want MVC? Organize your folders that way. Express does not care — it only handles HTTP." },
            { title: "Industry standard", color: "#8b5cf6", icon: "🏢", desc: "Express is used by Netflix, Uber, IBM, and countless startups. When a job posting says 'Node.js backend experience,' they almost always mean Express experience." },
            { title: "Foundation for bigger frameworks", color: "#f43f5e", icon: "🏗️", desc: "NestJS, Sails, LoopBack, and Feathers are all built on top of Express. Learning Express deeply makes every other Node framework easier to understand." },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 10, padding: "13px 16px", background: item.color + "08", border: `1px solid ${item.color}25`, borderRadius: 9 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: mono, marginBottom: 7 }}>{item.icon} {item.title}</div>
              <p style={{ ...para, marginBottom: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What is Express.js?" options={["A database for Node.js applications", "A minimal web framework for Node.js", "A frontend JavaScript library like React", "A replacement for the V8 engine"]} correct={1} explain="Express is a minimal, unopinionated web framework for Node.js. It provides routing, middleware, and HTTP utilities." />
          <QuizCard question="Which Node.js module does Express build on top of?" options={["fs (file system)", "path", "http", "crypto"]} correct={2} explain="Express is built on top of Node's built-in http module. It adds routing, middleware, and convenience methods." />
          <QuizCard question="What makes Express 'unopinionated'?" options={["It forces you to use MongoDB", "It does not dictate your database, ORM, or folder structure", "It has no opinions about HTTP methods", "It only works with certain frontend frameworks"]} correct={1} explain="Unopinionated means Express gives you the HTTP layer and lets you choose everything else: database, architecture, folder structure, etc." />
        </div>
      )}
    </div>
  );
}

function SectionRouting() {
  const [tab, setTab] = useState("methods");
  const tabs = [
    { id: "methods", label: "📬 HTTP Methods" },
    { id: "params", label: "🔗 URL Params" },
    { id: "query", label: "❓ Query Strings" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Routing determines how an application responds to a client request at a particular endpoint (URI) and HTTP method.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#3b82f622" : "transparent", border: `1px solid ${tab === t.id ? "#3b82f6" : D.outline}`, color: tab === t.id ? "#3b82f6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "methods" && (
        <div>
          <CodeBlock label="all HTTP methods" code={`const express = require('express');
const app = express();

// GET — retrieve data
app.get('/users', (req, res) => {
  res.json({ message: 'Get all users' });
});

// POST — create data
app.post('/users', (req, res) => {
  res.status(201).json({ message: 'User created' });
});

// PUT — full update
app.put('/users/:id', (req, res) => {
  res.json({ message: \`User \${req.params.id} updated\` });
});

// PATCH — partial update
app.patch('/users/:id', (req, res) => {
  res.json({ message: \`User \${req.params.id} partially updated\` });
});

// DELETE — remove data
app.delete('/users/:id', (req, res) => {
  res.json({ message: \`User \${req.params.id} deleted\` });
});

app.listen(3000);`} />
          <Tip icon="🎯" color={D.yellow} title="REST mapping">GET = read, POST = create, PUT = replace, PATCH = modify, DELETE = remove. Using the correct HTTP method makes your API predictable and cacheable.</Tip>
          <CodeBlock label="test with curl" code={`curl http://localhost:3000/users              # GET
curl -X POST http://localhost:3000/users      # POST
curl -X PUT http://localhost:3000/users/5     # PUT
curl -X PATCH http://localhost:3000/users/5   # PATCH
curl -X DELETE http://localhost:3000/users/5  # DELETE`} />
        </div>
      )}
      {tab === "params" && (
        <div>
          <CodeBlock label="route parameters" code={`// :id is a route parameter
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;  // always a string
  res.json({ userId });
});

// Multiple parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

// Optional parameter
app.get('/users/:id?', (req, res) => {
  if (req.params.id) {
    res.json({ message: \`User \${req.params.id}\` });
  } else {
    res.json({ message: 'All users' });
  }
});`} />
          <EasyBox emoji="⚠️" title="req.params values are ALWAYS strings" color={D.red}>Even if the URL is <code>/users/42</code>, <code>req.params.id</code> is the string <code>"42"</code>. If you need a number, use <code>parseInt(req.params.id)</code> or <code>Number(req.params.id)</code>.</EasyBox>
        </div>
      )}
      {tab === "query" && (
        <div>
          <CodeBlock label="query strings" code={`// GET /search?q=express&limit=10
app.get('/search', (req, res) => {
  const query = req.query.q;      // 'express'
  const limit = req.query.limit;  // '10' (string!)
  res.json({ query, limit });
});

// Express automatically parses query strings
// No middleware needed for basic query parsing`} />
          <Tip icon="💡" color={D.yellow} title="req.query is also strings">Just like <code>req.params</code>, values in <code>req.query</code> are strings. <code>?limit=10</code> gives <code>"10"</code>, not <code>10</code>. Convert with <code>parseInt()</code> when needed.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="Which HTTP method should you use to create a new resource?" options={["GET", "POST", "PUT", "DELETE"]} correct={1} explain="POST is the standard HTTP method for creating new resources. GET reads, PUT updates, DELETE removes." />
          <QuizCard question="What is the value of req.params.id for the URL /users/42?" options={["42 (number)", "'42' (string)", "undefined", "null"]} correct={1} explain="req.params values are ALWAYS strings. req.params.id would be '42', not the number 42." />
          <QuizCard question="How do you access query string ?page=2 in Express?" options={["req.query.page", "req.params.page", "req.body.page", "req.headers.page"]} correct={0} explain="Express parses query strings automatically into req.query. req.query.page would be '2'." />
        </div>
      )}
    </div>
  );
}

function SectionMiddleware() {
  const [tab, setTab] = useState("concept");
  const tabs = [
    { id: "concept", label: "🧠 Concept" },
    { id: "examples", label: "💡 Examples" },
    { id: "order", label: "📊 Execution Order" },
    { id: "demo", label: "🧪 Live Demo" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Middleware functions have access to the request object, the response object, and the next middleware function in the cycle. They are the heart of Express.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#f59e0b22" : "transparent", border: `1px solid ${tab === t.id ? "#f59e0b" : D.outline}`, color: tab === t.id ? "#f59e0b" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "concept" && (
        <div>
          <BigIdea number="1" title="Middleware is just a function with (req, res, next)" color="#f59e0b">A middleware function takes three arguments: the request object, the response object, and <code>next</code> — a function that passes control to the next middleware. If you forget to call <code>next()</code>, the request hangs forever.</BigIdea>
          <CodeBlock label="middleware anatomy" code={`function myMiddleware(req, res, next) {
  // Do something with req or res
  console.log('Request URL:', req.url);
  
  // Pass control to next middleware
  next();
  
  // OR terminate the request
  // res.status(403).send('Forbidden');
}`} />
          <BigIdea number="2" title="Middleware can modify req and res" color="#3b82f6">Middleware functions can add properties to <code>req</code> or <code>res</code> that later middleware can read. This is how authentication middleware attaches <code>req.user</code> for route handlers to use.</BigIdea>
          <EasyBox emoji="🔄" title="The middleware cycle" color="#f59e0b">Request → Middleware 1 → Middleware 2 → Route Handler → Response. Each middleware can either call <code>next()</code> to continue, or call <code>res.send()</code> to end the response early.</EasyBox>
        </div>
      )}
      {tab === "examples" && (
        <div>
          <CodeBlock label="request logger middleware" code={`const logger = (req, res, next) => {
  console.log(\`\${new Date().toISOString()} — \${req.method} \${req.path}\`);
  next(); // pass control
};

app.use(logger); // applies to ALL routes`} />
          <CodeBlock label="body parser middleware (built-in)" code={`// Parse JSON request bodies
app.use(express.json());

// Now req.body contains parsed JSON
app.post('/users', (req, res) => {
  console.log(req.body); // { name: 'John', age: 30 }
  res.json({ received: req.body });
});`} />
          <CodeBlock label="authentication middleware" code={`const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === 'secret-key-123') {
    next(); // authorized, continue
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Apply to specific route
app.get('/protected', checkApiKey, (req, res) => {
  res.json({ message: 'Secret data' });
});`} />
          <Tip icon="🔑" color={D.yellow} title="Order matters">Middleware is executed in the order it is registered with <code>app.use()</code>. Put <code>express.json()</code> before routes that need <code>req.body</code>. Put authentication before protected routes.</Tip>
        </div>
      )}
      {tab === "order" && (
        <div>
          <CodeBlock label="middleware runs in definition order" code={`app.use((req, res, next) => {
  console.log('1. First');
  next();
});

app.use((req, res, next) => {
  console.log('2. Second');
  next();
});

app.get('/', (req, res) => {
  console.log('3. Route handler');
  res.send('Done');
});

// Output when visiting /:
// 1. First
// 2. Second
// 3. Route handler`} />
          <CodeBlock label="conditional middleware" code={`const auth = (req, res, next) => { ... };

// No middleware
app.get('/public', (req, res) => res.send('Public'));

// Single middleware
app.get('/dashboard', auth, (req, res) => res.send('Dashboard'));

// Multiple middleware
app.post('/admin', auth, adminOnly, (req, res) => {
  res.send('Admin panel');
});`} />
          <EasyBox emoji="⚠️" title="Missing next() hangs the request" color={D.red}>If a middleware does not call <code>next()</code> AND does not send a response, the client will wait forever. Always end the request or call next().</EasyBox>
        </div>
      )}
      {tab === "demo" && <MiddlewareOrderDemo />}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What happens if middleware does NOT call next() or res.send()?" options={["The server crashes", "The request hangs forever", "Express skips to the route handler", "The next middleware runs anyway"]} correct={1} explain="If middleware doesn't call next() and doesn't send a response, the client's request will hang indefinitely with no response." />
          <QuizCard question="How do you make middleware run on every route?" options={["app.get(middleware)", "app.use(middleware)", "app.all(middleware)", "app.route(middleware)"]} correct={1} explain="app.use(middleware) registers middleware globally — it runs on every incoming request, in the order it was defined." />
          <QuizCard question="What are the three arguments of a middleware function?" options={["(req, res, done)", "(req, res, next)", "(request, response, continue)", "(req, res, callback)"]} correct={1} explain="Express middleware takes (req, res, next). Call next() to pass control to the next middleware in the chain." />
        </div>
      )}
    </div>
  );
}

function SectionErrorHandling() {
  const [tab, setTab] = useState("sync");
  const tabs = [
    { id: "sync", label: "⚡ Sync Errors" },
    { id: "async", label: "🔄 Async Errors" },
    { id: "patterns", label: "📐 Patterns" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Error handling in Express is done via special middleware with four arguments: (err, req, res, next). This catches errors from any preceding middleware or route handler.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#f43f5e22" : "transparent", border: `1px solid ${tab === t.id ? "#f43f5e" : D.outline}`, color: tab === t.id ? "#f43f5e" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "sync" && (
        <div>
          <CodeBlock label="basic error handling middleware" code={`app.get('/divide/:a/:b', (req, res, next) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);
  
  if (b === 0) {
    return next(new Error('Cannot divide by zero'));
  }
  
  res.json({ result: a / b });
});

// Error handler MUST have 4 parameters!
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});`} />
          <Tip icon="⚠️" color={D.yellow} title="The 4-parameter rule">Express identifies error-handling middleware by checking if the function has exactly 4 parameters. If you write <code>(err, req, res)</code> with only 3, Express treats it as regular middleware and errors will crash your app.</Tip>
          <CodeBlock label="test it" code={`curl http://localhost:3000/divide/10/2   # { result: 5 }
curl http://localhost:3000/divide/10/0   # { error: "Cannot divide by zero" }`} />
        </div>
      )}
      {tab === "async" && (
        <div>
          <CodeBlock label="async errors must be passed to next()" code={`app.get('/user/:id', async (req, res, next) => {
  try {
    const user = await db.findUser(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    next(err); // pass to error handler
  }
});`} />
          <EasyBox emoji="🎯" title="Async/await trap" color={D.red}>If an async route handler throws and you don't catch it, the error is lost and the request hangs. ALWAYS wrap async code in try/catch and call next(err), OR use an async wrapper utility.</EasyBox>
          <CodeBlock label="async wrapper utility (recommended)" code={`const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Now you can write clean async routes:
app.get('/user/:id', asyncHandler(async (req, res) => {
  const user = await db.findUser(req.params.id);
  res.json(user); // errors auto-caught!
}));`} />
          <Tip icon="💡" color={D.yellow} title="express-async-errors">The npm package <code>express-async-errors</code> patches Express to automatically catch async errors. Just require it at the top: <code>require('express-async-errors')</code>. Then you never need try/catch or wrappers.</Tip>
        </div>
      )}
      {tab === "patterns" && (
        <div>
          <CodeBlock label="production error handler" code={`app.use((err, req, res, next) => {
  // Log the full error for debugging
  console.error(err.stack);
  
  // Don't leak stack traces in production
  const isDev = process.env.NODE_ENV === 'development';
  
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(isDev && { stack: err.stack }),
  });
});`} />
          <CodeBlock label="custom error class" code={`class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = String(statusCode).startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Usage:
if (!user) throw new AppError('User not found', 404);

// Error handler checks:
if (err.isOperational) {
  res.status(err.statusCode).json({ error: err.message });
} else {
  res.status(500).json({ error: 'Something went wrong' });
}`} />
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="How many parameters does an error-handling middleware have?" options={["2", "3", "4", "5"]} correct={2} explain="Express error-handling middleware MUST have exactly 4 parameters: (err, req, res, next). Express uses the arity (parameter count) to identify it." />
          <QuizCard question="What happens if an async route handler throws without try/catch?" options={["Express catches it automatically", "The error is lost and the request hangs", "The server crashes immediately", "The error handler middleware catches it"]} correct={1} explain="Without try/catch or an async wrapper, thrown errors in async handlers are lost promises. The request hangs and the client gets no response." />
          <QuizCard question="What does the asyncHandler utility do?" options={["Makes sync functions async", "Wraps the route so .catch(next) handles errors", "Replaces express.json()", "Creates a new Express app"]} correct={1} explain="asyncHandler catches any rejected promise from the async function and passes the error to next(err), which routes it to your error-handling middleware." />
        </div>
      )}
    </div>
  );
}

function SectionAuth() {
  const [tab, setTab] = useState("jwt");
  const tabs = [
    { id: "jwt", label: "🔑 JWT Basics" },
    { id: "middleware", label: "🛡️ Auth Middleware" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Authentication verifies who a user is. In Express APIs, JSON Web Tokens (JWT) are the most common authentication mechanism.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#06b6d422" : "transparent", border: `1px solid ${tab === t.id ? "#06b6d4" : D.outline}`, color: tab === t.id ? "#06b6d4" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "jwt" && (
        <div>
          <BigIdea number="1" title="JWT = JSON Web Token" color="#06b6d4">A JWT is a signed string that contains user information. It has three parts separated by dots: <strong>Header.Payload.Signature</strong>. The server signs the token with a secret key. If someone tampers with the payload, the signature no longer matches and the token is rejected.</BigIdea>
          <CodeBlock label="JWT login flow" code={`const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET; // keep this secret!

// 1. User logs in — server creates a token
app.post('/login', (req, res) => {
  // Verify username/password...
  const user = { id: 1, name: 'Alice' };
  const token = jwt.sign(user, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// 2. Client sends token in every request:
// Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

// 3. Server verifies token on protected routes`} />
          <Tip icon="🔒" color={D.yellow} title="Never put secrets in JWT">The JWT payload is Base64-encoded, not encrypted. Anyone can read it. Never put passwords, credit cards, or other secrets in the payload. Only put user ID and permissions.</Tip>
        </div>
      )}
      {tab === "middleware" && (
        <div>
          <CodeBlock label="verify token middleware" code={`const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token.' });
  }
  
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = decoded; // attach user to request
    next();
  });
};

// Public route
app.get('/public', (req, res) => {
  res.json({ message: 'Anyone can see this' });
});

// Protected route
app.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'Your profile', user: req.user });
});`} />
          <CodeBlock label="test with curl" code={`# 1. Login to get token
curl -X POST http://localhost:3000/login
# → { "token": "eyJhbGc..." }

# 2. Use token to access protected route
curl -H "Authorization: Bearer eyJhbGc..." \
  http://localhost:3000/profile`} />
          <EasyBox emoji="🎯" title="req.user pattern" color="#06b6d4">Authentication middleware attaches <code>req.user</code> so downstream route handlers know who is logged in. This pattern is used in virtually every Express authentication system.</EasyBox>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What does JWT stand for?" options={["JavaScript Web Token", "JSON Web Token", "Java Web Transfer", "Joint Web Token"]} correct={1} explain="JWT = JSON Web Token. It's a signed JSON payload used to transmit user identity between client and server." />
          <QuizCard question="Where should the client send the JWT on each request?" options={["In the request body", "In the Authorization header", "In the URL query string", "In a cookie only"]} correct={1} explain="The standard is the Authorization header with the Bearer scheme: Authorization: Bearer <token>. This keeps tokens out of URLs (which get logged) and bodies (which are for data)." />
          <QuizCard question="Why is it safe to put userId in a JWT payload?" options={["Because JWTs are encrypted", "Because the payload is signed — tampering invalidates the signature", "Because only the server can read it", "Because userId is not sensitive"]} correct={1} explain="JWT payloads are Base64-encoded (readable by anyone) but cryptographically signed. If you change the payload, the signature verification fails." />
        </div>
      )}
    </div>
  );
}

function SectionRestApi() {
  const [tab, setTab] = useState("crud");
  const tabs = [
    { id: "crud", label: "📝 CRUD" },
    { id: "design", label: "🏗️ Design" },
    { id: "example", label: "💻 Full Example" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>A well-designed REST API uses HTTP methods and status codes consistently. Express makes building these APIs straightforward.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#14b8a622" : "transparent", border: `1px solid ${tab === t.id ? "#14b8a6" : D.outline}`, color: tab === t.id ? "#14b8a6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "crud" && (
        <div>
          <div style={{ overflowX: "auto", marginBottom: 14 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: mono, fontSize: 11 }}>
              <thead><tr>{["Action", "HTTP Method", "Endpoint", "Status"].map((h, i) => (
                <th key={i} style={{ padding: "9px 12px", background: D.surface, color: [D.muted, D.muted, D.muted, D.muted][i], textAlign: "left", borderBottom: `1px solid ${D.outline}`, fontSize: 10 }}>{h}</th>
              ))}</tr></thead>
              <tbody>
                {[["Create","POST","/api/users","201 Created"],["Read all","GET","/api/users","200 OK"],["Read one","GET","/api/users/:id","200 OK"],["Update","PUT","/api/users/:id","200 OK"],["Delete","DELETE","/api/users/:id","200 OK"]].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : D.surface + "06" }}>
                    {row.map((cell, j) => <td key={j} style={{ padding: "8px 12px", borderBottom: `1px solid ${D.outline}`, color: j === 3 ? D.greenText : D.muted }}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Tip icon="🎯" color={D.yellow} title="Use plural nouns">REST endpoints should be nouns, not verbs. Use <code>/users</code> not <code>/getUsers</code>. The HTTP method tells you the action.</Tip>
        </div>
      )}
      {tab === "design" && (
        <div>
          <BigIdea number="1" title="Status codes communicate outcome" color="#14b8a6">200 = success, 201 = created, 204 = no content, 400 = bad request, 401 = unauthorized, 403 = forbidden, 404 = not found, 500 = server error. Always send the correct status code so clients can handle responses properly.</BigIdea>
          <CodeBlock label="proper status codes" code={`res.status(200).json(data);      // OK (default)
res.status(201).json(newItem);   // Created
res.status(204).send();          // No content (deleted)
res.status(400).json({ error }); // Bad request (validation)
res.status(404).json({ error }); // Not found
res.status(500).json({ error }); // Server error`} />
          <BigIdea number="2" title="Consistent response shape" color="#3b82f6">Clients should be able to predict the response structure. A common pattern: always return JSON with either a <code>data</code> key or an <code>error</code> key. Never mix shapes.</BigIdea>
          <CodeBlock label="consistent response envelope" code={`// Success:
{ "data": { "id": 1, "name": "Alice" } }

// Error:
{ "error": "User not found", "code": "USER_NOT_FOUND" }

// Never do this — different shapes for success/error:
res.json(user);        // success → object
res.json({ error });   // error → object with error key`} />
        </div>
      )}
      {tab === "example" && (
        <div>
          <CodeBlock label="complete REST API" code={`const express = require('express');
const app = express();
app.use(express.json());

let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

// GET all
app.get('/api/users', (req, res) => {
  res.json({ data: users });
});

// GET one
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ data: user });
});

// POST — create
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json({ data: newUser });
});

// PUT — update
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;
  res.json({ data: user });
});

// DELETE
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  const deleted = users.splice(index, 1);
  res.json({ data: deleted[0] });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(3000, () => console.log('API running'));`} />
          <Tip icon="💡" color={D.yellow} title="In production">Use a real database (PostgreSQL, MongoDB), validation library (Zod, Joi), and an ORM (Prisma, Mongoose). This in-memory example is for learning the REST pattern.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="Which status code means 'Created successfully'?" options={["200", "201", "204", "400"]} correct={1} explain="201 Created is the correct status code when a new resource is successfully created. 200 is generic OK, 204 is no content, 400 is bad request." />
          <QuizCard question="What is wrong with the endpoint GET /getAllUsers?" options={["GET is the wrong method", "The endpoint should use a noun, not a verb", "It needs a status code", "It should be POST"]} correct={1} explain="REST endpoints should be nouns (/users) not verbs (/getAllUsers). The HTTP method (GET) already indicates the action." />
          <QuizCard question="What status code should you return if a resource is not found?" options={["200", "400", "404", "500"]} correct={2} explain="404 Not Found is the standard status code when the requested resource does not exist. 400 is for bad requests, 500 is for server errors." />
        </div>
      )}
    </div>
  );
}

function ExpressKillNotes() {
  const groups = [
    { title: "Express Basics", color: "#8b5cf6", icon: "🚂", kills: ["Express is a minimal web framework built on Node's http module.", "app.listen(PORT) starts the server. app.use() registers middleware.", "req = request object, res = response object, next = pass to next middleware.", "res.send() can send strings, objects, or buffers. res.json() always sends JSON.", "res.status(code) sets the HTTP status. Must call before res.send() or res.json().", "Express routes are matched in the order they are defined. First match wins."] },
    { title: "Routing", color: "#3b82f6", icon: "🛣️", kills: ["app.get('/', handler) — match GET requests to the root path.", "Route parameters: '/users/:id' → req.params.id (always a string).", "Query strings: '?page=2' → req.query.page (always a string).", "app.all('/path', handler) — matches ALL HTTP methods.", "app.route('/path').get(...).post(...).put(...) — chain methods for same path.", "Use express.Router() to modularize routes into separate files."] },
    { title: "Middleware", color: "#f59e0b", icon: "🧩", kills: ["Middleware = function(req, res, next). Must call next() or end the response.", "app.use(middleware) — global. app.get('/path', middleware, handler) — route-specific.", "express.json() parses JSON bodies. express.urlencoded() parses form data.", "Middleware runs in definition order. Order matters deeply.", "Error middleware has 4 args: (err, req, res, next). Express checks arity = 4.", "You can have multiple middleware per route: app.get('/', auth, validate, handler)."] },
    { title: "Error Handling", color: "#f43f5e", icon: "🛡️", kills: ["Sync errors in route handlers are caught by Express automatically.", "Async errors MUST be passed to next(err) or the request hangs.", "Use an async wrapper: fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next).", "The error handler should be the LAST middleware registered.", "Never leak stack traces in production. Check NODE_ENV before sending stack.", "Custom error classes (AppError) let you distinguish operational vs programming errors."] },
    { title: "Authentication", color: "#06b6d4", icon: "🔐", kills: ["JWT = JSON Web Token. Signed, not encrypted. Don't put secrets in the payload.", "Login: jwt.sign(payload, SECRET, { expiresIn: '1h' }).", "Verify: jwt.verify(token, SECRET, callback) or use a try/catch wrapper.", "Standard header: Authorization: Bearer <token>.", "Auth middleware attaches req.user so routes know who is logged in.", "Always return 401 for missing/invalid tokens, 403 for valid token but insufficient permissions."] },
    { title: "REST API Design", color: "#14b8a6", icon: "🌐", kills: ["Use plural nouns for resources: /users, /posts, /orders.", "HTTP methods define actions: GET=read, POST=create, PUT=replace, PATCH=modify, DELETE=remove.", "Return proper status codes: 200, 201, 204, 400, 401, 403, 404, 500.", "Use consistent response envelopes: { data: ... } for success, { error: ... } for failure.", "Validate input before processing. Return 400 for validation errors.", "Paginate list endpoints: GET /users?page=2&limit=20."] },
  ];
  return (
    <div>
      <p style={para}>The precise facts that matter most — for building APIs, for debugging, for interviews.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {groups.map(n => (
          <div key={n.title} style={{ border: `1px solid ${n.color}33`, borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "10px 14px", background: n.color + "0d", borderBottom: `1px solid ${n.color}22`, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>{n.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 900, color: n.color, fontFamily: mono }}>{n.title}</span>
            </div>
            <div style={{ padding: "10px 14px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 6 }}>
              {n.kills.map((k, i) => (
                <div key={i} style={{ display: "flex", gap: 8 }}>
                  <span style={{ color: n.color, fontSize: 10, marginTop: 3, flexShrink: 0 }}>▸</span>
                  <span style={{ fontSize: 11, color: D.muted, lineHeight: 1.65, fontFamily: serif }}>{k}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExpressInterview() {
  const [open, setOpen] = useState(null);
  const qs = [
    { q: "What is Express.js and why is it popular?", level: "Junior", color: D.green,
      a: `Express.js is a minimal, unopinionated web framework for Node.js. It provides a thin layer of fundamental web application features on top of Node's built-in http module.

Why it's popular:
1. Minimal overhead — one of the fastest frameworks available
2. Middleware ecosystem — thousands of reusable middleware packages
3. Unopinionated — you choose your database, ORM, and architecture
4. Industry standard — virtually every Node.js job expects Express knowledge
5. Foundation for larger frameworks like NestJS and Sails

Key distinction: Express is not a full-stack framework. It only handles HTTP routing and middleware. You bring everything else.`,
      code: `// Express vs raw Node http:

// Raw Node (20+ lines for basic routing)
http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.end('Hello');
  }
});

// Express (3 lines)
app.get('/', (req, res) => res.send('Hello'));` },
    { q: "Explain the middleware pattern in Express.", level: "Junior", color: D.green,
      a: `Middleware functions are functions that have access to the request object, response object, and the next middleware function.

They can:
1. Execute any code
2. Modify the request and response objects
3. End the request-response cycle
4. Call the next middleware with next()

The execution order is determined by the order middleware is registered with app.use(). Each middleware either calls next() to pass control, or sends a response to terminate.

Error-handling middleware is special: it has 4 parameters (err, req, res, next) and Express routes errors to it automatically.`,
      code: `function logger(req, res, next) {
  console.log(req.method, req.path);
  next(); // pass to next middleware
}

function auth(req, res, next) {
  if (!req.headers.token) {
    return res.status(401).send('Unauthorized');
  }
  req.user = decodeToken(req.headers.token);
  next();
}

app.use(logger);  // global
app.use(auth);    // global
app.get('/data', (req, res) => {
  res.json({ user: req.user }); // req.user set by auth
});` },
    { q: "How do you handle errors in asynchronous Express route handlers?", level: "Mid", color: "#3b82f6",
      a: `Express does NOT automatically catch errors from async functions. If an async route handler throws and you don't catch it, the error is lost and the request hangs.

Three solutions:

1. try/catch + next(err):
   Wrap async code in try/catch and pass errors to next().

2. async wrapper utility:
   A higher-order function that catches promise rejections and calls next(err).

3. express-async-errors:
   A patch that makes Express catch async errors automatically. Just require it once.`,
      code: `// Solution 1: try/catch
app.get('/user/:id', async (req, res, next) => {
  try {
    const user = await db.findUser(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Solution 2: async wrapper (recommended)
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
app.get('/user/:id', asyncHandler(async (req, res) => {
  const user = await db.findUser(req.params.id);
  res.json(user);
}));

// Solution 3: express-async-errors
require('express-async-errors');
// Now all async errors are caught automatically` },
    { q: "What is the difference between app.use() and app.get()?", level: "Junior", color: D.green,
      a: `app.use(middleware) registers middleware that runs on EVERY HTTP method and path that matches (or all paths if no path is given). It's for global middleware like body parsers, loggers, and CORS.

app.get(path, handler) registers a route handler specifically for GET requests to the exact path. It's for defining API endpoints.

Key differences:
- app.use() matches the BEGINNING of the path. app.use('/api', handler) matches /api, /api/users, /api/anything.
- app.get() matches the EXACT path (unless using parameters like /users/:id).
- app.use() is for middleware. app.get/post/put/delete() are for route handlers.

You can combine them: app.get('/protected', authMiddleware, routeHandler).`,
      code: `app.use(express.json());       // runs on all routes, all methods
app.use('/api', apiRouter);    // runs on /api/*

app.get('/users', handler);    // only GET /users
app.post('/users', handler);   // only POST /users

// Combined:
app.get('/admin', checkAuth, checkAdmin, getAdminData);` },
    { q: "How does JWT authentication work in an Express API?", level: "Mid", color: "#3b82f6",
      a: `JWT (JSON Web Token) authentication in Express follows a three-step flow:

1. Login: The client sends credentials. The server verifies them and creates a JWT using jwt.sign(payload, SECRET, options). The token contains the user ID and is cryptographically signed.

2. Storage: The client stores the token (usually in memory or localStorage for SPAs, or httpOnly cookies for better security).

3. Verification: On every protected request, the client sends the token in the Authorization: Bearer <token> header. The server verifies the signature with jwt.verify() and attaches the decoded user to req.user.

Security notes: JWT payloads are Base64-encoded (readable by anyone), so never put secrets inside. Always use HTTPS in production to prevent token interception.`,
      code: `// Login — create token
app.post('/login', async (req, res) => {
  const user = await verifyCredentials(req.body);
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({ token });
});

// Middleware — verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

// Protected route
app.get('/profile', verifyToken, (req, res) => {
  res.json({ user: req.user });
});` },
    { q: "What makes a REST API 'RESTful'? Give Express examples.", level: "Mid", color: "#3b82f6",
      a: `A RESTful API follows these principles:

1. Resources identified by URIs: /users, /posts/42
2. HTTP methods define operations: GET=read, POST=create, PUT=replace, PATCH=modify, DELETE=remove
3. Stateless: each request contains all info needed. No server-side session.
4. Consistent status codes: 200 OK, 201 Created, 400 Bad Request, 404 Not Found
5. Representation: resources are returned as JSON (or XML)

In Express, this means using app.get('/users'), app.post('/users'), app.put('/users/:id'), etc., with proper status codes and JSON responses.`,
      code: `// RESTful Express API
app.get('/api/users', getAllUsers);          // Read all
app.get('/api/users/:id', getUser);          // Read one
app.post('/api/users', createUser);          // Create
app.put('/api/users/:id', updateUser);       // Full update
app.patch('/api/users/:id', patchUser);      // Partial update
app.delete('/api/users/:id', deleteUser);    // Delete

// Status codes
res.status(200).json({ data: users });       // OK
res.status(201).json({ data: newUser });     // Created
res.status(400).json({ error: 'Invalid' });  // Bad request
res.status(404).json({ error: 'Not found' }); // Not found` },
  ];
  return (
    <div>
      <p style={para}>These questions cover Express fundamentals, middleware internals, authentication, and API design. Know these for any backend interview.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {qs.map((q, i) => (
          <div key={i} style={{ border: `1px solid ${open === i ? q.color + "55" : D.outline}`, borderRadius: 9, overflow: "hidden", transition: "border-color 0.2s" }}>
            <button onClick={() => setOpen(open === i ? null : i)}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "11px 14px", background: open === i ? q.color + "0d" : "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontSize: 9, padding: "2px 6px", background: q.color + "22", border: `1px solid ${q.color}44`, borderRadius: 3, color: q.color, fontFamily: mono, fontWeight: 700, flexShrink: 0 }}>{q.level}</span>
              <span style={{ fontSize: 12, color: open === i ? q.color : D.text, fontFamily: serif, flex: 1, lineHeight: 1.4 }}>{q.q}</span>
              <span style={{ color: q.color, fontSize: 13, flexShrink: 0 }}>{open === i ? "▲" : "▼"}</span>
            </button>
            {open === i && (
              <div style={{ padding: "0 14px 14px", borderTop: `1px solid ${q.color}22` }}>
                <pre style={{ margin: "10px 0 0", fontSize: 12, color: D.muted, fontFamily: serif, lineHeight: 1.9, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{q.a}</pre>
                <CodeBlock label="code" code={q.code} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


const EXPRESS_SECTIONS = [
  { id: "what-express", icon: "🚂", title: "What is Express?", color: "#8b5cf6", render: () => <SectionWhatIsExpress /> },
  { id: "routing", icon: "🛣️", title: "Routing", color: "#3b82f6", render: () => <SectionRouting /> },
  { id: "middleware", icon: "🧩", title: "Middleware", color: "#f59e0b", render: () => <SectionMiddleware /> },
  { id: "errors", icon: "🛡️", title: "Error Handling", color: "#f43f5e", render: () => <SectionErrorHandling /> },
  { id: "auth", icon: "🔐", title: "Authentication", color: "#06b6d4", render: () => <SectionAuth /> },
  { id: "rest", icon: "🌐", title: "REST API Design", color: "#14b8a6", render: () => <SectionRestApi /> },
  { id: "killnotes", icon: "⚡", title: "Kill Notes", color: "#f59e0b", render: () => <ExpressKillNotes /> },
  { id: "interview", icon: "🎤", title: "Interview Q&A", color: "#ec4899", render: () => <ExpressInterview /> },
];

// ══════════════════════════════════════════════════════════════════════════════
// MAIN APP — DASHBOARD + MODULE VIEW
// ══════════════════════════════════════════════════════════════════════════════

const DATABASE_SECTIONS = [
  { id: "what-db", icon: "🗄️", title: "What are Databases?", color: "#3b82f6", render: () => <SectionWhatIsDatabase /> },
  { id: "mongodb", icon: "🍃", title: "MongoDB & Mongoose", color: "#14b8a6", render: () => <SectionMongoDB /> },
  { id: "postgres", icon: "🐘", title: "PostgreSQL", color: "#3b82f6", render: () => <SectionPostgreSQL /> },
  { id: "prisma", icon: "🔷", title: "Prisma ORM", color: "#8b5cf6", render: () => <SectionPrisma /> },
  { id: "redis", icon: "🔴", title: "Redis", color: "#f43f5e", render: () => <SectionRedis /> },
  { id: "pooling", icon: "🏊", title: "Connection Pooling", color: "#06b6d4", render: () => <SectionConnectionPooling /> },
  { id: "killnotes", icon: "⚡", title: "Kill Notes", color: "#f59e0b", render: () => <DatabaseKillNotes /> },
  { id: "interview", icon: "🎤", title: "Interview Q&A", color: "#ec4899", render: () => <DatabaseInterview /> },
];


// ══════════════════════════════════════════════════════════════════════════════
// DATABASES & ORMS SECTIONS
// ══════════════════════════════════════════════════════════════════════════════

function PoolDemo() {
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

function SectionWhatIsDatabase() {
  const [tab, setTab] = useState("story");
  const tabs = [
    { id: "story", label: "📖 The Story" },
    { id: "sql-nosql", label: "🔀 SQL vs NoSQL" },
    { id: "acid", label: "🔒 ACID" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Every real application needs a database. Without one, your data vanishes when the server restarts. Understanding databases is what separates toy projects from production software.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#3b82f622" : "transparent", border: `1px solid ${tab === t.id ? "#3b82f6" : D.outline}`, color: tab === t.id ? "#3b82f6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "story" && (
        <div>
          <BigIdea number="1" title="Memory is temporary" color={D.red}>When your Node.js server restarts, everything in RAM is wiped. Variables, arrays, objects — all gone. A database is persistent storage: data survives restarts, crashes, and deployments.</BigIdea>
          <BigIdea number="2" title="Files don't scale" color="#f59e0b">You could store data in JSON files. But what happens when two users write at the same time? What happens when the file is 10GB? Files lack concurrency control, indexing, and query languages. Databases solve all of this.</BigIdea>
          <BigIdea number="3" title="The database is the source of truth" color="#3b82f6">In any application, the database is the single source of truth. Your API reads from it, your background jobs write to it, your analytics query it. Everything else — caches, frontend state, message queues — are derived from the database.</BigIdea>
          <EasyBox emoji="🎯" title="One sentence" color="#3b82f6"><strong>A database is organized, persistent storage</strong> with built-in tools for querying, concurrency, and reliability. An ORM (Object-Relational Mapper) or ODM (Object-Document Mapper) lets you interact with the database using code objects instead of raw SQL or queries.</EasyBox>
        </div>
      )}
      {tab === "sql-nosql" && (
        <div>
          <div style={{ overflowX: "auto", marginBottom: 14 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: mono, fontSize: 11 }}>
              <thead><tr>{["Feature", "SQL (PostgreSQL)", "NoSQL (MongoDB)"].map((h, i) => (
                <th key={i} style={{ padding: "9px 12px", background: D.surface, color: [D.muted, "#3b82f6", "#14b8a6"][i], textAlign: "left", borderBottom: `1px solid ${D.outline}`, fontSize: 10 }}>{h}</th>
              ))}</tr></thead>
              <tbody>
                {[["Structure", "Tables, rows, columns", "Collections, documents, fields"],["Schema", "Rigid — defined upfront", "Flexible — dynamic"],["Relationships", "Foreign keys, JOINs", "Embedded docs, references"],["Scaling", "Vertical (bigger machine)", "Horizontal (more machines)"],["Best for", "Complex queries, transactions", "Rapid dev, unstructured data"],["Examples", "PostgreSQL, MySQL, SQLite", "MongoDB, Redis, DynamoDB"]].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : D.surface + "06" }}>
                    {row.map((cell, j) => <td key={j} style={{ padding: "8px 12px", borderBottom: `1px solid ${D.outline}`, color: j === 0 ? D.text : D.muted }}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Tip icon="🎯" color={D.yellow} title="When to choose what">Use <strong>SQL</strong> when data is structured, relationships are complex, and you need strong consistency (banks, e-commerce). Use <strong>NoSQL</strong> when schemas evolve rapidly, you need horizontal scaling, or data is document-like (CMS, IoT, real-time analytics).</Tip>
        </div>
      )}
      {tab === "acid" && (
        <div>
          <BigIdea number="1" title="ACID = reliability" color="#f43f5e">ACID is a set of properties that guarantee reliable processing of database transactions. Without ACID, a payment could debit one account without crediting another — money vanishes into thin air.</BigIdea>
          {[
            { letter: "A", word: "Atomicity", color: "#f43f5e", desc: "A transaction is all-or-nothing. If any part fails, the entire transaction rolls back. Transfer $100: debit AND credit both happen, or neither happens." },
            { letter: "C", word: "Consistency", color: "#f59e0b", desc: "A transaction brings the database from one valid state to another. Constraints, triggers, and cascades are enforced. You cannot create an order for a non-existent customer." },
            { letter: "I", word: "Isolation", color: "#3b82f6", desc: "Concurrent transactions don't interfere with each other. If Alice and Bob both read a bank balance of $1000 and try to withdraw $600, isolation prevents both from succeeding." },
            { letter: "D", word: "Durability", color: D.green, desc: "Once a transaction commits, it survives forever — even if the server crashes immediately after. Data is written to disk (and often replicated)." },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 8, alignItems: "flex-start" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: item.color + "22", border: `1px solid ${item.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, color: item.color, fontFamily: mono, flexShrink: 0 }}>{item.letter}</div>
              <div style={{ flex: 1, padding: "7px 11px", background: item.color + "08", border: `1px solid ${item.color}22`, borderRadius: 7 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: mono, marginBottom: 3 }}>{item.word}</div>
                <div style={{ fontSize: 12, color: D.muted, fontFamily: serif, lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What happens to in-memory data when a Node.js server restarts?" options={["It is saved to disk automatically", "It is wiped — everything in RAM is lost", "It persists in the V8 engine", "It moves to the event loop"]} correct={1} explain="RAM is volatile. When the process restarts, all variables, arrays, and objects are destroyed. Only persistent storage (databases, files) survives." />
          <QuizCard question="Which database type uses tables with rows and columns?" options={["NoSQL", "Document DB", "SQL", "Key-value store"]} correct={2} explain="SQL databases (PostgreSQL, MySQL) use tables with predefined schemas, rows, and columns. NoSQL databases use documents, key-value pairs, or graphs." />
          <QuizCard question="What does the 'A' in ACID stand for?" options={["Availability", "Atomicity", "Aggregation", "Asynchronous"]} correct={1} explain="Atomicity means a transaction is all-or-nothing. Either every operation in the transaction succeeds, or the entire transaction is rolled back." />
        </div>
      )}
    </div>
  );
}

function SectionMongoDB() {
  const [tab, setTab] = useState("documents");
  const tabs = [
    { id: "documents", label: "📄 Documents" },
    { id: "mongoose", label: "🦁 Mongoose" },
    { id: "crud", label: "📝 CRUD" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>MongoDB is the most popular NoSQL database. It stores data as flexible JSON-like documents instead of rigid tables.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#14b8a622" : "transparent", border: `1px solid ${tab === t.id ? "#14b8a6" : D.outline}`, color: tab === t.id ? "#14b8a6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "documents" && (
        <div>
          <CodeBlock label="a MongoDB document" code={`{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "Alice",
  email: "alice@example.com",
  age: 30,
  tags: ["developer", "blogger"],
  address: {
    city: "San Francisco",
    zip: "94102"
  },
  orders: [
    { product: "Laptop", price: 999, qty: 1 },
    { product: "Mouse", price: 29, qty: 2 }
  ],
  createdAt: ISODate("2024-01-15T10:30:00Z")
}`} />
          <BigIdea number="1" title="Documents are self-contained" color="#14b8a6">Unlike SQL where you need JOINs to fetch related data, MongoDB documents can embed related data directly. An order document can contain the customer info, shipping address, and line items — all in one place. One read, one document.</BigIdea>
          <Tip icon="🎯" color={D.yellow} title="Embed vs Reference">Embed when data is read together (user + profile). Reference when data is shared across documents (user + company). Embedding is faster to read but harder to update consistently.</Tip>
        </div>
      )}
      {tab === "mongoose" && (
        <div>
          <CodeBlock label="Mongoose schema & model" code={`const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  age:      { type: Number, min: 0, max: 150 },
  role:     { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt:{ type: Date, default: Date.now }
});

// Create model
const User = mongoose.model('User', userSchema);

// Connect
await mongoose.connect('mongodb://localhost:27017/myapp');`} />
          <EasyBox emoji="🦁" title="Why Mongoose?" color="#14b8a6">Mongoose adds structure to MongoDB's flexibility. It gives you schemas, validation, middleware (pre/post hooks), and query building. Without Mongoose, MongoDB accepts any JSON — typos in field names silently create new fields.</EasyBox>
          <CodeBlock label="schema types" code={`String, Number, Date, Buffer, Boolean,
Mixed, ObjectId, Array, Map, Decimal128

// Advanced options
{ type: String, required: true, trim: true, lowercase: true }
{ type: Number, default: 0, min: 0 }
{ type: Date, default: Date.now, immutable: true }`} />
        </div>
      )}
      {tab === "crud" && (
        <div>
          <CodeBlock label="Mongoose CRUD" code={`// CREATE
const user = await User.create({ name: 'Alice', email: 'alice@example.com' });

// READ ONE
const found = await User.findOne({ email: 'alice@example.com' });

// READ MANY with filter, sort, limit
const users = await User
  .find({ age: { $gte: 18 } })
  .sort({ createdAt: -1 })
  .limit(10)
  .select('name email');

// UPDATE
await User.updateOne({ _id: user._id }, { age: 31 });
await User.findByIdAndUpdate(id, { age: 31 }, { new: true });

// DELETE
await User.deleteOne({ _id: user._id });
await User.findByIdAndDelete(id);`} />
          <Tip icon="💡" color={D.yellow} title="Query operators">$eq, $ne, $gt, $gte, $lt, $lte, $in, $nin, $regex, $exists, $or, $and, $not. Use them to build powerful queries without writing raw JavaScript filters.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What data format does MongoDB store?" options={["CSV", "XML", "JSON-like documents", "Binary files"]} correct={2} explain="MongoDB stores data as BSON (Binary JSON) documents — flexible, nested objects that map directly to JavaScript objects." />
          <QuizCard question="What does Mongoose add to MongoDB?" options={["A SQL interface", "Schemas, validation, and middleware", "A GUI admin panel", "Automatic backups"]} correct={1} explain="Mongoose is an ODM that adds schemas, validation, type casting, query building, and middleware hooks to MongoDB." />
          <QuizCard question="When should you EMBED data vs REFERENCE it?" options={["Always embed", "Always reference", "Embed when read together, reference when shared", "It does not matter"]} correct={2} explain="Embed related data that is always read together (faster reads). Reference data that is shared across many documents (avoids duplication and inconsistency)." />
        </div>
      )}
    </div>
  );
}

function SectionPostgreSQL() {
  const [tab, setTab] = useState("basics");
  const tabs = [
    { id: "basics", label: "📐 Basics" },
    { id: "joins", label: "🔗 JOINs" },
    { id: "node", label: "🟢 Node.js" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>PostgreSQL is the gold standard of open-source relational databases. It is ACID-compliant, feature-rich, and handles complex queries better than any other database.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#3b82f622" : "transparent", border: `1px solid ${tab === t.id ? "#3b82f6" : D.outline}`, color: tab === t.id ? "#3b82f6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "basics" && (
        <div>
          <CodeBlock label="SQL fundamentals" code={`-- Create table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  age INTEGER CHECK (age >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert
INSERT INTO users (name, email, age) VALUES ('Alice', 'alice@example.com', 30);

-- Query
SELECT name, email FROM users WHERE age > 18 ORDER BY created_at DESC LIMIT 10;

-- Update
UPDATE users SET age = 31 WHERE id = 1;

-- Delete
DELETE FROM users WHERE id = 1;

-- Aggregation
SELECT COUNT(*) as total, AVG(age) as avg_age FROM users;`} />
          <Tip icon="🔑" color={D.yellow} title="Primary keys">SERIAL auto-increments. But for distributed systems, use UUID ( Universally Unique Identifier ) to avoid collision when merging databases.</Tip>
        </div>
      )}
      {tab === "joins" && (
        <div>
          <CodeBlock label="JOIN types" code={`-- INNER JOIN: only matching rows
SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id;

-- LEFT JOIN: all users, even without orders
SELECT users.name, orders.total
FROM users
LEFT JOIN orders ON users.id = orders.user_id;

-- Multiple joins
SELECT u.name, o.total, p.title
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN products p ON o.product_id = p.id
WHERE o.total > 100;`} />
          <EasyBox emoji="🔗" title="JOIN visualization" color="#3b82f6"><strong>INNER JOIN</strong> = intersection (only matches). <strong>LEFT JOIN</strong> = all from left table + matches from right (NULL if no match). <strong>RIGHT JOIN</strong> = opposite of LEFT. <strong>FULL OUTER JOIN</strong> = union of both (all rows from both tables).</EasyBox>
        </div>
      )}
      {tab === "node" && (
        <div>
          <CodeBlock label="pg driver with Pool" code={`const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost', user: 'postgres',
  password: 'secret', database: 'myapp', port: 5432
});

// Parameterized query — prevents SQL injection!
const result = await pool.query(
  'SELECT * FROM users WHERE email = $1 AND age > $2',
  ['alice@example.com', 18]
);
console.log(result.rows);

// Transaction
const client = await pool.connect();
try {
  await client.query('BEGIN');
  await client.query('UPDATE accounts SET balance = balance - 100 WHERE id = 1');
  await client.query('UPDATE accounts SET balance = balance + 100 WHERE id = 2');
  await client.query('COMMIT');
} catch (err) {
  await client.query('ROLLBACK');
  throw err;
} finally {
  client.release();
}`} />
          <Tip icon="⚠️" color={D.red} title="NEVER concatenate SQL">`SELECT * FROM users WHERE email = '${email}'` is vulnerable to SQL injection. Always use parameterized queries with `$1, $2` placeholders.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What does SQL stand for?" options={["Structured Query Language", "Simple Query Language", "System Query Logic", "Schema Query Language"]} correct={0} explain="SQL = Structured Query Language. It is the standard language for interacting with relational databases." />
          <QuizCard question="Which JOIN returns only rows that exist in BOTH tables?" options={["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL JOIN"]} correct={2} explain="INNER JOIN returns only rows where the join condition matches in both tables. LEFT JOIN returns all rows from the left table regardless of matches." />
          <QuizCard question="Why use parameterized queries ($1, $2)?" options={["They are faster", "They prevent SQL injection", "They look cleaner", "They support more data types"]} correct={1} explain="Parameterized queries separate code from data. The database treats parameters as data, not executable code, preventing attackers from injecting malicious SQL." />
        </div>
      )}
    </div>
  );
}

function SectionPrisma() {
  const [tab, setTab] = useState("schema");
  const tabs = [
    { id: "schema", label: "📝 Schema" },
    { id: "queries", label: "🔍 Queries" },
    { id: "migrate", label: "🔄 Migrations" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Prisma is a modern ORM for Node.js and TypeScript. Unlike traditional ORMs, Prisma uses a declarative schema file and generates a type-safe client.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#8b5cf622" : "transparent", border: `1px solid ${tab === t.id ? "#8b5cf6" : D.outline}`, color: tab === t.id ? "#8b5cf6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "schema" && (
        <div>
          <CodeBlock label="schema.prisma" code={`generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  posts     Post[]
  profile   Profile?
  createdAt DateTime @default(now()) @map("created_at")

  @@map("users")
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String
  content  String
  published Boolean @default(false)
  author   User   @relation(fields: [authorId], references: [id])
  authorId Int    @map("author_id")
}

model Profile {
  id     Int    @id @default(autoincrement())
  bio    String?
  user   User   @relation(fields: [userId], references: [id])
  userId Int    @unique
}`} />
          <Tip icon="🎯" color={D.yellow} title="Prisma advantages">Type-safe queries, auto-generated migrations, excellent VS Code extension, raw SQL fallback when needed, and support for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB.</Tip>
        </div>
      )}
      {tab === "queries" && (
        <div>
          <CodeBlock label="Prisma Client queries" code={`const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create with relation
const user = await prisma.user.create({
  data: {
    email: 'alice@example.com',
    name: 'Alice',
    profile: { create: { bio: 'Full-stack dev' } },
    posts: {
      create: [
        { title: 'Hello World', content: 'First post' },
        { title: 'Why Prisma', content: 'Type safety rocks' }
      ]
    }
  }
});

// Read with nested include
const users = await prisma.user.findMany({
  where: { email: { endsWith: '@example.com' } },
  include: {
    posts: { where: { published: true } },
    profile: true
  },
  orderBy: { createdAt: 'desc' },
  take: 10
});

// Update
await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Alice Updated' }
});

// Transaction
await prisma.$transaction([
  prisma.post.create({ data: { title: 'A', authorId: 1 } }),
  prisma.post.create({ data: { title: 'B', authorId: 1 } })
]);`} />
          <EasyBox emoji="✨" title="Type safety" color="#8b5cf6">Prisma generates TypeScript types from your schema. If you rename a field, your code breaks at compile time — not at runtime. No more typos in query field names.</EasyBox>
        </div>
      )}
      {tab === "migrate" && (
        <div>
          <CodeBlock label="Prisma workflow" code={`# 1. Update schema.prisma
# 2. Generate migration
npx prisma migrate dev --name add_user_role

# 3. Generate client (updates types)
npx prisma generate

# 4. Deploy to production
npx prisma migrate deploy

# 5. Studio — visual database admin
npx prisma studio`} />
          <Tip icon="💡" color={D.yellow} title="Migrations are version control for your database">Every migration is a SQL file that can be reviewed, tested, and rolled back. Never modify production databases manually — always use migrations.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What file does Prisma use to define your data model?" options={["database.json", "schema.prisma", "models.js", "prisma.config"]} correct={1} explain="Prisma uses schema.prisma — a declarative file where you define models, fields, relations, and database connection settings." />
          <QuizCard question="What does prisma.$transaction() do?" options={["Connects to multiple databases", "Runs multiple operations atomically", "Caches query results", "Creates a backup"]} correct={1} explain="$transaction runs multiple Prisma operations in a single database transaction. Either all succeed, or all are rolled back." />
          <QuizCard question="Why is Prisma considered 'type-safe'?" options={["It uses TypeScript for the schema file", "It generates types from the schema, catching errors at compile time", "It validates data at runtime", "It only works with TypeScript"]} correct={1} explain="Prisma generates TypeScript types from schema.prisma. If you mistype a field name or pass wrong types, TypeScript catches it before you even run the code." />
        </div>
      )}
    </div>
  );
}

function SectionRedis() {
  const [tab, setTab] = useState("usecases");
  const tabs = [
    { id: "usecases", label: "🎯 Use Cases" },
    { id: "commands", label: "⌨️ Commands" },
    { id: "caching", label: "💾 Caching Pattern" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Redis is an in-memory data structure store used as a database, cache, message broker, and streaming engine. It is incredibly fast because everything lives in RAM.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#f43f5e22" : "transparent", border: `1px solid ${tab === t.id ? "#f43f5e" : D.outline}`, color: tab === t.id ? "#f43f5e" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "usecases" && (
        <div>
          {[
            { title: "Session storage", color: "#f43f5e", icon: "🔑", desc: "Store user login sessions in Redis with TTL (time-to-live). When a user logs out or the session expires, Redis automatically removes it." },
            { title: "API response caching", color: "#f59e0b", icon: "⚡", desc: "Cache expensive database query results. A complex report that takes 2 seconds to generate from PostgreSQL can be served from Redis in 2 milliseconds." },
            { title: "Rate limiting", color: "#3b82f6", icon: "🚦", desc: "Track request counts per IP address using Redis counters with expiry. Block IPs that exceed 100 requests per minute." },
            { title: "Real-time leaderboards", color: "#8b5cf6", icon: "🏆", desc: "Redis Sorted Sets (ZADD, ZRANGE) are perfect for leaderboards. Add scores in O(log n) and fetch top 10 in O(log n + m)." },
            { title: "Pub/Sub messaging", color: "#14b8a6", icon: "📡", desc: "Redis Pub/Sub enables real-time messaging between servers. Perfect for WebSocket broadcasts, notifications, and chat systems." },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 10, padding: "13px 16px", background: item.color + "08", border: `1px solid ${item.color}25`, borderRadius: 9 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: mono, marginBottom: 7 }}>{item.icon} {item.title}</div>
              <p style={{ ...para, marginBottom: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      )}
      {tab === "commands" && (
        <div>
          <CodeBlock label="essential Redis commands" code={`// Strings
SET user:1 '{"name":"Alice"}'
GET user:1
SETEX session:abc 3600 'logged_in'  // set with expiry (seconds)

// Hashes (objects)
HSET user:1 name Alice email alice@example.com
HGETALL user:1

// Lists (queues)
LPUSH queue:jobs 'send_email'
RPOP queue:jobs

// Sets (unique items)
SADD tags:post:1 'javascript' 'nodejs'
SMEMBERS tags:post:1

// Sorted Sets (leaderboards)
ZADD leaderboard 1500 'Alice'
ZADD leaderboard 2300 'Bob'
ZRANGE leaderboard 0 2 WITHSCORES  // top 3

// Pub/Sub
PUBLISH notifications 'New message!'
SUBSCRIBE notifications`} />
          <Tip icon="💡" color={D.yellow} title="TTL is your friend">Always set an expiry (EXPIRE, SETEX) on cache keys. Without TTL, your Redis memory fills up until it crashes. A good default: cache for 5-15 minutes.</Tip>
        </div>
      )}
      {tab === "caching" && (
        <div>
          <CodeBlock label="cache-aside pattern" code={`const redis = require('redis');
const client = redis.createClient();
await client.connect();

async function getUser(id) {
  const cacheKey = \`user:\${id}\`;
  
  // 1. Check cache
  const cached = await client.get(cacheKey);
  if (cached) {
    console.log('Cache hit!');
    return JSON.parse(cached);
  }
  
  // 2. Cache miss — fetch from database
  console.log('Cache miss — querying DB');
  const user = await db.findUser(id);
  
  // 3. Store in cache with TTL
  await client.setEx(cacheKey, 300, JSON.stringify(user));
  
  return user;
}`} />
          <EasyBox emoji="🎯" title="Cache invalidation" color="#f43f5e">There are only two hard things in Computer Science: cache invalidation and naming things. When a user updates their profile, you MUST delete or update the cache key — or stale data will be served.</EasyBox>
          <CodeBlock label="invalidate on update" code={`async function updateUser(id, data) {
  await db.updateUser(id, data);
  await client.del(\`user:\${id}\`); // invalidate cache
}`} />
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="Why is Redis so fast?" options={["It uses a faster programming language", "All data lives in RAM (memory)", "It compresses all data", "It has fewer features"]} correct={1} explain="Redis stores everything in RAM (random access memory). RAM is ~100,000x faster than SSD disk access. That's why Redis can handle millions of operations per second." />
          <QuizCard question="What happens if you don't set TTL on cache keys?" options={["Nothing — Redis handles it", "Memory fills up until Redis crashes", "Keys automatically expire in 1 hour", "Data becomes corrupted"]} correct={1} explain="Without TTL (time-to-live), cache keys accumulate forever. Redis runs out of RAM and either crashes or starts evicting random keys. Always set expiries." />
          <QuizCard question="Which Redis data structure is best for a leaderboard?" options={["List", "Hash", "Sorted Set", "String"]} correct={2} explain="Sorted Sets (ZADD, ZRANGE) maintain elements in ranked order by score. They're perfect for leaderboards, priority queues, and time-series data." />
        </div>
      )}
    </div>
  );
}

function SectionConnectionPooling() {
  const [tab, setTab] = useState("concept");
  const tabs = [
    { id: "concept", label: "🧠 Concept" },
    { id: "config", label: "⚙️ Configuration" },
    { id: "demo", label: "🧪 Live Demo" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Opening a database connection is expensive. It requires TCP handshake, authentication, and memory allocation. Connection pools reuse connections to eliminate this overhead.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#06b6d422" : "transparent", border: `1px solid ${tab === t.id ? "#06b6d4" : D.outline}`, color: tab === t.id ? "#06b6d4" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "concept" && (
        <div>
          <BigIdea number="1" title="Creating connections is slow" color="#f59e0b">A database connection requires: TCP handshake (~20ms), TLS negotiation (~50ms), authentication query (~10ms), and memory allocation on the database server (~5ms). That's ~85ms before you run a single query. With a pool, you pay this cost once and reuse the connection.</BigIdea>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
            <div style={{ flex: 1, minWidth: 160, padding: "12px 14px", background: D.red + "08", border: `1px solid ${D.red}22`, borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: D.red, fontFamily: mono, marginBottom: 6 }}>❌ WITHOUT POOLING</div>
              <div style={{ fontSize: 11, color: D.muted, fontFamily: serif, lineHeight: 1.7 }}>
                Request 1: Open → Query → Close (85ms + 5ms)<br/>
                Request 2: Open → Query → Close (85ms + 5ms)<br/>
                Request 3: Open → Query → Close (85ms + 5ms)<br/>
                <strong>Total: 270ms for 3 queries</strong><br/>
                Max concurrent: ~100 (DB connection limit)
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 160, padding: "12px 14px", background: D.greenBg, border: `1px solid ${D.green}22`, borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: D.greenText, fontFamily: mono, marginBottom: 6 }}>✅ WITH POOLING</div>
              <div style={{ fontSize: 11, color: D.muted, fontFamily: serif, lineHeight: 1.7 }}>
                Startup: Open 10 connections (850ms once)<br/>
                Request 1: Reuse → Query (5ms)<br/>
                Request 2: Reuse → Query (5ms)<br/>
                Request 3: Reuse → Query (5ms)<br/>
                <strong>Total: 15ms for 3 queries</strong><br/>
                Max concurrent: thousands (queue + reuse)
              </div>
            </div>
          </div>
          <EasyBox emoji="🎯" title="The math" color="#06b6d4">A pool of 20 connections can serve thousands of requests per second. How? Most requests take milliseconds. One connection handles 50+ requests/second. 20 connections × 50 = 1,000 requests/second.</EasyBox>
        </div>
      )}
      {tab === "config" && (
        <div>
          <CodeBlock label="PostgreSQL pool (pg)" code={`const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'myapp',
  user: 'postgres',
  password: 'secret',
  port: 5432,
  
  // Pool settings
  max: 20,                    // maximum connections in pool
  idleTimeoutMillis: 30000,   // close idle connections after 30s
  connectionTimeoutMillis: 2000, // fail if no connection available in 2s
});

// Query — pool auto-manages connections
const result = await pool.query('SELECT * FROM users');

// For transactions, explicitly acquire and release
const client = await pool.connect();
try {
  await client.query('BEGIN');
  // ... queries ...
  await client.query('COMMIT');
} finally {
  client.release(); // ALWAYS release back to pool!
}`} />
          <CodeBlock label="Mongoose connection pooling" code={`await mongoose.connect('mongodb://localhost:27017/myapp', {
  maxPoolSize: 20,        // default: 100
  minPoolSize: 5,         // keep at least 5 connections ready
  serverSelectionTimeoutMS: 5000,
});

// Mongoose handles pooling automatically
// No need to manually release connections`} />
          <Tip icon="⚠️" color={D.red} title="Always release">If you acquire a connection from the pool for a transaction, you MUST call `client.release()` in a finally block. Otherwise the connection leaks and the pool eventually empties — all requests start failing.</Tip>
        </div>
      )}
      {tab === "demo" && <PoolDemo />}
      {tab === "quiz" && (
        <div>
          <QuizCard question="Why is opening a database connection expensive?" options={["It uses a lot of CPU", "TCP handshake + auth + memory allocation", "It requires reading from disk", "It blocks the event loop"]} correct={1} explain="Each connection requires TCP handshake, TLS negotiation, authentication, and server-side memory allocation. This takes 50-100ms — an eternity for a web request." />
          <QuizCard question="What happens if you forget client.release() in a transaction?" options={["Nothing — the pool auto-releases", "The connection leaks and the pool eventually empties", "The transaction auto-commits", "The query runs twice"]} correct={1} explain="Failing to release a connection removes it from the pool permanently. After enough leaks, the pool has zero available connections and every new request times out." />
          <QuizCard question="How many requests can a 20-connection pool handle?" options={["Exactly 20", "About 50-100", "Thousands per second", "It depends on the database size"]} correct={2} explain="A single connection can handle 50+ requests/second (each query takes ~1-5ms). 20 connections × 50 = 1,000+ requests/second. The pool queues excess requests." />
        </div>
      )}
    </div>
  );
}

function DatabaseKillNotes() {
  const groups = [
    { title: "SQL vs NoSQL", color: "#3b82f6", icon: "🔀", kills: ["SQL = tables, rows, rigid schema, ACID, vertical scaling.", "NoSQL = documents/key-value/graph, flexible schema, horizontal scaling.", "Use SQL for complex relationships and strong consistency.", "Use NoSQL for rapid development and unstructured data.", "PostgreSQL is the gold standard of open-source SQL databases.", "MongoDB is the most popular document database."] },
    { title: "MongoDB & Mongoose", color: "#14b8a6", icon: "🍃", kills: ["MongoDB stores JSON-like documents in collections.", "Mongoose adds schemas, validation, middleware, and query building.", "Embed data read together; reference data shared across documents.", "findOne(), find(), create(), updateOne(), deleteOne() are core methods.", "Query operators: $eq, $gt, $gte, $lt, $in, $regex, $or, $and.", "Mongoose middleware: pre('save'), post('remove'), etc."] },
    { title: "PostgreSQL", color: "#3b82f6", icon: "🐘", kills: ["PostgreSQL is ACID-compliant, feature-rich, and open-source.", "Always use parameterized queries ($1, $2) to prevent SQL injection.", "JOINs: INNER (matches only), LEFT (all left + matches), FULL (union).", "Use Pool from 'pg' for connection management in Node.js.", "Transactions: BEGIN → queries → COMMIT/ROLLBACK.", "SERIAL for auto-increment; UUID for distributed systems."] },
    { title: "Prisma", color: "#8b5cf6", icon: "🔷", kills: ["Prisma uses schema.prisma to define models and relations declaratively.", "Generates type-safe client from schema — catches errors at compile time.", "prisma migrate dev creates versioned migrations.", "prisma generate updates the client after schema changes.", "$transaction runs multiple operations atomically.", "Supports PostgreSQL, MySQL, SQLite, SQL Server, and MongoDB."] },
    { title: "Redis", color: "#f43f5e", icon: "🔴", kills: ["Redis is an in-memory key-value store — ~100,000x faster than disk.", "Common uses: sessions, API caching, rate limiting, leaderboards, pub/sub.", "Always set TTL (EXPIRE/SETEX) on cache keys to prevent memory exhaustion.", "Cache-aside pattern: check cache → miss? query DB → store in cache.", "Invalidate cache on update: del(key) after writing to the database.", "Data types: String, Hash, List, Set, Sorted Set, Stream, Bitmap."] },
    { title: "Connection Pooling", color: "#06b6d4", icon: "🏊", kills: ["Opening a DB connection costs 50-100ms (TCP + auth + alloc).", "Pools reuse connections — reducing per-query overhead to ~1-5ms.", "Default pg Pool max = 10. Mongoose default max = 100.", "Always release pooled connections in a finally block.", "idleTimeoutMillis closes unused connections to save memory.", "connectionTimeoutMillis prevents requests from waiting forever."] },
  ];
  return (
    <div>
      <p style={para}>The precise facts that matter most — for building data layers, for debugging, for interviews.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {groups.map(n => (
          <div key={n.title} style={{ border: `1px solid ${n.color}33`, borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "10px 14px", background: n.color + "0d", borderBottom: `1px solid ${n.color}22`, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>{n.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 900, color: n.color, fontFamily: mono }}>{n.title}</span>
            </div>
            <div style={{ padding: "10px 14px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 6 }}>
              {n.kills.map((k, i) => (
                <div key={i} style={{ display: "flex", gap: 8 }}>
                  <span style={{ color: n.color, fontSize: 10, marginTop: 3, flexShrink: 0 }}>▸</span>
                  <span style={{ fontSize: 11, color: D.muted, lineHeight: 1.65, fontFamily: serif }}>{k}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DatabaseInterview() {
  const [open, setOpen] = useState(null);
  const qs = [
    { q: "What is the difference between SQL and NoSQL databases?", level: "Junior", color: D.green,
      a: `SQL databases are relational. They store data in tables with predefined schemas, use SQL for queries, support ACID transactions, and scale vertically (bigger machines). Examples: PostgreSQL, MySQL.

NoSQL databases are non-relational. They store data as documents, key-value pairs, graphs, or wide-columns. They have flexible schemas, scale horizontally (more machines), and sacrifice some consistency for availability and partition tolerance. Examples: MongoDB, Redis, DynamoDB.

When to choose:
- SQL: Complex relationships, financial data, strong consistency requirements.
- NoSQL: Rapid prototyping, unstructured data, massive scale, real-time analytics.`,
      code: `// SQL — rigid schema
CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100));

// NoSQL (MongoDB) — flexible schema
{ name: "Alice", email: "alice@example.com", anything: "goes" }` },
    { q: "What is connection pooling and why does it matter?", level: "Junior", color: D.green,
      a: `Opening a database connection is expensive. It requires TCP handshake, TLS negotiation, authentication, and memory allocation on the database server. This takes 50-100ms.

A connection pool maintains a set of reusable connections. When your app needs to query, it borrows a connection from the pool, runs the query, and returns it. The next request reuses the same connection.

Without pooling: 1000 requests = 1000 connection openings = 85 seconds of overhead.
With pooling (size 20): 1000 requests reuse 20 connections = negligible overhead.

Key settings: max (pool size), idleTimeoutMillis, connectionTimeoutMillis.`,
      code: `const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  database: 'myapp',
  max: 20,                    // max connections
  idleTimeoutMillis: 30000,   // close idle after 30s
  connectionTimeoutMillis: 2000
});

// Connection reused automatically
const result = await pool.query('SELECT * FROM users');` },
    { q: "Explain the cache-aside pattern with Redis.", level: "Mid", color: "#3b82f6",
      a: `Cache-aside (lazy loading) is the most common caching strategy:

1. Check cache first: Look up the data in Redis by key.
2. Cache hit: Return the cached data immediately.
3. Cache miss: Query the database for the data.
4. Populate cache: Store the result in Redis with a TTL.
5. Return data: Return the freshly fetched data.

Invalidation: When data is updated in the database, delete or update the corresponding cache key. Otherwise stale data will be served.

This pattern is simple and resilient. If Redis goes down, the app falls back to the database — slower, but functional.`,
      code: `async function getUser(id) {
  const key = \`user:\${id}\`;
  
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached); // hit
  
  const user = await db.findUser(id);    // miss
  await redis.setEx(key, 300, JSON.stringify(user));
  return user;
}

async function updateUser(id, data) {
  await db.updateUser(id, data);
  await redis.del(\`user:\${id}\`); // invalidate
}` },
    { q: "What are database migrations and why are they important?", level: "Mid", color: "#3b82f6",
      a: `A database migration is a version-controlled script that changes your database schema. It is the Git of database structure.

Why they matter:
1. Reproducibility: Any developer can run migrations and get the exact same schema.
2. Team collaboration: Two developers changing the schema don't conflict — migrations are ordered and versioned.
3. Production safety: Migrations are reviewed, tested, and run automatically in CI/CD.
4. Rollbacks: Bad migration? Roll it back to the previous state.

Without migrations, developers manually modify databases, leading to "it works on my machine" bugs and production disasters.`,
      code: `// Prisma migration example
// 1. Edit schema.prisma
model User {
  id   Int    @id @default(autoincrement())
  name String
  role String @default("user")  // added this field
}

// 2. Generate migration
npx prisma migrate dev --name add_user_role

// 3. Apply to production
npx prisma migrate deploy` },
    { q: "How does MongoDB handle relationships compared to PostgreSQL?", level: "Mid", color: "#3b82f6",
      a: `PostgreSQL uses foreign keys and JOINs. Relationships are defined by IDs in separate tables. To fetch a user with their orders, you JOIN the users and orders tables. This is normalized — no data duplication, but requires multiple reads or JOINs.

MongoDB uses embedding and references. A user document can contain an array of order sub-documents (embedded). One read gets everything. Alternatively, orders can reference a user_id (denormalized references).

Embedding pros: Fast reads, atomic updates within the document.
Embedding cons: Large documents, harder to query embedded arrays, data duplication.

Reference pros: No duplication, flexible querying.
Reference cons: Multiple queries needed (no JOINs), no atomic multi-document transactions (before MongoDB 4.0).`,
      code: `// MongoDB — embedded (one read gets everything)
{
  name: "Alice",
  orders: [
    { product: "Laptop", price: 999 },
    { product: "Mouse", price: 29 }
  ]
}

// PostgreSQL — normalized (JOIN required)
-- users table: id, name
-- orders table: id, user_id, product, price
SELECT u.name, o.product, o.price
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE u.name = 'Alice';` },
    { q: "What is ACID and why is it important?", level: "Junior", color: D.green,
      a: `ACID is a set of properties that guarantee reliable database transactions:

Atomicity: A transaction is all-or-nothing. If a bank transfer debits one account but fails to credit another, the entire transaction rolls back. No partial changes.

Consistency: A transaction must leave the database in a valid state. All constraints, foreign keys, and triggers are satisfied after the transaction completes.

Isolation: Concurrent transactions don't interfere. If two users simultaneously read a balance of $1000 and try to withdraw $600, isolation ensures only one succeeds.

Durability: Once committed, a transaction survives forever — even if the server crashes the next millisecond. Data is written to disk (and usually replicated).

Without ACID, financial systems, inventory systems, and reservation systems would lose data and create impossible states.`,
      code: `// PostgreSQL transaction
const client = await pool.connect();
try {
  await client.query('BEGIN');
  await client.query('UPDATE accounts SET balance = balance - 100 WHERE id = 1');
  await client.query('UPDATE accounts SET balance = balance + 100 WHERE id = 2');
  await client.query('COMMIT');         // all changes persist
} catch (err) {
  await client.query('ROLLBACK');       // nothing changes
} finally {
  client.release();
}` },
  ];
  return (
    <div>
      <p style={para}>These questions cover database fundamentals, caching, connection pooling, and schema design. Know these for any backend interview.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {qs.map((q, i) => (
          <div key={i} style={{ border: `1px solid ${open === i ? q.color + "55" : D.outline}`, borderRadius: 9, overflow: "hidden", transition: "border-color 0.2s" }}>
            <button onClick={() => setOpen(open === i ? null : i)}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "11px 14px", background: open === i ? q.color + "0d" : "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontSize: 9, padding: "2px 6px", background: q.color + "22", border: `1px solid ${q.color}44`, borderRadius: 3, color: q.color, fontFamily: mono, fontWeight: 700, flexShrink: 0 }}>{q.level}</span>
              <span style={{ fontSize: 12, color: open === i ? q.color : D.text, fontFamily: serif, flex: 1, lineHeight: 1.4 }}>{q.q}</span>
              <span style={{ color: q.color, fontSize: 13, flexShrink: 0 }}>{open === i ? "▲" : "▼"}</span>
            </button>
            {open === i && (
              <div style={{ padding: "0 14px 14px", borderTop: `1px solid ${q.color}22` }}>
                <pre style={{ margin: "10px 0 0", fontSize: 12, color: D.muted, fontFamily: serif, lineHeight: 1.9, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{q.a}</pre>
                <CodeBlock label="code" code={q.code} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


const TESTING_SECTIONS = [
  { id: "what-testing", icon: "🧪", title: "Why Test?", color: "#f59e0b", render: () => <SectionWhatIsTesting /> },
  { id: "jest", icon: "🃏", title: "Jest", color: "#f43f5e", render: () => <SectionJest /> },
  { id: "supertest", icon: "🌐", title: "Supertest", color: "#8b5cf6", render: () => <SectionSupertest /> },
  { id: "integration", icon: "🔗", title: "Integration Tests", color: "#14b8a6", render: () => <SectionIntegration /> },
  { id: "debugging", icon: "🐛", title: "Debugging", color: "#06b6d4", render: () => <SectionDebugging /> },
  { id: "killnotes", icon: "⚡", title: "Kill Notes", color: "#f59e0b", render: () => <TestingKillNotes /> },
  { id: "interview", icon: "🎤", title: "Interview Q&A", color: "#ec4899", render: () => <TestingInterview /> },
];


// ══════════════════════════════════════════════════════════════════════════════
// TESTING & DEBUGGING SECTIONS
// ══════════════════════════════════════════════════════════════════════════════

function TestRunnerDemo() {
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

function SectionWhatIsTesting() {
  const [tab, setTab] = useState("story");
  const tabs = [
    { id: "story", label: "📖 Why Test?" },
    { id: "pyramid", label: "🔺 Test Pyramid" },
    { id: "types", label: "📋 Test Types" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Testing is not about finding bugs — it is about preventing them. A good test suite gives you confidence to refactor, deploy on Fridays, and sleep at night.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#f59e0b22" : "transparent", border: `1px solid ${tab === t.id ? "#f59e0b" : D.outline}`, color: tab === t.id ? "#f59e0b" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "story" && (
        <div>
          <BigIdea number="1" title="Untested code is broken code" color={D.red}>If you have not tested it, you do not know if it works. It might work on your machine, with your data, today. But will it work on the production server, with 10,000 users, after the next refactor? Testing is the only way to know.</BigIdea>
          <BigIdea number="2" title="Tests are documentation" color="#3b82f6">A well-written test describes what the code SHOULD do better than any comment. New developers can read tests to understand the system. When requirements change, tests show exactly what behavior must be preserved.</BigIdea>
          <BigIdea number="3" title="Tests enable refactoring" color={D.green}>Without tests, changing code is terrifying. You might break something and not know for weeks. With tests, you refactor fearlessly. If the tests pass, the system works. This is how codebases stay healthy over years.</BigIdea>
          <EasyBox emoji="🎯" title="One sentence" color="#f59e0b"><strong>Tests are a safety net</strong> that lets you move fast without breaking things. They are not optional — they are a professional requirement.</EasyBox>
        </div>
      )}
      {tab === "pyramid" && (
        <div>
          <CodeBlock label="the test pyramid" code={`        /\\
       /  \\     E2E Tests     (slow, expensive, few)
      /----\\
     /      \\   Integration   (medium, medium)
    /--------\\
   /          \\ Unit Tests    (fast, cheap, many)
  --------------`} />
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
            {[
              { type: "Unit Tests", pct: "70%", speed: "< 10ms", cost: "Cheap", color: D.green, desc: "Test a single function in isolation. Mock all dependencies. Run thousands in seconds." },
              { type: "Integration Tests", pct: "20%", speed: "~100ms", cost: "Medium", color: "#f59e0b", desc: "Test multiple components together. Hit the database. Verify APIs." },
              { type: "E2E Tests", pct: "10%", speed: "> 1s", cost: "Expensive", color: "#f43f5e", desc: "Test the entire app like a real user. Open browser, click buttons, fill forms." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "8px 12px", background: item.color + "08", border: `1px solid ${item.color}22`, borderRadius: 7 }}>
                <div style={{ width: 40, flexShrink: 0, textAlign: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 900, color: item.color, fontFamily: mono }}>{item.pct}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: mono, marginBottom: 2 }}>{item.type}</div>
                  <div style={{ fontSize: 11, color: D.muted, fontFamily: serif, lineHeight: 1.6 }}>{item.desc} <span style={{ color: item.color + "99", fontFamily: mono }}>({item.speed}, {item.cost})</span></div>
                </div>
              </div>
            ))}
          </div>
          <Tip icon="🎯" color={D.yellow} title="The pyramid rule">Most of your tests should be fast unit tests. Fewer integration tests. Very few E2E tests. Inverting the pyramid (many E2E, few unit) makes your test suite slow and brittle.</Tip>
        </div>
      )}
      {tab === "types" && (
        <div>
          <CodeBlock label="test types explained" code={`// UNIT TEST — test one function
expect(add(2, 3)).toBe(5);

// INTEGRATION TEST — test API + database
const res = await request(app).post('/users').send({ name: 'Alice' });
expect(res.status).toBe(201);

// E2E TEST — test like a real user
await page.goto('http://localhost:3000');
await page.click('[data-testid="login"]');
await page.fill('[name="email"]', 'alice@example.com');`} />
          <BigIdea number="1" title="AAA Pattern" color="#8b5cf6">Arrange — set up the test data and mocks. Act — call the function under test. Assert — verify the outcome. Every test should follow this structure. If you can't split a test into these three parts, it is probably testing too much.</BigIdea>
          <EasyBox emoji="🎯" title="TDD: Test-Driven Development" color={D.green}>Write the test FIRST, watch it fail, then write the minimum code to make it pass, then refactor. TDD forces you to think about requirements before implementation and guarantees every line of code has a test.</EasyBox>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What is the main purpose of tests?" options={["To find bugs after they happen", "To prevent bugs and enable confident refactoring", "To make code run faster", "To replace documentation"]} correct={1} explain="Tests primarily prevent bugs by catching them before they reach production. They also give developers confidence to refactor and change code without fear." />
          <QuizCard question="According to the test pyramid, what percentage should be unit tests?" options={["10%", "30%", "70%", "90%"]} correct={2} explain="The test pyramid recommends ~70% unit tests (fast, cheap), ~20% integration tests, and ~10% E2E tests (slow, expensive)." />
          <QuizCard question="What does AAA stand for in test structure?" options={["Always Assert Always", "Arrange, Act, Assert", "Async, Await, Assert", "Add, Apply, Assert"]} correct={1} explain="AAA = Arrange (set up), Act (execute), Assert (verify). This structure makes tests readable and maintainable." />
        </div>
      )}
    </div>
  );
}

function SectionJest() {
  const [tab, setTab] = useState("basics");
  const tabs = [
    { id: "basics", label: "📝 Basics" },
    { id: "matchers", label: "✅ Matchers" },
    { id: "mocking", label: "🎭 Mocking" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Jest is the most popular JavaScript testing framework. It works out of the box with zero configuration and provides everything you need: test running, assertions, mocking, and coverage.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#f43f5e22" : "transparent", border: `1px solid ${tab === t.id ? "#f43f5e" : D.outline}`, color: tab === t.id ? "#f43f5e" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "basics" && (
        <div>
          <CodeBlock label="first Jest test" code={`// math.js
const add = (a, b) => a + b;
const divide = (a, b) => {
  if (b === 0) throw new Error('Cannot divide by zero');
  return a / b;
};
module.exports = { add, divide };

// math.test.js
const { add, divide } = require('./math');

describe('math', () => {
  test('adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('throws on divide by zero', () => {
    expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
  });
});`} />
          <CodeBlock label="run tests" code={`npx jest                    # run all tests once
npx jest --watch            # watch mode — rerun on file change
npx jest --coverage         # generate coverage report
npx jest math.test.js       # run single file
npx jest --testNamePattern="adds"  # run matching tests`} />
          <Tip icon="🎯" color={D.yellow} title="File naming">Jest discovers files ending in `.test.js` or `.spec.js`, and files inside `__tests__` folders. Name your tests after the file they test: `user.js` → `user.test.js`.</Tip>
        </div>
      )}
      {tab === "matchers" && (
        <div>
          <CodeBlock label="common matchers" code={`expect(value).toBe(5);                    // strict equality (===)
expect(value).toEqual({ a: 1 });          // deep equality (objects/arrays)
expect(value).toBeTruthy();               // any truthy value
expect(value).toBeNull();                 // null specifically
expect(value).toBeUndefined();            // undefined
expect(array).toContain('item');          // array contains item
expect(array).toHaveLength(3);            // array length
expect(fn).toHaveBeenCalled();            // mock was called
expect(fn).toHaveBeenCalledTimes(2);      // called exactly twice
expect(fn).toHaveBeenCalledWith('arg');   // called with specific arg
expect(promise).resolves.toBe('ok');      // async resolve
expect(promise).rejects.toThrow('err');   // async reject`} />
          <EasyBox emoji="⚠️" title="toBe vs toEqual" color={D.red}><code>toBe</code> uses <code>===</code> — it fails for objects even if they look identical: <code>expect({'{a:1}'}).toBe({'{a:1}'})</code> FAILS. Use <code>toEqual</code> for objects and arrays. Use <code>toBe</code> for primitives.</EasyBox>
        </div>
      )}
      {tab === "mocking" && (
        <div>
          <CodeBlock label="mocking with Jest" code={`// Mock a module
jest.mock('./api', () => ({
  fetchUser: jest.fn(() => Promise.resolve({ id: 1, name: 'Alice' }))
}));

// Spy on a function
const spy = jest.spyOn(console, 'log');
myFunction();
expect(spy).toHaveBeenCalledWith('hello');
spy.mockRestore();

// Mock implementations
const mockFn = jest.fn();
mockFn.mockReturnValue(42);
mockFn.mockResolvedValue({ data: [] });   // for async
mockFn.mockRejectedValue(new Error('fail'));

// Reset mocks between tests
beforeEach(() => {
  jest.clearAllMocks();  // reset call counts
});`} />
          <Tip icon="🎯" color={D.yellow} title="When to mock">Mock external dependencies (APIs, databases, file system) in unit tests. Do NOT mock the code you are testing. If you find yourself mocking everything, you are writing an integration test — use the real dependencies instead.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="Which matcher should you use for object equality?" options={["toBe", "toEqual", "toContain", "toMatch"]} correct={1} explain="toEqual performs deep equality comparison for objects and arrays. toBe uses === which fails for objects because they have different references." />
          <QuizCard question="What does jest.fn() create?" options={["A real function", "A mock/spy function", "A test suite", "A module"]} correct={1} explain="jest.fn() creates a mock function that tracks how it was called. You can inspect calls, set return values, and verify it was invoked correctly." />
          <QuizCard question="Which command runs tests and watches for file changes?" options={["npx jest --run", "npx jest --watch", "npx jest --dev", "npx jest --live"]} correct={1} explain="npx jest --watch enters watch mode, automatically rerunning tests when files change. It's the standard workflow during development." />
        </div>
      )}
    </div>
  );
}

function SectionSupertest() {
  const [tab, setTab] = useState("intro");
  const tabs = [
    { id: "intro", label: "🌐 Intro" },
    { id: "crud", label: "📝 CRUD Tests" },
    { id: "auth", label: "🔐 Auth Tests" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Supertest lets you test Express APIs without starting a real server on a port. It sends HTTP requests to your app directly and gives you powerful assertions on the response.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#8b5cf622" : "transparent", border: `1px solid ${tab === t.id ? "#8b5cf6" : D.outline}`, color: tab === t.id ? "#8b5cf6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "intro" && (
        <div>
          <CodeBlock label="basic supertest setup" code={`const request = require('supertest');
const app = require('./app');  // your Express app (NOT app.listen!)

describe('GET /users', () => {
  test('returns all users as JSON', async () => {
    const response = await request(app)
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200);
    
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});`} />
          <BigIdea number="1" title="No server required" color="#8b5cf6">Supertest hooks directly into Express's request handling. You don't call app.listen(). You don't need a running server. This makes tests fast, isolated, and parallelizable. No port conflicts, no cleanup.</BigIdea>
          <EasyBox emoji="🎯" title="Chainable API" color="#8b5cf6">Supertest uses a fluent API: <code>request(app).get('/').set('Authorization', token).send(body).expect(200)</code>. Each method returns the request object for chaining.</EasyBox>
        </div>
      )}
      {tab === "crud" && (
        <div>
          <CodeBlock label="full CRUD test suite" code={`describe('Users API', () => {
  test('POST /users creates a user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Alice', email: 'alice@example.com' })
      .expect(201);
    
    expect(res.body.data.name).toBe('Alice');
    expect(res.body.data).toHaveProperty('id');
  });

  test('GET /users/:id returns a user', async () => {
    const res = await request(app)
      .get('/users/1')
      .expect(200);
    
    expect(res.body.data.id).toBe(1);
  });

  test('PUT /users/:id updates a user', async () => {
    const res = await request(app)
      .put('/users/1')
      .send({ name: 'Alice Updated' })
      .expect(200);
    
    expect(res.body.data.name).toBe('Alice Updated');
  });

  test('DELETE /users/:id removes a user', async () => {
    await request(app)
      .delete('/users/1')
      .expect(200);
    
    await request(app)
      .get('/users/1')
      .expect(404);
  });
});`} />
          <Tip icon="💡" color={D.yellow} title="Test isolation">Each test should create its own data and clean up after itself. Never assume data from another test exists. Use beforeEach to reset the database state.</Tip>
        </div>
      )}
      {tab === "auth" && (
        <div>
          <CodeBlock label="testing authenticated endpoints" code={`describe('Protected Routes', () => {
  test('returns 401 without token', async () => {
    await request(app)
      .get('/profile')
      .expect(401);
  });

  test('returns user with valid token', async () => {
    // 1. Login to get token
    const login = await request(app)
      .post('/login')
      .send({ email: 'alice@example.com', password: 'secret' });
    
    const token = login.body.token;
    
    // 2. Use token on protected route
    const res = await request(app)
      .get('/profile')
      .set('Authorization', \`Bearer \${token}\`)
      .expect(200);
    
    expect(res.body.user.email).toBe('alice@example.com');
  });
});`} />
          <EasyBox emoji="🔐" title="Test the unhappy path" color={D.red}>Don't just test success cases. Test 401 Unauthorized, 403 Forbidden, 404 Not Found, 400 Bad Request, and 500 errors. Your API's error responses are part of its contract — test them.</EasyBox>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What is the main advantage of Supertest over manual HTTP requests?" options={["It is faster to write", "It tests the app directly without starting a server", "It only works with Express", "It generates API documentation"]} correct={1} explain="Supertest hooks into Express directly. No server startup, no port binding, no cleanup. Tests run faster and can execute in parallel." />
          <QuizCard question="How do you send a JSON body in Supertest?" options={[".body({})", ".send({})", ".json({})", ".data({})"]} correct={1} explain=".send({}) sends a JSON body. Supertest automatically sets Content-Type: application/json when you pass an object." />
          <QuizCard question="What status code should you test for a missing resource?" options={["200", "400", "404", "500"]} correct={2} explain="404 Not Found is the correct status when a requested resource does not exist. Test this to ensure your API returns meaningful errors." />
        </div>
      )}
    </div>
  );
}

function SectionIntegration() {
  const [tab, setTab] = useState("setup");
  const tabs = [
    { id: "setup", label: "⚙️ Test Setup" },
    { id: "db", label: "🗄️ Test Database" },
    { id: "patterns", label: "📐 Patterns" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Integration tests verify that your API, database, and middleware work together. They are slower than unit tests but catch bugs that unit tests miss.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#14b8a622" : "transparent", border: `1px solid ${tab === t.id ? "#14b8a6" : D.outline}`, color: tab === t.id ? "#14b8a6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "setup" && (
        <div>
          <CodeBlock label="Jest lifecycle hooks" code={`describe('User API', () => {
  beforeAll(async () => {
    // Run once before all tests
    await connectToTestDatabase();
    await runMigrations();
  });

  beforeEach(async () => {
    // Run before EACH test
    await cleanDatabase();
  });

  afterEach(async () => {
    // Run after EACH test
    await cleanDatabase();
  });

  afterAll(async () => {
    // Run once after all tests
    await disconnectDatabase();
  });

  test('creates a user', async () => {
    // Test runs with a clean database
  });
});`} />
          <Tip icon="🎯" color={D.yellow} title="Clean state">Each test should start with a clean database. Never let test data leak between tests. Use TRUNCATE or transactions to reset state in beforeEach.</Tip>
        </div>
      )}
      {tab === "db" && (
        <div>
          <CodeBlock label="test database setup" code={`// config.js
const DB_NAME = process.env.NODE_ENV === 'test' ? 'myapp_test' : 'myapp';

// test-helper.js
const { Pool } = require('pg');
const pool = new Pool({ database: 'myapp_test' });

async function cleanDatabase() {
  await pool.query('TRUNCATE users, orders RESTART IDENTITY CASCADE');
}

async function setupTestDB() {
  await pool.query('BEGIN');
  // insert seed data
  await pool.query("INSERT INTO users (name, email) VALUES ('Seed', 'seed@test.com')");
  await pool.query('COMMIT');
}

module.exports = { pool, cleanDatabase, setupTestDB };`} />
          <EasyBox emoji="⚠️" title="Never test on production" color={D.red}>Your test suite should connect to a separate test database. Testing on production or development databases destroys real data. Use `NODE_ENV=test` to switch databases automatically.</EasyBox>
          <CodeBlock label="package.json scripts" code={`{
  "scripts": {
    "test": "NODE_ENV=test jest",
    "test:watch": "NODE_ENV=test jest --watch",
    "test:coverage": "NODE_ENV=test jest --coverage"
  }
}`} />
        </div>
      )}
      {tab === "patterns" && (
        <div>
          <CodeBlock label="factory pattern for test data" code={`// factories/user.js
const { User } = require('../models');

function createUser(overrides = {}) {
  return User.create({
    name: 'Test User',
    email: \`test+\${Date.now()}@example.com\`,
    ...overrides
  });
}

// In tests
const user = await createUser({ name: 'Alice', role: 'admin' });
const user2 = await createUser(); // uses defaults`} />
          <CodeBlock label="transaction rollback pattern" code={`beforeEach(async () => {
  // Start transaction before each test
  await db.query('BEGIN');
});

afterEach(async () => {
  // Roll back all changes after each test
  await db.query('ROLLBACK');
});

// Fastest cleanup — no TRUNCATE needed!
// But only works if your app uses the same connection`} />
          <Tip icon="💡" color={D.yellow} title="Factories > Fixtures">Factories generate test data programmatically. Fixtures are static JSON files. Factories are more flexible — you can override specific fields per test without modifying shared files.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="Which hook runs BEFORE EACH test?" options={["beforeAll", "beforeEach", "afterEach", "afterAll"]} correct={1} explain="beforeEach runs before every single test in a describe block. Use it to reset database state and ensure test isolation." />
          <QuizCard question="Why should you use a separate test database?" options={["It is faster", "It prevents destroying real data", "It has more features", "It is required by Jest"]} correct={1} explain="Tests create, modify, and delete data. Running tests on a production or development database would destroy real data and cause data corruption." />
          <QuizCard question="What is the factory pattern in testing?" options={["A design pattern for building APIs", "A function that creates test data with defaults and overrides", "A way to mock external services", "A tool for measuring code coverage"]} correct={1} explain="A factory is a helper function that creates test objects with sensible defaults. You pass overrides for specific fields, keeping tests concise and readable." />
        </div>
      )}
    </div>
  );
}

function SectionDebugging() {
  const [tab, setTab] = useState("console");
  const tabs = [
    { id: "console", label: "🖨️ Console" },
    { id: "inspect", label: "🔍 Inspect" },
    { id: "vscode", label: "🆚 VS Code" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Debugging is the art of finding out why your code does not do what you think it does. Professional developers debug systematically — they do not guess.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#06b6d422" : "transparent", border: `1px solid ${tab === t.id ? "#06b6d4" : D.outline}`, color: tab === t.id ? "#06b6d4" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "console" && (
        <div>
          <CodeBlock label="advanced console methods" code={`console.log('basic output');
console.table([
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
]);

console.time('query');
await db.query('SELECT * FROM users');
console.timeEnd('query');  // query: 45.2ms

console.trace('where was this called?');  // full stack trace
console.group('User Processing');
console.log('Step 1: validate');
console.log('Step 2: save');
console.groupEnd();`} />
          <Tip icon="🎯" color={D.yellow} title="Use console.dir for objects">`console.dir(obj, {'{ depth: null }'})` prints the full object tree without truncation. Use it when `console.log` cuts off nested properties.</Tip>
        </div>
      )}
      {tab === "inspect" && (
        <div>
          <CodeBlock label="node --inspect" code={`// Add debugger statement
function calculate(a, b) {
  debugger;  // execution pauses here
  return a / b;
}

// Run with inspector
node --inspect-brk app.js   // pause on first line
node --inspect app.js       // start inspector, run until debugger

// Then open chrome://inspect in Chrome
// Click "Open dedicated DevTools for Node"`} />
          <BigIdea number="1" title="debugger > console.log" color="#06b6d4">console.log tells you what happened. The debugger shows you WHY it happened. You can inspect variables at every step, set conditional breakpoints, and watch expressions. When you are stuck for more than 10 minutes, stop adding logs and use the debugger.</BigIdea>
          <EasyBox emoji="🎯" title="ndb — enhanced debugger" color="#06b6d4">`npm install -g ndb` gives you Chrome DevTools with Node-specific features. It handles source maps better and provides a cleaner experience than raw `--inspect`.</EasyBox>
        </div>
      )}
      {tab === "vscode" && (
        <div>
          <CodeBlock label="VS Code launch.json" code={`{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Server",
      "program": "\${workspaceFolder}/server.js",
      "env": { "NODE_ENV": "development" },
      "console": "integratedTerminal"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Jest Tests",
      "program": "\${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--runInBand"],
      "console": "integratedTerminal"
    }
  ]
}`} />
          <Tip icon="💡" color={D.yellow} title="Breakpoints in VS Code">Click the gutter to set breakpoints. Right-click → "Edit Breakpoint" to add conditions like `i === 5`. Use F5 to start debugging, F10 to step over, F11 to step into, Shift+F11 to step out.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What does the `debugger;` statement do?" options={["Logs debug info", "Pauses execution for inspection", "Starts a new thread", "Enables verbose logging"]} correct={1} explain="The debugger statement pauses JavaScript execution when a debugger is attached (Chrome DevTools, VS Code, ndb). You can then inspect variables, step through code, and set breakpoints." />
          <QuizCard question="Which is better for complex debugging?" options={["Adding 20 console.log statements", "Using a debugger with breakpoints", "Reading the source code", "Restarting the server"]} correct={1} explain="A debugger lets you pause execution, inspect variables, and step through code line by line. It is far more powerful and faster than adding logs for complex issues." />
          <QuizCard question="How do you start Node.js with the inspector?" options={["node --debug app.js", "node --inspect app.js", "node --dev app.js", "node --watch app.js"]} correct={1} explain="node --inspect starts the V8 inspector. You can then connect Chrome DevTools (chrome://inspect) or VS Code to debug your Node.js application." />
        </div>
      )}
    </div>
  );
}

function TestingKillNotes() {
  const groups = [
    { title: "Testing Fundamentals", color: "#f59e0b", icon: "🧪", kills: ["Unit tests: fast, isolated, many (70%).", "Integration tests: test components together (20%).", "E2E tests: test like a real user (10%).", "AAA: Arrange, Act, Assert.", "TDD: write tests BEFORE code.", "Untested code is technical debt."] },
    { title: "Jest", color: "#f43f5e", icon: "🃏", kills: ["Jest discovers .test.js and __tests__ folders automatically.", "describe() groups tests. test() or it() defines a test.", "expect(value).toBe(5) for primitives. toEqual({}) for objects.", "jest.fn() creates mock functions. jest.spyOn() watches real functions.", "jest.mock() replaces entire modules.", "--watch reruns tests on file change. --coverage generates reports.", "beforeEach/afterEach for setup and cleanup."] },
    { title: "Supertest", color: "#8b5cf6", icon: "🌐", kills: ["Supertest tests Express apps without starting a real server.", "request(app).get('/').expect(200) is the basic pattern.", ".send({}) sends JSON body. .set() sets headers.", "Test both happy paths AND error paths (401, 404, 400, 500).", "Each test should create its own data — never depend on other tests.", "Use async/await — Supertest returns promises."] },
    { title: "Integration Testing", color: "#14b8a6", icon: "🔗", kills: ["Use a separate test database. Never test on production.", "Clean database state before/after each test.", "TRUNCATE tables or use transaction rollback for fast cleanup.", "Factory pattern > fixtures for generating test data.", "beforeAll: connect DB. afterAll: disconnect DB.", "beforeEach: clean state. afterEach: clean state.", "Integration tests catch bugs that unit tests miss."] },
    { title: "Debugging", color: "#06b6d4", icon: "🐛", kills: ["console.table(), console.time(), console.trace() are powerful.", "debugger; pauses execution — use with --inspect or VS Code.", "node --inspect app.js starts the V8 inspector.", "ndb is an enhanced Node debugger with better source maps.", "VS Code launch.json configures debug profiles.", "Breakpoints > console.log for complex issues.", "Conditional breakpoints: pause only when a condition is met."] },
  ];
  return (
    <div>
      <p style={para}>The precise facts that matter most — for writing tests, for debugging, for interviews.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {groups.map(n => (
          <div key={n.title} style={{ border: `1px solid ${n.color}33`, borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "10px 14px", background: n.color + "0d", borderBottom: `1px solid ${n.color}22`, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>{n.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 900, color: n.color, fontFamily: mono }}>{n.title}</span>
            </div>
            <div style={{ padding: "10px 14px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 6 }}>
              {n.kills.map((k, i) => (
                <div key={i} style={{ display: "flex", gap: 8 }}>
                  <span style={{ color: n.color, fontSize: 10, marginTop: 3, flexShrink: 0 }}>▸</span>
                  <span style={{ fontSize: 11, color: D.muted, lineHeight: 1.65, fontFamily: serif }}>{k}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestingInterview() {
  const [open, setOpen] = useState(null);
  const qs = [
    { q: "What is the difference between unit, integration, and E2E tests?", level: "Junior", color: D.green,
      a: `Unit tests verify a single function in isolation. They mock all dependencies and run in milliseconds. They are fast, cheap, and you should have many of them (~70% of your test suite).

Integration tests verify that multiple components work together — your API, database, and middleware. They are slower (~100ms) but catch bugs that unit tests miss (~20%).

E2E (End-to-End) tests verify the entire application like a real user. They open a browser, click buttons, and fill forms. They are slow (>1s), expensive to maintain, and you should have few of them (~10%).

The test pyramid: many unit tests at the bottom, fewer integration tests, very few E2E tests at the top.`,
      code: `// Unit — test one function
expect(add(2, 3)).toBe(5);

// Integration — test API + database
const res = await request(app).post('/users').send({ name: 'Alice' });
expect(res.status).toBe(201);

// E2E — test like a real user
await page.goto('http://localhost:3000');
await page.click('[data-testid="login"]');` },
    { q: "Why is mocking important in unit testing?", level: "Junior", color: D.green,
      a: `Unit tests should test ONE thing in isolation. If a function calls an external API, you don't want your test to actually hit that API — it would be slow, unreliable, and might fail for network reasons unrelated to your code.

Mocking replaces external dependencies with controlled fakes. You define exactly what the mock returns, then verify that your code handles that response correctly.

When NOT to mock: integration tests. In integration tests, you WANT to test the real database, the real API client, and the real middleware working together.`,
      code: `// Mock external API
jest.mock('./stripe', () => ({
  charge: jest.fn(() => Promise.resolve({ id: 'ch_123', status: 'succeeded' }))
}));

// Spy without changing behavior
const spy = jest.spyOn(logger, 'info');
processOrder();
expect(spy).toHaveBeenCalledWith('Order processed');
spy.mockRestore();` },
    { q: "How do you test an Express API endpoint?", level: "Mid", color: "#3b82f6",
      a: `Use Supertest. It sends HTTP requests directly to your Express app without starting a real server. This makes tests fast, isolated, and parallelizable.

Best practices:
1. Test both success and error paths (200, 201, 400, 404, 401, 500).
2. Create your own test data in beforeEach — never depend on other tests.
3. Use a separate test database with clean state before each test.
4. Assert on response status, headers, AND body structure.
5. For authenticated endpoints, log in first and use the token.`,
      code: `const request = require('supertest');
const app = require('./app');

describe('POST /users', () => {
  test('creates a user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Alice', email: 'alice@example.com' })
      .expect(201);
    
    expect(res.body.data).toMatchObject({
      name: 'Alice',
      email: 'alice@example.com'
    });
  });

  test('returns 400 for invalid data', async () => {
    await request(app)
      .post('/users')
      .send({ name: '' })
      .expect(400);
  });
});` },
    { q: "What are database migrations and why should tests use them?", level: "Mid", color: "#3b82f6",
      a: `Migrations are version-controlled scripts that change your database schema. They ensure every developer and every environment (local, CI, production) has the exact same database structure.

Tests should use migrations because:
1. Your test database schema must match your production schema.
2. Running migrations in CI guarantees tests run against the correct schema.
3. Migrations make schema changes reproducible and reviewable.

Test workflow: run migrations → truncate tables → run tests → truncate tables → repeat.

Never manually modify the test database schema. Always use migrations.`,
      code: `// test-setup.js
beforeAll(async () => {
  // Apply migrations to test database
  await exec('npx prisma migrate deploy');
});

beforeEach(async () => {
  // Clean state
  await prisma.$executeRaw\`TRUNCATE users, orders RESTART IDENTITY CASCADE\`;
});` },
    { q: "How do you debug a Node.js application?", level: "Junior", color: D.green,
      a: `Three levels of debugging:

1. Console methods: console.log, console.table, console.time, console.trace. Fast but limited.

2. debugger statement + --inspect: Add debugger; in your code, run node --inspect app.js, then open chrome://inspect. You get breakpoints, variable inspection, and step-through debugging.

3. VS Code debugger: Create .vscode/launch.json, set breakpoints in the editor, and press F5. Best for everyday development because it integrates with your workflow.

Rule: if you have added more than 3 console.logs and still don't understand the bug, switch to a real debugger.`,
      code: `// debugger statement
function processOrder(order) {
  debugger;  // pauses here when inspector is attached
  const total = calculateTotal(order);
  return total;
}

// Start with inspector
node --inspect app.js

// VS Code launch.json
{
  "type": "node",
  "request": "launch",
  "name": "Debug",
  "program": "\${workspaceFolder}/app.js"
}` },
    { q: "What is the cache-aside pattern and how do you test it?", level: "Mid", color: "#3b82f6",
      a: `Cache-aside (lazy loading): check cache first, return if hit. If miss, query database, store in cache, return data.

Testing the cache-aside pattern:
1. First call: cache miss → verify database was queried → verify result was cached.
2. Second call: cache hit → verify database was NOT queried → verify result returned from cache.
3. After update: verify cache was invalidated → next call should be a miss.

You need a real Redis instance (or Redis memory server) for these tests because you are testing the integration between your code and Redis.`,
      code: `test('caches after first call', async () => {
  // First call — cache miss
  const r1 = await getUser(1);
  expect(r1.name).toBe('Alice');
  
  // Second call — cache hit
  const spy = jest.spyOn(db, 'findUser');
  const r2 = await getUser(1);
  expect(r2.name).toBe('Alice');
  expect(spy).not.toHaveBeenCalled();  // no DB query!
  
  // After update — invalidate
  await updateUser(1, { name: 'Bob' });
  const r3 = await getUser(1);
  expect(r3.name).toBe('Bob');
});` },
  ];
  return (
    <div>
      <p style={para}>These questions cover testing strategy, Jest patterns, API testing, and debugging techniques. Know these for any backend interview.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {qs.map((q, i) => (
          <div key={i} style={{ border: `1px solid ${open === i ? q.color + "55" : D.outline}`, borderRadius: 9, overflow: "hidden", transition: "border-color 0.2s" }}>
            <button onClick={() => setOpen(open === i ? null : i)}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "11px 14px", background: open === i ? q.color + "0d" : "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontSize: 9, padding: "2px 6px", background: q.color + "22", border: `1px solid ${q.color}44`, borderRadius: 3, color: q.color, fontFamily: mono, fontWeight: 700, flexShrink: 0 }}>{q.level}</span>
              <span style={{ fontSize: 12, color: open === i ? q.color : D.text, fontFamily: serif, flex: 1, lineHeight: 1.4 }}>{q.q}</span>
              <span style={{ color: q.color, fontSize: 13, flexShrink: 0 }}>{open === i ? "▲" : "▼"}</span>
            </button>
            {open === i && (
              <div style={{ padding: "0 14px 14px", borderTop: `1px solid ${q.color}22` }}>
                <pre style={{ margin: "10px 0 0", fontSize: 12, color: D.muted, fontFamily: serif, lineHeight: 1.9, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{q.a}</pre>
                <CodeBlock label="code" code={q.code} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


const DEVOPS_SECTIONS = [
  { id: "what-devops", icon: "🚀", title: "What is DevOps?", color: "#f59e0b", render: () => <SectionWhatIsDevOps /> },
  { id: "docker", icon: "🐳", title: "Docker", color: "#3b82f6", render: () => <SectionDocker /> },
  { id: "pm2", icon: "⚙️", title: "PM2", color: "#8b5cf6", render: () => <SectionPM2 /> },
  { id: "nginx", icon: "🔄", title: "nginx", color: "#14b8a6", render: () => <SectionNginx /> },
  { id: "cicd", icon: "🚀", title: "CI/CD", color: "#f59e0b", render: () => <SectionCICD /> },
  { id: "monitoring", icon: "📊", title: "Monitoring", color: "#f43f5e", render: () => <SectionMonitoring /> },
  { id: "killnotes", icon: "⚡", title: "Kill Notes", color: "#f59e0b", render: () => <DevOpsKillNotes /> },
  { id: "interview", icon: "🎤", title: "Interview Q&A", color: "#ec4899", render: () => <DevOpsInterview /> },
];


// ══════════════════════════════════════════════════════════════════════════════
// DEPLOYMENT & DEVOPS SECTIONS
// ══════════════════════════════════════════════════════════════════════════════

function CiCdDemo() {
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

function SectionWhatIsDevOps() {
  const [tab, setTab] = useState("story");
  const tabs = [
    { id: "story", label: "📖 The Story" },
    { id: "concepts", label: "🎯 Key Concepts" },
    { id: "workflow", label: "🔄 Workflow" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>DevOps is the bridge between writing code and running it in production. It is not a job title — it is a mindset of automating everything that can be automated.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#f59e0b22" : "transparent", border: `1px solid ${tab === t.id ? "#f59e0b" : D.outline}`, color: tab === t.id ? "#f59e0b" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "story" && (
        <div>
          <BigIdea number="1" title="It worked on my machine" color={D.red}>The most expensive sentence in software. A developer writes code on their Mac, it works perfectly, they push to production, and everything breaks. Why? Different Node versions, missing environment variables, wrong OS libraries. DevOps exists to eliminate this gap.</BigIdea>
          <BigIdea number="2" title="Manual deployment is dangerous" color="#f43f5e">In 2010, deploying meant: SSH into server, git pull, npm install, restart service, pray. If something broke at 2 AM, someone got paged. Modern DevOps replaces all of this with automated pipelines that test, build, and deploy with zero human intervention.</BigIdea>
          <BigIdea number="3" title="Infrastructure as Code" color="#3b82f6">Instead of configuring servers by clicking buttons in a dashboard, you write code (Dockerfiles, Terraform, Ansible) that creates and configures servers. This makes infrastructure version-controlled, reproducible, and reviewable — just like application code.</BigIdea>
          <EasyBox emoji="🎯" title="DevOps in one sentence" color="#f59e0b"><strong>DevOps is the practice of shipping code to production automatically, reliably, and observably.</strong> If you cannot deploy in one command and know within seconds if something broke, you do not have DevOps.</EasyBox>
        </div>
      )}
      {tab === "concepts" && (
        <div>
          {[
            { title: "Containerization", color: "#3b82f6", icon: "📦", desc: "Package your app with all dependencies into a container. Runs identically on your laptop, in CI, and in production. Docker is the standard." },
            { title: "Process Management", color: "#8b5cf6", icon: "⚙️", desc: "Node.js crashes when an unhandled error occurs. PM2 keeps it running, restarts on failure, clusters across CPU cores, and handles zero-downtime reloads." },
            { title: "Reverse Proxy", color: "#14b8a6", icon: "🔄", desc: "nginx sits between the internet and your app. It handles SSL, serves static files, load-balances across multiple Node processes, and blocks malicious traffic." },
            { title: "CI/CD", color: "#f59e0b", icon: "🚀", desc: "Continuous Integration: every push triggers automated tests. Continuous Deployment: every passing build deploys to production automatically. GitHub Actions, GitLab CI, CircleCI." },
            { title: "Monitoring", color: "#f43f5e", icon: "📊", desc: "You cannot fix what you cannot see. Health checks, structured logs, error tracking (Sentry), and metrics (Prometheus) tell you when things break before users complain." },
            { title: "Environment Management", color: D.green, icon: "🔐", desc: "Secrets and config live outside the codebase in environment variables. .env files for local, injected secrets for production. Never commit passwords to Git." },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 10, padding: "13px 16px", background: item.color + "08", border: `1px solid ${item.color}25`, borderRadius: 9 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: mono, marginBottom: 7 }}>{item.icon} {item.title}</div>
              <p style={{ ...para, marginBottom: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      )}
      {tab === "workflow" && (
        <div>
          <CodeBlock label="the modern deployment workflow" code={`Developer pushes code
        ↓
GitHub Actions (CI) triggers
        ↓
Run tests → Lint → Type check → Build
        ↓
All checks pass?
        ↓ YES
Build Docker image
        ↓
Push to container registry
        ↓
SSH to production server
        ↓
Pull new image
        ↓
pm2 reload (zero-downtime)
        ↓
Health check passes?
        ↓ YES
Traffic routed to new version
        ↓
Monitor logs & metrics`} />
          <Tip icon="🎯" color={D.yellow} title="The golden rule">If a step in the pipeline fails, deployment stops immediately. You never deploy code that failed tests. This is why CI/CD is a safety net, not just automation.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What problem does Docker solve?" options={["It makes code run faster", "It packages apps so they run identically everywhere", "It replaces the need for a database", "It automatically writes tests"]} correct={1} explain="Docker containers include your app, runtime, and dependencies. A container runs the same on your Mac, in CI, and on the production Linux server." />
          <QuizCard question="What is the purpose of a reverse proxy like nginx?" options={["To replace Node.js", "To handle SSL, static files, and forward requests to Node.js", "To compile JavaScript", "To store session data"]} correct={1} explain="nginx sits in front of Node.js. It terminates SSL, serves static files efficiently, and proxies API requests to your Node app. It also enables load balancing across multiple Node processes." />
          <QuizCard question="What does CI/CD stand for?" options={["Code Integration / Code Deployment", "Continuous Integration / Continuous Deployment", "Container Infrastructure / Container Delivery", "Computer Intelligence / Computer Deployment"]} correct={1} explain="CI = Continuous Integration (automated tests on every push). CD = Continuous Deployment (automatic deployment when tests pass)." />
        </div>
      )}
    </div>
  );
}

function SectionDocker() {
  const [tab, setTab] = useState("dockerfile");
  const tabs = [
    { id: "dockerfile", label: "🐳 Dockerfile" },
    { id: "compose", label: "🎼 Compose" },
    { id: "commands", label: "⌨️ Commands" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Docker containers are lightweight, portable, and isolated. They solve the "it works on my machine" problem forever.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#3b82f622" : "transparent", border: `1px solid ${tab === t.id ? "#3b82f6" : D.outline}`, color: tab === t.id ? "#3b82f6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "dockerfile" && (
        <div>
          <CodeBlock label="production Dockerfile" code={`FROM node:20-alpine

WORKDIR /app

# Copy dependency files first (for layer caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Create non-root user for security
USER node

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD curl -f http://localhost:3000/health || exit 1

# Start command
CMD ["node", "server.js"]`} />
          <BigIdea number="1" title="Layer caching" color="#3b82f6">Docker builds images in layers. If package.json hasn't changed, Docker reuses the cached `npm ci` layer. This makes rebuilds 10x faster. Always copy package files BEFORE copying source code.</BigIdea>
          <Tip icon="🔒" color={D.yellow} title="Security">Never run containers as root. Use `USER node` or create a dedicated user. A compromised root container can access the host system.</Tip>
        </div>
      )}
      {tab === "compose" && (
        <div>
          <CodeBlock label="docker-compose.yml" code={`version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://db:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app

volumes:
  pgdata:`} />
          <EasyBox emoji="🎯" title="Why docker-compose?" color="#3b82f6">Docker Compose defines your entire stack in one file: app, database, cache, and proxy. One command (`docker-compose up`) starts everything. One command (`docker-compose down`) stops everything. Perfect for local development and CI.</EasyBox>
        </div>
      )}
      {tab === "commands" && (
        <div>
          <CodeBlock label="essential Docker commands" code={`docker build -t myapp .              # build image
docker run -p 3000:3000 myapp        # run container
docker run -d --name api myapp       # run detached (background)
docker ps                            # list running containers
docker logs api                      # view container logs
docker exec -it api sh               # shell into container
docker stop api && docker rm api     # stop and remove
docker-compose up -d                 # start all services
docker-compose down -v               # stop and remove volumes
docker system prune -f               # clean unused images`} />
          <Tip icon="💡" color={D.yellow} title=".dockerignore">Create a `.dockerignore` file to exclude `node_modules`, `.git`, and `.env` from the build context. This makes builds faster and prevents secrets from leaking into images.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="Why copy package.json before source code in a Dockerfile?" options={["It is required by Docker", "It enables layer caching for faster rebuilds", "It makes the image smaller", "It improves security"]} correct={1} explain="Docker caches layers. If package.json hasn't changed, Docker skips npm install and reuses the cached layer. This makes rebuilds dramatically faster." />
          <QuizCard question="What does docker-compose do?" options={["Builds a single container", "Defines and runs multi-container applications", "Replaces Kubernetes", "Monitors container health"]} correct={1} explain="Docker Compose lets you define multiple services (app, database, cache, proxy) in one YAML file and start them all with a single command." />
          <QuizCard question="Why should containers NOT run as root?" options={["Root is slower", "A compromised root container can access the host system", "Root uses more memory", "Root cannot bind to ports"]} correct={1} explain="Running as root inside a container is a security risk. If an attacker breaks into the container, they have root access to the host system. Always use a non-root user." />
        </div>
      )}
    </div>
  );
}

function SectionPM2() {
  const [tab, setTab] = useState("intro");
  const tabs = [
    { id: "intro", label: "⚡ Intro" },
    { id: "cluster", label: "🔄 Cluster Mode" },
    { id: "config", label: "⚙️ Config" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>PM2 is a production process manager for Node.js. It keeps your app running, restarts crashes, clusters across CPU cores, and handles zero-downtime deployments.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#8b5cf622" : "transparent", border: `1px solid ${tab === t.id ? "#8b5cf6" : D.outline}`, color: tab === t.id ? "#8b5cf6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "intro" && (
        <div>
          <CodeBlock label="PM2 basics" code={`npm install -g pm2

pm2 start server.js --name "api"
pm2 list
pm2 logs api
pm2 reload api          # zero-downtime restart
pm2 restart api         # hard restart
pm2 stop api
pm2 delete api
pm2 save                # save process list
pm2 startup             # generate startup script
pm2 monit               # real-time monitoring`} />
          <BigIdea number="1" title="Node.js crashes by default" color={D.red}>If an unhandled error throws in Node.js, the entire process exits. In production, this means downtime until someone manually restarts it. PM2 watches your process and instantly restarts it on crash — keeping your API available.</BigIdea>
          <EasyBox emoji="🎯" title="Zero-downtime reload" color="#8b5cf6">`pm2 reload` starts new processes alongside old ones, then swaps traffic over. Users experience zero downtime. This is how production deployments should work.</EasyBox>
        </div>
      )}
      {tab === "cluster" && (
        <div>
          <CodeBlock label="cluster mode" code={`# Use all CPU cores
pm2 start server.js -i max

# Or specify number of instances
pm2 start server.js -i 4

# What this does:
# Core 1: Node process #1
# Core 2: Node process #2
# Core 3: Node process #3
# Core 4: Node process #4
# All share port 3000 (PM2 load balances)`} />
          <BigIdea number="1" title="One Node process = one CPU core" color="#f59e0b">Node.js is single-threaded. A single Node process can only use one CPU core. On an 8-core server, 7 cores sit idle. Cluster mode starts one process per core, multiplying your throughput by the number of cores.</BigIdea>
          <Tip icon="🎯" color={D.yellow} title="When to cluster">Always cluster in production. A single core might handle 1,000 requests/second. Eight cores handle 8,000. The only exception: if your app is memory-bound (large ML models) rather than CPU-bound.</Tip>
        </div>
      )}
      {tab === "config" && (
        <div>
          <CodeBlock label="ecosystem.config.js" code={`module.exports = {
  apps: [{
    name: 'api',
    script: './server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 80
    },
    // Logging
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    merge_logs: true,
    // Memory limit
    max_memory_restart: '500M',
    // Auto-restart
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};`} />
          <CodeBlock label="run with config" code={`pm2 start ecosystem.config.js
pm2 start ecosystem.config.js --env production
pm2 reload ecosystem.config.js`} />
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What happens when an unhandled error occurs in Node.js?" options={["It logs the error and continues", "The process crashes and exits", "It restarts automatically", "It sends an email"]} correct={1} explain="By default, an unhandled exception crashes the Node.js process. Without PM2, your server goes down until someone manually restarts it." />
          <QuizCard question="What does pm2 start app.js -i max do?" options={["Runs the app with maximum memory", "Starts one process per CPU core", "Enables debug mode", "Sets the port to maximum"]} correct={1} explain="-i max starts one Node.js process for every CPU core, with PM2 load-balancing requests between them. This maximizes hardware utilization." />
          <QuizCard question="What is the difference between restart and reload?" options={["They are the same", "Restart stops then starts; reload swaps processes with zero downtime", "Restart is faster", "Reload only works in development"]} correct={1} explain="pm2 restart kills the process and starts a new one (downtime). pm2 reload starts new processes alongside old ones, then swaps traffic over (zero downtime)." />
        </div>
      )}
    </div>
  );
}

function SectionNginx() {
  const [tab, setTab] = useState("proxy");
  const tabs = [
    { id: "proxy", label: "🔄 Reverse Proxy" },
    { id: "ssl", label: "🔒 SSL" },
    { id: "static", label: "📁 Static Files" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>nginx is the world's most popular web server and reverse proxy. It handles SSL, serves static files, load-balances traffic, and protects your Node.js app from the open internet.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#14b8a622" : "transparent", border: `1px solid ${tab === t.id ? "#14b8a6" : D.outline}`, color: tab === t.id ? "#14b8a6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "proxy" && (
        <div>
          <CodeBlock label="nginx reverse proxy" code={`server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}`} />
          <BigIdea number="1" title="Why proxy through nginx?" color="#14b8a6">Node.js is excellent at handling dynamic requests but not optimized for serving static files or handling SSL encryption. nginx is written in C and handles these tasks 10x more efficiently. It also adds a layer of security — the internet talks to nginx, not directly to your Node process.</BigIdea>
          <Tip icon="🎯" color={D.yellow} title="X-Forwarded-For">When nginx proxies a request, the client's real IP is in `X-Forwarded-For`. Your Express app should read this header to get the original IP for rate limiting and logging.</Tip>
        </div>
      )}
      {tab === "ssl" && (
        <div>
          <CodeBlock label="free SSL with Let's Encrypt" code={`# Install certbot
sudo apt install certbot python3-certbot-nginx

# Generate certificate
sudo certbot --nginx -d api.example.com

# Auto-renew (certbot sets this up automatically)
# Certificates expire every 90 days
# certbot renews them automatically via cron`} />
          <CodeBlock label="nginx with SSL" code={`server {
    listen 443 ssl http2;
    server_name api.example.com;

    ssl_certificate /etc/letsencrypt/live/api.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.example.com/privkey.pem;

    # Modern SSL config
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://localhost:3000;
    }
}`} />
          <EasyBox emoji="🔒" title="Always use HTTPS" color={D.red}>Without HTTPS, passwords and tokens travel over the internet in plain text. Anyone on the same WiFi can intercept them. Let's Encrypt provides free SSL certificates. There is no excuse for HTTP in production.</EasyBox>
        </div>
      )}
      {tab === "static" && (
        <div>
          <CodeBlock label="serving static files" code={`server {
    listen 80;
    server_name example.com;

    # Serve static files directly (fast!)
    location /static/ {
        alias /var/www/static/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Serve uploads
    location /uploads/ {
        alias /var/www/uploads/;
        expires 7d;
    }

    # Everything else goes to Node.js
    location / {
        proxy_pass http://localhost:3000;
    }
}`} />
          <Tip icon="💡" color={D.yellow} title="Let nginx serve static files">Never serve static files from Express in production. Express reads files through the Node.js event loop, blocking other requests. nginx serves them directly from disk using sendfile — zero Node.js involvement.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="Why use nginx in front of Node.js?" options={["To replace Node.js entirely", "To handle SSL, static files, and proxy requests efficiently", "To add JavaScript features", "To connect to the database"]} correct={1} explain="nginx handles SSL termination, static file serving, and request proxying far more efficiently than Node.js. It also adds a security layer between the internet and your app." />
          <QuizCard question="What does Let's Encrypt provide?" options={["Paid SSL certificates", "Free SSL certificates", "Database hosting", "Docker images"]} correct={1} explain="Let's Encrypt is a nonprofit that provides free SSL certificates. certbot automates the setup and renewal process. Every production site should use HTTPS." />
          <QuizCard question="Which header contains the client's real IP when using nginx?" options={["Host", "X-Real-IP", "Content-Type", "Authorization"]} correct={1} explain="When nginx proxies a request, the client's IP is passed via X-Real-IP and X-Forwarded-For headers. Your app should read these to get the original IP address." />
        </div>
      )}
    </div>
  );
}

function SectionCICD() {
  const [tab, setTab] = useState("github");
  const tabs = [
    { id: "github", label: "🐙 GitHub Actions" },
    { id: "pipeline", label: "🔄 Pipeline" },
    { id: "strategies", label: "🎯 Strategies" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>CI/CD automates testing and deployment. Every push to your repository triggers a pipeline that verifies your code and ships it to production — without human intervention.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#f59e0b22" : "transparent", border: `1px solid ${tab === t.id ? "#f59e0b" : D.outline}`, color: tab === t.id ? "#f59e0b" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "github" && (
        <div>
          <CodeBlock label="GitHub Actions workflow" code={`.github/workflows/deploy.yml

name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to server
        run: |
          ssh user@server "cd /app && git pull && npm ci && pm2 reload api"
        env:
          SSH_PRIVATE_KEY: \${{ secrets.SSH_PRIVATE_KEY }}`} />
          <Tip icon="🔑" color={D.yellow} title="Secrets">Never put passwords or SSH keys in your workflow file. Use GitHub Secrets (Settings → Secrets and variables → Actions) to store them securely.</Tip>
        </div>
      )}
      {tab === "pipeline" && (
        <div>
          <CiCdDemo />
          <CodeBlock label="typical pipeline stages" code={`1. Checkout code
2. Install dependencies (npm ci)
3. Run linter (eslint)
4. Run type checker (tsc)
5. Run tests (jest --coverage)
6. Build application (vite build)
7. Build Docker image
8. Push image to registry
9. Deploy to staging
10. Run smoke tests
11. Deploy to production`} />
        </div>
      )}
      {tab === "strategies" && (
        <div>
          <BigIdea number="1" title="Blue-Green Deployment" color="#3b82f6">Run two identical production environments: Blue (live) and Green (idle). Deploy to Green, test it, then switch traffic from Blue to Green. If something breaks, switch back instantly. Zero downtime, instant rollback.</BigIdea>
          <BigIdea number="2" title="Rolling Deployment" color="#14b8a6">Replace old instances one at a time. If you have 5 servers, take one offline, deploy the new version, bring it back, then move to the next. No extra infrastructure needed, but rollback is slower.</BigIdea>
          <BigIdea number="3" title="Canary Deployment" color="#f59e0b">Deploy the new version to 5% of users. Monitor error rates and performance. If everything looks good, gradually increase to 25%, 50%, 100%. If errors spike, roll back the 5% instantly. Safest but most complex.</BigIdea>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What does the needs keyword do in GitHub Actions?" options={["It installs npm packages", "It makes one job wait for another to complete", "It defines environment variables", "It creates a Docker container"]} correct={1} explain="needs: test means the deploy job waits for the test job to finish successfully. If tests fail, deployment is automatically skipped." />
          <QuizCard question="What is blue-green deployment?" options={["A deployment that uses Docker", "Two identical environments where you switch traffic instantly", "A deployment that only runs at night", "A deployment strategy for mobile apps"]} correct={1} explain="Blue-green deployment maintains two identical production environments. You deploy to the idle one, test it, then switch traffic instantly. Rollback is immediate." />
          <QuizCard question="Where should you store SSH keys for CI/CD?" options={["In the workflow YAML file", "In GitHub Secrets", "In the README", "In package.json"]} correct={1} explain="GitHub Secrets encrypts sensitive values and injects them into workflows at runtime. Never commit passwords, tokens, or SSH keys to your repository." />
        </div>
      )}
    </div>
  );
}

function SectionMonitoring() {
  const [tab, setTab] = useState("health");
  const tabs = [
    { id: "health", label: "❤️ Health Checks" },
    { id: "logs", label: "📝 Logging" },
    { id: "metrics", label: "📊 Metrics" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>You cannot fix what you cannot see. Monitoring tells you when things break before your users do.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#f43f5e22" : "transparent", border: `1px solid ${tab === t.id ? "#f43f5e" : D.outline}`, color: tab === t.id ? "#f43f5e" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "health" && (
        <div>
          <CodeBlock label="health check endpoint" code={`app.get('/health', async (req, res) => {
  const checks = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    database: await checkDatabase(),
    redis: await checkRedis()
  };
  
  const healthy = checks.database && checks.redis;
  
  res.status(healthy ? 200 : 503)
     .json(checks);
});

async function checkDatabase() {
  try {
    await db.query('SELECT 1');
    return true;
  } catch {
    return false;
  }
}`} />
          <BigIdea number="1" title="Health checks save you" color={D.green}>Load balancers and orchestrators (Kubernetes, AWS ELB) use health checks to know if a server is healthy. If /health returns 503, traffic is routed away from that server automatically. Without health checks, failed servers keep receiving traffic.</BigIdea>
          <Tip icon="🎯" color={D.yellow} title="Check dependencies">A good health check verifies not just that the app is running, but that its dependencies (database, cache, external APIs) are accessible. An app that cannot reach its database is not healthy.</Tip>
        </div>
      )}
      {tab === "logs" && (
        <div>
          <CodeBlock label="structured logging with winston" code={`const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

// Usage
logger.info('User logged in', { userId: 123, ip: '1.2.3.4' });
logger.error('Payment failed', { error: err.message, orderId: 456 });
logger.warn('Rate limit approaching', { ip: '1.2.3.4', count: 95 });`} />
          <EasyBox emoji="📝" title="Structured logs are searchable" color="#f43f5e">`console.log('error')` is useless in production. `logger.error('Payment failed', {'{ orderId: 456, userId: 123 }'})` lets you search logs by orderId, filter by severity, and build dashboards. Always use structured (JSON) logging in production.</EasyBox>
        </div>
      )}
      {tab === "metrics" && (
        <div>
          <CodeBlock label="key metrics to track" code={`// Request count
app.use((req, res, next) => {
  metrics.increment('http.requests', {
    method: req.method,
    route: req.route?.path,
    status: res.statusCode
  });
  next();
});

// Response time
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    metrics.timing('http.response_time', Date.now() - start);
  });
  next();
});

// Error rate
app.use((err, req, res, next) => {
  metrics.increment('http.errors', { type: err.name });
  next(err);
});`} />
          {[
            { metric: "Error rate", why: "Spike = something broke" },
            { metric: "Response time (p95/p99)", why: "Slow = users leave" },
            { metric: "Throughput (req/s)", why: "Drop = traffic problem or crash" },
            { metric: "CPU / Memory", why: "High = scale up or optimize" },
            { metric: "Database query time", why: "Slow = missing index or N+1" },
          ].map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "6px 10px", background: D.surface, border: `1px solid ${D.outline}`, borderRadius: 5, marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#f43f5e", fontFamily: mono, minWidth: 160 }}>{m.metric}</span>
              <span style={{ fontSize: 11, color: D.muted, fontFamily: serif }}>{m.why}</span>
            </div>
          ))}
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What should a health check endpoint verify?" options={["Only that the app is running", "That the app AND its dependencies are healthy", "That the database is empty", "That there are no users logged in"]} correct={1} explain="A good health check verifies the app and all critical dependencies (database, cache, external APIs). An app that cannot reach its database should return 503, not 200." />
          <QuizCard question="Why use structured (JSON) logging?" options={["It looks prettier", "It enables searching, filtering, and dashboard building", "It is required by law", "It prevents errors"]} correct={1} explain="JSON logs are machine-readable. You can search by field, filter by severity, and feed them into tools like ELK, Datadog, or CloudWatch for analysis and alerting." />
          <QuizCard question="What does p95 response time mean?" options={["The average response time", "95% of requests are faster than this value", "The slowest request", "The fastest request"]} correct={1} explain="p95 (95th percentile) means 95% of requests are faster than this value. It is more meaningful than average because it ignores outliers and shows the real user experience." />
        </div>
      )}
    </div>
  );
}

function DevOpsKillNotes() {
  const groups = [
    { title: "DevOps Fundamentals", color: "#f59e0b", icon: "🚀", kills: ["DevOps = shipping code automatically, reliably, and observably.", "Infrastructure as Code: configure servers with code, not clicks.", "Never deploy code that failed tests.", "Manual deployment is dangerous and error-prone.", "Containerize everything. Orchestrate at scale.", "Monitor production — you cannot fix what you cannot see."] },
    { title: "Docker", color: "#3b82f6", icon: "🐳", kills: ["Docker packages apps with dependencies into portable containers.", "Dockerfile: FROM, WORKDIR, COPY, RUN, EXPOSE, CMD.", "Copy package.json BEFORE source code for layer caching.", "docker-compose defines multi-container stacks in one file.", "Never run containers as root. Use USER.", ".dockerignore excludes node_modules, .git, .env from builds.", "Volumes persist data across container restarts."] },
    { title: "PM2", color: "#8b5cf6", icon: "⚙️", kills: ["PM2 keeps Node.js running, restarts crashes, and clusters CPUs.", "pm2 start app.js -i max = one process per CPU core.", "pm2 reload = zero-downtime restart. pm2 restart = hard restart.", "Use ecosystem.config.js for production configuration.", "pm2 save + pm2 startup = auto-restart on server boot.", "max_memory_restart prevents memory leaks from crashing the server."] },
    { title: "nginx", color: "#14b8a6", icon: "🔄", kills: ["nginx handles SSL, static files, and proxies to Node.js.", "Always use HTTPS in production. Let's Encrypt is free.", "X-Real-IP and X-Forwarded-For pass the client IP through the proxy.", "Serve static files from nginx, not Express.", "nginx is 10x more efficient at SSL and static file serving than Node.", "Configure gzip compression to reduce response sizes."] },
    { title: "CI/CD", color: "#f59e0b", icon: "🔄", kills: ["CI = automated tests on every push. CD = auto-deploy on pass.", "GitHub Actions, GitLab CI, CircleCI are popular CI/CD tools.", "Store secrets in GitHub Secrets, never in workflow files.", "needs: test makes deploy wait for tests to pass.", "Blue-green = instant rollback. Canary = gradual rollout.", "A typical pipeline: lint → test → build → deploy → smoke test."] },
    { title: "Monitoring", color: "#f43f5e", icon: "📊", kills: ["Health checks let load balancers route away from failed servers.", "Structured JSON logs are searchable and dashboard-friendly.", "Track: error rate, response time (p95/p99), throughput, CPU, memory.", "Winston, Pino, and Bunyan are popular Node.js loggers.", "Alert on symptoms (high error rate), not causes (disk full).", "p95 response time shows real user experience better than average."] },
  ];
  return (
    <div>
      <p style={para}>The precise facts that matter most — for deploying apps, for debugging production, for interviews.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {groups.map(n => (
          <div key={n.title} style={{ border: `1px solid ${n.color}33`, borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "10px 14px", background: n.color + "0d", borderBottom: `1px solid ${n.color}22`, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>{n.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 900, color: n.color, fontFamily: mono }}>{n.title}</span>
            </div>
            <div style={{ padding: "10px 14px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 6 }}>
              {n.kills.map((k, i) => (
                <div key={i} style={{ display: "flex", gap: 8 }}>
                  <span style={{ color: n.color, fontSize: 10, marginTop: 3, flexShrink: 0 }}>▸</span>
                  <span style={{ fontSize: 11, color: D.muted, lineHeight: 1.65, fontFamily: serif }}>{k}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DevOpsInterview() {
  const [open, setOpen] = useState(null);
  const qs = [
    { q: "What is Docker and why is it useful?", level: "Junior", color: D.green,
      a: `Docker is a platform for developing, shipping, and running applications in containers. A container packages your application code together with all its dependencies (Node.js version, system libraries, environment variables) into a single, portable unit.

Why it is useful:
1. Consistency: A Docker container runs identically on your Mac, in CI, and on the production Linux server. No more "it works on my machine."
2. Isolation: Each container runs independently without interfering with others.
3. Portability: Build once, run anywhere that supports Docker.
4. Efficiency: Containers share the host OS kernel, making them much lighter than virtual machines.
5. Scalability: Easy to spin up multiple container instances behind a load balancer.`,
      code: `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
USER node
EXPOSE 3000
CMD ["node", "server.js"]` },
    { q: "What is the difference between pm2 restart and pm2 reload?", level: "Mid", color: "#3b82f6",
      a: `pm2 restart stops the process and starts a new one. This causes downtime — active requests are dropped. Use it for configuration changes that require a hard reset.

pm2 reload performs a zero-downtime restart. It starts new processes alongside the old ones, waits for the new processes to be ready, then swaps traffic over and shuts down the old processes. Active requests finish on the old processes while new requests go to the new processes.

In production, always use reload for code deployments. Only use restart when absolutely necessary.`,
      code: `pm2 start server.js -i max     # start with cluster mode
pm2 reload api                  # zero-downtime restart ✅
pm2 restart api                 # hard restart (downtime) ⚠️` },
    { q: "Why should nginx sit in front of a Node.js application?", level: "Mid", color: "#3b82f6",
      a: `nginx is a high-performance web server and reverse proxy written in C. It handles several tasks more efficiently than Node.js:

1. SSL/TLS termination: nginx handles HTTPS encryption/decryption, freeing Node.js from this CPU-intensive work.
2. Static file serving: nginx serves images, CSS, and JS directly from disk using sendfile — zero Node.js involvement.
3. Reverse proxying: nginx forwards API requests to Node.js and passes back responses.
4. Load balancing: nginx distributes requests across multiple Node.js processes (PM2 cluster).
5. Compression: nginx can gzip responses, reducing bandwidth.
6. Security: nginx adds a layer between the open internet and your Node.js process, blocking malicious requests.

Without nginx, Node.js handles all of this itself — wasting event loop cycles on tasks it is not optimized for.`,
      code: `server {
    listen 443 ssl;
    server_name api.example.com;

    ssl_certificate /etc/letsencrypt/...;

    location /static/ {
        alias /var/www/static/;   # nginx serves static files
        expires 30d;
    }

    location / {
        proxy_pass http://localhost:3000;  # proxy to Node.js
        proxy_set_header Host $host;
    }
}` },
    { q: "Explain CI/CD and why it matters.", level: "Junior", color: D.green,
      a: `CI/CD stands for Continuous Integration / Continuous Deployment.

Continuous Integration means every time a developer pushes code, automated tests run automatically. If tests fail, the developer is notified immediately. This catches bugs early before they reach production.

Continuous Deployment means every passing build is automatically deployed to production. No manual SSH, no git pull, no human steps. The pipeline handles everything.

Why it matters:
1. Speed: Deploy multiple times per day instead of once per week.
2. Safety: Automated tests act as a safety net. Bad code never reaches production.
3. Consistency: Every deployment follows the exact same steps. No human error.
4. Rollback: If a deployment breaks, rollback to the previous version in seconds.

Tools: GitHub Actions, GitLab CI, CircleCI, Jenkins, Travis CI.`,
      code: `.github/workflows/deploy.yml

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: ssh server "cd /app && git pull && pm2 reload api"` },
    { q: "What is a health check and why is it important?", level: "Mid", color: "#3b82f6",
      a: `A health check is an endpoint (usually /health) that reports whether an application and its dependencies are functioning correctly.

A good health check verifies:
1. The application process is running
2. The database is reachable and responding
3. The cache (Redis) is accessible
4. Critical external services are available

Why it is important:
- Load balancers use health checks to route traffic only to healthy servers
- Container orchestrators (Kubernetes) restart unhealthy containers
- Monitoring systems alert when health checks fail
- Deployment pipelines verify the new version is healthy before completing

A health check that only returns 200 OK without checking dependencies is dangerous — it tells the load balancer the server is fine when it might be unable to serve requests.`,
      code: `app.get('/health', async (req, res) => {
  const dbHealthy = await checkDatabase();
  const redisHealthy = await checkRedis();
  const healthy = dbHealthy && redisHealthy;
  
  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'ok' : 'degraded',
    database: dbHealthy,
    redis: redisHealthy,
    uptime: process.uptime()
  });
});` },
    { q: "What is the difference between blue-green and canary deployment?", level: "Senior", color: "#8b5cf6",
      a: `Blue-green deployment maintains two identical production environments: Blue (currently live) and Green (idle). You deploy the new version to Green, run smoke tests, then instantly switch all traffic from Blue to Green. If something breaks, you switch back to Blue instantly.

Pros: Zero downtime, instant rollback, simple.
Cons: Requires double the infrastructure (two full environments).

Canary deployment rolls out the new version to a small percentage of users first — say 5%. You monitor error rates and performance metrics. If everything looks good, you gradually increase to 25%, 50%, and finally 100%. If errors spike at 5%, you roll back only that small group.

Pros: Minimal risk, real-user validation at small scale, no need for double infrastructure.
Cons: More complex to implement, requires sophisticated monitoring and traffic routing.

Blue-green is simpler and better for smaller teams. Canary is safer and better for large-scale applications with millions of users.`,
      code: `// Blue-green: switch traffic instantly
// Load balancer config
upstream backend {
    server green:3000;  // switch from blue to green
}

// Canary: route 5% of users to new version
if ($cookie_canary = "1") {
    proxy_pass http://new-version:3000;
}
proxy_pass http://old-version:3000;` },
  ];
  return (
    <div>
      <p style={para}>These questions cover Docker, PM2, nginx, CI/CD, and production monitoring. Know these for any backend or DevOps interview.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {qs.map((q, i) => (
          <div key={i} style={{ border: `1px solid ${open === i ? q.color + "55" : D.outline}`, borderRadius: 9, overflow: "hidden", transition: "border-color 0.2s" }}>
            <button onClick={() => setOpen(open === i ? null : i)}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "11px 14px", background: open === i ? q.color + "0d" : "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontSize: 9, padding: "2px 6px", background: q.color + "22", border: `1px solid ${q.color}44`, borderRadius: 3, color: q.color, fontFamily: mono, fontWeight: 700, flexShrink: 0 }}>{q.level}</span>
              <span style={{ fontSize: 12, color: open === i ? q.color : D.text, fontFamily: serif, flex: 1, lineHeight: 1.4 }}>{q.q}</span>
              <span style={{ color: q.color, fontSize: 13, flexShrink: 0 }}>{open === i ? "▲" : "▼"}</span>
            </button>
            {open === i && (
              <div style={{ padding: "0 14px 14px", borderTop: `1px solid ${q.color}22` }}>
                <pre style={{ margin: "10px 0 0", fontSize: 12, color: D.muted, fontFamily: serif, lineHeight: 1.9, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{q.a}</pre>
                <CodeBlock label="code" code={q.code} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}



// ══════════════════════════════════════════════════════════════════════════════
// TYPESCRIPT WITH NODE SECTIONS
// ══════════════════════════════════════════════════════════════════════════════

function TypeCheckerDemo() {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);

  const steps = [
    { label: "Writing code with a typo", js: "const user = { name: 'Alice' };\nconsole.log(user.nmae);", ts: "const user = { name: 'Alice' };\nconsole.log(user.nmae);\n// ❌ Property 'nmae' does not exist on type", type: "js", result: "error" },
    { label: "JavaScript runtime error", js: "undefined\n// Runtime crash at line 2", ts: "", type: "js-only", result: "runtime" },
    { label: "TypeScript compile-time catch", js: "", ts: "Property 'nmae' does not exist.\nDid you mean 'name'?\n\n// Fixed before deployment ✅", type: "ts-only", result: "compile" },
    { label: "TypeScript with correct code", js: "", ts: "const user = { name: 'Alice' };\nconsole.log(user.name);\n// ✅ Compiles successfully", type: "ts-only", result: "success" },
  ];

  const run = async () => {
    setRunning(true); setStep(0);
    for (let i = 1; i <= steps.length; i++) {
      await new Promise(r => setTimeout(r, 900));
      setStep(i);
    }
    setRunning(false);
  };

  return (
    <div style={{ padding: 14, background: D.surfaceLowest, border: `1px solid ${D.outline}`, borderRadius: 10 }}>
      <div style={{ fontSize: 10, color: D.muted, fontFamily: mono, letterSpacing: 1, marginBottom: 10 }}>🧪 LIVE — see TypeScript catch bugs before runtime</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "8px 12px", background: step > i ? (s.result === "error" || s.result === "runtime" ? D.red + "08" : s.result === "compile" ? D.yellow + "08" : D.greenBg) : D.surface, border: `1px solid ${step >= i ? (s.result === "error" || s.result === "runtime" ? D.red : s.result === "compile" ? D.yellow : D.green) + "40" : D.outline}`, borderRadius: 7, transition: "all 0.4s", opacity: step >= i ? 1 : 0.4 }}>
            <span style={{ fontSize: 14, flexShrink: 0, marginTop: 2 }}>{step > i ? (s.result === "error" || s.result === "runtime" ? "❌" : s.result === "compile" ? "⚠️" : "✅") : step === i ? "⏳" : "○"}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: step >= i ? (s.result === "error" || s.result === "runtime" ? D.red : s.result === "compile" ? D.yellow : D.greenText) : D.muted, fontFamily: mono, fontWeight: step === i ? 700 : 400, marginBottom: 4 }}>{s.label}</div>
              {step >= i && (
                <pre style={{ margin: 0, fontSize: 10, lineHeight: 1.7, color: D.muted, fontFamily: mono, whiteSpace: "pre-wrap" }}>{s.js || s.ts}</pre>
              )}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button onClick={run} disabled={running}
          style={{ padding: "6px 16px", background: running ? D.muted + "18" : D.greenBg, border: `1px solid ${running ? D.outline : D.green}`, color: running ? D.muted : D.greenText, borderRadius: 5, cursor: running ? "default" : "pointer", fontSize: 11, fontFamily: mono }}>
          {running ? "● checking..." : "▶ See TypeScript in action"}
        </button>
        <span style={{ fontSize: 10, color: D.muted, fontFamily: mono }}>
          {step === 0 ? "TypeScript catches typos at compile time" : step >= steps.length ? "Bug prevented before deployment! ✅" : `step ${step} of ${steps.length}`}
        </span>
      </div>
    </div>
  );
}

function SectionWhatIsTypeScript() {
  const [tab, setTab] = useState("story");
  const tabs = [
    { id: "story", label: "📖 The Story" },
    { id: "why", label: "🎯 Why TypeScript?" },
    { id: "demo", label: "🧪 Live Demo" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>TypeScript is JavaScript with types. It compiles to plain JavaScript but catches bugs at compile time — before your code ever runs.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#3b82f622" : "transparent", border: `1px solid ${tab === t.id ? "#3b82f6" : D.outline}`, color: tab === t.id ? "#3b82f6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "story" && (
        <div>
          <BigIdea number="1" title="JavaScript is dynamically typed" color="#f59e0b">In JavaScript, a variable can hold a string, then a number, then an object, all in the same function. This flexibility is powerful but dangerous. A typo like `user.nmae` does not fail until runtime — when a real user is trying to log in.</BigIdea>
          <BigIdea number="2" title="Microsoft created TypeScript in 2012" color="#3b82f6">Anders Hejlsberg, the creator of C#, led the TypeScript team at Microsoft. Their goal: bring static types to JavaScript without changing how it runs. TypeScript is a superset of JavaScript — every valid JS file is valid TS. The compiler simply strips types and outputs plain JS.</BigIdea>
          <BigIdea number="3" title="TypeScript is now the industry standard" color={D.green}>In 2024, TypeScript is the #3 most popular language on GitHub. Virtually every major framework (React, Vue, Angular, Next.js, NestJS) recommends or requires TypeScript. Job postings for Node.js developers almost always list TypeScript as a requirement.</BigIdea>
          <EasyBox emoji="🎯" title="One sentence" color="#3b82f6"><strong>TypeScript is a type layer on top of JavaScript</strong> that catches bugs at compile time, enables precise autocomplete, and makes refactoring safe. It compiles to plain JavaScript and runs everywhere JS runs.</EasyBox>
        </div>
      )}
      {tab === "why" && (
        <div>
          <div style={{ overflowX: "auto", marginBottom: 14 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: mono, fontSize: 11 }}>
              <thead><tr>{["", "JavaScript", "TypeScript"].map((h, i) => (
                <th key={i} style={{ padding: "9px 12px", background: D.surface, color: [D.muted, "#f59e0b", "#3b82f6"][i], textAlign: "left", borderBottom: `1px solid ${D.outline}`, fontSize: 10 }}>{h}</th>
              ))}</tr></thead>
              <tbody>
                {[["Typos","Runtime crash","Compile-time error"],["Refactoring","Scary — find broken references manually","Safe — TS shows every broken reference"],["Autocomplete","Guesswork based on usage","Precise — knows every property and method"],["Documentation","Comments that go stale","Types that are always correct"],["Team scaling","Hard for new developers","Easy — types act as documentation"],["Bug catching","At runtime (user sees it)","At compile time (developer fixes it)"]].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : D.surface + "06" }}>
                    {row.map((cell, j) => <td key={j} style={{ padding: "8px 12px", borderBottom: `1px solid ${D.outline}`, color: j === 0 ? D.text : D.muted }}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Tip icon="🎯" color={D.yellow} title="When NOT to use TypeScript">For tiny scripts, one-off tools, or rapid prototyping where speed matters more than correctness, plain JavaScript is fine. For production applications, APIs, and team projects, TypeScript pays for itself within days.</Tip>
        </div>
      )}
      {tab === "demo" && <TypeCheckerDemo />}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What does TypeScript compile to?" options={["Java bytecode", "Plain JavaScript", "WebAssembly", "Python"]} correct={1} explain="The TypeScript compiler (tsc) strips all type annotations and outputs plain JavaScript. TypeScript is a compile-time layer — it does not exist at runtime." />
          <QuizCard question="When does TypeScript catch a typo like user.nmae?" options={["At runtime", "At compile time", "When the user reports it", "Never"]} correct={1} explain="TypeScript analyzes your code during compilation and reports 'Property nmae does not exist on type { name: string }'. You fix it before deployment." />
          <QuizCard question="Is every valid JavaScript file also valid TypeScript?" options={["No — TS is a different language", "Yes — TS is a superset of JS", "Only if you add types", "Only for ES6+ code"]} correct={1} explain="TypeScript is a superset of JavaScript. Any valid .js file is also valid .ts (though TS may warn about implicit any types). You can adopt TS incrementally." />
        </div>
      )}
    </div>
  );
}

function SectionTypes() {
  const [tab, setTab] = useState("primitives");
  const tabs = [
    { id: "primitives", label: "📦 Primitives" },
    { id: "advanced", label: "🔀 Unions & Literals" },
    { id: "inference", label: "🧠 Inference" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>TypeScript's type system starts simple and grows with your needs. Master the basics and everything else follows.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#8b5cf622" : "transparent", border: `1px solid ${tab === t.id ? "#3b82f6" : D.outline}`, color: tab === t.id ? "#3b82f6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "primitives" && (
        <div>
          <CodeBlock label="primitive types" code={`// Basic types
const name: string = "Alice";
const age: number = 30;
const isAdmin: boolean = false;

// Arrays
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["Alice", "Bob"];

// Objects
const user: { name: string; age: number } = {
  name: "Alice",
  age: 30
};

// Functions
function add(a: number, b: number): number {
  return a + b;
}

// Void (no return value)
function log(message: string): void {
  console.log(message);
}`} />
          <Tip icon="💡" color={D.yellow} title="Type inference">TypeScript can infer types when you initialize a variable: `const name = "Alice"` automatically gets type `string`. You only need explicit types for function parameters and empty declarations.</Tip>
        </div>
      )}
      {tab === "advanced" && (
        <div>
          <CodeBlock label="unions, intersections, literals" code={`// Union — value can be one of several types
let id: string | number = "abc123";
id = 123; // also valid

// Literal — value must be exactly this string
type Status = "pending" | "active" | "inactive";
const status: Status = "active";
// status = "deleted"; // ❌ Error!

// Intersection — combine types
type Employee = { name: string } & { employeeId: number };
const emp: Employee = { name: "Alice", employeeId: 42 };

// Nullable
let maybeName: string | null = null;
maybeName = "Alice";

// Any — escape hatch (avoid when possible)
let anything: any = 4;
anything = "string";
anything = {};`} />
          <EasyBox emoji="⚠️" title="Avoid any" color={D.red}>`any` disables type checking for that variable. It is contagious — once you use `any`, TypeScript cannot check anything that touches it. Use `unknown` when you genuinely don't know the type, then narrow it with type guards.</EasyBox>
        </div>
      )}
      {tab === "inference" && (
        <div>
          <CodeBlock label="type inference in action" code={`// TS infers: string
const name = "Alice";

// TS infers: number
const count = 42;

// TS infers: { name: string; age: number }
const user = { name: "Alice", age: 30 };

// TS infers: (a: number, b: number) => number
const add = (a: number, b: number) => a + b;

// TS infers: string[]
const names = ["Alice", "Bob"];

// TS infers the return type from the return statement
function getUser() {
  return { id: 1, name: "Alice" };
}
// Return type is automatically: { id: number; name: string }`} />
          <Tip icon="🎯" color={D.yellow} title="When to add explicit types">Add explicit types for: function parameters, public API exports, complex return types, and places where inference would give `any`. For local variables, let inference do the work.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What is a union type?" options={["A type that combines two objects", "A type that can be one of several types", "A type that is always null", "A type for arrays only"]} correct={1} explain="A union type uses the | operator: string | number means the value can be either a string or a number." />
          <QuizCard question="What is the difference between any and unknown?" options={["They are the same", "unknown requires type narrowing before use", "any is for objects, unknown is for primitives", "unknown is faster"]} correct={1} explain="any disables all type checking. unknown also accepts any value but requires you to narrow the type (with typeof, instanceof, or type guards) before using it." />
          <QuizCard question="What does TypeScript infer for const x = [1, 2, 3]?" options={["any[]", "number[]", "Array&lt;any&gt;", "It requires an explicit type"]} correct={1} explain="TypeScript infers number[] because all elements are numbers. If you mix types like [1, 'hello'], it infers (number | string)[]." />
        </div>
      )}
    </div>
  );
}

function SectionInterfaces() {
  const [tab, setTab] = useState("interface");
  const tabs = [
    { id: "interface", label: "📐 Interface" },
    { id: "vs-type", label: "⚖️ Interface vs Type" },
    { id: "extending", label: "🔗 Extending" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Interfaces define the shape of objects. They are the foundation of type-safe code in TypeScript.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#14b8a622" : "transparent", border: `1px solid ${tab === t.id ? "#14b8a6" : D.outline}`, color: tab === t.id ? "#14b8a6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "interface" && (
        <div>
          <CodeBlock label="interface basics" code={`interface User {
  id: number;
  name: string;
  email: string;
  age?: number;              // optional
  readonly createdAt: Date;  // immutable after creation
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  createdAt: new Date()
};

// ❌ Error: cannot assign to readonly property
user.createdAt = new Date();

// ✅ Allowed: optional property can be omitted
const user2: User = {
  id: 2,
  name: "Bob",
  email: "bob@example.com",
  createdAt: new Date()
};`} />
          <Tip icon="🔒" color={D.yellow} title="readonly">Use `readonly` for properties that should never change after creation. This prevents accidental mutations and makes your code more predictable. It only affects the property assignment — it does not make nested objects immutable.</Tip>
        </div>
      )}
      {tab === "vs-type" && (
        <div>
          <CodeBlock label="interface vs type alias" code={`// Interface
interface User {
  name: string;
}

// Type alias
type UserType = {
  name: string;
};

// Key differences:
// 1. Interface can be extended with 'extends'
// 2. Interface can be reopened (declaration merging)
// 3. Type can use unions, intersections, mapped types

// Declaration merging — interfaces only!
interface User {
  age: number;  // Adds age to the existing User interface
}`} />
          <div style={{ overflowX: "auto", marginBottom: 14 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: mono, fontSize: 11 }}>
              <thead><tr>{["Feature", "Interface", "Type"].map((h, i) => (
                <th key={i} style={{ padding: "9px 12px", background: D.surface, color: [D.muted, "#14b8a6", "#f59e0b"][i], textAlign: "left", borderBottom: `1px solid ${D.outline}`, fontSize: 10 }}>{h}</th>
              ))}</tr></thead>
              <tbody>
                {[["Declaration merging","✅ Yes","❌ No"],["extends","✅ Yes","❌ (use & instead)"],["Union types","❌ No","✅ Yes"],["Mapped types","❌ No","✅ Yes"],["Best for","Objects, classes, OOP","Unions, tuples, complex types"]].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : D.surface + "06" }}>
                    {row.map((cell, j) => <td key={j} style={{ padding: "8px 12px", borderBottom: `1px solid ${D.outline}`, color: j === 0 ? D.text : D.muted }}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Tip icon="🎯" color={D.yellow} title="Simple rule">Use `interface` for objects and class shapes. Use `type` for unions, tuples, and when you need mapped types. In modern TS, either works for most cases — consistency matters more than the choice.</Tip>
        </div>
      )}
      {tab === "extending" && (
        <div>
          <CodeBlock label="extending interfaces" code={`interface User {
  id: number;
  name: string;
  email: string;
}

interface Admin extends User {
  role: "admin";
  permissions: string[];
}

const admin: Admin = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  role: "admin",
  permissions: ["users:read", "users:write"]
};

// Multiple inheritance
interface SuperAdmin extends Admin, Employee {
  superPower: boolean;
}`} />
          <CodeBlock label="utility types" code={`// Make all properties optional
const partialUser: Partial<User> = { name: "Alice" };

// Make all properties required
const fullUser: Required<User> = { id: 1, name: "Alice", email: "a@b.com", age: 30 };

// Pick only specific properties
const userPreview: Pick<User, "id" | "name"> = { id: 1, name: "Alice" };

// Omit specific properties
const userWithoutEmail: Omit<User, "email"> = { id: 1, name: "Alice" };

// Extract the type of a property
type UserName = User["name"]; // string`} />
          <EasyBox emoji="✨" title="Utility types save time" color="#14b8a6">Partial, Required, Pick, Omit, Record, and ReturnType are built into TypeScript. They let you derive new types from existing ones without repeating yourself. Learn them well.</EasyBox>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What does the ? symbol mean in an interface?" options={["The property is required", "The property is optional", "The property is readonly", "The property is private"]} correct={1} explain="The ? mark makes a property optional. Objects of that interface can include or omit the property without causing a type error." />
          <QuizCard question="Which feature is unique to interfaces (not available with type)?" options={["Union types", "Declaration merging", "Intersection types", "Mapped types"]} correct={1} explain="Interfaces support declaration merging — you can define the same interface multiple times and TypeScript merges them. Type aliases do not support this." />
          <QuizCard question="What does Omit&lt;User, 'email'&gt; do?" options={["Keeps only the email property", "Removes the email property from the type", "Makes email optional", "Makes email readonly"]} correct={1} explain="Omit creates a new type with all properties EXCEPT the specified ones. Omit&lt;User, 'email'&gt; produces a type with every User property except email." />
        </div>
      )}
    </div>
  );
}

function SectionGenerics() {
  const [tab, setTab] = useState("functions");
  const tabs = [
    { id: "functions", label: "⚙️ Functions" },
    { id: "constraints", label: "🔗 Constraints" },
    { id: "interfaces", label: "📐 Interfaces" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Generics let you write reusable code that works with multiple types while preserving type safety. They are one of TypeScript's most powerful features.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#8b5cf622" : "transparent", border: `1px solid ${tab === t.id ? "#8b5cf6" : D.outline}`, color: tab === t.id ? "#8b5cf6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "functions" && (
        <div>
          <CodeBlock label="generic function" code={`// Without generics — duplicates code
function wrapNumber(value: number): number[] {
  return [value];
}
function wrapString(value: string): string[] {
  return [value];
}

// With generics — one function, any type
function wrap<T>(value: T): T[] {
  return [value];
}

const nums = wrap<number>(42);      // number[]
const strs = wrap<string>("hello"); // string[]

// TypeScript can even infer the type
const inferred = wrap(true);        // boolean[]`} />
          <BigIdea number="1" title="Generics preserve type information" color="#8b5cf6">Without generics, you would use `any` and lose all type safety. With generics, TypeScript knows that `wrap(42)` returns `number[]` and `wrap("hello")` returns `string[]`. The type flows through the function.</BigIdea>
        </div>
      )}
      {tab === "constraints" && (
        <div>
          <CodeBlock label="generic constraints" code={`// Constrain T to objects with a length property
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}

getLength("hello");     // ✅ string has length
getLength([1, 2, 3]);  // ✅ array has length
// getLength(42);       // ❌ number has no length

// Multiple constraints
function logAndReturn<T extends { toString(): string }>(value: T): T {
  console.log(value.toString());
  return value;
}`} />
          <Tip icon="🎯" color={D.yellow} title="extends is your friend">Use `extends` to constrain generics to types that have certain properties or methods. This gives you both flexibility (works with any matching type) and safety (rejects invalid types at compile time).</Tip>
        </div>
      )}
      {tab === "interfaces" && (
        <div>
          <CodeBlock label="generic interfaces" code={`interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Usage with User
interface User {
  id: number;
  name: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Alice" },
  status: 200,
  message: "OK"
};

// Usage with array
const listResponse: ApiResponse<User[]> = {
  data: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }],
  status: 200,
  message: "OK"
};

// Generic class
class Repository<T> {
  private items: T[] = [];
  
  add(item: T): void {
    this.items.push(item);
  }
  
  findById(id: number): T | undefined {
    return this.items.find((item: any) => item.id === id);
  }
}`} />
          <EasyBox emoji="🎯" title="Real-world pattern" color="#8b5cf6">`ApiResponse&lt;T&gt;` is used in virtually every TypeScript API client. One interface handles all endpoints — users, posts, orders — while keeping every response fully typed.</EasyBox>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What do generics allow you to do?" options={["Make code run faster", "Write reusable code that preserves type safety", "Replace interfaces entirely", "Disable type checking"]} correct={1} explain="Generics let you write functions, interfaces, and classes that work with multiple types while preserving type information. No need for any." />
          <QuizCard question="What does T extends { length: number } mean?" options={["T must be a number", "T must have a length property", "T must be an array", "T must be a string"]} correct={1} explain="extends constrains the generic type. T must be a type that has a length property — this includes strings, arrays, and any custom object with length." />
          <QuizCard question="What is the type of const x = wrap(42) if wrap is generic?" options={["any", "number[]", "unknown", "It requires an explicit type"]} correct={1} explain="TypeScript infers the generic type from the argument. wrap(42) infers T as number, so the return type is number[]." />
        </div>
      )}
    </div>
  );
}

function SectionTsConfig() {
  const [tab, setTab] = useState("config");
  const tabs = [
    { id: "config", label: "⚙️ tsconfig.json" },
    { id: "strict", label: "🔒 Strict Mode" },
    { id: "setup", label: "🚀 Project Setup" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>tsconfig.json controls how TypeScript compiles your code. A good configuration catches more bugs and produces cleaner output.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#f59e0b22" : "transparent", border: `1px solid ${tab === t.id ? "#f59e0b" : D.outline}`, color: tab === t.id ? "#f59e0b" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "config" && (
        <div>
          <CodeBlock label="recommended tsconfig.json" code={`{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}`} />
          <BigIdea number="1" title="target vs module" color="#f59e0b">`target` is the JavaScript version TypeScript compiles TO. `module` is the module system it uses. For Node.js: target ES2022, module commonjs. For modern bundlers: target ES2022, module ESNext.</BigIdea>
          <Tip icon="💡" color={D.yellow} title="outDir and rootDir">`rootDir: ./src` tells TS where your source files live. `outDir: ./dist` tells TS where to put compiled JS. Always separate source and compiled code.</Tip>
        </div>
      )}
      {tab === "strict" && (
        <div>
          <CodeBlock label="what strict mode enables" code={`"strict": true  // Enables ALL of these:

// noImplicitAny — must type all parameters
function greet(name) { }        // ❌ Implicit any
function greet(name: string) { } // ✅

// strictNullChecks — null/undefined are separate types
const user: User = null;        // ❌
const user: User | null = null; // ✅

// strictFunctionTypes — function params checked strictly
type Fn = (x: string | number) => void;
const f: Fn = (x: string) => { }; // ❌ under strict

// noImplicitReturns — all paths must return
function getId(): number {
  if (Math.random() > 0.5) return 1;
  // ❌ Missing return on else branch
}`} />
          <EasyBox emoji="🔒" title="Always enable strict mode" color={D.red}>Disabling strict mode defeats the purpose of TypeScript. It allows `any` everywhere, ignores null checks, and lets function type mismatches slide. Enable strict from day one — the initial friction is worth the bugs you prevent.</EasyBox>
        </div>
      )}
      {tab === "setup" && (
        <div>
          <CodeBlock label="setup a TypeScript Node project" code={`# 1. Initialize project
npm init -y

# 2. Install TypeScript
npm install -D typescript @types/node

# 3. Generate tsconfig
npx tsc --init

# 4. Install runtime dependencies
npm install express
npm install -D @types/express

# 5. Add scripts to package.json
{
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "start": "node dist/server.js"
  }
}`} />
          <Tip icon="🎯" color={D.yellow} title="@types packages">JavaScript libraries ship without TypeScript definitions. `@types/express`, `@types/node`, and `@types/pg` provide those definitions. Always install them when using TS with JS libraries.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What does strict: true do?" options={["Makes compilation faster", "Enables all strict type-checking options", "Disables type checking", "Adds runtime type checks"]} correct={1} explain="strict: true enables noImplicitAny, strictNullChecks, strictFunctionTypes, and other strict options. It makes TypeScript catch significantly more bugs." />
          <QuizCard question="What is the purpose of @types/node?" options={["It installs Node.js", "It provides TypeScript definitions for Node.js built-ins", "It replaces tsconfig.json", "It compiles TypeScript"]} correct={1} explain="@types packages provide TypeScript type definitions for JavaScript libraries. @types/node defines types for fs, http, path, process, and other Node.js built-in modules." />
          <QuizCard question="What is the difference between target and module in tsconfig?" options={["They are the same", "target is JS version; module is module system", "target is for frontend; module is for backend", "target compiles faster"]} correct={1} explain="target controls which JavaScript version TS compiles to (ES2022, ES2015). module controls the module system (commonjs, ESNext, UMD)." />
        </div>
      )}
    </div>
  );
}

function SectionTypeSafeApi() {
  const [tab, setTab] = useState("zod");
  const tabs = [
    { id: "zod", label: "🔷 Zod" },
    { id: "express", label: "🌐 Express + TS" },
    { id: "pattern", label: "📐 Patterns" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Type-safe APIs combine TypeScript's compile-time safety with runtime validation. The result: APIs that are correct by design and protected against bad input.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#06b6d422" : "transparent", border: `1px solid ${tab === t.id ? "#06b6d4" : D.outline}`, color: tab === t.id ? "#06b6d4" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "zod" && (
        <div>
          <CodeBlock label="runtime validation with Zod" code={`import { z } from "zod";

// Define schema
const CreateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  age: z.number().min(0).max(150).optional(),
  role: z.enum(["user", "admin"]).default("user")
});

// Infer TypeScript type from schema
type CreateUserInput = z.infer<typeof CreateUserSchema>;
// { name: string; email: string; age?: number; role: "user" | "admin" }

// Validate at runtime
const result = CreateUserSchema.safeParse(req.body);
if (!result.success) {
  return res.status(400).json({
    errors: result.error.issues
  });
}
const user: CreateUserInput = result.data;`} />
          <BigIdea number="1" title="Zod bridges the type gap" color="#06b6d4">TypeScript types disappear at runtime. A malicious client can send {'{ name: 123 }'} and TypeScript cannot stop it. Zod validates the actual runtime data AND generates the TypeScript type. One source of truth, two guarantees.</BigIdea>
          <Tip icon="🎯" color={D.yellow} title="Install Zod">`npm install zod`. It has zero dependencies and works with any TypeScript project. Combine it with `z.infer` to get automatic type generation.</Tip>
        </div>
      )}
      {tab === "express" && (
        <div>
          <CodeBlock label="type-safe Express handler" code={`import { Request, Response } from "express";
import { z } from "zod";

const UpdateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional()
}).refine(data => data.name || data.email, {
  message: "At least one field required"
});

type UpdateUserInput = z.infer<typeof UpdateUserSchema>;

app.put("/users/:id", async (req: Request, res: Response) => {
  const parseResult = UpdateUserSchema.safeParse(req.body);
  
  if (!parseResult.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: parseResult.error.flatten()
    });
  }
  
  const data: UpdateUserInput = parseResult.data;
  // data is fully typed — autocomplete works!
  
  const user = await prisma.user.update({
    where: { id: parseInt(req.params.id) },
    data
  });
  
  res.json({ data: user });
});`} />
          <EasyBox emoji="✨" title="Full-stack type safety" color="#06b6d4">With Zod + Prisma + TypeScript, your API is type-safe from the database to the HTTP response. Change a schema field? TypeScript catches every broken reference in your handlers, tests, and frontend code.</EasyBox>
        </div>
      )}
      {tab === "pattern" && (
        <div>
          <CodeBlock label="validated request wrapper" code={`// middleware/validate.ts
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate = <T>(schema: ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: "Invalid input",
        issues: result.error.issues
      });
    }
    req.body = result.data; // replace with validated data
    next();
  };
};

// Usage in routes
import { validate } from "./middleware/validate";

app.post("/users",
  validate(CreateUserSchema),
  async (req: Request, res: Response) => {
    // req.body is guaranteed to match CreateUserInput
    const user = await prisma.user.create({ data: req.body });
    res.status(201).json({ data: user });
  }
);`} />
          <Tip icon="🎯" color={D.yellow} title="DRY validation">Create a `validate` middleware once, reuse it on every route. No more copying validation logic. No more untyped req.body. Every endpoint gets automatic validation and type inference.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="Why use Zod when TypeScript already has types?" options={["Zod is faster", "TypeScript types disappear at runtime; Zod validates actual data", "Zod replaces TypeScript", "Zod is required by Express"]} correct={1} explain="TypeScript types are erased during compilation. Zod validates the actual runtime data that clients send. Without Zod, a malicious client can bypass TypeScript's compile-time checks." />
          <QuizCard question="What does z.infer do?" options={["It runs validation", "It extracts a TypeScript type from a Zod schema", "It compiles TypeScript", "It creates a database table"]} correct={1} explain="z.infer&lt;typeof Schema&gt; generates a TypeScript type from a Zod schema. One schema serves as both runtime validator and compile-time type definition." />
          <QuizCard question="What is the benefit of a validate middleware?" options={["It makes code shorter", "It centralizes validation logic and guarantees typed req.body", "It replaces the need for tests", "It handles authentication"]} correct={1} explain="A validate middleware reuses the same validation pattern across all routes. It keeps route handlers clean and ensures req.body is always validated and correctly typed." />
        </div>
      )}
    </div>
  );
}

function TypeScriptKillNotes() {
  const groups = [
    { title: "TypeScript Basics", color: "#3b82f6", icon: "🔷", kills: ["TypeScript is a superset of JavaScript that adds static types.", "TS compiles to plain JS — types are erased at runtime.", "Type inference means TS often guesses types without explicit annotations.", "any disables type checking — avoid it. Use unknown instead.", "strict: true enables all strict checking options — always use it.", "@types packages provide TS definitions for JS libraries."] },
    { title: "Types", color: "#3b82f6", icon: "📦", kills: ["Primitives: string, number, boolean, null, undefined, symbol, bigint.", "Arrays: number[] or Array&lt;number&gt;.", "Objects: { name: string; age: number }.", "Unions: string | number means either type.", "Literals: 'pending' | 'active' restricts to exact values.", "Intersections: A & B combines two types.", "Functions: (a: number, b: number) => number."] },
    { title: "Interfaces", color: "#14b8a6", icon: "📐", kills: ["Interface defines the shape of an object.", "? makes properties optional. readonly prevents reassignment.", "Interface supports declaration merging. Type alias does not.", "extends creates inheritance: interface Admin extends User.", "Pick, Omit, Partial, Required are built-in utility types.", "Use interface for objects and classes. Use type for unions and mapped types."] },
    { title: "Generics", color: "#8b5cf6", icon: "⚙️", kills: ["Generics create reusable components that work with multiple types.", "function wrap&lt;T&gt;(value: T): T[] preserves type information.", "Constraints: T extends { length: number } limits valid types.", "Generic interfaces: ApiResponse&lt;T&gt; works with any data shape.", "Inference: wrap(42) automatically infers T as number.", "Generics avoid any while keeping code reusable."] },
    { title: "tsconfig", color: "#f59e0b", icon: "⚙️", kills: ["target: JS version to compile to. module: module system to use.", "outDir: where compiled JS goes. rootDir: where TS source lives.", "strict: true is essential — never disable it in production code.", "esModuleInterop allows importing CommonJS modules cleanly.", "skipLibCheck speeds up compilation by skipping .d.ts checks.", "declaration: true generates .d.ts files for library consumers."] },
    { title: "Type-Safe APIs", color: "#06b6d4", icon: "🌐", kills: ["Zod validates runtime data AND generates TypeScript types.", "z.infer&lt;typeof Schema&gt; extracts the TS type from a schema.", "TypeScript types disappear at runtime — always validate input.", "Create a validate middleware to centralize route validation.", "Combine Zod + Prisma + TS for full-stack type safety.", "Never trust req.body — validate it before processing."] },
  ];
  return (
    <div>
      <p style={para}>The precise facts that matter most — for writing type-safe code, for refactoring, for interviews.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {groups.map(n => (
          <div key={n.title} style={{ border: `1px solid ${n.color}33`, borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "10px 14px", background: n.color + "0d", borderBottom: `1px solid ${n.color}22`, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>{n.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 900, color: n.color, fontFamily: mono }}>{n.title}</span>
            </div>
            <div style={{ padding: "10px 14px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 6 }}>
              {n.kills.map((k, i) => (
                <div key={i} style={{ display: "flex", gap: 8 }}>
                  <span style={{ color: n.color, fontSize: 10, marginTop: 3, flexShrink: 0 }}>▸</span>
                  <span style={{ fontSize: 11, color: D.muted, lineHeight: 1.65, fontFamily: serif }}>{k}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypeScriptInterview() {
  const [open, setOpen] = useState(null);
  const qs = [
    { q: "What is TypeScript and why use it?", level: "Junior", color: D.green,
      a: `TypeScript is a superset of JavaScript that adds static type checking. It compiles to plain JavaScript, so it runs anywhere JS runs.

Why use it:
1. Catch bugs at compile time — typos, missing properties, wrong types are caught before deployment.
2. Better autocomplete — editors know exactly what properties and methods are available.
3. Safer refactoring — rename a property and TypeScript shows every file that needs updating.
4. Self-documenting code — types act as documentation that cannot go stale.
5. Team scaling — new developers can understand the codebase faster with types as guides.

Trade-off: Small upfront cost writing types. Massive long-term savings in bugs prevented and developer velocity.`,
      code: `// JavaScript — bug at runtime
const user = fetchUser();
console.log(user.nmae); // undefined, crash later

// TypeScript — bug at compile time
const user: User = fetchUser();
console.log(user.nmae);
// ❌ Property 'nmae' does not exist on type 'User'
// Did you mean 'name'?` },
    { q: "What is the difference between interface and type?", level: "Mid", color: "#3b82f6",
      a: `Both define the shape of objects, but they have different capabilities:

Interface:
- Can be extended with extends
- Supports declaration merging (define the same interface multiple times, TS merges them)
- Best for objects, classes, and OOP patterns
- Slightly better error messages in some cases

Type alias:
- Can define unions (string | number)
- Can define tuples ([string, number])
- Supports mapped types and conditional types
- Best for unions, complex transformations, and one-off types

Simple rule: use interface for objects and classes. Use type for unions and when you need mapped types. In practice, either works for most cases — consistency matters more.`,
      code: `// Interface — extensible and mergeable
interface User {
  name: string;
}
interface User {
  age: number;  // merged!
}

interface Admin extends User {
  role: "admin";
}

// Type — unions and mapped types
type Status = "pending" | "active" | "inactive";
type UserPreview = Pick<User, "id" | "name">;` },
    { q: "Explain generics in TypeScript.", level: "Mid", color: "#3b82f6",
      a: `Generics let you write reusable code that works with multiple types while preserving type safety. They are like type variables — placeholders for types that are specified when the code is used.

Without generics, you would use any and lose type information. With generics, TypeScript knows that identity(42) returns number and identity("hello") returns string.

Key concepts:
1. Generic functions: function wrap<T>(value: T): T[]
2. Generic constraints: T extends { length: number } limits what types are valid
3. Generic interfaces: ApiResponse<T> works with any data shape
4. Inference: TypeScript often guesses the generic type from the argument

Real-world use: API clients, repository patterns, and utility functions.`,
      code: `// Generic function
function wrap<T>(value: T): T[] {
  return [value];
}

const nums = wrap(42);        // inferred as number[]
const strs = wrap("hello");   // inferred as string[]

// Generic with constraint
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}

getLength("hello");     // ✅
getLength([1, 2, 3]);  // ✅
// getLength(42);       // ❌ number has no length

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
}` },
    { q: "What is the strict mode in tsconfig and why does it matter?", level: "Mid", color: "#3b82f6",
      a: `"strict": true enables all strict type-checking options in TypeScript. It is the single most important setting in tsconfig.json.

What it enables:
- noImplicitAny: All parameters must be explicitly typed or inferrable. No implicit any.
- strictNullChecks: null and undefined are separate types. You must handle them explicitly.
- strictFunctionTypes: Function parameters are checked more strictly.
- noImplicitReturns: All code paths in a function must return a value.
- strictBindCallApply: bind, call, and apply are type-checked.

Why it matters: Disabling strict mode allows TypeScript to silently fall back to any, bypass null checks, and ignore type mismatches. This defeats the purpose of using TypeScript. The bugs you wanted to catch will slip through.

Recommendation: Enable strict from day one. The initial friction is worth the prevented bugs.`,
      code: `// With strict: false
function greet(name) { }  // name is implicitly 'any'
const user = null;
user.name;                // no error, crashes at runtime

// With strict: true
function greet(name: string) { }  // must be explicit
const user: User | null = null;
user.name;                        // ❌ user might be null
user?.name;                       // ✅ optional chaining` },
    { q: "How do you build a type-safe API with TypeScript?", level: "Mid", color: "#3b82f6",
      a: `A type-safe API has two layers of safety: compile-time (TypeScript types) and runtime (input validation).

1. Define schemas with Zod — Zod describes the shape of request bodies AND generates TypeScript types.
2. Validate every request — Use a validate middleware that checks req.body against the Zod schema.
3. Use typed Express handlers — Import Request and Response types from express.
4. Type your database layer — Prisma generates TypeScript types from your schema.
5. Share types between frontend and backend — Put shared types in a common package or monorepo.

The result: if you rename a field in your database schema, TypeScript immediately shows every broken reference in your API handlers, tests, and frontend code. Bugs are caught before deployment, not by users.`,
      code: `import { z } from "zod";

const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

type CreateUserInput = z.infer<typeof CreateUserSchema>;

app.post("/users", validate(CreateUserSchema), (req, res) => {
  const data: CreateUserInput = req.body;
  // data is fully typed and validated
});` },
    { q: "What is the difference between any and unknown?", level: "Junior", color: D.green,
      a: `any and unknown both accept any value, but they behave very differently:

any disables type checking completely. Once a variable is typed as any, TypeScript lets you do anything with it — call non-existent methods, access non-existent properties, pass it to functions expecting specific types. It is a type safety escape hatch that is contagious — anything that touches any becomes any.

unknown also accepts any value, but TypeScript prevents you from using it until you narrow the type. You cannot call methods, access properties, or pass it to typed functions without first checking what it is.

Rule: Use unknown when you genuinely do not know the type at runtime (API responses, JSON parsing). Then narrow it with typeof, instanceof, or type guards. Never use any in production code.`,
      code: `const a: any = fetchData();
a.whatever();  // ✅ TypeScript allows this (dangerous!)

const u: unknown = fetchData();
u.whatever();  // ❌ Error: Object is of type 'unknown'

// Narrow before use
if (typeof u === "string") {
  u.toUpperCase();  // ✅ TypeScript knows it's a string
}` },
  ];
  return (
    <div>
      <p style={para}>These questions cover TypeScript fundamentals, generics, strict mode, and type-safe API design. Know these for any modern backend or full-stack interview.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {qs.map((q, i) => (
          <div key={i} style={{ border: `1px solid ${open === i ? q.color + "55" : D.outline}`, borderRadius: 9, overflow: "hidden", transition: "border-color 0.2s" }}>
            <button onClick={() => setOpen(open === i ? null : i)}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "11px 14px", background: open === i ? q.color + "0d" : "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontSize: 9, padding: "2px 6px", background: q.color + "22", border: `1px solid ${q.color}44`, borderRadius: 3, color: q.color, fontFamily: mono, fontWeight: 700, flexShrink: 0 }}>{q.level}</span>
              <span style={{ fontSize: 12, color: open === i ? q.color : D.text, fontFamily: serif, flex: 1, lineHeight: 1.4 }}>{q.q}</span>
              <span style={{ color: q.color, fontSize: 13, flexShrink: 0 }}>{open === i ? "▲" : "▼"}</span>
            </button>
            {open === i && (
              <div style={{ padding: "0 14px 14px", borderTop: `1px solid ${q.color}22` }}>
                <pre style={{ margin: "10px 0 0", fontSize: 12, color: D.muted, fontFamily: serif, lineHeight: 1.9, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{q.a}</pre>
                <CodeBlock label="code" code={q.code} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


const NODE_SECTIONS = [
  { id: "what", icon: "🟢", title: "What is Node.js?", color: D.green, render: () => <SectionWhatIsNode /> },
  { id: "eventloop", icon: "🔄", title: "Event Loop", color: "#f59e0b", render: () => <SectionEventLoop /> },
  { id: "modules", icon: "📦", title: "Modules", color: "#3b82f6", render: () => <SectionModules /> },
  { id: "core", icon: "🔧", title: "Core Modules", color: "#06b6d4", render: () => <SectionCoreModules /> },
  { id: "killnotes", icon: "⚡", title: "Kill Notes", color: "#f59e0b", render: () => <KillNotes /> },
  { id: "cheatsheet", icon: "📋", title: "Cheatsheet", color: "#ec4899", render: () => <SuperCheatsheet /> },
  { id: "interview", icon: "🎤", title: "Interview Q&A", color: "#14b8a6", render: () => <InterviewSection /> },
];

const TYPESCRIPT_SECTIONS = [
  { id: "what-ts", icon: "🔷", title: "What is TypeScript?", color: "#3b82f6", render: () => <SectionWhatIsTypeScript /> },
  { id: "types", icon: "📦", title: "Types & Inference", color: "#3b82f6", render: () => <SectionTypes /> },
  { id: "interfaces", icon: "📐", title: "Interfaces", color: "#14b8a6", render: () => <SectionInterfaces /> },
  { id: "generics", icon: "⚙️", title: "Generics", color: "#8b5cf6", render: () => <SectionGenerics /> },
  { id: "tsconfig", icon: "⚙️", title: "tsconfig.json", color: "#f59e0b", render: () => <SectionTsConfig /> },
  { id: "type-safe-api", icon: "🌐", title: "Type-Safe APIs", color: "#06b6d4", render: () => <SectionTypeSafeApi /> },
  { id: "killnotes", icon: "⚡", title: "Kill Notes", color: "#f59e0b", render: () => <TypeScriptKillNotes /> },
  { id: "interview", icon: "🎤", title: "Interview Q&A", color: "#ec4899", render: () => <TypeScriptInterview /> },
];

const LEARNING_MODULES = [
  {
    id: "node-phase1",
    title: "Node.js Core Fundamentals",
    subtitle: "Phase 1 · Deep Dive",
    description: "Runtime, Event Loop, Modules, Core APIs, Cheatsheets & Interview Prep",
    icon: "🟢",
    color: D.green,
    lessons: 7,
    status: "active",
    sections: NODE_SECTIONS,
  },
  {
    id: "express",
    title: "Express.js & Middleware",
    subtitle: "Phase 2 · Deep Dive",
    description: "Routing, middleware pattern, error handling, authentication, REST API design",
    icon: "🚂",
    color: "#8b5cf6",
    lessons: 8,
    status: "active",
    sections: EXPRESS_SECTIONS,
  },
  {
    id: "database",
    title: "Databases & ORMs",
    subtitle: "Phase 3 · Deep Dive",
    description: "MongoDB, PostgreSQL, Redis, Prisma, Mongoose, connection pooling",
    icon: "🗄️",
    color: "#3b82f6",
    lessons: 8,
    status: "active",
    sections: DATABASE_SECTIONS,
  },
  {
    id: "testing",
    title: "Testing & Debugging",
    subtitle: "Phase 4 · Deep Dive",
    description: "Jest, Mocha, Supertest, integration tests, debugging with ndb",
    icon: "🧪",
    color: "#f59e0b",
    lessons: 7,
    status: "active",
    sections: TESTING_SECTIONS,
  },
  {
    id: "deployment",
    title: "Deployment & DevOps",
    subtitle: "Phase 5 · Deep Dive",
    description: "Docker, PM2, nginx, CI/CD, environment management, monitoring",
    icon: "🚀",
    color: "#f43f5e",
    lessons: 8,
    status: "active",
    sections: DEVOPS_SECTIONS,
  },
  {
    id: "typescript",
    title: "TypeScript with Node",
    subtitle: "Phase 6 · Deep Dive",
    description: "Type safety, interfaces, generics, tsconfig, type-safe APIs with Zod",
    icon: "🔷",
    color: "#06b6d4",
    lessons: 8,
    status: "active",
    sections: TYPESCRIPT_SECTIONS,
  },
];

function Dashboard({ onSelectModule }) {
  return (
    <div style={{ minHeight: "100vh", background: D.bg, fontFamily: display, color: D.text }}>
      {/* Header */}
      <div style={{ padding: "20px 28px", borderBottom: `1px solid ${D.outline}`, background: D.surfaceLowest }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: D.greenBg, border: `1px solid ${D.green}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🎓</div>
          <div>
            <h1 style={{ margin: 0, fontSize: "clamp(16px,2.8vw,24px)", fontFamily: display, fontWeight: 800, color: D.text }}>LearnerModel</h1>
            <p style={{ margin: 0, fontSize: 11, color: D.muted, fontFamily: mono }}>Full-Stack Learning Dashboard</p>
          </div>
        </div>
        <p style={{ margin: "8px 0 0", fontSize: 13, color: D.muted, fontFamily: serif, maxWidth: 600, lineHeight: 1.7 }}>
          A structured learning path from zero to production. Each module is built with interactive demos, quizzes, real code examples, and interview prep.
        </p>
      </div>

      {/* Stats bar */}
      <div style={{ display: "flex", gap: 16, padding: "16px 28px", background: D.surface, borderBottom: `1px solid ${D.outline}`, flexWrap: "wrap" }}>
        {[
          { label: "Active Modules", value: "6", color: D.green },
          { label: "Total Lessons", value: "46", color: "#3b82f6" },
          { label: "Quizzes", value: "60+", color: "#f59e0b" },
          { label: "Live Demos", value: "7", color: "#ec4899" },
          { label: "Interview Qs", value: "37", color: "#14b8a6" },
        ].map(stat => (
          <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", background: D.surfaceLowest, borderRadius: 6 }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: stat.color, fontFamily: mono }}>{stat.value}</span>
            <span style={{ fontSize: 10, color: D.muted, fontFamily: mono, textTransform: "uppercase", letterSpacing: 1 }}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Module Grid */}
      <div style={{ padding: "24px 28px" }}>
        <h2 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700, color: D.text, fontFamily: display }}>Learning Modules</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {LEARNING_MODULES.map(mod => (
            <button
              key={mod.id}
              onClick={() => mod.status === "active" && onSelectModule(mod)}
              disabled={mod.status !== "active"}
              style={{
                padding: "20px",
                background: mod.status === "active" ? D.surfaceLowest : D.surface,
                border: `1px solid ${mod.status === "active" ? mod.color + "55" : D.outline}`,
                borderRadius: 10,
                cursor: mod.status === "active" ? "pointer" : "default",
                textAlign: "left",
                transition: "all 0.15s ease",
                opacity: mod.status === "active" ? 1 : 0.6,
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={e => {
                if (mod.status === "active") e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 28 }}>{mod.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: mod.status === "active" ? mod.color : D.muted, fontFamily: mono }}>{mod.title}</div>
                  <div style={{ fontSize: 10, color: D.muted, fontFamily: mono, marginTop: 2 }}>{mod.subtitle}</div>
                </div>
                {mod.status === "coming" && (
                  <span style={{ fontSize: 9, padding: "2px 8px", background: D.outline + "44", color: D.muted, borderRadius: 3, fontFamily: mono }}>SOON</span>
                )}
                {mod.status === "active" && (
                  <span style={{ fontSize: 9, padding: "2px 8px", background: mod.color + "22", color: mod.color, borderRadius: 3, fontFamily: mono }}>OPEN</span>
                )}
              </div>
              <p style={{ margin: "0 0 12px", fontSize: 12, color: D.muted, fontFamily: serif, lineHeight: 1.7 }}>{mod.description}</p>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {mod.lessons > 0 && (
                  <span style={{ fontSize: 10, color: D.muted, fontFamily: mono }}>{mod.lessons} lessons</span>
                )}
                {mod.status === "active" && (
                  <span style={{ marginLeft: "auto", fontSize: 11, color: mod.color, fontWeight: 700, fontFamily: mono }}>Start Learning →</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ModuleView({ module, onBack }) {
  // Handle ChatBot module specially
  if (module.isChatBot) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#ffffff" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #e2e8f0", background: "#ffffff" }}>
          <button onClick={onBack} style={{ padding: "5px 12px", background: "transparent", border: "1px solid #e2e8f0", borderRadius: 5, color: "#64748b", cursor: "pointer", fontSize: 11, fontFamily: "'Inter', monospace" }}>← Back to Dashboard</button>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <ChartBot />
        </div>
      </div>
    );
  }

  const [active, setActive] = useState(module.sections[0]?.id || "");
  const current = module.sections.find(s => s.id === active) || module.sections[0];
  const idx = module.sections.findIndex(s => s.id === active);

  if (!current) return null;

  return (
    <div style={{ minHeight: "100vh", background: D.bg, fontFamily: display, color: D.text, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ padding: "13px 20px 9px", borderBottom: `1px solid ${D.outline}`, background: D.surfaceLowest }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={onBack} style={{ padding: "5px 12px", background: "transparent", border: `1px solid ${D.outline}`, borderRadius: 5, color: D.muted, cursor: "pointer", fontSize: 11, fontFamily: mono }}>← Dashboard</button>
          <div style={{ width: 1, height: 20, background: D.outline }} />
          <div>
            <div style={{ fontSize: 10, letterSpacing: 4, color: D.muted, textTransform: "uppercase", marginBottom: 3, fontFamily: mono }}>{module.subtitle}</div>
            <h1 style={{ margin: 0, fontSize: "clamp(13px,2.4vw,19px)", fontFamily: display, fontWeight: 800, color: D.text }}>
              {module.title} — <span style={{ color: current.color, transition: "color 0.3s" }}>{current.title}</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, minHeight: 0, flexWrap: "wrap" }}>
        {/* Sidebar */}
        <div style={{ width: "clamp(115px,15vw,195px)", background: D.surfaceLowest, borderRight: `1px solid ${D.outline}`, padding: "8px 0", overflowY: "auto" }}>
          {module.sections.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)}
              style={{ display: "flex", alignItems: "center", gap: 7, width: "100%", padding: "9px 12px", background: active === s.id ? s.color + "0d" : "transparent", border: "none", borderLeft: active === s.id ? `3px solid ${s.color}` : "3px solid transparent", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
              <span style={{ fontSize: 12 }}>{s.icon}</span>
              <span style={{ fontSize: 11, fontWeight: active === s.id ? 700 : 400, color: active === s.id ? s.color : D.muted, fontFamily: mono }}>{s.title}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "clamp(12px,3vw,24px)", minWidth: 260 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 16, paddingBottom: 10, borderBottom: `1px solid ${current.color}22` }}>
            <span style={{ fontSize: 20 }}>{current.icon}</span>
            <h2 style={{ margin: 0, fontSize: "clamp(14px,2.2vw,20px)", fontFamily: display, color: current.color, fontWeight: 800 }}>{current.title}</h2>
          </div>
          {current.render()}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, gap: 8 }}>
            {idx > 0 && <button onClick={() => setActive(module.sections[idx-1].id)} style={{ padding: "7px 14px", background: "transparent", border: `1px solid ${D.outline}`, borderRadius: 5, color: D.muted, cursor: "pointer", fontSize: 11, fontFamily: mono }}>← {module.sections[idx-1].title}</button>}
            <div style={{ flex: 1 }} />
            {idx < module.sections.length-1 && <button onClick={() => setActive(module.sections[idx+1].id)} style={{ padding: "7px 14px", background: "transparent", border: `1px solid ${current.color}`, borderRadius: 5, color: current.color, cursor: "pointer", fontSize: 11, fontFamily: mono }}>{module.sections[idx+1].title} →</button>}
          </div>
        </div>
      </div>

      {/* Footer nav */}
      <div style={{ padding: "7px 14px", borderTop: `1px solid ${D.outline}`, background: D.surfaceLowest, display: "flex", gap: 4, flexWrap: "wrap" }}>
        {module.sections.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)}
            style={{ padding: "3px 8px", fontSize: 10, background: active === s.id ? s.color : "transparent", color: active === s.id ? "#fff" : D.muted, border: `1px solid ${active === s.id ? s.color : D.outline}`, borderRadius: 3, cursor: "pointer", fontWeight: active === s.id ? 900 : 400, fontFamily: mono }}>
            {s.icon} {s.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [chatBotOpen, setChatBotOpen] = useState(false);

  if (selectedModule) {
    return <ModuleView module={selectedModule} onBack={() => setSelectedModule(null)} />;
  }

  return (
    <>
      <Dashboard onSelectModule={setSelectedModule} />

      {/* Floating Chat Bot Button */}
      <button
        onClick={() => setChatBotOpen(true)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
          border: "none",
          color: "white",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(37, 99, 235, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          zIndex: 999,
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.1)";
          e.target.style.boxShadow = "0 6px 16px rgba(37, 99, 235, 0.6)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.4)";
        }}
        title="Open Chart Bot"
      >
        🤖
      </button>

      {/* Chat Bot Side Panel */}
      {chatBotOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setChatBotOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.3)",
              zIndex: 1000,
              animation: "fadeIn 0.2s ease",
            }}
          />
          {/* Side Panel */}
          <div
            style={{
              position: "fixed",
              right: 0,
              top: 0,
              bottom: 0,
              width: "420px",
              background: "#ffffff",
              boxShadow: "-2px 0 12px rgba(0, 0, 0, 0.15)",
              display: "flex",
              flexDirection: "column",
              zIndex: 1001,
              animation: "slideInRight 0.3s ease",
            }}
          >
            {/* Header */}
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #e2e8f0", background: "#ffffff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#1e293b" }}>🤖 Chart Bot</span>
              <button
                onClick={() => setChatBotOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: 18,
                  cursor: "pointer",
                  color: "#64748b",
                  padding: "4px 8px"
                }}
              >
                ✕
              </button>
            </div>
            {/* Chat Content */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <ChartBot />
            </div>
          </div>

          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideInRight {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
          `}</style>
        </>
      )}
    </>
  );
}
