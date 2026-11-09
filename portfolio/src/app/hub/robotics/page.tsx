import styles from "@/features/hub/hub.module.css";
import { exhibits } from "@/features/hub/exhibits";
import { profile } from "@/features/hub/profile";
export const metadata = { title: "Robotics workshop — Notes" };
export default function RoboticsNotes() {
  return <main className={styles.notesPage}><a href="/hub/">← Return to the workroom</a><article>
    <p>{profile.name} · Robotics</p><h1>Robotics projects.</h1>
    <p>I’m a computer science student at UCF with a robotics minor. Select the robot at the desk to enter the workshop, then choose either exhibit to open its project notes.</p>
    <p>You can also read the current summaries here without WebGL, motion or JavaScript.</p>
    {exhibits.map(project => <section key={project.id}>
      <h2>{project.name}</h2><p>{project.summary}</p>
      <p>{project.representation}. Demo video unavailable.</p>
      {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">{project.name} on GitHub<span className={styles.srOnly}> (opens in a new tab)</span></a>}
    </section>)}
    <h2>Resume and contact</h2>
    <a href={profile.resume} target="_blank" rel="noopener noreferrer">View Resume<span className={styles.srOnly}> (PDF, opens in a new tab)</span></a><br />
    <a href={profile.resume} download="Marc-Alexis-Resume.pdf">Download PDF</a><br />
    <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub profile<span className={styles.srOnly}> (opens in a new tab)</span></a><br />
    <a href={`mailto:${profile.email}`}>{profile.email}</a>
    <h2>Asset credits</h2>
    <a href="/licenses/RobotExpressive.md">Robot model and animation credits</a><br /><a href="/licenses/desk-compositions/ATTRIBUTION.md">Room asset credits</a>
  </article></main>;
}
