import { useState } from "react";
import { D, mono, para } from "../../tokens";
import BigIdea from "../primitives/BigIdea";
import CodeBlock from "../primitives/CodeBlock";
import EasyBox from "../primitives/EasyBox";
import QuizCard from "../primitives/QuizCard";
import Tip from "../primitives/Tip";

export default function SectionGenerics() {
  const [tab, setTab] = useState("functions");
  const tabs = [
    { id: "functions", label: "⚙️ Functions" },
    { id: "constraints", label: "🔗 Constraints" },
    { id: "interfaces", label: "📐 Interfaces" },
    { id: "utility", label: "🛠️ Utility Types" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Generics let you write reusable code that works with multiple types while preserving type safety. They are one of TypeScript's most powerful features.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#8b5cf622" : "transparent", border: `1px solid ${tab === t.id ? "#8b5cf6" : D.outline}`, color: tab === t.id ? "#8b5cf6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "functions" && (
        <div>
          <CodeBlock label="generic function" code={`// Without generics — duplicates code
function wrapNumber(value: number): number[] {
  return [value];
}
function wrapString(value: string): string[] {
  return [value];
}

// With generics — one function, any type
function wrap<T>(value: T): T[] {
  return [value];
}

const nums = wrap<number>(42);      // number[]
const strs = wrap<string>("hello"); // string[]

// TypeScript can even infer the type
const inferred = wrap(true);        // boolean[]`} />
          <BigIdea number="1" title="Generics preserve type information" color="#8b5cf6">Without generics, you would use `any` and lose all type safety. With generics, TypeScript knows that `wrap(42)` returns `number[]` and `wrap("hello")` returns `string[]`. The type flows through the function.</BigIdea>
        </div>
      )}
      {tab === "constraints" && (
        <div>
          <CodeBlock label="generic constraints" code={`// Constrain T to objects with a length property
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}

getLength("hello");     // ✅ string has length
getLength([1, 2, 3]);  // ✅ array has length
// getLength(42);       // ❌ number has no length

// Multiple constraints
function logAndReturn<T extends { toString(): string }>(value: T): T {
  console.log(value.toString());
  return value;
}`} />
          <Tip icon="🎯" color={D.yellow} title="extends is your friend">Use `extends` to constrain generics to types that have certain properties or methods. This gives you both flexibility (works with any matching type) and safety (rejects invalid types at compile time).</Tip>
        </div>
      )}
      {tab === "interfaces" && (
        <div>
          <CodeBlock label="generic interfaces" code={`interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Usage with User
interface User {
  id: number;
  name: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Alice" },
  status: 200,
  message: "OK"
};

// Usage with array
const listResponse: ApiResponse<User[]> = {
  data: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }],
  status: 200,
  message: "OK"
};

// Generic class
class Repository<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findById(id: number): T | undefined {
    return this.items.find((item: any) => item.id === id);
  }
}`} />
          <EasyBox emoji="🎯" title="Real-world pattern" color="#8b5cf6">`ApiResponse&lt;T&gt;` is used in virtually every TypeScript API client. One interface handles all endpoints — users, posts, orders — while keeping every response fully typed.</EasyBox>
        </div>
      )}
      {tab === "utility" && (
        <div>
          <BigIdea number="1" title="Built-in utility types transform existing types" color="#8b5cf6">TypeScript ships with generic utility types that let you derive new types from existing ones. These eliminate boilerplate and are used constantly in MNC codebases.</BigIdea>
          <CodeBlock label="Partial, Required, Readonly, Pick, Omit" code={`interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

// Partial<T> — all fields optional (great for PATCH updates)
type UpdateUserDto = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number }

// Required<T> — all fields required (removes optional)
type CompleteUser = Required<User>;
// { id: number; name: string; email: string; age: number }

// Readonly<T> — all fields read-only
const user: Readonly<User> = { id: 1, name: 'Alice', email: 'a@b.com' };
// user.name = 'Bob'; // ❌ Error!

// Pick<T, K> — keep only named fields
type UserPreview = Pick<User, 'id' | 'name'>;
// { id: number; name: string }

// Omit<T, K> — remove named fields
type PublicUser = Omit<User, 'email' | 'age'>;
// { id: number; name: string }`} />
          <CodeBlock label="Record, Extract, Exclude, ReturnType" code={`// Record<K, V> — typed object map
type RolePermissions = Record<'admin' | 'editor' | 'viewer', string[]>;
const perms: RolePermissions = {
  admin: ['read', 'write', 'delete'],
  editor: ['read', 'write'],
  viewer: ['read'],
};

// Extract and Exclude work on unions
type AllStatus = 'pending' | 'active' | 'banned' | 'deleted';
type VisibleStatus = Extract<AllStatus, 'pending' | 'active'>;  // 'pending' | 'active'
type HiddenStatus = Exclude<AllStatus, 'pending' | 'active'>;   // 'banned' | 'deleted'

// ReturnType<T> — extract function return type
async function fetchUser(id: number) {
  return { id, name: 'Alice', email: 'a@b.com' };
}
type FetchUserResult = Awaited<ReturnType<typeof fetchUser>>;
// { id: number; name: string; email: string }

// Parameters<T> — extract function parameter types
function createUser(name: string, role: 'admin' | 'user') {}
type CreateUserParams = Parameters<typeof createUser>;
// [string, 'admin' | 'user']`} />
          <Tip icon="🎯" color={D.yellow} title="MNC code review tip">If you see a function that manually re-declares fields from an existing interface, suggest Partial, Pick, or Omit instead. These are the first things TypeScript reviewers look for. Never duplicate types when a utility type can derive it.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What do generics allow you to do?" options={["Make code run faster", "Write reusable code that preserves type safety", "Replace interfaces entirely", "Disable type checking"]} correct={1} explain="Generics let you write functions, interfaces, and classes that work with multiple types while preserving type information. No need for any." />
          <QuizCard question="What does T extends { length: number } mean?" options={["T must be a number", "T must have a length property", "T must be an array", "T must be a string"]} correct={1} explain="extends constrains the generic type. T must be a type that has a length property — this includes strings, arrays, and any custom object with length." />
          <QuizCard question="Which utility type makes all fields optional?" options={["Required<T>", "Partial<T>", "Optional<T>", "Maybe<T>"]} correct={1} explain="Partial<T> makes all properties of T optional. It's commonly used for PATCH/update DTOs where you only send the fields you want to change." />
          <QuizCard question="How do you derive a type with only 'id' and 'name' from a full User interface?" options={["Exclude<User, 'id' | 'name'>", "Pick<User, 'id' | 'name'>", "Partial<User>", "Extract<User, string>"]} correct={1} explain="Pick<T, K> constructs a type with only the specified fields K from type T. Pick<User, 'id' | 'name'> gives { id: number; name: string }." />
        </div>
      )}
    </div>

  );
}
