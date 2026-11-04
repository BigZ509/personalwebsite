"use client";

import { useRef } from "react";
import styles from "./identity.module.css";

// Verified against the repository's origin and the user's confirmed account.
const githubProfile = "https://github.com/BigZ509";
const resumePath = "/resume/marc-alexis-resume.pdf";

export default function PortfolioIdentity({ resumeAvailable = false }: { resumeAvailable?: boolean }) {
  const about = useRef<HTMLDialogElement>(null);
  const resume = useRef<HTMLDialogElement>(null);

  return <>
    <header className={styles.header}>
      <strong className={styles.name}>MARC ALEXIS</strong>
      <nav aria-label="Personal navigation">
        <button type="button" aria-haspopup="dialog" aria-controls="about-marc" onClick={() => about.current?.showModal()}>About</button>
        {resumeAvailable ? <a href={resumePath} target="_blank" rel="noopener noreferrer">Resume<span className={styles.srOnly}> (view PDF in a new tab)</span></a> : <button type="button" aria-haspopup="dialog" aria-controls="marc-resume" onClick={() => resume.current?.showModal()} aria-describedby="resume-availability">Resume</button>}
        <a href={githubProfile} target="_blank" rel="noopener noreferrer">GitHub<span className={styles.srOnly}> (opens in a new tab)</span></a>
      </nav>
      {!resumeAvailable && <span id="resume-availability" className={styles.srOnly}>Resume not available yet.</span>}
    </header>

    {/* Native modal semantics contain focus and restore it to the invoking nav
        control. Stop Escape before the workshop's global shortcut sees it. */}
    <dialog id="about-marc" ref={about} className={styles.dialog} aria-labelledby="about-marc-title" onKeyDown={event => { if (event.key === "Escape") event.stopPropagation(); }}>
      <div className={styles.dialogHeading}><div><span className={styles.aboutLabel}>About</span><h2 id="about-marc-title">Marc Alexis</h2></div><button type="button" onClick={() => about.current?.close()}>Close</button></div>
      <p className={styles.aboutRole}>Computer science student.<br />Aspiring software engineer.</p>
      <p>I build software and experiment with robotics. I’m also into photography and basketball.</p>
      <div className={styles.dialogLinks}><a href={githubProfile} target="_blank" rel="noopener noreferrer">Find me on GitHub<span className={styles.srOnly}> (opens in a new tab)</span></a>
        {resumeAvailable && <a href={resumePath} download="Marc-Alexis-Resume.pdf">Download resume (PDF)</a>}
      </div>
    </dialog>

    <dialog id="marc-resume" ref={resume} className={styles.dialog} aria-labelledby="resume-title" onKeyDown={event => { if (event.key === "Escape") event.stopPropagation(); }}>
      <div className={styles.dialogHeading}><h2 id="resume-title">Resume</h2><button type="button" onClick={() => resume.current?.close()}>Close</button></div>
      <p>My resume isn’t available here yet.</p>
      <p className={styles.context}>You can explore my projects in the robotics workshop or visit my GitHub profile.</p>
      <a href={githubProfile} target="_blank" rel="noopener noreferrer">Visit GitHub<span className={styles.srOnly}> (opens in a new tab)</span></a>
    </dialog>
  </>;
}
