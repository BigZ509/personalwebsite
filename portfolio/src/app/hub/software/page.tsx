import styles from '@/features/hub/hub.module.css';
import { softwareProjects } from '@/features/hub/softwareProjects';
import { profile } from '@/features/hub/profile';
export const metadata = { title: 'Software Engineering — Project notes' };
export default function SoftwareNotes() {
  return <main className={styles.notesPage}><a href="/hub/">← Return to the workroom</a><article>
    <p>{profile.name} · Software Engineering</p><h1>Software projects.</h1>
    <p>Select the monitor in the workroom to enter the software workspace. These notes are also available without WebGL or JavaScript.</p>
    {softwareProjects.map(project => <section key={project.id} id={project.id}>
      <h2>{project.name}</h2><p>{project.summary}</p><p>{project.technologies.join(' · ')}</p>
      <h3>My engineering contributions</h3><ul>{project.contributions.map(text => <li key={text}>{text}</li>)}</ul>
      <h3>Technical challenge</h3><p>{project.challenge}</p><h3>Reported outcomes</h3><ul>{project.outcomes.map(text => <li key={text}>{text}</li>)}</ul>
      <p>Results from my supplied resume; not remeasured for this portfolio.</p>
      {project.github ? <a href={project.github} target="_blank" rel="noopener noreferrer">{project.name} on GitHub ↗</a> : <p>Repository link not provided yet.</p>}
      {project.demo ? <p><a href={project.demo.url} target="_blank" rel="noopener noreferrer">Watch {project.name} on YouTube ↗</a></p> : <p>Demo link not provided yet.</p>}
    </section>)}
    <h2>Resume and contact</h2><a href={profile.resume} target="_blank" rel="noopener noreferrer">View Resume (PDF) ↗</a><br /><a href={profile.resume} download="Marc-Alexis-Resume.pdf">Download PDF</a><br /><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub profile ↗</a><br /><a href={`mailto:${profile.email}`}>{profile.email}</a>
  </article></main>;
}
