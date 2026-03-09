import { useState } from 'react'
import styles from './tabs.module.css'

const EMPTY = { title: '', desc: '', tech: '', link: '', github: '' }

export default function ProjectsTab({ data, update }) {
  const [form, setForm] = useState(EMPTY)

  const addProject = () => {
    if (!form.title.trim()) return
    const techs = form.tech.split(',').map((s) => s.trim()).filter(Boolean)
    update('projects', [...data.projects, { ...form, tech: techs, id: Date.now() }])
    setForm(EMPTY)
  }

  const removeProject = (id) =>
    update('projects', data.projects.filter((p) => p.id !== id))

  return (
    <div className={styles.section}>
      <h2 className={styles.h2}>Projects</h2>

      {/* ── Add Form ── */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Add a Project</h3>

        <div className={styles.grid2}>
          <div className={styles.field}>
            <label className={styles.label}>Title *</label>
            <input className={styles.input} placeholder="My Awesome App"
              value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Live Link</label>
            <input className={styles.input} placeholder="https://..."
              value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Description</label>
          <textarea className={styles.textarea} placeholder="What does this project do?"
            value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
        </div>

        <div className={styles.grid2}>
          <div className={styles.field}>
            <label className={styles.label}>Tech Stack (comma separated)</label>
            <input className={styles.input} placeholder="React, Node.js, MongoDB"
              value={form.tech} onChange={(e) => setForm({ ...form, tech: e.target.value })} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>GitHub Repo</label>
            <input className={styles.input} placeholder="github.com/user/repo"
              value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} />
          </div>
        </div>

        <button className={styles.btnAccent} onClick={addProject}>+ Add Project</button>
      </div>

      {/* ── Project List ── */}
      {data.projects.length === 0 && (
        <p className={styles.empty}>No projects yet. Add one above!</p>
      )}

      {data.projects.map((p) => (
        <div key={p.id} className={styles.card}>
          <div className={styles.cardRow}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.muted}>{p.desc}</p>
              <div className={styles.tagRow}>
                {p.tech?.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
              </div>
              {(p.link || p.github) && (
                <div className={styles.linkRow}>
                  {p.link   && <span className={styles.linkSmall}>🔗 {p.link}</span>}
                  {p.github && <span className={styles.linkSmall}>🐙 {p.github}</span>}
                </div>
              )}
            </div>
            <button className={styles.btnDanger} onClick={() => removeProject(p.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
