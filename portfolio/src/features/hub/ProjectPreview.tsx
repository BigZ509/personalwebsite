import type { SoftwareProject } from './softwareProjects';
import styles from './computer-dashboard.module.css';

export default function ProjectPreview({ project }: { project: SoftwareProject }) {
  return <span className={styles.preview}>
    {/* Original vector concepts, explicitly distinguished from real screenshots. */}
    <img src={project.preview} width={768} height={432} alt={`${project.name} interface concept with sample data`} loading="lazy" decoding="async" />
    <span className={styles.previewCaption}>Concept preview · Sample data</span>
  </span>;
}
