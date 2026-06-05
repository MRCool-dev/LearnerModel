import { useState } from "react";
import { D, mono, serif, para } from "../../tokens";
import CodeBlock from "../primitives/CodeBlock";
import Tip from "../primitives/Tip";
import EasyBox from "../primitives/EasyBox";
import BigIdea from "../primitives/BigIdea";
import QuizCard from "../primitives/QuizCard";

export default function SectionWhatIsDevOps() {
  const [tab, setTab] = useState("story");
  const tabs = [
    { id: "story", label: "📖 The Story" },
    { id: "concepts", label: "🎯 Key Concepts" },
    { id: "workflow", label: "🔄 Workflow" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>DevOps is the bridge between writing code and running it in production. It is not a job title — it is a mindset of automating everything that can be automated.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#f59e0b22" : "transparent", border: `1px solid ${tab === t.id ? "#f59e0b" : D.outline}`, color: tab === t.id ? "#f59e0b" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "story" && (
        <div>
          <BigIdea number="1" title="It worked on my machine" color={D.red}>The most expensive sentence in software. A developer writes code on their Mac, it works perfectly, they push to production, and everything breaks. Why? Different Node versions, missing environment variables, wrong OS libraries. DevOps exists to eliminate this gap.</BigIdea>
          <BigIdea number="2" title="Manual deployment is dangerous" color="#f43f5e">In 2010, deploying meant: SSH into server, git pull, npm install, restart service, pray. If something broke at 2 AM, someone got paged. Modern DevOps replaces all of this with automated pipelines that test, build, and deploy with zero human intervention.</BigIdea>
          <BigIdea number="3" title="Infrastructure as Code" color="#3b82f6">Instead of configuring servers by clicking buttons in a dashboard, you write code (Dockerfiles, Terraform, Ansible) that creates and configures servers. This makes infrastructure version-controlled, reproducible, and reviewable — just like application code.</BigIdea>
          <EasyBox emoji="🎯" title="DevOps in one sentence" color="#f59e0b"><strong>DevOps is the practice of shipping code to production automatically, reliably, and observably.</strong> If you cannot deploy in one command and know within seconds if something broke, you do not have DevOps.</EasyBox>
        </div>
      )}
      {tab === "concepts" && (
        <div>
          {[
            { title: "Containerization", color: "#3b82f6", icon: "📦", desc: "Package your app with all dependencies into a container. Runs identically on your laptop, in CI, and in production. Docker is the standard." },
            { title: "Process Management", color: "#8b5cf6", icon: "⚙️", desc: "Node.js crashes when an unhandled error occurs. PM2 keeps it running, restarts on failure, clusters across CPU cores, and handles zero-downtime reloads." },
            { title: "Reverse Proxy", color: "#14b8a6", icon: "🔄", desc: "nginx sits between the internet and your app. It handles SSL, serves static files, load-balances across multiple Node processes, and blocks malicious traffic." },
            { title: "CI/CD", color: "#f59e0b", icon: "🚀", desc: "Continuous Integration: every push triggers automated tests. Continuous Deployment: every passing build deploys to production automatically. GitHub Actions, GitLab CI, CircleCI." },
            { title: "Monitoring", color: "#f43f5e", icon: "📊", desc: "You cannot fix what you cannot see. Health checks, structured logs, error tracking (Sentry), and metrics (Prometheus) tell you when things break before users complain." },
            { title: "Environment Management", color: D.green, icon: "🔐", desc: "Secrets and config live outside the codebase in environment variables. .env files for local, injected secrets for production. Never commit passwords to Git." },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 10, padding: "13px 16px", background: item.color + "08", border: `1px solid ${item.color}25`, borderRadius: 9 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: mono, marginBottom: 7 }}>{item.icon} {item.title}</div>
              <p style={{ ...para, marginBottom: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      )}
      {tab === "workflow" && (
        <div>
          <CodeBlock label="the modern deployment workflow" code={`Developer pushes code
        ↓
GitHub Actions (CI) triggers
        ↓
Run tests → Lint → Type check → Build
        ↓
All checks pass?
        ↓ YES
Build Docker image
        ↓
Push to container registry
        ↓
SSH to production server
        ↓
Pull new image
        ↓
pm2 reload (zero-downtime)
        ↓
Health check passes?
        ↓ YES
Traffic routed to new version
        ↓
Monitor logs & metrics`} />
          <Tip icon="🎯" color={D.yellow} title="The golden rule">If a step in the pipeline fails, deployment stops immediately. You never deploy code that failed tests. This is why CI/CD is a safety net, not just automation.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What problem does Docker solve?" options={["It makes code run faster", "It packages apps so they run identically everywhere", "It replaces the need for a database", "It automatically writes tests"]} correct={1} explain="Docker containers include your app, runtime, and dependencies. A container runs the same on your Mac, in CI, and on the production Linux server." />
          <QuizCard question="What is the purpose of a reverse proxy like nginx?" options={["To replace Node.js", "To handle SSL, static files, and forward requests to Node.js", "To compile JavaScript", "To store session data"]} correct={1} explain="nginx sits in front of Node.js. It terminates SSL, serves static files efficiently, and proxies API requests to your Node app. It also enables load balancing across multiple Node processes." />
          <QuizCard question="What does CI/CD stand for?" options={["Code Integration / Code Deployment", "Continuous Integration / Continuous Deployment", "Container Infrastructure / Container Delivery", "Computer Intelligence / Computer Deployment"]} correct={1} explain="CI = Continuous Integration (automated tests on every push). CD = Continuous Deployment (automatic deployment when tests pass)." />
        </div>
      )}
    </div>
  );
}
