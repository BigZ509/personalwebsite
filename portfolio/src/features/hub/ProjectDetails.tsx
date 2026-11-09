"use client";

import { useEffect, useRef, useState } from "react";
import { exhibits, type Exhibit, type ExhibitId } from "./exhibits";
import { getProjectCaseStudy } from "../projects/projectData";
import ProjectExhibit from "../projects/ProjectExhibit";
import styles from "./hub.module.css";

export default function ProjectDetails({
  project,
  expanded,
  onExpandedChange,
  onClose,
  onSelect,
}: {
  project: Exhibit;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  onClose: () => void;
  onSelect: (id: ExhibitId) => void;
}) {
  const panel = useRef<HTMLDialogElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const compact = useRef<HTMLButtonElement>(null);
  const expand = useRef<HTMLButtonElement>(null);
  const wasExpanded = useRef(false);
  const caseStudy = project.id === "guiding-hands" ? getProjectCaseStudy("guiding-hands") : undefined;

  useEffect(() => {
    const element = panel.current;
    if (!element) return;
    const shouldBeModal = expanded;
    if (!element.open) {
      if (shouldBeModal) element.showModal();
      else element.show();
    } else if (element.matches(":modal") !== shouldBeModal) {
      element.close();
      if (shouldBeModal) element.showModal();
      else element.show();
    }
  }, [expanded]);

  useEffect(() => {
    if (expanded) compact.current?.focus({ preventScroll: true });
    else if (wasExpanded.current) (expand.current ?? close.current)?.focus({ preventScroll: true });
    else close.current?.focus({ preventScroll: true });
    wasExpanded.current = expanded;
  }, [expanded, project.id]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented || !panel.current?.open) return;
      event.preventDefault();
      if (expanded) onExpandedChange(false);
      else onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [expanded, onExpandedChange, onClose]);

  useEffect(() => () => { if (panel.current?.open) panel.current.close(); }, []);

  return <dialog
    ref={panel}
    className={styles.projectPanel}
    data-expanded={expanded}
    aria-modal={expanded}
    aria-labelledby="project-title"
    onCancel={(event) => {
      event.preventDefault();
      if (expanded) onExpandedChange(false);
      else onClose();
    }}
    onKeyDown={(event) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      if (expanded) onExpandedChange(false);
      else onClose();
    }}
    onClick={(event) => {
      if (event.target === event.currentTarget) {
        if (expanded) onExpandedChange(false);
        else onClose();
      }
    }}
  >
    <div className={styles.panelHeader}>
      <div>
        <span className={styles.panelLocation}>{expanded ? "Robotics / exhibit" : "Robotics / selected project"}</span>
        <h2 id="project-title">{project.name}</h2>
      </div>
      <div className={styles.panelActions}>
        {expanded && <button ref={compact} className={styles.panelBack} onClick={() => onExpandedChange(false)}>← Back to overview</button>}
        <button ref={close} className={styles.panelClose} onClick={onClose} aria-label="Close project details">Close <span aria-hidden="true">×</span></button>
      </div>
    </div>
    <nav className={styles.panelTabs} aria-label="Project details">
      {exhibits.map(item => <button key={item.id} onClick={() => onSelect(item.id)} aria-current={item.id === project.id ? "true" : undefined}>{item.name}</button>)}
    </nav>
    <div key={project.id} className={styles.panelBody} tabIndex={-1} role="region" aria-label={`${project.name} details`}>
      {caseStudy ? (
        <>
          {!expanded && <button ref={expand} className={`${styles.projectLink} ${styles.projectExplore}`} onClick={() => onExpandedChange(true)}>Explore the build <span aria-hidden="true">↗</span></button>}
          <ProjectExhibit project={caseStudy} expanded={expanded} representationNote={project.representationNote} contextSource={project.source} />
        </>
      ) : (
        <>
          <p className={styles.projectState}>{project.status}<span>{project.representation}</span></p>
          {project.representationNote && <p className={styles.representationNote}>{project.representationNote}</p>}
          <p className={styles.projectSummary}>{project.summary}</p>
          <section aria-label="Demo video" className={styles.projectSection}>
            <h3>Demo video</h3>
            {project.video ? <ProjectVideo key={project.id} video={project.video} /> : <div className={styles.missingVideo}><span aria-hidden="true">▷</span><p>No verified demo video is available.</p></div>}
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
        </>
      )}
    </div>
  </dialog>;
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
