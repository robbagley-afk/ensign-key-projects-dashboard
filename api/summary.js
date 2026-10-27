const fs = require('fs');
const path = require('path');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const dataPath = path.join(process.cwd(), 'data', 'projects.json');
  let projects = [];
  try {
    if (fs.existsSync(dataPath)) {
      projects = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to read projects database.' });
  }

  const scope = req.query.scope || 'mikes'; // 'mikes' or 'all'
  const format = req.query.format || 'json'; // 'json' or 'markdown'

  let activeProjects = projects.filter(p => !p.isRemoved);
  if (scope === 'mikes') {
    activeProjects = activeProjects.filter(p => !!p.inMikesReport);
  }

  const q1 = activeProjects.filter(p => p.quadrant === 'Q1');
  const q2 = activeProjects.filter(p => p.quadrant === 'Q2');
  const q3 = activeProjects.filter(p => p.quadrant === 'Q3');
  const q4 = activeProjects.filter(p => p.quadrant === 'Q4');

  if (format === 'markdown' || format === 'text') {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    let md = `# Executive Project Briefing — Director 1:1 Review\n`;
    md += `**Date:** ${today}\n`;
    md += `**Prepared by:** Rob Bagley, Associate Director Career Services\n`;
    md += `**Scope:** ${scope === 'mikes' ? "Curated Mike Ray 1:1 Key Projects" : "All Active Department Initiatives"} (${activeProjects.length} items)\n\n`;

    const formatList = (title, list) => {
      let out = `## ${title} (${list.length})\n`;
      if (list.length === 0) {
        out += `*No active items in this category.*\n\n`;
        return out;
      }
      list.forEach((p, idx) => {
        out += `### ${idx + 1}. ${p.title} (${p.progress}% Complete — ${p.status})\n`;
        out += `- **Owner / Lead:** ${p.delegatedOwner ? `${p.delegatedOwner} (Delegated)` : (p.owner || 'Rob Bagley')}\n`;
        out += `- **Department:** ${p.department || 'Career Mentor'} | **Mission Pillar:** ${p.pillar || 'Capable'}\n`;
        out += `- **Target Due Date:** ${p.dueDate || 'Ongoing'}\n`;
        if (p.description) out += `- **Summary:** ${p.description}\n`;
        if (p.attachments && p.attachments.length > 0) {
          out += `- **Attachments & Links (${p.attachments.length}):**\n`;
          p.attachments.forEach(a => {
            out += `  - [${a.name}](${a.url || '#'}) (${a.type})\n`;
          });
        }
        out += `\n`;
      });
      return out;
    };

    md += formatList("1. Urgent & Critical (Do First — Q1)", q1);
    md += formatList("2. Strategic Mission Alignment (Deep Focus — Q2)", q2);
    md += formatList("3. Delegated & Operational Tasks (Q3)", q3);
    md += formatList("4. Backlog & Low-Priority Triage (Q4)", q4);

    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    return res.status(200).send(md);
  }

  return res.status(200).json({
    scope,
    totalCount: activeProjects.length,
    counts: { Q1: q1.length, Q2: q2.length, Q3: q3.length, Q4: q4.length },
    projects: { Q1: q1, Q2: q2, Q3: q3, Q4: q4 }
  });
};
