# TypeScript with Node - Complete Learning Module

## What is TypeScript?

TypeScript is JavaScript with types. It compiles to plain JavaScript but catches bugs at compile time — before your code ever runs.

---

## Why TypeScript?

| JavaScript | TypeScript |
|------------|------------|
| `const user = fetchUser()` — what properties does user have? | `const user: User = fetchUser()` — every property is known |
| Runtime error: `user.nmae` is undefined | Compile error: `Property 'nmae' does not exist` |
| Refactoring is scary | Refactoring is safe — TS tells you every broken reference |
| Autocomplete is guesswork | Autocomplete is precise and reliable |

---

## 1. Basic Types

```typescript
// Primitives
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

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Optional parameter
function greet(name: string, greeting?: string): string {
  return `${greeting ?? "Hello"}, ${name}`;
}

// Union types
let id: string | number = "abc123";
id = 123; // also valid

// Literal types
type Status = "pending" | "active" | "inactive";
const status: Status = "active";
```

---

## 2. Interfaces

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;           // optional
  readonly createdAt: Date; // cannot be modified after creation
}

// Extending interfaces
interface Admin extends User {
  role: "admin";
  permissions: string[];
}

const admin: Admin = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  role: "admin",
  permissions: ["users:read", "users:write"],
  createdAt: new Date()
};
```

---

## 3. Generics

```typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);
const str = identity<string>("hello");

// Generic with constraint
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}

getLength("hello");     // ✅ string has length
getLength([1, 2, 3]);  // ✅ array has length
// getLength(42);       // ❌ number has no length

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Alice", email: "alice@example.com", createdAt: new Date() },
  status: 200,
  message: "OK"
};
```

---

## 4. tsconfig.json

```json
{
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
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

### strict mode enables:
- `noImplicitAny` — must type all parameters
- `strictNullChecks` — null/undefined are separate types
- `strictFunctionTypes` — function parameters are checked contravariantly
- `noImplicitReturns` — all code paths must return a value

---

## 5. Type-Safe APIs

```typescript
import { Request, Response } from "express";
import { z } from "zod";

// Define schema with Zod
const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().min(0).optional()
});

type CreateUserInput = z.infer<typeof CreateUserSchema>;

// Type-safe handler
app.post("/users", (req: Request, res: Response) => {
  const result = CreateUserSchema.safeParse(req.body);
  
  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }
  
  const user: CreateUserInput = result.data;
  // user is fully typed — autocomplete works!
  
  return res.status(201).json({ data: user });
});
```

---

## KEY CONCEPTS TO REMEMBER

| Concept | What It Does |
|---------|-------------|
| **Type Inference** | TS guesses types when not explicitly declared |
| **Interface** | Defines the shape of an object |
| **Type Alias** | Creates a new name for a type (`type ID = string`) |
| **Generic** | Creates reusable components that work with multiple types |
| **Union** | Type can be one of several options (`string \| number`) |
| **Intersection** | Combines multiple types (`A & B`) |
| **Utility Types** | Built-in helpers: `Partial`, `Required`, `Pick`, `Omit` |
| **Type Guard** | Runtime check that narrows the type |
| **Declaration File** | `.d.ts` files describe types for JS libraries |

---

## PRACTICE EXERCISES

1. Convert a JavaScript Express app to TypeScript
2. Create interfaces for a blog system (User, Post, Comment)
3. Write a generic function that filters an array by a predicate
4. Configure tsconfig.json with strict mode
5. Build a type-safe API with Zod validation

---

**Today's Date:** 2026-05-15

Types catch bugs before they catch you.
