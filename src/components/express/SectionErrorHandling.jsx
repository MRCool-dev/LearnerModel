import { useState } from "react";
import { D, mono, para } from "../../tokens";
import BigIdea from "../primitives/BigIdea";
import EasyBox from "../primitives/EasyBox";
import Tip from "../primitives/Tip";
import CodeBlock from "../primitives/CodeBlock";
import QuizCard from "../primitives/QuizCard";

export default function SectionErrorHandling() {
  const [tab, setTab] = useState("sync");
  const tabs = [
    { id: "sync", label: "⚡ Sync Errors" },
    { id: "async", label: "🔄 Async Errors" },
    { id: "patterns", label: "📐 Patterns" },
    { id: "production", label: "🏭 Production" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Error handling in Express is done via special middleware with four arguments: (err, req, res, next). This catches errors from any preceding middleware or route handler.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#f43f5e22" : "transparent", border: `1px solid ${tab === t.id ? "#f43f5e" : D.outline}`, color: tab === t.id ? "#f43f5e" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "sync" && (
        <div>
          <CodeBlock label="basic error handling middleware" code={`app.get('/divide/:a/:b', (req, res, next) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);

  if (b === 0) {
    return next(new Error('Cannot divide by zero'));
  }

  res.json({ result: a / b });
});

// Error handler MUST have 4 parameters!
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});`} />
          <Tip icon="⚠️" color={D.yellow} title="The 4-parameter rule">Express identifies error-handling middleware by checking if the function has exactly 4 parameters. If you write <code>(err, req, res)</code> with only 3, Express treats it as regular middleware and errors will crash your app.</Tip>
          <CodeBlock label="test it" code={`curl http://localhost:3000/divide/10/2   # { result: 5 }
curl http://localhost:3000/divide/10/0   # { error: "Cannot divide by zero" }`} />
        </div>
      )}
      {tab === "async" && (
        <div>
          <CodeBlock label="async errors must be passed to next()" code={`app.get('/user/:id', async (req, res, next) => {
  try {
    const user = await db.findUser(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    next(err); // pass to error handler
  }
});`} />
          <EasyBox emoji="🎯" title="Async/await trap" color={D.red}>If an async route handler throws and you don't catch it, the error is lost and the request hangs. ALWAYS wrap async code in try/catch and call next(err), OR use an async wrapper utility.</EasyBox>
          <CodeBlock label="async wrapper utility (recommended)" code={`const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Now you can write clean async routes:
app.get('/user/:id', asyncHandler(async (req, res) => {
  const user = await db.findUser(req.params.id);
  res.json(user); // errors auto-caught!
}));`} />
          <Tip icon="💡" color={D.yellow} title="express-async-errors">The npm package <code>express-async-errors</code> patches Express to automatically catch async errors. Just require it at the top: <code>require('express-async-errors')</code>. Then you never need try/catch or wrappers.</Tip>
        </div>
      )}
      {tab === "patterns" && (
        <div>
          <CodeBlock label="production error handler" code={`app.use((err, req, res, next) => {
  // Log the full error for debugging
  console.error(err.stack);

  // Don't leak stack traces in production
  const isDev = process.env.NODE_ENV === 'development';

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(isDev && { stack: err.stack }),
  });
});`} />
          <CodeBlock label="custom error class" code={`class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = String(statusCode).startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Usage:
if (!user) throw new AppError('User not found', 404);

// Error handler checks:
if (err.isOperational) {
  res.status(err.statusCode).json({ error: err.message });
} else {
  res.status(500).json({ error: 'Something went wrong' });
}`} />
        </div>
      )}
      {tab === "production" && (
        <div>
          <BigIdea number="1" title="Operational vs Programmer errors" color="#f43f5e">Operational errors are expected: user not found, validation failed, DB timeout. Programmer errors are bugs: undefined is not a function, can't read property of null. Handle operational errors gracefully. For programmer errors, crash and let PM2 restart.</BigIdea>
          <CodeBlock label="complete production error handling system" code={`// utils/AppError.js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode < 500 ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Convenience factory methods
AppError.notFound = (resource) =>
  new AppError(\`\${resource} not found\`, 404);
AppError.unauthorized = (msg = 'Authentication required') =>
  new AppError(msg, 401);
AppError.forbidden = (msg = 'Insufficient permissions') =>
  new AppError(msg, 403);
AppError.badRequest = (msg) => new AppError(msg, 400);
AppError.conflict = (msg) => new AppError(msg, 409);

module.exports = AppError;`} />
          <CodeBlock label="middleware/errorHandler.js — full production handler" code={`const AppError = require('../utils/AppError');

// Map known DB/library errors to AppError
const handleJWTError = () => AppError.unauthorized('Invalid token');
const handleJWTExpiredError = () => AppError.unauthorized('Token expired');
const handleValidationError = (err) => new AppError(
  Object.values(err.errors).map(e => e.message).join(', '),
  400
);
const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  return new AppError(\`\${field} already exists\`, 409);
};

const sendError = (err, req, res) => {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    // Only send safe info to clients
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        error: err.message,
      });
    }
    // Programmer error: don't leak details
    console.error('PROGRAMMER ERROR', err);
    return res.status(500).json({
      status: 'error',
      error: 'Something went wrong',
    });
  }

  // Development: full detail
  res.status(err.statusCode || 500).json({
    status: err.status,
    error: err.message,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  let error = { ...err, message: err.message };

  // Transform known errors
  if (err.name === 'JsonWebTokenError') error = handleJWTError();
  if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();
  if (err.name === 'ValidationError') error = handleValidationError(err);
  if (err.code === 11000) error = handleDuplicateKeyError(err);

  sendError(error, req, res);
};`} />
          <CodeBlock label="handling uncaught exceptions and unhandled rejections" code={`// server.js — global safety net
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION — shutting down', err);
  process.exit(1); // PM2 will restart
});

const server = app.listen(PORT);

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION — shutting down', err);
  server.close(() => process.exit(1)); // graceful shutdown
});

// Graceful shutdown for SIGTERM (Docker, Kubernetes)
process.on('SIGTERM', () => {
  console.log('SIGTERM received — draining connections');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});`} />
          <Tip icon="🎯" color={D.yellow} title="MNC interview: what happens after an unhandled rejection?">The correct answer: log it, close the HTTP server gracefully (stop accepting new requests), then exit with code 1. Let PM2/Kubernetes restart the process. Never swallow unhandled rejections silently — they indicate bugs.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="How many parameters does an error-handling middleware have?" options={["2", "3", "4", "5"]} correct={2} explain="Express error-handling middleware MUST have exactly 4 parameters: (err, req, res, next). Express uses the arity (parameter count) to identify it." />
          <QuizCard question="What happens if an async route handler throws without try/catch?" options={["Express catches it automatically", "The error is lost and the request hangs", "The server crashes immediately", "The error handler middleware catches it"]} correct={1} explain="Without try/catch or an async wrapper, thrown errors in async handlers are lost promises. The request hangs and the client gets no response." />
          <QuizCard question="What does the asyncHandler utility do?" options={["Makes sync functions async", "Wraps the route so .catch(next) handles errors", "Replaces express.json()", "Creates a new Express app"]} correct={1} explain="asyncHandler catches any rejected promise from the async function and passes the error to next(err), which routes it to your error-handling middleware." />
          <QuizCard question="What is the difference between an operational error and a programmer error?" options={["Operational errors are in production, programmer errors are in development", "Operational errors are expected (404, validation) — programmer errors are bugs (undefined is not a function)", "Operational errors crash the app, programmer errors don't", "There is no difference"]} correct={1} explain="Operational errors are predictable: user not found, invalid input, DB timeout. Handle them gracefully with error responses. Programmer errors are bugs — crash the process and let PM2 restart it." />
        </div>
      )}
    </div>
  );
}
