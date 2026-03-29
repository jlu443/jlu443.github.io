import { useNavigate } from 'react-router-dom'
import useScrollReveal from '../../hooks/useScrollReveal.js'
import writeups from '../../data/writeups.json'
import styles from './Writeups.module.css'

const categoryColors = {
  web: '#00e5ff',
  crypto: '#ffd600',
  pwn: '#ff5252',
  rev: '#b388ff',
  forensics: '#69f0ae',
  osint: '#ffab40',
  misc: '#e0e0e0',
}

export default function Writeups() {
  const { ref, isVisible } = useScrollReveal()
  const navigate = useNavigate()

  return (
    <section id="writeups" className={styles.section}>
      <div ref={ref} className={`${styles.container} ${isVisible ? 'reveal visible' : 'reveal'}`}>
        <h2 className="section-heading">cat ./ctf-writeups</h2>
        <p className={styles.subtitle}>
          Competed with <a href="https://hackpack.club" target="_blank" rel="noopener noreferrer">HackPack</a> @ NC State
        </p>
        <div className={styles.grid}>
          {writeups.map((w) => (
            <article
              key={w.slug}
              className={styles.card}
              onClick={() => navigate(`/writeups/${w.slug}`)}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/writeups/${w.slug}`)}
            >
              <div className={styles.header}>
                <span
                  className={styles.badge}
                  style={{
                    color: categoryColors[w.category] || categoryColors.misc,
                    background: `${categoryColors[w.category] || categoryColors.misc}22`,
                  }}
                >
                  {w.category}
                </span>
                <span className={styles.date}>{w.date}</span>
              </div>
              <h3 className={styles.title}>{w.challenge}</h3>
              <p className={styles.ctf}>{w.ctf}</p>
              <p className={styles.summary}>{w.summary}</p>
              <div className={styles.tags}>
                {w.tags.map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
