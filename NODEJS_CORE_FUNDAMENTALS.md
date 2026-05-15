# Node.js Core Fundamentals
## Phase 1: Deep Dive

**7 Lessons** | Runtime, Event Loop, Modules, Core APIs, Cheatsheets & Interview Prep

---

## Lesson 1: What is Node.js?

### Definition
Node.js is a **JavaScript runtime** that runs JavaScript outside the browser — on servers, desktops, and IoT devices.

### Why Node.js?
- **Single language:** Use JavaScript for both frontend and backend
- **Fast:** Built on V8 engine (same as Chrome)
- **Event-driven:** Perfect for real-time apps
- **Non-blocking I/O:** Handle thousands of concurrent connections
- **npm ecosystem:** Millions of packages available

### Node.js vs Browser JavaScript

| Feature | Browser | Node.js |
|---------|---------|---------|
| **DOM** | ✅ Yes | ❌ No |
| **File System** | ❌ No | ✅ Yes |
| **HTTP Server** | ❌ No | ✅ Yes |
| **OS Access** | ❌ No | ✅ Yes |
| **Global Object** | `window` | `global` |

### Your First Node.js Program

```javascript
// hello.js
console.log('Hello, Node.js!');
console.log('Current directory:', process.cwd());
console.log('Node version:', process.version);
```

**Run it:**
```bash
node hello.js
```

**Output:**
```
Hello, Node.js!
Current directory: /path/to/your/project
Node version: v18.16.0
```

---

## Lesson 2: The Event Loop - How Node.js Works

### The Single-Threaded Model

Node.js runs JavaScript on a **single thread**, but handles many operations through the **Event Loop**.

### Event Loop Phases

```
┌─────────────────────────┐
│        timers           │  setTimeout, setInterval
├─────────────────────────┤
│     pending callbacks   │  Deferred I/O operations
├─────────────────────────┤
│         idle, prepare   │  Internal operations
├─────────────────────────┤
│    poll (I/O events)    │  File reads, network requests
├─────────────────────────┤
│         check           │  setImmediate
├─────────────────────────┤
│     close callbacks     │  Socket closures
└─────────────────────────┘
```

### Example: Understanding Event Loop Order

```javascript
console.log('1. Start');

setTimeout(() => {
  console.log('2. setTimeout (0ms)');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('3. Promise');
  });

console.log('4. End');
```

**Output:**
```
1. Start
4. End
3. Promise        ← Microtask (runs before timer)
2. setTimeout (0ms) ← Macrotask (runs after microtasks)
```

**Why?** Promises are **microtasks** (run immediately), setTimeout is a **macrotask** (runs after all microtasks).

### Key Concept: Non-Blocking I/O

```javascript
// Blocking (BAD) - Server freezes for 5 seconds
const data = require('fs').readFileSync('large-file.txt');
console.log('File read (blocking)');

// Non-blocking (GOOD) - Server stays responsive
const fs = require('fs');
fs.readFile('large-file.txt', (err, data) => {
  if (err) throw err;
  console.log('File read (non-blocking)');
});
console.log('Reading file... (server still responsive)');
```

---

## Lesson 3: Modules - Organizing Code

### CommonJS vs ES Modules

#### CommonJS (Traditional Node.js)

```javascript
// math.js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

module.exports = {
  add,
  subtract
};
```

```javascript
// app.js
const math = require('./math');
console.log(math.add(5, 3));    // 8
console.log(math.subtract(5, 3)); // 2
```

#### ES Modules (Modern)

```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
```

```javascript
// app.js
import { add, subtract } from './math.js';
console.log(add(5, 3));    // 8
console.log(subtract(5, 3)); // 2
```

**To use ES modules in Node.js:**

Add to `package.json`:
```json
{
  "type": "module"
}
```

### Core Modules (Built-in)

Node.js comes with **core modules** you don't need to install:

```javascript
// File System
const fs = require('fs');

// HTTP Server
const http = require('http');

// Path manipulation
const path = require('path');

// Operating System info
const os = require('os');

// Events
const EventEmitter = require('events');

// Utilities
const util = require('util');
```

### Using Core Modules

#### File System (`fs`)

```javascript
const fs = require('fs');

// Read file (async)
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Write file
fs.writeFile('output.txt', 'Hello World', (err) => {
  if (err) throw err;
  console.log('File written');
});

// Check if file exists
if (fs.existsSync('data.txt')) {
  console.log('File exists');
}

// Delete file
fs.unlink('output.txt', (err) => {
  if (err) throw err;
  console.log('File deleted');
});

// List files in directory
fs.readdir('.', (err, files) => {
  if (err) throw err;
  console.log(files);
});
```

#### HTTP Server

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Hello World</h1>');
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

#### Path Module

```javascript
const path = require('path');

// Join paths
const fullPath = path.join(__dirname, 'data', 'file.txt');
// Result: /home/user/project/data/file.txt

// Get file extension
const ext = path.extname('file.txt');
// Result: .txt

// Get file name
const name = path.basename('/path/to/file.txt');
// Result: file.txt

// Get directory name
const dir = path.dirname('/path/to/file.txt');
// Result: /path/to
```

#### OS Module

```javascript
const os = require('os');

console.log(os.platform());      // 'win32', 'linux', 'darwin'
console.log(os.cpus().length);   // Number of CPU cores
console.log(os.freemem());       // Free memory in bytes
console.log(os.totalmem());      // Total memory in bytes
console.log(os.homedir());       // User home directory
```

---

## Lesson 4: Process Object - Accessing Node.js Environment

### What is `process`?

The `process` object provides information about and control over the Node.js process.

```javascript
// Node version
console.log(process.version);  // v18.16.0

// Command line arguments
console.log(process.argv);     // ['node', 'script.js', 'arg1', 'arg2']

// Current working directory
console.log(process.cwd());    // /home/user/project

// Environment variables
console.log(process.env.USER); // System username

// Exit process
process.exit(0);               // Exit with code 0 (success)

// Listen for exit
process.on('exit', () => {
  console.log('Process exiting');
});

// Uncaught exception handler
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
```

### Command Line Arguments

```javascript
// script.js
console.log(process.argv);
```

**Run:**
```bash
node script.js hello world
```

**Output:**
```
[
  '/usr/bin/node',           // argv[0]
  '/home/user/script.js',    // argv[1]
  'hello',                    // argv[2]
  'world'                     // argv[3]
]
```

### Environment Variables

```javascript
// Using environment variables
const API_KEY = process.env.API_KEY;
const DEBUG = process.env.DEBUG === 'true';

console.log(API_KEY); // Gets value from .env or system
```

**Set environment variables:**
```bash
# Linux/Mac
export API_KEY=secret123
node app.js

# Windows (PowerShell)
$env:API_KEY="secret123"
node app.js
```

---

## Lesson 5: Callbacks, Promises, and Async/Await

### Callbacks (Older Pattern)

```javascript
const fs = require('fs');

// Callback hell
fs.readFile('file1.txt', (err, data1) => {
  if (err) throw err;
  
  fs.readFile('file2.txt', (err, data2) => {
    if (err) throw err;
    
    fs.readFile('file3.txt', (err, data3) => {
      if (err) throw err;
      
      console.log(data1, data2, data3);
      // Deeply nested (pyramid of doom)
    });
  });
});
```

**Problem:** Deep nesting, hard to read, error handling scattered.

### Promises (Better)

```javascript
const fs = require('fs').promises;

// Chaining with .then()
fs.readFile('file1.txt', 'utf8')
  .then(data1 => {
    console.log(data1);
    return fs.readFile('file2.txt', 'utf8');
  })
  .then(data2 => {
    console.log(data2);
    return fs.readFile('file3.txt', 'utf8');
  })
  .then(data3 => {
    console.log(data3);
  })
  .catch(err => {
    console.error('Error:', err);
  });
```

**Better:** Readable, single error handler.

### Async/Await (Best)

```javascript
const fs = require('fs').promises;

async function readFiles() {
  try {
    const data1 = await fs.readFile('file1.txt', 'utf8');
    const data2 = await fs.readFile('file2.txt', 'utf8');
    const data3 = await fs.readFile('file3.txt', 'utf8');
    
    console.log(data1, data2, data3);
  } catch (err) {
    console.error('Error:', err);
  }
}

readFiles();
```

**Best:** Looks like synchronous code, easy to understand.

### Understanding Promises

```javascript
// Creating a promise
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success!');
  }, 1000);
});

// Using the promise
myPromise
  .then(result => console.log(result))  // "Success!"
  .catch(error => console.error(error));
```

**Promise States:**
- **Pending:** Still running
- **Fulfilled:** Completed successfully (`resolve`)
- **Rejected:** Failed (`reject`)

### Promise.all() - Wait for Multiple

```javascript
const fs = require('fs').promises;

async function readMultiple() {
  try {
    const [data1, data2, data3] = await Promise.all([
      fs.readFile('file1.txt', 'utf8'),
      fs.readFile('file2.txt', 'utf8'),
      fs.readFile('file3.txt', 'utf8')
    ]);
    
    console.log(data1, data2, data3);
  } catch (err) {
    console.error('Error reading files:', err);
  }
}

readMultiple();
```

---

## Lesson 6: Events and EventEmitter

### What are Events?

Node.js uses an **event-driven architecture**. Many objects emit events you can listen to.

```javascript
const EventEmitter = require('events');

// Create an event emitter
const emitter = new EventEmitter();

// Listen for an event
emitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

// Emit an event
emitter.emit('greet', 'Alice');  // Output: Hello, Alice!
emitter.emit('greet', 'Bob');    // Output: Hello, Bob!
```

### Common EventEmitter Methods

```javascript
const emitter = new EventEmitter();

// Listen for event
emitter.on('event', (data) => {
  console.log('Event:', data);
});

// Listen once, then remove
emitter.once('event', (data) => {
  console.log('This runs only once');
});

// Remove listener
const handler = () => console.log('Handler');
emitter.on('event', handler);
emitter.removeListener('event', handler);

// Remove all listeners
emitter.removeAllListeners('event');

// Get listener count
console.log(emitter.listenerCount('event'));
```

### Real-World Example: Custom Event

```javascript
const EventEmitter = require('events');

class User extends EventEmitter {
  constructor(name) {
    super();
    this.name = name;
  }
  
  login() {
    this.emit('login', { name: this.name, time: new Date() });
  }
  
  logout() {
    this.emit('logout', { name: this.name, time: new Date() });
  }
}

const user = new User('Alice');

user.on('login', (data) => {
  console.log(`${data.name} logged in at ${data.time}`);
});

user.on('logout', (data) => {
  console.log(`${data.name} logged out at ${data.time}`);
});

user.login();   // Alice logged in at ...
user.logout();  // Alice logged out at ...
```

---

## Lesson 7: Cheatsheet & Interview Prep

### Quick Reference

#### File System Operations
```javascript
const fs = require('fs');
const path = require('path');

// Read file
fs.readFileSync('file.txt', 'utf8');
fs.readFile('file.txt', 'utf8', (err, data) => {});

// Write file
fs.writeFileSync('file.txt', 'content');
fs.writeFile('file.txt', 'content', (err) => {});

// Delete file
fs.unlinkSync('file.txt');
fs.unlink('file.txt', (err) => {});

// Check existence
fs.existsSync('file.txt');

// Create directory
fs.mkdirSync('dir');
fs.mkdir('dir', (err) => {});

// Read directory
fs.readdirSync('.');
fs.readdir('.', (err, files) => {});

// File statistics
fs.statSync('file.txt');
fs.stat('file.txt', (err, stats) => {});
```

#### Working with Paths
```javascript
const path = require('path');

path.join('/a', 'b', 'c');           // /a/b/c
path.resolve('/a', 'b', 'c');        // Absolute path
path.dirname('/a/b/c.txt');          // /a/b
path.basename('/a/b/c.txt');         // c.txt
path.extname('/a/b/c.txt');          // .txt
path.parse('/a/b/c.txt');            // { root, dir, base, name, ext }
```

#### HTTP Server
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello' }));
  }
});

server.listen(3000);
```

#### Async Patterns
```javascript
// Callback
function getData(callback) {
  setTimeout(() => callback(null, 'data'), 1000);
}

// Promise
function getData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('data'), 1000);
  });
}

// Async/Await
async function getData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('data'), 1000);
  });
}

const data = await getData();
```

---

### Common Interview Questions

**Q1: What is the Event Loop?**
> The Event Loop is Node.js's mechanism for handling asynchronous operations. It checks the call stack, microtask queue, and macrotask queue repeatedly to determine what code to execute next.

**Q2: Difference between `setTimeout` and `setImmediate`?**
> - `setTimeout(fn, 0)` runs in the **timers phase**
> - `setImmediate(fn)` runs in the **check phase** (after poll phase)
> - setImmediate typically runs before setTimeout

```javascript
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
// Output: immediate, timeout
```

**Q3: What are Promises?**
> Promises represent a value that may not be available yet but will resolve in the future. They have three states: pending, fulfilled, rejected.

**Q4: What's the difference between `require()` and `import`?**
> - `require()` is CommonJS (synchronous)
> - `import` is ES6 modules (asynchronous)
> - require() can be used conditionally; import must be at top-level

**Q5: What is callback hell?**
> Callback hell is deeply nested callbacks that make code unreadable. Solution: use Promises or async/await.

```javascript
// Callback hell (bad)
doSomething(function(result1) {
  doSomethingElse(result1, function(result2) {
    doMore(result2, function(result3) {
      // ...
    });
  });
});

// Async/await (good)
const r1 = await doSomething();
const r2 = await doSomethingElse(r1);
const r3 = await doMore(r2);
```

**Q6: How do you handle errors in async/await?**
> Use try/catch blocks:

```javascript
try {
  const data = await fetchData();
  console.log(data);
} catch (error) {
  console.error('Error:', error);
}
```

**Q7: What is the difference between `let`, `const`, and `var`?**
> - `var` is function-scoped (outdated)
> - `let` is block-scoped (use for variables that change)
> - `const` is block-scoped (use for constants, recommended)

**Q8: What are arrow functions?**
> Arrow functions have a shorter syntax and don't bind their own `this`:

```javascript
// Traditional
const add = function(a, b) {
  return a + b;
};

// Arrow function
const add = (a, b) => a + b;
```

**Q9: How do you read environment variables?**
> Use `process.env`:

```javascript
const databaseUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY;
```

**Q10: What is middleware?**
> Middleware is a function that has access to request/response and can modify them or pass control to the next function. Common in Express.js.

---

### Quick Commands

```bash
# Initialize Node project
npm init -y

# Install package
npm install express

# Install globally
npm install -g nodemon

# Run file
node script.js

# Check Node version
node --version

# Run with environment variable
API_KEY=123 node app.js

# Debug mode
node --inspect app.js
```

---

## Practice Exercises

1. **Create a file logger:** Write a function that logs messages to a file with timestamps
2. **Build an event system:** Create a custom class that emits events
3. **Read and transform files:** Read a JSON file, transform data, write to new file
4. **HTTP server:** Create a server that handles GET/POST requests
5. **Async operations:** Chain multiple async operations and handle errors

---

**Today's Date:** 2026-05-15

Master these fundamentals and you're ready for advanced Node.js development!
