import { useState } from "react";
import { D, mono, serif, para } from "../../tokens";
import CodeBlock from "../primitives/CodeBlock";
import BigIdea from "../primitives/BigIdea";
import EasyBox from "../primitives/EasyBox";
import Tip from "../primitives/Tip";
import QuizCard from "../primitives/QuizCard";

export default function SectionPrisma() {
  const [tab, setTab] = useState("schema");
  const tabs = [
    { id: "schema", label: "📝 Schema" },
    { id: "queries", label: "🔍 Queries" },
    { id: "relations", label: "🔗 Relations" },
    { id: "migrate", label: "🔄 Migrations" },
    { id: "advanced", label: "🚀 Advanced" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  const color = "#8b5cf6";
  return (
    <div>
      <p style={para}>Prisma is a modern ORM for Node.js and TypeScript. Unlike traditional ORMs, Prisma uses a declarative schema file and generates a fully type-safe client. At 2.5yr exp you're expected to know relations, advanced queries, transactions, and raw SQL fallbacks.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? color + "22" : "transparent", border: `1px solid ${tab === t.id ? color : D.outline}`, color: tab === t.id ? color : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "schema" && (
        <div>
          <CodeBlock label="schema.prisma — full example" code={`generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  role      Role     @default(USER)
  posts     Post[]
  profile   Profile?
  orders    Order[]
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("users")
  @@index([createdAt])
}

enum Role {
  USER
  ADMIN
  MODERATOR
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  slug      String   @unique
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId  String   @map("author_id")
  tags      Tag[]
  createdAt DateTime @default(now())

  @@map("posts")
  @@index([authorId, published])
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  avatar String?
  user   User    @relation(fields: [userId], references: [id])
  userId String  @unique @map("user_id")
}

model Tag {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[]
}

model Order {
  id     Int         @id @default(autoincrement())
  total  Decimal     @db.Decimal(10, 2)
  status OrderStatus @default(PENDING)
  user   User        @relation(fields: [userId], references: [id])
  userId String      @map("user_id")
}

enum OrderStatus { PENDING PAID SHIPPED DELIVERED CANCELLED }`} />
          <EasyBox emoji="✨" title="Key schema features" color={color}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {[["@id","Primary key"],["@unique","Unique constraint"],["@default(now())","Timestamp default"],["@updatedAt","Auto-update timestamp"],["@map('col_name')","Map to different DB column"],["@@map('table')","Map model to DB table name"],["@@index([...])","Composite index"],["onDelete: Cascade","Cascade delete on relation"]].map(([k, v], i) => (
                <div key={i} style={{ padding: "4px 8px", background: D.surface, borderRadius: 5 }}>
                  <div style={{ fontSize: 10, color, fontFamily: mono }}>{k}</div>
                  <div style={{ fontSize: 10, color: D.muted, fontFamily: serif }}>{v}</div>
                </div>
              ))}
            </div>
          </EasyBox>
        </div>
      )}
      {tab === "queries" && (
        <div>
          <CodeBlock label="CRUD — full patterns" code={`const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// CREATE
const user = await prisma.user.create({
  data: { email: 'alice@example.com', name: 'Alice' },
  select: { id: true, email: true }   // return only these fields
});

// CREATE MANY
await prisma.user.createMany({
  data: [{ email: 'b@x.com', name: 'Bob' }, { email: 'c@x.com', name: 'Carol' }],
  skipDuplicates: true,
});

// UPSERT — create or update
await prisma.user.upsert({
  where:  { email: 'alice@example.com' },
  update: { name: 'Alice Updated' },
  create: { email: 'alice@example.com', name: 'Alice' },
});

// READ — various patterns
const user  = await prisma.user.findUnique({ where: { id: '...' } });
const user2 = await prisma.user.findUniqueOrThrow({ where: { id: '...' } }); // throws if not found
const first = await prisma.user.findFirst({ where: { role: 'ADMIN' }, orderBy: { createdAt: 'asc' } });

// READ MANY with filter, sort, paginate, select
const users = await prisma.user.findMany({
  where: {
    role: 'USER',
    createdAt: { gt: new Date('2024-01-01') },
    email: { endsWith: '@company.com' },
    OR: [{ name: { contains: 'Ali' } }, { name: { startsWith: 'Bob' } }],
  },
  select: { id: true, name: true, email: true, _count: { select: { posts: true } } },
  orderBy: [{ createdAt: 'desc' }, { name: 'asc' }],
  take:   10,
  skip:   20,
});

// UPDATE
await prisma.user.update({
  where: { id: '...' },
  data:  { name: 'Updated', role: 'ADMIN' },
});

// UPDATE MANY
await prisma.user.updateMany({
  where: { role: 'USER', createdAt: { lt: cutoffDate } },
  data:  { role: 'MODERATOR' },
});

// DELETE
await prisma.user.delete({ where: { id: '...' } });
await prisma.user.deleteMany({ where: { createdAt: { lt: cutoffDate } } });`} />
          <Tip icon="⚡" color={color} title="select vs include">select specifies exactly which fields to return (like SQL SELECT). include fetches related models. Never use both at the top level — they conflict. Use select with nested select to control related model fields.</Tip>
        </div>
      )}
      {tab === "relations" && (
        <div>
          <EasyBox emoji="🔗" title="Relation types in Prisma" color={color}>Prisma supports one-to-one, one-to-many, and many-to-many. Relations are defined bidirectionally in the schema. The foreign key side has @relation(fields, references).</EasyBox>
          <CodeBlock label="querying with include (eager loading)" code={`// Include related records
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    posts: {
      where:   { published: true },
      orderBy: { createdAt: 'desc' },
      take:    5,
      select:  { id: true, title: true, slug: true }
    },
    profile: true,
    _count: { select: { posts: true, orders: true } }  // count relations
  }
});

// Nested writes — create user + profile + posts in one query
const user = await prisma.user.create({
  data: {
    email:   'alice@example.com',
    name:    'Alice',
    profile: { create: { bio: 'Full-stack dev', avatar: 'https://...' } },
    posts: {
      create: [
        { title: 'Post 1', slug: 'post-1', content: '...' },
        { title: 'Post 2', slug: 'post-2', content: '...' }
      ]
    }
  }
});

// Connect existing records (many-to-many)
await prisma.post.update({
  where: { id: postId },
  data: {
    tags: {
      connect:    [{ id: tag1Id }, { id: tag2Id }],  // add tags
      disconnect: [{ id: oldTagId }],                 // remove tag
      set:        [{ id: tag1Id }],                   // replace all
    }
  }
});`} />
          <Tip icon="💡" color={D.yellow} title="Fluent API — alternative relation traversal">{"prisma.user.findUnique({where:{id}}).posts() — chains relation methods instead of include. Returns the related records directly. Less common but useful for conditional loading."}</Tip>
        </div>
      )}
      {tab === "migrate" && (
        <div>
          <CodeBlock label="Prisma migration workflow" code={`# ── DEVELOPMENT ──────────────────────────────────────────
# 1. Edit schema.prisma

# 2. Create + apply migration (dev only)
npx prisma migrate dev --name add_user_role
# → creates prisma/migrations/20240315_add_user_role/migration.sql
# → applies it to your local DB
# → regenerates Prisma Client

# 3. Open visual DB browser
npx prisma studio

# ── PRODUCTION ────────────────────────────────────────────
# Apply pending migrations (no schema changes, no client regen)
npx prisma migrate deploy

# ── TROUBLESHOOTING ───────────────────────────────────────
# Check migration status
npx prisma migrate status

# Reset DB (dev only — DROPS ALL DATA)
npx prisma migrate reset

# Push schema without migrations (prototyping only — never production)
npx prisma db push

# Pull schema from existing DB (introspect)
npx prisma db pull

# Regenerate client after schema edit
npx prisma generate`} />
          <EasyBox emoji="📁" title="Migration files are SQL you can read" color={color}>Every migration is stored as a plain SQL file in prisma/migrations/. Commit them to git. Review them in PRs. Never delete them — they are the history of your database schema. In production, migrations run in the deploy pipeline, not on developer machines.</EasyBox>
          <Tip icon="⚠️" color={D.red} title="Never use db push in production">db push changes the database schema directly without creating a migration file. You lose the history, can't roll back, and your team can't reproduce the change. Always use migrate dev → migrate deploy.</Tip>
        </div>
      )}
      {tab === "advanced" && (
        <div>
          <BigIdea number="1" title="Transactions" color={color}>Prisma supports two transaction modes: sequential (array) for simple cases and interactive (callback) for complex logic with conditional branching.</BigIdea>
          <CodeBlock label="transactions — both modes" code={`// Sequential transaction — runs in order, all-or-nothing
await prisma.$transaction([
  prisma.order.create({ data: { userId, total: 99.99, status: 'PENDING' } }),
  prisma.user.update({ where: { id: userId }, data: { orderCount: { increment: 1 } } }),
]);

// Interactive transaction — full control with try/catch inside
await prisma.$transaction(async (tx) => {
  const account = await tx.account.findUnique({ where: { id: fromId } });
  if (account.balance < amount) throw new Error('Insufficient funds');

  await tx.account.update({ where: { id: fromId }, data: { balance: { decrement: amount } } });
  await tx.account.update({ where: { id: toId },   data: { balance: { increment: amount } } });
  await tx.transfer.create({ data: { fromId, toId, amount } });
  // any error auto-rolls back the entire transaction
}, { timeout: 10000 }); // optional timeout`} />
          <BigIdea number="2" title="Raw SQL fallback" color="#14b8a6">When Prisma's query builder can't express what you need (CTEs, window functions, JSONB operations), drop to raw SQL. You still get parameter safety.</BigIdea>
          <CodeBlock label="raw SQL in Prisma" code={`// $queryRaw — returns typed rows
const users = await prisma.$queryRaw\`
  SELECT u.id, u.name, COUNT(o.id)::int AS order_count
  FROM users u
  LEFT JOIN orders o ON u.id = o.user_id
  WHERE u.role = \${role}
  GROUP BY u.id
  HAVING COUNT(o.id) > \${minOrders}
\`;

// $executeRaw — for INSERT/UPDATE/DELETE, returns rowCount
const count = await prisma.$executeRaw\`
  UPDATE users SET last_login = NOW() WHERE id = \${userId}
\`;

// Raw with Prisma.sql template tag for safety
import { Prisma } from '@prisma/client';
const result = await prisma.$queryRaw(
  Prisma.sql\`SELECT * FROM users WHERE email = \${email}\`
);`} />
          <CodeBlock label="middleware — logging, soft delete" code={`// Prisma Client extensions (v5+)
const prisma = new PrismaClient().$extends({
  query: {
    $allModels: {
      async findMany({ model, operation, args, query }) {
        // Automatically exclude soft-deleted rows
        args.where = { ...args.where, deletedAt: null };
        return query(args);
      }
    }
  }
});

// Legacy middleware (before extensions)
prisma.$use(async (params, next) => {
  const start = Date.now();
  const result = await next(params);
  console.log(\`\${params.model}.\${params.action} took \${Date.now() - start}ms\`);
  return result;
});`} />
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What file does Prisma use to define your data model?" options={["database.json", "schema.prisma", "models.js", "prisma.config"]} correct={1} explain="Prisma uses schema.prisma — a declarative file where you define models, fields, relations, and database connection settings." />
          <QuizCard question="What does prisma.$transaction([...]) do?" options={["Connects to multiple databases", "Runs multiple operations atomically — all succeed or all roll back", "Caches query results", "Creates a backup"]} correct={1} explain="$transaction runs multiple Prisma operations in a single database transaction. Either all succeed or all are rolled back together." />
          <QuizCard question="Why is Prisma considered 'type-safe'?" options={["It uses TypeScript for the schema file", "It generates types from the schema, catching errors at compile time", "It validates data at runtime only", "It only works with TypeScript projects"]} correct={1} explain="Prisma generates TypeScript types from schema.prisma. Mistyped field names or wrong argument types are caught by the TypeScript compiler before the code runs." />
          <QuizCard question="What is the difference between select and include in Prisma?" options={["They are the same", "select picks fields, include fetches related models", "include is faster than select", "select only works on root model"]} correct={1} explain="select controls which fields of the model are returned. include fetches entire related models. They cannot both appear at the top level of a query." />
          <QuizCard question="Why should you never use 'prisma db push' in production?" options={["It is too slow", "It changes the DB without creating a migration file — no history, no rollback", "It requires admin privileges", "It only works with SQLite"]} correct={1} explain="db push bypasses the migration system. The change is applied but not recorded. Your team can't reproduce it, and you can't roll it back. Always use migrate dev → migrate deploy." />
          <QuizCard question="When would you use $queryRaw instead of the Prisma query builder?" options={["For simple CRUD", "For window functions, CTEs, or complex SQL the query builder can't express", "For all production queries", "Only for SELECT queries"]} correct={1} explain="The Prisma query builder covers most CRUD. For advanced SQL like window functions (RANK, ROW_NUMBER), CTEs (WITH clause), or complex JSONB operations, use $queryRaw with template literals for safe parameterization." />
        </div>
      )}
    </div>
  );
}
