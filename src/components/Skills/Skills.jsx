import useScrollReveal from '../../hooks/useScrollReveal.js'
import skills from '../../data/skills.json'
import styles from './Skills.module.css'

export default function Skills() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="skills" className={styles.section}>
      <div ref={ref} className={`${styles.container} ${isVisible ? 'reveal visible' : 'reveal'}`}>
        <h2 className="section-heading">cat skills.txt</h2>
        <div className={styles.categories}>
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className={styles.category}>
              <h3 className={styles.categoryName}>{category}</h3>
              <div className={styles.pills}>
                {items.map((skill) => (
                  <span key={skill} className={styles.pill}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
