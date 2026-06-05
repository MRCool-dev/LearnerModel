import { D, mono, para, serif } from "../../tokens";

export default function ExpressKillNotes() {
  const groups = [
    { title: "Express Basics", color: "#8b5cf6", icon: "🚂", kills: ["Express is a minimal web framework built on Node's http module.", "app.listen(PORT) starts the server. app.use() registers middleware.", "req = request object, res = response object, next = pass to next middleware.", "res.send() can send strings, objects, or buffers. res.json() always sends JSON.", "res.status(code) sets the HTTP status. Must call before res.send() or res.json().", "Express routes are matched in the order they are defined. First match wins."] },
    { title: "Routing", color: "#3b82f6", icon: "🛣️", kills: ["app.get('/', handler) — match GET requests to the root path.", "Route parameters: '/users/:id' → req.params.id (always a string).", "Query strings: '?page=2' → req.query.page (always a string).", "app.all('/path', handler) — matches ALL HTTP methods.", "app.route('/path').get(...).post(...).put(...) — chain methods for same path.", "Use express.Router() to modularize routes into separate files."] },
    { title: "Middleware", color: "#f59e0b", icon: "🧩", kills: ["Middleware = function(req, res, next). Must call next() or end the response.", "app.use(middleware) — global. app.get('/path', middleware, handler) — route-specific.", "express.json() parses JSON bodies. express.urlencoded() parses form data.", "Middleware runs in definition order. Order matters deeply.", "Error middleware has 4 args: (err, req, res, next). Express checks arity = 4.", "You can have multiple middleware per route: app.get('/', auth, validate, handler)."] },
    { title: "Error Handling", color: "#f43f5e", icon: "🛡️", kills: ["Sync errors in route handlers are caught by Express automatically.", "Async errors MUST be passed to next(err) or the request hangs.", "Use an async wrapper: fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next).", "The error handler should be the LAST middleware registered.", "Never leak stack traces in production. Check NODE_ENV before sending stack.", "Custom error classes (AppError) let you distinguish operational vs programming errors."] },
    { title: "Authentication", color: "#06b6d4", icon: "🔐", kills: ["JWT = JSON Web Token. Signed, not encrypted. Don't put secrets in the payload.", "Login: jwt.sign(payload, SECRET, { expiresIn: '1h' }).", "Verify: jwt.verify(token, SECRET, callback) or use a try/catch wrapper.", "Standard header: Authorization: Bearer <token>.", "Auth middleware attaches req.user so routes know who is logged in.", "Always return 401 for missing/invalid tokens, 403 for valid token but insufficient permissions."] },
    { title: "REST API Design", color: "#14b8a6", icon: "🌐", kills: ["Use plural nouns for resources: /users, /posts, /orders.", "HTTP methods define actions: GET=read, POST=create, PUT=replace, PATCH=modify, DELETE=remove.", "Return proper status codes: 200, 201, 204, 400, 401, 403, 404, 500.", "Use consistent response envelopes: { data: ... } for success, { error: ... } for failure.", "Validate input before processing. Return 400 for validation errors.", "Paginate list endpoints: GET /users?page=2&limit=20."] },
  ];
  return (
    <div>
      <p style={para}>The precise facts that matter most — for building APIs, for debugging, for interviews.</p>
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
