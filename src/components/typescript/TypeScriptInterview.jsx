import { useState } from "react";
import { D, mono, para, serif } from "../../tokens";
import CodeBlock from "../primitives/CodeBlock";

export default function TypeScriptInterview() {
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
