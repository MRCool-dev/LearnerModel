import { useState } from "react";
import { D, mono, para } from "../../tokens";
import CodeBlock from "../primitives/CodeBlock";

export default function SuperCheatsheet() {
  const [tab, setTab] = useState("runtime");
  const tabs = [
    { id: "runtime", label: "⚙️ Runtime" },
    { id: "modules", label: "📦 Modules" },
    { id: "fs-path", label: "📁 fs + path" },
    { id: "net", label: "🌐 http + events" },
    { id: "power", label: "🔐 crypto + child + stream" },
    { id: "mistakes", label: "💀 Mistakes" },
  ];
  const content = {
    runtime: (
      <div>
        <CodeBlock label="execution order" code={`console.log('1');
process.nextTick(() => console.log('2'));
Promise.resolve().then(() => console.log('3'));
setTimeout(() => console.log('4'), 0);
setImmediate(() => console.log('5'));
console.log('6');
// Output: 1 → 6 → 2 → 3 → 4 → 5`} />
        <CodeBlock label="process — global reference" code={`process.env.NODE_ENV    // 'production' | 'development'
process.env.PORT        // '3000'
process.argv            // ['node', 'app.js', '--flag', 'value']
process.cwd()           // working directory
process.exit(0)         // success. process.exit(1) = error
process.uptime()        // seconds running
process.memoryUsage()   // { heapUsed, heapTotal, rss }
process.pid             // 12345
process.version         // 'v20.11.0'
process.platform        // 'linux' | 'darwin' | 'win32'

process.on('SIGTERM', async () => {
  server.close();
  await db.disconnect();
  process.exit(0);
});
process.on('uncaughtException',  err => { log(err); process.exit(1); });
process.on('unhandledRejection', err => { log(err); process.exit(1); });`} />
      </div>
    ),
    modules: (
      <div>
        <CodeBlock label="commonjs" code={`// Export:
module.exports = { fn1, fn2, VALUE };  // ✅ recommended
exports.fn1 = fn1;                     // ✅ one at a time
// exports = {...}                      // ❌ NEVER — breaks ref

// Import:
const { fn1 }   = require('./mod');
const fs        = require('fs');       // core
const express   = require('express'); // npm`} />
        <CodeBlock label="es modules" code={`// Export:
export const PI = 3.14;
export function add(a, b) { return a + b; }
export default class Calc {}

// Import:
import Calc             from './math.mjs';
import { add, PI }      from './math.mjs';
import { add as sum }   from './math.mjs';
import * as math        from './math.mjs';

// __dirname in ESM:
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Dynamic import:
const { add } = await import('./math.mjs');`} />
      </div>
    ),
    "fs-path": (
      <div>
        <CodeBlock label="fs.promises" code={`import { readFile, writeFile, appendFile, unlink,
         mkdir, readdir, stat, copyFile, rename, access } from 'fs/promises';

const text  = await readFile('./file.txt', 'utf8');
const buf   = await readFile('./img.png');

await writeFile('./out.txt', content, 'utf8');
await appendFile('./log.txt', line + '\\n');
await unlink('./tmp.txt');
await mkdir('./logs', { recursive: true });
const files = await readdir('./src');
const s     = await stat('./file.txt');
// s.isFile() s.isDirectory() s.size s.mtime

await copyFile('./a.txt', './b.txt');
await rename('./old.txt', './new.txt');
const ok = await access('./f.txt').then(() => true).catch(() => false);`} />
        <CodeBlock label="path" code={`import path from 'path';
path.join('/home', 'user', 'file.txt')  // '/home/user/file.txt'
path.resolve('src', 'app.js')           // '/cwd/src/app.js'
path.basename('/a/file.txt')            // 'file.txt'
path.basename('/a/file.txt', '.txt')    // 'file'
path.dirname('/a/file.txt')             // '/a'
path.extname('photo.jpg')               // '.jpg'
path.parse('/a/file.txt')               // { root, dir, base, name, ext }
path.normalize('/foo//bar/../baz')      // '/foo/baz'
const cfg = path.join(__dirname, '..', 'config', 'db.json');`} />
      </div>
    ),
    net: (
      <div>
        <CodeBlock label="http server" code={`const server = http.createServer(async (req, res) => {
  const url    = new URL(req.url, \`http://\${req.headers.host}\`);
  const path   = url.pathname;
  const params = url.searchParams;

  const body = await new Promise(r => {
    let raw = '';
    req.on('data', c => raw += c);
    req.on('end', () => r(raw ? JSON.parse(raw) : null));
  });

  const json = (data, s = 200) => {
    res.writeHead(s, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  if (req.method === 'GET' && path === '/') return json({ ok: true });
  json({ error: 'Not found' }, 404);
});
server.listen(3000);`} />
        <CodeBlock label="events" code={`import { EventEmitter, once } from 'events';
const em = new EventEmitter();

em.on('data', payload => handle(payload));
em.once('ready', ()   => console.log('Connected once!'));
em.emit('data', { value: 42 });
em.off('data', handler);

// ALWAYS:
em.on('error', err => console.error(err));

// Promisify an event:
const [data] = await once(em, 'result');`} />
      </div>
    ),
    power: (
      <div>
        <CodeBlock label="crypto" code={`import crypto from 'crypto';
const token = crypto.randomBytes(32).toString('hex');
const id    = crypto.randomUUID();
const sha   = s => crypto.createHash('sha256').update(s).digest('hex');
const hmac  = crypto.createHmac('sha256', secret).update(body).digest('hex');
const valid = crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));

function encrypt(text, key) {
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv('aes-256-gcm', key, iv);
  const enc = Buffer.concat([c.update(text, 'utf8'), c.final()]);
  return { iv: iv.toString('hex'), data: enc.toString('hex'), tag: c.getAuthTag().toString('hex') };
}`} />
        <CodeBlock label="child_process + stream" code={`import { spawn, fork } from 'child_process';
import { pipeline } from 'stream';
import { promisify } from 'util';

const execAsync = promisify(require('child_process').exec);
const pipe      = promisify(pipeline);

const { stdout } = await execAsync('git log --oneline -5');

const proc = spawn('find', ['.', '-name', '*.ts']);
proc.stdout.on('data', c => process.stdout.write(c));

const worker = fork('./worker.js');
worker.send({ task: 'resize', file: './img.jpg' });
const result = await new Promise(r => worker.once('message', r));

await pipe(
  createReadStream('./data.json'),
  createGzip(),
  createWriteStream('./data.json.gz')
);`} />
      </div>
    ),
    mistakes: (
      <div>
        {[
          { color: D.red, title: "readFileSync in a server — blocks ALL requests",
            bad: `app.get('/data', (req, res) => {
  const data = fs.readFileSync('./huge.json'); // ❌ blocks!
  res.json(JSON.parse(data));
});`,
            good: `app.get('/data', async (req, res) => {
  const data = await fs.promises.readFile('./huge.json', 'utf8');
  res.json(JSON.parse(data)); // ✅ event loop free
});` },
          { color: "#f59e0b", title: "exports = {} instead of module.exports",
            bad: `exports = { add, subtract };
// ❌ disconnects from module.exports
// require('./math') returns {} — nothing!`,
            good: `module.exports = { add, subtract }; // ✅` },
          { color: "#8b5cf6", title: "No 'error' listener on EventEmitter",
            bad: `const em = new EventEmitter();
em.emit('error', new Error('Oops'));
// ❌ Unhandled 'error' event → Node crashes!`,
            good: `em.on('error', err => {
  console.error('Caught:', err.message); // ✅ survives
});` },
          { color: "#f59e0b", title: "exec() for large command output",
            bad: `exec('find / -name "*.log"', (err, stdout) => {
  // ❌ stdout = gigabytes → crash
});`,
            good: `const proc = spawn('find', ['/', '-name', '*.log']);
proc.stdout.on('data', c => process.stdout.write(c)); // ✅` },
          { color: "#14b8a6", title: "pipe() instead of pipeline()",
            bad: `readStream.pipe(transform).pipe(writeStream);
// ❌ Error in transform → streams stay open → leak`,
            good: `const pipe = promisify(pipeline);
await pipe(readStream, transform, writeStream); // ✅` },
        ].map((item, i) => (
          <div key={i} style={{ border: `1px solid ${item.color}28`, borderRadius: 8, overflow: "hidden", marginBottom: 10 }}>
            <div style={{ padding: "8px 14px", background: item.color + "0d", fontSize: 11, fontWeight: 700, color: item.color, fontFamily: mono }}>💀 {item.title}</div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 160, padding: "10px 14px", borderRight: `1px solid ${D.outline}`, borderTop: `1px solid ${D.outline}` }}>
                <div style={{ fontSize: 9, color: D.red, fontFamily: mono, marginBottom: 4 }}>❌ WRONG</div>
                <pre style={{ margin: 0, fontSize: 10, color: D.red + "bb", fontFamily: mono, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{item.bad}</pre>
              </div>
              <div style={{ flex: 1, minWidth: 160, padding: "10px 14px", borderTop: `1px solid ${D.outline}` }}>
                <div style={{ fontSize: 9, color: D.greenText, fontFamily: mono, marginBottom: 4 }}>✅ CORRECT</div>
                <pre style={{ margin: 0, fontSize: 10, color: D.greenText + "bb", fontFamily: mono, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{item.good}</pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  };
  return (
    <div>
      <p style={para}>Everything on one page. <strong style={{ color: "#ec4899" }}>Bookmark this.</strong></p>
      <div style={{ display: "flex", gap: 5, marginBottom: 14, flexWrap: "wrap" }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#ec489922" : "transparent", border: `1px solid ${tab === t.id ? "#ec4899" : D.outline}`, color: tab === t.id ? "#ec4899" : D.muted, borderRadius: 5, cursor: "pointer", fontWeight: tab === t.id ? 700 : 400 }}>{t.label}</button>)}
      </div>
      {content[tab]}
    </div>
  );
}
