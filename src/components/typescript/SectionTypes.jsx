import { useState } from "react";
import { D, mono, para } from "../../tokens";
import CodeBlock from "../primitives/CodeBlock";
import EasyBox from "../primitives/EasyBox";
import QuizCard from "../primitives/QuizCard";
import Tip from "../primitives/Tip";

export default function SectionTypes() {
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
