# Testing & Debugging - Complete Learning Module

## Why Testing Matters

Testing is not about finding bugs — it is about preventing them. A good test suite gives you confidence to refactor, deploy on Fridays, and sleep at night.

---

## The Test Pyramid

```
     /\
    /  \     E2E Tests (slow, expensive, few)
   /----\
  /      \   Integration Tests (medium, medium)
 /--------\
/          \ Unit Tests (fast, cheap, many)
------------
```

| Type | Speed | Cost | Quantity | Tools |
|------|-------|------|----------|-------|
| **Unit** | Fast (< 10ms) | Cheap | Many (70%) | Jest, Mocha |
| **Integration** | Medium (~100ms) | Medium | Some (20%) | Supertest |
| **E2E** | Slow (> 1s) | Expensive | Few (10%) | Playwright, Cypress |

---

## 1. Jest - Unit Testing

```javascript
// math.js
const add = (a, b) => a + b;
const divide = (a, b) => {
  if (b === 0) throw new Error('Cannot divide by zero');
  return a / b;
};

module.exports = { add, divide };
```

```javascript
// math.test.js
const { add, divide } = require('./math');

describe('math', () => {
  test('adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('throws on divide by zero', () => {
    expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
  });

  test('works with async', async () => {
    const result = await Promise.resolve(add(1, 1));
    expect(result).toBe(2);
  });
});
```

### Running Tests

```bash
npx jest                    # run all tests
npx jest --watch            # watch mode
npx jest --coverage         # generate coverage report
```

### Common Matchers

```javascript
expect(value).toBe(5);                    // strict equality
expect(value).toEqual({ a: 1 });          // deep equality
expect(value).toBeTruthy();               // truthy
expect(value).toBeNull();                 // null
expect(array).toContain('item');          // array contains
expect(fn).toHaveBeenCalled();            // mock was called
expect(fn).toHaveBeenCalledWith('arg');   // mock called with arg
```

---

## 2. Mocking with Jest

```javascript
// Mock a module
jest.mock('./api', () => ({
  fetchUser: jest.fn(() => Promise.resolve({ id: 1, name: 'Alice' }))
}));

// Spy on a function
const spy = jest.spyOn(console, 'log');
expect(spy).toHaveBeenCalledWith('hello');
spy.mockRestore();

// Mock implementations
const mockFn = jest.fn();
mockFn.mockReturnValue(42);
mockFn.mockResolvedValue({ data: [] });  // for async
mockFn.mockRejectedValue(new Error('fail'));
```

---

## 3. Supertest - API Testing

Supertest lets you test Express APIs without starting a server on a real port.

```javascript
const request = require('supertest');
const app = require('./app');  // your Express app

describe('GET /users', () => {
  test('returns all users', async () => {
    const response = await request(app)
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200);
    
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test('creates a user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'Alice', email: 'alice@example.com' })
      .expect(201);
    
    expect(response.body.data.name).toBe('Alice');
  });
});
```

---

## 4. Integration Test Patterns

Integration tests verify that multiple parts of your system work together.

```javascript
// test setup with database
const { Pool } = require('pg');
const app = require('./app');
const request = require('supertest');

let pool;

beforeAll(async () => {
  pool = new Pool({ database: 'myapp_test' });
  // Run migrations
});

beforeEach(async () => {
  // Clean tables before each test
  await pool.query('TRUNCATE users, orders RESTART IDENTITY CASCADE');
});

afterAll(async () => {
  await pool.end();
});

describe('User API', () => {
  test('creates and retrieves a user', async () => {
    const create = await request(app)
      .post('/users')
      .send({ name: 'Alice', email: 'alice@example.com' });
    
    expect(create.status).toBe(201);
    
    const get = await request(app)
      .get(`/users/${create.body.data.id}`);
    
    expect(get.body.data.name).toBe('Alice');
  });
});
```

---

## 5. Debugging Node.js

### Console Methods

```javascript
console.log('basic');
console.table([{ name: 'Alice', age: 30 }]);
console.time('query');
// ... run query
console.timeEnd('query');  // query: 45.2ms
console.trace('where am i'); // stack trace
```

### The `debugger` Statement

```javascript
function calculate(a, b) {
  debugger;  // execution pauses here when run with --inspect
  return a + b;
}
```

Run with:
```bash
node --inspect-brk app.js     # pause on first line
node --inspect app.js         # start inspector, run until debugger
```

Then open `chrome://inspect` in Chrome to use DevTools.

### VS Code Debugging

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Server",
      "program": "${workspaceFolder}/server.js",
      "env": { "NODE_ENV": "development" }
    }
  ]
}
```

### ndb - Enhanced Node Debugger

```bash
npm install -g ndb
ndb node server.js    # opens Chrome DevTools with Node-specific features
```

---

## KEY CONCEPTS TO REMEMBER

| Concept | What It Means |
|---------|--------------|
| **Unit Test** | Tests a single function in isolation |
| **Integration Test** | Tests multiple components working together |
| **E2E Test** | Tests the entire application like a real user |
| **Mock** | Fake implementation of a dependency |
| **Spy** | Observes a function without changing it |
| **Stub** | Replaces a function with a controlled fake |
| **Coverage** | Percentage of code executed by tests |
| **TDD** | Write tests BEFORE writing code |
| **AAA** | Arrange, Act, Assert — test structure |

---

## PRACTICE EXERCISES

1. Write Jest tests for a calculator (add, subtract, multiply, divide)
2. Mock the `fs` module and test a file-reading function
3. Write Supertest tests for a CRUD API
4. Set up a test database and write integration tests
5. Debug a function using `debugger` and Chrome DevTools

---

**Today's Date:** 2026-05-15

Write tests. Debug with confidence. Ship without fear.
