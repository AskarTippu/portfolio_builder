import styles from './Header.module.css'

export default function Header({ onPreview, onExport, isDark, toggleColor, onToggleTheme }) {
  return (
    <header className={styles.header} style={{ '--toggle-color': toggleColor }}>
      <span className={styles.logo}>💼 Portfolio Builder</span>
      <div className={styles.actions}>

        {/* ── Dark / Light toggle ── */}
        <button
          className={styles.toggleBtn}
          onClick={onToggleTheme}
          title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
        >
          <span className={styles.toggleTrack} data-dark={isDark}>
            <span className={styles.toggleThumb} data-dark={isDark}>
              {isDark ? '🌙' : '☀️'}
            </span>
          </span>
          <span className={styles.toggleLabel}>
            {isDark ? 'Dark' : 'Light'}
          </span>
        </button>

        <button className={styles.btnSecondary} onClick={onPreview}>
          👁 Preview
        </button>
        <button className={styles.btnPrimary} onClick={onExport}>
          ⬇ Export HTML
        </button>
      </div>
    </header>
  )
}
