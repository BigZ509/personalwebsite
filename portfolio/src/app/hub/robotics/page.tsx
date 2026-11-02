import styles from "@/features/hub/hub.module.css";
export const metadata = { title: "Robotics workshop — Notes" };
export default function RoboticsNotes() {
  return <main className={styles.notesPage}><a href="/hub/">← Back to the desk</a><article><p>Robotics / workshop notes</p><h1>Things that move.</h1><p>This workshop is a small interaction prototype: a robot greets you at the desk, then invites you into its own workbench.</p><p>Robotics projects, build notes and demonstrations will be added after the experience is reviewed. No project results are claimed here yet.</p><p>You can read these notes without WebGL, motion or JavaScript.</p><a href="/licenses/RobotExpressive.md">Robot model and animation credits</a><br /><a href="/licenses/desk-compositions/ATTRIBUTION.md">Room asset credits</a></article></main>;
}
