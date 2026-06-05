import { useState } from "react";
import { D, mono, para } from "../../tokens";
import CodeBlock from "../primitives/CodeBlock";
import Tip from "../primitives/Tip";
import BigIdea from "../primitives/BigIdea";
import QuizCard from "../primitives/QuizCard";
import CiCdDemo from "../demos/CiCdDemo";

export default function SectionCICD() {
  const [tab, setTab] = useState("github");
  const tabs = [
    { id: "github", label: "🐙 GitHub Actions" },
    { id: "pipeline", label: "🔄 Pipeline" },
    { id: "strategies", label: "🎯 Strategies" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>CI/CD automates testing and deployment. Every push to your repository triggers a pipeline that verifies your code and ships it to production — without human intervention.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#f59e0b22" : "transparent", border: `1px solid ${tab === t.id ? "#f59e0b" : D.outline}`, color: tab === t.id ? "#f59e0b" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "github" && (
        <div>
          <CodeBlock label="GitHub Actions workflow" code={`.github/workflows/deploy.yml

name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to server
        run: |
          ssh user@server "cd /app && git pull && npm ci && pm2 reload api"
        env:
          SSH_PRIVATE_KEY: \${{ secrets.SSH_PRIVATE_KEY }}`} />
          <Tip icon="🔑" color={D.yellow} title="Secrets">Never put passwords or SSH keys in your workflow file. Use GitHub Secrets (Settings → Secrets and variables → Actions) to store them securely.</Tip>
        </div>
      )}
      {tab === "pipeline" && (
        <div>
          <CiCdDemo />
          <CodeBlock label="typical pipeline stages" code={`1. Checkout code
2. Install dependencies (npm ci)
3. Run linter (eslint)
4. Run type checker (tsc)
5. Run tests (jest --coverage)
6. Build application (vite build)
7. Build Docker image
8. Push image to registry
9. Deploy to staging
10. Run smoke tests
11. Deploy to production`} />
        </div>
      )}
      {tab === "strategies" && (
        <div>
          <BigIdea number="1" title="Blue-Green Deployment" color="#3b82f6">Run two identical production environments: Blue (live) and Green (idle). Deploy to Green, test it, then switch traffic from Blue to Green. If something breaks, switch back instantly. Zero downtime, instant rollback.</BigIdea>
          <BigIdea number="2" title="Rolling Deployment" color="#14b8a6">Replace old instances one at a time. If you have 5 servers, take one offline, deploy the new version, bring it back, then move to the next. No extra infrastructure needed, but rollback is slower.</BigIdea>
          <BigIdea number="3" title="Canary Deployment" color="#f59e0b">Deploy the new version to 5% of users. Monitor error rates and performance. If everything looks good, gradually increase to 25%, 50%, 100%. If errors spike, roll back the 5% instantly. Safest but most complex.</BigIdea>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What does the needs keyword do in GitHub Actions?" options={["It installs npm packages", "It makes one job wait for another to complete", "It defines environment variables", "It creates a Docker container"]} correct={1} explain="needs: test means the deploy job waits for the test job to finish successfully. If tests fail, deployment is automatically skipped." />
          <QuizCard question="What is blue-green deployment?" options={["A deployment that uses Docker", "Two identical environments where you switch traffic instantly", "A deployment that only runs at night", "A deployment strategy for mobile apps"]} correct={1} explain="Blue-green deployment maintains two identical production environments. You deploy to the idle one, test it, then switch traffic instantly. Rollback is immediate." />
          <QuizCard question="Where should you store SSH keys for CI/CD?" options={["In the workflow YAML file", "In GitHub Secrets", "In the README", "In package.json"]} correct={1} explain="GitHub Secrets encrypts sensitive values and injects them into workflows at runtime. Never commit passwords, tokens, or SSH keys to your repository." />
        </div>
      )}
    </div>
  );
}
