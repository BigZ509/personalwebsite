# Agent instructions — Interactive Portfolio

## Mission
Build a **cinematic 3D desk / workbench hub**, similar to a solo-player game menu. Objects are portals: robot (robotics), basketball (about/personal), camera (photography/creative), and microchip or another development object (software/projects). Each supports idle, hover/focus, selection with camera approach, its own mini world, and return to the desk. Preserve accessible semantic content/navigation alongside the experience.

**Latest authority — D-018:** Cinematic (02) with Cozy (01) warmth is approved. Implement only the robot hover reaction/highlight, camera approach, small Robotics workshop and Back to Desk restoring the actual invoking camera pose. Preserve the existing room/assets and one Canvas. Keyboard/touch/reduced motion and browser evidence are required. Other worlds and full portfolio remain unauthorized. Earlier freezes/review gates below are historical where conflicting.

**Latest authority — 2026-11-01:** The user's hub-world pivot supersedes the editorial specimen/card direction. Open-source-first reuse remains required. Current task is research/planning only: read `research/hub-world/README.md` and D-012 before older proposals. Do not resume the prior prototype, redesign a static landing page, generate models, install dependencies or implement the hub without new authorization.

**Setup exception — D-014/D-015:** User authorizes installing the requested skills, creating the project hub skill, updating instructions/memory and preparing the three-game visual moodboard. This authorizes tooling/reference work only, not app dependency changes, application builds or implementation.

**Current authority — D-016:** User now authorizes three real 3D compositions of one populated desk hub (cozy, cinematic, stylized-game), with robot, basketball, camera, chip, monitor and warm lamp. Adapt existing licensed assets, build the bounded study and capture actual browser screenshots for approval. Keep the simple desk provisional. No new moodboards/research surveys, generated models/images, webpage redesign, full portfolio or mini-world implementation in this pass.

**Current stop — D-020:** Finish review handoff and wait. No new features, room redesign, next object, GitHub repository, commit or deployment. Earlier repository authority is revoked.

**Version-control exception — D-021:** User now authorizes repository creation, commit and push of the working robot concept to `BigZ509/personalwebsite`. Keep application implementation stopped and do not deploy. This supersedes D-020 only for those Git actions.

**Checkpoint — D-018 delivered:** `/` and `/hub/` show the approved robot/workshop round trip. Read `docs/ROBOT_WORKSHOP_REVIEW.md` and `output/playwright/robot-journey/` for actual evidence/limits. `/compositions/` retains the archived three treatments. Stop for user review before any other world or full portfolio work.

## Mandatory context-loading sequence (every new agent / session)
1. Read `UPDATE.md` for the latest lead-owned project snapshot.
2. Read `docs/PROJECT_BRIEF.md` for product intent and non-negotiables.
3. Read `docs/TASKS.md` for your assignment and scope.
4. Read `docs/DECISIONS.md` to avoid reopening settled questions.
5. Read your own `updates/<agent-id>.md`, `handoffs/<agent-id>.md`, and `research/<agent-id>.md` if present.
6. Check current repository state (`git status`, recent commits) before changing code or shared files.

If assigned agent names differ, use the lead-assigned ID consistently throughout the repo.

## Required skills — load when relevant

| Work | Required skill |
| --- | --- |
| Hub planning, scene composition, asset integration, camera/world transitions or visual review | [portfolio-3d-hub](../.agents/skills/portfolio-3d-hub/SKILL.md) |
| Scene/HUD appearance, composition or visual polish | [frontend-design](/Users/bigz/.codex/skills/frontend-design/SKILL.md), interpreted within the hub brief; do not turn its typography/layout guidance into a static landing-page redesign |
| React/Next component changes, loading or performance review | [vercel-react-best-practices](/Users/bigz/.codex/skills/vercel-react-best-practices/SKILL.md), the canonical name of the requested react-best-practices source; apply only rules compatible with static export |
| Browser interaction or visual validation | [playwright](/Users/bigz/.codex/skills/playwright/SKILL.md); use the provided browser-control tool if environment policy requires it. Existing project test tooling may be used for explicitly authorized test work |

Do not load every installed skill for every task. A skill is guidance, never permission to implement, expand scope or deploy. If a required skill cannot be loaded, report the exact missing path and continue independent authorized work; do not pretend it was used. Installation/provenance and current tool checks: [skill audit](docs/SKILL_AUDIT.md).

## Visual references and proof of interaction

- Read [the visual moodboard and comparison](research/hub-world/VISUAL_REFERENCES.md): The Room: Old Sins attic dollhouse for object/world transitions; Stray's Clementine apartment for atmosphere; Life Is Strange's Max dorm desk for warmth and personal storytelling. These are the user's proposed references, not personal-play-history claims. Record any later swaps.
- For authorized visual scene work, compare real browser screenshots of the actual build against these reference images. Name the reference, match viewpoints where practical and record differences in framing, lighting, warmth, prop density, meaningful storytelling and portal discoverability. Correct or disclose gaps before calling a visual milestone complete. Upstream previews and old editorial prototype screenshots are not hub implementation evidence.
- Reference screenshots remain research-only. Reuse license-cleared production models, textures, animations and code; never extract proprietary game assets or assume screenshots grant asset reuse rights.
- **Never claim a 3D interaction works until that exact interaction has actually been tested in a browser with visible 3D rendering.** Exercise the relevant pointer/keyboard/touch path and observe the intended reaction, camera travel, world entry or return. A build pass, DOM change, blank canvas or source inspection is not proof. Still images alone do not prove animation.
- Record browser/OS/viewport, renderer type, action/result and screenshot/video/trace evidence. Mark paths Pass, Fail or Not tested, with WebGL failures reported as blocked for 3D verification. Software rendering/emulation is not physical-device coverage; identify untested devices. Follow the hub skill's browser-QA reference for scoped checks.

## Agent IDs and writing ownership
- `lead`: owns `UPDATE.md`, `docs/TASKS.md`, `docs/DECISIONS.md`, `docs/RESEARCH_INDEX.md`, and `handoffs/lead.md`.
- `design`: owns `updates/design.md`, `research/design.md`, `handoffs/design.md`.
- `assets`: owns `updates/assets.md`, `research/assets.md`, `handoffs/assets.md`.
- `architecture`: owns `updates/architecture.md`, `research/architecture.md`, `handoffs/architecture.md`.
- `performance`: owns `updates/performance.md`, `research/performance.md`, `handoffs/performance.md`.

**Do not write another agent's owned files.** Researchers send decisions or task changes to the lead via their own handoff/update files or direct agent messages. The lead synthesizes them into shared docs.

## Research before implementation
- Do not start a full website implementation until the research synthesis and a visual direction are approved.
- Seek genuine live demos, open-source repositories, license terms, performance data, and implementation examples.
- Cite URLs directly next to claims. Mark unverified statements as unverified; do not fabricate sources or license grants.
- Each researcher should produce at least 5 meaningful findings and aim for 3 working demos/repos, clearly noting when fewer can be verified.
- Compare alternatives and tradeoffs; do not merely collect links.

## Continuous progress / handoff rules
- At the start of an assignment, mark your `updates/<agent-id>.md` as **In progress** with your objective and plan.
- At every *meaningful milestone* (source batch checked, major finding, blocker, experiment result), append a short update to **your** update file: UTC timestamp, completed, evidence/links, changed files, blockers, next action.
- Before pausing, ending, or running out of context, refresh your `handoffs/<agent-id>.md` with exact continuation steps and the current checkpoint. Update `updates/<agent-id>.md` status (`Blocked`, `Ready for review`, or `Done`).
- Lead agent: after reviewing new research or integrating a checkpoint, update `UPDATE.md`; synchronize task statuses in `docs/TASKS.md`; write durable decisions to `docs/DECISIONS.md`.
- Do not delete prior decision history or completed update entries. Correct errors with a dated correction note.
- Never claim that tests, links, licenses, or tools were verified unless you actually checked them.

## Engineering rules (when implementation is approved)
- Keep object animation modules separate from semantic project content. Keyboard, touch, and reduced-motion paths must reach every destination.
- Avoid replacing readable project case studies with animations. Direct URLs should work and be shareable.
- Prefer reusable React/TypeScript components and small documented animation interfaces.
- Before making a dependency choice, verify compatibility and document reason in `research/architecture.md`.
- Before editing overlapping code, coordinate file ownership or use isolated Git worktrees/branches.
- Run relevant lint/build/tests when available and record the exact commands + results in handoff.

## End-of-session response
Report: (1) result, (2) files changed, (3) verification performed, (4) unresolved blockers, (5) precise next step. No vague claims of completion.
