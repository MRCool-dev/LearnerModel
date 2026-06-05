import { useState } from "react";
import { D, mono, serif, para } from "../../tokens";
import CodeBlock from "../primitives/CodeBlock";

export default function DatabaseInterview() {
  const [open, setOpen] = useState(null);
  const qs = [
    { q: "What is the difference between SQL and NoSQL databases?", level: "Junior", color: D.green,
      a: `SQL databases are relational. They store data in tables with predefined schemas, use SQL for queries, support ACID transactions, and scale vertically (bigger machines). Examples: PostgreSQL, MySQL.

NoSQL databases are non-relational. They store data as documents, key-value pairs, graphs, or wide-columns. They have flexible schemas, scale horizontally (more machines), and sacrifice some consistency for availability and partition tolerance. Examples: MongoDB, Redis, DynamoDB.

When to choose:
- SQL: Complex relationships, financial data, strong consistency requirements.
- NoSQL: Rapid prototyping, unstructured data, massive scale, real-time analytics.`,
      code: `// SQL — rigid schema
CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100));

// NoSQL (MongoDB) — flexible schema
{ name: "Alice", email: "alice@example.com", anything: "goes" }` },
    { q: "What is connection pooling and why does it matter?", level: "Junior", color: D.green,
      a: `Opening a database connection is expensive. It requires TCP handshake, TLS negotiation, authentication, and memory allocation on the database server. This takes 50-100ms.

A connection pool maintains a set of reusable connections. When your app needs to query, it borrows a connection from the pool, runs the query, and returns it. The next request reuses the same connection.

Without pooling: 1000 requests = 1000 connection openings = 85 seconds of overhead.
With pooling (size 20): 1000 requests reuse 20 connections = negligible overhead.

Key settings: max (pool size), idleTimeoutMillis, connectionTimeoutMillis.`,
      code: `const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  database: 'myapp',
  max: 20,                    // max connections
  idleTimeoutMillis: 30000,   // close idle after 30s
  connectionTimeoutMillis: 2000
});

// Connection reused automatically
const result = await pool.query('SELECT * FROM users');` },
    { q: "Explain the cache-aside pattern with Redis.", level: "Mid", color: "#3b82f6",
      a: `Cache-aside (lazy loading) is the most common caching strategy:

1. Check cache first: Look up the data in Redis by key.
2. Cache hit: Return the cached data immediately.
3. Cache miss: Query the database for the data.
4. Populate cache: Store the result in Redis with a TTL.
5. Return data: Return the freshly fetched data.

Invalidation: When data is updated in the database, delete or update the corresponding cache key. Otherwise stale data will be served.

This pattern is simple and resilient. If Redis goes down, the app falls back to the database — slower, but functional.`,
      code: `async function getUser(id) {
  const key = \`user:\${id}\`;

  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached); // hit

  const user = await db.findUser(id);    // miss
  await redis.setEx(key, 300, JSON.stringify(user));
  return user;
}

async function updateUser(id, data) {
  await db.updateUser(id, data);
  await redis.del(\`user:\${id}\`); // invalidate
}` },
    { q: "What are database migrations and why are they important?", level: "Mid", color: "#3b82f6",
      a: `A database migration is a version-controlled script that changes your database schema. It is the Git of database structure.

Why they matter:
1. Reproducibility: Any developer can run migrations and get the exact same schema.
2. Team collaboration: Two developers changing the schema don't conflict — migrations are ordered and versioned.
3. Production safety: Migrations are reviewed, tested, and run automatically in CI/CD.
4. Rollbacks: Bad migration? Roll it back to the previous state.

Without migrations, developers manually modify databases, leading to "it works on my machine" bugs and production disasters.`,
      code: `// Prisma migration example
// 1. Edit schema.prisma
model User {
  id   Int    @id @default(autoincrement())
  name String
  role String @default("user")  // added this field
}

// 2. Generate migration
npx prisma migrate dev --name add_user_role

// 3. Apply to production
npx prisma migrate deploy` },
    { q: "How does MongoDB handle relationships compared to PostgreSQL?", level: "Mid", color: "#3b82f6",
      a: `PostgreSQL uses foreign keys and JOINs. Relationships are defined by IDs in separate tables. To fetch a user with their orders, you JOIN the users and orders tables. This is normalized — no data duplication, but requires multiple reads or JOINs.

MongoDB uses embedding and references. A user document can contain an array of order sub-documents (embedded). One read gets everything. Alternatively, orders can reference a user_id (denormalized references).

Embedding pros: Fast reads, atomic updates within the document.
Embedding cons: Large documents, harder to query embedded arrays, data duplication.

Reference pros: No duplication, flexible querying.
Reference cons: Multiple queries needed (no JOINs), no atomic multi-document transactions (before MongoDB 4.0).`,
      code: `// MongoDB — embedded (one read gets everything)
{
  name: "Alice",
  orders: [
    { product: "Laptop", price: 999 },
    { product: "Mouse", price: 29 }
  ]
}

// PostgreSQL — normalized (JOIN required)
-- users table: id, name
-- orders table: id, user_id, product, price
SELECT u.name, o.product, o.price
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE u.name = 'Alice';` },
    { q: "What is ACID and why is it important?", level: "Junior", color: D.green,
      a: `ACID is a set of properties that guarantee reliable database transactions:

Atomicity: A transaction is all-or-nothing. If a bank transfer debits one account but fails to credit another, the entire transaction rolls back. No partial changes.

Consistency: A transaction must leave the database in a valid state. All constraints, foreign keys, and triggers are satisfied after the transaction completes.

Isolation: Concurrent transactions don't interfere. If two users simultaneously read a balance of $1000 and try to withdraw $600, isolation ensures only one succeeds.

Durability: Once committed, a transaction survives forever — even if the server crashes the next millisecond. Data is written to disk (and usually replicated).

Without ACID, financial systems, inventory systems, and reservation systems would lose data and create impossible states.`,
      code: `// PostgreSQL transaction
const client = await pool.connect();
try {
  await client.query('BEGIN');
  await client.query('UPDATE accounts SET balance = balance - 100 WHERE id = 1');
  await client.query('UPDATE accounts SET balance = balance + 100 WHERE id = 2');
  await client.query('COMMIT');         // all changes persist
} catch (err) {
  await client.query('ROLLBACK');       // nothing changes
} finally {
  client.release();
}` },
  ];
  return (
    <div>
      <p style={para}>These questions cover database fundamentals, caching, connection pooling, and schema design. Know these for any backend interview.</p>
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
