import styles from './Sidebar.module.css'

const TABS = [
  { id: 'profile',  icon: '👤', label: 'Profile'  },
  { id: 'projects', icon: '🚀', label: 'Projects' },
  { id: 'skills',   icon: '⚡', label: 'Skills'   },
  { id: 'theme',    icon: '🎨', label: 'Theme'    },
]

export default function Sidebar({ activeTab, setActiveTab, projectCount, skillCount }) {
  return (
    <aside className={styles.sidebar}>
      <nav>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.navItem} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className={styles.icon}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>
      <div className={styles.stats}>
        {projectCount} projects · {skillCount} skills
      </div>
    </aside>
  )
}
