import { useState } from "react";
import { D, mono, serif, para } from "../../tokens";
import CodeBlock from "../primitives/CodeBlock";

export default function TestingInterview() {
  const [open, setOpen] = useState(null);
  const qs = [
    { q: "What is the difference between unit, integration, and E2E tests?", level: "Junior", color: D.green,
      a: `Unit tests verify a single function in isolation. They mock all dependencies and run in milliseconds. They are fast, cheap, and you should have many of them (~70% of your test suite).

Integration tests verify that multiple components work together — your API, database, and middleware. They are slower (~100ms) but catch bugs that unit tests miss (~20%).

E2E (End-to-End) tests verify the entire application like a real user. They open a browser, click buttons, and fill forms. They are slow (>1s), expensive to maintain, and you should have few of them (~10%).

The test pyramid: many unit tests at the bottom, fewer integration tests, very few E2E tests at the top.`,
      code: `// Unit — test one function
expect(add(2, 3)).toBe(5);

// Integration — test API + database
const res = await request(app).post('/users').send({ name: 'Alice' });
expect(res.status).toBe(201);

// E2E — test like a real user
await page.goto('http://localhost:3000');
await page.click('[data-testid="login"]');` },
    { q: "Why is mocking important in unit testing?", level: "Junior", color: D.green,
      a: `Unit tests should test ONE thing in isolation. If a function calls an external API, you don't want your test to actually hit that API — it would be slow, unreliable, and might fail for network reasons unrelated to your code.

Mocking replaces external dependencies with controlled fakes. You define exactly what the mock returns, then verify that your code handles that response correctly.

When NOT to mock: integration tests. In integration tests, you WANT to test the real database, the real API client, and the real middleware working together.`,
      code: `// Mock external API
jest.mock('./stripe', () => ({
  charge: jest.fn(() => Promise.resolve({ id: 'ch_123', status: 'succeeded' }))
}));

// Spy without changing behavior
const spy = jest.spyOn(logger, 'info');
processOrder();
expect(spy).toHaveBeenCalledWith('Order processed');
spy.mockRestore();` },
    { q: "How do you test an Express API endpoint?", level: "Mid", color: "#3b82f6",
      a: `Use Supertest. It sends HTTP requests directly to your Express app without starting a real server. This makes tests fast, isolated, and parallelizable.

Best practices:
1. Test both success and error paths (200, 201, 400, 404, 401, 500).
2. Create your own test data in beforeEach — never depend on other tests.
3. Use a separate test database with clean state before each test.
4. Assert on response status, headers, AND body structure.
5. For authenticated endpoints, log in first and use the token.`,
      code: `const request = require('supertest');
const app = require('./app');

describe('POST /users', () => {
  test('creates a user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Alice', email: 'alice@example.com' })
      .expect(201);

    expect(res.body.data).toMatchObject({
      name: 'Alice',
      email: 'alice@example.com'
    });
  });

  test('returns 400 for invalid data', async () => {
    await request(app)
      .post('/users')
      .send({ name: '' })
      .expect(400);
  });
});` },
    { q: "What are database migrations and why should tests use them?", level: "Mid", color: "#3b82f6",
      a: `Migrations are version-controlled scripts that change your database schema. They ensure every developer and every environment (local, CI, production) has the exact same database structure.

Tests should use migrations because:
1. Your test database schema must match your production schema.
2. Running migrations in CI guarantees tests run against the correct schema.
3. Migrations make schema changes reproducible and reviewable.

Test workflow: run migrations → truncate tables → run tests → truncate tables → repeat.

Never manually modify the test database schema. Always use migrations.`,
      code: `// test-setup.js
beforeAll(async () => {
  // Apply migrations to test database
  await exec('npx prisma migrate deploy');
});

beforeEach(async () => {
  // Clean state
  await prisma.$executeRaw\`TRUNCATE users, orders RESTART IDENTITY CASCADE\`;
});` },
    { q: "How do you debug a Node.js application?", level: "Junior", color: D.green,
      a: `Three levels of debugging:

1. Console methods: console.log, console.table, console.time, console.trace. Fast but limited.

2. debugger statement + --inspect: Add debugger; in your code, run node --inspect app.js, then open chrome://inspect. You get breakpoints, variable inspection, and step-through debugging.

3. VS Code debugger: Create .vscode/launch.json, set breakpoints in the editor, and press F5. Best for everyday development because it integrates with your workflow.

Rule: if you have added more than 3 console.logs and still don't understand the bug, switch to a real debugger.`,
      code: `// debugger statement
function processOrder(order) {
  debugger;  // pauses here when inspector is attached
  const total = calculateTotal(order);
  return total;
}

// Start with inspector
node --inspect app.js

// VS Code launch.json
{
  "type": "node",
  "request": "launch",
  "name": "Debug",
  "program": "\${workspaceFolder}/app.js"
}` },
    { q: "What is the cache-aside pattern and how do you test it?", level: "Mid", color: "#3b82f6",
      a: `Cache-aside (lazy loading): check cache first, return if hit. If miss, query database, store in cache, return data.

Testing the cache-aside pattern:
1. First call: cache miss → verify database was queried → verify result was cached.
2. Second call: cache hit → verify database was NOT queried → verify result returned from cache.
3. After update: verify cache was invalidated → next call should be a miss.

You need a real Redis instance (or Redis memory server) for these tests because you are testing the integration between your code and Redis.`,
      code: `test('caches after first call', async () => {
  // First call — cache miss
  const r1 = await getUser(1);
  expect(r1.name).toBe('Alice');

  // Second call — cache hit
  const spy = jest.spyOn(db, 'findUser');
  const r2 = await getUser(1);
  expect(r2.name).toBe('Alice');
  expect(spy).not.toHaveBeenCalled();  // no DB query!

  // After update — invalidate
  await updateUser(1, { name: 'Bob' });
  const r3 = await getUser(1);
  expect(r3.name).toBe('Bob');
});` },
  ];
  return (
    <div>
      <p style={para}>These questions cover testing strategy, Jest patterns, API testing, and debugging techniques. Know these for any backend interview.</p>
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
