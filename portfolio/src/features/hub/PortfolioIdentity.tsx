"use client";

import { useRef } from "react";
import { profile } from "./profile";
import styles from "./identity.module.css";

function ResumeActions() {
  return <div className={styles.resumeActions}>
    <a href={profile.resume} target="_blank" rel="noopener noreferrer">View Resume<span className={styles.srOnly}> (PDF, opens in a new tab)</span></a>
    <a href={profile.resume} download="Marc-Alexis-Resume.pdf">Download PDF</a>
  </div>;
}

export default function PortfolioIdentity({ resumeAvailable = false }: { resumeAvailable?: boolean }) {
  const about = useRef<HTMLDialogElement>(null);
  const resume = useRef<HTMLDialogElement>(null);

  return <>
    <header className={styles.header}>
      <strong className={styles.name}>MARC ALEXIS</strong>
      <nav aria-label="Personal navigation">
        <button type="button" aria-haspopup="dialog" aria-controls="about-marc" onClick={() => about.current?.showModal()}>About</button>
        <button type="button" aria-haspopup="dialog" aria-controls="marc-resume" onClick={() => resume.current?.showModal()} aria-describedby={resumeAvailable ? undefined : "resume-availability"}>Resume</button>
        <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub<span className={styles.srOnly}> (opens in a new tab)</span></a>
      </nav>
      {!resumeAvailable && <span id="resume-availability" className={styles.srOnly}>Resume not available yet.</span>}
    </header>

    {/* Native modal semantics contain focus and restore it to the invoking nav
        control. Stop Escape before the workshop's global shortcut sees it. */}
    <dialog id="about-marc" ref={about} className={styles.dialog} aria-labelledby="about-marc-title" onKeyDown={event => { if (event.key === "Escape") event.stopPropagation(); }}>
      <div className={styles.dialogHeading}><div><span className={styles.aboutLabel}>About</span><h2 id="about-marc-title">Marc Alexis</h2></div><button type="button" onClick={() => about.current?.close()}>Close</button></div>
      <p className={styles.aboutRole}>Computer science student.<br />Robotics minor.</p>
      <p>I’m Marc, a computer science student at the University of Central Florida pursuing a minor in Intelligent Robotic Systems. I like building practical software, experimenting with computer vision and robotics, and figuring out how systems work from the inside out.</p>
      <p>Outside of programming, I enjoy photography and basketball.</p>
      {resumeAvailable && <ResumeActions />}
      <div className={styles.dialogLinks}><a href={profile.github} target="_blank" rel="noopener noreferrer">Find me on GitHub<span className={styles.srOnly}> (opens in a new tab)</span></a>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </div>
    </dialog>

    <dialog id="marc-resume" ref={resume} className={styles.dialog} aria-labelledby="resume-title" onKeyDown={event => { if (event.key === "Escape") event.stopPropagation(); }}>
      <div className={styles.dialogHeading}><h2 id="resume-title">Resume</h2><button type="button" onClick={() => resume.current?.close()}>Close</button></div>
      {resumeAvailable ? <>
        <p>View or download my current resume.</p>
        <p className={styles.context}>Marc Alexis · Computer Science · Robotics minor</p>
        <ResumeActions />
      </> : <>
        <p>My resume isn’t available here yet.</p>
        <p className={styles.context}>You can explore my projects in the robotics workshop or visit my GitHub profile.</p>
        <a href={profile.github} target="_blank" rel="noopener noreferrer">Visit GitHub<span className={styles.srOnly}> (opens in a new tab)</span></a>
      </>}
    </dialog>
  </>;
}
