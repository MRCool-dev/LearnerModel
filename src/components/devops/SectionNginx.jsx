import { useState } from "react";
import { D, mono, para } from "../../tokens";
import CodeBlock from "../primitives/CodeBlock";
import Tip from "../primitives/Tip";
import EasyBox from "../primitives/EasyBox";
import BigIdea from "../primitives/BigIdea";
import QuizCard from "../primitives/QuizCard";

export default function SectionNginx() {
  const [tab, setTab] = useState("proxy");
  const tabs = [
    { id: "proxy", label: "🔄 Reverse Proxy" },
    { id: "ssl", label: "🔒 SSL" },
    { id: "static", label: "📁 Static Files" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>nginx is the world's most popular web server and reverse proxy. It handles SSL, serves static files, load-balances traffic, and protects your Node.js app from the open internet.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#14b8a622" : "transparent", border: `1px solid ${tab === t.id ? "#14b8a6" : D.outline}`, color: tab === t.id ? "#14b8a6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "proxy" && (
        <div>
          <CodeBlock label="nginx reverse proxy" code={`server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}`} />
          <BigIdea number="1" title="Why proxy through nginx?" color="#14b8a6">Node.js is excellent at handling dynamic requests but not optimized for serving static files or handling SSL encryption. nginx is written in C and handles these tasks 10x more efficiently. It also adds a layer of security — the internet talks to nginx, not directly to your Node process.</BigIdea>
          <Tip icon="🎯" color={D.yellow} title="X-Forwarded-For">When nginx proxies a request, the client's real IP is in `X-Forwarded-For`. Your Express app should read this header to get the original IP for rate limiting and logging.</Tip>
        </div>
      )}
      {tab === "ssl" && (
        <div>
          <CodeBlock label="free SSL with Let's Encrypt" code={`# Install certbot
sudo apt install certbot python3-certbot-nginx

# Generate certificate
sudo certbot --nginx -d api.example.com

# Auto-renew (certbot sets this up automatically)
# Certificates expire every 90 days
# certbot renews them automatically via cron`} />
          <CodeBlock label="nginx with SSL" code={`server {
    listen 443 ssl http2;
    server_name api.example.com;

    ssl_certificate /etc/letsencrypt/live/api.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.example.com/privkey.pem;

    # Modern SSL config
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://localhost:3000;
    }
}`} />
          <EasyBox emoji="🔒" title="Always use HTTPS" color={D.red}>Without HTTPS, passwords and tokens travel over the internet in plain text. Anyone on the same WiFi can intercept them. Let's Encrypt provides free SSL certificates. There is no excuse for HTTP in production.</EasyBox>
        </div>
      )}
      {tab === "static" && (
        <div>
          <CodeBlock label="serving static files" code={`server {
    listen 80;
    server_name example.com;

    # Serve static files directly (fast!)
    location /static/ {
        alias /var/www/static/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Serve uploads
    location /uploads/ {
        alias /var/www/uploads/;
        expires 7d;
    }

    # Everything else goes to Node.js
    location / {
        proxy_pass http://localhost:3000;
    }
}`} />
          <Tip icon="💡" color={D.yellow} title="Let nginx serve static files">Never serve static files from Express in production. Express reads files through the Node.js event loop, blocking other requests. nginx serves them directly from disk using sendfile — zero Node.js involvement.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="Why use nginx in front of Node.js?" options={["To replace Node.js entirely", "To handle SSL, static files, and proxy requests efficiently", "To add JavaScript features", "To connect to the database"]} correct={1} explain="nginx handles SSL termination, static file serving, and request proxying far more efficiently than Node.js. It also adds a security layer between the internet and your app." />
          <QuizCard question="What does Let's Encrypt provide?" options={["Paid SSL certificates", "Free SSL certificates", "Database hosting", "Docker images"]} correct={1} explain="Let's Encrypt is a nonprofit that provides free SSL certificates. certbot automates the setup and renewal process. Every production site should use HTTPS." />
          <QuizCard question="Which header contains the client's real IP when using nginx?" options={["Host", "X-Real-IP", "Content-Type", "Authorization"]} correct={1} explain="When nginx proxies a request, the client's IP is passed via X-Real-IP and X-Forwarded-For headers. Your app should read these to get the original IP address." />
        </div>
      )}
    </div>
  );
}
