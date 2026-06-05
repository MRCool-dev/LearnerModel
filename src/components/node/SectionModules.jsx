import { useState } from "react";
import { D, mono, para } from "../../tokens";
import BigIdea from "../primitives/BigIdea";
import EasyBox from "../primitives/EasyBox";
import CodeBlock from "../primitives/CodeBlock";
import Tip from "../primitives/Tip";
import QuizCard from "../primitives/QuizCard";
import ModuleSystemDemo from "../demos/ModuleSystemDemo";

export default function SectionModules() {
  const [tab, setTab] = useState("what");
  const tabs = [{ id: "what", label: "🤔 What & Why" }, { id: "cjs", label: "📦 CommonJS" }, { id: "esm", label: "🔷 ES Modules" }, { id: "wrapper", label: "🎁 Module Wrapper" }, { id: "compare", label: "⚖️ Compare" }, { id: "demo", label: "🧪 Live Demo" }];
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
      {tab === "demo" && <ModuleSystemDemo />}
    </div>
  );
}
