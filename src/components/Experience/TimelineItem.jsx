import styles from './TimelineItem.module.css'

export default function TimelineItem({ item }) {
  return (
    <div className={`${styles.item} ${item.type === 'education' ? styles.education : ''}`}>
      <div className={styles.dot} />
      <div className={styles.meta}>
        <span className={styles.role}>{item.role}</span>
        <span className={styles.org}>@ {item.organization}</span>
      </div>
      <p className={styles.dateLocation}>
        {item.startDate} — {item.endDate} · {item.location}
      </p>
      <ul className={styles.bullets}>
        {item.bullets.map((bullet, i) => (
          <li key={i}>{bullet}</li>
        ))}
      </ul>
    </div>
  )
}
