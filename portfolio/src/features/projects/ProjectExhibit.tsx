"use client";

import type { ProjectCaseStudy } from "./projectTypes";
import ProjectMediaGallery from "./ProjectMediaGallery";
import ProjectSection from "./ProjectSection";
import styles from "./projects.module.css";

export default function ProjectExhibit({
  project,
  expanded,
  representationNote,
  contextSource,
}: {
  project: ProjectCaseStudy;
  expanded: boolean;
  representationNote?: string;
  contextSource?: string | null;
}) {
  return (
    <div className={styles.exhibitContent} data-expanded={expanded}>
      <section className={styles.exhibitOverview} aria-label="Project overview">
        <p className={styles.exhibitStatus}>{project.status}<span>{project.focus}</span></p>
        <ProjectMediaGallery media={project.media} heroMediaId={project.heroMediaId} />
        <p className={styles.mediaContext}>{project.mediaContext}</p>
        <p className={styles.exhibitSummary}>{project.summary}</p>
        <ul className={styles.technologyList} aria-label="Documented technologies">
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        {representationNote && (
          <aside className={styles.hardwareNote}>
            <strong>Hardware, illustrated</strong>
            <p>{representationNote}</p>
          </aside>
        )}
      </section>

      <div className={styles.exhibitStory} hidden={!expanded}>
        <section className={styles.exhibitMediaNote} aria-label="Project media availability">
          <span>Demo recording</span>
          <p>{project.demoUnavailableNote}</p>
        </section>
        <div className={styles.storySections}>
          {project.sections.map((section) => <ProjectSection key={section.id} section={section} />)}
        </div>
        <section className={styles.exhibitSources} aria-labelledby="exhibit-sources-title">
          <div>
            <span>Project source</span>
            <h2 id="exhibit-sources-title">{project.repository.label}</h2>
            <p>{project.teamContext}</p>
          </div>
          <nav className={styles.exhibitSourceLinks} aria-label="Confirmed project sources">
            <a href={project.repository.url} target="_blank" rel="noopener noreferrer">
              Open repository <span aria-hidden="true">↗</span>
              <span className={styles.srOnly}> (opens in a new tab)</span>
            </a>
            {contextSource && <a href={contextSource} target="_blank" rel="noopener noreferrer">
              Read project context <span aria-hidden="true">↗</span>
              <span className={styles.srOnly}> (opens in a new tab)</span>
            </a>}
            {project.demo && <a href={project.demo.url} target="_blank" rel="noopener noreferrer">
              {project.demo.label} <span aria-hidden="true">↗</span>
              <span className={styles.srOnly}> (opens in a new tab)</span>
            </a>}
          </nav>
        </section>
      </div>
    </div>
  );
}
