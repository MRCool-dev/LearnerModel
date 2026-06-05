import { useState } from "react";
import { D, mono, para } from "../../tokens";
import CodeBlock from "../primitives/CodeBlock";
import EasyBox from "../primitives/EasyBox";
import QuizCard from "../primitives/QuizCard";
import Tip from "../primitives/Tip";

export default function SectionInterfaces() {
  const [tab, setTab] = useState("interface");
  const tabs = [
    { id: "interface", label: "📐 Interface" },
    { id: "vs-type", label: "⚖️ Interface vs Type" },
    { id: "extending", label: "🔗 Extending" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Interfaces define the shape of objects. They are the foundation of type-safe code in TypeScript.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#14b8a622" : "transparent", border: `1px solid ${tab === t.id ? "#14b8a6" : D.outline}`, color: tab === t.id ? "#14b8a6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "interface" && (
        <div>
          <CodeBlock label="interface basics" code={`interface User {
  id: number;
  name: string;
  email: string;
  age?: number;              // optional
  readonly createdAt: Date;  // immutable after creation
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  createdAt: new Date()
};

// ❌ Error: cannot assign to readonly property
user.createdAt = new Date();

// ✅ Allowed: optional property can be omitted
const user2: User = {
  id: 2,
  name: "Bob",
  email: "bob@example.com",
  createdAt: new Date()
};`} />
          <Tip icon="🔒" color={D.yellow} title="readonly">Use `readonly` for properties that should never change after creation. This prevents accidental mutations and makes your code more predictable. It only affects the property assignment — it does not make nested objects immutable.</Tip>
        </div>
      )}
      {tab === "vs-type" && (
        <div>
          <CodeBlock label="interface vs type alias" code={`// Interface
interface User {
  name: string;
}

// Type alias
type UserType = {
  name: string;
};

// Key differences:
// 1. Interface can be extended with 'extends'
// 2. Interface can be reopened (declaration merging)
// 3. Type can use unions, intersections, mapped types

// Declaration merging — interfaces only!
interface User {
  age: number;  // Adds age to the existing User interface
}`} />
          <div style={{ overflowX: "auto", marginBottom: 14 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: mono, fontSize: 11 }}>
              <thead><tr>{["Feature", "Interface", "Type"].map((h, i) => (
                <th key={i} style={{ padding: "9px 12px", background: D.surface, color: [D.muted, "#14b8a6", "#f59e0b"][i], textAlign: "left", borderBottom: `1px solid ${D.outline}`, fontSize: 10 }}>{h}</th>
              ))}</tr></thead>
              <tbody>
                {[["Declaration merging","✅ Yes","❌ No"],["extends","✅ Yes","❌ (use & instead)"],["Union types","❌ No","✅ Yes"],["Mapped types","❌ No","✅ Yes"],["Best for","Objects, classes, OOP","Unions, tuples, complex types"]].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : D.surface + "06" }}>
                    {row.map((cell, j) => <td key={j} style={{ padding: "8px 12px", borderBottom: `1px solid ${D.outline}`, color: j === 0 ? D.text : D.muted }}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Tip icon="🎯" color={D.yellow} title="Simple rule">Use `interface` for objects and class shapes. Use `type` for unions, tuples, and when you need mapped types. In modern TS, either works for most cases — consistency matters more than the choice.</Tip>
        </div>
      )}
      {tab === "extending" && (
        <div>
          <CodeBlock label="extending interfaces" code={`interface User {
  id: number;
  name: string;
  email: string;
}

interface Admin extends User {
  role: "admin";
  permissions: string[];
}

const admin: Admin = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  role: "admin",
  permissions: ["users:read", "users:write"]
};

// Multiple inheritance
interface SuperAdmin extends Admin, Employee {
  superPower: boolean;
}`} />
          <CodeBlock label="utility types" code={`// Make all properties optional
const partialUser: Partial<User> = { name: "Alice" };

// Make all properties required
const fullUser: Required<User> = { id: 1, name: "Alice", email: "a@b.com", age: 30 };

// Pick only specific properties
const userPreview: Pick<User, "id" | "name"> = { id: 1, name: "Alice" };

// Omit specific properties
const userWithoutEmail: Omit<User, "email"> = { id: 1, name: "Alice" };

// Extract the type of a property
type UserName = User["name"]; // string`} />
          <EasyBox emoji="✨" title="Utility types save time" color="#14b8a6">Partial, Required, Pick, Omit, Record, and ReturnType are built into TypeScript. They let you derive new types from existing ones without repeating yourself. Learn them well.</EasyBox>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What does the ? symbol mean in an interface?" options={["The property is required", "The property is optional", "The property is readonly", "The property is private"]} correct={1} explain="The ? mark makes a property optional. Objects of that interface can include or omit the property without causing a type error." />
          <QuizCard question="Which feature is unique to interfaces (not available with type)?" options={["Union types", "Declaration merging", "Intersection types", "Mapped types"]} correct={1} explain="Interfaces support declaration merging — you can define the same interface multiple times and TypeScript merges them. Type aliases do not support this." />
          <QuizCard question="What does Omit&lt;User, 'email'&gt; do?" options={["Keeps only the email property", "Removes the email property from the type", "Makes email optional", "Makes email readonly"]} correct={1} explain="Omit creates a new type with all properties EXCEPT the specified ones. Omit&lt;User, 'email'&gt; produces a type with every User property except email." />
        </div>
      )}
    </div>
  );
}
