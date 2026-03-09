import { THEMES } from '../data/constants.js'
import styles from './tabs.module.css'

export default function ThemeTab({ current, onSelect }) {
  return (
    <div className={styles.section}>
      <h2 className={styles.h2}>Theme Selection</h2>
      <p className={styles.muted}>Choose a colour theme for your portfolio.</p>

      <div className={styles.themeGrid}>
        {Object.entries(THEMES).map(([key, theme]) => (
          <div
            key={key}
            className={`${styles.themeCard} ${current === key ? styles.themeActive : ''}`}
            style={{ background: theme.surface, borderColor: current === key ? '#7c6af7' : 'transparent' }}
            onClick={() => onSelect(key)}
          >
            {/* Gradient swatch */}
            <div style={{ height: 60, borderRadius: 8, background: theme.gradient, marginBottom: 10 }} />

            {/* Colour dots */}
            <div className={styles.themeDots}>
              {theme.preview.map((c, i) => (
                <div key={i} className={styles.dot} style={{ background: c }} />
              ))}
            </div>

            {/* Name badge */}
            <div
              className={styles.themeName}
              style={{ background: theme.bg, color: theme.text }}
            >
              {theme.name}
            </div>

            {/* Selected tick */}
            {current === key && <div className={styles.tick}>✓</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
