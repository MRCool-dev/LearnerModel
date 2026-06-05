import { useState } from "react";
import { D, mono, serif, para } from "../../tokens";
import CodeBlock from "../primitives/CodeBlock";
import BigIdea from "../primitives/BigIdea";
import EasyBox from "../primitives/EasyBox";
import Tip from "../primitives/Tip";
import QuizCard from "../primitives/QuizCard";
import CaseStudy from "../primitives/CaseStudy";
import SqlQueryDemo from "../demos/SqlQueryDemo";

export default function SectionPostgreSQL() {
  const [tab, setTab] = useState("basics");
  const tabs = [
    { id: "basics", label: "📐 Basics" },
    { id: "joins", label: "🔗 JOINs" },
    { id: "advanced", label: "🚀 Advanced SQL" },
    { id: "indexes", label: "⚡ Indexes" },
    { id: "node", label: "🟢 Node.js" },
    { id: "perf", label: "📊 Performance" },
    { id: "demo", label: "🧪 Live Demo" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  const color = "#3b82f6";

  function buildFilter(filters) {
    const conditions = [];
    const values = [];
    let idx = 1;

    if (filters.email) {
      conditions.push(`email = $${idx++}`);
      values.push(filters.email);
    }
    if (filters.role) {
      conditions.push(`role = $${idx++}`);
      values.push(filters.role);
    }
    if (filters.minAge) {
      conditions.push(`age >= $${idx++}`);
      values.push(filters.minAge);
    }

    const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';
    return { where, values };
  }

  return (
    <div>
      <p style={para}>PostgreSQL is the gold standard of open-source relational databases. It is ACID-compliant, feature-rich, and handles complex queries better than any other database. At 2.5yr exp you're expected to know CTEs, window functions, indexes, and query optimization.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? color + "22" : "transparent", border: `1px solid ${tab === t.id ? color : D.outline}`, color: tab === t.id ? color : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "basics" && (
        <div>
          <CodeBlock label="SQL fundamentals" code={`-- Create table with constraints
CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(100) UNIQUE NOT NULL,
  age        INTEGER CHECK (age >= 0),
  role       VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user','admin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP                         -- soft delete
);

-- Insert single / multiple
INSERT INTO users (name, email, age) VALUES ('Alice', 'alice@example.com', 30);
INSERT INTO users (name, email) VALUES ('Bob', 'bob@example.com'), ('Carol', 'carol@example.com');

-- Query with filter, sort, paginate
SELECT name, email FROM users
WHERE age > 18 AND deleted_at IS NULL
ORDER BY created_at DESC
LIMIT 10 OFFSET 20;

-- Update
UPDATE users SET age = 31, updated_at = NOW() WHERE id = 1;

-- Soft delete
UPDATE users SET deleted_at = NOW() WHERE id = 1;

-- Aggregation
SELECT
  COUNT(*)          AS total,
  AVG(age)          AS avg_age,
  MIN(created_at)   AS first_joined,
  MAX(created_at)   AS last_joined
FROM users WHERE deleted_at IS NULL;`} />
          <EasyBox emoji="🔑" title="Data types you must know" color={color}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {[["SERIAL / BIGSERIAL", "Auto-increment integer PK"],["UUID", "Distributed-safe unique ID"],["VARCHAR(n) / TEXT", "String — TEXT has no limit"],["INTEGER / BIGINT", "Whole numbers"],["NUMERIC(p,s)", "Exact decimal (money!)"],["TIMESTAMP / TIMESTAMPTZ", "Time with/without timezone"],["BOOLEAN", "true / false"],["JSONB", "Queryable JSON column"]].map(([t, d], i) => (
                <div key={i} style={{ padding: "4px 8px", background: D.surface, borderRadius: 5 }}>
                  <div style={{ fontSize: 10, color, fontFamily: mono }}>{t}</div>
                  <div style={{ fontSize: 10, color: D.muted, fontFamily: serif }}>{d}</div>
                </div>
              ))}
            </div>
          </EasyBox>
          <Tip icon="🔑" color={D.yellow} title="SERIAL vs UUID">SERIAL auto-increments (1,2,3…). Use UUID (gen_random_uuid()) for distributed systems where multiple databases merge or IDs are exposed in URLs — sequential IDs are enumerable and predictable.</Tip>
        </div>
      )}
      {tab === "joins" && (
        <div>
          <CodeBlock label="all JOIN types" code={`-- INNER JOIN: only rows that match in BOTH tables
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN: ALL users, NULL if no matching order
SELECT u.name, o.total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- RIGHT JOIN: ALL orders, NULL if no matching user (rare)
SELECT u.name, o.total
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;

-- FULL OUTER JOIN: all rows from both, NULL where no match
SELECT u.name, o.total
FROM users u
FULL OUTER JOIN orders o ON u.id = o.user_id;

-- CROSS JOIN: every combination (Cartesian product)
SELECT u.name, p.name as plan
FROM users u CROSS JOIN plans p;

-- Self JOIN: join a table to itself
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-- Multiple JOINs
SELECT u.name, o.total, p.title
FROM users u
JOIN orders o     ON u.id = o.user_id
JOIN products p   ON o.product_id = p.id
WHERE o.total > 100
ORDER BY o.total DESC;`} />
          <EasyBox emoji="🔗" title="JOIN cheatsheet" color={color}>
            {[["INNER JOIN","Only matching rows — NULL rows excluded"],["LEFT JOIN","All left rows + matches from right (NULL if no match)"],["RIGHT JOIN","All right rows + matches from left (rare)"],["FULL OUTER JOIN","All rows from both, NULL where unmatched"],["CROSS JOIN","Every combination (n × m rows)"],["SELF JOIN","Table joined to itself — hierarchies, managers"]].map(([j, d], i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "3px 0", borderBottom: i < 5 ? `1px solid ${D.outline}` : "none" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color, fontFamily: mono, minWidth: 140 }}>{j}</span>
                <span style={{ fontSize: 11, color: D.muted, fontFamily: serif }}>{d}</span>
              </div>
            ))}
          </EasyBox>
          <Tip icon="💡" color={D.yellow} title="JOIN order doesn't affect results, but affects performance">The query planner decides the join order. But explicit LEFT vs INNER changes which rows appear. Never assume a LEFT JOIN equals an INNER JOIN — missing data is invisible with INNER.</Tip>
        </div>
      )}
      {tab === "advanced" && (
        <div>
          <BigIdea number="1" title="CTEs — Common Table Expressions" color={color}>CTEs (WITH clause) let you name a subquery and reference it like a table. They make complex queries readable and can be referenced multiple times. Recursive CTEs handle hierarchical data (org charts, file trees).</BigIdea>
          <CodeBlock label="CTE examples" code={`-- Basic CTE — readable subquery
WITH active_users AS (
  SELECT id, name, email
  FROM users
  WHERE deleted_at IS NULL AND last_login > NOW() - INTERVAL '30 days'
),
order_counts AS (
  SELECT user_id, COUNT(*) AS total_orders, SUM(amount) AS total_spent
  FROM orders
  GROUP BY user_id
)
SELECT u.name, u.email, o.total_orders, o.total_spent
FROM active_users u
LEFT JOIN order_counts o ON u.id = o.user_id
ORDER BY o.total_spent DESC NULLS LAST;

-- Recursive CTE — org chart (employee → manager)
WITH RECURSIVE org AS (
  -- base case: CEO (no manager)
  SELECT id, name, manager_id, 1 AS depth
  FROM employees WHERE manager_id IS NULL

  UNION ALL

  -- recursive: employees whose manager is in the CTE
  SELECT e.id, e.name, e.manager_id, o.depth + 1
  FROM employees e
  JOIN org o ON e.manager_id = o.id
)
SELECT * FROM org ORDER BY depth;`} />
          <BigIdea number="2" title="Window Functions — ranking without grouping" color="#8b5cf6">Window functions compute values across rows related to the current row WITHOUT collapsing them into a group. You keep all rows but add rank, running total, lag/lead, etc. This is a senior-level SQL skill that interviewers love.</BigIdea>
          <CodeBlock label="window functions" code={`-- ROW_NUMBER, RANK, DENSE_RANK
SELECT
  name,
  salary,
  department,
  ROW_NUMBER()  OVER (PARTITION BY department ORDER BY salary DESC) AS row_num,
  RANK()        OVER (PARTITION BY department ORDER BY salary DESC) AS rank,
  DENSE_RANK()  OVER (PARTITION BY department ORDER BY salary DESC) AS dense_rank
FROM employees;
-- RANK skips numbers after ties; DENSE_RANK does not

-- Running total
SELECT
  date,
  revenue,
  SUM(revenue) OVER (ORDER BY date) AS running_total
FROM daily_sales;

-- Moving average (last 7 days)
SELECT
  date,
  revenue,
  AVG(revenue) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS moving_avg_7d
FROM daily_sales;

-- LAG / LEAD — compare to previous/next row
SELECT
  date,
  revenue,
  LAG(revenue,  1) OVER (ORDER BY date) AS prev_day,
  LEAD(revenue, 1) OVER (ORDER BY date) AS next_day,
  revenue - LAG(revenue, 1) OVER (ORDER BY date) AS day_over_day_change
FROM daily_sales;

-- NTILE — split into buckets (quartiles, deciles)
SELECT name, salary,
  NTILE(4) OVER (ORDER BY salary) AS quartile
FROM employees;`} />
          <Tip icon="🎯" color="#8b5cf6" title="PARTITION BY vs GROUP BY">GROUP BY collapses rows — you lose individual row data. PARTITION BY in a window function keeps every row and just adds a column. Use GROUP BY when you want one row per group; use window functions when you want all rows with group context.</Tip>
          <CodeBlock label="JSONB — querying JSON columns" code={`-- Create table with JSONB
CREATE TABLE products (
  id      SERIAL PRIMARY KEY,
  name    TEXT,
  attrs   JSONB          -- queryable JSON
);

INSERT INTO products (name, attrs) VALUES
('Laptop', '{"brand":"Dell","ram":16,"tags":["work","portable"]}');

-- Query JSONB
SELECT name, attrs->>'brand' AS brand       -- text value
FROM products WHERE attrs->>'brand' = 'Dell';

SELECT name FROM products
WHERE attrs @> '{"ram": 16}';               -- contains

SELECT name FROM products
WHERE attrs->'tags' ? 'portable';           -- array contains element

-- Index JSONB for fast queries
CREATE INDEX idx_products_attrs ON products USING GIN(attrs);`} />
        </div>
      )}
      {tab === "indexes" && (
        <div>
          <EasyBox emoji="⚡" title="PostgreSQL Index Types" color={color}>PostgreSQL supports multiple index types. B-tree is the default and handles most cases. Choosing the wrong index type wastes space and doesn't speed up queries.</EasyBox>
          <CodeBlock label="index types and creation" code={`-- B-tree (default) — =, <, >, BETWEEN, ORDER BY, LIKE 'prefix%'
CREATE INDEX idx_users_email ON users(email);

-- Composite index — left-prefix rule applies
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at DESC);
-- This index helps: WHERE user_id = 1
-- This index helps: WHERE user_id = 1 AND created_at > ...
-- This does NOT help: WHERE created_at > ... (no user_id filter)

-- Partial index — only index rows that match a condition
CREATE INDEX idx_active_users ON users(email) WHERE deleted_at IS NULL;

-- Unique index
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);

-- GIN index — JSONB, arrays, full-text search
CREATE INDEX idx_products_attrs ON products USING GIN(attrs);
CREATE INDEX idx_posts_fts ON posts USING GIN(to_tsvector('english', title || ' ' || content));

-- GiST index — geometric data, range types, full-text
CREATE INDEX idx_events_range ON events USING GIST(daterange);

-- BRIN index — very large tables with natural sort order (time-series)
CREATE INDEX idx_logs_created ON logs USING BRIN(created_at);

-- Check if query uses index
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'alice@example.com';`} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "10px 0" }}>
            <div style={{ padding: "10px 12px", background: D.green + "0a", border: `1px solid ${D.green}33`, borderRadius: 7 }}>
              <div style={{ fontSize: 10, color: D.green, fontFamily: mono, marginBottom: 6 }}>✅ INDEX THESE</div>
              {["Foreign keys (user_id, order_id)", "WHERE / JOIN / ORDER BY columns", "Columns in UNIQUE constraints", "JSONB columns queried with @> or ?", "High-cardinality columns (email, UUID)"].map((x, i) => <div key={i} style={{ fontSize: 11, color: D.muted, fontFamily: serif, padding: "2px 0" }}>• {x}</div>)}
            </div>
            <div style={{ padding: "10px 12px", background: D.red + "0a", border: `1px solid ${D.red}33`, borderRadius: 7 }}>
              <div style={{ fontSize: 10, color: D.red, fontFamily: mono, marginBottom: 6 }}>⚠️ AVOID / WATCH</div>
              {["Low-cardinality (boolean, status with 2 values)", "Over-indexing slows INSERT/UPDATE/DELETE", "Unused indexes waste disk space", "Wrong index type (B-tree on JSONB)","Violating left-prefix rule on composites"].map((x, i) => <div key={i} style={{ fontSize: 11, color: D.muted, fontFamily: serif, padding: "2px 0" }}>• {x}</div>)}
            </div>
          </div>
        </div>
      )}
      {tab === "node" && (
        <div>
          <CodeBlock label="pg driver with Pool" code={`const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Parameterized query — prevents SQL injection
const { rows } = await pool.query(
  'SELECT * FROM users WHERE email = $1 AND age > $2',
  ['alice@example.com', 18]
);

// Named query with multiple params
const { rows: orders } = await pool.query(
  'SELECT * FROM orders WHERE user_id = $1 AND status = $2 ORDER BY created_at DESC LIMIT $3',
  [userId, 'completed', 10]
);`} />
          <CodeBlock label="transaction with error handling" code={`async function transferMoney(fromId, toId, amount) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { rows } = await client.query(
      'SELECT balance FROM accounts WHERE id = $1 FOR UPDATE',
      [fromId]
    );
    if (rows[0].balance < amount) throw new Error('Insufficient funds');

    await client.query(
      'UPDATE accounts SET balance = balance - $1 WHERE id = $2',
      [amount, fromId]
    );
    await client.query(
      'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
      [amount, toId]
    );

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release(); // ALWAYS release!
  }
}`} />
          <Tip icon="⚠️" color={D.red} title="NEVER concatenate SQL">{"SELECT * FROM users WHERE email = '${email}'"} is vulnerable to SQL injection. Always use parameterized queries ($1, $2). The pg driver handles escaping — you never need to sanitize manually.</Tip>
          <CodeBlock label="helper — query builder pattern" code={`// Build dynamic WHERE clauses safely
function buildFilter(filters) {
  const conditions = [];
  const values = [];
  let idx = 1;

  if (filters.email) {
    conditions.push(\`email = $\${idx++}\`);
    values.push(filters.email);
  }
  if (filters.role) {
    conditions.push(\`role = $\${idx++}\`);
    values.push(filters.role);
  }
  if (filters.minAge) {
    conditions.push(\`age >= $\${idx++}\`);
    values.push(filters.minAge);
  }

  const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';
  return { where, values };
}

const { where, values } = buildFilter({ role: 'admin', minAge: 25 });
const { rows } = await pool.query(\`SELECT * FROM users \${where}\`, values);`} />
        </div>
      )}
      {tab === "perf" && (
        <div>
          <EasyBox emoji="📊" title="Query Performance — EXPLAIN ANALYZE" color={color}>EXPLAIN shows the query plan PostgreSQL will use. EXPLAIN ANALYZE actually runs it and shows real timings. Always use this before adding indexes or optimizing slow queries.</EasyBox>
          <CodeBlock label="reading EXPLAIN ANALYZE output" code={`EXPLAIN ANALYZE
SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id;

-- Output to look for:
-- Seq Scan   → no index used (bad for large tables)
-- Index Scan → index used (good)
-- Bitmap Heap Scan → index used for range (ok)
-- Hash Join vs Nested Loop vs Merge Join → join strategy

-- Key metrics:
-- actual time=X..Y  → X = startup, Y = total ms
-- rows=N           → actual rows processed
-- loops=N          → how many times this node ran`} />
          <CodeBlock label="common performance fixes" code={`-- 1. Missing index on foreign key
-- Symptom: Seq Scan on a large table in a JOIN
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- 2. SELECT * fetches unused columns — use explicit columns
-- Bad:
SELECT * FROM orders JOIN users ON orders.user_id = users.id;
-- Good:
SELECT o.id, o.total, u.name FROM orders o JOIN users u ON o.user_id = u.id;

-- 3. COUNT(*) is fast in PostgreSQL (uses index)
-- COUNT(column) skips NULLs — use COUNT(*) unless you need to skip NULLs

-- 4. LIMIT without ORDER BY is non-deterministic
-- Always ORDER BY when using LIMIT for pagination

-- 5. N+1 — fix with JOIN instead of multiple queries
-- Bad: query user then query each user's orders in a loop
-- Good:
SELECT u.name, array_agg(o.id) AS order_ids
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id;

-- 6. VACUUM ANALYZE — update statistics after bulk changes
VACUUM ANALYZE users;`} />
          <CaseStudy title="Slow pagination at scale" color={color} scenario="Page 500 of results takes 30 seconds" problem="LIMIT 10 OFFSET 5000 scans and discards 5000 rows — gets slower as offset grows" solution="Cursor-based pagination using the last seen id">
            <CodeBlock label="keyset / cursor pagination" code={`-- Bad: OFFSET pagination (slows down at high pages)
SELECT * FROM posts ORDER BY created_at DESC LIMIT 10 OFFSET 5000;

-- Good: Cursor-based (constant speed regardless of page)
-- First page:
SELECT * FROM posts ORDER BY created_at DESC, id DESC LIMIT 10;

-- Next page — pass last row's (created_at, id) as cursor:
SELECT * FROM posts
WHERE (created_at, id) < ('2024-03-15 10:00:00', 1234)
ORDER BY created_at DESC, id DESC
LIMIT 10;`} />
          </CaseStudy>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What does SQL stand for?" options={["Structured Query Language", "Simple Query Language", "System Query Logic", "Schema Query Language"]} correct={0} explain="SQL = Structured Query Language. It is the standard language for interacting with relational databases." />
          <QuizCard question="Which JOIN returns only rows that exist in BOTH tables?" options={["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL JOIN"]} correct={2} explain="INNER JOIN returns only rows where the join condition matches in both tables. LEFT JOIN returns all rows from the left table regardless of matches." />
          <QuizCard question="Why use parameterized queries ($1, $2)?" options={["They are faster", "They prevent SQL injection", "They look cleaner", "They support more data types"]} correct={1} explain="Parameterized queries separate code from data. The database treats parameters as data, not executable code, preventing attackers from injecting malicious SQL." />
          <QuizCard question="What does a CTE (WITH clause) do?" options={["Creates a permanent table", "Names a subquery for use within the same statement", "Caches query results permanently", "Defines a stored procedure"]} correct={1} explain="A CTE (Common Table Expression) names a subquery that you can reference within the same SELECT, INSERT, UPDATE, or DELETE. It improves readability and can be referenced multiple times." />
          <QuizCard question="What is the difference between RANK() and DENSE_RANK()?" options={["RANK is faster", "DENSE_RANK skips numbers after ties, RANK does not", "RANK skips numbers after ties, DENSE_RANK does not", "They are identical"]} correct={2} explain="If two rows tie for rank 2, RANK() gives both rank 2 and skips rank 3 (next is rank 4). DENSE_RANK() gives both rank 2 and the next row is rank 3 — no gaps." />
          <QuizCard question="Why is OFFSET pagination slow at scale?" options={["It uses too much RAM", "PostgreSQL must scan and discard all skipped rows", "It does not work with indexes", "It creates a full table lock"]} correct={1} explain="OFFSET N tells PostgreSQL to find N rows and discard them. At OFFSET 10000 the database physically scans 10000 rows to throw them away. Cursor-based pagination avoids this — it jumps directly to the last seen row using an index." />
        </div>
      )}
      {tab === "demo" && <SqlQueryDemo />}
    </div>
  );
}
