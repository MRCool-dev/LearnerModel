import { useState } from "react";
import { D, mono, para } from "../../tokens";
import BigIdea from "../primitives/BigIdea";
import Tip from "../primitives/Tip";
import CodeBlock from "../primitives/CodeBlock";
import QuizCard from "../primitives/QuizCard";

export default function SectionRestApi() {
  const [tab, setTab] = useState("crud");
  const tabs = [
    { id: "crud", label: "📝 CRUD" },
    { id: "design", label: "🏗️ Design" },
    { id: "example", label: "💻 Full Example" },
    { id: "pagination", label: "📄 Pagination" },
    { id: "validation", label: "✅ Validation" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>A well-designed REST API uses HTTP methods and status codes consistently. Express makes building these APIs straightforward.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#14b8a622" : "transparent", border: `1px solid ${tab === t.id ? "#14b8a6" : D.outline}`, color: tab === t.id ? "#14b8a6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "crud" && (
        <div>
          <div style={{ overflowX: "auto", marginBottom: 14 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: mono, fontSize: 11 }}>
              <thead><tr>{["Action", "HTTP Method", "Endpoint", "Status"].map((h, i) => (
                <th key={i} style={{ padding: "9px 12px", background: D.surface, color: [D.muted, D.muted, D.muted, D.muted][i], textAlign: "left", borderBottom: `1px solid ${D.outline}`, fontSize: 10 }}>{h}</th>
              ))}</tr></thead>
              <tbody>
                {[["Create","POST","/api/users","201 Created"],["Read all","GET","/api/users","200 OK"],["Read one","GET","/api/users/:id","200 OK"],["Update","PUT","/api/users/:id","200 OK"],["Delete","DELETE","/api/users/:id","200 OK"]].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : D.surface + "06" }}>
                    {row.map((cell, j) => <td key={j} style={{ padding: "8px 12px", borderBottom: `1px solid ${D.outline}`, color: j === 3 ? D.greenText : D.muted }}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Tip icon="🎯" color={D.yellow} title="Use plural nouns">REST endpoints should be nouns, not verbs. Use <code>/users</code> not <code>/getUsers</code>. The HTTP method tells you the action.</Tip>
        </div>
      )}
      {tab === "design" && (
        <div>
          <BigIdea number="1" title="Status codes communicate outcome" color="#14b8a6">200 = success, 201 = created, 204 = no content, 400 = bad request, 401 = unauthorized, 403 = forbidden, 404 = not found, 500 = server error. Always send the correct status code so clients can handle responses properly.</BigIdea>
          <CodeBlock label="proper status codes" code={`res.status(200).json(data);      // OK (default)
res.status(201).json(newItem);   // Created
res.status(204).send();          // No content (deleted)
res.status(400).json({ error }); // Bad request (validation)
res.status(404).json({ error }); // Not found
res.status(500).json({ error }); // Server error`} />
          <BigIdea number="2" title="Consistent response shape" color="#3b82f6">Clients should be able to predict the response structure. A common pattern: always return JSON with either a <code>data</code> key or an <code>error</code> key. Never mix shapes.</BigIdea>
          <CodeBlock label="consistent response envelope" code={`// Success:
{ "data": { "id": 1, "name": "Alice" } }

// Error:
{ "error": "User not found", "code": "USER_NOT_FOUND" }

// Never do this — different shapes for success/error:
res.json(user);        // success → object
res.json({ error });   // error → object with error key`} />
        </div>
      )}
      {tab === "example" && (
        <div>
          <CodeBlock label="complete REST API" code={`const express = require('express');
const app = express();
app.use(express.json());

let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

// GET all
app.get('/api/users', (req, res) => {
  res.json({ data: users });
});

// GET one
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ data: user });
});

// POST — create
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json({ data: newUser });
});

// PUT — update
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;
  res.json({ data: user });
});

// DELETE
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  const deleted = users.splice(index, 1);
  res.json({ data: deleted[0] });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(3000, () => console.log('API running'));`} />
          <Tip icon="💡" color={D.yellow} title="In production">Use a real database (PostgreSQL, MongoDB), validation library (Zod, Joi), and an ORM (Prisma, Mongoose). This in-memory example is for learning the REST pattern.</Tip>
        </div>
      )}
      {tab === "pagination" && (
        <div>
          <BigIdea number="1" title="Never return unbounded lists" color="#14b8a6">Returning all records with GET /users will kill your API when you have 1 million users. Every list endpoint must be paginated. There are two main strategies: offset pagination and cursor pagination.</BigIdea>
          <CodeBlock label="offset pagination (simple, common)" code={`// GET /api/users?page=2&limit=20
app.get('/api/users', async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, parseInt(req.query.limit) || 20);
  const offset = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find().skip(offset).limit(limit),
    User.countDocuments(),
  ]);

  res.json({
    data: users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    },
  });
});

// Problem: inefficient at high offsets
// SKIP 100000 LIMIT 20 — DB scans 100020 rows!`} />
          <CodeBlock label="cursor pagination (production-grade)" code={`// GET /api/users?cursor=eyJpZCI6MTAwfQ&limit=20
// cursor = base64-encoded { id: 100 }
app.get('/api/users', async (req, res) => {
  const limit = Math.min(100, parseInt(req.query.limit) || 20);
  let where = {};

  if (req.query.cursor) {
    const { id } = JSON.parse(
      Buffer.from(req.query.cursor, 'base64').toString()
    );
    where = { id: { $gt: id } }; // start AFTER cursor
  }

  const users = await User.find(where)
    .sort({ id: 1 })
    .limit(limit + 1); // fetch one extra to detect hasNext

  const hasNext = users.length > limit;
  const items = hasNext ? users.slice(0, -1) : users;
  const nextCursor = hasNext
    ? Buffer.from(JSON.stringify({ id: items.at(-1).id })).toString('base64')
    : null;

  res.json({ data: items, nextCursor });
});

// Always O(log n) — never slows down at high pages`} />
          <Tip icon="🔑" color={D.yellow} title="When to use which">Offset: admin dashboards, simple UIs where users jump to page N. Cursor: infinite scroll, high-traffic APIs, real-time data where rows can be inserted between pages. MNCs use cursor for most production APIs.</Tip>
        </div>
      )}
      {tab === "validation" && (
        <div>
          <BigIdea number="1" title="Validate at the boundary, trust internally" color="#14b8a6">Validate every request that comes in from outside your system. Once data has been validated and entered your service layer, trust it. Don't re-validate at every function call.</BigIdea>
          <CodeBlock label="Zod validation middleware (MNC standard)" code={`const { z } = require('zod');

// Define schema once, use everywhere
const userSchemas = {
  create: z.object({
    name: z.string().min(1, 'Name required').max(100).trim(),
    email: z.string().email('Invalid email').toLowerCase(),
    role: z.enum(['user', 'admin']).default('user'),
    age: z.number().int().min(18, 'Must be 18+').max(120).optional(),
  }),

  update: z.object({
    name: z.string().min(1).max(100).trim().optional(),
    email: z.string().email().toLowerCase().optional(),
  }).refine(
    (data) => Object.keys(data).length > 0,
    { message: 'At least one field must be provided' }
  ),

  queryList: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    search: z.string().max(200).optional(),
    sortBy: z.enum(['name', 'email', 'createdAt']).default('createdAt'),
    order: z.enum(['asc', 'desc']).default('desc'),
  }),
};

// Generic validation middleware factory
const validate = (schema, source = 'body') => (req, res, next) => {
  const result = schema.safeParse(req[source]);
  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      details: result.error.flatten().fieldErrors,
    });
  }
  req[source] = result.data; // replace with cleaned data
  next();
};

// Routes
router.get('/', validate(userSchemas.queryList, 'query'), getUsers);
router.post('/', validate(userSchemas.create), createUser);
router.put('/:id', validate(userSchemas.update), updateUser);`} />
          <CodeBlock label="response envelope standard" code={`// Always respond with consistent shape
// utils/response.js

const success = (res, data, statusCode = 200, meta = {}) => {
  res.status(statusCode).json({
    success: true,
    data,
    ...meta, // pagination, count, etc.
    timestamp: new Date().toISOString(),
  });
};

const error = (res, message, statusCode = 500, details = null) => {
  res.status(statusCode).json({
    success: false,
    error: message,
    ...(details && { details }),
    timestamp: new Date().toISOString(),
  });
};

module.exports = { success, error };

// Usage in controllers:
const { success, error } = require('../utils/response');
success(res, users, 200, { count: users.length });
error(res, 'User not found', 404);`} />
          <Tip icon="🎯" color={D.yellow} title="Why Zod over Joi?">Zod is TypeScript-first — it infers static types from schemas. <code>const data = schema.parse(req.body)</code> gives you full type safety downstream. Joi predates TypeScript and requires separate type definitions. Most MNCs have standardized on Zod for new projects.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="Which status code means 'Created successfully'?" options={["200", "201", "204", "400"]} correct={1} explain="201 Created is the correct status code when a new resource is successfully created. 200 is generic OK, 204 is no content, 400 is bad request." />
          <QuizCard question="What is wrong with the endpoint GET /getAllUsers?" options={["GET is the wrong method", "The endpoint should use a noun, not a verb", "It needs a status code", "It should be POST"]} correct={1} explain="REST endpoints should be nouns (/users) not verbs (/getAllUsers). The HTTP method (GET) already indicates the action." />
          <QuizCard question="What status code should you return if a resource is not found?" options={["200", "400", "404", "500"]} correct={2} explain="404 Not Found is the standard status code when the requested resource does not exist. 400 is for bad requests, 500 is for server errors." />
          <QuizCard question="Which pagination strategy is preferred for high-traffic production APIs?" options={["Offset pagination (?page=2)", "Cursor pagination (opaque token)", "Load all records and filter client-side", "Random access pagination"]} correct={1} explain="Cursor pagination is O(log n) regardless of which page you're on. Offset pagination requires scanning all previous rows — at page 5000, OFFSET 100000 is expensive. Cursor is the MNC standard for real-time or high-volume data." />
        </div>
      )}
    </div>
  );
}
