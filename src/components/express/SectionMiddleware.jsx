import { useState } from "react";
import { D, mono, para } from "../../tokens";
import BigIdea from "../primitives/BigIdea";
import EasyBox from "../primitives/EasyBox";
import Tip from "../primitives/Tip";
import CodeBlock from "../primitives/CodeBlock";
import QuizCard from "../primitives/QuizCard";
import MiddlewareOrderDemo from "../demos/MiddlewareOrderDemo";

export default function SectionMiddleware() {
  const [tab, setTab] = useState("concept");
  const tabs = [
    { id: "concept", label: "🧠 Concept" },
    { id: "examples", label: "💡 Examples" },
    { id: "order", label: "📊 Execution Order" },
    { id: "demo", label: "🧪 Live Demo" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Middleware functions have access to the request object, the response object, and the next middleware function in the cycle. They are the heart of Express.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#f59e0b22" : "transparent", border: `1px solid ${tab === t.id ? "#f59e0b" : D.outline}`, color: tab === t.id ? "#f59e0b" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "concept" && (
        <div>
          <BigIdea number="1" title="Middleware is just a function with (req, res, next)" color="#f59e0b">A middleware function takes three arguments: the request object, the response object, and <code>next</code> — a function that passes control to the next middleware. If you forget to call <code>next()</code>, the request hangs forever.</BigIdea>
          <CodeBlock label="middleware anatomy" code={`function myMiddleware(req, res, next) {
  // Do something with req or res
  console.log('Request URL:', req.url);

  // Pass control to next middleware
  next();

  // OR terminate the request
  // res.status(403).send('Forbidden');
}`} />
          <BigIdea number="2" title="Middleware can modify req and res" color="#3b82f6">Middleware functions can add properties to <code>req</code> or <code>res</code> that later middleware can read. This is how authentication middleware attaches <code>req.user</code> for route handlers to use.</BigIdea>
          <EasyBox emoji="🔄" title="The middleware cycle" color="#f59e0b">Request → Middleware 1 → Middleware 2 → Route Handler → Response. Each middleware can either call <code>next()</code> to continue, or call <code>res.send()</code> to end the response early.</EasyBox>
        </div>
      )}
      {tab === "examples" && (
        <div>
          <CodeBlock label="request logger middleware" code={`const logger = (req, res, next) => {
  console.log(\`\${new Date().toISOString()} — \${req.method} \${req.path}\`);
  next(); // pass control
};

app.use(logger); // applies to ALL routes`} />
          <CodeBlock label="body parser middleware (built-in)" code={`// Parse JSON request bodies
app.use(express.json());

// Now req.body contains parsed JSON
app.post('/users', (req, res) => {
  console.log(req.body); // { name: 'John', age: 30 }
  res.json({ received: req.body });
});`} />
          <CodeBlock label="authentication middleware" code={`const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === 'secret-key-123') {
    next(); // authorized, continue
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Apply to specific route
app.get('/protected', checkApiKey, (req, res) => {
  res.json({ message: 'Secret data' });
});`} />
          <Tip icon="🔑" color={D.yellow} title="Order matters">Middleware is executed in the order it is registered with <code>app.use()</code>. Put <code>express.json()</code> before routes that need <code>req.body</code>. Put authentication before protected routes.</Tip>
        </div>
      )}
      {tab === "order" && (
        <div>
          <CodeBlock label="middleware runs in definition order" code={`app.use((req, res, next) => {
  console.log('1. First');
  next();
});

app.use((req, res, next) => {
  console.log('2. Second');
  next();
});

app.get('/', (req, res) => {
  console.log('3. Route handler');
  res.send('Done');
});

// Output when visiting /:
// 1. First
// 2. Second
// 3. Route handler`} />
          <CodeBlock label="conditional middleware" code={`const auth = (req, res, next) => { ... };

// No middleware
app.get('/public', (req, res) => res.send('Public'));

// Single middleware
app.get('/dashboard', auth, (req, res) => res.send('Dashboard'));

// Multiple middleware
app.post('/admin', auth, adminOnly, (req, res) => {
  res.send('Admin panel');
});`} />
          <EasyBox emoji="⚠️" title="Missing next() hangs the request" color={D.red}>If a middleware does not call <code>next()</code> AND does not send a response, the client will wait forever. Always end the request or call next().</EasyBox>
        </div>
      )}
      {tab === "demo" && <MiddlewareOrderDemo />}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What happens if middleware does NOT call next() or res.send()?" options={["The server crashes", "The request hangs forever", "Express skips to the route handler", "The next middleware runs anyway"]} correct={1} explain="If middleware doesn't call next() and doesn't send a response, the client's request will hang indefinitely with no response." />
          <QuizCard question="How do you make middleware run on every route?" options={["app.get(middleware)", "app.use(middleware)", "app.all(middleware)", "app.route(middleware)"]} correct={1} explain="app.use(middleware) registers middleware globally — it runs on every incoming request, in the order it was defined." />
          <QuizCard question="What are the three arguments of a middleware function?" options={["(req, res, done)", "(req, res, next)", "(request, response, continue)", "(req, res, callback)"]} correct={1} explain="Express middleware takes (req, res, next). Call next() to pass control to the next middleware in the chain." />
        </div>
      )}
    </div>
  );
}
