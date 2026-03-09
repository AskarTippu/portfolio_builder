import { groupSkills } from '../utils/exportHTML.js'
import styles from './Preview.module.css'

export default function Preview({ data, t, onBack, onExport }) {
  const grouped = groupSkills(data.skills)

  return (
    <div className={styles.wrapper} style={{ background: t.bg, color: t.text }}>

      {/* Floating toolbar */}
      <div className={styles.toolbar}>
        <button className={styles.backBtn} onClick={onBack}>← Edit</button>
        <button
          className={styles.exportBtn}
          style={{ background: t.gradient }}
          onClick={onExport}
        >
          ⬇ Export HTML
        </button>
      </div>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        {data.avatar && (
          <img
            src={data.avatar}
            alt={data.name}
            className={styles.avatar}
            style={{ borderColor: t.accent }}
          />
        )}
        <div className={styles.heroText}>
          <div className={styles.subtitle} style={{ color: t.accent }}>
            {data.title || 'Developer'}
          </div>
          <h1 className={styles.heroName}>{data.name || 'Your Name'}</h1>
          <p className={styles.bio} style={{ color: t.muted }}>
            {data.bio || 'Your bio goes here.'}
          </p>
          <div className={styles.links}>
            {data.email && (
              <a href={`mailto:${data.email}`} className={styles.linkPrimary}
                style={{ background: t.gradient }}>
                ✉ Contact Me
              </a>
            )}
            {data.github && (
              <a href={`https://${data.github}`} target="_blank" rel="noreferrer"
                className={styles.linkSecondary}
                style={{ borderColor: t.border, background: t.surface, color: t.text }}>
                🐙 GitHub
              </a>
            )}
            {data.linkedin && (
              <a href={`https://${data.linkedin}`} target="_blank" rel="noreferrer"
                className={styles.linkSecondary}
                style={{ borderColor: t.border, background: t.surface, color: t.text }}>
                💼 LinkedIn
              </a>
            )}
          </div>
        </div>
      </section>

      <hr style={{ borderColor: t.border, maxWidth: 900, margin: '0 auto' }} />

      {/* ── Projects ── */}
      {data.projects.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Projects</h2>
          <p className={styles.sectionSub} style={{ color: t.muted }}>Things I've built.</p>
          <div className={styles.projectGrid}>
            {data.projects.map((p) => (
              <div key={p.id} className={styles.projectCard}
                style={{ background: t.card, borderColor: t.border }}>
                <h3 className={styles.projectTitle}>{p.title}</h3>
                <p className={styles.projectDesc} style={{ color: t.muted }}>{p.desc}</p>
                <div className={styles.tagRow}>
                  {p.tech?.map((tech) => (
                    <span key={tech} className={styles.tag}
                      style={{ background: t.tag, color: t.tagText }}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className={styles.projectLinks}>
                  {p.link && <a href={p.link} target="_blank" rel="noreferrer"
                    style={{ color: t.accent }}>→ Live Demo</a>}
                  {p.github && <a href={`https://${p.github}`} target="_blank" rel="noreferrer"
                    style={{ color: t.muted }}>GitHub ↗</a>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Skills ── */}
      {data.skills.length > 0 && (
        <section className={styles.section}>
          <hr style={{ borderColor: t.border, marginBottom: 60 }} />
          <h2 className={styles.sectionTitle}>Skills</h2>
          <p className={styles.sectionSub} style={{ color: t.muted }}>My technical toolkit.</p>
          <div className={styles.skillGrid}>
            {Object.entries(grouped).map(([cat, skills]) => (
              <div key={cat}>
                <h4 className={styles.skillCat} style={{ color: t.accent }}>{cat}</h4>
                {skills.map((s) => (
                  <div key={s.id} className={styles.skillItem}>
                    <div className={styles.skillHeader}>
                      <span>{s.name}</span>
                      <span style={{ color: t.muted }}>{s.level}%</span>
                    </div>
                    <div className={styles.barBg} style={{ background: t.border }}>
                      <div className={styles.barFill}
                        style={{ width: `${s.level}%`, background: t.gradient }} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer className={styles.footer} style={{ borderColor: t.border, color: t.muted }}>
        Built with Portfolio Builder · {data.name || 'Your Name'}
      </footer>
    </div>
  )
}
