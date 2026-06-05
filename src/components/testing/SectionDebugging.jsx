import { useState } from "react";
import { D, mono, para } from "../../tokens";
import CodeBlock from "../primitives/CodeBlock";
import Tip from "../primitives/Tip";
import EasyBox from "../primitives/EasyBox";
import BigIdea from "../primitives/BigIdea";
import QuizCard from "../primitives/QuizCard";

export default function SectionDebugging() {
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
