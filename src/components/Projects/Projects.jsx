import useScrollReveal from '../../hooks/useScrollReveal.js'
import ProjectCard from './ProjectCard.jsx'
import projects from '../../data/projects.json'
import styles from './Projects.module.css'

export default function Projects() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="projects" className={styles.section}>
      <div ref={ref} className={`${styles.container} ${isVisible ? 'reveal visible' : 'reveal'}`}>
        <h2 className="section-heading">ls ./projects</h2>
        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
