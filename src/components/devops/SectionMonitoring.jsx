import { useState } from "react";
import { D, mono, serif, para } from "../../tokens";
import CodeBlock from "../primitives/CodeBlock";
import Tip from "../primitives/Tip";
import EasyBox from "../primitives/EasyBox";
import BigIdea from "../primitives/BigIdea";
import QuizCard from "../primitives/QuizCard";

export default function SectionMonitoring() {
  const [tab, setTab] = useState("health");
  const tabs = [
    { id: "health", label: "❤️ Health Checks" },
    { id: "logs", label: "📝 Logging" },
    { id: "metrics", label: "📊 Metrics" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>You cannot fix what you cannot see. Monitoring tells you when things break before your users do.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#f43f5e22" : "transparent", border: `1px solid ${tab === t.id ? "#f43f5e" : D.outline}`, color: tab === t.id ? "#f43f5e" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "health" && (
        <div>
          <CodeBlock label="health check endpoint" code={`app.get('/health', async (req, res) => {
  const checks = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    database: await checkDatabase(),
    redis: await checkRedis()
  };

  const healthy = checks.database && checks.redis;

  res.status(healthy ? 200 : 503)
     .json(checks);
});

async function checkDatabase() {
  try {
    await db.query('SELECT 1');
    return true;
  } catch {
    return false;
  }
}`} />
          <BigIdea number="1" title="Health checks save you" color={D.green}>Load balancers and orchestrators (Kubernetes, AWS ELB) use health checks to know if a server is healthy. If /health returns 503, traffic is routed away from that server automatically. Without health checks, failed servers keep receiving traffic.</BigIdea>
          <Tip icon="🎯" color={D.yellow} title="Check dependencies">A good health check verifies not just that the app is running, but that its dependencies (database, cache, external APIs) are accessible. An app that cannot reach its database is not healthy.</Tip>
        </div>
      )}
      {tab === "logs" && (
        <div>
          <CodeBlock label="structured logging with winston" code={`const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

// Usage
logger.info('User logged in', { userId: 123, ip: '1.2.3.4' });
logger.error('Payment failed', { error: err.message, orderId: 456 });
logger.warn('Rate limit approaching', { ip: '1.2.3.4', count: 95 });`} />
          <EasyBox emoji="📝" title="Structured logs are searchable" color="#f43f5e">`console.log('error')` is useless in production. `logger.error('Payment failed', {'{ orderId: 456, userId: 123 }'})` lets you search logs by orderId, filter by severity, and build dashboards. Always use structured (JSON) logging in production.</EasyBox>
        </div>
      )}
      {tab === "metrics" && (
        <div>
          <CodeBlock label="key metrics to track" code={`// Request count
app.use((req, res, next) => {
  metrics.increment('http.requests', {
    method: req.method,
    route: req.route?.path,
    status: res.statusCode
  });
  next();
});

// Response time
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    metrics.timing('http.response_time', Date.now() - start);
  });
  next();
});

// Error rate
app.use((err, req, res, next) => {
  metrics.increment('http.errors', { type: err.name });
  next(err);
});`} />
          {[
            { metric: "Error rate", why: "Spike = something broke" },
            { metric: "Response time (p95/p99)", why: "Slow = users leave" },
            { metric: "Throughput (req/s)", why: "Drop = traffic problem or crash" },
            { metric: "CPU / Memory", why: "High = scale up or optimize" },
            { metric: "Database query time", why: "Slow = missing index or N+1" },
          ].map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "6px 10px", background: D.surface, border: `1px solid ${D.outline}`, borderRadius: 5, marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#f43f5e", fontFamily: mono, minWidth: 160 }}>{m.metric}</span>
              <span style={{ fontSize: 11, color: D.muted, fontFamily: serif }}>{m.why}</span>
            </div>
          ))}
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What should a health check endpoint verify?" options={["Only that the app is running", "That the app AND its dependencies are healthy", "That the database is empty", "That there are no users logged in"]} correct={1} explain="A good health check verifies the app and all critical dependencies (database, cache, external APIs). An app that cannot reach its database should return 503, not 200." />
          <QuizCard question="Why use structured (JSON) logging?" options={["It looks prettier", "It enables searching, filtering, and dashboard building", "It is required by law", "It prevents errors"]} correct={1} explain="JSON logs are machine-readable. You can search by field, filter by severity, and feed them into tools like ELK, Datadog, or CloudWatch for analysis and alerting." />
          <QuizCard question="What does p95 response time mean?" options={["The average response time", "95% of requests are faster than this value", "The slowest request", "The fastest request"]} correct={1} explain="p95 (95th percentile) means 95% of requests are faster than this value. It is more meaningful than average because it ignores outliers and shows the real user experience." />
        </div>
      )}
    </div>
  );
}
