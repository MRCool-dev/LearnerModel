import { useState } from "react";
import { D, mono, para } from "../../tokens";
import BigIdea from "../primitives/BigIdea";
import CodeBlock from "../primitives/CodeBlock";
import EasyBox from "../primitives/EasyBox";
import QuizCard from "../primitives/QuizCard";
import Tip from "../primitives/Tip";

export default function SectionTypeSafeApi() {
  const [tab, setTab] = useState("zod");
  const tabs = [
    { id: "zod", label: "🔷 Zod" },
    { id: "express", label: "🌐 Express + TS" },
    { id: "pattern", label: "📐 Patterns" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Type-safe APIs combine TypeScript's compile-time safety with runtime validation. The result: APIs that are correct by design and protected against bad input.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#06b6d422" : "transparent", border: `1px solid ${tab === t.id ? "#06b6d4" : D.outline}`, color: tab === t.id ? "#06b6d4" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "zod" && (
        <div>
          <CodeBlock label="runtime validation with Zod" code={`import { z } from "zod";

// Define schema
const CreateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  age: z.number().min(0).max(150).optional(),
  role: z.enum(["user", "admin"]).default("user")
});

// Infer TypeScript type from schema
type CreateUserInput = z.infer<typeof CreateUserSchema>;
// { name: string; email: string; age?: number; role: "user" | "admin" }

// Validate at runtime
const result = CreateUserSchema.safeParse(req.body);
if (!result.success) {
  return res.status(400).json({
    errors: result.error.issues
  });
}
const user: CreateUserInput = result.data;`} />
          <BigIdea number="1" title="Zod bridges the type gap" color="#06b6d4">TypeScript types disappear at runtime. A malicious client can send {'{ name: 123 }'} and TypeScript cannot stop it. Zod validates the actual runtime data AND generates the TypeScript type. One source of truth, two guarantees.</BigIdea>
          <Tip icon="🎯" color={D.yellow} title="Install Zod">`npm install zod`. It has zero dependencies and works with any TypeScript project. Combine it with `z.infer` to get automatic type generation.</Tip>
        </div>
      )}
      {tab === "express" && (
        <div>
          <CodeBlock label="type-safe Express handler" code={`import { Request, Response } from "express";
import { z } from "zod";

const UpdateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional()
}).refine(data => data.name || data.email, {
  message: "At least one field required"
});

type UpdateUserInput = z.infer<typeof UpdateUserSchema>;

app.put("/users/:id", async (req: Request, res: Response) => {
  const parseResult = UpdateUserSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: parseResult.error.flatten()
    });
  }

  const data: UpdateUserInput = parseResult.data;
  // data is fully typed — autocomplete works!

  const user = await prisma.user.update({
    where: { id: parseInt(req.params.id) },
    data
  });

  res.json({ data: user });
});`} />
          <EasyBox emoji="✨" title="Full-stack type safety" color="#06b6d4">With Zod + Prisma + TypeScript, your API is type-safe from the database to the HTTP response. Change a schema field? TypeScript catches every broken reference in your handlers, tests, and frontend code.</EasyBox>
        </div>
      )}
      {tab === "pattern" && (
        <div>
          <CodeBlock label="validated request wrapper" code={`// middleware/validate.ts
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate = <T>(schema: ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: "Invalid input",
        issues: result.error.issues
      });
    }
    req.body = result.data; // replace with validated data
    next();
  };
};

// Usage in routes
import { validate } from "./middleware/validate";

app.post("/users",
  validate(CreateUserSchema),
  async (req: Request, res: Response) => {
    // req.body is guaranteed to match CreateUserInput
    const user = await prisma.user.create({ data: req.body });
    res.status(201).json({ data: user });
  }
);`} />
          <Tip icon="🎯" color={D.yellow} title="DRY validation">Create a `validate` middleware once, reuse it on every route. No more copying validation logic. No more untyped req.body. Every endpoint gets automatic validation and type inference.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="Why use Zod when TypeScript already has types?" options={["Zod is faster", "TypeScript types disappear at runtime; Zod validates actual data", "Zod replaces TypeScript", "Zod is required by Express"]} correct={1} explain="TypeScript types are erased during compilation. Zod validates the actual runtime data that clients send. Without Zod, a malicious client can bypass TypeScript's compile-time checks." />
          <QuizCard question="What does z.infer do?" options={["It runs validation", "It extracts a TypeScript type from a Zod schema", "It compiles TypeScript", "It creates a database table"]} correct={1} explain="z.infer&lt;typeof Schema&gt; generates a TypeScript type from a Zod schema. One schema serves as both runtime validator and compile-time type definition." />
          <QuizCard question="What is the benefit of a validate middleware?" options={["It makes code shorter", "It centralizes validation logic and guarantees typed req.body", "It replaces the need for tests", "It handles authentication"]} correct={1} explain="A validate middleware reuses the same validation pattern across all routes. It keeps route handlers clean and ensures req.body is always validated and correctly typed." />
        </div>
      )}
    </div>
  );
}
