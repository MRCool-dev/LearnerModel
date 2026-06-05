import { useState } from "react";
import { D, mono, para } from "../../tokens";
import CodeBlock from "../primitives/CodeBlock";
import Tip from "../primitives/Tip";
import EasyBox from "../primitives/EasyBox";
import BigIdea from "../primitives/BigIdea";
import QuizCard from "../primitives/QuizCard";

export default function SectionPM2() {
  const [tab, setTab] = useState("intro");
  const tabs = [
    { id: "intro", label: "⚡ Intro" },
    { id: "cluster", label: "🔄 Cluster Mode" },
    { id: "config", label: "⚙️ Config" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>PM2 is a production process manager for Node.js. It keeps your app running, restarts crashes, clusters across CPU cores, and handles zero-downtime deployments.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#8b5cf622" : "transparent", border: `1px solid ${tab === t.id ? "#8b5cf6" : D.outline}`, color: tab === t.id ? "#8b5cf6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "intro" && (
        <div>
          <CodeBlock label="PM2 basics" code={`npm install -g pm2

pm2 start server.js --name "api"
pm2 list
pm2 logs api
pm2 reload api          # zero-downtime restart
pm2 restart api         # hard restart
pm2 stop api
pm2 delete api
pm2 save                # save process list
pm2 startup             # generate startup script
pm2 monit               # real-time monitoring`} />
          <BigIdea number="1" title="Node.js crashes by default" color={D.red}>If an unhandled error throws in Node.js, the entire process exits. In production, this means downtime until someone manually restarts it. PM2 watches your process and instantly restarts it on crash — keeping your API available.</BigIdea>
          <EasyBox emoji="🎯" title="Zero-downtime reload" color="#8b5cf6">`pm2 reload` starts new processes alongside old ones, then swaps traffic over. Users experience zero downtime. This is how production deployments should work.</EasyBox>
        </div>
      )}
      {tab === "cluster" && (
        <div>
          <CodeBlock label="cluster mode" code={`# Use all CPU cores
pm2 start server.js -i max

# Or specify number of instances
pm2 start server.js -i 4

# What this does:
# Core 1: Node process #1
# Core 2: Node process #2
# Core 3: Node process #3
# Core 4: Node process #4
# All share port 3000 (PM2 load balances)`} />
          <BigIdea number="1" title="One Node process = one CPU core" color="#f59e0b">Node.js is single-threaded. A single Node process can only use one CPU core. On an 8-core server, 7 cores sit idle. Cluster mode starts one process per core, multiplying your throughput by the number of cores.</BigIdea>
          <Tip icon="🎯" color={D.yellow} title="When to cluster">Always cluster in production. A single core might handle 1,000 requests/second. Eight cores handle 8,000. The only exception: if your app is memory-bound (large ML models) rather than CPU-bound.</Tip>
        </div>
      )}
      {tab === "config" && (
        <div>
          <CodeBlock label="ecosystem.config.js" code={`module.exports = {
  apps: [{
    name: 'api',
    script: './server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 80
    },
    // Logging
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    merge_logs: true,
    // Memory limit
    max_memory_restart: '500M',
    // Auto-restart
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};`} />
          <CodeBlock label="run with config" code={`pm2 start ecosystem.config.js
pm2 start ecosystem.config.js --env production
pm2 reload ecosystem.config.js`} />
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What happens when an unhandled error occurs in Node.js?" options={["It logs the error and continues", "The process crashes and exits", "It restarts automatically", "It sends an email"]} correct={1} explain="By default, an unhandled exception crashes the Node.js process. Without PM2, your server goes down until someone manually restarts it." />
          <QuizCard question="What does pm2 start app.js -i max do?" options={["Runs the app with maximum memory", "Starts one process per CPU core", "Enables debug mode", "Sets the port to maximum"]} correct={1} explain="-i max starts one Node.js process for every CPU core, with PM2 load-balancing requests between them. This maximizes hardware utilization." />
          <QuizCard question="What is the difference between restart and reload?" options={["They are the same", "Restart stops then starts; reload swaps processes with zero downtime", "Restart is faster", "Reload only works in development"]} correct={1} explain="pm2 restart kills the process and starts a new one (downtime). pm2 reload starts new processes alongside old ones, then swaps traffic over (zero downtime)." />
        </div>
      )}
    </div>
  );
}
