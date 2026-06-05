import { useState } from "react";
import { D, mono, para } from "../../tokens";
import BigIdea from "../primitives/BigIdea";
import CodeBlock from "../primitives/CodeBlock";
import EasyBox from "../primitives/EasyBox";
import QuizCard from "../primitives/QuizCard";
import Tip from "../primitives/Tip";

export default function SectionTsConfig() {
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
