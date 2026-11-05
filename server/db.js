'use strict';
// SQLite store (node:sqlite, WAL). Table projects(id, body JSON, updated_at).
const { DatabaseSync } = require('node:sqlite');
const fs = require('fs');
const path = require('path');

const DB_PATH = process.env.KEY_PROJECTS_DB || path.join(process.env.HOME, 'Local-Infra', 'data', 'key-projects.sqlite');
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
const db = new DatabaseSync(DB_PATH);
db.exec('PRAGMA journal_mode=WAL; PRAGMA synchronous=NORMAL;');
db.exec('CREATE TABLE IF NOT EXISTS projects (id TEXT PRIMARY KEY, body TEXT NOT NULL, updated_at TEXT NOT NULL, seq INTEGER)');

const q = {
  all: db.prepare('SELECT id, body, updated_at FROM projects ORDER BY COALESCE(seq, 0) DESC, updated_at DESC'),
  get: db.prepare('SELECT id, body, updated_at FROM projects WHERE id = ?'),
  upsert: db.prepare('INSERT INTO projects (id, body, updated_at, seq) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET body=excluded.body, updated_at=excluded.updated_at'),
  maxSeq: db.prepare('SELECT COALESCE(MAX(seq), 0) AS m FROM projects')
};

function now() { return new Date().toISOString(); }

// Returns project array in stable order (newest-created first, as the JSON file used unshift).
function loadProjects() {
  return q.all.all().map(r => JSON.parse(r.body));
}
function loadRows() {
  return q.all.all().map(r => ({ ...JSON.parse(r.body), updatedAt: r.updated_at }));
}
// Persist a full array: upsert only rows whose JSON changed. New rows get a higher seq.
function saveProjects(projects) {
  const existing = new Map(q.all.all().map(r => [r.id, r.body]));
  let seq = q.maxSeq.get().m;
  const ts = now();
  db.exec('BEGIN');
  try {
    // projects[] is newest-first: assign seq so first element is highest among new rows
    const fresh = projects.filter(p => !existing.has(p.id));
    seq += fresh.length;
    let s = seq;
    for (const p of projects) {
      const body = JSON.stringify(p);
      if (!existing.has(p.id)) { q.upsert.run(p.id, body, ts, s--); }
      else if (existing.get(p.id) !== body) q.upsert.run(p.id, body, ts, null);
    }
    db.exec('COMMIT');
  } catch (e) { db.exec('ROLLBACK'); throw e; }
}
// Client sync: upsert given project bodies, last-write-wins by updatedAt (client's base time).
function pushRows(rows) {
  const out = [];
  let seq = q.maxSeq.get().m;
  db.exec('BEGIN');
  try {
    for (const r of rows) {
      if (!r || !r.id) continue;
      const { updatedAt: base, ...body } = r;
      const cur = q.get.get(r.id);
      if (cur && base && cur.updated_at > base) { out.push({ id: r.id, conflict: true, server: { ...JSON.parse(cur.body), updatedAt: cur.updated_at } }); continue; }
      const ts = now();
      q.upsert.run(r.id, JSON.stringify(body), ts, cur ? null : ++seq);
      out.push({ id: r.id, updatedAt: ts });
    }
    db.exec('COMMIT');
  } catch (e) { db.exec('ROLLBACK'); throw e; }
  return out;
}
function count() { return db.prepare('SELECT COUNT(*) AS c FROM projects').get().c; }
module.exports = { db, DB_PATH, loadProjects, loadRows, saveProjects, pushRows, count };
