# Databases & ORMs - Complete Learning Module

## What is a Database?

A database is an organized collection of data that can be easily accessed, managed, and updated. Every real application needs a database to persist data.

---

## SQL vs NoSQL

| Feature | SQL (PostgreSQL, MySQL) | NoSQL (MongoDB, Redis) |
|---------|------------------------|------------------------|
| **Structure** | Tables with rows & columns | Documents, key-value, graphs |
| **Schema** | Rigid, predefined | Flexible, dynamic |
| **Relationships** | Foreign keys, JOINs | Embedded documents, references |
| **Scaling** | Vertical (bigger server) | Horizontal (more servers) |
| **Best for** | Complex queries, transactions | Rapid development, unstructured data |

---

## 1. MongoDB - The Document Database

MongoDB stores data as JSON-like documents in collections.

```javascript
// A MongoDB document
{
  _id: ObjectId("..."),
  name: "Alice",
  email: "alice@example.com",
  orders: [
    { product: "Laptop", price: 999 },
    { product: "Mouse", price: 29 }
  ]
}
```

### Mongoose - MongoDB ODM for Node.js

```javascript
const mongoose = require('mongoose');

// Define a Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number,
  createdAt: { type: Date, default: Date.now }
});

// Create a Model
const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp');

// CRUD Operations
async function run() {
  // CREATE
  const user = await User.create({ name: 'Alice', email: 'alice@example.com', age: 30 });
  
  // READ
  const found = await User.findOne({ email: 'alice@example.com' });
  const all = await User.find({ age: { $gte: 18 } });
  
  // UPDATE
  await User.updateOne({ _id: user._id }, { age: 31 });
  
  // DELETE
  await User.deleteOne({ _id: user._id });
}

run();
```

---

## 2. PostgreSQL - The Relational Database

PostgreSQL is a powerful, open-source relational database.

```sql
-- Create a table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert data
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');

-- Query data
SELECT * FROM users WHERE age > 18;

-- Join tables
SELECT users.name, orders.total
FROM users
JOIN orders ON users.id = orders.user_id;
```

### Using PostgreSQL with Node.js (pg)

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'secret',
  database: 'myapp',
  port: 5432
});

// Query with parameters (prevents SQL injection)
const result = await pool.query(
  'SELECT * FROM users WHERE email = $1',
  ['alice@example.com']
);
console.log(result.rows);
```

---

## 3. Prisma - Modern TypeScript ORM

Prisma is a next-generation ORM that uses a schema file to define your data model.

```prisma
// schema.prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String
  content  String
  author   User   @relation(fields: [authorId], references: [id])
  authorId Int
}
```

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create with relation
const user = await prisma.user.create({
  data: {
    email: 'alice@example.com',
    name: 'Alice',
    posts: {
      create: { title: 'Hello World', content: 'My first post' }
    }
  }
});

// Read with relation
const usersWithPosts = await prisma.user.findMany({
  include: { posts: true }
});
```

---

## 4. Redis - In-Memory Data Store

Redis is an in-memory key-value store used for caching, sessions, and real-time data.

```javascript
const redis = require('redis');
const client = redis.createClient();

await client.connect();

// Key-Value operations
await client.set('user:1', JSON.stringify({ name: 'Alice' }));
await client.expire('user:1', 3600); // expires in 1 hour

const user = JSON.parse(await client.get('user:1'));

// Caching pattern
async function getUser(id) {
  const cached = await client.get(`user:${id}`);
  if (cached) return JSON.parse(cached);
  
  const user = await db.findUser(id);
  await client.setEx(`user:${id}`, 3600, JSON.stringify(user));
  return user;
}
```

---

## 5. Connection Pooling

Creating a new database connection for every request is slow and expensive. Connection pools reuse connections.

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'myapp',
  user: 'postgres',
  password: 'secret',
  max: 20,        // maximum pool size
  idleTimeoutMillis: 30000, // close idle connections after 30s
  connectionTimeoutMillis: 2000, // timeout after 2s
});

// The pool automatically manages connections
const result = await pool.query('SELECT * FROM users');
```

### Why Pooling Matters

| Without Pooling | With Pooling |
|-----------------|--------------|
| Open → Query → Close (slow) | Reuse existing connection (fast) |
| ~100ms per query overhead | ~1ms per query overhead |
| Max ~100 concurrent users | Max thousands concurrent users |
| Database CPU wasted on handshakes | Database CPU focused on queries |

---

## KEY CONCEPTS TO REMEMBER

| Concept | What It Does |
|---------|-------------|
| **Schema** | Defines the structure of your data |
| **Migration** | Version-controlled changes to your database schema |
| **Index** | Speeds up queries by creating lookup tables |
| **Transaction** | Groups multiple operations into an all-or-nothing unit |
| **ACID** | Atomicity, Consistency, Isolation, Durability |
| **ORM** | Maps database tables to code objects |
| **ODM** | Maps document databases to code objects |
| **Connection Pool** | Reuses database connections for performance |
| **Normalization** | Organizing data to reduce redundancy |
| **Denormalization** | Storing redundant data for read performance |

---

## PRACTICE EXERCISES

1. Create a MongoDB schema with Mongoose for a blog (Users, Posts, Comments)
2. Write PostgreSQL queries with JOINs to fetch related data
3. Set up Prisma with a schema and perform CRUD operations
4. Implement Redis caching for an API endpoint
5. Configure connection pooling and measure response times

---

**Today's Date:** 2026-05-15

Master databases and you'll build applications that scale!
