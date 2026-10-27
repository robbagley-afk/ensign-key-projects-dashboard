const fs = require('fs');
const path = require('path');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS');
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

  if (req.method === 'POST') {
    const { projectId, name, url, type, size, mimeType } = req.body || {};
    if (!projectId || !url) {
      return res.status(400).json({ error: 'projectId and url are required.' });
    }

    const proj = projects.find(p => p.id === projectId);
    if (!proj) {
      return res.status(404).json({ error: 'Project not found.', projectId });
    }

    if (!Array.isArray(proj.attachments)) {
      proj.attachments = [];
    }

    const newAtt = {
      id: 'att-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
      name: name || url,
      type: type || (url.startsWith('http') ? 'link' : 'file'),
      url: url,
      size: size || 0,
      mimeType: mimeType || 'text/uri-list',
      dateAdded: new Date().toISOString()
    };

    proj.attachments.push(newAtt);

    try {
      fs.writeFileSync(dataPath, JSON.stringify(projects, null, 2), 'utf8');
    } catch (err) {
      console.warn('Could not write to file in current serverless execution');
    }

    return res.status(201).json({ success: true, project: proj, attachment: newAtt });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
