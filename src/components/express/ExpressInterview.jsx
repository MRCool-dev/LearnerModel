import { useState } from "react";
import { D, mono, para, serif } from "../../tokens";
import CodeBlock from "../primitives/CodeBlock";

export default function ExpressInterview() {
  const [open, setOpen] = useState(null);
  const qs = [
    { q: "What is Express.js and why is it popular?", level: "Junior", color: D.green,
      a: `Express.js is a minimal, unopinionated web framework for Node.js. It provides a thin layer of fundamental web application features on top of Node's built-in http module.

Why it's popular:
1. Minimal overhead — one of the fastest frameworks available
2. Middleware ecosystem — thousands of reusable middleware packages
3. Unopinionated — you choose your database, ORM, and architecture
4. Industry standard — virtually every Node.js job expects Express knowledge
5. Foundation for larger frameworks like NestJS and Sails

Key distinction: Express is not a full-stack framework. It only handles HTTP routing and middleware. You bring everything else.`,
      code: `// Express vs raw Node http:

// Raw Node (20+ lines for basic routing)
http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.end('Hello');
  }
});

// Express (3 lines)
app.get('/', (req, res) => res.send('Hello'));` },
    { q: "Explain the middleware pattern in Express.", level: "Junior", color: D.green,
      a: `Middleware functions are functions that have access to the request object, response object, and the next middleware function.

They can:
1. Execute any code
2. Modify the request and response objects
3. End the request-response cycle
4. Call the next middleware with next()

The execution order is determined by the order middleware is registered with app.use(). Each middleware either calls next() to pass control, or sends a response to terminate.

Error-handling middleware is special: it has 4 parameters (err, req, res, next) and Express routes errors to it automatically.`,
      code: `function logger(req, res, next) {
  console.log(req.method, req.path);
  next(); // pass to next middleware
}

function auth(req, res, next) {
  if (!req.headers.token) {
    return res.status(401).send('Unauthorized');
  }
  req.user = decodeToken(req.headers.token);
  next();
}

app.use(logger);  // global
app.use(auth);    // global
app.get('/data', (req, res) => {
  res.json({ user: req.user }); // req.user set by auth
});` },
    { q: "How do you handle errors in asynchronous Express route handlers?", level: "Mid", color: "#3b82f6",
      a: `Express does NOT automatically catch errors from async functions. If an async route handler throws and you don't catch it, the error is lost and the request hangs.

Three solutions:

1. try/catch + next(err):
   Wrap async code in try/catch and pass errors to next().

2. async wrapper utility:
   A higher-order function that catches promise rejections and calls next(err).

3. express-async-errors:
   A patch that makes Express catch async errors automatically. Just require it once.`,
      code: `// Solution 1: try/catch
app.get('/user/:id', async (req, res, next) => {
  try {
    const user = await db.findUser(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Solution 2: async wrapper (recommended)
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
app.get('/user/:id', asyncHandler(async (req, res) => {
  const user = await db.findUser(req.params.id);
  res.json(user);
}));

// Solution 3: express-async-errors
require('express-async-errors');
// Now all async errors are caught automatically` },
    { q: "What is the difference between app.use() and app.get()?", level: "Junior", color: D.green,
      a: `app.use(middleware) registers middleware that runs on EVERY HTTP method and path that matches (or all paths if no path is given). It's for global middleware like body parsers, loggers, and CORS.

app.get(path, handler) registers a route handler specifically for GET requests to the exact path. It's for defining API endpoints.

Key differences:
- app.use() matches the BEGINNING of the path. app.use('/api', handler) matches /api, /api/users, /api/anything.
- app.get() matches the EXACT path (unless using parameters like /users/:id).
- app.use() is for middleware. app.get/post/put/delete() are for route handlers.

You can combine them: app.get('/protected', authMiddleware, routeHandler).`,
      code: `app.use(express.json());       // runs on all routes, all methods
app.use('/api', apiRouter);    // runs on /api/*

app.get('/users', handler);    // only GET /users
app.post('/users', handler);   // only POST /users

// Combined:
app.get('/admin', checkAuth, checkAdmin, getAdminData);` },
    { q: "How does JWT authentication work in an Express API?", level: "Mid", color: "#3b82f6",
      a: `JWT (JSON Web Token) authentication in Express follows a three-step flow:

1. Login: The client sends credentials. The server verifies them and creates a JWT using jwt.sign(payload, SECRET, options). The token contains the user ID and is cryptographically signed.

2. Storage: The client stores the token (usually in memory or localStorage for SPAs, or httpOnly cookies for better security).

3. Verification: On every protected request, the client sends the token in the Authorization: Bearer <token> header. The server verifies the signature with jwt.verify() and attaches the decoded user to req.user.

Security notes: JWT payloads are Base64-encoded (readable by anyone), so never put secrets inside. Always use HTTPS in production to prevent token interception.`,
      code: `// Login — create token
app.post('/login', async (req, res) => {
  const user = await verifyCredentials(req.body);
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({ token });
});

// Middleware — verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

// Protected route
app.get('/profile', verifyToken, (req, res) => {
  res.json({ user: req.user });
});` },
    { q: "What makes a REST API 'RESTful'? Give Express examples.", level: "Mid", color: "#3b82f6",
      a: `A RESTful API follows these principles:

1. Resources identified by URIs: /users, /posts/42
2. HTTP methods define operations: GET=read, POST=create, PUT=replace, PATCH=modify, DELETE=remove
3. Stateless: each request contains all info needed. No server-side session.
4. Consistent status codes: 200 OK, 201 Created, 400 Bad Request, 404 Not Found
5. Representation: resources are returned as JSON (or XML)

In Express, this means using app.get('/users'), app.post('/users'), app.put('/users/:id'), etc., with proper status codes and JSON responses.`,
      code: `// RESTful Express API
app.get('/api/users', getAllUsers);          // Read all
app.get('/api/users/:id', getUser);          // Read one
app.post('/api/users', createUser);          // Create
app.put('/api/users/:id', updateUser);       // Full update
app.patch('/api/users/:id', patchUser);      // Partial update
app.delete('/api/users/:id', deleteUser);    // Delete

// Status codes
res.status(200).json({ data: users });       // OK
res.status(201).json({ data: newUser });     // Created
res.status(400).json({ error: 'Invalid' });  // Bad request
res.status(404).json({ error: 'Not found' }); // Not found` },
  ];
  return (
    <div>
      <p style={para}>These questions cover Express fundamentals, middleware internals, authentication, and API design. Know these for any backend interview.</p>
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
