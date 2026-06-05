import { useState } from "react";
import { D, mono, serif, para } from "../../tokens";
import BigIdea from "../primitives/BigIdea";
import EasyBox from "../primitives/EasyBox";
import CodeBlock from "../primitives/CodeBlock";
import QuizCard from "../primitives/QuizCard";
import EventLoopDemo from "../demos/EventLoopDemo";

export default function SectionEventLoop() {
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
