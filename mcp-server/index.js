#!/usr/bin/env node

/**
 * Ensign Key Projects Dashboard — Model Context Protocol (MCP) Server
 * Rob Bagley, Associate Director Career Services, Ensign College
 * Supports Claude Code, OpenAI Codex, and Google Antigravity
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const DATA_FILE = path.join(__dirname, '..', 'data', 'projects.json');

function loadProjects() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (err) {
    console.error('Error loading projects:', err);
  }
  return [];
}

function saveProjects(projects) {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error saving projects:', err);
    return false;
  }
}

function matchesUserView(project, userView) {
  if (!userView || userView === 'all') return true;
  const owner = (project.owner || '').toLowerCase();
  const delegated = (project.delegatedOwner || '').toLowerCase();
  const title = (project.title || '').toLowerCase();
  const desc = (project.description || '').toLowerCase();
  const id = (project.id || '').toLowerCase();

  switch (userView.toLowerCase()) {
    case 'rob':
      if (delegated.includes('rob')) return true;
      if (!delegated && (owner.includes('rob') || !owner)) return true;
      return false;
    case 'rodrigo':
      if (delegated.includes('rodrigo') || delegated.includes('moll') || delegated.includes('victor') || delegated.includes('mendoza')) return true;
      if (owner.includes('rodrigo') || owner.includes('moll') || owner.includes('victor') || owner.includes('mendoza')) return true;
      if (id.includes('ens101') || id.includes('appfix')) return true;
      return false;
    case 'greg':
      if (delegated.includes('greg') || delegated.includes('fox')) return true;
      if (owner.includes('greg') || owner.includes('fox')) return true;
      if (id.includes('peoplegrove') || id.includes('employer') || title.includes('employer') || desc.includes('greg fox')) return true;
      return false;
    case 'karla':
      if (delegated.includes('karla') || delegated.includes('groom')) return true;
      if (owner.includes('karla') || owner.includes('groom')) return true;
      if (id.includes('internship') || id.includes('car398') || title.includes('internship') || desc.includes('karla')) return true;
      return false;
    case 'kurt':
      if (delegated.includes('kurt') || delegated.includes('jones')) return true;
      if (owner.includes('kurt') || owner.includes('jones')) return true;
      if (id.includes('prison') || title.includes('prison') || desc.includes('prison') || desc.includes('kurt jones')) return true;
      return false;
    case 'joseph':
      if (delegated.includes('joseph') || delegated.includes('bonilla') || delegated.includes('abarca')) return true;
      if (owner.includes('joseph') || owner.includes('bonilla') || owner.includes('abarca')) return true;
      if (id.includes('alumni') || title.includes('alumni') || desc.includes('joseph')) return true;
      return false;
    default:
      return true;
  }
}

// Tool Definitions
const TOOLS = [
  {
    name: 'list_key_projects',
    description: 'List key projects and Eisenhower matrix tasks from the Ensign Key Projects Dashboard.',
    inputSchema: {
      type: 'object',
      properties: {
        quadrant: { type: 'string', enum: ['all', 'Q1', 'Q2', 'Q3', 'Q4'], description: 'Filter by Eisenhower quadrant: Q1 (Do First), Q2 (Strategic Mission), Q3 (Delegate), Q4 (Triage).' },
        user: { type: 'string', enum: ['all', 'rob', 'rodrigo', 'greg', 'karla', 'kurt', 'joseph'], description: 'Filter by coworker user view workspace.' },
        owner: { type: 'string', description: 'Filter by owner or delegated owner name.' },
        status: { type: 'string', enum: ['all', 'In Progress', 'Completed', 'Blocked', 'On Track'], description: 'Filter by project status.' },
        pillar: { type: 'string', enum: ['all', 'Capable', 'Trusted', 'Community'], description: 'Filter by Ensign College mission pillar.' },
        mikesReportOnly: { type: 'boolean', description: 'Show only cards selected for Mike Ray 1:1 briefing report.' }
      }
    }
  },
  {
    name: 'get_project_status',
    description: 'Get detailed status, milestones, attachments, and start prompt for a specific key project.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'The project ID (e.g. car398-canvas-fixes, ens101-polish).' },
        query: { type: 'string', description: 'Optional title/description search query if ID is not known.' }
      }
    }
  },
  {
    name: 'create_key_project',
    description: 'Create a new key project card or task on the Ensign Key Projects Dashboard.',
    inputSchema: {
      type: 'object',
      required: ['title'],
      properties: {
        title: { type: 'string', description: 'Project title.' },
        description: { type: 'string', description: 'Brief summary of objectives and scope.' },
        quadrant: { type: 'string', enum: ['Q1', 'Q2', 'Q3', 'Q4'], description: 'Eisenhower quadrant (default: Q1).' },
        pillar: { type: 'string', enum: ['Capable', 'Trusted', 'Community'], description: 'Mission pillar (default: Capable).' },
        department: { type: 'string', description: 'Department category (Career Mentor, AI & Operations, Internships, Alumni, Employer Relations, PBWE, Training).' },
        owner: { type: 'string', description: 'Assumed or primary lead (default: Rob Bagley).' },
        delegatedOwner: { type: 'string', description: 'Coworker delegated to (e.g. Rodrigo Moll, Gregory Fox, Karla Groom).' },
        dueDate: { type: 'string', description: 'Target completion date in YYYY-MM-DD format.' },
        link: { type: 'string', description: 'Primary web or repo link.' },
        inMikesReport: { type: 'boolean', description: 'Include in Director Mike Ray 1:1 Executive Briefing.' }
      }
    }
  },
  {
    name: 'update_key_project',
    description: 'Update project status, progress percentage, delegation, or milestones on a card.',
    inputSchema: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'The project ID to update.' },
        status: { type: 'string', enum: ['In Progress', 'Completed', 'Blocked', 'On Track'], description: 'New status.' },
        progress: { type: 'number', minimum: 0, maximum: 100, description: 'Completion percentage (0-100).' },
        delegatedOwner: { type: 'string', description: 'New delegated coworker name (or empty string to clear).' },
        inMikesReport: { type: 'boolean', description: 'Toggle inclusion in Mike Ray 1:1 report.' },
        isRemoved: { type: 'boolean', description: 'Mark as archived/completed from active board.' }
      }
    }
  },
  {
    name: 'add_card_attachment',
    description: 'Add a document URL link (OneDrive, SharePoint, GitHub, Canvas) or attachment to a project card.',
    inputSchema: {
      type: 'object',
      required: ['id', 'name', 'url'],
      properties: {
        id: { type: 'string', description: 'The project ID to attach to.' },
        name: { type: 'string', description: 'Attachment title or document label.' },
        url: { type: 'string', description: 'Document URL (OneDrive link, GitHub issue/PR, Canvas link, etc.).' },
        type: { type: 'string', enum: ['link', 'file'], description: 'Attachment type (default: link).' }
      }
    }
  },
  {
    name: 'get_mikes_1on1_report',
    description: 'Generate the complete executive briefing report for Rob Bagley and Director Mike Ray 1:1 in Markdown format.',
    inputSchema: {
      type: 'object',
      properties: {
        scope: { type: 'string', enum: ['mikes', 'all'], description: "Scope of report: 'mikes' for curated cards, 'all' for all active projects." }
      }
    }
  },
  {
    name: 'get_user_view',
    description: 'Get the personalized dashboard workspace for a specific coworker (e.g. Rodrigo Moll, Greg Fox, Karla Groom).',
    inputSchema: {
      type: 'object',
      required: ['user'],
      properties: {
        user: { type: 'string', enum: ['rob', 'rodrigo', 'greg', 'karla', 'kurt', 'joseph'], description: 'Coworker perspective view.' }
      }
    }
  },
  {
    name: 'get_kanban_board',
    description: 'Get the Trello/Kanban board view of key projects grouped by workflow status columns: On Track, In Progress, Blocked, and Completed.',
    inputSchema: {
      type: 'object',
      properties: {
        quadrant: { type: 'string', enum: ['all', 'Q1', 'Q2', 'Q3', 'Q4'], description: 'Optional Eisenhower quadrant filter.' },
        user: { type: 'string', enum: ['all', 'rob', 'rodrigo', 'greg', 'karla', 'kurt', 'joseph'], description: 'Optional coworker user view filter.' }
      }
    }
  }
];

// Execution Handlers
function handleToolCall(name, args) {
  const projects = loadProjects();

  switch (name) {
    case 'list_key_projects': {
      let filtered = projects.filter(p => !p.isRemoved);
      if (args.quadrant && args.quadrant !== 'all') {
        filtered = filtered.filter(p => p.quadrant.toUpperCase() === args.quadrant.toUpperCase());
      }
      if (args.user && args.user !== 'all') {
        filtered = filtered.filter(p => matchesUserView(p, args.user));
      }
      if (args.owner && args.owner !== 'all') {
        const o = args.owner.toLowerCase();
        filtered = filtered.filter(p => (p.owner && p.owner.toLowerCase().includes(o)) || (p.delegatedOwner && p.delegatedOwner.toLowerCase().includes(o)));
      }
      if (args.status && args.status !== 'all') {
        filtered = filtered.filter(p => p.status.toLowerCase() === args.status.toLowerCase());
      }
      if (args.pillar && args.pillar !== 'all') {
        filtered = filtered.filter(p => p.pillar.toLowerCase() === args.pillar.toLowerCase());
      }
      if (args.mikesReportOnly) {
        filtered = filtered.filter(p => !!p.inMikesReport);
      }

      return {
        count: filtered.length,
        projects: filtered.map(p => ({
          id: p.id,
          title: p.title,
          quadrant: p.quadrant,
          status: p.status,
          progress: `${p.progress}%`,
          owner: p.owner,
          delegatedOwner: p.delegatedOwner || null,
          department: p.department,
          pillar: p.pillar,
          dueDate: p.dueDate,
          inMikesReport: !!p.inMikesReport,
          attachmentsCount: (p.attachments || []).length
        }))
      };
    }

    case 'get_project_status': {
      let proj = null;
      if (args.id) {
        proj = projects.find(p => p.id === args.id);
      }
      if (!proj && args.query) {
        const q = args.query.toLowerCase();
        proj = projects.find(p => p.title.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q));
      }
      if (!proj) return { error: 'Project not found.' };
      return proj;
    }

    case 'create_key_project': {
      const id = 'proj-' + Date.now();
      const newProj = {
        id,
        title: args.title,
        quadrant: args.quadrant || 'Q1',
        pillar: args.pillar || 'Capable',
        department: args.department || 'AI & Operations',
        status: 'In Progress',
        progress: 0,
        dueDate: args.dueDate || new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
        owner: args.owner || 'Rob Bagley',
        delegatedOwner: args.delegatedOwner || '',
        needsDelegation: !!args.delegatedOwner || args.quadrant === 'Q3',
        description: args.description || '',
        link: args.link || '',
        promptDoc: `${id}.md`,
        inMikesReport: args.inMikesReport !== undefined ? args.inMikesReport : (args.quadrant === 'Q1'),
        attachments: [],
        milestones: [],
        isRemoved: false,
        dateCreated: new Date().toISOString()
      };
      projects.unshift(newProj);
      saveProjects(projects);
      return { success: true, message: `Created project "${newProj.title}" (${newProj.id})`, project: newProj };
    }

    case 'update_key_project': {
      const proj = projects.find(p => p.id === args.id);
      if (!proj) return { error: `Project ${args.id} not found.` };

      if (args.status !== undefined) proj.status = args.status;
      if (args.progress !== undefined) proj.progress = args.progress;
      if (args.delegatedOwner !== undefined) {
        proj.delegatedOwner = args.delegatedOwner;
        proj.needsDelegation = !!args.delegatedOwner;
        if (args.delegatedOwner) proj.owner = args.delegatedOwner;
      }
      if (args.inMikesReport !== undefined) proj.inMikesReport = args.inMikesReport;
      if (args.isRemoved !== undefined) proj.isRemoved = args.isRemoved;

      saveProjects(projects);
      return { success: true, message: `Updated project "${proj.title}"`, project: proj };
    }

    case 'add_card_attachment': {
      const proj = projects.find(p => p.id === args.id);
      if (!proj) return { error: `Project ${args.id} not found.` };

      if (!Array.isArray(proj.attachments)) proj.attachments = [];

      const att = {
        id: 'att-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
        name: args.name,
        type: args.type || 'link',
        url: args.url,
        dateAdded: new Date().toISOString()
      };

      proj.attachments.push(att);
      saveProjects(projects);
      return { success: true, message: `Added attachment "${att.name}" to ${proj.title}`, attachment: att };
    }

    case 'get_mikes_1on1_report': {
      const scope = args.scope || 'mikes';
      let active = projects.filter(p => !p.isRemoved);
      if (scope === 'mikes') active = active.filter(p => !!p.inMikesReport);

      const q1 = active.filter(p => p.quadrant === 'Q1');
      const q2 = active.filter(p => p.quadrant === 'Q2');
      const q3 = active.filter(p => p.quadrant === 'Q3');
      const q4 = active.filter(p => p.quadrant === 'Q4');

      const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      let md = `# Executive Project Briefing — Director 1:1 Review\n`;
      md += `**Date:** ${today}\n`;
      md += `**Prepared by:** Rob Bagley, Associate Director Career Services\n`;
      md += `**Scope:** ${scope === 'mikes' ? "Curated Mike Ray 1:1 Key Projects" : "All Active Projects"} (${active.length} items)\n\n`;

      const formatSec = (title, list) => {
        let s = `## ${title} (${list.length})\n`;
        if (list.length === 0) return s + `*None active.*\n\n`;
        list.forEach((p, idx) => {
          s += `### ${idx + 1}. ${p.title} (${p.progress}% — ${p.status})\n`;
          s += `- **Lead:** ${p.delegatedOwner ? `${p.delegatedOwner} (Delegated)` : (p.owner || 'Rob Bagley')}\n`;
          s += `- **Department:** ${p.department || 'Career Mentor'} | **Mission Pillar:** ${p.pillar || 'Capable'}\n`;
          s += `- **Due Date:** ${p.dueDate || 'Ongoing'}\n`;
          if (p.description) s += `- **Summary:** ${p.description}\n`;
          if (p.attachments && p.attachments.length > 0) {
            s += `- **Attachments:** ${p.attachments.map(a => `[${a.name}](${a.url || '#'})`).join(', ')}\n`;
          }
          s += `\n`;
        });
        return s;
      };

      md += formatSec("1. Urgent & Critical (Do First — Q1)", q1);
      md += formatSec("2. Strategic Mission Alignment (Deep Focus — Q2)", q2);
      md += formatSec("3. Delegated & Operational Tasks (Q3)", q3);
      md += formatSec("4. Backlog & Low-Priority Triage (Q4)", q4);

      return { markdown: md, totalItems: active.length };
    }

    case 'get_user_view': {
      const u = args.user;
      const matching = projects.filter(p => !p.isRemoved && matchesUserView(p, u));
      return {
        user: u,
        count: matching.length,
        projects: matching
      };
    }

    case 'get_kanban_board': {
      let filtered = projects.filter(p => !p.isRemoved);
      if (args.quadrant && args.quadrant !== 'all') {
        filtered = filtered.filter(p => p.quadrant.toUpperCase() === args.quadrant.toUpperCase());
      }
      if (args.user && args.user !== 'all') {
        filtered = filtered.filter(p => matchesUserView(p, args.user));
      }

      const columns = {
        onTrack: filtered.filter(p => p.status === 'On Track' || !['In Progress', 'Blocked', 'Completed'].includes(p.status)),
        inProgress: filtered.filter(p => p.status === 'In Progress'),
        blocked: filtered.filter(p => p.status === 'Blocked'),
        completed: filtered.filter(p => p.status === 'Completed')
      };

      return {
        view: 'kanban',
        total: filtered.length,
        counts: {
          onTrack: columns.onTrack.length,
          inProgress: columns.inProgress.length,
          blocked: columns.blocked.length,
          completed: columns.completed.length
        },
        columns
      };
    }

    default:
      return { error: `Unknown tool: ${name}` };
  }
}

// JSON-RPC 2.0 stdio Interface for MCP
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  if (!line.trim()) return;
  try {
    const msg = JSON.parse(line);
    const { id, method, params } = msg;

    if (method === 'initialize') {
      const resp = {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: {
            name: 'ensign-key-projects',
            version: '1.0.0'
          }
        }
      };
      process.stdout.write(JSON.stringify(resp) + '\n');
    } else if (method === 'notifications/initialized') {
      // client acknowledgment
    } else if (method === 'tools/list') {
      const resp = {
        jsonrpc: '2.0',
        id,
        result: {
          tools: TOOLS
        }
      };
      process.stdout.write(JSON.stringify(resp) + '\n');
    } else if (method === 'tools/call') {
      const { name, arguments: toolArgs } = params || {};
      const result = handleToolCall(name, toolArgs || {});
      const resp = {
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: typeof result === 'string' ? result : JSON.stringify(result, null, 2)
            }
          ]
        }
      };
      process.stdout.write(JSON.stringify(resp) + '\n');
    } else {
      const resp = {
        jsonrpc: '2.0',
        id,
        error: { code: -32601, message: 'Method not found' }
      };
      process.stdout.write(JSON.stringify(resp) + '\n');
    }
  } catch (err) {
    console.error('JSON-RPC parse error:', err);
  }
});
