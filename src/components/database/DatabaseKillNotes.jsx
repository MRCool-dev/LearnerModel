import { D, mono, serif, para } from "../../tokens";

export default function DatabaseKillNotes() {
  const groups = [
    { title: "SQL vs NoSQL", color: "#3b82f6", icon: "🔀", kills: ["SQL = tables, rows, rigid schema, ACID, vertical scaling.", "NoSQL = documents/key-value/graph, flexible schema, horizontal scaling.", "Use SQL for complex relationships and strong consistency.", "Use NoSQL for rapid development and unstructured data.", "PostgreSQL is the gold standard of open-source SQL databases.", "MongoDB is the most popular document database."] },
    { title: "MongoDB & Mongoose", color: "#14b8a6", icon: "🍃", kills: ["MongoDB stores JSON-like documents in collections.", "Mongoose adds schemas, validation, middleware, and query building.", "Embed data read together; reference data shared across documents.", "findOne(), find(), create(), updateOne(), deleteOne() are core methods.", "Query operators: $eq, $gt, $gte, $lt, $in, $regex, $or, $and.", "Mongoose middleware: pre('save'), post('remove'), etc."] },
    { title: "PostgreSQL", color: "#3b82f6", icon: "🐘", kills: ["PostgreSQL is ACID-compliant, feature-rich, and open-source.", "Always use parameterized queries ($1, $2) to prevent SQL injection.", "JOINs: INNER (matches only), LEFT (all left + matches), FULL (union).", "Use Pool from 'pg' for connection management in Node.js.", "Transactions: BEGIN → queries → COMMIT/ROLLBACK.", "SERIAL for auto-increment; UUID for distributed systems."] },
    { title: "Prisma", color: "#8b5cf6", icon: "🔷", kills: ["Prisma uses schema.prisma to define models and relations declaratively.", "Generates type-safe client from schema — catches errors at compile time.", "prisma migrate dev creates versioned migrations.", "prisma generate updates the client after schema changes.", "$transaction runs multiple operations atomically.", "Supports PostgreSQL, MySQL, SQLite, SQL Server, and MongoDB."] },
    { title: "Redis", color: "#f43f5e", icon: "🔴", kills: ["Redis is an in-memory key-value store — ~100,000x faster than disk.", "Common uses: sessions, API caching, rate limiting, leaderboards, pub/sub.", "Always set TTL (EXPIRE/SETEX) on cache keys to prevent memory exhaustion.", "Cache-aside pattern: check cache → miss? query DB → store in cache.", "Invalidate cache on update: del(key) after writing to the database.", "Data types: String, Hash, List, Set, Sorted Set, Stream, Bitmap."] },
    { title: "Connection Pooling", color: "#06b6d4", icon: "🏊", kills: ["Opening a DB connection costs 50-100ms (TCP + auth + alloc).", "Pools reuse connections — reducing per-query overhead to ~1-5ms.", "Default pg Pool max = 10. Mongoose default max = 100.", "Always release pooled connections in a finally block.", "idleTimeoutMillis closes unused connections to save memory.", "connectionTimeoutMillis prevents requests from waiting forever."] },
  ];
  return (
    <div>
      <p style={para}>The precise facts that matter most — for building data layers, for debugging, for interviews.</p>
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
