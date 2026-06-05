import { D, mono, serif, para } from "../../tokens";

export default function KillNotes() {
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
