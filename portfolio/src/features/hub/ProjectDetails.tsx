"use client";

import { useEffect, useRef, useState } from "react";
import { exhibits, type Exhibit, type ExhibitId } from "./exhibits";
import styles from "./hub.module.css";

// Nonmodal: the room and the other exhibit controls remain available.
export default function ProjectDetails({ project, onClose, onSelect }: { project: Exhibit; onClose: () => void; onSelect: (id: ExhibitId) => void }) {
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => { close.current?.focus({ preventScroll: true }); }, [project.id]);
  return <aside className={styles.projectPanel} role="dialog" aria-modal="false" aria-labelledby="project-title" aria-describedby="project-summary">
    <div className={styles.panelHeader}>
      <div><span className={styles.panelLocation}>Robotics / project notes</span><h2 id="project-title">{project.name}</h2></div>
      <button ref={close} className={styles.panelClose} onClick={onClose} aria-label="Close project details">Close <span aria-hidden="true">×</span></button>
    </div>
    <nav className={styles.panelTabs} aria-label="Project details">
      {exhibits.map(item => <button key={item.id} onClick={() => onSelect(item.id)} aria-current={item.id === project.id ? "true" : undefined}>{item.name}</button>)}
    </nav>
    <div key={project.id} className={styles.panelBody} tabIndex={0} role="region" aria-label={`${project.name} details`}>
      <p className={styles.projectState}>{project.status}<span>{project.representation}</span></p>
      {project.representationNote && <p className={styles.representationNote}>{project.representationNote}</p>}
      <p id="project-summary" className={styles.projectSummary}>{project.summary}</p>
      <section aria-label="Demo video" className={styles.projectSection}>
        <h3>Demo video</h3>
        {project.video ? <ProjectVideo key={project.id} video={project.video} /> : <div className={styles.missingVideo}><span aria-hidden="true">▷</span><p>No demo video provided yet.</p></div>}
      </section>
      <section aria-label="Source code" className={styles.projectSection}>
        <h3>GitHub</h3>
        {project.github ? <a className={styles.projectLink} href={project.github} target="_blank" rel="noopener noreferrer">View repository <span aria-hidden="true">↗</span><span className={styles.srOnly}> (opens in a new tab)</span></a> : <p className={styles.missingContent}>Repository link not provided yet.</p>}
      </section>
      <section aria-label="Inspiration" className={styles.projectSection}>
        <h3>Inspiration{project.inspirationProvisional && <span className={styles.provisional}>Provisional description</span>}</h3>
        <p>{project.inspiration ?? "The inspiration behind this project has not been shared yet."}</p>
      </section>
      {project.source && <a className={styles.contentSource} href={project.source} target="_blank" rel="noopener noreferrer">Project context on GitHub<span className={styles.srOnly}> (opens in a new tab)</span></a>}
    </div>
  </aside>;
}

function ProjectVideo({ video }: { video: NonNullable<Exhibit["video"]> }) {
  const element = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const player = element.current;
    const pauseWhenHidden = () => { if (document.hidden) player?.pause(); };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      document.removeEventListener("visibilitychange", pauseWhenHidden);
      // Release the old stream on close/switch; never leave audio playing behind a new project.
      if (player) { player.pause(); player.removeAttribute("src"); player.load(); }
    };
  }, []);
  return <figure className={styles.projectVideo}>
    <video ref={element} controls playsInline preload="none" src={video.url} aria-label={video.title} onError={() => setFailed(true)} />
    <figcaption><strong>{video.title}</strong><span>{video.note}</span></figcaption>
    {failed && <p role="status">This recording couldn’t play here.</p>}
    <a href={video.source} target="_blank" rel="noopener noreferrer">{failed ? "Open the source recording" : "View video source"}<span className={styles.srOnly}> (opens in a new tab)</span></a>
  </figure>;
}
