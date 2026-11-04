import HubExperience from "@/features/hub/HubExperience";
import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
export const metadata = { title: "Marc Alexis — Interactive portfolio", description: "I'm Marc, a computer science student and aspiring software engineer. I build software, experiment with robotics, and explore creativity through technology." };
export default function HubPage() {
  // Evaluated during static export. One replacement file enables both links.
  const resume = join(process.cwd(), "public/resume/marc-alexis-resume.pdf");
  const resumeAvailable = existsSync(resume) && statSync(resume).isFile() && statSync(resume).size > 0;
  return <HubExperience resumeAvailable={resumeAvailable} />;
}
