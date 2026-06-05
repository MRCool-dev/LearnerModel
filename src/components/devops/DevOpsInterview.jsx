import { useState } from "react";
import { D, mono, serif, para } from "../../tokens";
import CodeBlock from "../primitives/CodeBlock";

export default function DevOpsInterview() {
  const [open, setOpen] = useState(null);
  const qs = [
    { q: "What is Docker and why is it useful?", level: "Junior", color: D.green,
      a: `Docker is a platform for developing, shipping, and running applications in containers. A container packages your application code together with all its dependencies (Node.js version, system libraries, environment variables) into a single, portable unit.

Why it is useful:
1. Consistency: A Docker container runs identically on your Mac, in CI, and on the production Linux server. No more "it works on my machine."
2. Isolation: Each container runs independently without interfering with others.
3. Portability: Build once, run anywhere that supports Docker.
4. Efficiency: Containers share the host OS kernel, making them much lighter than virtual machines.
5. Scalability: Easy to spin up multiple container instances behind a load balancer.`,
      code: `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
USER node
EXPOSE 3000
CMD ["node", "server.js"]` },
    { q: "What is the difference between pm2 restart and pm2 reload?", level: "Mid", color: "#3b82f6",
      a: `pm2 restart stops the process and starts a new one. This causes downtime — active requests are dropped. Use it for configuration changes that require a hard reset.

pm2 reload performs a zero-downtime restart. It starts new processes alongside the old ones, waits for the new processes to be ready, then swaps traffic over and shuts down the old processes. Active requests finish on the old processes while new requests go to the new processes.

In production, always use reload for code deployments. Only use restart when absolutely necessary.`,
      code: `pm2 start server.js -i max     # start with cluster mode
pm2 reload api                  # zero-downtime restart ✅
pm2 restart api                 # hard restart (downtime) ⚠️` },
    { q: "Why should nginx sit in front of a Node.js application?", level: "Mid", color: "#3b82f6",
      a: `nginx is a high-performance web server and reverse proxy written in C. It handles several tasks more efficiently than Node.js:

1. SSL/TLS termination: nginx handles HTTPS encryption/decryption, freeing Node.js from this CPU-intensive work.
2. Static file serving: nginx serves images, CSS, and JS directly from disk using sendfile — zero Node.js involvement.
3. Reverse proxying: nginx forwards API requests to Node.js and passes back responses.
4. Load balancing: nginx distributes requests across multiple Node.js processes (PM2 cluster).
5. Compression: nginx can gzip responses, reducing bandwidth.
6. Security: nginx adds a layer between the open internet and your Node.js process, blocking malicious requests.

Without nginx, Node.js handles all of this itself — wasting event loop cycles on tasks it is not optimized for.`,
      code: `server {
    listen 443 ssl;
    server_name api.example.com;

    ssl_certificate /etc/letsencrypt/...;

    location /static/ {
        alias /var/www/static/;   # nginx serves static files
        expires 30d;
    }

    location / {
        proxy_pass http://localhost:3000;  # proxy to Node.js
        proxy_set_header Host $host;
    }
}` },
    { q: "Explain CI/CD and why it matters.", level: "Junior", color: D.green,
      a: `CI/CD stands for Continuous Integration / Continuous Deployment.

Continuous Integration means every time a developer pushes code, automated tests run automatically. If tests fail, the developer is notified immediately. This catches bugs early before they reach production.

Continuous Deployment means every passing build is automatically deployed to production. No manual SSH, no git pull, no human steps. The pipeline handles everything.

Why it matters:
1. Speed: Deploy multiple times per day instead of once per week.
2. Safety: Automated tests act as a safety net. Bad code never reaches production.
3. Consistency: Every deployment follows the exact same steps. No human error.
4. Rollback: If a deployment breaks, rollback to the previous version in seconds.

Tools: GitHub Actions, GitLab CI, CircleCI, Jenkins, Travis CI.`,
      code: `.github/workflows/deploy.yml

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: ssh server "cd /app && git pull && pm2 reload api"` },
    { q: "What is a health check and why is it important?", level: "Mid", color: "#3b82f6",
      a: `A health check is an endpoint (usually /health) that reports whether an application and its dependencies are functioning correctly.

A good health check verifies:
1. The application process is running
2. The database is reachable and responding
3. The cache (Redis) is accessible
4. Critical external services are available

Why it is important:
- Load balancers use health checks to route traffic only to healthy servers
- Container orchestrators (Kubernetes) restart unhealthy containers
- Monitoring systems alert when health checks fail
- Deployment pipelines verify the new version is healthy before completing

A health check that only returns 200 OK without checking dependencies is dangerous — it tells the load balancer the server is fine when it might be unable to serve requests.`,
      code: `app.get('/health', async (req, res) => {
  const dbHealthy = await checkDatabase();
  const redisHealthy = await checkRedis();
  const healthy = dbHealthy && redisHealthy;

  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'ok' : 'degraded',
    database: dbHealthy,
    redis: redisHealthy,
    uptime: process.uptime()
  });
});` },
    { q: "What is the difference between blue-green and canary deployment?", level: "Senior", color: "#8b5cf6",
      a: `Blue-green deployment maintains two identical production environments: Blue (currently live) and Green (idle). You deploy the new version to Green, run smoke tests, then instantly switch all traffic from Blue to Green. If something breaks, you switch back to Blue instantly.

Pros: Zero downtime, instant rollback, simple.
Cons: Requires double the infrastructure (two full environments).

Canary deployment rolls out the new version to a small percentage of users first — say 5%. You monitor error rates and performance metrics. If everything looks good, you gradually increase to 25%, 50%, and finally 100%. If errors spike at 5%, you roll back only that small group.

Pros: Minimal risk, real-user validation at small scale, no need for double infrastructure.
Cons: More complex to implement, requires sophisticated monitoring and traffic routing.

Blue-green is simpler and better for smaller teams. Canary is safer and better for large-scale applications with millions of users.`,
      code: `// Blue-green: switch traffic instantly
// Load balancer config
upstream backend {
    server green:3000;  // switch from blue to green
}

// Canary: route 5% of users to new version
if ($cookie_canary = "1") {
    proxy_pass http://new-version:3000;
}
proxy_pass http://old-version:3000;` },
  ];
  return (
    <div>
      <p style={para}>These questions cover Docker, PM2, nginx, CI/CD, and production monitoring. Know these for any backend or DevOps interview.</p>
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
