"use client";
import { useEffect, useRef } from 'react';
import { softwareProjects, type SoftwareProject, type SoftwareProjectId } from './softwareProjects';
import ProjectPreview from './ProjectPreview';
import DemoVideo from './DemoVideo';
import styles from './hub.module.css';

export default function SoftwareDetails({ project, onClose, onSelect }: { project: SoftwareProject; onClose: () => void; onSelect: (id: SoftwareProjectId) => void }) {
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => { close.current?.focus({ preventScroll: true }); }, [project.id]);
  return <aside className={styles.projectPanel} role="dialog" aria-modal="false" aria-labelledby="software-title" aria-describedby="software-summary">
    <div className={styles.panelHeader}><div><span className={styles.panelLocation}>Software / engineering notes</span><h2 id="software-title">{project.name}</h2></div><button ref={close} className={styles.panelClose} onClick={onClose} aria-label="Close project details">Close ×</button></div>
    <nav className={styles.panelTabs} aria-label="Software project details">{softwareProjects.map(item => <button key={item.id} onClick={() => onSelect(item.id)} aria-current={project.id === item.id ? 'true' : undefined}>{item.name}</button>)}</nav>
    <div key={project.id} className={styles.panelBody} role="region" tabIndex={0} aria-label={`${project.name} details`}>
      <p className={styles.projectState}>{project.focus}<span>Interface concept</span></p><ProjectPreview project={project} /><p id="software-summary" className={styles.projectSummary}>{project.summary}</p>
      <section className={styles.projectSection}><h3>Technologies</h3><p>{project.technologies.join(' · ')}</p></section>
      <section className={styles.projectSection}><h3>My engineering contributions</h3><ul>{project.contributions.map(text => <li key={text}>{text}</li>)}</ul></section>
      <section className={styles.projectSection}><h3>Technical challenge</h3><p>{project.challenge}</p></section>
      <section className={styles.projectSection}><h3>Reported outcomes</h3><ul>{project.outcomes.map(text => <li key={text}>{text}</li>)}</ul><p className={styles.missingContent}>Results from my supplied resume; not remeasured for this portfolio.</p></section>
      <section className={styles.projectSection}><h3>Demo</h3>{project.demo ? <DemoVideo key={project.id} title={project.name} {...project.demo} /> : <p className={styles.missingContent}>Demo link not provided yet.</p>}</section>
      <section className={styles.projectSection}><h3>GitHub</h3>{project.github ? <a className={styles.projectLink} href={project.github} target="_blank" rel="noopener noreferrer">View repository ↗<span className={styles.srOnly}> (opens in a new tab)</span></a> : <p className={styles.missingContent}>Repository link not provided yet.</p>}</section>
    </div>
  </aside>;
}
