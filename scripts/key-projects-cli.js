#!/usr/bin/env node

/**
 * CLI Tool for Ensign Key Projects Dashboard
 * Usable directly by Rob, AI Agents (Antigravity, Codex, Claude Code), and automation scripts.
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'projects.json');

function loadProjects() {
  if (fs.existsSync(DATA_FILE)) {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  }
  return [];
}

function saveProjects(projects) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2), 'utf8');
}

const args = process.argv.slice(2);
const command = args[0] || 'help';

function parseFlags(arr) {
  const flags = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].startsWith('--')) {
      const key = arr[i].replace(/^--/, '');
      const next = arr[i + 1];
      if (next && !next.startsWith('--')) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = true;
      }
    }
  }
  return flags;
}

const flags = parseFlags(args.slice(1));

switch (command) {
  case 'list': {
    const projects = loadProjects().filter(p => !p.isRemoved);
    let filtered = projects;

    if (flags.quadrant) {
      filtered = filtered.filter(p => p.quadrant.toUpperCase() === flags.quadrant.toUpperCase());
    }
    if (flags.owner) {
      const o = flags.owner.toLowerCase();
      filtered = filtered.filter(p => (p.owner && p.owner.toLowerCase().includes(o)) || (p.delegatedOwner && p.delegatedOwner.toLowerCase().includes(o)));
    }
    if (flags.user) {
      const u = flags.user.toLowerCase();
      filtered = filtered.filter(p => {
        const own = (p.owner || '').toLowerCase();
        const del = (p.delegatedOwner || '').toLowerCase();
        return own.includes(u) || del.includes(u);
      });
    }
    if (flags.status) {
      filtered = filtered.filter(p => p.status.toLowerCase() === flags.status.toLowerCase());
    }
    if (flags.mike) {
      filtered = filtered.filter(p => !!p.inMikesReport);
    }

    console.log(`\n📋 Ensign Key Projects (${filtered.length} found):\n`);
    filtered.forEach(p => {
      const del = p.delegatedOwner ? ` 🤝 Delegated: ${p.delegatedOwner}` : ` 👤 Owner: ${p.owner}`;
      const att = (p.attachments && p.attachments.length > 0) ? ` [📎 ${p.attachments.length}]` : '';
      const mike = p.inMikesReport ? ' [⭐ 1:1]' : '';
      console.log(`• [${p.quadrant}] ${p.title} (${p.progress}% — ${p.status})${del}${att}${mike}`);
      console.log(`  ID: ${p.id} | Due: ${p.dueDate || 'N/A'} | Pillar: ${p.pillar}`);
      if (p.description) console.log(`  Summary: ${p.description}`);
      console.log('');
    });
    break;
  }

  case 'kanban': {
    const projects = loadProjects().filter(p => !p.isRemoved);
    let filtered = projects;

    if (flags.quadrant) {
      filtered = filtered.filter(p => p.quadrant.toUpperCase() === flags.quadrant.toUpperCase());
    }
    if (flags.owner) {
      const o = flags.owner.toLowerCase();
      filtered = filtered.filter(p => (p.owner && p.owner.toLowerCase().includes(o)) || (p.delegatedOwner && p.delegatedOwner.toLowerCase().includes(o)));
    }
    if (flags.user) {
      const u = flags.user.toLowerCase();
      filtered = filtered.filter(p => {
        const own = (p.owner || '').toLowerCase();
        const del = (p.delegatedOwner || '').toLowerCase();
        return own.includes(u) || del.includes(u);
      });
    }

    const columns = [
      { name: '📥 BACKLOG', status: 'Backlog', match: p => p.status === 'Backlog' || ((p.progress || 0) === 0 && !['On Track', 'In Progress', 'Blocked', 'Completed'].includes(p.status)) },
      { name: '🟢 ON TRACK / PLANNING', status: 'On Track', match: p => p.status === 'On Track' || ((p.progress || 0) > 0 && !['Backlog', 'In Progress', 'Blocked', 'Completed'].includes(p.status)) },
      { name: '🟡 IN PROGRESS', status: 'In Progress', match: p => p.status === 'In Progress' },
      { name: '🔴 BLOCKED / WAITING', status: 'Blocked', match: p => p.status === 'Blocked' },
      { name: '✅ COMPLETED', status: 'Completed', match: p => p.status === 'Completed' }
    ];

    console.log(`\n======================================================`);
    console.log(`   📊 ENSIGN KEY PROJECTS — TRELLO / KANBAN BOARD`);
    console.log(`   Total Projects: ${filtered.length}`);
    console.log(`======================================================\n`);

    columns.forEach(col => {
      const items = filtered.filter(col.match);
      console.log(`\n┌─────────────────────────────────────────────────────`);
      console.log(`│ ${col.name} (${items.length})`);
      console.log(`└─────────────────────────────────────────────────────`);
      if (items.length === 0) {
        console.log(`  (No cards in this column)\n`);
      } else {
        items.forEach(p => {
          const lead = p.delegatedOwner ? `🤝 Delegated: ${p.delegatedOwner}` : `👤 ${p.owner}`;
          const att = (p.attachments && p.attachments.length > 0) ? ` [📎 ${p.attachments.length}]` : '';
          const star = p.inMikesReport ? ' [⭐ 1:1]' : '';
          console.log(`  • [${p.quadrant}] ${p.title} (${p.progress}%)${star}${att}`);
          console.log(`    ${lead} | Due: ${p.dueDate || 'Ongoing'} | ID: ${p.id}`);
        });
        console.log('');
      }
    });
    break;
  }

  case 'status': {
    const id = flags.id || args[1];
    if (!id) {
      console.error('Error: Please specify project ID with --id <id> or as argument.');
      process.exit(1);
    }
    const projects = loadProjects();
    const p = projects.find(item => item.id === id || item.id.includes(id));
    if (!p) {
      console.error(`Project "${id}" not found.`);
      process.exit(1);
    }
    console.log(JSON.stringify(p, null, 2));
    break;
  }

  case 'add': {
    const title = flags.title;
    if (!title) {
      console.error('Error: Project title required (--title "...")');
      process.exit(1);
    }
    const projects = loadProjects();
    const id = flags.id || 'proj-' + Date.now();
    const newP = {
      id,
      title,
      quadrant: flags.quadrant || 'Q1',
      pillar: flags.pillar || 'Capable',
      department: flags.department || 'AI & Operations',
      status: flags.status || 'In Progress',
      progress: flags.progress ? parseInt(flags.progress, 10) : 0,
      dueDate: flags.due || flags.dueDate || new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      owner: flags.owner || 'Rob Bagley',
      delegatedOwner: flags.delegate || flags.delegatedOwner || '',
      needsDelegation: !!(flags.delegate || flags.delegatedOwner) || flags.quadrant === 'Q3',
      description: flags.desc || flags.description || '',
      link: flags.link || '',
      promptDoc: `${id}.md`,
      inMikesReport: flags.mike === true || flags.quadrant === 'Q1',
      attachments: flags.url ? [{ id: 'att-1', name: flags.urlName || 'Attachment', type: 'link', url: flags.url, dateAdded: new Date().toISOString() }] : [],
      milestones: [],
      isRemoved: false,
      dateCreated: new Date().toISOString()
    };
    projects.unshift(newP);
    saveProjects(projects);
    console.log(`✅ Created project "${newP.title}" with ID: ${newP.id}`);
    break;
  }

  case 'attach': {
    const id = flags.id || args[1];
    const url = flags.url;
    const name = flags.name || flags.title || url;
    if (!id || !url) {
      console.error('Error: Project ID (--id) and URL (--url) are required.');
      process.exit(1);
    }
    const projects = loadProjects();
    const p = projects.find(item => item.id === id || item.id.includes(id));
    if (!p) {
      console.error(`Project "${id}" not found.`);
      process.exit(1);
    }
    if (!Array.isArray(p.attachments)) p.attachments = [];
    const att = {
      id: 'att-' + Date.now(),
      name,
      type: flags.type || (url.startsWith('http') ? 'link' : 'file'),
      url,
      dateAdded: new Date().toISOString()
    };
    p.attachments.push(att);
    saveProjects(projects);
    console.log(`✅ Added attachment "${name}" to project "${p.title}" (${p.id})`);
    break;
  }

  case 'update': {
    const id = flags.id || args[1];
    if (!id) {
      console.error('Error: Project ID (--id) is required.');
      process.exit(1);
    }
    const projects = loadProjects();
    const p = projects.find(item => item.id === id || item.id.includes(id));
    if (!p) {
      console.error(`Project "${id}" not found.`);
      process.exit(1);
    }
    if (flags.status) p.status = flags.status;
    if (flags.progress !== undefined) p.progress = parseInt(flags.progress, 10);
    if (flags.delegate) {
      p.delegatedOwner = flags.delegate;
      p.needsDelegation = true;
      p.owner = flags.delegate;
    }
    if (flags.mike !== undefined) p.inMikesReport = flags.mike === 'true' || flags.mike === true;
    if (flags.remove) p.isRemoved = true;
    if (flags.restore) p.isRemoved = false;
    saveProjects(projects);
    console.log(`✅ Updated project "${p.title}"`);
    break;
  }

  case 'report': {
    const projects = loadProjects().filter(p => !p.isRemoved);
    const active = flags.mike ? projects.filter(p => !!p.inMikesReport) : projects;
    console.log(`\n======================================================`);
    console.log(`   👔 EXECUTIVE PROJECT BRIEFING — MIKE RAY 1:1`);
    console.log(`   Scope: ${flags.mike ? 'Curated 1:1 Cards' : 'All Projects'} (${active.length} items)`);
    console.log(`======================================================\n`);
    ['Q1', 'Q2', 'Q3', 'Q4'].forEach(quad => {
      const list = active.filter(p => p.quadrant === quad);
      console.log(`--- [${quad}] (${list.length} projects) ---`);
      list.forEach(p => {
        console.log(`• ${p.title} (${p.progress}% — ${p.status})`);
        console.log(`  Lead: ${p.delegatedOwner ? p.delegatedOwner + ' (Delegated)' : p.owner} | Due: ${p.dueDate || 'Ongoing'}`);
        if (p.attachments && p.attachments.length > 0) {
          console.log(`  📎 Attachments: ${p.attachments.map(a => a.name).join(', ')}`);
        }
      });
      console.log('');
    });
    break;
  }

  default:
    console.log(`
Ensign Key Projects CLI Tool
Usage:
  node key-projects-cli.js list [--quadrant Q1|Q2|Q3|Q4] [--owner <name>] [--mike]
  node key-projects-cli.js status --id <project-id>
  node key-projects-cli.js add --title "..." [--quadrant Q1] [--owner "..."] [--link "..."]
  node key-projects-cli.js attach --id <project-id> --url "https://..." --name "..."
  node key-projects-cli.js update --id <project-id> [--progress 85] [--status "In Progress"]
  node key-projects-cli.js report [--mike]
`);
}
