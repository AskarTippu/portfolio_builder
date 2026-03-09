import { useRef } from 'react'
import styles from './tabs.module.css'

export default function ProfileTab({ data, update }) {
  const fileRef = useRef()

  const handleAvatar = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => update('avatar', ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className={styles.section}>
      <h2 className={styles.h2}>Profile Info</h2>

      {/* Avatar Upload */}
      <div className={styles.avatarRow}>
        <div className={styles.avatarCircle} onClick={() => fileRef.current.click()}>
          {data.avatar
            ? <img src={data.avatar} alt="avatar" className={styles.avatarImg} />
            : <span className={styles.avatarPlaceholder}>📷</span>
          }
        </div>
        <div>
          <button className={styles.btnOutline} onClick={() => fileRef.current.click()}>
            Upload Photo
          </button>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleAvatar} />
          <p className={styles.hint}>JPG or PNG. Shown as your avatar.</p>
        </div>
      </div>

      <div className={styles.grid2}>
        <div className={styles.field}>
          <label className={styles.label}>Full Name</label>
          <input className={styles.input} placeholder="Jane Doe"
            value={data.name} onChange={(e) => update('name', e.target.value)} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Job Title</label>
          <input className={styles.input} placeholder="Full Stack Developer"
            value={data.title} onChange={(e) => update('title', e.target.value)} />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Bio</label>
        <textarea className={styles.textarea} placeholder="Tell the world about yourself..."
          value={data.bio} onChange={(e) => update('bio', e.target.value)} />
      </div>

      <div className={styles.grid2}>
        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input className={styles.input} placeholder="jane@example.com"
            value={data.email} onChange={(e) => update('email', e.target.value)} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Website</label>
          <input className={styles.input} placeholder="https://janedoe.dev"
            value={data.website} onChange={(e) => update('website', e.target.value)} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>GitHub</label>
          <input className={styles.input} placeholder="github.com/username"
            value={data.github} onChange={(e) => update('github', e.target.value)} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>LinkedIn</label>
          <input className={styles.input} placeholder="linkedin.com/in/username"
            value={data.linkedin} onChange={(e) => update('linkedin', e.target.value)} />
        </div>
      </div>
    </div>
  )
}
