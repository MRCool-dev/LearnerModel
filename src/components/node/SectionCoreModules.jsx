import { D, para } from "../../tokens";
import EasyBox from "../primitives/EasyBox";
import CodeBlock from "../primitives/CodeBlock";
import Tip from "../primitives/Tip";
import StreamDemo from "../demos/StreamDemo";
import ModuleCard from "./ModuleCard";

export default function SectionCoreModules() {
  return (
    <div>
      <p style={para}>Node.js ships with <strong style={{ color: "#06b6d4" }}>built-in modules</strong> — ready to use with no npm install needed. Click any module to expand.</p>
      <ModuleCard name="fs" color={D.green} icon="📁" tagline="File System — read, write, copy, delete, watch files">
        <EasyBox emoji="📁" title="What is fs?" color={D.green}>The <code>fs</code> module gives your JavaScript program access to the computer's file system. <strong>The #1 rule:</strong> always use <code>fs.promises</code> (async) in servers. The synchronous versions block the entire Event Loop.</EasyBox>
        <CodeBlock label="reading files — the right way" code={`import fs from 'fs';
const fsp = fs.promises;

// READ a text file:
const text = await fsp.readFile('./data.txt', 'utf8');

// READ a binary file:
const imageBuffer = await fsp.readFile('./photo.jpg');

// READ and parse JSON:
const config = JSON.parse(await fsp.readFile('./config.json', 'utf8'));

// ❌ NEVER use readFileSync in a server:
const text = fs.readFileSync('./data.txt', 'utf8'); // blocks ALL requests!`} />
        <CodeBlock label="writing, appending, deleting" code={`await fsp.writeFile('./output.txt', 'Hello Node!', 'utf8');
await fsp.appendFile('./server.log', line + '\\n');
await fsp.unlink('./temp.txt');
await fsp.mkdir('./logs/2024', { recursive: true });
const files = await fsp.readdir('./src');
const exists = await fsp.access('./file.txt').then(() => true).catch(() => false);`} />
        <CodeBlock label="directories and file info" code={`const stats = await fsp.stat('./app.js');
stats.size;          // 4096 (bytes)
stats.mtime;         // Date — when last modified
stats.isFile();      // true
stats.isDirectory(); // false

await fsp.copyFile('./a.txt', './b.txt');
await fsp.rename('./old.txt', './new.txt');

fs.watch('./src', { recursive: true }, (event, filename) => {
  console.log(\`\${filename} was \${event}d\`);
});`} />
      </ModuleCard>
      <ModuleCard name="path" color="#3b82f6" icon="🛤️" tagline="File paths — build them safely across OSes">
        <EasyBox emoji="⚠️" title="Why you must use path" color={D.red}>On Mac/Linux, paths use <code>/</code>. On Windows, they use <code>\\</code>. If you build paths by string concatenation, your code works on your Mac, breaks on Windows. The <code>path</code> module handles this automatically.</EasyBox>
        <CodeBlock label="path methods" code={`import path from 'path';

path.join('/home', 'user', 'file.txt');   // '/home/user/file.txt'
path.resolve('src', 'app.js');            // '/cwd/src/app.js'
path.basename('/a/file.txt');             // 'file.txt'
path.basename('/a/file.txt', '.txt');     // 'file'
path.dirname('/a/file.txt');              // '/a'
path.extname('photo.jpg');                // '.jpg'
path.parse('/a/file.txt');                // { root, dir, base, name, ext }

// Most used pattern:
const cfg = path.join(__dirname, '..', 'config', 'db.json');`} />
      </ModuleCard>
      <ModuleCard name="os" color="#8b5cf6" icon="💻" tagline="Operating System info — CPU, memory, hostname">
        <CodeBlock label="os methods" code={`import os from 'os';

os.platform();     // 'linux' | 'darwin' | 'win32'
os.arch();         // 'x64' | 'arm64'
os.hostname();     // 'my-server-prod-1'
os.uptime();       // 86400 (seconds since reboot)
os.totalmem();     // 17179869184 → 17.2 GB
os.freemem();      // 4294967296  → 4.3 GB free
os.cpus().length;  // 8 (logical CPU cores)

// System health object:
function systemHealth() {
  const mem = os.totalmem(), free = os.freemem();
  return {
    cpuCores: os.cpus().length,
    totalRAM: (mem / 1e9).toFixed(1) + ' GB',
    usedRAM: ((1 - free / mem) * 100).toFixed(1) + '%',
    uptime: Math.floor(os.uptime() / 3600) + ' hours',
  };
}`} />
      </ModuleCard>
      <ModuleCard name="events" color="#f59e0b" icon="📡" tagline="EventEmitter — pub/sub, the foundation of Node.js I/O">
        <CodeBlock label="eventemitter basics" code={`import { EventEmitter } from 'events';

class OrderSystem extends EventEmitter {
  placeOrder(item, price) {
    this.emit('order', { item, price, time: new Date() });
    if (price > 100) this.emit('bigOrder', item);
  }
}

const shop = new OrderSystem();

// .on() — runs EVERY time:
shop.on('order', (data) => console.log(data));

// .once() — runs only the FIRST time:
shop.once('bigOrder', (item) => console.log('First big order!', item));

// ❗ ALWAYS handle 'error' events:
// Unhandled 'error' events crash Node IMMEDIATELY!
shop.on('error', (err) => console.error(err));`} />
      </ModuleCard>
      <ModuleCard name="http" color="#06b6d4" icon="🌐" tagline="Create HTTP servers — foundation under Express">
        <CodeBlock label="raw http server" code={`import http from 'http';

const server = http.createServer(async (req, res) => {
  const url  = new URL(req.url, \`http://\${req.headers.host}\`);
  const path = url.pathname;

  const body = await new Promise((resolve) => {
    let raw = '';
    req.on('data', c => raw += c);
    req.on('end', () => resolve(raw ? JSON.parse(raw) : null));
  });

  const json = (data, s = 200) => {
    res.writeHead(s, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  if (req.method === 'GET' && path === '/') {
    return json({ message: 'Hello from Node.js!' });
  }

  json({ error: 'Not found' }, 404);
});

server.listen(3000, () => console.log('🚀 http://localhost:3000'));`} />
      </ModuleCard>
      <ModuleCard name="crypto" color="#f43f5e" icon="🔐" tagline="Hashing, encryption, HMAC, secure random">
        <CodeBlock label="secure random & hashing" code={`import crypto from 'crypto';

// CRYPTOGRAPHICALLY SECURE random bytes:
const token = crypto.randomBytes(32).toString('hex');
const id    = crypto.randomUUID(); // built-in since Node 15

// SHA-256 hash:
const sha = s => crypto.createHash('sha256').update(s).digest('hex');

// ⚠️ NEVER hash passwords with SHA256 — use bcrypt or argon2!
// SHA-256 is fine for: checksums, cache keys, ETags`} />
        <CodeBlock label="HMAC — webhook verification" code={`const hmac = crypto.createHmac('sha256', process.env.SECRET)
  .update(rawRequestBody)
  .digest('hex');

// Use timingSafeEqual to compare — prevents timing attacks!
const valid = crypto.timingSafeEqual(
  Buffer.from(hmac),
  Buffer.from(req.headers['x-signature'])
);`} />
      </ModuleCard>
      <ModuleCard name="child_process" color="#f59e0b" icon="🔀" tagline="Run shell commands, scripts, other programs">
        <CodeBlock label="exec, spawn, fork" code={`import { exec, spawn, fork } from 'child_process';
import { promisify } from 'util';

// exec — buffers output in memory (1MB limit):
const execAsync = promisify(exec);
const { stdout } = await execAsync('git log --oneline -5');

// spawn — streams stdout/stderr, no size limit:
const proc = spawn('find', ['.', '-name', '*.ts']);
proc.stdout.on('data', c => process.stdout.write(c));

// fork — separate Node.js process with IPC:
const worker = fork('./worker.js');
worker.send({ task: 'resize', file: './img.jpg' });
worker.on('message', result => console.log(result));`} />
      </ModuleCard>
      <ModuleCard name="stream" color="#14b8a6" icon="🌊" tagline="Process data chunk by chunk — essential for large files">
        <EasyBox emoji="🌊" title="Why streams exist" color="#14b8a6">Reading a 4GB file loads 4GB into RAM. Most servers don't have 4GB free. The process crashes. Streams process data in ~64KB chunks. A 4GB file uses ~100KB RAM. Constant memory regardless of file size.</EasyBox>
        <CodeBlock label="pipeline — the safe way to chain streams" code={`import { pipeline } from 'stream';
import { promisify } from 'util';
const pipe = promisify(pipeline);

// ✅ Use pipeline() — it handles errors properly!
// pipe() doesn't clean up on error → memory leak
await pipe(
  fs.createReadStream('./data.json'),
  createGzip(),
  fs.createWriteStream('./data.json.gz')
);

// Process a 10GB file:
await pipe(
  fs.createReadStream('./10gb-export.csv'),
  new TransformCSVtoJSON(),
  fs.createWriteStream('./output.json')
);
// RAM used: ~200KB total. Not 10GB. ✅`} />
        <StreamDemo />
      </ModuleCard>
    </div>
  );
}
