import { useEffect, Suspense, lazy } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import posts from '../../data/blog.json'
import Footer from '../Footer/Footer.jsx'
import styles from './BlogPost.module.css'

const categoryColors = {
  devops: '#00e5ff',
  mlops: '#b388ff',
  webdev: '#69f0ae',
  security: '#ff5252',
  python: '#ffd600',
  general: '#e0e0e0',
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

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const meta = posts.find((p) => p.slug === slug)

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
          <p style={{ color: 'var(--text-secondary)', marginTop: '2rem' }}>Post not found.</p>
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
              color: categoryColors[meta.category] || categoryColors.general,
              background: `${categoryColors[meta.category] || categoryColors.general}22`,
            }}
          >
            {meta.category}
          </span>
          <h1 className={styles.title}>{meta.title}</h1>
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
            <p style={{ color: 'var(--text-secondary)' }}>Post content coming soon.</p>
          )}
        </article>
      </div>
      <Footer />
    </div>
  )
}
