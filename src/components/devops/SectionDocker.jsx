import { useState } from "react";
import { D, mono, para } from "../../tokens";
import CodeBlock from "../primitives/CodeBlock";
import Tip from "../primitives/Tip";
import EasyBox from "../primitives/EasyBox";
import BigIdea from "../primitives/BigIdea";
import QuizCard from "../primitives/QuizCard";
import DockerBuildDemo from "../demos/DockerBuildDemo";

export default function SectionDocker() {
  const [tab, setTab] = useState("dockerfile");
  const tabs = [
    { id: "dockerfile", label: "🐳 Dockerfile" },
    { id: "compose", label: "🎼 Compose" },
    { id: "commands", label: "⌨️ Commands" },
    { id: "demo", label: "🧪 Live Demo" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Docker containers are lightweight, portable, and isolated. They solve the "it works on my machine" problem forever.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#3b82f622" : "transparent", border: `1px solid ${tab === t.id ? "#3b82f6" : D.outline}`, color: tab === t.id ? "#3b82f6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "dockerfile" && (
        <div>
          <CodeBlock label="production Dockerfile" code={`FROM node:20-alpine

WORKDIR /app

# Copy dependency files first (for layer caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Create non-root user for security
USER node

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD curl -f http://localhost:3000/health || exit 1

# Start command
CMD ["node", "server.js"]`} />
          <BigIdea number="1" title="Layer caching" color="#3b82f6">Docker builds images in layers. If package.json hasn't changed, Docker reuses the cached `npm ci` layer. This makes rebuilds 10x faster. Always copy package files BEFORE copying source code.</BigIdea>
          <Tip icon="🔒" color={D.yellow} title="Security">Never run containers as root. Use `USER node` or create a dedicated user. A compromised root container can access the host system.</Tip>
        </div>
      )}
      {tab === "compose" && (
        <div>
          <CodeBlock label="docker-compose.yml" code={`version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://db:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app

volumes:
  pgdata:`} />
          <EasyBox emoji="🎯" title="Why docker-compose?" color="#3b82f6">Docker Compose defines your entire stack in one file: app, database, cache, and proxy. One command (`docker-compose up`) starts everything. One command (`docker-compose down`) stops everything. Perfect for local development and CI.</EasyBox>
        </div>
      )}
      {tab === "commands" && (
        <div>
          <CodeBlock label="essential Docker commands" code={`docker build -t myapp .              # build image
docker run -p 3000:3000 myapp        # run container
docker run -d --name api myapp       # run detached (background)
docker ps                            # list running containers
docker logs api                      # view container logs
docker exec -it api sh               # shell into container
docker stop api && docker rm api     # stop and remove
docker-compose up -d                 # start all services
docker-compose down -v               # stop and remove volumes
docker system prune -f               # clean unused images`} />
          <Tip icon="💡" color={D.yellow} title=".dockerignore">Create a `.dockerignore` file to exclude `node_modules`, `.git`, and `.env` from the build context. This makes builds faster and prevents secrets from leaking into images.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="Why copy package.json before source code in a Dockerfile?" options={["It is required by Docker", "It enables layer caching for faster rebuilds", "It makes the image smaller", "It improves security"]} correct={1} explain="Docker caches layers. If package.json hasn't changed, Docker skips npm install and reuses the cached layer. This makes rebuilds dramatically faster." />
          <QuizCard question="What does docker-compose do?" options={["Builds a single container", "Defines and runs multi-container applications", "Replaces Kubernetes", "Monitors container health"]} correct={1} explain="Docker Compose lets you define multiple services (app, database, cache, proxy) in one YAML file and start them all with a single command." />
          <QuizCard question="Why should containers NOT run as root?" options={["Root is slower", "A compromised root container can access the host system", "Root uses more memory", "Root cannot bind to ports"]} correct={1} explain="Running as root inside a container is a security risk. If an attacker breaks into the container, they have root access to the host system. Always use a non-root user." />
        </div>
      )}
      {tab === "demo" && <DockerBuildDemo />}
    </div>
  );
}
