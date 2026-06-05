import { D, mono, serif, para } from "../../tokens";

export default function TestingKillNotes() {
  const groups = [
    { title: "Testing Fundamentals", color: "#f59e0b", icon: "🧪", kills: ["Unit tests: fast, isolated, many (70%).", "Integration tests: test components together (20%).", "E2E tests: test like a real user (10%).", "AAA: Arrange, Act, Assert.", "TDD: write tests BEFORE code.", "Untested code is technical debt."] },
    { title: "Jest", color: "#f43f5e", icon: "🃏", kills: ["Jest discovers .test.js and __tests__ folders automatically.", "describe() groups tests. test() or it() defines a test.", "expect(value).toBe(5) for primitives. toEqual({}) for objects.", "jest.fn() creates mock functions. jest.spyOn() watches real functions.", "jest.mock() replaces entire modules.", "--watch reruns tests on file change. --coverage generates reports.", "beforeEach/afterEach for setup and cleanup."] },
    { title: "Supertest", color: "#8b5cf6", icon: "🌐", kills: ["Supertest tests Express apps without starting a real server.", "request(app).get('/').expect(200) is the basic pattern.", ".send({}) sends JSON body. .set() sets headers.", "Test both happy paths AND error paths (401, 404, 400, 500).", "Each test should create its own data — never depend on other tests.", "Use async/await — Supertest returns promises."] },
    { title: "Integration Testing", color: "#14b8a6", icon: "🔗", kills: ["Use a separate test database. Never test on production.", "Clean database state before/after each test.", "TRUNCATE tables or use transaction rollback for fast cleanup.", "Factory pattern > fixtures for generating test data.", "beforeAll: connect DB. afterAll: disconnect DB.", "beforeEach: clean state. afterEach: clean state.", "Integration tests catch bugs that unit tests miss."] },
    { title: "Debugging", color: "#06b6d4", icon: "🐛", kills: ["console.table(), console.time(), console.trace() are powerful.", "debugger; pauses execution — use with --inspect or VS Code.", "node --inspect app.js starts the V8 inspector.", "ndb is an enhanced Node debugger with better source maps.", "VS Code launch.json configures debug profiles.", "Breakpoints > console.log for complex issues.", "Conditional breakpoints: pause only when a condition is met."] },
  ];
  return (
    <div>
      <p style={para}>The precise facts that matter most — for writing tests, for debugging, for interviews.</p>
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
