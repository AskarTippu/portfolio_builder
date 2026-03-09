import { useState } from 'react'
import { SKILL_CATEGORIES } from '../data/constants.js'
import { groupSkills } from '../utils/exportHTML.js'
import styles from './tabs.module.css'

const EMPTY = { name: '', category: 'Frontend', level: 80 }

export default function SkillsTab({ data, update }) {
  const [form, setForm] = useState(EMPTY)

  const addSkill = () => {
    if (!form.name.trim()) return
    update('skills', [...data.skills, { ...form, id: Date.now() }])
    setForm(EMPTY)
  }

  const removeSkill = (id) =>
    update('skills', data.skills.filter((s) => s.id !== id))

  const grouped = groupSkills(data.skills)

  return (
    <div className={styles.section}>
      <h2 className={styles.h2}>Skills</h2>

      {/* ── Add Form ── */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Add a Skill</h3>

        <div className={styles.grid2}>
          <div className={styles.field}>
            <label className={styles.label}>Skill Name *</label>
            <input className={styles.input} placeholder="React"
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Category</label>
            <select className={styles.select} value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {SKILL_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Proficiency: {form.level}%</label>
          <input type="range" min={10} max={100} step={5}
            value={form.level} onChange={(e) => setForm({ ...form, level: +e.target.value })} />
        </div>

        <button className={styles.btnAccent} onClick={addSkill}>+ Add Skill</button>
      </div>

      {/* ── Skills List ── */}
      {data.skills.length === 0 && (
        <p className={styles.empty}>No skills yet. Add one above!</p>
      )}

      {Object.entries(grouped).map(([cat, skills]) => (
        <div key={cat} className={styles.skillGroup}>
          <h3 className={styles.skillCat}>{cat}</h3>
          {skills.map((s) => (
            <div key={s.id} className={`${styles.card} ${styles.skillCard}`}>
              <div className={styles.skillInfo}>
                <div className={styles.skillHeader}>
                  <span className={styles.skillName}>{s.name}</span>
                  <span className={styles.muted}>{s.level}%</span>
                </div>
                <div className={styles.barBg}>
                  <div className={styles.barFill} style={{ width: `${s.level}%` }} />
                </div>
              </div>
              <button className={styles.btnDanger} onClick={() => removeSkill(s.id)}>✕</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
