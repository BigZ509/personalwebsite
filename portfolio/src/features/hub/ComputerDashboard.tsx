"use client";
import { useEffect, useRef } from 'react';
import { profile } from './profile';
import { softwareProjects, type SoftwareProjectId } from './softwareProjects';
import ProjectPreview from './ProjectPreview';
import styles from './computer-dashboard.module.css';

const descriptions = {
  speaklab: 'AI-assisted speech coaching and communication analysis.',
  'road-report': 'Road incident reporting and intelligent classification.',
  zbxp: 'Gamified productivity, task management, and focus sessions.',
};

export default function ComputerDashboard({ onClose, onNavigate, resumeAvailable }: {
  onClose: () => void;
  onNavigate: (world: 'software' | 'workshop', project?: SoftwareProjectId) => void;
  resumeAvailable: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { const element = dialog.current; element?.showModal(); return () => element?.close(); }, []);
  const about = () => {
    const existing = document.getElementById('about-marc');
    if (existing instanceof HTMLDialogElement && !existing.open) existing.showModal();
  };
  return <dialog ref={dialog} className={styles.dashboard} aria-labelledby="computer-title" onCancel={event => { event.preventDefault(); onClose(); }} onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); onClose(); } }}>
    <header className={styles.windowBar}>
      <span className={styles.windowLabel}><span aria-hidden="true" className={styles.windowSignal} />WORKROOM <span>/</span> PORTFOLIO</span>
      <button autoFocus className={styles.close} onClick={onClose} aria-label="Close portfolio dashboard">Back to desk <span aria-hidden="true">×</span></button>
    </header>
    <div className={styles.desktop}>
      <nav className={styles.sidebar} aria-label="Computer shortcuts">
        <div className={styles.workspace}><span aria-hidden="true">M</span><div>Marc’s workspace<small>Explore the work</small></div></div>
        <p>SHORTCUTS</p>
        {resumeAvailable && <a href={profile.resume} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">↗</span>Resume PDF<span className={styles.srOnly}> (opens in a new tab)</span></a>}
        <button onClick={() => onNavigate('software')}><span aria-hidden="true">⌘</span>Software</button>
        <button onClick={() => onNavigate('workshop')}><span aria-hidden="true">⚙</span>Robotics</button>
        <button disabled aria-describedby="photography-status"><span aria-hidden="true">◉</span>Photography<small id="photography-status">In progress</small></button>
        <button onClick={about}><span aria-hidden="true">↗</span>About / Contact</button>
        <a className={styles.github} href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗<span className={styles.srOnly}> (opens in a new tab)</span></a>
      </nav>
      <div className={styles.content}>
        <section className={styles.intro}>
          <p className={styles.eyebrow}>A SMALL WINDOW INTO MY WORK</p>
          <h1 id="computer-title">Marc Alexis<span aria-hidden="true">.</span></h1>
          <p className={styles.role}>Software Engineering <span>|</span> Robotics <span>|</span> Creative Technology</p>
          <p className={styles.description}>I build software, intelligent systems, and interactive experiences that connect technology with real-world problems.</p>
        </section>
        <section aria-labelledby="featured-projects">
          <div className={styles.sectionHeading}><h2 id="featured-projects">Featured projects</h2><span>03 / SELECT TO EXPLORE</span></div>
          <div className={styles.projects}>{softwareProjects.map(project => <button key={project.id} className={styles.project} onClick={() => onNavigate('software', project.id)} aria-label={`Open ${project.name} project details`}>
            <ProjectPreview project={project} />
            <span className={styles.projectText}><strong>{project.name}<span aria-hidden="true">↗</span></strong><span>{descriptions[project.id]}</span><small>Explore project</small></span>
          </button>)}</div>
        </section>
        <footer className={styles.desktopFooter}><span><span aria-hidden="true">●</span> Built to explore. Made to be useful.</span><a href={`mailto:${profile.email}`}>{profile.email}</a></footer>
      </div>
    </div>
  </dialog>;
}
