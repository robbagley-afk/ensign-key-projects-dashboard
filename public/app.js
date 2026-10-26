/**
 * Ensign Key Projects & Situational Awareness Dashboard
 * Eisenhower Matrix & Ensign College Mission Alignment
 * Rob Bagley, Associate Director Career Services
 */

const STORAGE_KEY = 'ensign_key_projects_data_v1';

// Initial Canonical Projects from Mem Notes & Director 1:1s
const DEFAULT_PROJECTS = [
  {
    id: 'vmock-ingestion',
    title: 'VMock Full Module Ingestion & Scoring Engine',
    quadrant: 'Q1', // Urgent & Important (Do First)
    pillar: 'Capable', // Capable Disciples
    status: 'Completed',
    progress: 100,
    owner: 'Rob Bagley',
    description: 'Ingesting 7,024 student records across all 6 VMock reporting modules to calculate real-time readiness scores and verify resume feedback.',
    link: 'https://github.com/robbagley-afk/ensign-student-readiness-hub',
    milestones: ['Parse all 6 module fields', 'Download 9.7MB report', 'Pass 167 unit tests', 'Deploy live to port 5055']
  },
  {
    id: 'ens101-polish',
    title: 'ENS 101 Guide Mentor Desk & Completion Glow',
    quadrant: 'Q1', // Urgent & Important (Do First)
    pillar: 'Capable',
    status: 'In Progress',
    progress: 90,
    owner: 'Rodrigo Moll / Rob Bagley',
    description: 'Simplifying and polishing the ENS 101 mentor app. Issue #28 active for Amazon orange Next Step button with completion glow.',
    link: 'https://github.com/robbagley-afk/ENS-101-Guide/issues/28',
    milestones: ['Two-screen layout live on 5050', 'Register Issue #28 with Rodrigo', 'Implement completion lighting', 'Verify design system audit']
  },
  {
    id: 'internship-tool',
    title: 'Internship Approval Process & Web Tool',
    quadrant: 'Q1', // Urgent & Important (Do First)
    pillar: 'Capable',
    status: 'Blocked',
    progress: 70,
    owner: 'Sister Groom / Rodrigo Moll',
    description: 'Replacing Smartsheet with custom approval workflow, saving ~$1,500/yr. Resolving final feedback approval bottleneck with Sister Groom.',
    link: 'https://github.com/robbagley-afk',
    milestones: ['Replace Smartsheet core logic', 'Train Sister Whitney', 'Sister Groom final feedback review', 'Full production rollout']
  },
  {
    id: 'career-ui-suite',
    title: 'Ensign Career Apps Design System Restyle',
    quadrant: 'Q2', // Important, Not Urgent (Strategic Mission)
    pillar: 'Capable',
    status: 'In Progress',
    progress: 85,
    owner: 'Rob Bagley / DevOps Team',
    description: 'Aligning all 10 portfolio tools to Ensign Career Coach design system (56px touch targets, accessibility WCAG AA, local LM Studio).',
    link: 'https://github.com/robbagley-afk/ensign-design-system',
    milestones: ['Decommission cloud fallback (PR 23)', 'Audit ENS 101 & Readiness Hub', 'Mentor Explorer 5046 release', 'Phase 2 runtime audit across all ports']
  },
  {
    id: 'workshop-redesign',
    title: 'Career Workshop & CAR 201 Curriculum Redesign',
    quadrant: 'Q2', // Important, Not Urgent (Strategic Mission)
    pillar: 'Trusted', // Trusted Disciples
    status: 'In Progress',
    progress: 65,
    owner: 'Rob Bagley / Faculty',
    description: 'Restructuring career prep curriculum around natural student motivation: Job Search first, LinkedIn networking, and AI resume crafting.',
    link: 'https://mem.ai',
    milestones: ['College version completed', 'GEC version final review', 'AI-assisted resume templates', 'Launch with Fall semester mentors']
  },
  {
    id: 'peoplegrove-alumni',
    title: 'Ensign Connect & PeopleGrove Mentoring Network',
    quadrant: 'Q2', // Important, Not Urgent (Strategic Mission)
    pillar: 'Community', // Strengthening Community
    status: 'On Track',
    progress: 75,
    owner: 'Greg / Joseph / Rob',
    description: 'Strengthening community discipleship through student-alumni career roadmaps, LinkedIn sign-ups, and monthly engagement.',
    link: 'https://ensign.peoplegrove.com',
    milestones: ['Deliver PeopleGrove utilization report', 'LinkedIn-first onboarding flow', 'Alumni roadmap adaptation', 'Track mentor message exchanges']
  },
  {
    id: 'prison-education',
    title: 'Incarcerated Learners Prison Education Roadmap (PBWE)',
    quadrant: 'Q2', // Important, Not Urgent (Strategic Mission)
    pillar: 'Trusted',
    status: 'In Progress',
    progress: 50,
    owner: 'Nate / Arturo / Rob',
    description: 'Bringing Career Roadmaps 1-3 and offline on-device AI resume feedback into restricted prison Canvas environments.',
    link: 'https://mem.ai',
    milestones: ['Assess Canvas restrictions', 'Roadmap 1 mockup for incarcerated learners', 'Test offline local AI computer proposal', 'Instructor training']
  },
  {
    id: 'fleet-infrastructure',
    title: 'Mac Fleet AI Teams & Local LLM Inference Stack',
    quadrant: 'Q2', // Important, Not Urgent (Strategic Mission)
    pillar: 'Capable',
    status: 'On Track',
    progress: 90,
    owner: 'Rob Bagley',
    description: 'Mac Studio 24/7 resident inference (:1234), Odysseus (:7001), credit gate (4.8% used), and automated fleet sync across Mac Studio, iMac, MacBook Pro.',
    link: 'https://github.com/robbagley-afk',
    milestones: ['LM Studio resident gemma4-26b-qat', 'Copilot Studio credit gate', 'Corner Office coordinator handoffs', 'Automated fleetsync across 3 Macs']
  },
  {
    id: 'appfix-dispatch',
    title: 'DevOps AppFix & Continuous Bug Dispatch (appfix-cis)',
    quadrant: 'Q3', // Urgent, Not Important (Delegate & Automate)
    pillar: 'Capable',
    status: 'Completed',
    progress: 100,
    owner: 'Rodrigo Moll (@Rodrigomoll)',
    description: 'Automated issue intake via /appfix-cis, live Kanban board on Vercel, and GitHub dispatch to Rodrigo.',
    link: 'https://ensign-appfix-dashboard.vercel.app',
    milestones: ['Deploy Vercel Kanban board', 'Build /appfix-cis skill', '7-day auto-prune rule', 'Distribute to all fleet paths']
  },
  {
    id: 'stale-tasks-triage',
    title: 'Overdue Tasks & Smartsheet Legacy Decommissioning',
    quadrant: 'Q4', // Not Urgent, Not Important (Eliminate & Triage)
    pillar: 'Community',
    status: 'In Progress',
    progress: 30,
    owner: 'Rob Bagley',
    description: 'Triaging 150+ aged backlog tasks in TASKS.md and formal decommissioning of legacy spreadsheets.',
    link: 'https://mem.ai',
    milestones: ['Audit 150+ aged items in TASKS.md', 'Decommission obsolete spreadsheets', 'Close 168-day BYUI coach card', 'Archive closed projects']
  }
];

let state = {
  projects: loadProjects(),
  currentView: 'matrix', // 'matrix' or 'list'
  filterPillar: 'all',
  filterStatus: 'all',
  searchQuery: ''
};

function loadProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn('Error reading from localStorage:', err);
  }
  return [...DEFAULT_PROJECTS];
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
const filterPillar = document.getElementById('filter-pillar');
const filterStatus = document.getElementById('filter-status');
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

// Modal Elements
const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalCancel = document.getElementById('modal-cancel');
const projectForm = document.getElementById('project-form');
const modalTitle = document.getElementById('modal-title');
const formId = document.getElementById('form-id');
const formTitle = document.getElementById('form-title');
const formOwner = document.getElementById('form-owner');
const formQuadrant = document.getElementById('form-quadrant');
const formPillar = document.getElementById('form-pillar');
const formStatus = document.getElementById('form-status');
const formProgress = document.getElementById('form-progress');
const progressVal = document.getElementById('progress-val');
const formDescription = document.getElementById('form-description');
const formLink = document.getElementById('form-link');

formProgress.addEventListener('input', (e) => {
  progressVal.textContent = `${e.target.value}%`;
});

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

function getPillarBadge(pillar) {
  if (pillar === 'Capable') return '<span class="badge badge-pillar-capable">🎓 Capable</span>';
  if (pillar === 'Trusted') return '<span class="badge badge-pillar-trusted">✝️ Trusted</span>';
  if (pillar === 'Community') return '<span class="badge badge-pillar-community">🏛️ Community</span>';
  return '';
}

function getStatusBadge(status) {
  if (status === 'On Track') return '<span class="badge badge-status-ontrack">🟢 On Track</span>';
  if (status === 'In Progress') return '<span class="badge badge-status-progress">🟡 In Progress</span>';
  if (status === 'Blocked') return '<span class="badge badge-status-blocked">🔴 Blocked</span>';
  if (status === 'Completed') return '<span class="badge badge-status-done">✅ Complete</span>';
  return `<span class="badge">${status}</span>`;
}

function render() {
  const filtered = state.projects.filter(p => {
    if (state.filterPillar !== 'all' && p.pillar !== state.filterPillar) return false;
    if (state.filterStatus !== 'all' && p.status !== state.filterStatus) return false;
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchOwner = p.owner.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      if (!matchTitle && !matchOwner && !matchDesc) return false;
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
    card.className = 'project-card';
    card.onclick = () => openEditModal(p.id);

    card.innerHTML = `
      <div class="card-top">
        <div class="card-badges">
          ${getPillarBadge(p.pillar)}
          ${getStatusBadge(p.status)}
        </div>
        <span style="font-size: 0.72rem; font-weight: 700; color: #64748B;">${escapeHTML(p.owner)}</span>
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
        <span>Click card to edit progress</span>
        ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener" class="card-link" onclick="event.stopPropagation()">View Link ↗</a>` : ''}
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
    card.className = 'project-card';
    card.onclick = () => openEditModal(p.id);

    const qClass = p.quadrant.toLowerCase();
    card.innerHTML = `
      <div class="card-top">
        <div class="card-badges">
          <span class="badge" style="background:#0F172A; color:#FFF;">${p.quadrant}</span>
          ${getPillarBadge(p.pillar)}
          ${getStatusBadge(p.status)}
        </div>
        <span style="font-weight: 700; font-size: 0.8rem; color: #334155;">Lead: ${escapeHTML(p.owner)}</span>
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
        <span>Click to update progress & milestones</span>
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
  formOwner.value = p.owner;
  formQuadrant.value = p.quadrant;
  formPillar.value = p.pillar;
  formStatus.value = p.status;
  formProgress.value = p.progress;
  progressVal.textContent = `${p.progress}%`;
  formDescription.value = p.description;
  formLink.value = p.link || '';

  modal.style.display = 'flex';
}

function openAddModal() {
  modalTitle.textContent = 'Add Key Project';
  formId.value = '';
  formTitle.value = '';
  formOwner.value = 'Rob Bagley';
  formQuadrant.value = 'Q2';
  formPillar.value = 'Capable';
  formStatus.value = 'In Progress';
  formProgress.value = 50;
  progressVal.textContent = '50%';
  formDescription.value = '';
  formLink.value = '';

  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}

modalClose.addEventListener('click', closeModal);
modalCancel.addEventListener('click', closeModal);
addProjectBtn.addEventListener('click', openAddModal);

projectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = formId.value;

  if (id) {
    // Edit
    const p = state.projects.find(item => item.id === id);
    if (p) {
      p.title = formTitle.value;
      p.owner = formOwner.value;
      p.quadrant = formQuadrant.value;
      p.pillar = formPillar.value;
      p.status = formStatus.value;
      p.progress = parseInt(formProgress.value, 10);
      p.description = formDescription.value;
      p.link = formLink.value;
    }
  } else {
    // Add New
    const newProj = {
      id: 'proj-' + Date.now(),
      title: formTitle.value,
      owner: formOwner.value,
      quadrant: formQuadrant.value,
      pillar: formPillar.value,
      status: formStatus.value,
      progress: parseInt(formProgress.value, 10),
      description: formDescription.value,
      link: formLink.value,
      milestones: []
    };
    state.projects.unshift(newProj);
  }

  saveProjects();
  closeModal();
  render();
});

resetStorageBtn.addEventListener('click', () => {
  if (confirm('Reset to standard Mem project defaults?')) {
    state.projects = [...DEFAULT_PROJECTS];
    saveProjects();
    render();
  }
});

searchInput.addEventListener('input', (e) => {
  state.searchQuery = e.target.value;
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
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Initial render
render();
