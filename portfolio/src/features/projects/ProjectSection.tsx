import type { ProjectSection as ProjectSectionData } from "./projectTypes";
import styles from "./projects.module.css";

export default function ProjectSection({ section }: { section: ProjectSectionData }) {
  return (
    <section className={styles.storySection} data-layout={section.layout} aria-labelledby={`section-${section.id}`}>
      <div className={styles.sectionHeading}>
        <h2 id={`section-${section.id}`}>{section.title}</h2>
      </div>
      <div className={styles.sectionCopy}>
        {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {section.layout === "flow" ? (
          <ol className={styles.flowList}>
            {section.items.map((item) => <li key={item.label}><strong>{item.label}</strong><span>{item.description}</span></li>)}
          </ol>
        ) : section.layout === "editorial" ? (
          <dl className={styles.editorialList}>
            {section.items.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.description}</dd></div>)}
          </dl>
        ) : null}
      </div>
    </section>
  );
}
