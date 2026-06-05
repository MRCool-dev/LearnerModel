import { useState } from "react";
import { D, mono, para } from "../../tokens";
import CodeBlock from "../primitives/CodeBlock";
import Tip from "../primitives/Tip";
import EasyBox from "../primitives/EasyBox";
import BigIdea from "../primitives/BigIdea";
import QuizCard from "../primitives/QuizCard";

export default function SectionSupertest() {
  const [tab, setTab] = useState("intro");
  const tabs = [
    { id: "intro", label: "🌐 Intro" },
    { id: "crud", label: "📝 CRUD Tests" },
    { id: "auth", label: "🔐 Auth Tests" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Supertest lets you test Express APIs without starting a real server on a port. It sends HTTP requests to your app directly and gives you powerful assertions on the response.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#8b5cf622" : "transparent", border: `1px solid ${tab === t.id ? "#8b5cf6" : D.outline}`, color: tab === t.id ? "#8b5cf6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "intro" && (
        <div>
          <CodeBlock label="basic supertest setup" code={`const request = require('supertest');
const app = require('./app');  // your Express app (NOT app.listen!)

describe('GET /users', () => {
  test('returns all users as JSON', async () => {
    const response = await request(app)
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});`} />
          <BigIdea number="1" title="No server required" color="#8b5cf6">Supertest hooks directly into Express's request handling. You don't call app.listen(). You don't need a running server. This makes tests fast, isolated, and parallelizable. No port conflicts, no cleanup.</BigIdea>
          <EasyBox emoji="🎯" title="Chainable API" color="#8b5cf6">Supertest uses a fluent API: <code>request(app).get('/').set('Authorization', token).send(body).expect(200)</code>. Each method returns the request object for chaining.</EasyBox>
        </div>
      )}
      {tab === "crud" && (
        <div>
          <CodeBlock label="full CRUD test suite" code={`describe('Users API', () => {
  test('POST /users creates a user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Alice', email: 'alice@example.com' })
      .expect(201);

    expect(res.body.data.name).toBe('Alice');
    expect(res.body.data).toHaveProperty('id');
  });

  test('GET /users/:id returns a user', async () => {
    const res = await request(app)
      .get('/users/1')
      .expect(200);

    expect(res.body.data.id).toBe(1);
  });

  test('PUT /users/:id updates a user', async () => {
    const res = await request(app)
      .put('/users/1')
      .send({ name: 'Alice Updated' })
      .expect(200);

    expect(res.body.data.name).toBe('Alice Updated');
  });

  test('DELETE /users/:id removes a user', async () => {
    await request(app)
      .delete('/users/1')
      .expect(200);

    await request(app)
      .get('/users/1')
      .expect(404);
  });
});`} />
          <Tip icon="💡" color={D.yellow} title="Test isolation">Each test should create its own data and clean up after itself. Never assume data from another test exists. Use beforeEach to reset the database state.</Tip>
        </div>
      )}
      {tab === "auth" && (
        <div>
          <CodeBlock label="testing authenticated endpoints" code={`describe('Protected Routes', () => {
  test('returns 401 without token', async () => {
    await request(app)
      .get('/profile')
      .expect(401);
  });

  test('returns user with valid token', async () => {
    // 1. Login to get token
    const login = await request(app)
      .post('/login')
      .send({ email: 'alice@example.com', password: 'secret' });

    const token = login.body.token;

    // 2. Use token on protected route
    const res = await request(app)
      .get('/profile')
      .set('Authorization', \`Bearer \${token}\`)
      .expect(200);

    expect(res.body.user.email).toBe('alice@example.com');
  });
});`} />
          <EasyBox emoji="🔐" title="Test the unhappy path" color={D.red}>Don't just test success cases. Test 401 Unauthorized, 403 Forbidden, 404 Not Found, 400 Bad Request, and 500 errors. Your API's error responses are part of its contract — test them.</EasyBox>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What is the main advantage of Supertest over manual HTTP requests?" options={["It is faster to write", "It tests the app directly without starting a server", "It only works with Express", "It generates API documentation"]} correct={1} explain="Supertest hooks into Express directly. No server startup, no port binding, no cleanup. Tests run faster and can execute in parallel." />
          <QuizCard question="How do you send a JSON body in Supertest?" options={[".body({})", ".send({})", ".json({})", ".data({})"]} correct={1} explain=".send({}) sends a JSON body. Supertest automatically sets Content-Type: application/json when you pass an object." />
          <QuizCard question="What status code should you test for a missing resource?" options={["200", "400", "404", "500"]} correct={2} explain="404 Not Found is the correct status when a requested resource does not exist. Test this to ensure your API returns meaningful errors." />
        </div>
      )}
    </div>
  );
}
