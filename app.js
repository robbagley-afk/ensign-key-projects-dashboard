/**
 * Ensign Key Projects & Situational Awareness Dashboard
 * Eisenhower Matrix, Ensign College Mission Alignment & Department Categorization
 * Rob Bagley, Associate Director Career Services
 */

const STORAGE_KEY = 'ensign_key_projects_data_v3';
const LEGACY_STORAGE_KEY = 'ensign_key_projects_data_v2';

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
    milestones: ['Audit broken assignment links', 'Fix rubric grading criteria', 'Sync gradebook passback', 'Notify enrolled students']
  },
  {
    id: 'vmock-ingestion',
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
    milestones: ['Parse all 6 module fields', 'Download 9.7MB report', 'Pass 167 unit tests', 'Deploy live to port 5055']
  },
  {
    id: 'ens101-polish',
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
    milestones: ['Two-screen layout live on 5050', 'Register Issue #28 with Rodrigo', 'Implement completion lighting', 'Verify design system audit']
  },
  {
    id: 'internship-tool',
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
    milestones: ['Replace Smartsheet core logic', 'Train Sister Whitney', 'Sister Groom final feedback review', 'Full production rollout']
  },
  {
    id: 'career-ui-suite',
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
    milestones: ['Decommission cloud fallback (PR 23)', 'Audit ENS 101 & Readiness Hub', 'Mentor Explorer 5046 release', 'Phase 2 runtime audit across all ports']
  },
  {
    id: 'workshop-redesign',
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
    milestones: ['College version completed', 'GEC version final review', 'AI-assisted resume templates', 'Launch with Fall semester mentors']
  },
  {
    id: 'peoplegrove-alumni',
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
    milestones: ['Deliver PeopleGrove utilization report', 'LinkedIn-first onboarding flow', 'Alumni roadmap adaptation', 'Track mentor message exchanges']
  },
  {
    id: 'employer-portal',
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
    milestones: ['Employer survey synthesis', 'Draft job fair reservation system', 'Alumni employer outreach batch', 'Automated invitation pipeline']
  },
  {
    id: 'prison-education',
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
    milestones: ['Assess Canvas restrictions', 'Roadmap 1 mockup for incarcerated learners', 'Test offline local AI computer proposal', 'Instructor training']
  },
  {
    id: 'fleet-infrastructure',
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
    milestones: ['LM Studio resident gemma4-26b-qat', 'Copilot Studio credit gate', 'Corner Office coordinator handoffs', 'Automated fleetsync across 3 Macs']
  },
  {
    id: 'appfix-dispatch',
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
    milestones: ['Deploy Vercel Kanban board', 'Build /appfix-cis skill', '7-day auto-prune rule', 'Distribute to all fleet paths']
  },
  {
    id: 'stale-tasks-triage',
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
    milestones: ['Audit 150+ aged items in TASKS.md', 'Decommission obsolete spreadsheets', 'Close 168-day BYUI coach card', 'Archive closed projects']
  }
];

let state = {
  projects: loadProjects(),
  currentView: 'matrix', // 'matrix' or 'list'
  filterDepartment: 'all',
  filterOwner: 'all',
  filterPillar: 'all',
  filterStatus: 'all',
  filterDelegation: 'all', // 'all', 'needs_delegation', 'delegated', 'rob_owned'
  searchQuery: '',
  myProjectsOnly: false,
  showRemoved: false
};

function loadProjects() {
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      raw = localStorage.getItem(LEGACY_STORAGE_KEY);
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
          if (p.needsDelegation === undefined) {
            p.needsDelegation = p.quadrant === 'Q3' || !!p.delegatedOwner;
          }
          // Default assumed owner is Rob Bagley if not delegated or owner is empty
          if (!p.delegatedOwner && (!p.owner || p.owner.trim() === '')) {
            p.owner = 'Rob Bagley';
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
const needsDelegationBtn = document.getElementById('needs-delegation-btn');
const needsDelegationCountEl = document.getElementById('needs-delegation-count');
const filterDepartment = document.getElementById('filter-department');
const filterOwner = document.getElementById('filter-owner');
const filterPillar = document.getElementById('filter-pillar');
const filterStatus = document.getElementById('filter-status');
const toggleRemovedBtn = document.getElementById('toggle-removed-btn');
const removedCountSpan = document.getElementById('removed-count');
const resetStorageBtn = document.getElementById('reset-storage-btn');
const addProjectBtn = document.getElementById('add-project-btn');

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

document.addEventListener('click', (e) => {
  if (!e.target.closest('.combobox-wrapper')) {
    closeOwnerDropdown();
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

// "My Projects (Rob)" Quick Toggle
myProjectsBtn.addEventListener('click', () => {
  state.myProjectsOnly = !state.myProjectsOnly;
  if (state.myProjectsOnly) {
    myProjectsBtn.classList.add('active');
  } else {
    myProjectsBtn.classList.remove('active');
  }
  render();
});

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

  if (state.currentView === 'matrix') {
    renderQuadrantCards(cardsQ1, q1, 'q1');
    renderQuadrantCards(cardsQ2, q2, 'q2');
    renderQuadrantCards(cardsQ3, q3, 'q3');
    renderQuadrantCards(cardsQ4, q4, 'q4');
  } else {
    renderList(allProjectsList, filtered);
  }
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

  modalCompleteRemoveBtn.style.display = 'none';
  modalRestoreBtn.style.display = 'none';

  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
  closeOwnerDropdown();
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
      isRemoved: false,
      milestones: []
    };
    state.projects.unshift(newProj);
  }

  saveProjects();
  closeModal();
  render();
});

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

function escapeHTML(str) {
  if (!str) return '';
  return String(str).replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Initial render
render();
