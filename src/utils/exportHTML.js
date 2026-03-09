import { SKILL_CATEGORIES } from '../data/constants.js'

// Groups skills by category
export function groupSkills(skills) {
  return SKILL_CATEGORIES.reduce((acc, cat) => {
    const s = skills.filter((sk) => sk.category === cat)
    if (s.length) acc[cat] = s
    return acc
  }, {})
}

// Generates a standalone HTML file string from portfolio data + theme
export function generateHTML(data, t) {
  const grouped = groupSkills(data.skills)

  const skillsHTML = Object.entries(grouped)
    .map(
      ([cat, skills]) => `
    <div class="skill-group">
      <h4 class="skill-cat">${cat}</h4>
      ${skills
        .map(
          (s) => `
        <div class="skill-item">
          <div class="skill-header">
            <span>${s.name}</span>
            <span>${s.level}%</span>
          </div>
          <div class="skill-bar">
            <div class="skill-fill" style="width:${s.level}%"></div>
          </div>
        </div>`
        )
        .join('')}
    </div>`
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${data.name || 'Portfolio'}</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'DM Sans', sans-serif; background: ${t.bg}; color: ${t.text}; line-height: 1.6; }
    .hero { max-width: 900px; margin: 0 auto; padding: 100px 32px 60px; display: flex; align-items: center; gap: 48px; flex-wrap: wrap; }
    .avatar { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 3px solid ${t.accent}; }
    .subtitle { font-size: 13px; font-weight: 700; color: ${t.accent}; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 8px; }
    h1 { font-size: 56px; font-weight: 800; margin-bottom: 16px; line-height: 1.05; }
    .bio { color: ${t.muted}; font-size: 16px; max-width: 560px; margin-bottom: 24px; }
    .links { display: flex; gap: 12px; flex-wrap: wrap; }
    .links a { padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px; }
    .link-primary { background: ${t.gradient}; color: #fff; }
    .link-secondary { border: 1px solid ${t.border}; color: ${t.text}; background: ${t.surface}; }
    hr { border: none; border-top: 1px solid ${t.border}; max-width: 900px; margin: 0 auto; }
    section { max-width: 900px; margin: 0 auto; padding: 60px 32px; }
    h2 { font-size: 36px; font-weight: 800; margin-bottom: 8px; }
    .section-sub { color: ${t.muted}; margin-bottom: 40px; font-size: 15px; }
    .projects { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
    .project-card { background: ${t.card}; border: 1px solid ${t.border}; border-radius: 16px; padding: 24px; display: flex; flex-direction: column; }
    .project-card h3 { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
    .project-desc { color: ${t.muted}; font-size: 14px; flex: 1; margin-bottom: 16px; }
    .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
    .tag { background: ${t.tag}; color: ${t.tagText}; font-size: 11px; padding: 3px 8px; border-radius: 4px; font-weight: 600; }
    .project-links a { margin-right: 12px; font-size: 13px; color: ${t.accent}; text-decoration: none; font-weight: 700; }
    .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 32px; }
    .skill-cat { font-size: 12px; font-weight: 700; color: ${t.accent}; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px; }
    .skill-item { margin-bottom: 14px; }
    .skill-header { display: flex; justify-content: space-between; font-size: 14px; font-weight: 600; margin-bottom: 6px; }
    .skill-bar { height: 5px; background: ${t.border}; border-radius: 4px; }
    .skill-fill { height: 100%; background: ${t.gradient}; border-radius: 4px; }
    footer { border-top: 1px solid ${t.border}; padding: 28px 32px; text-align: center; color: ${t.muted}; font-size: 14px; }
  </style>
</head>
<body>
  <section class="hero">
    ${data.avatar ? `<img class="avatar" src="${data.avatar}" alt="${data.name}" />` : ''}
    <div class="hero-text">
      <div class="subtitle">${data.title || 'Developer'}</div>
      <h1>${data.name || 'Your Name'}</h1>
      <p class="bio">${data.bio || ''}</p>
      <div class="links">
        ${data.email ? `<a href="mailto:${data.email}" class="link-primary">✉ Contact Me</a>` : ''}
        ${data.github ? `<a href="https://${data.github}" target="_blank" class="link-secondary">🐙 GitHub</a>` : ''}
        ${data.linkedin ? `<a href="https://${data.linkedin}" target="_blank" class="link-secondary">💼 LinkedIn</a>` : ''}
      </div>
    </div>
  </section>
  <hr />
  ${
    data.projects.length
      ? `<section>
    <h2>Projects</h2>
    <p class="section-sub">Things I've built.</p>
    <div class="projects">
      ${data.projects
        .map(
          (p) => `<div class="project-card">
        <h3>${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="tags">${(p.tech || []).map((tech) => `<span class="tag">${tech}</span>`).join('')}</div>
        <div class="project-links">
          ${p.link ? `<a href="${p.link}" target="_blank">→ Live Demo</a>` : ''}
          ${p.github ? `<a href="https://${p.github}" target="_blank" style="color:${t.muted}">GitHub ↗</a>` : ''}
        </div>
      </div>`
        )
        .join('')}
    </div>
  </section>`
      : ''
  }
  ${
    data.skills.length
      ? `<section>
    <hr style="margin: 0 0 60px" />
    <h2>Skills</h2>
    <p class="section-sub">My technical toolkit.</p>
    <div class="skills-grid">${skillsHTML}</div>
  </section>`
      : ''
  }
  <footer>Built with Portfolio Builder · ${data.name || 'Your Name'}</footer>
</body>
</html>`
}

// Trigger browser download of the exported HTML
export function downloadHTML(data, t) {
  const html = generateHTML(data, t)
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${data.name || 'portfolio'}-portfolio.html`
  a.click()
  URL.revokeObjectURL(url)
}
