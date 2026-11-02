# Interactive Portfolio — Agent Workspace

A persistent Markdown memory and research workspace for a Codex multi-agent team.

## Current checkpoint — 2026-11-02

**Robot workshop ready for review (D-018).** [Open the approved warm Cinematic hub](http://127.0.0.1:4182/) or `/hub/`. Hover the robot for its authored Wave/highlight, select it to enter a small Robotics workshop, then use Back to Desk/Escape to restore your actual view. The room/assets are preserved; other three worlds remain unimplemented.

[Review/checklist/component architecture](docs/ROBOT_WORKSHOP_REVIEW.md) · [Desk](output/playwright/robot-journey/01-desk.png) · [Workshop](output/playwright/robot-journey/04-workshop.png) · [Credits](public/licenses/desk-compositions/ATTRIBUTION.md). Build/export, eight unit tests and scoped actual-browser paths passed; see precise software-rendering/device limits. [Working robot concept published to GitHub](https://github.com/BigZ509/personalwebsite) under D-021; main tracks origin/main. User approved existing Keploy integration. D-020 website review stop remains; no deployment.

### Archived composition checkpoint — 2026-11-01

**Three actual 3D composition studies are ready for approval.** Open the running [composition study](http://127.0.0.1:4182/compositions/) or inspect [Cozy](output/playwright/compositions/cozy.png), [Cinematic](output/playwright/compositions/cinematic.png) and [Stylized game](output/playwright/compositions/stylized-game.png). These are actual browser-rendered R3F scenes, not generated images. All four category objects share one furnished work corner. Desk is provisional; mini worlds and full portfolio remain out of scope.

Build/static export and scoped browser controls passed. Captures use isolated Chrome with SwiftShader software rendering; physical devices/touch and hardware-GPU performance are untested. [Browser evidence](output/playwright/compositions/browser-evidence.json), [asset attribution](public/licenses/desk-compositions/ATTRIBUTION.md). Previous homepage/prototype files remain unchanged.

### Previous research/setup checkpoint — history

**Current vision: cinematic 3D desk/workbench hub with four object portals and returnable mini worlds. Research only.** Start with the [hub-world package](research/hub-world/README.md): desk/room candidates, object shortlist, reusable camera/interaction/portal implementations, architecture, scene graph and four build phases. The [existing source catalog](research/reusable-components/README.md) supplies the prior object/license/preview audits without repeating them.

The app/research root is this `portfolio/` directory. Earlier editorial research and the unfinished robot prototype remain historical memory, not the current experience direction. No Git repository has been initialized. Read `UPDATE.md`, D-012 and current handoff coordination notes; further development awaits source/architecture selection and explicit authorization.

## Quick start
1. Place **all the contents** of this folder at the root of your portfolio Git repository (so `AGENTS.md` lives next to `package.json` when that exists).
2. Open Codex from that repository root. Codex reads the root `AGENTS.md` automatically when starting a new session.
3. Use `START_HERE_PROMPT.md` as the initial lead-agent instruction.
4. Ask the lead to delegate four independent research scopes; every specialist has unique writable files.
5. When returning in a new Codex session, ask: **"Read AGENTS.md, UPDATE.md, docs/TASKS.md, docs/DECISIONS.md, and the applicable handoff; continue the highest-priority unblocked task."**

## What to read
| File | Purpose | Writer |
| --- | --- | --- |
| `AGENTS.md` | Persistent working rules, research, and handoffs | Human / approved lead changes |
| `UPDATE.md` | Compact, latest project snapshot | Lead only |
| `docs/PROJECT_BRIEF.md` | Product vision and constraints | Human / lead with approval |
| `docs/TASKS.md` | Task board, ownership, dependencies | Lead only |
| `docs/DECISIONS.md` | Decisions, rationale, alternatives | Lead only |
| `docs/RESEARCH_INDEX.md` | Links to confirmed research | Lead only |
| `updates/<agent>.md` | Milestone notes and running progress | Respective agent |
| `research/<agent>.md` | Evidence-based research | Respective agent |
| `handoffs/<agent>.md` | Exact state for a future agent/session | Respective agent |

## Workflow
**Agent starts → loads context → claims assigned scope → researches → logs milestones → writes handoff → lead reviews and updates snapshot.**

Avoid four agents editing the same `UPDATE.md`. Specialists write their own update files; only the lead merges and publishes the shared snapshot.

## Important
Markdown tracks progress; it does **not** create automatic background updates. Agents must actually be running and instructed to write the files, and all updates must be saved/committed to be available across machines or clean worktrees. Git commits are recommended at meaningful checkpoints.
