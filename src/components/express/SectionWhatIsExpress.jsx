import { useState } from "react";
import { D, mono, para } from "../../tokens";
import BigIdea from "../primitives/BigIdea";
import EasyBox from "../primitives/EasyBox";
import Tip from "../primitives/Tip";
import CodeBlock from "../primitives/CodeBlock";
import QuizCard from "../primitives/QuizCard";

export default function SectionWhatIsExpress() {
  const [tab, setTab] = useState("story");
  const tabs = [
    { id: "story", label: "📖 The Story" },
    { id: "server", label: "🖥️ First Server" },
    { id: "why", label: "🎯 Why Express?" },
    { id: "structure", label: "🏗️ MNC Structure" },
    { id: "security", label: "🔒 Security Setup" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Express.js is the de facto standard web framework for Node.js. It is minimal, unopinionated, and powers millions of production APIs at companies like Netflix, Uber, and IBM.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#8b5cf622" : "transparent", border: `1px solid ${tab === t.id ? "#8b5cf6" : D.outline}`, color: tab === t.id ? "#8b5cf6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "story" && (
        <div>
          <BigIdea number="1" title="Node.js gave JavaScript superpowers" color="#3b82f6">In 2009, Node.js let JavaScript run on servers. But the built-in <code>http</code> module was verbose. You had to manually parse URLs, handle routing, and manage headers. Every developer was rewriting the same boilerplate.</BigIdea>
          <BigIdea number="2" title="TJ Holowaychuk built Express in 2010" color="#f59e0b">TJ Holowaychuk created Express.js as a thin layer on top of Node's <code>http</code> module. His insight: routing and middleware are the only primitives a web framework truly needs. Everything else is optional.</BigIdea>
          <BigIdea number="3" title="The middleware pattern changed everything" color="#8b5cf6">Instead of one giant request handler, Express broke processing into small, composable functions called <strong>middleware</strong>. Each middleware can inspect the request, modify it, or terminate it. This pattern became the standard for Node.js servers.</BigIdea>
          <EasyBox emoji="🎯" title="What Express actually is — one sentence" color="#8b5cf6"><strong>Express is a minimal, unopinionated web framework</strong> that provides routing, middleware, template integration, and HTTP utilities — nothing more, nothing less.</EasyBox>
          <Tip icon="🔑" color={D.yellow} title="Key insight">Express is NOT a full-stack framework like Django or Laravel. It does not dictate your database, ORM, or folder structure. It gives you routing + middleware — you choose everything else.</Tip>
        </div>
      )}
      {tab === "server" && (
        <div>
          <CodeBlock label="the simplest express server" code={`const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`} />
          <p style={para}>Four lines of logic, one route, one response. Compare this to the raw <code>http</code> module which needs ~20 lines just to parse the request body and route.</p>
          <CodeBlock label="run it" code={`node server.js
# Then visit http://localhost:3000 in your browser`} />
          <Tip icon="💡" color={D.yellow} title="req and res">Every route handler receives <code>req</code> (the request object) and <code>res</code> (the response object). Express extends Node's native objects with helpful methods like <code>res.json()</code>, <code>res.status()</code>, and <code>res.send()</code>.</Tip>
          <CodeBlock label="key response methods" code={`// Send JSON (most common in APIs)
res.status(200).json({ users: [] });

// Send string/HTML
res.status(200).send('<h1>Hello</h1>');

// No body (e.g. DELETE success)
res.status(204).end();

// Redirect
res.redirect(301, '/new-path');

// Set headers before responding
res.set('X-Request-Id', req.id);
res.status(200).json({ ok: true });`} />
        </div>
      )}
      {tab === "why" && (
        <div>
          {[
            { title: "Minimal and fast", color: "#06b6d4", icon: "⚡", desc: "Express adds almost zero overhead. A hello-world Express app can handle 20,000+ requests per second on modest hardware. It is one of the fastest web frameworks in any language." },
            { title: "Middleware ecosystem", color: "#f59e0b", icon: "🧩", desc: "Thousands of middleware packages on npm: CORS, body parsing, compression, rate limiting, authentication. Drop them in with app.use() and they just work." },
            { title: "Unopinionated flexibility", color: D.green, icon: "🔧", desc: "Want MongoDB? Use Mongoose. Want PostgreSQL? Use Prisma. Want MVC? Organize your folders that way. Express does not care — it only handles HTTP." },
            { title: "Industry standard", color: "#8b5cf6", icon: "🏢", desc: "Express is used by Netflix, Uber, IBM, and countless startups. When a job posting says 'Node.js backend experience,' they almost always mean Express experience." },
            { title: "Foundation for bigger frameworks", color: "#f43f5e", icon: "🏗️", desc: "NestJS, Sails, LoopBack, and Feathers are all built on top of Express. Learning Express deeply makes every other Node framework easier to understand." },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 10, padding: "13px 16px", background: item.color + "08", border: `1px solid ${item.color}25`, borderRadius: 9 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: mono, marginBottom: 7 }}>{item.icon} {item.title}</div>
              <p style={{ ...para, marginBottom: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      )}
      {tab === "structure" && (
        <div>
          <BigIdea number="1" title="Production folder structure that MNCs use" color="#8b5cf6">Most companies use a layered architecture: Routes → Controllers → Services → Repository/Model. Each layer has one responsibility. This makes code testable, maintainable, and easy to onboard new developers.</BigIdea>
          <CodeBlock label="production project structure" code={`src/
├── app.js           # Express app setup (no listen)
├── server.js        # Entry point: app.listen()
├── config/
│   ├── database.js  # DB connection
│   └── env.js       # Zod-validated env vars
├── routes/
│   ├── index.js     # Mount all routers
│   ├── users.js     # /api/users routes
│   └── orders.js    # /api/orders routes
├── controllers/
│   └── users.js     # Route handlers (thin)
├── services/
│   └── users.js     # Business logic
├── repositories/
│   └── users.js     # DB queries only
├── middleware/
│   ├── auth.js      # JWT verification
│   ├── validate.js  # Request validation
│   └── errorHandler.js
├── models/          # Prisma / Mongoose schemas
└── utils/
    └── asyncHandler.js`} />
          <CodeBlock label="app.js — clean setup pattern" code={`const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { morganMiddleware } = require('./middleware/logger');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security
app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(',') }));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morganMiddleware);

// Compression
app.use(compression());

// Routes
app.use('/api/v1', routes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;`} />
          <CodeBlock label="separating app from server (critical for testing)" code={`// server.js — only this file calls listen()
const app = require('./app');
const { PORT } = require('./config/env');

app.listen(PORT, () => {
  console.log(\`Server started on port \${PORT}\`);
});

// Why separate?
// Tests import 'app' directly — no port binding
// supertest(app) works without starting a real server`} />
          <Tip icon="🎯" color={D.yellow} title="MNC interview pattern">Interviewers at MNCs specifically ask about this separation. Keeping <code>app.js</code> and <code>server.js</code> separate makes integration testing clean — no port conflicts, no need to close the server.</Tip>
        </div>
      )}
      {tab === "security" && (
        <div>
          <BigIdea number="1" title="helmet.js — set security headers in one line" color="#f43f5e">helmet sets 14 security HTTP headers automatically: Content-Security-Policy, X-Frame-Options, Referrer-Policy, etc. Without helmet, browsers and security scanners flag your app as vulnerable.</BigIdea>
          <CodeBlock label="essential security middleware stack" code={`const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');

// 1. Security headers
app.use(helmet());

// 2. CORS — only allow your frontend
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || [],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));

// 3. Rate limiting — prevent brute force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests' },
});
app.use('/api/', limiter);

// Stricter limit for auth endpoints
const authLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 10 });
app.use('/api/auth/', authLimiter);

// 4. NoSQL injection prevention
app.use(mongoSanitize());

// 5. HTTP Parameter Pollution prevention
app.use(hpp());

// 6. Body size limit — prevent payload attacks
app.use(express.json({ limit: '10kb' }));`} />
          <CodeBlock label="input validation with Zod (MNC standard)" code={`const { z } = require('zod');

const createUserSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email(),
  age: z.number().int().min(18).max(120).optional(),
});

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      details: result.error.flatten().fieldErrors,
    });
  }
  req.body = result.data; // cleaned & typed data
  next();
};

// Usage:
app.post('/users', validate(createUserSchema), createUser);`} />
          <Tip icon="🔒" color={D.yellow} title="Security checklist for MNC code reviews">helmet ✓ | CORS with whitelist ✓ | Rate limiting ✓ | Input validation ✓ | SQL/NoSQL injection prevention ✓ | Body size limit ✓. Missing any one of these gets flagged in security audits.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What is Express.js?" options={["A database for Node.js applications", "A minimal web framework for Node.js", "A frontend JavaScript library like React", "A replacement for the V8 engine"]} correct={1} explain="Express is a minimal, unopinionated web framework for Node.js. It provides routing, middleware, and HTTP utilities." />
          <QuizCard question="Why should you separate app.js from server.js?" options={["To improve performance", "So tests can import the app without binding to a port", "Express requires it", "To support multiple databases"]} correct={1} explain="Separating app.js (Express setup) from server.js (app.listen) lets integration tests import the app directly with supertest without starting a real server or dealing with port conflicts." />
          <QuizCard question="What does helmet.js do in Express?" options={["Handles database connections", "Sets security-related HTTP response headers", "Validates request bodies", "Manages JWT tokens"]} correct={1} explain="helmet sets secure HTTP headers like Content-Security-Policy, X-Frame-Options, and others that protect against common web attacks. It is the first middleware you should add to any production Express app." />
          <QuizCard question="What is the correct order for registering middleware in Express?" options={["Routes first, then body parsers", "Error handler first, then security middleware", "Security headers → body parsers → routes → 404 handler → error handler", "Any order works"]} correct={2} explain="Express middleware runs in registration order. Security headers should be first, body parsers before routes that read req.body, and the error handler must be last (after all routes)." />
        </div>
      )}
    </div>
  );
}
