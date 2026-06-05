import { useState } from "react";
import { D, mono, serif, para } from "../../tokens";
import CodeBlock from "../primitives/CodeBlock";
import EasyBox from "../primitives/EasyBox";
import Tip from "../primitives/Tip";
import QuizCard from "../primitives/QuizCard";
import CaseStudy from "../primitives/CaseStudy";
import RedisCacheDemo from "../demos/RedisCacheDemo";

export default function SectionRedis() {
  const [tab, setTab] = useState("usecases");
  const tabs = [
    { id: "usecases", label: "🎯 Use Cases" },
    { id: "commands", label: "⌨️ Commands" },
    { id: "caching", label: "💾 Caching" },
    { id: "ratelimit", label: "🚦 Rate Limiting" },
    { id: "pubsub", label: "📡 Pub/Sub" },
    { id: "patterns", label: "🏗️ Patterns" },
    { id: "demo", label: "🧪 Live Demo" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  const color = "#f43f5e";
  return (
    <div>
      <p style={para}>Redis is an in-memory data structure store used as a database, cache, message broker, and streaming engine. It is incredibly fast because everything lives in RAM. At 2.5yr exp you're expected to know caching strategies, rate limiting, Pub/Sub, and distributed locking.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? color + "22" : "transparent", border: `1px solid ${tab === t.id ? color : D.outline}`, color: tab === t.id ? color : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "usecases" && (
        <div>
          {[
            { title: "Session storage", color: "#f43f5e", icon: "🔑", desc: "Store user login sessions in Redis with TTL. When a user logs out or the session expires, Redis automatically removes it. Far faster than querying a DB on every request." },
            { title: "API response caching", color: "#f59e0b", icon: "⚡", desc: "Cache expensive DB query results. A complex report that takes 2s to generate from PostgreSQL can be served from Redis in 2ms — a 1000x improvement." },
            { title: "Rate limiting", color: "#3b82f6", icon: "🚦", desc: "Track request counts per IP/user using Redis INCR + EXPIRE. Block clients that exceed limits. Redis's atomic INCR makes this race-condition-free." },
            { title: "Real-time leaderboards", color: "#8b5cf6", icon: "🏆", desc: "Redis Sorted Sets (ZADD/ZRANGE) maintain ranked order automatically. Add scores in O(log n), fetch top N in O(log n + m). Perfect for games, dashboards." },
            { title: "Pub/Sub + real-time events", color: "#14b8a6", icon: "📡", desc: "Redis Pub/Sub broadcasts messages to all subscribers instantly. Power WebSocket notifications, chat systems, and live dashboards across multiple server instances." },
            { title: "Distributed locking", color: "#ec4899", icon: "🔒", desc: "RedLock algorithm prevents race conditions across multiple servers. When two instances try to send the same email or process the same job, a Redis lock ensures only one proceeds." },
            { title: "Job queues", color: "#f59e0b", icon: "📬", desc: "Redis Lists (LPUSH/BRPOP) or Redis Streams power background job queues. Libraries like Bull/BullMQ use Redis to queue emails, image processing, and webhooks." },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 8, padding: "11px 14px", background: item.color + "08", border: `1px solid ${item.color}25`, borderRadius: 9 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: mono, marginBottom: 5 }}>{item.icon} {item.title}</div>
              <p style={{ ...para, marginBottom: 0, fontSize: 12 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      )}
      {tab === "commands" && (
        <div>
          <CodeBlock label="Redis data types & commands" code={`# ── STRINGS ───────────────────────────────────────────────
SET  user:1 '{"name":"Alice"}'
GET  user:1
SETEX session:abc 3600 'token_value'   # set + expiry in one command
INCR page:views                         # atomic counter (thread-safe)
INCRBY counter 5
EXPIRE key 600                          # set expiry on existing key
TTL  key                                # check remaining seconds (-1 = no TTL)

# ── HASHES ────────────────────────────────────────────────
HSET  user:1 name Alice email alice@x.com age 30
HGET  user:1 name
HMGET user:1 name email
HGETALL user:1
HDEL  user:1 age
HINCRBY user:1 loginCount 1

# ── LISTS ─────────────────────────────────────────────────
LPUSH queue:emails 'job1' 'job2'        # push to left (head)
RPUSH queue:emails 'job3'               # push to right (tail)
LPOP  queue:emails                      # pop from left
RPOP  queue:emails                      # pop from right
BRPOP queue:emails 0                    # blocking pop (wait for item)
LLEN  queue:emails                      # list length
LRANGE queue:emails 0 -1               # all items

# ── SETS ──────────────────────────────────────────────────
SADD    online:users 'alice' 'bob'
SREM    online:users 'alice'
SMEMBERS online:users
SISMEMBER online:users 'bob'           # O(1) membership check
SCARD   online:users                   # count
SUNION  set1 set2                       # union of sets

# ── SORTED SETS ───────────────────────────────────────────
ZADD  leaderboard 1500 'Alice'
ZADD  leaderboard 2300 'Bob'
ZINCRBY leaderboard 200 'Alice'        # increment score
ZRANGE leaderboard 0 2 WITHSCORES     # lowest to highest
ZREVRANGE leaderboard 0 2 WITHSCORES  # highest to lowest (top 3)
ZRANK leaderboard 'Alice'             # rank (0-based)
ZSCORE leaderboard 'Alice'            # get score`} />
          <Tip icon="💡" color={D.yellow} title="Key naming convention">Use colon-separated namespaces: user:1, session:abc, rate:ip:192.168.1.1, cache:posts:page:2. This keeps keys organized and makes bulk operations (SCAN, DEL by pattern) predictable.</Tip>
        </div>
      )}
      {tab === "caching" && (
        <div>
          <EasyBox emoji="💾" title="Caching strategies" color={color}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                ["Cache-Aside (Lazy)", "App checks cache first. Miss → query DB → populate cache. Most common. App controls cache.", "#f59e0b"],
                ["Write-Through", "Write to cache AND DB simultaneously. Cache always fresh. Doubles write latency.", "#3b82f6"],
                ["Write-Behind (Write-Back)", "Write to cache immediately, async flush to DB later. Fast writes, risk of data loss.", "#8b5cf6"],
                ["Read-Through", "Cache sits in front of DB. Cache automatically fetches from DB on miss. Less app code.", "#14b8a6"],
              ].map(([name, desc, c], i) => (
                <div key={i} style={{ padding: "7px 10px", background: c + "0d", border: `1px solid ${c}33`, borderRadius: 6 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: c, fontFamily: mono }}>{name}</div>
                  <div style={{ fontSize: 11, color: D.muted, fontFamily: serif }}>{desc}</div>
                </div>
              ))}
            </div>
          </EasyBox>
          <CodeBlock label="cache-aside pattern — full implementation" code={`const { createClient } = require('redis');
const client = createClient({ url: process.env.REDIS_URL });
await client.connect();

async function getUser(id) {
  const key = \`user:\${id}\`;

  // 1. Try cache
  const cached = await client.get(key);
  if (cached) return JSON.parse(cached);  // cache hit

  // 2. Cache miss — hit DB
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return null;

  // 3. Populate cache — 5 min TTL
  await client.setEx(key, 300, JSON.stringify(user));
  return user;
}

// Invalidate on write
async function updateUser(id, data) {
  const user = await prisma.user.update({ where: { id }, data });
  await client.del(\`user:\${id}\`);    // bust cache
  return user;
}

// Cache list with shorter TTL
async function getTopPosts(page) {
  const key = \`posts:top:page:\${page}\`;
  const cached = await client.get(key);
  if (cached) return JSON.parse(cached);

  const posts = await prisma.post.findMany({ orderBy: { views: 'desc' }, take: 10, skip: page * 10 });
  await client.setEx(key, 60, JSON.stringify(posts)); // 1 min — list changes often
  return posts;
}`} />
          <Tip icon="⚠️" color="#f43f5e" title="Cache stampede">When a popular cache key expires, hundreds of requests all miss simultaneously and all hit the DB. Fix with probabilistic early expiry or a distributed lock that allows only one request to refresh the cache while others wait.</Tip>
        </div>
      )}
      {tab === "ratelimit" && (
        <div>
          <EasyBox emoji="🚦" title="Rate Limiting with Redis" color="#3b82f6">Redis INCR is atomic — guaranteed no race conditions even across multiple server instances. This is why Redis is the standard tool for distributed rate limiting.</EasyBox>
          <CodeBlock label="sliding window rate limiter" code={`// Fixed window: allow 100 requests per minute per IP
async function rateLimitFixed(ip) {
  const key = \`rate:\${ip}:\${Math.floor(Date.now() / 60000)}\`; // window key per minute
  const count = await client.incr(key);
  if (count === 1) await client.expire(key, 60);  // set TTL on first request
  return count <= 100;  // true = allowed, false = blocked
}

// Sliding window: more accurate, uses Sorted Set
async function rateLimitSliding(ip, limit = 100, windowMs = 60000) {
  const now = Date.now();
  const key = \`rate:sliding:\${ip}\`;

  const [, , count] = await client
    .multi()
    .zRemRangeByScore(key, 0, now - windowMs)  // remove old requests
    .zAdd(key, { score: now, value: \`\${now}\` }) // add current request
    .zCard(key)                                  // count in window
    .expire(key, Math.ceil(windowMs / 1000))     // auto-cleanup
    .exec();

  return count <= limit;
}

// Express middleware
async function rateLimitMiddleware(req, res, next) {
  const allowed = await rateLimitSliding(req.ip);
  if (!allowed) {
    return res.status(429).json({ error: 'Too many requests. Try again in a minute.' });
  }
  next();
}`} />
          <Tip icon="🎯" color={D.yellow} title="Libraries that handle this for you">express-rate-limit + rate-limit-redis does all of this automatically. In production, prefer a battle-tested library over rolling your own rate limiter.</Tip>
        </div>
      )}
      {tab === "pubsub" && (
        <div>
          <EasyBox emoji="📡" title="Redis Pub/Sub" color="#14b8a6">Pub/Sub decouples publishers (senders) from subscribers (receivers). A publisher sends to a channel without knowing who is listening. All subscribers on that channel receive the message instantly. Perfect for broadcasting events across multiple server instances.</EasyBox>
          <CodeBlock label="pub/sub with node-redis" code={`// publisher.js — sends events
const publisher = createClient({ url: process.env.REDIS_URL });
await publisher.connect();

await publisher.publish('notifications', JSON.stringify({
  type: 'NEW_MESSAGE',
  userId: 'user:123',
  message: 'You have a new message from Alice',
  timestamp: Date.now()
}));

// subscriber.js — listens to events
const subscriber = createClient({ url: process.env.REDIS_URL });
await subscriber.connect();

await subscriber.subscribe('notifications', (message) => {
  const event = JSON.parse(message);
  console.log('Received:', event);
  // Broadcast to WebSocket clients, send push notification, etc.
});

// Pattern subscribe — listen to multiple channels
await subscriber.pSubscribe('user:*', (message, channel) => {
  console.log(\`Event on \${channel}:\`, message);
});`} />
          <Tip icon="⚠️" color="#f43f5e" title="Pub/Sub limitations">Redis Pub/Sub is fire-and-forget. If a subscriber is offline when a message is published, the message is LOST. For reliable message delivery (guaranteed processing), use Redis Streams or BullMQ instead of plain Pub/Sub.</Tip>
          <CodeBlock label="BullMQ — production job queue" code={`const { Queue, Worker } = require('bullmq');

// Producer — add jobs to queue
const emailQueue = new Queue('emails', { connection: { host: 'localhost', port: 6379 } });

await emailQueue.add('welcome', { to: 'alice@example.com', name: 'Alice' });
await emailQueue.add('reset-password', { to: 'bob@example.com', token: 'abc123' }, {
  delay: 5000,    // send after 5 seconds
  attempts: 3,    // retry up to 3 times on failure
  backoff: { type: 'exponential', delay: 1000 }
});

// Worker — process jobs
const worker = new Worker('emails', async (job) => {
  if (job.name === 'welcome') {
    await sendWelcomeEmail(job.data);
  }
}, { connection: { host: 'localhost', port: 6379 } });`} />
        </div>
      )}
      {tab === "patterns" && (
        <div>
          <CaseStudy title="Distributed Lock (RedLock)" color="#ec4899" scenario="Two servers try to send the same notification simultaneously" problem="Without locking, both servers send duplicate emails or process the same job twice" solution="Acquire a Redis lock before processing — only one server holds the lock at a time">
            <CodeBlock label="distributed lock pattern" code={`async function withLock(key, ttlMs, fn) {
  const lockKey = \`lock:\${key}\`;
  const lockVal = crypto.randomUUID(); // unique value to identify our lock

  // Try to acquire lock (NX = only set if not exists)
  const acquired = await client.set(lockKey, lockVal, { NX: true, PX: ttlMs });
  if (!acquired) throw new Error('Could not acquire lock — another process is running');

  try {
    return await fn(); // do the work
  } finally {
    // Only release if we still own the lock (Lua script = atomic)
    const script = \`
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else return 0 end\`;
    await client.eval(script, { keys: [lockKey], arguments: [lockVal] });
  }
}

// Usage
await withLock(\`invoice:\${invoiceId}\`, 5000, async () => {
  await generateAndSendInvoice(invoiceId);
});`} />
          </CaseStudy>
          <CaseStudy title="Session Store" color="#f43f5e" scenario="Stateless JWT alternative with revocability" problem="JWTs cannot be revoked before expiry — logout doesn't actually log out" solution="Store session in Redis with TTL; delete key on logout = instant revocation">
            <CodeBlock label="session management" code={`// On login
const sessionId = crypto.randomUUID();
await client.setEx(
  \`session:\${sessionId}\`,
  86400,                                  // 24h TTL
  JSON.stringify({ userId: user.id, role: user.role })
);
res.cookie('sessionId', sessionId, { httpOnly: true, secure: true });

// On each request (middleware)
async function requireAuth(req, res, next) {
  const sessionId = req.cookies.sessionId;
  const session = await client.get(\`session:\${sessionId}\`);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });
  req.user = JSON.parse(session);
  // Slide the TTL — reset to 24h on activity
  await client.expire(\`session:\${sessionId}\`, 86400);
  next();
}

// On logout — instant revocation
await client.del(\`session:\${req.cookies.sessionId}\`);`} />
          </CaseStudy>
          <Tip icon="🎤" color="#ec4899" title="Interview: Redis vs in-memory (Node.js Map/object)">Say: 'Node.js memory is per-process. With multiple servers or PM2 cluster mode, each process has its own memory — sessions stored in one process are invisible to others. Redis is shared across all instances, making it essential for any stateful operation in a multi-server environment.'</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="Why is Redis so fast compared to a database?" options={["It uses a faster programming language", "All data lives in RAM — no disk I/O", "It compresses all data", "It has fewer features"]} correct={1} explain="Redis stores everything in RAM. RAM access is ~100,000x faster than SSD disk access. That's why Redis handles millions of operations per second with sub-millisecond latency." />
          <QuizCard question="What happens if you don't set TTL on cache keys?" options={["Nothing — Redis handles it", "Memory fills up until Redis crashes or evicts data", "Keys automatically expire in 1 hour", "Data becomes corrupted"]} correct={1} explain="Without TTL, cache keys accumulate forever. Redis runs out of RAM and either crashes or starts evicting random keys based on the eviction policy. Always set expiries on cache keys." />
          <QuizCard question="Which Redis data structure is best for a leaderboard?" options={["List", "Hash", "Sorted Set", "String"]} correct={2} explain="Sorted Sets (ZADD, ZRANGE) maintain elements in ranked order by score automatically. Add/update scores in O(log n), fetch top N in O(log n + m). Perfect for leaderboards." />
          <QuizCard question="Why use Redis for rate limiting instead of in-memory counters?" options={["Redis is faster than memory", "Redis INCR is atomic and shared across all server instances", "In-memory counters don't support numbers", "Redis counters never reset"]} correct={1} explain="In-memory counters are per-process — 10 server instances each have their own counter, so a client can make 10x the limit. Redis INCR is atomic and shared across all instances, making rate limiting accurate in a distributed environment." />
          <QuizCard question="What is the key limitation of Redis Pub/Sub?" options={["It only supports one subscriber", "Messages are lost if subscriber is offline — fire-and-forget", "It requires a separate Redis instance", "It only works with strings"]} correct={1} explain="Redis Pub/Sub is fire-and-forget. If a subscriber disconnects, any messages published while it's offline are permanently lost. For reliable delivery with retries, use Redis Streams or BullMQ." />
          <QuizCard question="Why store sessions in Redis instead of JWT alone?" options={["Redis is more secure than JWT signing", "Redis sessions can be instantly revoked; JWTs cannot be invalidated before expiry", "Redis uses less bandwidth", "JWTs cannot store user data"]} correct={1} explain="A signed JWT is valid until it expires — you can't 'un-sign' it. Storing sessions in Redis means logout = delete the key. The next request finds no session and is rejected immediately. This solves the JWT revocation problem." />
        </div>
      )}
      {tab === "demo" && <RedisCacheDemo />}
    </div>
  );
}
