const fs = require('fs');
const path = require('path');

// In-memory cache for serverless environments
let memoryProjects = null;

function loadProjects() {
  if (memoryProjects) return memoryProjects;
  try {
    const dataPath = path.join(process.cwd(), 'data', 'projects.json');
    if (fs.existsSync(dataPath)) {
      const raw = fs.readFileSync(dataPath, 'utf8');
      memoryProjects = JSON.parse(raw);
      return memoryProjects;
    }
  } catch (err) {
    console.error('Error reading data/projects.json:', err);
  }
  return [];
}

function saveProjects(projects) {
  memoryProjects = projects;
  try {
    const dataPath = path.join(process.cwd(), 'data', 'projects.json');
    fs.writeFileSync(dataPath, JSON.stringify(projects, null, 2), 'utf8');
  } catch (err) {
    // In read-only serverless lambdas, fs write may fail silently; memoryProjects retains state in warm lambdas
    console.warn('Note: Persistent file write not available in current environment, updated in-memory store.');
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

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const projects = loadProjects();

  // GET: List or fetch projects
  if (req.method === 'GET') {
    const { id, quadrant, user, owner, status, pillar, department, mikes, view } = req.query || {};

    if (id) {
      const proj = projects.find(p => p.id === id);
      if (!proj) return res.status(404).json({ error: 'Project not found', id });
      return res.status(200).json(proj);
    }

    let results = projects.filter(p => !p.isRemoved);

    if (quadrant && quadrant !== 'all') {
      results = results.filter(p => p.quadrant.toUpperCase() === quadrant.toUpperCase());
    }
    if (user && user !== 'all') {
      results = results.filter(p => matchesUserView(p, user));
    }
    if (owner && owner !== 'all') {
      const o = owner.toLowerCase();
      results = results.filter(p => (p.owner && p.owner.toLowerCase().includes(o)) || (p.delegatedOwner && p.delegatedOwner.toLowerCase().includes(o)));
    }
    if (status && status !== 'all') {
      results = results.filter(p => p.status.toLowerCase() === status.toLowerCase());
    }
    if (pillar && pillar !== 'all') {
      results = results.filter(p => p.pillar.toLowerCase() === pillar.toLowerCase());
    }
    if (department && department !== 'all') {
      results = results.filter(p => p.department.toLowerCase() === department.toLowerCase());
    }
    if (mikes === 'true' || mikes === '1') {
      results = results.filter(p => !!p.inMikesReport);
    }

    if (view && view.toLowerCase() === 'kanban') {
      const onTrack = results.filter(p => (p.status === 'On Track' || !['In Progress', 'Blocked', 'Completed'].includes(p.status)));
      const inProgress = results.filter(p => p.status === 'In Progress');
      const blocked = results.filter(p => p.status === 'Blocked');
      const completed = results.filter(p => p.status === 'Completed');
      return res.status(200).json({
        view: 'kanban',
        total: results.length,
        columns: {
          onTrack,
          inProgress,
          blocked,
          completed
        },
        counts: {
          onTrack: onTrack.length,
          inProgress: inProgress.length,
          blocked: blocked.length,
          completed: completed.length
        }
      });
    }

    return res.status(200).json(results);
  }

  // POST: Add new project / task
  if (req.method === 'POST') {
    const body = req.body || {};
    if (!body.title) {
      return res.status(400).json({ error: 'Title is required for a new project/task.' });
    }

    const id = body.id || 'proj-' + Date.now();
    const existing = projects.find(p => p.id === id);
    if (existing) {
      return res.status(409).json({ error: 'Project ID already exists.', id });
    }

    const newProject = {
      id,
      title: body.title,
      quadrant: body.quadrant || 'Q1',
      pillar: body.pillar || 'Capable',
      department: body.department || 'AI & Operations',
      status: body.status || 'In Progress',
      progress: typeof body.progress === 'number' ? body.progress : 0,
      dueDate: body.dueDate || new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      owner: body.owner || 'Rob Bagley',
      delegatedOwner: body.delegatedOwner || '',
      needsDelegation: body.needsDelegation !== undefined ? body.needsDelegation : (body.quadrant === 'Q3' || !!body.delegatedOwner),
      description: body.description || '',
      link: body.link || '',
      promptDoc: body.promptDoc || `${id}.md`,
      inMikesReport: body.inMikesReport !== undefined ? body.inMikesReport : (body.quadrant === 'Q1'),
      attachments: Array.isArray(body.attachments) ? body.attachments : [],
      milestones: Array.isArray(body.milestones) ? body.milestones : [],
      isRemoved: false,
      dateCreated: new Date().toISOString()
    };

    projects.unshift(newProject);
    saveProjects(projects);

    return res.status(201).json({ success: true, project: newProject });
  }

  // PATCH: Update project
  if (req.method === 'PATCH') {
    const body = req.body || {};
    const id = body.id || req.query.id;
    if (!id) {
      return res.status(400).json({ error: 'Project ID is required in body or query.' });
    }

    const proj = projects.find(p => p.id === id);
    if (!proj) {
      return res.status(404).json({ error: 'Project not found.', id });
    }

    const updatableFields = [
      'title', 'description', 'quadrant', 'pillar', 'department',
      'status', 'progress', 'dueDate', 'owner', 'delegatedOwner',
      'needsDelegation', 'link', 'promptDoc', 'inMikesReport',
      'attachments', 'milestones', 'isRemoved'
    ];

    updatableFields.forEach(field => {
      if (body[field] !== undefined) {
        proj[field] = body[field];
      }
    });

    saveProjects(projects);
    return res.status(200).json({ success: true, project: proj });
  }

  // DELETE: Remove or mark project as completed
  if (req.method === 'DELETE') {
    const id = req.query.id || (req.body && req.body.id);
    if (!id) {
      return res.status(400).json({ error: 'Project ID is required.' });
    }

    const proj = projects.find(p => p.id === id);
    if (!proj) {
      return res.status(404).json({ error: 'Project not found.', id });
    }

    proj.isRemoved = true;
    proj.status = 'Completed';
    proj.progress = 100;
    saveProjects(projects);

    return res.status(200).json({ success: true, message: `Project ${id} archived.` });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
