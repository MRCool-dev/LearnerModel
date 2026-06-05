import { D, mono, para, serif } from "../../tokens";

export default function TypeScriptKillNotes() {
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
