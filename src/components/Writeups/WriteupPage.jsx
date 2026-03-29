import { useEffect, useState, Suspense, lazy } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import writeups from '../../data/writeups.json'
import Footer from '../Footer/Footer.jsx'
import styles from './WriteupPage.module.css'

const categoryColors = {
  web: '#00e5ff',
  crypto: '#ffd600',
  pwn: '#ff5252',
  rev: '#b388ff',
  forensics: '#69f0ae',
  osint: '#ffab40',
  misc: '#e0e0e0',
}

const contentModules = import.meta.glob('./content/*.jsx')

const componentCache = {}

function getContentComponent(slug) {
  if (componentCache[slug]) return componentCache[slug]

  for (const [path, loader] of Object.entries(contentModules)) {
    const filename = path.split('/').pop().replace('.jsx', '')
    if (filename === slug) {
      componentCache[slug] = lazy(loader)
      return componentCache[slug]
    }
  }
  return null
}

export default function WriteupPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const meta = writeups.find((w) => w.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!meta) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <button className={styles.back} onClick={() => navigate('/')}>
            &larr; Back to portfolio
          </button>
          <p style={{ color: 'var(--text-secondary)', marginTop: '2rem' }}>Writeup not found.</p>
        </div>
        <Footer />
      </div>
    )
  }

  const Content = getContentComponent(slug)

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button className={styles.back} onClick={() => navigate('/')}>
          &larr; Back to portfolio
        </button>

        <header className={styles.header}>
          <span
            className={styles.badge}
            style={{
              color: categoryColors[meta.category] || categoryColors.misc,
              background: `${categoryColors[meta.category] || categoryColors.misc}22`,
            }}
          >
            {meta.category}
          </span>
          <h1 className={styles.title}>{meta.challenge}</h1>
          <p className={styles.ctf}>{meta.ctf}</p>
          <div className={styles.meta}>
            <span>{meta.date}</span>
            <div className={styles.tags}>
              {meta.tags.map((t) => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
          </div>
        </header>

        <article className={styles.prose}>
          {Content ? (
            <Suspense fallback={<p style={{ color: 'var(--text-secondary)' }}>Loading...</p>}>
              <Content />
            </Suspense>
          ) : (
            <p style={{ color: 'var(--text-secondary)' }}>Writeup content coming soon.</p>
          )}
        </article>
      </div>
      <Footer />
    </div>
  )
}
