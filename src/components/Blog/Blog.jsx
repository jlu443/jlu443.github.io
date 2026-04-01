import { useNavigate } from 'react-router-dom'
import useScrollReveal from '../../hooks/useScrollReveal.js'
import posts from '../../data/blog.json'
import styles from './Blog.module.css'

const categoryColors = {
  devops: '#00e5ff',
  mlops: '#b388ff',
  webdev: '#69f0ae',
  security: '#ff5252',
  python: '#ffd600',
  general: '#e0e0e0',
}

export default function Blog() {
  const { ref, isVisible } = useScrollReveal()
  const navigate = useNavigate()

  return (
    <section id="blog" className={styles.section}>
      <div ref={ref} className={`${styles.container} ${isVisible ? 'reveal visible' : 'reveal'}`}>
        <h2 className="section-heading">tail -f ~/blog.log</h2>
        <div className={styles.grid}>
          {posts.map((p) => (
            <article
              key={p.slug}
              className={styles.card}
              onClick={() => navigate(`/blog/${p.slug}`)}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/blog/${p.slug}`)}
            >
              <div className={styles.header}>
                <span
                  className={styles.badge}
                  style={{
                    color: categoryColors[p.category] || categoryColors.general,
                    background: `${categoryColors[p.category] || categoryColors.general}22`,
                  }}
                >
                  {p.category}
                </span>
                <span className={styles.date}>{p.date}</span>
              </div>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.summary}>{p.summary}</p>
              <div className={styles.tags}>
                {p.tags.map((t) => (
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
