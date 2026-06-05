import { useState } from "react";
import { D, mono, para } from "../../tokens";
import CodeBlock from "../primitives/CodeBlock";
import Tip from "../primitives/Tip";
import EasyBox from "../primitives/EasyBox";
import QuizCard from "../primitives/QuizCard";

export default function SectionIntegration() {
  const [tab, setTab] = useState("setup");
  const tabs = [
    { id: "setup", label: "⚙️ Test Setup" },
    { id: "db", label: "🗄️ Test Database" },
    { id: "patterns", label: "📐 Patterns" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Integration tests verify that your API, database, and middleware work together. They are slower than unit tests but catch bugs that unit tests miss.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#14b8a622" : "transparent", border: `1px solid ${tab === t.id ? "#14b8a6" : D.outline}`, color: tab === t.id ? "#14b8a6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "setup" && (
        <div>
          <CodeBlock label="Jest lifecycle hooks" code={`describe('User API', () => {
  beforeAll(async () => {
    // Run once before all tests
    await connectToTestDatabase();
    await runMigrations();
  });

  beforeEach(async () => {
    // Run before EACH test
    await cleanDatabase();
  });

  afterEach(async () => {
    // Run after EACH test
    await cleanDatabase();
  });

  afterAll(async () => {
    // Run once after all tests
    await disconnectDatabase();
  });

  test('creates a user', async () => {
    // Test runs with a clean database
  });
});`} />
          <Tip icon="🎯" color={D.yellow} title="Clean state">Each test should start with a clean database. Never let test data leak between tests. Use TRUNCATE or transactions to reset state in beforeEach.</Tip>
        </div>
      )}
      {tab === "db" && (
        <div>
          <CodeBlock label="test database setup" code={`// config.js
const DB_NAME = process.env.NODE_ENV === 'test' ? 'myapp_test' : 'myapp';

// test-helper.js
const { Pool } = require('pg');
const pool = new Pool({ database: 'myapp_test' });

async function cleanDatabase() {
  await pool.query('TRUNCATE users, orders RESTART IDENTITY CASCADE');
}

async function setupTestDB() {
  await pool.query('BEGIN');
  // insert seed data
  await pool.query("INSERT INTO users (name, email) VALUES ('Seed', 'seed@test.com')");
  await pool.query('COMMIT');
}

module.exports = { pool, cleanDatabase, setupTestDB };`} />
          <EasyBox emoji="⚠️" title="Never test on production" color={D.red}>Your test suite should connect to a separate test database. Testing on production or development databases destroys real data. Use `NODE_ENV=test` to switch databases automatically.</EasyBox>
          <CodeBlock label="package.json scripts" code={`{
  "scripts": {
    "test": "NODE_ENV=test jest",
    "test:watch": "NODE_ENV=test jest --watch",
    "test:coverage": "NODE_ENV=test jest --coverage"
  }
}`} />
        </div>
      )}
      {tab === "patterns" && (
        <div>
          <CodeBlock label="factory pattern for test data" code={`// factories/user.js
const { User } = require('../models');

function createUser(overrides = {}) {
  return User.create({
    name: 'Test User',
    email: \`test+\${Date.now()}@example.com\`,
    ...overrides
  });
}

// In tests
const user = await createUser({ name: 'Alice', role: 'admin' });
const user2 = await createUser(); // uses defaults`} />
          <CodeBlock label="transaction rollback pattern" code={`beforeEach(async () => {
  // Start transaction before each test
  await db.query('BEGIN');
});

afterEach(async () => {
  // Roll back all changes after each test
  await db.query('ROLLBACK');
});

// Fastest cleanup — no TRUNCATE needed!
// But only works if your app uses the same connection`} />
          <Tip icon="💡" color={D.yellow} title="Factories > Fixtures">Factories generate test data programmatically. Fixtures are static JSON files. Factories are more flexible — you can override specific fields per test without modifying shared files.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="Which hook runs BEFORE EACH test?" options={["beforeAll", "beforeEach", "afterEach", "afterAll"]} correct={1} explain="beforeEach runs before every single test in a describe block. Use it to reset database state and ensure test isolation." />
          <QuizCard question="Why should you use a separate test database?" options={["It is faster", "It prevents destroying real data", "It has more features", "It is required by Jest"]} correct={1} explain="Tests create, modify, and delete data. Running tests on a production or development database would destroy real data and cause data corruption." />
          <QuizCard question="What is the factory pattern in testing?" options={["A design pattern for building APIs", "A function that creates test data with defaults and overrides", "A way to mock external services", "A tool for measuring code coverage"]} correct={1} explain="A factory is a helper function that creates test objects with sensible defaults. You pass overrides for specific fields, keeping tests concise and readable." />
        </div>
      )}
    </div>
  );
}
