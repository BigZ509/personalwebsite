# Resume file

Objective2 repository search found **no resume PDF**. The UI therefore shows an unavailable explanation, and does not emit a PDF link or invent content.

Use exactly one file when Marc provides his confirmed current resume:

`portfolio/public/resume/marc-alexis-resume.pdf`

The public URL is `/resume/marc-alexis-resume.pdf`. The static server page checks for a nonempty regular file during `npm run build`, then enables:

- Header Resume: opens the PDF in a new tab, with an accessible PDF/new-tab label.
- About: “Download resume (PDF)” with a download filename.

Replace that same file for future updates and rebuild the static export. No code/config edits are needed. Removing it and rebuilding restores the unavailable explanation. View/download behavior with a real resume remains untested until the file is supplied; do not substitute a synthetic resume to make the link look complete.
