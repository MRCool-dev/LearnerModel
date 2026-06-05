import { useState } from "react";
import { D, mono, serif, para } from "../../tokens";
import BigIdea from "../primitives/BigIdea";
import EasyBox from "../primitives/EasyBox";
import CodeBlock from "../primitives/CodeBlock";
import Tip from "../primitives/Tip";
import QuizCard from "../primitives/QuizCard";
import TestRunnerLiveDemo from "../demos/TestRunnerLiveDemo";

export default function SectionWhatIsTesting() {
  const [tab, setTab] = useState("story");
  const tabs = [
    { id: "story", label: "📖 Why Test?" },
    { id: "pyramid", label: "🔺 Test Pyramid" },
    { id: "types", label: "📋 Test Types" },
    { id: "coverage", label: "📊 Coverage" },
    { id: "ci", label: "🚀 CI Pipeline" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Testing is not about finding bugs — it is about preventing them. A good test suite gives you confidence to refactor, deploy on Fridays, and sleep at night.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#f59e0b22" : "transparent", border: `1px solid ${tab === t.id ? "#f59e0b" : D.outline}`, color: tab === t.id ? "#f59e0b" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "story" && (
        <div>
          <BigIdea number="1" title="Untested code is broken code" color={D.red}>If you have not tested it, you do not know if it works. It might work on your machine, with your data, today. But will it work on the production server, with 10,000 users, after the next refactor? Testing is the only way to know.</BigIdea>
          <BigIdea number="2" title="Tests are documentation" color="#3b82f6">A well-written test describes what the code SHOULD do better than any comment. New developers can read tests to understand the system. When requirements change, tests show exactly what behavior must be preserved.</BigIdea>
          <BigIdea number="3" title="Tests enable refactoring" color={D.green}>Without tests, changing code is terrifying. You might break something and not know for weeks. With tests, you refactor fearlessly. If the tests pass, the system works. This is how codebases stay healthy over years.</BigIdea>
          <EasyBox emoji="🎯" title="One sentence" color="#f59e0b"><strong>Tests are a safety net</strong> that lets you move fast without breaking things. They are not optional — they are a professional requirement.</EasyBox>
        </div>
      )}
      {tab === "pyramid" && (
        <div>
          <CodeBlock label="the test pyramid" code={`        /\\
       /  \\     E2E Tests     (slow, expensive, few)
      /----\\
     /      \\   Integration   (medium, medium)
    /--------\\
   /          \\ Unit Tests    (fast, cheap, many)
  --------------`} />
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
            {[
              { type: "Unit Tests", pct: "70%", speed: "< 10ms", cost: "Cheap", color: D.green, desc: "Test a single function in isolation. Mock all dependencies. Run thousands in seconds." },
              { type: "Integration Tests", pct: "20%", speed: "~100ms", cost: "Medium", color: "#f59e0b", desc: "Test multiple components together. Hit the database. Verify APIs." },
              { type: "E2E Tests", pct: "10%", speed: "> 1s", cost: "Expensive", color: "#f43f5e", desc: "Test the entire app like a real user. Open browser, click buttons, fill forms." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "8px 12px", background: item.color + "08", border: `1px solid ${item.color}22`, borderRadius: 7 }}>
                <div style={{ width: 40, flexShrink: 0, textAlign: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 900, color: item.color, fontFamily: mono }}>{item.pct}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: mono, marginBottom: 2 }}>{item.type}</div>
                  <div style={{ fontSize: 11, color: D.muted, fontFamily: serif, lineHeight: 1.6 }}>{item.desc} <span style={{ color: item.color + "99", fontFamily: mono }}>({item.speed}, {item.cost})</span></div>
                </div>
              </div>
            ))}
          </div>
          <Tip icon="🎯" color={D.yellow} title="The pyramid rule">Most of your tests should be fast unit tests. Fewer integration tests. Very few E2E tests. Inverting the pyramid (many E2E, few unit) makes your test suite slow and brittle.</Tip>
        </div>
      )}
      {tab === "types" && (
        <div>
          <CodeBlock label="test types explained" code={`// UNIT TEST — test one function
expect(add(2, 3)).toBe(5);

// INTEGRATION TEST — test API + database
const res = await request(app).post('/users').send({ name: 'Alice' });
expect(res.status).toBe(201);

// E2E TEST — test like a real user
await page.goto('http://localhost:3000');
await page.click('[data-testid="login"]');
await page.fill('[name="email"]', 'alice@example.com');`} />
          <BigIdea number="1" title="AAA Pattern" color="#8b5cf6">Arrange — set up the test data and mocks. Act — call the function under test. Assert — verify the outcome. Every test should follow this structure. If you can't split a test into these three parts, it is probably testing too much.</BigIdea>
          <EasyBox emoji="🎯" title="TDD: Test-Driven Development" color={D.green}>Write the test FIRST, watch it fail, then write the minimum code to make it pass, then refactor. TDD forces you to think about requirements before implementation and guarantees every line of code has a test.</EasyBox>
        </div>
      )}
      {tab === "coverage" && (
        <div>
          <BigIdea number="1" title="Code coverage measures what is tested, not test quality" color="#f59e0b">100% coverage does not mean your code is correct. It means every line was executed during tests. You can have 100% coverage with useless tests. Coverage is a floor, not a ceiling.</BigIdea>
          <CodeBlock label="Jest coverage configuration" code={`// jest.config.js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/**/*.test.{js,ts}',
    '!src/index.{js,ts}',  // entry point
  ],
  coverageThresholds: {
    global: {
      branches: 80,    // if/else branches covered
      functions: 85,   // functions called
      lines: 85,       // lines executed
      statements: 85,  // statements executed
    },
    // Per-file enforcement for critical code
    './src/services/auth.ts': {
      branches: 95,
      functions: 100,
    },
  },
  coverageReporters: ['text', 'lcov', 'html'],
};

// Run coverage
// npm test -- --coverage`} />
          <CodeBlock label="what to focus coverage on" code={`// HIGH coverage priority:
// - Service layer (business logic)
// - Utility functions (pure functions)
// - Auth middleware (security critical)
// - Error handlers

// MEDIUM priority:
// - Route handlers (covered by integration tests)
// - Validators

// LOW priority — often skip:
// - Database migrations
// - Server bootstrap (index.ts)
// - Generated code`} />
          <Tip icon="🎯" color={D.yellow} title="MNC PR standard">Most MNCs enforce a 80% minimum coverage gate in CI. PRs that reduce coverage get blocked. Focus on testing the core business logic, not chasing 100% on every line.</Tip>
        </div>
      )}
      {tab === "ci" && (
        <div>
          <BigIdea number="1" title="Tests must run in CI on every commit" color="#f59e0b">Local tests are optional — you can skip them. CI tests are mandatory. Every commit to every branch should trigger the full test suite. If tests fail, the PR cannot be merged. This is the core of Continuous Integration.</BigIdea>
          <CodeBlock label="GitHub Actions CI pipeline" code={`# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_DB: testdb
          POSTGRES_USER: testuser
          POSTGRES_PASSWORD: testpass
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci  # faster than npm install, uses package-lock

      - name: Type check
        run: npm run typecheck

      - name: Lint
        run: npm run lint

      - name: Run tests with coverage
        run: npm test -- --coverage
        env:
          NODE_ENV: test
          DATABASE_URL: postgresql://testuser:testpass@localhost:5432/testdb

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v4`} />
          <Tip icon="🔑" color={D.yellow} title="npm ci vs npm install in CI">Always use <code>npm ci</code> in CI pipelines. It installs exactly what is in package-lock.json, fails if there is a mismatch, and is faster. <code>npm install</code> can modify the lock file which causes non-reproducible builds.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What is the main purpose of tests?" options={["To find bugs after they happen", "To prevent bugs and enable confident refactoring", "To make code run faster", "To replace documentation"]} correct={1} explain="Tests primarily prevent bugs by catching them before they reach production. They also give developers confidence to refactor and change code without fear." />
          <QuizCard question="According to the test pyramid, what percentage should be unit tests?" options={["10%", "30%", "70%", "90%"]} correct={2} explain="The test pyramid recommends ~70% unit tests (fast, cheap), ~20% integration tests, and ~10% E2E tests (slow, expensive)." />
          <QuizCard question="What does AAA stand for in test structure?" options={["Always Assert Always", "Arrange, Act, Assert", "Async, Await, Assert", "Add, Apply, Assert"]} correct={1} explain="AAA = Arrange (set up), Act (execute), Assert (verify). This structure makes tests readable and maintainable." />
          <QuizCard question="Why use npm ci instead of npm install in CI?" options={["It is slower but more thorough", "It installs exactly from the lock file and fails on mismatch", "It updates all dependencies to latest", "It only installs production dependencies"]} correct={1} explain="npm ci reads package-lock.json exactly and fails if the lock file doesn't match package.json. This ensures reproducible builds — every CI run gets the exact same dependencies." />
        </div>
      )}
    </div>
  );
}
