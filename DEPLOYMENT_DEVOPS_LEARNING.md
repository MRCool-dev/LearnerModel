# Deployment & DevOps - Complete Learning Module

## What is DevOps?

DevOps is the practice of combining software development (Dev) and IT operations (Ops). The goal: ship code faster, more reliably, and with less manual work.

---

## 1. Docker - Containerization

Docker packages your app with all its dependencies into a container that runs identically everywhere.

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

USER node

CMD ["node", "server.js"]
```

```bash
# Build and run
docker build -t myapp .
docker run -p 3000:3000 myapp

# Docker Compose
docker-compose up -d
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://db:5432/myapp
    depends_on:
      - db
  
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

---

## 2. PM2 - Process Manager

PM2 keeps your Node.js app running forever, restarts it on crashes, and enables clustering.

```bash
npm install -g pm2

# Start app
pm2 start server.js --name "api"

# Start with cluster mode (use all CPU cores)
pm2 start server.js -i max

# Common commands
pm2 list
pm2 logs
pm2 reload api      # zero-downtime restart
pm2 stop api
pm2 delete api
pm2 save            # save process list
pm2 startup         # auto-start on boot
```

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'api',
    script: './server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: { NODE_ENV: 'development' },
    env_production: { NODE_ENV: 'production' },
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    merge_logs: true,
    max_memory_restart: '500M'
  }]
};
```

---

## 3. nginx - Reverse Proxy

nginx sits in front of your Node.js app, handling SSL, static files, and load balancing.

```nginx
server {
    listen 80;
    server_name api.example.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.example.com;

    ssl_certificate /etc/letsencrypt/live/api.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.example.com/privkey.pem;

    # Static files
    location /static/ {
        alias /var/www/static/;
        expires 30d;
    }

    # Proxy to Node.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 4. CI/CD - Continuous Integration / Deployment

GitHub Actions example:

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to server
        run: |
          ssh user@server "cd /app && git pull && npm ci && pm2 reload api"
```

---

## 5. Environment Management

```bash
# .env (never commit this!)
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://localhost:5432/myapp
JWT_SECRET=your-super-secret-key
REDIS_URL=redis://localhost:6379
```

```javascript
// config.js
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  isProduction: process.env.NODE_ENV === 'production'
};
```

---

## 6. Monitoring & Health Checks

```javascript
// Health check endpoint
app.get('/health', async (req, res) => {
  const checks = {
    database: await checkDatabase(),
    redis: await checkRedis(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: Date.now()
  };
  
  const healthy = checks.database && checks.redis;
  res.status(healthy ? 200 : 503).json(checks);
});
```

### Log Aggregation

```javascript
// Structured logging
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

logger.info('User logged in', { userId: 123, ip: '1.2.3.4' });
logger.error('Payment failed', { error: err.message, orderId: 456 });
```

---

## KEY CONCEPTS TO REMEMBER

| Concept | What It Means |
|---------|--------------|
| **Container** | Lightweight, isolated runtime environment |
| **Image** | Read-only template for creating containers |
| **Volume** | Persistent storage for container data |
| **Reverse Proxy** | Server that forwards requests to backend servers |
| **Load Balancing** | Distributing traffic across multiple servers |
| **Zero-Downtime** | Deploying without interrupting active users |
| **Health Check** | Endpoint that reports system status |
| **Structured Logs** | Machine-readable logs (usually JSON) |
| **CI/CD** | Automated testing and deployment pipeline |
| **Environment Variables** | Configuration outside the codebase |

---

## PRACTICE EXERCISES

1. Dockerize a Node.js app with a Dockerfile
2. Set up docker-compose with app + PostgreSQL + Redis
3. Configure PM2 with cluster mode
4. Set up nginx as a reverse proxy with SSL
5. Create a GitHub Actions CI/CD pipeline
6. Add health check and structured logging endpoints

---

**Today's Date:** 2026-05-15

Ship it. Monitor it. Sleep well.
