import { useState } from 'react'  
import { THEMES, DEFAULT_DATA } from './data/constants.js'
import { downloadHTML } from './utils/exportHTML.js'
import Header      from './components/Header.jsx'
import Sidebar     from './components/Sidebar.jsx'
import ProfileTab  from './components/ProfileTab.jsx'
import ProjectsTab from './components/ProjectsTab.jsx'
import SkillsTab   from './components/SkillsTab.jsx'
import ThemeTab    from './components/ThemeTab.jsx'
import Preview     from './components/Preview.jsx'
import styles      from './App.module.css'

// Dark ↔ Light theme pairs
const DARK_THEME  = 'midnight'
const LIGHT_THEME = 'arctic'

export default function App() {
  const [data, setData]           = useState(DEFAULT_DATA)
  const [activeTab, setActiveTab] = useState('profile')
  const [previewing, setPreviewing] = useState(false)

  const update = (field, value) =>
    setData((prev) => ({ ...prev, [field]: value }))

  const t      = THEMES[data.theme]
  const isDark = data.theme === DARK_THEME || data.theme === 'ember'

  // Toggle between dark (midnight) and light (arctic)
  const handleToggleTheme = () => {
    update('theme', isDark ? LIGHT_THEME : DARK_THEME)
  }

  const handleExport = () => downloadHTML(data, t)

  if (previewing) {
    return (
      <Preview
        data={data}
        t={t}
        onBack={() => setPreviewing(false)}
        onExport={handleExport}
      />
    )
  }

  return (
    <div
      className={styles.app}
      data-dark={isDark}
      style={{
        '--bg': t.bg,
        '--surface': t.surface,
        '--card': t.card,
        '--border': t.border,
        '--accent': t.accent,
        '--accentSoft': t.accentSoft,
        '--text': t.text,
        '--muted': t.muted,
        '--tag': t.tag,
        '--tagText': t.tagText,
        '--gradient': t.gradient,
      }}
    >
      <Header
        onPreview={() => setPreviewing(true)}
        onExport={handleExport}
        isDark={isDark}
        toggleColor={t.accent}
        onToggleTheme={handleToggleTheme}
      />

      <div className={styles.layout}>
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          projectCount={data.projects.length}
          skillCount={data.skills.length}
        />

        <main className={styles.main}>
          {activeTab === 'profile'  && <ProfileTab  data={data} update={update} />}
          {activeTab === 'projects' && <ProjectsTab data={data} update={update} />}
          {activeTab === 'skills'   && <SkillsTab   data={data} update={update} />}
          {activeTab === 'theme'    && <ThemeTab    current={data.theme} onSelect={(k) => update('theme', k)} />}        
        </main>
      </div>
    </div>
  )
}
