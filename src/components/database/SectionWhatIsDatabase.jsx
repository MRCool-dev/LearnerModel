import { useState } from "react";
import { D, mono, serif, para } from "../../tokens";
import BigIdea from "../primitives/BigIdea";
import EasyBox from "../primitives/EasyBox";
import Tip from "../primitives/Tip";
import QuizCard from "../primitives/QuizCard";
import CaseStudy from "../primitives/CaseStudy";
import CodeBlock from "../primitives/CodeBlock";

export default function SectionWhatIsDatabase() {
  const [tab, setTab] = useState("story");
  const tabs = [
    { id: "story", label: "📖 The Story" },
    { id: "sql-nosql", label: "🔀 SQL vs NoSQL" },
    { id: "acid", label: "🔒 ACID" },
    { id: "indexing", label: "⚡ Indexing" },
    { id: "normalization", label: "📐 Normalization" },
    { id: "transactions", label: "💳 Transactions" },
    { id: "cap", label: "🌐 CAP Theorem" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Every real application needs a database. Without one, your data vanishes when the server restarts. Understanding databases is what separates toy projects from production software.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#3b82f622" : "transparent", border: `1px solid ${tab === t.id ? "#3b82f6" : D.outline}`, color: tab === t.id ? "#3b82f6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "story" && (
        <div>
          <BigIdea number="1" title="Memory is temporary" color={D.red}>When your Node.js server restarts, everything in RAM is wiped. Variables, arrays, objects — all gone. A database is persistent storage: data survives restarts, crashes, and deployments.</BigIdea>
          <BigIdea number="2" title="Files don't scale" color="#f59e0b">You could store data in JSON files. But what happens when two users write at the same time? What happens when the file is 10GB? Files lack concurrency control, indexing, and query languages. Databases solve all of this.</BigIdea>
          <BigIdea number="3" title="The database is the source of truth" color="#3b82f6">In any application, the database is the single source of truth. Your API reads from it, your background jobs write to it, your analytics query it. Everything else — caches, frontend state, message queues — are derived from the database.</BigIdea>
          <EasyBox emoji="🎯" title="One sentence" color="#3b82f6"><strong>A database is organized, persistent storage</strong> with built-in tools for querying, concurrency, and reliability. An ORM (Object-Relational Mapper) or ODM (Object-Document Mapper) lets you interact with the database using code objects instead of raw SQL or queries.</EasyBox>
          <EasyBox emoji="🗂️" title="Types of databases you'll encounter" color="#8b5cf6">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 8, marginTop: 6 }}>
              {[
                { type: "Relational", ex: "PostgreSQL, MySQL", color: "#3b82f6", use: "Structured data, complex queries" },
                { type: "Document", ex: "MongoDB, CouchDB", color: "#14b8a6", use: "Flexible schemas, nested data" },
                { type: "Key-Value", ex: "Redis, DynamoDB", color: "#f43f5e", use: "Caching, sessions, leaderboards" },
                { type: "Time-Series", ex: "InfluxDB, TimescaleDB", color: "#f59e0b", use: "Metrics, logs, IoT events" },
                { type: "Graph", ex: "Neo4j, Amazon Neptune", color: "#8b5cf6", use: "Social graphs, recommendations" },
                { type: "Search", ex: "Elasticsearch, Typesense", color: "#ec4899", use: "Full-text search, faceting" },
              ].map((db, i) => (
                <div key={i} style={{ padding: "8px 10px", background: db.color + "0d", border: `1px solid ${db.color}33`, borderRadius: 6 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: db.color, fontFamily: mono }}>{db.type}</div>
                  <div style={{ fontSize: 10, color: D.muted, fontFamily: mono, margin: "3px 0" }}>{db.ex}</div>
                  <div style={{ fontSize: 10, color: D.muted, fontFamily: serif, lineHeight: 1.5 }}>{db.use}</div>
                </div>
              ))}
            </div>
          </EasyBox>
        </div>
      )}
      {tab === "sql-nosql" && (
        <div>
          <div style={{ overflowX: "auto", marginBottom: 14 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: mono, fontSize: 11 }}>
              <thead><tr>{["Feature", "SQL (PostgreSQL)", "NoSQL (MongoDB)"].map((h, i) => (
                <th key={i} style={{ padding: "9px 12px", background: D.surface, color: [D.muted, "#3b82f6", "#14b8a6"][i], textAlign: "left", borderBottom: `1px solid ${D.outline}`, fontSize: 10 }}>{h}</th>
              ))}</tr></thead>
              <tbody>
                {[["Structure", "Tables, rows, columns", "Collections, documents, fields"],["Schema", "Rigid — defined upfront", "Flexible — dynamic"],["Relationships", "Foreign keys, JOINs", "Embedded docs, references"],["Scaling", "Vertical (bigger machine)", "Horizontal (more machines)"],["Transactions", "Full ACID support", "Limited (MongoDB 4.0+ has multi-doc)"],["Query language", "SQL — standardized", "Driver-specific API or MQL"],["Best for", "Complex queries, transactions", "Rapid dev, unstructured data"],["Examples", "PostgreSQL, MySQL, SQLite", "MongoDB, Redis, DynamoDB"]].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : D.surface + "06" }}>
                    {row.map((cell, j) => <td key={j} style={{ padding: "8px 12px", borderBottom: `1px solid ${D.outline}`, color: j === 0 ? D.text : D.muted }}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Tip icon="🎯" color={D.yellow} title="When to choose what">Use <strong>SQL</strong> when data is structured, relationships are complex, and you need strong consistency (banks, e-commerce). Use <strong>NoSQL</strong> when schemas evolve rapidly, you need horizontal scaling, or data is document-like (CMS, IoT, real-time analytics).</Tip>
          <CaseStudy title="Real scenario: social media app" color="#3b82f6" scenario="You're designing the data layer" problem="Users, posts, likes, comments, follows — which DB?" solution="Hybrid: PostgreSQL for users/auth/billing, Redis for feed caching, Elasticsearch for search">
            <Tip icon="💡" color="#3b82f6" title="Polyglot persistence">Production apps routinely use 3+ different database types. Each database is chosen for what it's best at. This is called polyglot persistence — use the right tool for the right job.</Tip>
          </CaseStudy>
        </div>
      )}
      {tab === "acid" && (
        <div>
          <BigIdea number="1" title="ACID = reliability" color="#f43f5e">ACID is a set of properties that guarantee reliable processing of database transactions. Without ACID, a payment could debit one account without crediting another — money vanishes into thin air.</BigIdea>
          {[
            { letter: "A", word: "Atomicity", color: "#f43f5e", desc: "A transaction is all-or-nothing. If any part fails, the entire transaction rolls back. Transfer $100: debit AND credit both happen, or neither happens." },
            { letter: "C", word: "Consistency", color: "#f59e0b", desc: "A transaction brings the database from one valid state to another. Constraints, triggers, and cascades are enforced. You cannot create an order for a non-existent customer." },
            { letter: "I", word: "Isolation", color: "#3b82f6", desc: "Concurrent transactions don't interfere with each other. If Alice and Bob both read a bank balance of $1000 and try to withdraw $600, isolation prevents both from succeeding." },
            { letter: "D", word: "Durability", color: D.green, desc: "Once a transaction commits, it survives forever — even if the server crashes immediately after. Data is written to disk (and often replicated)." },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 8, alignItems: "flex-start" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: item.color + "22", border: `1px solid ${item.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, color: item.color, fontFamily: mono, flexShrink: 0 }}>{item.letter}</div>
              <div style={{ flex: 1, padding: "7px 11px", background: item.color + "08", border: `1px solid ${item.color}22`, borderRadius: 7 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: mono, marginBottom: 3 }}>{item.word}</div>
                <div style={{ fontSize: 12, color: D.muted, fontFamily: serif, lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            </div>
          ))}
          <Tip icon="⚠️" color="#f59e0b" title="Isolation levels — what interviewers love to ask">There are 4 isolation levels: Read Uncommitted → Read Committed → Repeatable Read → Serializable. Higher isolation = fewer anomalies but slower throughput. PostgreSQL defaults to Read Committed. Most apps never need to change this — but you should know it exists.</Tip>
        </div>
      )}
      {tab === "indexing" && (
        <div>
          <EasyBox emoji="📚" title="What is an index?" color="#3b82f6">An index is a separate data structure (usually a B-tree) that the database maintains alongside your table. It maps column values to row locations — like a book's index maps terms to page numbers. Without an index, the database scans <em>every row</em> (full table scan) to find matches.</EasyBox>
          <BigIdea number="1" title="Full table scan vs index scan" color="#f43f5e">Without index on email: SELECT * FROM users WHERE email = 'a@b.com' scans all 10 million rows. With an index: the DB does a B-tree lookup in O(log n) — milliseconds instead of seconds.</BigIdea>
          <CodeBlock label="creating indexes in PostgreSQL" code={`-- Single column index (most common)
CREATE INDEX idx_users_email ON users(email);

-- Composite index — order matters! Matches (status), (status, created_at)
CREATE INDEX idx_orders_status_date ON orders(status, created_at DESC);

-- Unique index — enforces uniqueness + speeds lookups
CREATE UNIQUE INDEX idx_users_username ON users(username);

-- Partial index — only indexes rows matching a condition
CREATE INDEX idx_active_users ON users(email) WHERE deleted_at IS NULL;

-- Check if your query uses the index
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'alice@example.com';`} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "12px 0" }}>
            <div style={{ padding: "10px 12px", background: D.green + "0a", border: `1px solid ${D.green}33`, borderRadius: 7 }}>
              <div style={{ fontSize: 10, color: D.green, fontFamily: mono, marginBottom: 6 }}>✅ INDEX THESE</div>
              {["Foreign key columns (user_id, order_id)", "Columns in WHERE, ORDER BY, GROUP BY", "Columns used in JOIN conditions", "High-cardinality columns (email, UUID)"].map((x, i) => <div key={i} style={{ fontSize: 11, color: D.muted, fontFamily: serif, padding: "2px 0" }}>• {x}</div>)}
            </div>
            <div style={{ padding: "10px 12px", background: D.red + "0a", border: `1px solid ${D.red}33`, borderRadius: 7 }}>
              <div style={{ fontSize: 10, color: D.red, fontFamily: mono, marginBottom: 6 }}>❌ AVOID INDEXING</div>
              {["Low-cardinality columns (boolean, gender)", "Columns rarely queried", "Tiny tables (full scan is faster)", "Too many indexes slow down writes"].map((x, i) => <div key={i} style={{ fontSize: 11, color: D.muted, fontFamily: serif, padding: "2px 0" }}>• {x}</div>)}
            </div>
          </div>
          <Tip icon="🎯" color="#3b82f6" title="The N+1 query problem">If you fetch 100 posts and then query each post's author separately, that's 101 queries — the N+1 problem. Fix it with JOIN or Mongoose's .populate(). Indexes help individual queries but can't fix architectural inefficiency.</Tip>
        </div>
      )}
      {tab === "normalization" && (
        <div>
          <EasyBox emoji="📐" title="What is normalization?" color="#8b5cf6">Normalization is the process of organizing data to reduce redundancy and improve integrity. You split data into multiple related tables. The goal: store each piece of information exactly once. Denormalization is the deliberate reversal — storing redundant data to gain read performance.</EasyBox>
          <BigIdea number="1" title="1NF — Atomic values" color="#3b82f6">Every column must hold a single, indivisible value. No arrays in a cell. No "Alice, Bob" in one column. Each row must be unique (primary key).</BigIdea>
          <BigIdea number="2" title="2NF — No partial dependencies" color="#8b5cf6">Every non-key column must depend on the entire primary key — not just part of it. Applies when you have a composite primary key. If order_item depends on order_id alone (not product_id), move it out.</BigIdea>
          <BigIdea number="3" title="3NF — No transitive dependencies" color="#14b8a6">Non-key columns must not depend on other non-key columns. If city depends on zip_code and zip_code is not the primary key, move city+zip_code to a separate table.</BigIdea>
          <CodeBlock label="denormalized → normalized" code={`-- ❌ DENORMALIZED — redundant author data duplicated per post
posts: | id | title          | author_name | author_email      |
       | 1  | "Node Basics"  | Alice       | alice@example.com |
       | 2  | "React Hooks"  | Alice       | alice@example.com |

-- ✅ NORMALIZED — author stored once, referenced by id
users: | id | name  | email             |
       | 1  | Alice | alice@example.com |

posts: | id | title          | user_id |
       | 1  | "Node Basics"  | 1       |
       | 2  | "React Hooks"  | 1       |`} />
          <Tip icon="⚖️" color="#f59e0b" title="Normalize vs denormalize in production">Normalize for write-heavy systems (fewer places to update). Denormalize for read-heavy systems (avoid expensive JOINs). Analytics databases (data warehouses) are intentionally denormalized — reads vastly outnumber writes.</Tip>
        </div>
      )}
      {tab === "transactions" && (
        <div>
          <EasyBox emoji="💳" title="What is a transaction?" color="#14b8a6">A transaction is a sequence of database operations that are treated as a single unit. Either all operations succeed (COMMIT) or all are undone (ROLLBACK). Critical for anything involving money, inventory, or user accounts.</EasyBox>
          <CodeBlock label="transaction in Node.js with pg" code={`const { Pool } = require('pg');
const pool = new Pool();

async function transferMoney(fromId, toId, amount) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Debit sender
    const { rows } = await client.query(
      'SELECT balance FROM accounts WHERE id = $1 FOR UPDATE',
      [fromId]
    );
    if (rows[0].balance < amount) throw new Error('Insufficient funds');

    await client.query(
      'UPDATE accounts SET balance = balance - $1 WHERE id = $2',
      [amount, fromId]
    );

    // Credit receiver
    await client.query(
      'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
      [amount, toId]
    );

    await client.query('COMMIT');
    console.log('Transfer complete');
  } catch (err) {
    await client.query('ROLLBACK');  // undo everything
    throw err;
  } finally {
    client.release();
  }
}`} />
          <Tip icon="🔒" color="#3b82f6" title="FOR UPDATE — optimistic vs pessimistic locking">FOR UPDATE locks the selected rows for the duration of the transaction (pessimistic locking). Prevents two transactions from modifying the same row simultaneously. Alternative: optimistic locking uses a version column — check-and-update without locks, retry on conflict.</Tip>
          <EasyBox emoji="⚠️" title="Savepoints — partial rollback" color="#f59e0b">
            <CodeBlock label="savepoint example" code={`await client.query('BEGIN');
await client.query('INSERT INTO logs ...');
await client.query('SAVEPOINT before_payment');
try {
  await client.query('UPDATE accounts ...');
  await client.query('COMMIT');
} catch (err) {
  await client.query('ROLLBACK TO before_payment'); // keeps the log insert
  await client.query('COMMIT');
}`} />
          </EasyBox>
        </div>
      )}
      {tab === "cap" && (
        <div>
          <EasyBox emoji="🌐" title="CAP Theorem" color="#8b5cf6">In a distributed system, you can only guarantee 2 of these 3 properties simultaneously: <strong>Consistency</strong> (every read gets the latest write), <strong>Availability</strong> (every request gets a response), <strong>Partition Tolerance</strong> (system works despite network failures). Since network partitions always happen in distributed systems, you're really choosing between CP and AP.</EasyBox>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10, margin: "12px 0" }}>
            {[
              { label: "CP — Consistency + Partition Tolerance", ex: "PostgreSQL, MongoDB (in replica set)", color: "#3b82f6", desc: "System may become unavailable during a partition but will never return stale data. Bank transactions need this." },
              { label: "AP — Availability + Partition Tolerance", ex: "Cassandra, DynamoDB, CouchDB", color: "#14b8a6", desc: "System stays available during partitions but may return stale data. Shopping cart, social feeds can tolerate this." },
              { label: "CA — Consistency + Availability", ex: "Single-node RDBMS (no distribution)", color: "#f59e0b", desc: "Only possible without network partitions — i.e., a single server. Not practical at scale." },
            ].map((item, i) => (
              <div key={i} style={{ padding: "10px 12px", background: item.color + "0d", border: `1px solid ${item.color}33`, borderRadius: 7 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: item.color, fontFamily: mono, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 10, color: D.green, fontFamily: mono, marginBottom: 5 }}>{item.ex}</div>
                <div style={{ fontSize: 11, color: D.muted, fontFamily: serif, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
          <BigIdea number="1" title="Eventual consistency" color="#8b5cf6">AP systems use eventual consistency — all replicas will converge to the same value given enough time. When you post on Instagram and your friend doesn't see it for 2 seconds, that's eventual consistency. For most social/content apps, this is completely acceptable.</BigIdea>
          <Tip icon="🎤" color="#ec4899" title="How to answer CAP in an interview">Don't memorize definitions. Say: 'Partition tolerance is non-negotiable in any distributed system. So the real choice is consistency vs availability under a partition. For financial data I'd choose CP; for user activity feeds I'd choose AP and accept eventual consistency.'</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What happens to in-memory data when a Node.js server restarts?" options={["It is saved to disk automatically", "It is wiped — everything in RAM is lost", "It persists in the V8 engine", "It moves to the event loop"]} correct={1} explain="RAM is volatile. When the process restarts, all variables, arrays, and objects are destroyed. Only persistent storage (databases, files) survives." />
          <QuizCard question="Which database type uses tables with rows and columns?" options={["NoSQL", "Document DB", "SQL", "Key-value store"]} correct={2} explain="SQL databases (PostgreSQL, MySQL) use tables with predefined schemas, rows, and columns. NoSQL databases use documents, key-value pairs, or graphs." />
          <QuizCard question="What does the 'A' in ACID stand for?" options={["Availability", "Atomicity", "Aggregation", "Asynchronous"]} correct={1} explain="Atomicity means a transaction is all-or-nothing. Either every operation in the transaction succeeds, or the entire transaction is rolled back." />
          <QuizCard question="What data structure do most database indexes use internally?" options={["Hash map", "Linked list", "B-tree", "Binary search tree"]} correct={2} explain="Most relational databases use B-trees for indexes. B-trees keep data sorted and allow O(log n) lookups, inserts, and deletes. PostgreSQL also supports hash indexes for equality-only lookups." />
          <QuizCard question="In the CAP theorem, what does 'P' stand for?" options={["Performance", "Persistence", "Partition Tolerance", "Primary Key"]} correct={2} explain="Partition Tolerance means the system continues to operate even when network messages between nodes are lost or delayed. Since network partitions are unavoidable in distributed systems, P is always required — making the real trade-off CP vs AP." />
          <QuizCard question="Which isolation problem does 'Repeatable Read' prevent?" options={["Dirty reads and non-repeatable reads", "Only dirty reads", "Only phantom reads", "All isolation problems"]} correct={0} explain="Repeatable Read prevents dirty reads (reading uncommitted data) and non-repeatable reads (same row returns different values in the same transaction). It does NOT prevent phantom reads (new rows appearing in range queries). Serializable prevents all three." />
        </div>
      )}
    </div>
  );
}
