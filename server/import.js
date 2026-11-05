'use strict';
// Idempotent seed import: inserts rows missing by id from data/projects.json.
const fs = require('fs'); const path = require('path');
const store = require('./db');
const seed = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'projects.json'), 'utf8'));
const have = new Set(store.loadProjects().map(p => p.id));
const add = seed.filter(p => !have.has(p.id));
// insert so that seed order is preserved (first = newest)
if (add.length) store.saveProjects(add.concat(store.loadProjects()));
console.log(JSON.stringify({ db: store.DB_PATH, seedCount: seed.length, alreadyPresent: seed.length - add.length, inserted: add.length, total: store.count() }));
