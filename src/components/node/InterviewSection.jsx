import { useState } from "react";
import { D, mono, serif, para } from "../../tokens";
import CodeBlock from "../primitives/CodeBlock";

export default function InterviewSection() {
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
