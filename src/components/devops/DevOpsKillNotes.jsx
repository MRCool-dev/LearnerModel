import { D, mono, serif, para } from "../../tokens";

export default function DevOpsKillNotes() {
  const groups = [
    { title: "DevOps Fundamentals", color: "#f59e0b", icon: "🚀", kills: ["DevOps = shipping code automatically, reliably, and observably.", "Infrastructure as Code: configure servers with code, not clicks.", "Never deploy code that failed tests.", "Manual deployment is dangerous and error-prone.", "Containerize everything. Orchestrate at scale.", "Monitor production — you cannot fix what you cannot see."] },
    { title: "Docker", color: "#3b82f6", icon: "🐳", kills: ["Docker packages apps with dependencies into portable containers.", "Dockerfile: FROM, WORKDIR, COPY, RUN, EXPOSE, CMD.", "Copy package.json BEFORE source code for layer caching.", "docker-compose defines multi-container stacks in one file.", "Never run containers as root. Use USER.", ".dockerignore excludes node_modules, .git, .env from builds.", "Volumes persist data across container restarts."] },
    { title: "PM2", color: "#8b5cf6", icon: "⚙️", kills: ["PM2 keeps Node.js running, restarts crashes, and clusters CPUs.", "pm2 start app.js -i max = one process per CPU core.", "pm2 reload = zero-downtime restart. pm2 restart = hard restart.", "Use ecosystem.config.js for production configuration.", "pm2 save + pm2 startup = auto-restart on server boot.", "max_memory_restart prevents memory leaks from crashing the server."] },
    { title: "nginx", color: "#14b8a6", icon: "🔄", kills: ["nginx handles SSL, static files, and proxies to Node.js.", "Always use HTTPS in production. Let's Encrypt is free.", "X-Real-IP and X-Forwarded-For pass the client IP through the proxy.", "Serve static files from nginx, not Express.", "nginx is 10x more efficient at SSL and static file serving than Node.", "Configure gzip compression to reduce response sizes."] },
    { title: "CI/CD", color: "#f59e0b", icon: "🔄", kills: ["CI = automated tests on every push. CD = auto-deploy on pass.", "GitHub Actions, GitLab CI, CircleCI are popular CI/CD tools.", "Store secrets in GitHub Secrets, never in workflow files.", "needs: test makes deploy wait for tests to pass.", "Blue-green = instant rollback. Canary = gradual rollout.", "A typical pipeline: lint → test → build → deploy → smoke test."] },
    { title: "Monitoring", color: "#f43f5e", icon: "📊", kills: ["Health checks let load balancers route away from failed servers.", "Structured JSON logs are searchable and dashboard-friendly.", "Track: error rate, response time (p95/p99), throughput, CPU, memory.", "Winston, Pino, and Bunyan are popular Node.js loggers.", "Alert on symptoms (high error rate), not causes (disk full).", "p95 response time shows real user experience better than average."] },
  ];
  return (
    <div>
      <p style={para}>The precise facts that matter most — for deploying apps, for debugging production, for interviews.</p>
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
