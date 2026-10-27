/**
 * Ensign Key Projects & Situational Awareness Dashboard
 * Eisenhower Matrix, Ensign College Mission Alignment & Department Categorization
 * Rob Bagley, Associate Director Career Services
 */

const STORAGE_KEY = 'ensign_key_projects_data_v4';
const LEGACY_STORAGE_KEY = 'ensign_key_projects_data_v3';
const LEGACY_STORAGE_KEY_V2 = 'ensign_key_projects_data_v2';

// Official CIS All Team roster from Outlook group (cis_all_team@ensign.edu)
const CIS_TEAM_MEMBERS = [
  { name: 'Rob Bagley', role: 'Associate Director' },
  { name: 'Mike Ray', role: 'Director' },
  { name: 'Gregory Fox', role: 'Assoc Director Employer/Alumni' },
  { name: 'Rodrigo Moll (Victor Mendoza)', role: 'DevOps Lead / Mentor' },
  { name: 'Karla Groom', role: 'Internship Coordinator' },
  { name: 'Joseph Bonilla Abarca', role: 'Alumni Network' },
  { name: '(Paula) Maria Gutierrez Gonzalez', role: 'Career Services' },
  { name: 'Alvaro Mendiola Fuenzalida', role: 'Career Services' },
  { name: 'Miguel Santo', role: 'Career Services' },
  { name: 'Aqeel Emmanuel', role: 'Team Member' },
  { name: 'Beverly Chapman', role: 'Team Member' },
  { name: 'Brenda Wyatt', role: 'Team Member' },
  { name: 'Dandy Alan De Leon', role: 'Career Mentor' },
  { name: 'Debbie Whitney', role: 'Team Member' },
  { name: 'Dennis Watson', role: 'Team Member' },
  { name: 'Deo Datus Maganga', role: 'Team Member' },
  { name: 'Douglas Whitney', role: 'Team Member' },
  { name: 'Elder L. Navarro', role: 'Senior Missionary' },
  { name: 'Elder M. Baggaley', role: 'Senior Missionary' },
  { name: 'Erere Iwhi', role: 'Team Member' },
  { name: 'Fernando Munoz Jimenez', role: 'Team Member' },
  { name: 'Gessica Velasco Trujillo', role: 'Team Member' },
  { name: 'Grover Vasquez Pari', role: 'Team Member' },
  { name: 'Ismael Rodriguez Gomez', role: 'Team Member' },
  { name: 'Joel Velarde Suxo', role: 'Team Member' },
  { name: 'Jorge Bracamontes Sotelo', role: 'Team Member' },
  { name: 'Julio Jaramillo Videla', role: 'Team Member' },
  { name: 'Kevin Strawn', role: 'Team Member' },
  { name: 'Kurt Jones', role: 'Senior Missionary / PBWE' },
  { name: 'Roy Wyatt', role: 'Team Member' },
  { name: 'Stan Neeleman', role: 'Team Member' },
  { name: 'Thomas Wang', role: 'Team Member' },
  { name: 'Trudy Robinson', role: 'Team Member' }
];

// Initial Canonical Projects from Mem Notes & Director 1:1s
const DEFAULT_PROJECTS = [
  {
    id: 'car398-canvas-fixes',
    promptDoc: 'car398-canvas-fixes.md',
    title: 'CAR 398 Canvas Course Fixes & Gradebook Sync',
    quadrant: 'Q1', // Urgent & Important (Do First)
    pillar: 'Capable', // Capable Disciples
    department: 'Career Mentor',
    status: 'In Progress',
    progress: 60,
    dueDate: '2026-11-05',
    owner: 'Rob Bagley',
    delegatedOwner: '',
    needsDelegation: false,
    description: 'Fixing Canvas assignment modules, rubrics, and gradebook sync issues for CAR 398 Internship course students.',
    link: 'https://ensign.instructure.com',
    isRemoved: false,
    milestones: ['Audit broken assignment links', 'Fix rubric grading criteria', 'Sync gradebook passback', 'Notify enrolled students'],
    attachments: [
      { id: 'att-car398-1', name: 'Canvas CAR 398 Course & Gradebook', type: 'link', url: 'https://ensign.instructure.com', dateAdded: '2026-10-27T10:00:00Z' },
      { id: 'att-car398-2', name: 'Start Prompt: car398-canvas-fixes.md', type: 'link', url: 'PROMPTS/car398-canvas-fixes.md', dateAdded: '2026-10-27T10:00:00Z' }
    ]
  },
  {
    id: 'vmock-ingestion',
    promptDoc: 'vmock-ingestion.md',
    title: 'VMock Full Module Ingestion & Scoring Engine',
    quadrant: 'Q1', // Urgent & Important (Do First)
    pillar: 'Capable',
    department: 'AI & Operations',
    status: 'Completed',
    progress: 100,
    dueDate: '2026-11-01',
    owner: 'Rob Bagley',
    delegatedOwner: '',
    needsDelegation: false,
    description: 'Ingesting 7,024 student records across all 6 VMock reporting modules to calculate real-time readiness scores and verify resume feedback.',
    link: 'https://github.com/robbagley-afk/ensign-student-readiness-hub',
    isRemoved: false,
    milestones: ['Parse all 6 module fields', 'Download 9.7MB report', 'Pass 167 unit tests', 'Deploy live to port 5055'],
    attachments: [
      { id: 'att-vmock-1', name: 'Student Readiness Hub Repository', type: 'link', url: 'https://github.com/robbagley-afk/ensign-student-readiness-hub', dateAdded: '2026-10-27T10:00:00Z' },
      { id: 'att-vmock-2', name: 'Start Prompt: vmock-ingestion.md', type: 'link', url: 'PROMPTS/vmock-ingestion.md', dateAdded: '2026-10-27T10:00:00Z' }
    ]
  },
  {
    id: 'ens101-polish',
    promptDoc: 'ens101-polish.md',
    title: 'ENS 101 Guide Mentor Desk & Completion Glow',
    quadrant: 'Q1', // Urgent & Important (Do First)
    pillar: 'Capable',
    department: 'Career Mentor',
    status: 'In Progress',
    progress: 90,
    dueDate: '2026-11-15',
    owner: 'Rodrigo Moll (Victor Mendoza)',
    delegatedOwner: 'Rodrigo Moll (Victor Mendoza)',
    needsDelegation: true,
    description: 'Simplifying and polishing the ENS 101 mentor app. Issue #28 active for Amazon orange Next Step button with completion glow.',
    link: 'https://github.com/robbagley-afk/ENS-101-Guide/issues/28',
    isRemoved: false,
    milestones: ['Two-screen layout live on 5050', 'Register Issue #28 with Rodrigo', 'Implement completion lighting', 'Verify design system audit'],
    attachments: [
      { id: 'att-ens101-1', name: 'GitHub Issue #28 (Orange Next Step Glow)', type: 'link', url: 'https://github.com/robbagley-afk/ENS-101-Guide/issues/28', dateAdded: '2026-10-27T10:00:00Z' },
      { id: 'att-ens101-2', name: 'Start Prompt: ens101-polish.md', type: 'link', url: 'PROMPTS/ens101-polish.md', dateAdded: '2026-10-27T10:00:00Z' }
    ]
  },
  {
    id: 'internship-tool',
    promptDoc: 'internship-tool.md',
    title: 'Internship Approval Process & Web Tool',
    quadrant: 'Q1', // Urgent & Important (Do First)
    pillar: 'Capable',
    department: 'Internships',
    status: 'Blocked',
    progress: 70,
    dueDate: '2026-11-20',
    owner: 'Karla Groom',
    delegatedOwner: 'Karla Groom',
    needsDelegation: true,
    description: 'Replacing Smartsheet with custom approval workflow, saving ~$1,500/yr. Resolving final feedback approval bottleneck with Sister Groom.',
    link: 'https://github.com/robbagley-afk',
    isRemoved: false,
    milestones: ['Replace Smartsheet core logic', 'Train Sister Whitney', 'Sister Groom final feedback review', 'Full production rollout'],
    attachments: [
      { id: 'att-intern-1', name: 'Career Services Tools GitHub', type: 'link', url: 'https://github.com/robbagley-afk', dateAdded: '2026-10-27T10:00:00Z' },
      { id: 'att-intern-2', name: 'Start Prompt: internship-tool.md', type: 'link', url: 'PROMPTS/internship-tool.md', dateAdded: '2026-10-27T10:00:00Z' }
    ]
  },
  {
    id: 'career-ui-suite',
    promptDoc: 'career-ui-suite.md',
    title: 'Ensign Career Apps Design System Restyle',
    quadrant: 'Q2', // Important, Not Urgent (Strategic Mission)
    pillar: 'Capable',
    department: 'AI & Operations',
    status: 'In Progress',
    progress: 85,
    dueDate: '2026-12-01',
    owner: 'Rob Bagley',
    delegatedOwner: '',
    needsDelegation: true,
    description: 'Aligning all 10 portfolio tools to Ensign Career Coach design system (56px touch targets, accessibility WCAG AA, local LM Studio). Needs DevOps delegation.',
    link: 'https://github.com/robbagley-afk/ensign-design-system',
    isRemoved: false,
    milestones: ['Decommission cloud fallback (PR 23)', 'Audit ENS 101 & Readiness Hub', 'Mentor Explorer 5046 release', 'Phase 2 runtime audit across all ports'],
    attachments: [
      { id: 'att-ui-1', name: 'Ensign Design System Repo', type: 'link', url: 'https://github.com/robbagley-afk/ensign-design-system', dateAdded: '2026-10-27T10:00:00Z' },
      { id: 'att-ui-2', name: 'Start Prompt: career-ui-suite.md', type: 'link', url: 'PROMPTS/career-ui-suite.md', dateAdded: '2026-10-27T10:00:00Z' }
    ]
  },
  {
    id: 'workshop-redesign',
    promptDoc: 'workshop-redesign.md',
    title: 'Career Workshop & CAR 201 Curriculum Redesign',
    quadrant: 'Q2', // Important, Not Urgent (Strategic Mission)
    pillar: 'Trusted', // Trusted Disciples
    department: 'Training',
    status: 'In Progress',
    progress: 65,
    dueDate: '2026-12-15',
    owner: 'Rob Bagley',
    delegatedOwner: '',
    needsDelegation: false,
    description: 'Restructuring career prep curriculum around natural student motivation: Job Search first, LinkedIn networking, and AI resume crafting.',
    link: 'https://mem.ai',
    isRemoved: false,
    milestones: ['College version completed', 'GEC version final review', 'AI-assisted resume templates', 'Launch with Fall semester mentors'],
    attachments: [
      { id: 'att-ws-1', name: 'Mem.ai Workshop Notes', type: 'link', url: 'https://mem.ai', dateAdded: '2026-10-27T10:00:00Z' },
      { id: 'att-ws-2', name: 'Start Prompt: workshop-redesign.md', type: 'link', url: 'PROMPTS/workshop-redesign.md', dateAdded: '2026-10-27T10:00:00Z' }
    ]
  },
  {
    id: 'peoplegrove-alumni',
    promptDoc: 'peoplegrove-alumni.md',
    title: 'Ensign Connect & PeopleGrove Mentoring Network',
    quadrant: 'Q2', // Important, Not Urgent (Strategic Mission)
    pillar: 'Community', // Church & Community
    department: 'Alumni',
    status: 'On Track',
    progress: 75,
    dueDate: '2027-01-15',
    owner: 'Gregory Fox',
    delegatedOwner: 'Gregory Fox',
    needsDelegation: true,
    description: 'Strengthening community discipleship through student-alumni career roadmaps, LinkedIn sign-ups, and monthly engagement.',
    link: 'https://ensign.peoplegrove.com',
    isRemoved: false,
    milestones: ['Deliver PeopleGrove utilization report', 'LinkedIn-first onboarding flow', 'Alumni roadmap adaptation', 'Track mentor message exchanges'],
    attachments: [
      { id: 'att-pg-1', name: 'Ensign Connect Portal (PeopleGrove)', type: 'link', url: 'https://ensign.peoplegrove.com', dateAdded: '2026-10-27T10:00:00Z' },
      { id: 'att-pg-2', name: 'Start Prompt: peoplegrove-alumni.md', type: 'link', url: 'PROMPTS/peoplegrove-alumni.md', dateAdded: '2026-10-27T10:00:00Z' }
    ]
  },
  {
    id: 'employer-portal',
    promptDoc: 'employer-portal.md',
    title: 'Employer Relations Hiring Partner & Job Fair Portal',
    quadrant: 'Q2', // Important, Not Urgent (Strategic Mission)
    pillar: 'Community',
    department: 'Employer Relations',
    status: 'In Progress',
    progress: 45,
    dueDate: '2027-01-30',
    owner: 'Gregory Fox',
    delegatedOwner: 'Gregory Fox',
    needsDelegation: true,
    description: 'Direct pipeline connecting local employers to students for internships and career placement without third-party friction.',
    link: 'https://ensign.edu',
    isRemoved: false,
    milestones: ['Employer survey synthesis', 'Draft job fair reservation system', 'Alumni employer outreach batch', 'Automated invitation pipeline'],
    attachments: [
      { id: 'att-emp-1', name: 'Ensign College Employer Resources', type: 'link', url: 'https://ensign.edu', dateAdded: '2026-10-27T10:00:00Z' },
      { id: 'att-emp-2', name: 'Start Prompt: employer-portal.md', type: 'link', url: 'PROMPTS/employer-portal.md', dateAdded: '2026-10-27T10:00:00Z' }
    ]
  },
  {
    id: 'prison-education',
    promptDoc: 'prison-education.md',
    title: 'Incarcerated Learners Prison Education Roadmap (PBWE)',
    quadrant: 'Q2', // Important, Not Urgent (Strategic Mission)
    pillar: 'Trusted',
    department: 'PBWE',
    status: 'In Progress',
    progress: 50,
    dueDate: '2027-02-01',
    owner: 'Kurt Jones',
    delegatedOwner: 'Kurt Jones',
    needsDelegation: true,
    description: 'Bringing Career Roadmaps 1-3 and offline on-device AI resume feedback into restricted prison Canvas environments at Draper.',
    link: 'https://mem.ai',
    isRemoved: false,
    milestones: ['Assess Canvas restrictions', 'Roadmap 1 mockup for incarcerated learners', 'Test offline local AI computer proposal', 'Instructor training'],
    attachments: [
      { id: 'att-pe-1', name: 'PBWE Draper Prison Canvas Proposal', type: 'link', url: 'https://mem.ai', dateAdded: '2026-10-27T10:00:00Z' },
      { id: 'att-pe-2', name: 'Start Prompt: prison-education.md', type: 'link', url: 'PROMPTS/prison-education.md', dateAdded: '2026-10-27T10:00:00Z' }
    ]
  },
  {
    id: 'fleet-infrastructure',
    promptDoc: 'fleet-infrastructure.md',
    title: 'Mac Fleet AI Teams & Local LLM Inference Stack',
    quadrant: 'Q2', // Important, Not Urgent (Strategic Mission)
    pillar: 'Capable',
    department: 'AI & Operations',
    status: 'On Track',
    progress: 90,
    dueDate: '2026-11-30',
    owner: 'Rob Bagley',
    delegatedOwner: '',
    needsDelegation: false,
    description: 'Mac Studio resident inference (:1234), Odysseus (:7001), credit gate (4.8% used), and automated fleet sync across Mac Studio, iMac, MacBook Pro.',
    link: 'https://github.com/robbagley-afk',
    isRemoved: false,
    milestones: ['LM Studio resident gemma4-26b-qat', 'Copilot Studio credit gate', 'Corner Office coordinator handoffs', 'Automated fleetsync across 3 Macs'],
    attachments: [
      { id: 'att-fleet-1', name: 'AI Teams GitHub', type: 'link', url: 'https://github.com/robbagley-afk', dateAdded: '2026-10-27T10:00:00Z' },
      { id: 'att-fleet-2', name: 'Start Prompt: fleet-infrastructure.md', type: 'link', url: 'PROMPTS/fleet-infrastructure.md', dateAdded: '2026-10-27T10:00:00Z' }
    ]
  },
  {
    id: 'appfix-dispatch',
    promptDoc: 'appfix-dispatch.md',
    title: 'DevOps AppFix & Continuous Bug Dispatch (appfix-cis)',
    quadrant: 'Q3', // Urgent, Not Important (Delegate & Automate)
    pillar: 'Capable',
    department: 'AI & Operations',
    status: 'Completed',
    progress: 100,
    dueDate: '2026-11-10',
    owner: 'Rodrigo Moll (Victor Mendoza)',
    delegatedOwner: 'Rodrigo Moll (Victor Mendoza)',
    needsDelegation: true,
    description: 'Automated issue intake via /appfix-cis, live Kanban board on Vercel, and GitHub dispatch to Rodrigo.',
    link: 'https://ensign-appfix-dashboard.vercel.app',
    isRemoved: false,
    milestones: ['Deploy Vercel Kanban board', 'Build /appfix-cis skill', '7-day auto-prune rule', 'Distribute to all fleet paths'],
    attachments: [
      { id: 'att-af-1', name: 'Live Ensign AppFix Dashboard', type: 'link', url: 'https://ensign-appfix-dashboard.vercel.app', dateAdded: '2026-10-27T10:00:00Z' },
      { id: 'att-af-2', name: 'Start Prompt: appfix-dispatch.md', type: 'link', url: 'PROMPTS/appfix-dispatch.md', dateAdded: '2026-10-27T10:00:00Z' }
    ]
  },
  {
    id: 'stale-tasks-triage',
    promptDoc: 'stale-tasks-triage.md',
    title: 'Overdue Tasks & Smartsheet Legacy Decommissioning',
    quadrant: 'Q4', // Not Urgent, Not Important (Eliminate & Triage)
    pillar: 'Community',
    department: 'Career Mentor',
    status: 'In Progress',
    progress: 30,
    dueDate: '2026-12-31',
    owner: 'Rob Bagley',
    delegatedOwner: '',
    needsDelegation: true,
    description: 'Triaging 150+ aged backlog tasks in TASKS.md and formal decommissioning of legacy spreadsheets. Needs student mentor delegation.',
    link: 'https://mem.ai',
    isRemoved: false,
    milestones: ['Audit 150+ aged items in TASKS.md', 'Decommission obsolete spreadsheets', 'Close 168-day BYUI coach card', 'Archive closed projects'],
    attachments: [
      { id: 'att-st-1', name: 'Mem AI Backlog Tasks', type: 'link', url: 'https://mem.ai', dateAdded: '2026-10-27T10:00:00Z' },
      { id: 'att-st-2', name: 'Start Prompt: stale-tasks-triage.md', type: 'link', url: 'PROMPTS/stale-tasks-triage.md', dateAdded: '2026-10-27T10:00:00Z' }
    ]
  }
];

// IndexedDB for Persistent Attachment File Blobs
const IDB_NAME = 'ensign_dashboard_db';
const IDB_STORE = 'attachments';
function openIDB() {
  return new Promise((resolve) => {
    if (!window.indexedDB) {
      resolve(null);
      return;
    }
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE, { keyPath: 'id' });
      }
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = () => resolve(null);
  });
}

async function saveIDBAttachment(item) {
  try {
    const db = await openIDB();
    if (!db) return false;
    return new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).put(item);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  } catch (err) {
    return false;
  }
}

async function getIDBAttachment(id) {
  try {
    const db = await openIDB();
    if (!db) return null;
    return new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const req = tx.objectStore(IDB_STORE).get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    return null;
  }
}

function getUserViewFromURL() {
  try {
    const params = new URLSearchParams(window.location.search);
    const u = params.get('user') || params.get('view');
    if (u && ['all', 'rob', 'rodrigo', 'greg', 'karla', 'kurt', 'joseph'].includes(u.toLowerCase())) {
      return u.toLowerCase();
    }
  } catch (e) {}
  return 'all';
}

function matchesUserView(project, userView) {
  if (!userView || userView === 'all') return true;
  
  const owner = (project.owner || '').toLowerCase();
  const delegated = (project.delegatedOwner || '').toLowerCase();
  const title = (project.title || '').toLowerCase();
  const desc = (project.description || '').toLowerCase();
  const id = (project.id || '').toLowerCase();

  switch (userView) {
    case 'rob':
      // Rob's view: projects owned by Rob and NOT delegated away, OR explicitly assigned/delegated to Rob
      if (delegated.includes('rob')) return true;
      if (!delegated && (owner.includes('rob') || !owner)) return true;
      return false;

    case 'rodrigo':
      // Rodrigo Moll / Victor Mendoza: devops lead, ENS 101, appfix, etc.
      if (delegated.includes('rodrigo') || delegated.includes('moll') || delegated.includes('victor') || delegated.includes('mendoza')) return true;
      if (owner.includes('rodrigo') || owner.includes('moll') || owner.includes('victor') || owner.includes('mendoza')) return true;
      if (id.includes('ens101') || id.includes('appfix')) return true;
      return false;

    case 'greg':
      // Gregory Fox: Assoc Director Employer & Alumni, PeopleGrove, Employer Portal
      if (delegated.includes('greg') || delegated.includes('fox')) return true;
      if (owner.includes('greg') || owner.includes('fox')) return true;
      if (id.includes('peoplegrove') || id.includes('employer') || title.includes('employer') || desc.includes('greg fox')) return true;
      return false;

    case 'karla':
      // Karla Groom: Internships Coordinator, CAR 398, Handshake internship tool
      if (delegated.includes('karla') || delegated.includes('groom')) return true;
      if (owner.includes('karla') || owner.includes('groom')) return true;
      if (id.includes('internship') || id.includes('car398') || title.includes('internship') || desc.includes('karla')) return true;
      return false;

    case 'kurt':
      // Kurt Jones: PBWE (Prison Education)
      if (delegated.includes('kurt') || delegated.includes('jones')) return true;
      if (owner.includes('kurt') || owner.includes('jones')) return true;
      if (id.includes('prison') || title.includes('prison') || desc.includes('prison') || desc.includes('kurt jones')) return true;
      return false;

    case 'joseph':
      // Joseph Bonilla Abarca: Alumni Network
      if (delegated.includes('joseph') || delegated.includes('bonilla') || delegated.includes('abarca')) return true;
      if (owner.includes('joseph') || owner.includes('bonilla') || owner.includes('abarca')) return true;
      if (id.includes('alumni') || title.includes('alumni') || desc.includes('joseph')) return true;
      return false;

    default:
      return true;
  }
}

let state = {
  projects: loadProjects(),
  currentView: 'matrix', // 'matrix' or 'list'
  filterQuadrant: 'all', // 'all', 'Q1', 'Q2', 'Q3', 'Q4'
  filterMikesReportOnly: false,
  execSummaryScope: 'mikes', // 'mikes' or 'all'
  filterDepartment: 'all',
  filterOwner: 'all',
  filterPillar: 'all',
  filterStatus: 'all',
  filterDelegation: 'all', // 'all', 'needs_delegation', 'delegated', 'rob_owned'
  searchQuery: '',
  myProjectsOnly: false,
  userView: getUserViewFromURL(),
  showRemoved: false
};

function loadProjects() {
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      raw = localStorage.getItem(LEGACY_STORAGE_KEY);
    }
    if (!raw) {
      raw = localStorage.getItem(LEGACY_STORAGE_KEY_V2);
    }
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(p => {
          // Normalization & Migration: ensure delegatedOwner and needsDelegation fields exist
          if (p.delegatedOwner === undefined) {
            if (p.owner && !p.owner.toLowerCase().includes('rob bagley') && !p.owner.toLowerCase().includes('rob')) {
              p.delegatedOwner = p.owner;
            } else {
              p.delegatedOwner = '';
            }
          }
          if (!p.promptDoc) {
            p.promptDoc = p.id ? `${p.id}.md` : 'prompt.md';
          }
          if (p.needsDelegation === undefined) {
            p.needsDelegation = p.quadrant === 'Q3' || !!p.delegatedOwner;
          }
          // Default assumed owner is Rob Bagley if not delegated or owner is empty
          if (!p.delegatedOwner && (!p.owner || p.owner.trim() === '')) {
            p.owner = 'Rob Bagley';
          }
          if (p.inMikesReport === undefined) {
            p.inMikesReport = p.quadrant === 'Q1' || p.id === 'career-ui-suite' || p.id === 'ens101-polish' || p.id === 'car398-canvas-fixes';
          }
          if (!Array.isArray(p.attachments)) {
            p.attachments = [];
            if (p.link) {
              p.attachments.push({
                id: 'att-res-' + p.id,
                name: (p.title || 'Project') + ' Resource Link',
                type: 'link',
                url: p.link,
                dateAdded: new Date().toISOString()
              });
            }
            if (p.promptDoc) {
              p.attachments.push({
                id: 'att-prompt-' + p.id,
                name: `Start Prompt (${p.promptDoc})`,
                type: 'link',
                url: `PROMPTS/${p.promptDoc}`,
                dateAdded: new Date().toISOString()
              });
            }
          }
          return p;
        });
      }
    }
  } catch (err) {
    console.warn('Error reading from localStorage:', err);
  }
  return JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
}

function saveProjects() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.projects));
  } catch (err) {
    console.error('Error saving to localStorage:', err);
  }
}

// DOM Elements
const viewMatrixBtn = document.getElementById('view-matrix-btn');
const viewListBtn = document.getElementById('view-list-btn');
const matrixView = document.getElementById('matrix-view');
const listView = document.getElementById('list-view');

const searchInput = document.getElementById('search-input');
const myProjectsBtn = document.getElementById('my-projects-btn');
const userViewSelect = document.getElementById('user-view-select');
const activeUserViewBanner = document.getElementById('active-user-view-banner');
const activeUserViewText = document.getElementById('active-user-view-text');
const clearUserViewBtn = document.getElementById('clear-user-view-btn');

const needsDelegationBtn = document.getElementById('needs-delegation-btn');
const needsDelegationCountEl = document.getElementById('needs-delegation-count');
const filterQuadrantSelect = document.getElementById('filter-quadrant-select');
const mikesReportBtn = document.getElementById('mikes-report-btn');
const mikesReportCountEl = document.getElementById('mikes-report-count');
const execSummaryBtn = document.getElementById('exec-summary-btn');
const activeQuadrantBanner = document.getElementById('active-quadrant-banner');
const activeQuadrantBannerText = document.getElementById('active-quadrant-banner-text');
const clearQuadrantBannerBtn = document.getElementById('clear-quadrant-banner-btn');
const formInMikesReport = document.getElementById('form-in-mikes-report');
const filterDepartment = document.getElementById('filter-department');
const filterOwner = document.getElementById('filter-owner');
const filterPillar = document.getElementById('filter-pillar');
const filterStatus = document.getElementById('filter-status');
const toggleRemovedBtn = document.getElementById('toggle-removed-btn');
const removedCountSpan = document.getElementById('removed-count');
const resetStorageBtn = document.getElementById('reset-storage-btn');
const addProjectBtn = document.getElementById('add-project-btn');

// Attachments & Resource Link Modal Elements
const modalAttachmentsCount = document.getElementById('modal-attachments-count');
const modalAttachmentsList = document.getElementById('modal-attachments-list');
const dropZone = document.getElementById('drop-zone');
const formFileInput = document.getElementById('form-attachment-file-input');
const formAttLinkName = document.getElementById('form-att-link-name');
const formAttLinkUrl = document.getElementById('form-att-link-url');
const btnAddAttachmentLink = document.getElementById('btn-add-attachment-link');

// Attachment Viewer Modal Elements
const attViewerModal = document.getElementById('attachment-viewer-modal');
const attViewerTitle = document.getElementById('att-viewer-title');
const attViewerSubtitle = document.getElementById('att-viewer-subtitle');
const attViewerList = document.getElementById('att-viewer-list');
const attViewerClose = document.getElementById('att-viewer-close');
const attViewerDoneBtn = document.getElementById('att-viewer-done-btn');
const attViewerEditBtn = document.getElementById('att-viewer-edit-btn');

const metricCardQ1 = document.querySelector('.metric-card.metric-q1');
const metricCardQ2 = document.querySelector('.metric-card.metric-q2');
const metricCardQ3 = document.querySelector('.metric-card.metric-q3');
const metricCardQ4 = document.querySelector('.metric-card.metric-q4');

const boxQ1 = document.querySelector('.q1-box');
const boxQ2 = document.querySelector('.q2-box');
const boxQ3 = document.querySelector('.q3-box');
const boxQ4 = document.querySelector('.q4-box');

const cardsQ1 = document.getElementById('cards-q1');
const cardsQ2 = document.getElementById('cards-q2');
const cardsQ3 = document.getElementById('cards-q3');
const cardsQ4 = document.getElementById('cards-q4');
const allProjectsList = document.getElementById('all-projects-list');

const countQ1 = document.getElementById('count-q1');
const countQ2 = document.getElementById('count-q2');
const countQ3 = document.getElementById('count-q3');
const countQ4 = document.getElementById('count-q4');

const countBadgeQ1 = document.getElementById('count-badge-q1');
const countBadgeQ2 = document.getElementById('count-badge-q2');
const countBadgeQ3 = document.getElementById('count-badge-q3');
const countBadgeQ4 = document.getElementById('count-badge-q4');

// Project Edit / Add Modal Elements
const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalCancel = document.getElementById('modal-cancel');
const projectForm = document.getElementById('project-form');
const modalTitle = document.getElementById('modal-title');
const formId = document.getElementById('form-id');
const formTitle = document.getElementById('form-title');
const formOwner = document.getElementById('form-owner');
const ownerDropdownList = document.getElementById('owner-dropdown-list');
const ownerToggleBtn = document.getElementById('owner-toggle-btn');
const formNeedsDelegation = document.getElementById('form-needs-delegation');
const formDelegatedOwner = document.getElementById('form-delegated-owner');
const delegatedDropdownList = document.getElementById('delegated-dropdown-list');
const delegatedToggleBtn = document.getElementById('delegated-toggle-btn');
const formDepartment = document.getElementById('form-department');
const formDueDate = document.getElementById('form-due-date');
const formQuadrant = document.getElementById('form-quadrant');
const formPillar = document.getElementById('form-pillar');
const formStatus = document.getElementById('form-status');
const formProgress = document.getElementById('form-progress');
const progressVal = document.getElementById('progress-val');
const formDescription = document.getElementById('form-description');
const formLink = document.getElementById('form-link');
const modalCompleteRemoveBtn = document.getElementById('modal-complete-remove-btn');
const modalRestoreBtn = document.getElementById('modal-restore-btn');

// Delegation Modal Elements
const delegateModal = document.getElementById('delegate-modal');
const delegateModalClose = document.getElementById('delegate-modal-close');
const delegateCancelBtn = document.getElementById('delegate-cancel-btn');
const delegateModalTitle = document.getElementById('delegate-modal-title');
const delegateModalSubtitle = document.getElementById('delegate-modal-subtitle');
const delegateCurrentStatus = document.getElementById('delegate-current-status');
const delegateFlagCheckbox = document.getElementById('delegate-flag-checkbox');
const delegateSearchInput = document.getElementById('delegate-search-input');
const delegatePicklist = document.getElementById('delegate-picklist');
const delegateRevertBtn = document.getElementById('delegate-revert-btn');

let currentDelegatingProjectId = null;

// Searchable Combobox for Owner/Lead in Project Edit Modal
function renderOwnerDropdown(filterText = '') {
  if (!ownerDropdownList) return;
  const query = filterText.toLowerCase().trim();
  const filtered = CIS_TEAM_MEMBERS.filter(m => 
    m.name.toLowerCase().includes(query) || (m.role && m.role.toLowerCase().includes(query))
  );

  ownerDropdownList.innerHTML = '';
  if (filtered.length === 0) {
    const li = document.createElement('li');
    li.className = 'combobox-option';
    li.style.color = '#94A3B8';
    li.textContent = `Use custom: "${filterText}"`;
    li.onmousedown = (e) => {
      e.preventDefault();
      formOwner.value = filterText;
      closeOwnerDropdown();
    };
    ownerDropdownList.appendChild(li);
    ownerDropdownList.style.display = 'block';
    return;
  }

  filtered.forEach(m => {
    const li = document.createElement('li');
    li.className = 'combobox-option';
    li.innerHTML = `
      <span>👤 ${escapeHTML(m.name)}</span>
      <span class="combobox-option-badge">${escapeHTML(m.role || 'Team')}</span>
    `;
    li.onmousedown = (e) => {
      e.preventDefault();
      formOwner.value = m.name;
      closeOwnerDropdown();
    };
    ownerDropdownList.appendChild(li);
  });
  ownerDropdownList.style.display = 'block';
}

function closeOwnerDropdown() {
  if (ownerDropdownList) ownerDropdownList.style.display = 'none';
}

if (formOwner) {
  formOwner.addEventListener('input', (e) => {
    renderOwnerDropdown(e.target.value);
  });

  formOwner.addEventListener('focus', () => {
    renderOwnerDropdown(formOwner.value);
  });
}

if (ownerToggleBtn) {
  ownerToggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (ownerDropdownList.style.display === 'block') {
      closeOwnerDropdown();
    } else {
      renderOwnerDropdown('');
      formOwner.focus();
    }
  });
}

// Searchable Combobox for Delegated Worker in Project Edit Modal (Uses same pick list as Owner/Lead)
function renderDelegatedDropdown(filterText = '') {
  if (!delegatedDropdownList) return;
  const query = filterText.toLowerCase().trim();
  const filtered = CIS_TEAM_MEMBERS.filter(m => 
    m.name.toLowerCase().includes(query) || (m.role && m.role.toLowerCase().includes(query))
  );

  delegatedDropdownList.innerHTML = '';

  // Top option to clear delegation (revert to Rob Bagley)
  const clearLi = document.createElement('li');
  clearLi.className = 'combobox-option';
  clearLi.style.color = '#64748B';
  clearLi.innerHTML = `
    <span>👤 None (Owner: Rob Bagley)</span>
    <span class="combobox-option-badge">Default Owner</span>
  `;
  clearLi.onmousedown = (e) => {
    e.preventDefault();
    formDelegatedOwner.value = '';
    closeDelegatedDropdown();
  };
  delegatedDropdownList.appendChild(clearLi);

  if (filtered.length === 0) {
    if (filterText.trim()) {
      const li = document.createElement('li');
      li.className = 'combobox-option';
      li.style.color = '#94A3B8';
      li.textContent = `Use custom: "${filterText}"`;
      li.onmousedown = (e) => {
        e.preventDefault();
        formDelegatedOwner.value = filterText;
        if (formNeedsDelegation) formNeedsDelegation.checked = true;
        closeDelegatedDropdown();
      };
      delegatedDropdownList.appendChild(li);
    }
  } else {
    filtered.forEach(m => {
      const isRob = m.name.toLowerCase().includes('rob bagley');
      const li = document.createElement('li');
      li.className = 'combobox-option';
      li.innerHTML = `
        <span>👤 ${escapeHTML(m.name)}</span>
        <span class="combobox-option-badge">${escapeHTML(m.role || 'Team')}</span>
      `;
      li.onmousedown = (e) => {
        e.preventDefault();
        if (isRob) {
          formDelegatedOwner.value = '';
        } else {
          formDelegatedOwner.value = m.name;
          if (formNeedsDelegation) formNeedsDelegation.checked = true;
        }
        closeDelegatedDropdown();
      };
      delegatedDropdownList.appendChild(li);
    });
  }

  delegatedDropdownList.style.display = 'block';
}

function closeDelegatedDropdown() {
  if (delegatedDropdownList) delegatedDropdownList.style.display = 'none';
}

if (formDelegatedOwner) {
  formDelegatedOwner.addEventListener('input', (e) => {
    renderDelegatedDropdown(e.target.value);
  });

  formDelegatedOwner.addEventListener('focus', () => {
    renderDelegatedDropdown(formDelegatedOwner.value);
  });
}

if (delegatedToggleBtn) {
  delegatedToggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (delegatedDropdownList.style.display === 'block') {
      closeDelegatedDropdown();
    } else {
      renderDelegatedDropdown('');
      formDelegatedOwner.focus();
    }
  });
}


document.addEventListener('click', (e) => {
  if (!e.target.closest('.combobox-wrapper')) {
    closeOwnerDropdown();
    closeDelegatedDropdown();
  }
});

if (formProgress) {
  formProgress.addEventListener('input', (e) => {
    progressVal.textContent = `${e.target.value}%`;
  });
}

// Delegation Modal Functionality
window.openDelegateModal = function(id) {
  const p = state.projects.find(item => item.id === id);
  if (!p) return;
  currentDelegatingProjectId = id;

  if (delegateModalTitle) {
    delegateModalTitle.textContent = `Delegate: ${p.title}`;
  }
  if (delegateModalSubtitle) {
    delegateModalSubtitle.textContent = `Select a coworker from the CIS team roster to take ownership. If unselected, Rob Bagley remains the assumed owner.`;
  }
  
  if (delegateCurrentStatus) {
    if (p.delegatedOwner) {
      delegateCurrentStatus.innerHTML = `
        <div class="status-banner-content is-delegated">
          <span class="status-icon">🤝</span>
          <div>
            <div class="status-heading">Currently Delegated to: <strong>${escapeHTML(p.delegatedOwner)}</strong></div>
            <div class="status-hint">Pick any coworker below to reassign, or clear delegation to return project to Rob Bagley.</div>
          </div>
        </div>
      `;
      if (delegateRevertBtn) delegateRevertBtn.style.display = 'inline-flex';
    } else {
      delegateCurrentStatus.innerHTML = `
        <div class="status-banner-content is-rob">
          <span class="status-icon">👤</span>
          <div>
            <div class="status-heading">Current Owner: <strong>Rob Bagley</strong> (Default / Assumed Owner)</div>
            <div class="status-hint">${p.needsDelegation ? '⚠️ Flagged as needing delegation. Select a coworker from the list below.' : 'Click any coworker from the list below to delegate this project.'}</div>
          </div>
        </div>
      `;
      if (delegateRevertBtn) delegateRevertBtn.style.display = 'none';
    }
  }

  if (delegateFlagCheckbox) {
    delegateFlagCheckbox.checked = !!p.needsDelegation;
  }
  if (delegateSearchInput) {
    delegateSearchInput.value = '';
  }
  renderDelegatePicklist('');

  if (delegateModal) {
    delegateModal.style.display = 'flex';
    setTimeout(() => {
      if (delegateSearchInput) delegateSearchInput.focus();
    }, 100);
  }
};

function closeDelegateModal() {
  if (delegateModal) delegateModal.style.display = 'none';
  currentDelegatingProjectId = null;
}

function renderDelegatePicklist(filterText = '') {
  if (!delegatePicklist) return;
  const query = filterText.toLowerCase().trim();
  
  // Show coworkers; Rob Bagley is displayed at bottom with distinct note if searched
  const filtered = CIS_TEAM_MEMBERS.filter(m => 
    m.name.toLowerCase().includes(query) || (m.role && m.role.toLowerCase().includes(query))
  );

  delegatePicklist.innerHTML = '';
  if (filtered.length === 0) {
    delegatePicklist.innerHTML = `<li class="picklist-empty">No coworkers found matching "${escapeHTML(filterText)}"</li>`;
    return;
  }

  const p = state.projects.find(item => item.id === currentDelegatingProjectId);
  const currentDelegated = p ? p.delegatedOwner : '';

  filtered.forEach(m => {
    const isSelected = currentDelegated === m.name;
    const isRob = m.name.toLowerCase().includes('rob bagley');
    const li = document.createElement('li');
    li.className = `picklist-item ${isSelected ? 'is-selected' : ''} ${isRob ? 'is-rob-item' : ''}`;
    
    li.innerHTML = `
      <div class="picklist-item-left">
        <span class="picklist-avatar">${isRob ? '👑' : '👤'}</span>
        <div class="picklist-names">
          <span class="picklist-name">${escapeHTML(m.name)}</span>
          <span class="picklist-role">${escapeHTML(m.role || 'Team Member')} ${isRob ? '(Default Owner)' : ''}</span>
        </div>
      </div>
      <div class="picklist-item-right">
        ${isSelected ? 
          '<span class="picklist-assigned-badge">Current Delegated Owner</span>' : 
          (isRob ? 
            '<span class="btn-select-coworker btn-select-rob">Keep with Rob</span>' : 
            '<span class="btn-select-coworker">Delegate ➔</span>')
        }
      </div>
    `;
    
    li.onclick = () => {
      if (isRob) {
        clearDelegation(currentDelegatingProjectId);
      } else {
        assignDelegation(currentDelegatingProjectId, m.name);
      }
    };
    delegatePicklist.appendChild(li);
  });
}

function assignDelegation(projectId, coworkerName) {
  const p = state.projects.find(item => item.id === projectId);
  if (!p) return;

  p.delegatedOwner = coworkerName;
  p.owner = coworkerName;
  p.needsDelegation = true;
  saveProjects();
  closeDelegateModal();
  render();
}

function clearDelegation(projectId) {
  const p = state.projects.find(item => item.id === projectId);
  if (!p) return;

  p.delegatedOwner = '';
  p.owner = 'Rob Bagley';
  if (delegateFlagCheckbox) {
    p.needsDelegation = delegateFlagCheckbox.checked;
  }
  saveProjects();
  closeDelegateModal();
  render();
}

if (delegateFlagCheckbox) {
  delegateFlagCheckbox.addEventListener('change', (e) => {
    const p = state.projects.find(item => item.id === currentDelegatingProjectId);
    if (p) {
      p.needsDelegation = e.target.checked;
      saveProjects();
      render();
    }
  });
}

if (delegateSearchInput) {
  delegateSearchInput.addEventListener('input', (e) => {
    renderDelegatePicklist(e.target.value);
  });
}

if (delegateModalClose) delegateModalClose.addEventListener('click', closeDelegateModal);
if (delegateCancelBtn) delegateCancelBtn.addEventListener('click', closeDelegateModal);
if (delegateRevertBtn) {
  delegateRevertBtn.addEventListener('click', () => {
    if (currentDelegatingProjectId) clearDelegation(currentDelegatingProjectId);
  });
}

// Switch Views
viewMatrixBtn.addEventListener('click', () => {
  state.currentView = 'matrix';
  viewMatrixBtn.classList.add('active');
  viewListBtn.classList.remove('active');
  matrixView.style.display = 'grid';
  listView.style.display = 'none';
  render();
});

viewListBtn.addEventListener('click', () => {
  state.currentView = 'list';
  viewListBtn.classList.add('active');
  viewMatrixBtn.classList.remove('active');
  matrixView.style.display = 'none';
  listView.style.display = 'block';
  render();
});

// "My Projects (Rob)" Quick Toggle (legacy support)
if (myProjectsBtn) {
  myProjectsBtn.addEventListener('click', () => {
    state.myProjectsOnly = !state.myProjectsOnly;
    if (state.myProjectsOnly) {
      myProjectsBtn.classList.add('active');
    } else {
      myProjectsBtn.classList.remove('active');
    }
    render();
  });
}

// User Perspective View Change Handler
if (userViewSelect) {
  userViewSelect.addEventListener('change', (e) => {
    state.userView = e.target.value;
    try {
      const url = new URL(window.location);
      if (state.userView === 'all') {
        url.searchParams.delete('user');
        url.searchParams.delete('view');
      } else {
        url.searchParams.set('user', state.userView);
      }
      window.history.replaceState({}, '', url);
    } catch (err) {}
    render();
  });
}

if (clearUserViewBtn) {
  clearUserViewBtn.addEventListener('click', () => {
    state.userView = 'all';
    try {
      const url = new URL(window.location);
      url.searchParams.delete('user');
      url.searchParams.delete('view');
      window.history.replaceState({}, '', url);
    } catch (err) {}
    render();
  });
}

// "Needs Delegation" Quick Toggle
if (needsDelegationBtn) {
  needsDelegationBtn.addEventListener('click', () => {
    if (state.filterDelegation === 'needs_delegation') {
      state.filterDelegation = 'all';
      needsDelegationBtn.classList.remove('active');
    } else {
      state.filterDelegation = 'needs_delegation';
      needsDelegationBtn.classList.add('active');
    }
    render();
  });
}

// Toggle Removed / Completed Cards View
toggleRemovedBtn.addEventListener('click', () => {
  state.showRemoved = !state.showRemoved;
  if (state.showRemoved) {
    toggleRemovedBtn.classList.add('active');
    toggleRemovedBtn.innerHTML = `📦 Hide Removed (<span id="removed-count">${getRemovedCount()}</span>)`;
  } else {
    toggleRemovedBtn.classList.remove('active');
    toggleRemovedBtn.innerHTML = `📦 Show Removed (<span id="removed-count">${getRemovedCount()}</span>)`;
  }
  render();
});

function getRemovedCount() {
  return state.projects.filter(p => p.isRemoved).length;
}

// Populate Owner Filter Dropdown with All CIS Team Members & Special Categories
function updateOwnerDropdown() {
  if (!filterOwner) return;
  const currentVal = filterOwner.value;
  const owners = new Set();
  
  // Add all official CIS team members
  CIS_TEAM_MEMBERS.forEach(m => owners.add(m.name));

  // Also include any custom owners
  state.projects.forEach(p => {
    if (p.owner) owners.add(p.owner.trim());
    if (p.delegatedOwner) owners.add(p.delegatedOwner.trim());
  });

  const sorted = Array.from(owners).sort((a, b) => a.localeCompare(b));
  
  filterOwner.innerHTML = `
    <option value="all">All Team Leads</option>
    <option value="__needs_delegation__">⚠️ Needs Delegation (Unassigned)</option>
    <option value="__delegated__">🤝 All Delegated Projects</option>
    <option value="__rob_owned__">👤 Rob Owned Projects</option>
  `;

  sorted.forEach(owner => {
    const opt = document.createElement('option');
    opt.value = owner;
    opt.textContent = owner;
    if (owner === currentVal) opt.selected = true;
    filterOwner.appendChild(opt);
  });
}

function getDelegationBadge(p) {
  if (p.delegatedOwner) {
    return `<span class="badge badge-delegated" title="Delegated to coworker: ${escapeHTML(p.delegatedOwner)}">🤝 Delegated: ${escapeHTML(p.delegatedOwner)}</span>`;
  }
  if (p.needsDelegation) {
    return `<span class="badge badge-needs-delegation" title="Flagged: This project needs to be delegated to a coworker">⚠️ Needs Delegation</span>`;
  }
  return '';
}

function getOwnerDisplay(p) {
  if (p.delegatedOwner) {
    return `<span class="card-owner card-owner-delegated" title="Delegated Owner">🤝 <strong>Delegated:</strong> ${escapeHTML(p.delegatedOwner)}</span>`;
  }
  const ownerName = p.owner || 'Rob Bagley';
  return `<span class="card-owner" title="Project Owner (Assumed Rob)">👤 ${escapeHTML(ownerName)}</span>`;
}

function getPillarBadge(pillar) {
  if (pillar === 'Capable') return '<span class="badge badge-pillar-capable" title="Developing professional competence and practical skills">🎓 Capable</span>';
  if (pillar === 'Trusted') return '<span class="badge badge-pillar-trusted" title="Developing spiritual integrity and moral character">✝️ Trusted</span>';
  if (pillar === 'Community') return '<span class="badge badge-pillar-community" title="Dedicated to strengthening Church, family, and community">🏛️ Church & Community</span>';
  return '';
}

function getStatusBadge(status) {
  if (status === 'On Track') return '<span class="badge badge-status-ontrack">🟢 On Track</span>';
  if (status === 'In Progress') return '<span class="badge badge-status-progress">🟡 In Progress</span>';
  if (status === 'Blocked') return '<span class="badge badge-status-blocked">🔴 Blocked</span>';
  if (status === 'Completed') return '<span class="badge badge-status-done">✅ Complete</span>';
  return `<span class="badge">${status}</span>`;
}

function getDepartmentBadge(dept) {
  if (!dept) return '';
  return `<span class="badge badge-dept" title="Department Category: ${escapeHTML(dept)}">🏢 ${escapeHTML(dept)}</span>`;
}

function getDueDateBadge(dueDate) {
  if (!dueDate) return '';
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate + 'T00:00:00');
  
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const options = { month: 'short', day: 'numeric' };
  const formatted = due.toLocaleDateString('en-US', options);

  let isSoon = false;
  let label = `📅 ${formatted}`;

  if (diffDays < 0) {
    isSoon = true;
    label = `⚠️ Overdue (${formatted})`;
  } else if (diffDays <= 7) {
    isSoon = true;
    label = `⏳ Due in ${diffDays}d (${formatted})`;
  }

  return `<span class="badge badge-due ${isSoon ? 'due-soon' : ''}" title="Target Due Date: ${dueDate}">${label}</span>`;
}

// Complete and Remove Action
window.completeAndRemoveProject = function(id) {
  const p = state.projects.find(item => item.id === id);
  if (!p) return;

  if (confirm(`Complete and remove "${p.title}" from active dashboard?`)) {
    p.progress = 100;
    p.status = 'Completed';
    p.isRemoved = true;
    p.completedDate = new Date().toISOString();
    saveProjects();
    render();
  }
};

// Restore Card Action
window.restoreProject = function(id) {
  const p = state.projects.find(item => item.id === id);
  if (!p) return;

  p.isRemoved = false;
  if (p.status === 'Completed') {
    p.status = 'In Progress';
    p.progress = 90;
  }
  saveProjects();
  render();
};

function render() {
  updateOwnerDropdown();

  // Update removed badge count
  const removedCount = getRemovedCount();
  const countEl = document.getElementById('removed-count');
  if (countEl) countEl.textContent = removedCount;

  // Update needs-delegation count badge in toolbar
  const needsDelCount = state.projects.filter(p => !p.isRemoved && (p.needsDelegation && !p.delegatedOwner)).length;
  if (needsDelegationCountEl) needsDelegationCountEl.textContent = needsDelCount;

  const filtered = state.projects.filter(p => {
    // Visibility filter: hide removed unless showRemoved is active
    if (!state.showRemoved && p.isRemoved) return false;
    if (state.showRemoved && !p.isRemoved) return false;

    // Filter Mike's Report only
    if (state.filterMikesReportOnly && !p.inMikesReport) return false;

    // User Perspective View Filter
    if (!matchesUserView(p, state.userView)) return false;

    // "My Projects (Rob)": matches projects owned by Rob (i.e. not delegated to a coworker, or explicitly assigned to Rob)
    if (state.myProjectsOnly) {
      if (p.delegatedOwner && !p.delegatedOwner.toLowerCase().includes('rob')) {
        return false;
      }
      if (p.owner && !p.owner.toLowerCase().includes('rob') && p.delegatedOwner) {
        return false;
      }
    }

    // Quick Delegation Filter Toggle
    if (state.filterDelegation === 'needs_delegation') {
      if (!(p.needsDelegation && !p.delegatedOwner)) return false;
    }

    // Department filter
    if (state.filterDepartment !== 'all' && p.department !== state.filterDepartment) return false;

    // Owner / Delegation dropdown filter
    if (state.filterOwner === '__needs_delegation__') {
      if (!(p.needsDelegation && !p.delegatedOwner)) return false;
    } else if (state.filterOwner === '__delegated__') {
      if (!p.delegatedOwner) return false;
    } else if (state.filterOwner === '__rob_owned__') {
      if (p.delegatedOwner) return false;
    } else if (state.filterOwner !== 'all') {
      const matchOwner = p.owner === state.filterOwner || p.delegatedOwner === state.filterOwner;
      if (!matchOwner) return false;
    }

    // Mission pillar filter
    if (state.filterPillar !== 'all' && p.pillar !== state.filterPillar) return false;

    // Status filter
    if (state.filterStatus !== 'all' && p.status !== state.filterStatus) return false;

    // Search query
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const matchTitle = (p.title || '').toLowerCase().includes(q);
      const matchOwner = (p.owner || '').toLowerCase().includes(q);
      const matchDelegated = (p.delegatedOwner || '').toLowerCase().includes(q);
      const matchDesc = (p.description || '').toLowerCase().includes(q);
      const matchDept = (p.department || '').toLowerCase().includes(q);
      if (!matchTitle && !matchOwner && !matchDelegated && !matchDesc && !matchDept) return false;
    }
    return true;
  });

  const q1 = filtered.filter(p => p.quadrant === 'Q1');
  const q2 = filtered.filter(p => p.quadrant === 'Q2');
  const q3 = filtered.filter(p => p.quadrant === 'Q3');
  const q4 = filtered.filter(p => p.quadrant === 'Q4');

  countQ1.textContent = q1.length;
  countQ2.textContent = q2.length;
  countQ3.textContent = q3.length;
  countQ4.textContent = q4.length;

  countBadgeQ1.textContent = q1.length;
  countBadgeQ2.textContent = q2.length;
  countBadgeQ3.textContent = q3.length;
  countBadgeQ4.textContent = q4.length;

  // Update Mike's Report counter & toggle button state
  const totalMikesCount = state.projects.filter(p => !p.isRemoved && p.inMikesReport).length;
  if (mikesReportCountEl) mikesReportCountEl.textContent = totalMikesCount;
  if (mikesReportBtn) {
    if (state.filterMikesReportOnly) mikesReportBtn.classList.add('active');
    else mikesReportBtn.classList.remove('active');
  }

  // Update Active Quadrant Banner
  if (activeQuadrantBanner) {
    if (state.filterQuadrant !== 'all') {
      activeQuadrantBanner.style.display = 'flex';
      const quadLabels = {
        Q1: 'Q1: Urgent & Important (Do First)',
        Q2: 'Q2: Strategic Mission (Deep Focus)',
        Q3: 'Q3: Urgent & Routine (Delegate)',
        Q4: 'Q4: Low Priority (Triage)'
      };
      if (activeQuadrantBannerText) {
        activeQuadrantBannerText.textContent = `Showing ${quadLabels[state.filterQuadrant] || state.filterQuadrant} projects only`;
      }
    } else {
      activeQuadrantBanner.style.display = 'none';
    }
  }

  // Update Active User View Banner & Selector
  if (activeUserViewBanner) {
    if (state.userView && state.userView !== 'all') {
      activeUserViewBanner.style.display = 'flex';
      const userLabels = {
        rob: 'Rob Bagley (Assoc Director)',
        rodrigo: 'Rodrigo Moll (DevOps Lead)',
        greg: 'Gregory Fox (Assoc Director)',
        karla: 'Karla Groom (Internships)',
        kurt: 'Kurt Jones (PBWE / Prison Ed)',
        joseph: 'Joseph Bonilla Abarca (Alumni)'
      };
      const label = userLabels[state.userView] || state.userView;
      const count = state.projects.filter(p => !p.isRemoved && matchesUserView(p, state.userView)).length;
      if (activeUserViewText) {
        activeUserViewText.textContent = `Viewing ${label}'s Workspace (${count} active projects & delegations)`;
      }
    } else {
      activeUserViewBanner.style.display = 'none';
    }
  }
  if (userViewSelect && userViewSelect.value !== state.userView) {
    userViewSelect.value = state.userView;
  }

  // Sync Metric Card Active Indicator & Quadrant Dropdown
  [metricCardQ1, metricCardQ2, metricCardQ3, metricCardQ4].forEach(card => card && card.classList.remove('active-quadrant-filter'));
  if (state.filterQuadrant === 'Q1' && metricCardQ1) metricCardQ1.classList.add('active-quadrant-filter');
  if (state.filterQuadrant === 'Q2' && metricCardQ2) metricCardQ2.classList.add('active-quadrant-filter');
  if (state.filterQuadrant === 'Q3' && metricCardQ3) metricCardQ3.classList.add('active-quadrant-filter');
  if (state.filterQuadrant === 'Q4' && metricCardQ4) metricCardQ4.classList.add('active-quadrant-filter');

  if (filterQuadrantSelect && filterQuadrantSelect.value !== state.filterQuadrant) {
    filterQuadrantSelect.value = state.filterQuadrant;
  }

  if (state.currentView === 'matrix') {
    const quadrantBoxes = { Q1: boxQ1, Q2: boxQ2, Q3: boxQ3, Q4: boxQ4 };
    if (state.filterQuadrant === 'all') {
      Object.values(quadrantBoxes).forEach(box => {
        if (box) {
          box.style.display = '';
          box.style.gridColumn = '';
        }
      });
    } else {
      Object.entries(quadrantBoxes).forEach(([key, box]) => {
        if (box) {
          if (key === state.filterQuadrant) {
            box.style.display = '';
            box.style.gridColumn = '1 / -1'; // Expand full width for selected quadrant
          } else {
            box.style.display = 'none';
          }
        }
      });
    }

    renderQuadrantCards(cardsQ1, q1, 'q1');
    renderQuadrantCards(cardsQ2, q2, 'q2');
    renderQuadrantCards(cardsQ3, q3, 'q3');
    renderQuadrantCards(cardsQ4, q4, 'q4');
  } else {
    // List view: filter list if a specific quadrant is selected
    const listItems = state.filterQuadrant === 'all'
      ? filtered
      : filtered.filter(p => p.quadrant === state.filterQuadrant);
    renderList(allProjectsList, listItems);
  }
}


// Prompt Modal Elements
const promptModal = document.getElementById('prompt-modal');
const promptModalClose = document.getElementById('prompt-modal-close');
const promptModalTitle = document.getElementById('prompt-modal-title');
const promptModalSubtitle = document.getElementById('prompt-modal-subtitle');
const promptDocLink = document.getElementById('prompt-doc-link');
const promptCopyBtn = document.getElementById('prompt-copy-btn');
const promptContentPre = document.getElementById('prompt-content-pre');
const promptCopyFeedback = document.getElementById('prompt-copy-feedback');
const formPromptDoc = document.getElementById('form-prompt-doc');

let currentActivePromptText = '';

window.openPromptModal = async function(id) {
  const p = state.projects.find(item => item.id === id);
  if (!p) return;

  const docFile = p.promptDoc || `${p.id}.md`;
  const docUrl = `prompts/${docFile}`;

  promptModalTitle.textContent = `🚀 Prompt to Start: ${p.title}`;
  promptModalSubtitle.textContent = `Document: ${docFile} · OneDrive > AI PROJECTS > PROMPTS to Start Projects`;
  promptDocLink.href = docUrl;

  promptContentPre.textContent = 'Loading prompt document...';
  promptCopyFeedback.style.display = 'none';

  promptModal.style.display = 'flex';

  try {
    const res = await fetch(docUrl);
    if (res.ok) {
      const text = await res.text();
      currentActivePromptText = text;
      promptContentPre.textContent = text;
    } else {
      currentActivePromptText = `# Start Prompt: ${p.title}\n\nRole: AI Engineer / Developer\nProject: ${p.title}\nOwner: ${p.delegatedOwner || p.owner}\nStatus: ${p.status}\nDescription: ${p.description || ''}\n\n1. Review project requirements.\n2. Proceed with implementation.`;
      promptContentPre.textContent = currentActivePromptText;
    }
  } catch (err) {
    currentActivePromptText = `# Start Prompt: ${p.title}\n\nProject: ${p.title}\nDescription: ${p.description || ''}`;
    promptContentPre.textContent = currentActivePromptText;
  }
};

function closePromptModal() {
  if (promptModal) promptModal.style.display = 'none';
}

if (promptModalClose) promptModalClose.addEventListener('click', closePromptModal);

if (promptCopyBtn) {
  promptCopyBtn.addEventListener('click', () => {
    if (!currentActivePromptText) return;
    navigator.clipboard.writeText(currentActivePromptText).then(() => {
      promptCopyFeedback.style.display = 'inline-block';
      setTimeout(() => {
        promptCopyFeedback.style.display = 'none';
      }, 3500);
    }).catch(err => {
      console.error('Clipboard copy failed:', err);
    });
  });
}

function renderQuadrantCards(container, items, qClass) {
  container.innerHTML = '';
  if (items.length === 0) {
    container.innerHTML = '<div style="text-align: center; color: #94A3B8; padding: 2rem; font-size: 0.85rem; font-style: italic;">No projects in this quadrant</div>';
    return;
  }

  items.forEach(p => {
    const card = document.createElement('div');
    card.className = `project-card ${p.isRemoved ? 'card-archived' : ''} ${p.needsDelegation && !p.delegatedOwner ? 'card-needs-delegation' : ''}`;
    card.onclick = () => openEditModal(p.id);

    const attCount = p.attachments ? p.attachments.length : 0;
    const attBtnClass = attCount > 0 ? 'btn-card-attachments has-attachments' : 'btn-card-attachments';

    card.innerHTML = `
      <div class="card-top">
        <div class="card-badges">
          ${getDelegationBadge(p)}
          ${getDepartmentBadge(p.department)}
          ${getPillarBadge(p.pillar)}
          ${getStatusBadge(p.status)}
          ${getDueDateBadge(p.dueDate)}
        </div>
        ${getOwnerDisplay(p)}
      </div>
      <h3 class="card-title">${escapeHTML(p.title)}</h3>
      <p class="card-desc">${escapeHTML(p.description)}</p>
      
      <div class="progress-container">
        <div class="progress-track">
          <div class="progress-fill progress-fill-${qClass}" style="width: ${p.progress}%"></div>
        </div>
        <span class="progress-pct">${p.progress}%</span>
      </div>

      <div class="card-footer">
        <div class="card-actions-group">
          <button class="btn-card-mike ${p.inMikesReport ? 'active' : ''}" onclick="event.stopPropagation(); window.toggleCardMikesReport('${p.id}')" title="${p.inMikesReport ? 'Included in Mike Ray 1:1 Report (Click to remove)' : 'Click to include in Mike Ray 1:1 Report'}">
            ${p.inMikesReport ? '⭐ 1:1 Report' : '☆ Add to 1:1'}
          </button>
          <button class="${attBtnClass}" onclick="event.stopPropagation(); window.openAttachmentViewer('${p.id}')" title="${attCount} attached file(s) and links - click to view or add">
            📎 ${attCount > 0 ? `${attCount} ${attCount === 1 ? 'file' : 'files'}` : 'Attach'}
          </button>
          <button class="btn-start-prompt" onclick="event.stopPropagation(); openPromptModal('${p.id}')" title="View & run start prompt for this project">
            🚀 Start Prompt
          </button>
          <button class="btn-delegate ${p.delegatedOwner ? 'btn-delegate-assigned' : ''}" onclick="event.stopPropagation(); openDelegateModal('${p.id}')" title="Delegate to coworker or reassign">
            🤝 ${p.delegatedOwner ? 'Re-delegate' : 'Delegate'}
          </button>
          ${p.isRemoved ? 
            `<button class="btn-restore-card" onclick="event.stopPropagation(); restoreProject('${p.id}')">↩️ Restore</button>` :
            `<button class="btn-complete-remove" onclick="event.stopPropagation(); completeAndRemoveProject('${p.id}')">✅ Complete</button>`
          }
        </div>
        ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener" class="card-link" onclick="event.stopPropagation()">Open Link ↗</a>` : ''}
      </div>
    `;
    container.appendChild(card);
  });
}

function renderList(container, items) {
  container.innerHTML = '';
  if (items.length === 0) {
    container.innerHTML = '<div style="text-align: center; color: #94A3B8; padding: 3rem;">No matching projects</div>';
    return;
  }

  items.forEach(p => {
    const card = document.createElement('div');
    card.className = `project-card ${p.isRemoved ? 'card-archived' : ''} ${p.needsDelegation && !p.delegatedOwner ? 'card-needs-delegation' : ''}`;
    card.onclick = () => openEditModal(p.id);

    const qClass = p.quadrant.toLowerCase();
    const attCount = p.attachments ? p.attachments.length : 0;
    const attBtnClass = attCount > 0 ? 'btn-card-attachments has-attachments' : 'btn-card-attachments';

    card.innerHTML = `
      <div class="card-top">
        <div class="card-badges">
          <span class="badge" style="background:#0F172A; color:#FFF; font-weight:800;">${p.quadrant}</span>
          ${getDelegationBadge(p)}
          ${getDepartmentBadge(p.department)}
          ${getPillarBadge(p.pillar)}
          ${getStatusBadge(p.status)}
          ${getDueDateBadge(p.dueDate)}
        </div>
        ${getOwnerDisplay(p)}
      </div>
      <h3 class="card-title">${escapeHTML(p.title)}</h3>
      <p class="card-desc">${escapeHTML(p.description)}</p>
      
      <div class="progress-container">
        <div class="progress-track">
          <div class="progress-fill progress-fill-${qClass}" style="width: ${p.progress}%"></div>
        </div>
        <span class="progress-pct">${p.progress}%</span>
      </div>

      <div class="card-footer">
        <div class="card-actions-group">
          <button class="btn-card-mike ${p.inMikesReport ? 'active' : ''}" onclick="event.stopPropagation(); window.toggleCardMikesReport('${p.id}')" title="${p.inMikesReport ? 'Included in Mike Ray 1:1 Report (Click to remove)' : 'Click to include in Mike Ray 1:1 Report'}">
            ${p.inMikesReport ? '⭐ 1:1 Report' : '☆ Add to 1:1'}
          </button>
          <button class="${attBtnClass}" onclick="event.stopPropagation(); window.openAttachmentViewer('${p.id}')" title="${attCount} attached file(s) and links - click to view or add">
            📎 ${attCount > 0 ? `${attCount} ${attCount === 1 ? 'file' : 'files'}` : 'Attach'}
          </button>
          <button class="btn-start-prompt" onclick="event.stopPropagation(); openPromptModal('${p.id}')" title="View & run start prompt for this project">
            🚀 Start Prompt
          </button>
          <button class="btn-delegate ${p.delegatedOwner ? 'btn-delegate-assigned' : ''}" onclick="event.stopPropagation(); openDelegateModal('${p.id}')" title="Delegate to coworker or reassign">
            🤝 ${p.delegatedOwner ? 'Re-delegate' : 'Delegate'}
          </button>
          ${p.isRemoved ? 
            `<button class="btn-restore-card" onclick="event.stopPropagation(); restoreProject('${p.id}')">↩️ Restore</button>` :
            `<button class="btn-complete-remove" onclick="event.stopPropagation(); completeAndRemoveProject('${p.id}')">✅ Complete</button>`
          }
        </div>
        ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener" class="card-link" onclick="event.stopPropagation()">Open Resource ↗</a>` : ''}
      </div>
    `;
    container.appendChild(card);
  });
}

function openEditModal(id) {
  const p = state.projects.find(item => item.id === id);
  if (!p) return;

  modalTitle.textContent = 'Update Key Project';
  formId.value = p.id;
  formTitle.value = p.title;
  formOwner.value = p.owner || 'Rob Bagley';
  if (formNeedsDelegation) formNeedsDelegation.checked = !!p.needsDelegation;
  if (formDelegatedOwner) formDelegatedOwner.value = p.delegatedOwner || '';
  formDepartment.value = p.department || 'Career Mentor';
  formDueDate.value = p.dueDate || '';
  formQuadrant.value = p.quadrant;
  formPillar.value = p.pillar;
  formStatus.value = p.status;
  formProgress.value = p.progress;
  progressVal.textContent = `${p.progress}%`;
  formDescription.value = p.description || '';
  formLink.value = p.link || '';
  if (formPromptDoc) formPromptDoc.value = p.promptDoc || `${p.id}.md`;
  if (formInMikesReport) formInMikesReport.checked = !!p.inMikesReport;

  // Initialize attachments in modal
  currentModalAttachments = JSON.parse(JSON.stringify(p.attachments || []));
  renderModalAttachmentsList();

  if (p.isRemoved) {
    modalCompleteRemoveBtn.style.display = 'none';
    modalRestoreBtn.style.display = 'inline-flex';
    modalRestoreBtn.onclick = () => {
      restoreProject(p.id);
      closeModal();
    };
  } else {
    modalCompleteRemoveBtn.style.display = 'inline-flex';
    modalRestoreBtn.style.display = 'none';
    modalCompleteRemoveBtn.onclick = () => {
      completeAndRemoveProject(p.id);
      closeModal();
    };
  }

  modal.style.display = 'flex';
}

function openAddModal() {
  modalTitle.textContent = 'Add Key Project';
  formId.value = '';
  formTitle.value = '';
  formOwner.value = 'Rob Bagley';
  if (formNeedsDelegation) formNeedsDelegation.checked = false;
  if (formDelegatedOwner) formDelegatedOwner.value = '';
  formDepartment.value = 'Career Mentor';
  
  // Default due date to 30 days out
  const d = new Date();
  d.setDate(d.getDate() + 30);
  formDueDate.value = d.toISOString().split('T')[0];

  formQuadrant.value = 'Q1';
  formPillar.value = 'Capable';
  formStatus.value = 'In Progress';
  formProgress.value = 50;
  progressVal.textContent = '50%';
  formDescription.value = '';
  formLink.value = '';
  if (formPromptDoc) formPromptDoc.value = '';
  if (formInMikesReport) formInMikesReport.checked = false;

  // Reset attachments for new project
  currentModalAttachments = [];
  renderModalAttachmentsList();

  modalCompleteRemoveBtn.style.display = 'none';
  modalRestoreBtn.style.display = 'none';

  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
  closeOwnerDropdown();
  closeDelegatedDropdown();
}

modalClose.addEventListener('click', closeModal);
modalCancel.addEventListener('click', closeModal);
addProjectBtn.addEventListener('click', openAddModal);

projectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = formId.value;
  const delegatedVal = formDelegatedOwner ? formDelegatedOwner.value.trim() : '';
  const needsDelVal = formNeedsDelegation ? formNeedsDelegation.checked : (formQuadrant.value === 'Q3' || !!delegatedVal);

  if (id) {
    // Edit existing project
    const p = state.projects.find(item => item.id === id);
    if (p) {
      p.title = formTitle.value;
      p.delegatedOwner = delegatedVal;
      // If delegated, owner is the delegated coworker; if not, owner is Rob Bagley (or formOwner)
      if (delegatedVal) {
        p.owner = delegatedVal;
      } else {
        p.owner = formOwner.value || 'Rob Bagley';
      }
      p.needsDelegation = needsDelVal;
      p.department = formDepartment.value;
      p.dueDate = formDueDate.value;
      p.quadrant = formQuadrant.value;
      p.pillar = formPillar.value;
      p.status = formStatus.value;
      p.progress = parseInt(formProgress.value, 10);
      p.description = formDescription.value;
      p.link = formLink.value;
      p.inMikesReport = formInMikesReport ? formInMikesReport.checked : false;
      p.attachments = currentModalAttachments;
    }
  } else {
    // Add New project
    const newProj = {
      id: 'proj-' + Date.now(),
      title: formTitle.value,
      delegatedOwner: delegatedVal,
      owner: delegatedVal ? delegatedVal : (formOwner.value || 'Rob Bagley'),
      needsDelegation: needsDelVal,
      department: formDepartment.value,
      dueDate: formDueDate.value,
      quadrant: formQuadrant.value,
      pillar: formPillar.value,
      status: formStatus.value,
      progress: parseInt(formProgress.value, 10),
      description: formDescription.value,
      link: formLink.value,
      promptDoc: (formPromptDoc && formPromptDoc.value.trim()) ? formPromptDoc.value.trim() : 'prompt.md',
      inMikesReport: formInMikesReport ? formInMikesReport.checked : false,
      attachments: currentModalAttachments,
      isRemoved: false,
      milestones: []
    };
    state.projects.unshift(newProj);
  }

  saveProjects();
  closeModal();
  render();
});

// Attachment Helpers and Handlers
function getAttachmentIcon(att) {
  if (att.type === 'link') {
    const url = (att.url || '').toLowerCase();
    if (url.includes('github')) return '💻';
    if (url.includes('instructure') || url.includes('canvas')) return '🎓';
    if (url.includes('sharepoint') || url.includes('onedrive')) return '☁️';
    if (url.includes('peoplegrove')) return '🤝';
    return '🔗';
  }
  const name = (att.name || '').toLowerCase();
  if (name.endsWith('.pdf')) return '📕';
  if (name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.webp') || name.endsWith('.gif')) return '🖼️';
  if (name.endsWith('.xlsx') || name.endsWith('.xls') || name.endsWith('.csv')) return '📊';
  if (name.endsWith('.docx') || name.endsWith('.doc')) return '📝';
  if (name.endsWith('.md') || name.endsWith('.txt')) return '📄';
  if (name.endsWith('.zip') || name.endsWith('.tar') || name.endsWith('.gz')) return '📦';
  return '📎';
}

function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

let currentModalAttachments = [];

function renderModalAttachmentsList() {
  if (!modalAttachmentsList) return;
  modalAttachmentsList.innerHTML = '';
  if (modalAttachmentsCount) modalAttachmentsCount.textContent = currentModalAttachments.length;

  if (currentModalAttachments.length === 0) {
    modalAttachmentsList.innerHTML = '<div class="empty-attachments-msg">No attachments yet. Drop files or add links below.</div>';
    return;
  }

  currentModalAttachments.forEach(att => {
    const chip = document.createElement('div');
    chip.className = 'attachment-item-chip';
    const icon = getAttachmentIcon(att);
    const meta = att.type === 'link' ? 'Cloud Link' : formatBytes(att.size);

    chip.innerHTML = `
      <div class="attachment-chip-left">
        <span class="attachment-chip-icon">${icon}</span>
        <span class="attachment-chip-name" title="${escapeHTML(att.name)}">${escapeHTML(att.name)}</span>
        <span class="attachment-chip-meta">(${meta})</span>
      </div>
      <div class="attachment-chip-actions">
        ${att.type === 'link' ? 
          `<a href="${att.url}" target="_blank" rel="noopener" class="btn-att-action">Open ↗</a>` :
          `<button type="button" class="btn-att-action" onclick="window.downloadAttachment('${att.id}')">Download ⬇</button>`
        }
        <button type="button" class="btn-att-remove" onclick="window.removeModalAttachment('${att.id}')" title="Remove attachment">✕</button>
      </div>
    `;
    modalAttachmentsList.appendChild(chip);
  });
}

window.removeModalAttachment = function(attId) {
  currentModalAttachments = currentModalAttachments.filter(a => a.id !== attId);
  renderModalAttachmentsList();
};

window.downloadAttachment = async function(attId) {
  let item = currentModalAttachments.find(a => a.id === attId);
  if (!item) {
    for (const p of state.projects) {
      if (p.attachments) {
        item = p.attachments.find(a => a.id === attId);
        if (item) break;
      }
    }
  }
  if (!item) return;

  if (item.dataUrl) {
    const a = document.createElement('a');
    a.href = item.dataUrl;
    a.download = item.name || 'attachment';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return;
  }

  const stored = await getIDBAttachment(item.id);
  if (stored && stored.dataUrl) {
    const a = document.createElement('a');
    a.href = stored.dataUrl;
    a.download = stored.name || 'attachment';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else if (item.url) {
    window.open(item.url, '_blank');
  }
};

function handleFilesSelected(fileList) {
  Array.from(fileList).forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const att = {
        id: 'att-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
        name: file.name,
        type: 'file',
        size: file.size,
        mimeType: file.type || 'application/octet-stream',
        dataUrl: dataUrl,
        dateAdded: new Date().toISOString()
      };
      saveIDBAttachment(att);
      currentModalAttachments.push(att);
      renderModalAttachmentsList();
    };
    reader.readAsDataURL(file);
  });
}

if (dropZone && formFileInput) {
  ['dragenter', 'dragover'].forEach(name => {
    dropZone.addEventListener(name, (e) => {
      e.preventDefault();
      dropZone.classList.add('drag-over');
    });
  });
  ['dragleave', 'drop'].forEach(name => {
    dropZone.addEventListener(name, (e) => {
      e.preventDefault();
      dropZone.classList.remove('drag-over');
    });
  });
  dropZone.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files && files.length > 0) handleFilesSelected(files);
  });
  formFileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesSelected(e.target.files);
      e.target.value = '';
    }
  });
}

if (btnAddAttachmentLink && formAttLinkUrl) {
  btnAddAttachmentLink.addEventListener('click', () => {
    let url = (formAttLinkUrl.value || '').trim();
    if (!url) {
      alert('Please provide a valid URL for the attachment.');
      return;
    }
    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('/')) {
      url = 'https://' + url;
    }
    let name = (formAttLinkName.value || '').trim();
    if (!name) {
      try {
        const u = new URL(url);
        name = u.hostname + u.pathname;
      } catch (e) {
        name = url;
      }
    }
    currentModalAttachments.push({
      id: 'att-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
      name: name,
      type: 'link',
      url: url,
      dateAdded: new Date().toISOString()
    });
    formAttLinkName.value = '';
    formAttLinkUrl.value = '';
    renderModalAttachmentsList();
  });
}

// Attachment Viewer Modal Logic
let currentViewerProjectId = null;

window.openAttachmentViewer = function(projectId) {
  const p = state.projects.find(item => item.id === projectId);
  if (!p) return;
  currentViewerProjectId = projectId;
  if (attViewerTitle) attViewerTitle.textContent = p.title;
  const atts = p.attachments || [];
  if (attViewerSubtitle) {
    attViewerSubtitle.textContent = `${atts.length} attached document(s), assets, and cloud links`;
  }

  if (attViewerList) {
    attViewerList.innerHTML = '';
    if (atts.length === 0) {
      attViewerList.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem 1rem; color: #94A3B8;">
          <span style="font-size: 2.5rem; display: block; margin-bottom: 0.5rem;">📎</span>
          <p style="font-size: 0.95rem; font-weight: 600; color: #475569; margin-bottom: 0.25rem;">No attachments added yet</p>
          <p style="font-size: 0.8rem; margin-bottom: 1rem;">Upload project PDFs, spreadsheets, screenshots, or link OneDrive documents.</p>
          <button type="button" class="btn btn-primary btn-sm" onclick="closeAttachmentViewer(); openEditModal('${p.id}')">➕ Add First Attachment</button>
        </div>
      `;
    } else {
      atts.forEach(att => {
        const card = document.createElement('div');
        card.className = 'viewer-att-card';
        const icon = getAttachmentIcon(att);
        const metaText = att.type === 'link' ? 'Cloud Resource / Web Link' : formatBytes(att.size);
        const dateText = att.dateAdded ? new Date(att.dateAdded).toLocaleDateString() : '';
        card.innerHTML = `
          <div class="viewer-att-top">
            <span class="viewer-att-icon">${icon}</span>
            <div class="viewer-att-info">
              <div class="viewer-att-name">${escapeHTML(att.name)}</div>
              <div class="viewer-att-meta">${metaText}${dateText ? ' • ' + dateText : ''}</div>
            </div>
          </div>
          <div class="viewer-att-actions">
            ${att.type === 'link' ? 
              `<a href="${att.url}" target="_blank" rel="noopener" class="viewer-att-btn viewer-att-btn-primary">Open Link ↗</a>` :
              `<button type="button" class="viewer-att-btn viewer-att-btn-primary" onclick="window.downloadAttachment('${att.id}')">Download ⬇</button>`
            }
          </div>
        `;
        attViewerList.appendChild(card);
      });
    }
  }

  if (attViewerEditBtn) {
    attViewerEditBtn.onclick = () => {
      closeAttachmentViewer();
      openEditModal(projectId);
    };
  }
  if (attViewerModal) attViewerModal.style.display = 'flex';
};

function closeAttachmentViewer() {
  if (attViewerModal) attViewerModal.style.display = 'none';
  currentViewerProjectId = null;
}

if (attViewerClose) attViewerClose.addEventListener('click', closeAttachmentViewer);
if (attViewerDoneBtn) attViewerDoneBtn.addEventListener('click', closeAttachmentViewer);
if (attViewerModal) {
  attViewerModal.addEventListener('click', (e) => {
    if (e.target === attViewerModal) closeAttachmentViewer();
  });
}

resetStorageBtn.addEventListener('click', () => {
  if (confirm('Reset to standard canonical project defaults with updated delegation states?')) {
    state.projects = JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
    saveProjects();
    render();
  }
});

searchInput.addEventListener('input', (e) => {
  state.searchQuery = e.target.value;
  render();
});

filterDepartment.addEventListener('change', (e) => {
  state.filterDepartment = e.target.value;
  render();
});

filterOwner.addEventListener('change', (e) => {
  state.filterOwner = e.target.value;
  render();
});

filterPillar.addEventListener('change', (e) => {
  state.filterPillar = e.target.value;
  render();
});

filterStatus.addEventListener('change', (e) => {
  state.filterStatus = e.target.value;
  render();
});

if (filterQuadrantSelect) {
  filterQuadrantSelect.addEventListener('change', (e) => {
    state.filterQuadrant = e.target.value;
    render();
  });
}

function toggleQuadrantFilter(q) {
  state.filterQuadrant = (state.filterQuadrant === q) ? 'all' : q;
  render();
}

if (metricCardQ1) metricCardQ1.addEventListener('click', () => toggleQuadrantFilter('Q1'));
if (metricCardQ2) metricCardQ2.addEventListener('click', () => toggleQuadrantFilter('Q2'));
if (metricCardQ3) metricCardQ3.addEventListener('click', () => toggleQuadrantFilter('Q3'));
if (metricCardQ4) metricCardQ4.addEventListener('click', () => toggleQuadrantFilter('Q4'));

function escapeHTML(str) {
  if (!str) return '';
  return String(str).replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Initial render
render();

// Mike's Report Card Toggle Handler
window.toggleCardMikesReport = function(id) {
  const p = state.projects.find(item => item.id === id);
  if (!p) return;
  p.inMikesReport = !p.inMikesReport;
  saveProjects();
  render();
};

if (mikesReportBtn) {
  mikesReportBtn.addEventListener('click', () => {
    state.filterMikesReportOnly = !state.filterMikesReportOnly;
    render();
  });
}

if (clearQuadrantBannerBtn) {
  clearQuadrantBannerBtn.addEventListener('click', () => {
    state.filterQuadrant = 'all';
    render();
  });
}

// Executive Summary & Mike Ray 1:1 Report Modal Elements
const execSummaryModal = document.getElementById('exec-summary-modal');
const execSummaryClose = document.getElementById('exec-summary-close');
const summaryScopeMikes = document.getElementById('summary-scope-mikes');
const summaryScopeAll = document.getElementById('summary-scope-all');
const summaryMikesCountEl = document.getElementById('summary-mikes-count');
const summaryAllCountEl = document.getElementById('summary-all-count');
const summaryCopyMdBtn = document.getElementById('summary-copy-md-btn');
const summaryPrintBtn = document.getElementById('summary-print-btn');
const summaryCopyFeedback = document.getElementById('summary-copy-feedback');
const summaryRenderedPreview = document.getElementById('summary-rendered-preview');

let currentActiveSummaryMarkdown = '';

function getExecutiveSummaryItems() {
  const nonArchived = state.projects.filter(p => !p.isRemoved);
  if (state.execSummaryScope === 'mikes') {
    return nonArchived.filter(p => p.inMikesReport);
  }
  return nonArchived;
}

function generateExecutiveSummaryMarkdown(items) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const q1 = items.filter(p => p.quadrant === 'Q1');
  const q2 = items.filter(p => p.quadrant === 'Q2');
  const q3 = items.filter(p => p.quadrant === 'Q3');
  const q4 = items.filter(p => p.quadrant === 'Q4');

  let md = `# Director 1:1 Briefing · Mike Ray\n`;
  md += `**Date:** ${today}\n`;
  md += `**Prepared by:** Rob Bagley, Associate Director Career Services\n`;
  md += `**Portfolio:** Ensign Key Projects & Situational Awareness Dashboard\n`;
  md += `**Scope:** ${state.execSummaryScope === 'mikes' ? "Mike's 1:1 Focus Items" : 'All Active Key Projects'} (${items.length} projects)\n\n`;
  md += `---\n\n`;

  md += `## Executive Snapshot\n`;
  md += `- **Q1 Immediate Fires & Deadlines (Do First):** ${q1.length} project(s)\n`;
  md += `- **Q2 Strategic Mission & Core AI Systems (Deep Focus):** ${q2.length} project(s)\n`;
  md += `- **Q3 Delegated Operations & DevOps Requests:** ${q3.length} project(s)\n`;
  md += `- **Q4 Low Priority / Triage:** ${q4.length} project(s)\n\n`;
  md += `---\n\n`;

  function formatSection(title, list) {
    if (list.length === 0) return `### ${title}\n*No items in this category.*\n\n`;
    let s = `### ${title} (${list.length})\n\n`;
    list.forEach(p => {
      const owner = p.delegatedOwner ? `${p.delegatedOwner} (Delegated by Rob)` : (p.owner || 'Rob Bagley');
      s += `#### ${p.title}\n`;
      s += `- **Status:** ${p.status} (${p.progress}%)\n`;
      s += `- **Lead / Owner:** ${owner}\n`;
      s += `- **Department & Pillar:** ${p.department} · ${p.pillar || 'General'}\n`;
      if (p.dueDate) s += `- **Target Milestone:** ${p.dueDate}\n`;
      if (p.description) s += `- **Summary:** ${p.description}\n`;
      if (p.link) s += `- **Reference Link:** ${p.link}\n`;
      s += `\n`;
    });
    return s;
  }

  md += formatSection('Q1: Urgent & Important · Immediate Fires & Deadlines', q1);
  md += formatSection('Q2: Strategic Mission · Deep Learning, AI Systems & Curriculum', q2);
  md += formatSection('Q3: Urgent & Routine · Delegated Operations & DevOps Intake', q3);
  if (q4.length > 0) {
    md += formatSection('Q4: Low Priority · Triage & Deprioritized', q4);
  }

  md += `## Discussion Topics & Decisions for Mike Ray\n`;
  md += `1. **Resource Allocation & Delegation:** Review status of delegated team members and student employees.\n`;
  md += `2. **Milestones & Blockers:** Confirm timeline on upcoming Q1 critical deliverables.\n`;
  md += `3. **Strategic AI Alignment:** Next steps on Ensign AI tools, student readiness, and curriculum integration.\n`;

  return md;
}

function renderExecutiveSummaryHTML(items) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const q1 = items.filter(p => p.quadrant === 'Q1');
  const q2 = items.filter(p => p.quadrant === 'Q2');
  const q3 = items.filter(p => p.quadrant === 'Q3');
  const q4 = items.filter(p => p.quadrant === 'Q4');

  function renderItemsHTML(list, qClass) {
    if (list.length === 0) return '<p style="color:#94A3B8; font-style:italic; font-size:0.85rem; padding: 0.5rem 0;">No active projects in this section.</p>';
    return list.map(p => {
      const owner = p.delegatedOwner ? `<span style="color:#007150; font-weight:700;">🤝 ${escapeHTML(p.delegatedOwner)}</span> (Delegated)` : `<span>👤 ${escapeHTML(p.owner || 'Rob Bagley')}</span>`;
      return `
        <div class="briefing-item ${qClass}">
          <div class="briefing-item-top">
            <span class="briefing-item-title">${escapeHTML(p.title)}</span>
            ${getStatusBadge(p.status)}
          </div>
          <p class="briefing-item-desc">${escapeHTML(p.description || 'No detailed description provided.')}</p>
          <div class="briefing-item-meta">
            <span><strong>Lead:</strong> ${owner}</span>
            <span><strong>Dept:</strong> ${escapeHTML(p.department)}</span>
            <span><strong>Progress:</strong> ${p.progress}%</span>
            ${p.dueDate ? `<span><strong>Due:</strong> ${p.dueDate}</span>` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  return `
    <div class="briefing-header">
      <div class="briefing-title">Executive Briefing · Director Mike Ray</div>
      <div class="briefing-meta">
        <strong>Date:</strong> ${today} &nbsp;|&nbsp; 
        <strong>Prepared By:</strong> Rob Bagley, Associate Director Career Services &nbsp;|&nbsp;
        <strong>Scope:</strong> ${state.execSummaryScope === 'mikes' ? "⭐ Mike's 1:1 Selected Items" : '🌐 All Key Projects'} (${items.length} items)
      </div>
    </div>

    <div class="briefing-stat-row">
      <div class="briefing-stat-card">
        <div class="briefing-stat-num" style="color:var(--q1-color);">${q1.length}</div>
        <div class="briefing-stat-lbl">Q1 Urgent Fires</div>
      </div>
      <div class="briefing-stat-card">
        <div class="briefing-stat-num" style="color:var(--q2-color);">${q2.length}</div>
        <div class="briefing-stat-lbl">Q2 Strategic Mission</div>
      </div>
      <div class="briefing-stat-card">
        <div class="briefing-stat-num" style="color:var(--q3-color);">${q3.length}</div>
        <div class="briefing-stat-lbl">Q3 Delegated Ops</div>
      </div>
      <div class="briefing-stat-card">
        <div class="briefing-stat-num" style="color:var(--q4-color);">${q4.length}</div>
        <div class="briefing-stat-lbl">Q4 Triage</div>
      </div>
    </div>

    <div class="briefing-section">
      <div class="briefing-section-title" style="color:var(--q1-color);">
        <span>🔴 Q1: Urgent &amp; Important · Immediate Fires &amp; Critical Deadlines</span>
        <span>${q1.length} item(s)</span>
      </div>
      ${renderItemsHTML(q1, 'item-q1')}
    </div>

    <div class="briefing-section">
      <div class="briefing-section-title" style="color:var(--q2-color);">
        <span>🟢 Q2: Strategic Mission · Deep Learning, AI Systems &amp; Curriculum</span>
        <span>${q2.length} item(s)</span>
      </div>
      ${renderItemsHTML(q2, 'item-q2')}
    </div>

    <div class="briefing-section">
      <div class="briefing-section-title" style="color:var(--q3-color);">
        <span>🟡 Q3: Urgent &amp; Routine · Delegated Operations &amp; DevOps Intake</span>
        <span>${q3.length} item(s)</span>
      </div>
      ${renderItemsHTML(q3, 'item-q3')}
    </div>

    ${q4.length > 0 ? `
    <div class="briefing-section">
      <div class="briefing-section-title" style="color:var(--q4-color);">
        <span>⚪ Q4: Low Priority · Triage &amp; Deprioritized</span>
        <span>${q4.length} item(s)</span>
      </div>
      ${renderItemsHTML(q4, 'item-q4')}
    </div>
    ` : ''}

    <div class="briefing-section" style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:6px; padding:1rem; margin-top:1.5rem;">
      <h4 style="font-size:0.95rem; font-weight:700; color:#0F172A; margin-bottom:0.5rem;">📌 Discussion Topics for 1:1 Meeting with Mike Ray</h4>
      <ul style="padding-left:1.25rem; font-size:0.85rem; color:#334155; line-height:1.6;">
        <li><strong>Active Blockers &amp; Deadlines:</strong> Review status of urgent Q1 deliverables and Canvas/gradebook updates.</li>
        <li><strong>Coworker Delegation &amp; DevOps:</strong> Review projects delegated to Rodrigo, Karla, and the Career Mentor team.</li>
        <li><strong>AI Tools &amp; Student Readiness:</strong> Review deployment progress on PathwayU, ENS 101, and local model infrastructure.</li>
      </ul>
    </div>
  `;
}

window.openExecSummaryModal = function() {
  const nonArchived = state.projects.filter(p => !p.isRemoved);
  const mikesCount = nonArchived.filter(p => p.inMikesReport).length;
  const allCount = nonArchived.length;

  if (summaryMikesCountEl) summaryMikesCountEl.textContent = mikesCount;
  if (summaryAllCountEl) summaryAllCountEl.textContent = allCount;

  // Update Scope Buttons
  if (summaryScopeMikes && summaryScopeAll) {
    if (state.execSummaryScope === 'mikes') {
      summaryScopeMikes.classList.add('active');
      summaryScopeAll.classList.remove('active');
    } else {
      summaryScopeAll.classList.add('active');
      summaryScopeMikes.classList.remove('active');
    }
  }

  const items = getExecutiveSummaryItems();
  currentActiveSummaryMarkdown = generateExecutiveSummaryMarkdown(items);

  if (summaryRenderedPreview) {
    summaryRenderedPreview.innerHTML = renderExecutiveSummaryHTML(items);
  }

  if (summaryCopyFeedback) summaryCopyFeedback.style.display = 'none';
  if (execSummaryModal) execSummaryModal.style.display = 'flex';
};

if (execSummaryBtn) {
  execSummaryBtn.addEventListener('click', () => {
    window.openExecSummaryModal();
  });
}

if (execSummaryClose) {
  execSummaryClose.addEventListener('click', () => {
    if (execSummaryModal) execSummaryModal.style.display = 'none';
  });
}

if (execSummaryModal) {
  execSummaryModal.addEventListener('click', (e) => {
    if (e.target === execSummaryModal) execSummaryModal.style.display = 'none';
  });
}

if (summaryScopeMikes) {
  summaryScopeMikes.addEventListener('click', () => {
    state.execSummaryScope = 'mikes';
    window.openExecSummaryModal();
  });
}

if (summaryScopeAll) {
  summaryScopeAll.addEventListener('click', () => {
    state.execSummaryScope = 'all';
    window.openExecSummaryModal();
  });
}

if (summaryCopyMdBtn) {
  summaryCopyMdBtn.addEventListener('click', () => {
    if (!currentActiveSummaryMarkdown) return;
    navigator.clipboard.writeText(currentActiveSummaryMarkdown).then(() => {
      if (summaryCopyFeedback) {
        summaryCopyFeedback.style.display = 'inline-block';
        setTimeout(() => {
          summaryCopyFeedback.style.display = 'none';
        }, 3500);
      }
    }).catch(err => console.error('Failed to copy executive summary:', err));
  });
}

if (summaryPrintBtn) {
  summaryPrintBtn.addEventListener('click', () => {
    if (summaryViewRendered && summaryMarkdownPreview && summaryMarkdownPreview.style.display !== 'none') {
      summaryViewRendered.click();
    }
    window.print();
  });
}
