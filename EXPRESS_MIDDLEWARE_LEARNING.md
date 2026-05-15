# Express.js & Middleware - Complete Learning Module

## What is Express.js?

Express is a **minimal web framework for Node.js** that makes it easy to:
- Handle HTTP requests (GET, POST, PUT, DELETE)
- Manage routing
- Process middleware
- Build REST APIs

---

## What is Middleware?

Middleware is a **function that processes requests** before they reach your route handler.

**Flow:**
```
Request → Middleware 1 → Middleware 2 → Route Handler → Response
```

Middleware can:
- Authenticate users
- Log requests
- Parse request bodies
- Handle errors
- Modify request/response objects

---

## 1. BASIC EXPRESS SERVER

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// Simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

**Run it:**
```bash
node server.js
```

Visit `http://localhost:3000` in your browser → You see "Hello World!"

---

## 2. ROUTING PATTERNS

```javascript
const express = require('express');
const app = express();

// GET request
app.get('/users', (req, res) => {
  res.json({ message: 'Get all users' });
});

// GET with URL parameter
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: `Get user ${userId}` });
});

// POST request (create data)
app.post('/users', (req, res) => {
  res.json({ message: 'User created' });
});

// PUT request (update data)
app.put('/users/:id', (req, res) => {
  res.json({ message: `User ${req.params.id} updated` });
});

// DELETE request (remove data)
app.delete('/users/:id', (req, res) => {
  res.json({ message: `User ${req.params.id} deleted` });
});

app.listen(3000);
```

**Test with curl:**
```bash
curl http://localhost:3000/users              # GET
curl http://localhost:3000/users/5            # GET specific user
curl -X POST http://localhost:3000/users      # POST
curl -X PUT http://localhost:3000/users/5     # PUT
curl -X DELETE http://localhost:3000/users/5  # DELETE
```

---

## 3. MIDDLEWARE EXAMPLES

### 3.1 Request Logger Middleware

Logs every request to the console:

```javascript
const express = require('express');
const app = express();

// Custom middleware - logs requests
const loggerMiddleware = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next(); // Pass control to next middleware/route
};

// Use the middleware
app.use(loggerMiddleware);

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.listen(3000);
```

**Console output when you visit:**
```
2026-05-15T10:30:45.123Z - GET /
```

---

### 3.2 Body Parser Middleware

Parses incoming JSON request bodies:

```javascript
const express = require('express');
const app = express();

// Built-in middleware to parse JSON
app.use(express.json());

app.post('/users', (req, res) => {
  console.log(req.body); // req.body contains the parsed JSON
  res.json({ received: req.body });
});

app.listen(3000);
```

**Test:**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","age":30}'
```

**Response:**
```json
{
  "received": {
    "name": "John",
    "age": 30
  }
}
```

---

### 3.3 Authentication Middleware

Checks if user is authorized before accessing a route:

```javascript
const express = require('express');
const app = express();

// Middleware to check API key
const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (apiKey === 'secret-key-123') {
    next(); // Authorized, continue
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Public route (no middleware)
app.get('/public', (req, res) => {
  res.json({ message: 'Anyone can access this' });
});

// Protected route (requires API key)
app.get('/protected', checkApiKey, (req, res) => {
  res.json({ message: 'Only authorized users can see this' });
});

app.listen(3000);
```

**Test:**
```bash
# This works
curl -H "x-api-key: secret-key-123" http://localhost:3000/protected

# This fails (401 Unauthorized)
curl http://localhost:3000/protected
```

---

### 3.4 Error Handling Middleware

Catches errors and returns them nicely:

```javascript
const express = require('express');
const app = express();

app.get('/divide/:a/:b', (req, res, next) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);
  
  if (b === 0) {
    // Pass error to error handler middleware
    next(new Error('Cannot divide by zero'));
  } else {
    res.json({ result: a / b });
  }
});

// Error handling middleware (must have 4 parameters!)
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: err.message });
});

app.listen(3000);
```

**Test:**
```bash
curl http://localhost:3000/divide/10/2    # Works: { result: 5 }
curl http://localhost:3000/divide/10/0    # Error: { error: "Cannot divide by zero" }
```

---

## 4. MIDDLEWARE EXECUTION ORDER

Middleware runs in the order you define it:

```javascript
const express = require('express');
const app = express();

// Middleware 1
app.use((req, res, next) => {
  console.log('1. First middleware');
  next();
});

// Middleware 2
app.use((req, res, next) => {
  console.log('2. Second middleware');
  next();
});

// Route handler
app.get('/', (req, res) => {
  console.log('3. Route handler');
  res.send('Done!');
});

app.listen(3000);
```

**Console output:**
```
1. First middleware
2. Second middleware
3. Route handler
```

---

## 5. CONDITIONAL MIDDLEWARE

Run middleware only on specific routes:

```javascript
const express = require('express');
const app = express();

const authMiddleware = (req, res, next) => {
  console.log('Checking authentication...');
  next();
};

// No middleware
app.get('/public', (req, res) => {
  res.send('Public page');
});

// With middleware
app.get('/dashboard', authMiddleware, (req, res) => {
  res.send('Dashboard (protected)');
});

// Multiple middleware
app.post('/admin', authMiddleware, (req, res, next) => {
  console.log('Also checking admin permissions...');
  next();
}, (req, res) => {
  res.send('Admin panel');
});

app.listen(3000);
```

---

## 6. CORS MIDDLEWARE

Allow requests from different domains:

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// Allow all origins
app.use(cors());

// Allow specific origins
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.get('/data', (req, res) => {
  res.json({ data: 'Hello from backend!' });
});

app.listen(3000);
```

---

## 7. COMPLETE REST API EXAMPLE

```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Mock database
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET single user
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST - Create user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT - Update user
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;
  
  res.json(user);
});

// DELETE - Remove user
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const deleted = users.splice(index, 1);
  res.json({ message: 'User deleted', user: deleted[0] });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
});
```

**Test the API:**
```bash
# Get all users
curl http://localhost:3000/api/users

# Get user by ID
curl http://localhost:3000/api/users/1

# Create new user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Charlie","email":"charlie@example.com"}'

# Update user
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Updated"}'

# Delete user
curl -X DELETE http://localhost:3000/api/users/2
```

---

## 8. AUTHENTICATION WITH JWT

JWT (JSON Web Token) for user authentication:

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const SECRET = 'your-secret-key';

// Login - Generate token
app.post('/login', (req, res) => {
  const user = { id: 1, name: 'John' };
  const token = jwt.sign(user, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // "Bearer TOKEN"
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// Protected route
app.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'This is your profile', user: req.user });
});

app.listen(3000);
```

**Test:**
```bash
# 1. Login to get token
curl -X POST http://localhost:3000/login
# Response: { "token": "eyJhbGc..." }

# 2. Use token to access protected route
curl -H "Authorization: Bearer eyJhbGc..." http://localhost:3000/profile
```

---

## KEY CONCEPTS TO REMEMBER

| Concept | What It Does |
|---------|-------------|
| **Middleware** | Function that processes requests before route handlers |
| **app.use()** | Register middleware globally |
| **app.get/post/put/delete()** | Define routes for specific HTTP methods |
| **req.params** | URL parameters (e.g., `/users/:id`) |
| **req.query** | Query string (e.g., `?page=1&limit=10`) |
| **req.body** | Request body (needs `express.json()` middleware) |
| **req.headers** | HTTP headers sent by client |
| **res.json()** | Send JSON response |
| **res.status()** | Set HTTP status code |
| **next()** | Pass control to next middleware/route |
| **Error middleware** | Has 4 parameters: `(err, req, res, next)` |

---

## PRACTICE EXERCISES

1. Create a simple API with GET, POST, PUT, DELETE
2. Add a logger middleware that logs all requests
3. Add authentication to protect certain routes
4. Create error handling for invalid requests
5. Use CORS middleware to allow requests from frontend

---

**Today's Date:** 2026-05-15

Learn these fundamentals and you'll understand Express.js middleware patterns!
