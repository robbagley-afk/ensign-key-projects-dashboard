'use strict';
// Shared Key Projects - Career Services server: static files + /api/* backed by SQLite, passcode gate.
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const store = require('./db');
global.__projectStore = store;

const ROOT = path.join(__dirname, '..');
const PORT = Number(process.env.PORT || 8097);
const HOST = process.env.HOST || '127.0.0.1';
const PASSCODE = process.env.KEY_PROJECTS_PASSCODE;
const SECRET = process.env.KEY_PROJECTS_COOKIE_SECRET || PASSCODE;
if (!PASSCODE || PASSCODE.length < 8) { console.error('KEY_PROJECTS_PASSCODE (min 8 chars) is required'); process.exit(1); }

const handlers = {
  projects: require('../api/projects.js'),
  attachment: require('../api/attachment.js'),
  summary: require('../api/summary.js')
};
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json', '.md': 'text/markdown; charset=utf-8' };
const STATIC_FILES = new Set(['index.html', 'app.js', 'style.css', 'site.webmanifest', 'favicon.svg', 'favicon.ico', 'favicon-16x16.png', 'favicon-32x32.png', 'apple-touch-icon.png', 'android-chrome-192x192.png', 'android-chrome-512x512.png']);

const sign = v => crypto.createHmac('sha256', SECRET).update(v).digest('hex');
const eq = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && crypto.timingSafeEqual(x, y); };
const COOKIE = 'kp_auth';
const COOKIE_DAYS = 400; // browser maximum: enter the passcode once per browser, then stay signed in
const setAuthCookie = res => res.setHeader('Set-Cookie', `${COOKIE}=${makeToken()}; HttpOnly; Secure; SameSite=Lax; Max-Age=${COOKIE_DAYS * 86400}`);
const makeToken = () => { const exp = Date.now() + COOKIE_DAYS * 864e5; return `${exp}.${sign('exp:' + exp)}`; };
const tokenOk = t => { if (!t) return false; const [exp, sig] = t.split('.'); return Number(exp) > Date.now() && sig && eq(sig, sign('exp:' + exp)); };
const cookies = req => Object.fromEntries((req.headers.cookie || '').split(';').map(c => c.trim().split(/=(.*)/s).slice(0, 2)).filter(a => a[0]));
function authed(req) {
  if (tokenOk(cookies(req)[COOKIE])) return true;
  const h = req.headers['x-passcode'] || (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  return !!h && eq(h, PASSCODE);
}
// Throttle failed attempts (global, since Funnel hides client IPs): 10 per minute.
let fails = [];
const throttled = () => { const t = Date.now(); fails = fails.filter(x => t - x < 60000); return fails.length >= 10; };

const loginPage = (msg) => `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Key Projects - Career Services</title>
<style>body{font-family:Inter,system-ui,sans-serif;background:#f4f6fa;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0}form{background:#fff;padding:32px;border-radius:12px;box-shadow:0 2px 12px #0002;width:min(340px,90vw)}h1{font-size:20px;margin:0 0 16px;color:#002e5d}input,button{width:100%;box-sizing:border-box;padding:12px;font-size:16px;margin-top:10px;border-radius:8px}input{border:1px solid #9aa5b5}button{background:#002e5d;color:#fff;border:0;cursor:pointer}.e{color:#b00020;margin-top:10px}</style>
<form method="POST" action="login"><h1>Key Projects - Career Services</h1><label>Team passcode<input name="passcode" type="password" autofocus autocomplete="current-password"></label><button>Open</button>${msg ? `<div class="e">${msg}</div>` : ''}</form>`;

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []; let n = 0;
    req.on('data', c => { n += c.length; if (n > 5e6) { reject(new Error('too large')); req.destroy(); } else chunks.push(c); });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}
function wrapRes(res) {
  res.status = c => { res.statusCode = c; return res; };
  res.send = t => res.end(t);
  res.json = o => { res.setHeader('Content-Type', 'application/json'); res.setHeader('Cache-Control', 'no-store'); res.end(JSON.stringify(o)); return res; };
  return res;
}

const server = http.createServer(async (req, res) => {
  wrapRes(res);
  try {
    const url = new URL(req.url, 'http://x');
    let p = decodeURIComponent(url.pathname);
    if (p === '/healthz') return res.json({ ok: true, projects: store.count() });

    if (p === '/login' && req.method === 'POST') {
      if (throttled()) return res.status(429).end('Too many attempts. Wait a minute.');
      const form = new URLSearchParams(await readBody(req));
      if (eq(form.get('passcode') || '', PASSCODE)) {
        setAuthCookie(res);
        res.statusCode = 303; res.setHeader('Location', './'); return res.end();
      }
      fails.push(Date.now());
      res.statusCode = 401; res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.end(loginPage('Wrong passcode.'));
    }
    if (!authed(req)) {
      if (p.startsWith('/api/')) return res.status(401).json({ error: 'Passcode required' });
      res.statusCode = p === '/' || p === '/index.html' ? 200 : 401;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.end(loginPage(''));
    }

    if (req.method === 'GET' && (p === '/' || p === '/index.html')) setAuthCookie(res); // sliding renewal on each visit
    if (p.startsWith('/api/')) {
      const name = p.slice(5).replace(/\.js$/, '');
      if (name === 'sync' && req.method === 'POST') {
        const b = JSON.parse((await readBody(req)) || '{}');
        return res.json({ results: store.pushRows(Array.isArray(b.projects) ? b.projects : []) });
      }
      if (name === 'projects' && req.method === 'GET' && url.searchParams.get('rows') === '1') {
        return res.json(store.loadRows());
      }
      const h = handlers[name];
      if (!h) return res.status(404).json({ error: 'Not found' });
      req.query = Object.fromEntries(url.searchParams);
      const raw = ['POST', 'PATCH', 'PUT', 'DELETE'].includes(req.method) ? await readBody(req) : '';
      try { req.body = raw ? JSON.parse(raw) : {}; } catch { return res.status(400).json({ error: 'Invalid JSON' }); }
      // The summary/markdown responses may not set content type via json(); handler decides.
      return await h(req, res);
    }

    if (p === '/') p = '/index.html';
    const rel = p.replace(/^\/+/, '');
    let file = null;
    if (STATIC_FILES.has(rel)) file = path.join(ROOT, rel);
    else if (/^prompts\/[\w.-]+$/i.test(rel)) file = path.join(ROOT, 'prompts', rel.split('/')[1]);
    if (!file || !fs.existsSync(file)) return res.status(404).end('Not found');
    res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'no-cache');
    return res.end(fs.readFileSync(file));
  } catch (e) {
    console.error(e);
    if (!res.headersSent) res.status(500).json({ error: 'Server error' }); else res.end();
  }
});
server.listen(PORT, HOST, () => console.log(`key-projects listening on http://${HOST}:${PORT} db=${store.DB_PATH}`));
process.on('SIGTERM', () => { server.close(() => process.exit(0)); });
