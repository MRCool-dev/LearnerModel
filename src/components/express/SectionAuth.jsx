import { useState } from "react";
import { D, mono, para } from "../../tokens";
import BigIdea from "../primitives/BigIdea";
import EasyBox from "../primitives/EasyBox";
import Tip from "../primitives/Tip";
import CodeBlock from "../primitives/CodeBlock";
import QuizCard from "../primitives/QuizCard";
import JwtAuthDemo from "../demos/JwtAuthDemo";

export default function SectionAuth() {
  const [tab, setTab] = useState("jwt");
  const tabs = [
    { id: "jwt", label: "🔑 JWT Basics" },
    { id: "middleware", label: "🛡️ Auth Middleware" },
    { id: "refresh", label: "🔄 Refresh Tokens" },
    { id: "rbac", label: "👮 RBAC" },
    { id: "demo", label: "🧪 Live Demo" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Authentication verifies who a user is. In Express APIs, JSON Web Tokens (JWT) are the most common authentication mechanism.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#06b6d422" : "transparent", border: `1px solid ${tab === t.id ? "#06b6d4" : D.outline}`, color: tab === t.id ? "#06b6d4" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "jwt" && (
        <div>
          <BigIdea number="1" title="JWT = JSON Web Token" color="#06b6d4">A JWT is a signed string that contains user information. It has three parts separated by dots: <strong>Header.Payload.Signature</strong>. The server signs the token with a secret key. If someone tampers with the payload, the signature no longer matches and the token is rejected.</BigIdea>
          <CodeBlock label="JWT login flow" code={`const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET; // keep this secret!

// 1. User logs in — server creates a token
app.post('/login', (req, res) => {
  // Verify username/password...
  const user = { id: 1, name: 'Alice' };
  const token = jwt.sign(user, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// 2. Client sends token in every request:
// Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

// 3. Server verifies token on protected routes`} />
          <Tip icon="🔒" color={D.yellow} title="Never put secrets in JWT">The JWT payload is Base64-encoded, not encrypted. Anyone can read it. Never put passwords, credit cards, or other secrets in the payload. Only put user ID and permissions.</Tip>
        </div>
      )}
      {tab === "middleware" && (
        <div>
          <CodeBlock label="verify token middleware" code={`const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token.' });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = decoded; // attach user to request
    next();
  });
};

// Public route
app.get('/public', (req, res) => {
  res.json({ message: 'Anyone can see this' });
});

// Protected route
app.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'Your profile', user: req.user });
});`} />
          <CodeBlock label="test with curl" code={`# 1. Login to get token
curl -X POST http://localhost:3000/login
# → { "token": "eyJhbGc..." }

# 2. Use token to access protected route
curl -H "Authorization: Bearer eyJhbGc..." \\
  http://localhost:3000/profile`} />
          <EasyBox emoji="🎯" title="req.user pattern" color="#06b6d4">Authentication middleware attaches <code>req.user</code> so downstream route handlers know who is logged in. This pattern is used in virtually every Express authentication system.</EasyBox>
        </div>
      )}
      {tab === "refresh" && (
        <div>
          <BigIdea number="1" title="Short-lived access tokens + long-lived refresh tokens" color="#06b6d4">Access tokens expire in 15 minutes — if stolen, the attacker has a short window. Refresh tokens live for days and are stored securely in an httpOnly cookie (not localStorage). To get a new access token, you hit /auth/refresh.</BigIdea>
          <CodeBlock label="refresh token flow implementation" code={`const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// Login — issue both tokens
app.post('/auth/login', async (req, res) => {
  const user = await validateCredentials(req.body);

  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    ACCESS_SECRET,
    { expiresIn: '15m' }  // short-lived!
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  // Store refresh token hash in DB for revocation
  await db.query(
    'INSERT INTO refresh_tokens (user_id, token_hash) VALUES ($1, $2)',
    [user.id, hashToken(refreshToken)]
  );

  // Refresh token in httpOnly cookie (secure, not accessible to JS)
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({ accessToken });
});

// Refresh — get new access token
app.post('/auth/refresh', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: 'No refresh token' });

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

    // Verify it's in DB (not revoked)
    const stored = await db.query(
      'SELECT * FROM refresh_tokens WHERE user_id = $1 AND token_hash = $2',
      [decoded.userId, hashToken(refreshToken)]
    );
    if (!stored.rows.length) return res.status(401).json({ error: 'Token revoked' });

    // Issue new access token
    const accessToken = jwt.sign(
      { userId: decoded.userId },
      ACCESS_SECRET,
      { expiresIn: '15m' }
    );

    res.json({ accessToken });
  } catch {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});

// Logout — revoke refresh token
app.post('/auth/logout', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    await db.query('DELETE FROM refresh_tokens WHERE token_hash = $1',
      [hashToken(refreshToken)]);
  }
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
});`} />
          <Tip icon="🔒" color={D.yellow} title="Why httpOnly cookies for refresh tokens?">localStorage is accessible to JavaScript — XSS attacks can steal it. httpOnly cookies are invisible to JavaScript. Combined with sameSite=strict (prevents CSRF), this is the most secure way to store refresh tokens.</Tip>
        </div>
      )}
      {tab === "rbac" && (
        <div>
          <BigIdea number="1" title="Role-Based Access Control (RBAC)" color="#06b6d4">RBAC assigns permissions based on roles. Users have roles (admin, editor, viewer). Roles have permissions (create:post, delete:any). This is far more maintainable than checking user IDs individually.</BigIdea>
          <CodeBlock label="RBAC middleware implementation" code={`// middleware/authorize.js

// Simple role check
const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      error: 'Insufficient permissions',
      required: roles,
      current: req.user.role,
    });
  }
  next();
};

// Permission-based (more granular)
const permissions = {
  admin: ['read:any', 'create:any', 'update:any', 'delete:any'],
  editor: ['read:any', 'create:own', 'update:own'],
  viewer: ['read:any'],
};

const requirePermission = (action) => (req, res, next) => {
  const userPermissions = permissions[req.user?.role] || [];
  if (!userPermissions.includes(action)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

// Ownership check — ensure users can only modify their own resources
const requireOwnership = (getResourceUserId) => async (req, res, next) => {
  const resourceUserId = await getResourceUserId(req);
  if (req.user.role !== 'admin' && req.user.userId !== resourceUserId) {
    return res.status(403).json({ error: 'Not your resource' });
  }
  next();
};

module.exports = { requireRole, requirePermission, requireOwnership };`} />
          <CodeBlock label="applying RBAC to routes" code={`const { auth } = require('./middleware/auth');
const { requireRole, requirePermission } = require('./middleware/authorize');

// Anyone authenticated can read
router.get('/posts', auth, getPosts);

// Only editors and admins can create
router.post('/posts', auth, requireRole('editor', 'admin'), createPost);

// Only admins can delete any post
router.delete('/posts/:id', auth, requireRole('admin'), deletePost);

// Editors can update only their own posts
router.put('/posts/:id', auth, requireRole('editor', 'admin'),
  requireOwnership(async (req) => {
    const post = await Post.findById(req.params.id);
    return post?.authorId;
  }),
  updatePost
);`} />
          <Tip icon="🎯" color={D.yellow} title="RBAC vs ABAC">RBAC (role-based) is simpler and covers 80% of needs. ABAC (attribute-based) lets you define rules like "users can only access resources tagged with their department" — more powerful but complex. MNCs start with RBAC and add ABAC selectively for multi-tenant systems.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What does JWT stand for?" options={["JavaScript Web Token", "JSON Web Token", "Java Web Transfer", "Joint Web Token"]} correct={1} explain="JWT = JSON Web Token. It's a signed JSON payload used to transmit user identity between client and server." />
          <QuizCard question="Where should the client send the JWT on each request?" options={["In the request body", "In the Authorization header", "In the URL query string", "In a cookie only"]} correct={1} explain="The standard is the Authorization header with the Bearer scheme: Authorization: Bearer <token>. This keeps tokens out of URLs (which get logged) and bodies (which are for data)." />
          <QuizCard question="Why store refresh tokens in httpOnly cookies?" options={["For performance", "localStorage is accessible to XSS attacks; httpOnly cookies are not", "Cookies are required by JWT spec", "To support mobile apps"]} correct={1} explain="httpOnly cookies cannot be read by JavaScript, making them immune to XSS token theft. Combined with sameSite=strict, this prevents both XSS and CSRF attacks on your refresh token." />
          <QuizCard question="What HTTP status code means 'authenticated but not authorized'?" options={["401 Unauthorized", "403 Forbidden", "400 Bad Request", "404 Not Found"]} correct={1} explain="403 Forbidden means the server knows who you are (authenticated) but you don't have permission (not authorized). 401 Unauthorized means the server doesn't know who you are — missing or invalid token." />
        </div>
      )}
      {tab === "demo" && <JwtAuthDemo />}
    </div>
  );
}
