import useScrollReveal from '../../hooks/useScrollReveal.js'
import TimelineItem from './TimelineItem.jsx'
import experience from '../../data/experience.json'
import styles from './Experience.module.css'

export default function Experience() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="experience" className={styles.section}>
      <div ref={ref} className={`${styles.container} ${isVisible ? 'reveal visible' : 'reveal'}`}>
        <h2 className="section-heading">git log --oneline</h2>
        <div className={styles.timeline}>
          {experience.map((item) => (
            <TimelineItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
