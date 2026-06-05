import { useState } from "react";
import { D, mono, para } from "../../tokens";
import BigIdea from "../primitives/BigIdea";
import EasyBox from "../primitives/EasyBox";
import Tip from "../primitives/Tip";
import CodeBlock from "../primitives/CodeBlock";
import QuizCard from "../primitives/QuizCard";

export default function SectionRouting() {
  const [tab, setTab] = useState("methods");
  const tabs = [
    { id: "methods", label: "📬 HTTP Methods" },
    { id: "params", label: "🔗 URL Params" },
    { id: "query", label: "❓ Query Strings" },
    { id: "router", label: "📂 Router Module" },
    { id: "advanced", label: "🚀 Advanced Patterns" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Routing determines how an application responds to a client request at a particular endpoint (URI) and HTTP method.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#3b82f622" : "transparent", border: `1px solid ${tab === t.id ? "#3b82f6" : D.outline}`, color: tab === t.id ? "#3b82f6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "methods" && (
        <div>
          <CodeBlock label="all HTTP methods" code={`const express = require('express');
const app = express();

// GET — retrieve data
app.get('/users', (req, res) => {
  res.json({ message: 'Get all users' });
});

// POST — create data
app.post('/users', (req, res) => {
  res.status(201).json({ message: 'User created' });
});

// PUT — full update
app.put('/users/:id', (req, res) => {
  res.json({ message: \`User \${req.params.id} updated\` });
});

// PATCH — partial update
app.patch('/users/:id', (req, res) => {
  res.json({ message: \`User \${req.params.id} partially updated\` });
});

// DELETE — remove data
app.delete('/users/:id', (req, res) => {
  res.json({ message: \`User \${req.params.id} deleted\` });
});

app.listen(3000);`} />
          <Tip icon="🎯" color={D.yellow} title="REST mapping">GET = read, POST = create, PUT = replace, PATCH = modify, DELETE = remove. Using the correct HTTP method makes your API predictable and cacheable.</Tip>
          <CodeBlock label="test with curl" code={`curl http://localhost:3000/users              # GET
curl -X POST http://localhost:3000/users      # POST
curl -X PUT http://localhost:3000/users/5     # PUT
curl -X PATCH http://localhost:3000/users/5   # PATCH
curl -X DELETE http://localhost:3000/users/5  # DELETE`} />
        </div>
      )}
      {tab === "params" && (
        <div>
          <CodeBlock label="route parameters" code={`// :id is a route parameter
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;  // always a string
  res.json({ userId });
});

// Multiple parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

// Optional parameter
app.get('/users/:id?', (req, res) => {
  if (req.params.id) {
    res.json({ message: \`User \${req.params.id}\` });
  } else {
    res.json({ message: 'All users' });
  }
});`} />
          <EasyBox emoji="⚠️" title="req.params values are ALWAYS strings" color={D.red}>Even if the URL is <code>/users/42</code>, <code>req.params.id</code> is the string <code>"42"</code>. If you need a number, use <code>parseInt(req.params.id)</code> or <code>Number(req.params.id)</code>.</EasyBox>
        </div>
      )}
      {tab === "query" && (
        <div>
          <CodeBlock label="query strings" code={`// GET /search?q=express&limit=10
app.get('/search', (req, res) => {
  const query = req.query.q;      // 'express'
  const limit = req.query.limit;  // '10' (string!)
  res.json({ query, limit });
});

// Express automatically parses query strings
// No middleware needed for basic query parsing`} />
          <Tip icon="💡" color={D.yellow} title="req.query is also strings">Just like <code>req.params</code>, values in <code>req.query</code> are strings. <code>?limit=10</code> gives <code>"10"</code>, not <code>10</code>. Convert with <code>parseInt()</code> when needed.</Tip>
        </div>
      )}
      {tab === "router" && (
        <div>
          <BigIdea number="1" title="express.Router() — modularize your routes" color="#3b82f6">As apps grow, keeping all routes in one file becomes unmanageable. <code>express.Router()</code> creates a mini-app with its own routes and middleware. You mount it at a path prefix in your main app.</BigIdea>
          <CodeBlock label="routes/users.js — standalone router" code={`const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/auth');
const usersController = require('../controllers/users');

// GET /api/users
router.get('/', usersController.getAll);

// POST /api/users
router.post('/', auth, usersController.create);

// GET /api/users/:id
router.get('/:id', usersController.getById);

// PUT /api/users/:id
router.put('/:id', auth, usersController.update);

// DELETE /api/users/:id — admin only
router.delete('/:id', auth, adminOnly, usersController.remove);

module.exports = router;`} />
          <CodeBlock label="routes/index.js — mount all routers" code={`const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/orders', require('./orders'));
router.use('/products', require('./products'));
router.use('/auth', require('./auth'));

module.exports = router;`} />
          <CodeBlock label="app.js — single mount point" code={`const routes = require('./routes');

// All API routes under /api/v1
app.use('/api/v1', routes);

// Result: /api/v1/users, /api/v1/orders, etc.`} />
          <Tip icon="🎯" color={D.yellow} title="Router-level middleware">You can add middleware to a specific router: <code>router.use(auth)</code> makes all routes in that router require authentication. Use this for protected route groups instead of adding <code>auth</code> to every individual route.</Tip>
        </div>
      )}
      {tab === "advanced" && (
        <div>
          <BigIdea number="1" title="Chained route handlers for same path" color="#8b5cf6">Use <code>app.route()</code> to chain GET, POST, PUT on the same path. Cleaner than three separate calls and avoids typos when the path changes.</BigIdea>
          <CodeBlock label="chained route handlers" code={`// Instead of:
app.get('/users/:id', getUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);

// Use route chaining:
app.route('/users/:id')
  .get(getUser)
  .put(auth, updateUser)
  .delete(auth, adminOnly, deleteUser);`} />
          <CodeBlock label="route versioning — critical in production APIs" code={`const v1Router = require('./routes/v1');
const v2Router = require('./routes/v2');

// Old clients keep working
app.use('/api/v1', v1Router);

// New clients use v2
app.use('/api/v2', v2Router);

// v2 changes: different response shape, new fields
// Never break v1 consumers when releasing v2`} />
          <CodeBlock label="param middleware — DRY resource loading" code={`// router.param runs BEFORE the route handler
// when a named param is in the path
router.param('userId', async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    req.targetUser = user; // attach to req
    next();
  } catch (err) {
    next(err);
  }
});

// Now ALL routes with :userId auto-load the user
router.get('/:userId', (req, res) => res.json(req.targetUser));
router.put('/:userId', auth, updateUser);  // req.targetUser available here too`} />
          <CodeBlock label="wildcard routes and 404 handling" code={`// Catch unmatched routes — must come AFTER all other routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    method: req.method,
    path: req.originalUrl,
  });
});

// Note: express.Router() also supports wildcards
router.get('/users/*', (req, res) => {
  res.json({ path: req.params[0] }); // everything after /users/
});`} />
          <Tip icon="🔑" color={D.yellow} title="MNC best practice — always version your APIs">Every public or internal API at MNCs is versioned from day one. When you break backwards compatibility, increment the version. Your current consumers keep working forever on v1. New features go in v2.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="Which HTTP method should you use to create a new resource?" options={["GET", "POST", "PUT", "DELETE"]} correct={1} explain="POST is the standard HTTP method for creating new resources. GET reads, PUT updates, DELETE removes." />
          <QuizCard question="What is the value of req.params.id for the URL /users/42?" options={["42 (number)", "'42' (string)", "undefined", "null"]} correct={1} explain="req.params values are ALWAYS strings. req.params.id would be '42', not the number 42." />
          <QuizCard question="How do you access query string ?page=2 in Express?" options={["req.query.page", "req.params.page", "req.body.page", "req.headers.page"]} correct={0} explain="Express parses query strings automatically into req.query. req.query.page would be '2'." />
          <QuizCard question="What does express.Router() provide?" options={["A database connection pool", "A mini-app with isolated routes and middleware", "A way to handle WebSockets", "An alternative to app.listen()"]} correct={1} explain="express.Router() creates a mini Express application with its own route and middleware stack. You mount it at a prefix using app.use('/path', router), enabling modular route organization." />
        </div>
      )}
    </div>
  );
}
