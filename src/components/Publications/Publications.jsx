import useScrollReveal from '../../hooks/useScrollReveal.js'
import styles from './Publications.module.css'

export default function Publications() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="publications" className={styles.section}>
      <div ref={ref} className={`${styles.container} ${isVisible ? 'reveal visible' : 'reveal'}`}>
        <h2 className="section-heading">cat ./publications</h2>
        <div className={styles.card}>
          <div className={styles.badge}>Coming Soon</div>
          <h3 className={styles.title}>Sustainability & Machine Learning</h3>
          <p className={styles.conference}>
            PowerUp 2026 | Boulder, CO
          </p>
          <p className={styles.description}>
            Research paper on sustainability and machine learning, submitted for review
            to the PowerUp 2026 conference. Details will be published upon decision.
          </p>
          <div className={styles.tags}>
            <span className={styles.tag}>Machine Learning</span>
            <span className={styles.tag}>Sustainability</span>
            <span className={styles.tag}>Time-Series Forecasting</span>
          </div>
        </div>
      </div>
    </section>
  )
}
