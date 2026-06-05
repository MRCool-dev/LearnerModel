import { useState } from "react";
import { D, mono, serif, para } from "../../tokens";
import BigIdea from "../primitives/BigIdea";
import EasyBox from "../primitives/EasyBox";
import Tip from "../primitives/Tip";
import QuizCard from "../primitives/QuizCard";
import CodeBlock from "../primitives/CodeBlock";
import NodeVsBrowserDemo from "../demos/NodeVsBrowserDemo";

export default function SectionWhatIsNode() {
  const [tab, setTab] = useState("story");
  const tabs = [
    { id: "story", label: "📖 The Story" },
    { id: "how", label: "⚙️ How it works" },
    { id: "browser", label: "🔀 Browser vs Node" },
    { id: "why", label: "🎯 Why use it?" },
    { id: "demo", label: "🧪 Live Demo" },
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
      {tab === "demo" && <NodeVsBrowserDemo />}
    </div>
  );
}
