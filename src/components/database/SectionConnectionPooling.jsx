import { useState } from "react";
import { D, mono, serif, para } from "../../tokens";
import CodeBlock from "../primitives/CodeBlock";
import BigIdea from "../primitives/BigIdea";
import EasyBox from "../primitives/EasyBox";
import Tip from "../primitives/Tip";
import QuizCard from "../primitives/QuizCard";
import PoolDemo from "../demos/PoolDemo";

export default function SectionConnectionPooling() {
  const [tab, setTab] = useState("concept");
  const tabs = [
    { id: "concept", label: "🧠 Concept" },
    { id: "config", label: "⚙️ Config" },
    { id: "sizing", label: "📐 Pool Sizing" },
    { id: "pgbouncer", label: "🏗️ PgBouncer" },
    { id: "demo", label: "🧪 Live Demo" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Opening a database connection is expensive. It requires TCP handshake, authentication, and memory allocation. Connection pools reuse connections to eliminate this overhead.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#06b6d422" : "transparent", border: `1px solid ${tab === t.id ? "#06b6d4" : D.outline}`, color: tab === t.id ? "#06b6d4" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "concept" && (
        <div>
          <BigIdea number="1" title="Creating connections is slow" color="#f59e0b">A database connection requires: TCP handshake (~20ms), TLS negotiation (~50ms), authentication query (~10ms), and memory allocation on the database server (~5ms). That's ~85ms before you run a single query. With a pool, you pay this cost once and reuse the connection.</BigIdea>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
            <div style={{ flex: 1, minWidth: 160, padding: "12px 14px", background: D.red + "08", border: `1px solid ${D.red}22`, borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: D.red, fontFamily: mono, marginBottom: 6 }}>❌ WITHOUT POOLING</div>
              <div style={{ fontSize: 11, color: D.muted, fontFamily: serif, lineHeight: 1.7 }}>
                Request 1: Open → Query → Close (85ms + 5ms)<br/>
                Request 2: Open → Query → Close (85ms + 5ms)<br/>
                Request 3: Open → Query → Close (85ms + 5ms)<br/>
                <strong>Total: 270ms for 3 queries</strong><br/>
                Max concurrent: ~100 (DB connection limit)
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 160, padding: "12px 14px", background: D.greenBg, border: `1px solid ${D.green}22`, borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: D.greenText, fontFamily: mono, marginBottom: 6 }}>✅ WITH POOLING</div>
              <div style={{ fontSize: 11, color: D.muted, fontFamily: serif, lineHeight: 1.7 }}>
                Startup: Open 10 connections (850ms once)<br/>
                Request 1: Reuse → Query (5ms)<br/>
                Request 2: Reuse → Query (5ms)<br/>
                Request 3: Reuse → Query (5ms)<br/>
                <strong>Total: 15ms for 3 queries</strong><br/>
                Max concurrent: thousands (queue + reuse)
              </div>
            </div>
          </div>
          <EasyBox emoji="🎯" title="The math" color="#06b6d4">A pool of 20 connections can serve thousands of requests per second. How? Most requests take milliseconds. One connection handles 50+ requests/second. 20 connections × 50 = 1,000 requests/second.</EasyBox>
        </div>
      )}
      {tab === "config" && (
        <div>
          <CodeBlock label="PostgreSQL pool (pg)" code={`const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'myapp',
  user: 'postgres',
  password: 'secret',
  port: 5432,

  // Pool settings
  max: 20,                    // maximum connections in pool
  idleTimeoutMillis: 30000,   // close idle connections after 30s
  connectionTimeoutMillis: 2000, // fail if no connection available in 2s
});

// Query — pool auto-manages connections
const result = await pool.query('SELECT * FROM users');

// For transactions, explicitly acquire and release
const client = await pool.connect();
try {
  await client.query('BEGIN');
  // ... queries ...
  await client.query('COMMIT');
} finally {
  client.release(); // ALWAYS release back to pool!
}`} />
          <CodeBlock label="Mongoose connection pooling" code={`await mongoose.connect('mongodb://localhost:27017/myapp', {
  maxPoolSize: 20,        // default: 100
  minPoolSize: 5,         // keep at least 5 connections ready
  serverSelectionTimeoutMS: 5000,
});

// Mongoose handles pooling automatically
// No need to manually release connections`} />
          <Tip icon="⚠️" color={D.red} title="Always release">If you acquire a connection from the pool for a transaction, you MUST call `client.release()` in a finally block. Otherwise the connection leaks and the pool eventually empties — all requests start failing.</Tip>
        </div>
      )}
      {tab === "sizing" && (
        <div>
          <EasyBox emoji="📐" title="How big should your pool be?" color="#06b6d4">The famous Hikari (Java) formula: pool size = (core_count × 2) + effective_spindle_count. For most Node.js apps on modern cloud: 10-20 connections is the sweet spot. Bigger is NOT always better.</EasyBox>
          <BigIdea number="1" title="More connections ≠ more throughput" color="#f43f5e">PostgreSQL creates one OS process per connection. 500 connections = 500 processes consuming RAM, context switching, and competing for CPU. Throughput peaks around 100-300 connections for most workloads and then degrades. PgBouncer solves this at the infrastructure level.</BigIdea>
          <CodeBlock label="finding the right pool size" code={`// Formula starting point:
// pool_size = num_cores * 2 + 1
// On a 4-core server: pool_size = 9

// But also consider:
// - How many Node.js processes? (PM2 cluster × pool_size = total DB connections)
// - What is your DB server's max_connections? (default PostgreSQL = 100)
// - 10 PM2 workers × 20 pool = 200 connections — you'd exhaust the DB!

// Safe calculation:
const totalConnections = pm2Workers * poolMax;
// Must be < DB max_connections (default 100 in PostgreSQL)

// Example: 4 PM2 workers, DB max = 100
// Pool max per worker = (100 - 5 reserved) / 4 ≈ 23

// Monitor pool health
pool.on('connect', () => console.log('New connection created'));
pool.on('error', (err) => console.error('Pool error:', err));
pool.on('remove', () => console.log('Connection removed from pool'));`} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "10px 0" }}>
            <div style={{ padding: "10px 12px", background: "#f59e0b0a", border: "1px solid #f59e0b33", borderRadius: 7 }}>
              <div style={{ fontSize: 10, color: "#f59e0b", fontFamily: mono, marginBottom: 6 }}>⚠️ POOL TOO SMALL</div>
              {["Requests queue up waiting for connections", "connectionTimeoutMillis errors under load", "Throughput limited below server capacity", "High latency spikes during traffic bursts"].map((x, i) => <div key={i} style={{ fontSize: 11, color: D.muted, fontFamily: serif, padding: "2px 0" }}>• {x}</div>)}
            </div>
            <div style={{ padding: "10px 12px", background: D.red + "0a", border: `1px solid ${D.red}33`, borderRadius: 7 }}>
              <div style={{ fontSize: 10, color: D.red, fontFamily: mono, marginBottom: 6 }}>⚠️ POOL TOO LARGE</div>
              {["PostgreSQL context switching overhead", "DB RAM exhausted by connection overhead", "Can exceed DB max_connections limit", "Increased GC pressure in Node.js"].map((x, i) => <div key={i} style={{ fontSize: 11, color: D.muted, fontFamily: serif, padding: "2px 0" }}>• {x}</div>)}
            </div>
          </div>
          <Tip icon="🎯" color="#06b6d4" title="Production defaults to start with">pg pool: max=20, idleTimeout=30s, connectionTimeout=2s. Mongoose: maxPoolSize=20, minPoolSize=5. Tune based on EXPLAIN ANALYZE query times, not guesswork. Use pg_stat_activity to observe real connection usage.</Tip>
        </div>
      )}
      {tab === "pgbouncer" && (
        <div>
          <EasyBox emoji="🏗️" title="PgBouncer — connection pooler at the infrastructure level" color="#8b5cf6">PgBouncer sits between your app and PostgreSQL. Your app thinks it's connecting to Postgres, but it's actually connecting to PgBouncer. PgBouncer maintains a small pool of real PostgreSQL connections and multiplexes thousands of app connections onto them.</EasyBox>
          <BigIdea number="1" title="Why PgBouncer?" color="#8b5cf6">In serverless (Lambda, Vercel) or microservices, each function instance opens its own pool. 1000 Lambda invocations × 10 connections = 10,000 DB connections — PostgreSQL crashes. PgBouncer caps real connections to whatever PostgreSQL can handle (e.g., 100) regardless of how many app instances connect.</BigIdea>
          <CodeBlock label="PgBouncer modes" code={`# pgbouncer.ini
[pgbouncer]
pool_mode = transaction   # recommended for most apps
max_client_conn = 10000   # app connections PgBouncer accepts
default_pool_size = 25    # real PostgreSQL connections per database

# Pool modes:
# session    — one PG connection per client session (least efficient)
# transaction — connection released after each transaction ✅ RECOMMENDED
# statement   — connection released after each statement (most efficient but restrictive)

# In transaction mode:
# 10,000 app connections → 25 real PostgreSQL connections
# App must not use: SET, LISTEN, NOTIFY, WITH HOLD CURSORS`} />
          <CodeBlock label="connecting through PgBouncer in Node.js" code={`// App code is identical — just change the host/port
const pool = new Pool({
  host: 'localhost',
  port: 6432,        // PgBouncer port (not 5432)
  database: 'myapp',
  user: 'app_user',
  password: 'secret',
  max: 10,           // pool per app instance (PgBouncer handles the real limit)
});

// Prisma with PgBouncer
// DATABASE_URL="postgresql://user:pass@localhost:6432/myapp?pgbouncer=true&connection_limit=10"
// The ?pgbouncer=true disables prepared statements (not supported in transaction mode)`} />
          <Tip icon="🎤" color="#ec4899" title="Interview: when would you use PgBouncer?">Say: 'In a serverless environment (AWS Lambda, Vercel) where each function invocation can create its own DB connections. Without PgBouncer, 500 concurrent Lambda calls could open 5000 connections and crash PostgreSQL. PgBouncer sits in front and limits real connections to a safe number while handling all the app connections.'</Tip>
        </div>
      )}
      {tab === "demo" && <PoolDemo />}
      {tab === "quiz" && (
        <div>
          <QuizCard question="Why is opening a database connection expensive?" options={["It uses a lot of CPU", "TCP handshake + TLS + auth + memory allocation (~50-100ms)", "It requires reading from disk", "It blocks the event loop"]} correct={1} explain="Each connection requires TCP handshake, TLS negotiation, authentication, and server-side memory allocation. This takes 50-100ms — an eternity for a web request. Pools pay this cost once." />
          <QuizCard question="What happens if you forget client.release() after a transaction?" options={["Nothing — the pool auto-releases", "The connection leaks — pool eventually empties and all requests fail", "The transaction auto-commits", "The query runs twice"]} correct={1} explain="Failing to release a connection removes it from the pool permanently. After enough leaks, the pool has zero available connections and every new request times out with connectionTimeoutMillis." />
          <QuizCard question="How many requests can a 20-connection pool handle per second?" options={["Exactly 20", "About 50-100", "Thousands per second", "It depends on the database size"]} correct={2} explain="A single connection handles 50+ requests/second (each query ~1-5ms). 20 connections × 50 = 1,000+ requests/second. The pool queues excess requests and serves them as connections free up." />
          <QuizCard question="Why does increasing pool size beyond a point reduce performance?" options={["It fills up RAM", "PostgreSQL creates one OS process per connection — too many causes context switching overhead", "Node.js can't handle more than 20 connections", "More connections disable indexing"]} correct={1} explain="PostgreSQL is process-based — each connection is an OS process. At hundreds of connections, the OS spends more time switching between processes than running queries. Throughput peaks and then degrades. PgBouncer solves this by multiplexing." />
          <QuizCard question="What problem does PgBouncer solve in serverless environments?" options={["It speeds up individual queries", "It prevents thousands of Lambda invocations from each opening DB connections and overwhelming PostgreSQL", "It replicates data across regions", "It caches query results"]} correct={1} explain="Each serverless function invocation can open its own connections. Without PgBouncer, 1000 Lambda calls × 10 connections = 10,000 DB connections. PgBouncer sits in front and limits real PostgreSQL connections to a safe number (e.g., 25) regardless of how many app instances connect." />
        </div>
      )}
    </div>
  );
}
