# Decision log — lead-owned, append-only

## D-017 — Requested GitHub repository; creation pending
- User authorized repository `personalwebsite` and push. Workspace Git initialized; no initial commit, remote or push yet.
- Prepared `BigZ509/personalwebsite` as private in GitHub UI. Create action was not executed: automatic approval review could not run because of a usage limit. Do not bypass that rejection via another API. Local implementation is independently authorized.

## D-018 — Approved warm Cinematic; robot workshop round trip only
- User approves 02 Cinematic with the warmth of 01 Cozy. Preserve furnished room and existing licensed models; archived composition studies remain available.
- Authorizes robot hover/focus authored reaction and highlight, camera approach, one small Robotics workshop, Back restoring the actual invoking camera pose; keyboard/touch/reduced-motion equivalents and real-browser screenshots/tests required.
- Use existing Next static export/R3F/Drei, one Canvas and one CameraControls camera writer. Reuse RobotExpressive clips and source props; no new dependencies or generated models required.
- No other three worlds, full portfolio, room replacement or new moodboards. Stop after bounded flow and report browser-tested versus unverified paths.

## D-001 — Hybrid editorial + selective 3D (provisional direction)
- **Status:** Working design constraint; can be revised with explicit approval
- **Reason:** Interactions create a distinctive first impression, but readable project case studies, easy navigation, and performance remain primary.
- **Alternatives:** Entire 3D room/workbench; standard flat card grid.
- **Outcome:** Research selective 3D objects embedded in a high-quality 2D composition first.
- **Source:** Project brief, based on earlier design discussion.

## D-002 — Research-first workflow
- **Status:** Accepted workflow for this research pass
- **Reason:** Prevent unresearched stack choices, unlicensed assets, and expensive rework.
- **Outcome:** No full implementation until synthesis, art direction, and prototype scope receive approval.

## Template — add new decisions below
### D-XXX — Short title
- **Date (UTC):** YYYY-MM-DD
- **Status:** Proposed / Accepted / Superseded
- **Context:**
- **Options considered:**
- **Decision:**
- **Evidence:** URLs, prototype results, file references
- **Consequences / revisit trigger:**

### D-003 — Separate research sign-off, prototype authorization, and full implementation
- **Date (UTC):** 2026-11-01
- **Status:** Accepted workflow; no implementation approval granted
- **Context:** User requested completed parallel research and planning followed by a stop. The brief also requires review of a single robot prototype before expansion.
- **Options considered:** Treat approving research as approval for the whole site; keep explicit stage gates.
- **Decision:** Finish and verify Markdown deliverables now. Ask for visual direction and architecture approval with a concrete robot scope. Only an explicit later instruction may authorize that prototype. Full implementation follows prototype review and its own approval.
- **Evidence:** User request; `docs/PROJECT_BRIEF.md` approval gates; `docs/ROBOT_PROTOTYPE_PLAN.md`.
- **Consequences / revisit trigger:** No scaffolding, package installation, website code, or deployment during this pass. A request to revise the proposal continues research/planning only unless implementation is explicitly authorized.

### D-004 — Evidence levels and asset rights remain explicit
- **Date (UTC):** 2026-11-01
- **Status:** Accepted research protocol
- **Context:** Documentation, source manifests, screenshots, binaries, runtime tests, and field measurements establish different facts. A repository's code license does not automatically cover bundled models.
- **Options considered:** General “verified” labels; record exactly what was inspected.
- **Decision:** Cite sources next to findings, distinguish fetched/visually observed/measured evidence, record unavailable sources, and require model-level license provenance before reuse. Numeric budgets remain proposals until measured.
- **Evidence:** User research standards; `AGENTS.md`; lead source audit in `docs/RESEARCH_INDEX.md`.
- **Consequences / revisit trigger:** Research can be signed off with disclosed uncertainties; model selection, runtime compatibility, device performance, and conformance require later verification appropriate to the claim.

### D-005 — Static content with a homepage-only 3D enhancement
- **Date (UTC):** 2026-11-01
- **Status:** Proposed; user approval pending
- **Context:** Independent case studies, no-JS links, mobile fallback and independently maintained object modules are required by the brief.
- **Options considered:** Next static export; Vite + React Router Framework Mode with explicit prerendering; plain Vite SPA.
- **Decision:** Lead recommends Next App Router + TypeScript + stable React 19/Fiber 9 + compatible Drei/Three, one lazy homepage canvas, semantic build-time routes, minimal motion dependencies. Exact versions remain unselected and untested.
- **Evidence:** `research/architecture.md`; [Next static exports](https://nextjs.org/docs/app/guides/static-exports); [R3F introduction](https://r3f.docs.pmnd.rs/getting-started/introduction); lead source spot-checks in `docs/RESEARCH_INDEX.md`.
- **Consequences / revisit trigger:** Requires export-compatible images, host deep-link/404 checks, fresh published peer/engine checks, a dependency lock and actual build verification after approval. Choose Vite/prerender instead if team familiarity justifies its explicit rendering setup; no measured speed ranking exists.

### D-006 — Native navigation with cancellable visual feedback
- **Date (UTC):** 2026-11-01
- **Status:** Proposed implementation contract; semantic access is already required by brief
- **Context:** Robot walking/ball shot/shutter/boot concepts must coexist with immediate usable routes and keyboard/touch paths.
- **Options considered:** Route after animation completion; normal links with independent optional visual accents.
- **Decision:** Recommend real DOM anchors/posters; routing never awaits animation or asset readiness. Object modules own presentation only, with cancellation and cleanup. Prefer finite idles; do not add both GSAP and Motion by default.
- **Evidence:** `research/architecture.md` navigation/cancellation contract; `research/performance.md` fallback/motion findings; [Next Link](https://nextjs.org/docs/app/api-reference/components/link).
- **Consequences / revisit trigger:** Long departure motion can be cut short. Persistent cross-route choreography would require a deliberate revised scope and measured cost; it is not implicitly included in the robot proof.

### D-007 — Static mobile default and provisional experiment budgets
- **Date (UTC):** 2026-11-01
- **Status:** Proposed; user approval pending; no performance result claimed
- **Context:** A WebGL-capable phone can still render poorly, and decorative motion must not block professional content.
- **Options considered:** Autoplay all four objects; deferred enhancement; static posters with optional 3D.
- **Decision:** Recommend static mobile/coarse-pointer and reduced-motion defaults, separate optional Enable 3D, finite gestures and persistent pause if looping. Trial shell ≤300 KiB, deferred robot ≤1.5 MiB, mobile DPR 1 and 30 fps target, with the full H budgets/matrix in performance research.
- **Evidence:** `research/performance.md`; `docs/ROBOT_PROTOTYPE_PLAN.md`; [official Web Vitals](https://web.dev/articles/vitals); [WCAG 2.2](https://www.w3.org/TR/WCAG22/).
- **Consequences / revisit trigger:** Budgets are planning hypotheses; shell suballocations may need revision after measuring the selected framework baseline. No lab sample establishes field p75 CWV. Failed mobile/navigation/accessibility paths require simplification before expansion.

### D-008 — Field Notes recommended among three visual directions
- **Date (UTC):** 2026-11-01
- **Status:** Proposed; user choice pending
- **Context:** Four diverse interests need a coherent editorial composition with clear section labels and readable engineering evidence.
- **Options considered:** A — Field Notes; B — Instrument Panel; C — Object Index.
- **Decision:** Recommend A's warm paper, dark ink, green accents, serif/sans hierarchy and specimen layout. Keep basketball color/motifs local. All three options retain equivalent semantic routes and a stacked mobile composition.
- **Evidence:** `research/design.md`: 11 active personal-site references, seven findings, browser observations and verified candidate font license texts; `docs/IMPLEMENTATION_RECOMMENDATION.md` comparison.
- **Consequences / revisit trigger:** Palettes/typography are proposals; real model/material fit, font transfer, contrast, longest labels and narrow layouts need later visual/device checks. User may choose B/C or request revisions.

### D-009 — Existing CC0 robot for proof; original companion props preferred
- **Date (UTC):** 2026-11-01
- **Status:** Proposed; no asset acquisition or approval
- **Context:** Need credible robot animation without four disparate realistic models or uncertain rights.
- **Options considered:** RobotExpressive; creator editable pack; custom rigid robot; reusable versus original ball/camera/chip; Spline exports.
- **Decision:** Recommend RobotExpressive with model-specific CC0 1.0 evidence for the proof, then coherent original primitive props. Specific external alternatives are documented but not blanket-approved. Keep GSAP/Spline optional and avoid mandatory walking/physics/flash gates.
- **Evidence:** `research/assets.md`; [exact robot README](https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/RobotExpressive/README.md); independently fetched creator basketball and font sources in research index.
- **Consequences / revisit trigger:** Pin/hash/inventory/validate actual bytes after approval, preserve all component rights, review actual appearance and clip quality, measure cost. WebGL failure prevented live verification in this research environment. Replace with a simpler original robot if coherence/cost fails.

### D-010 — Phase 2 robot proof authorized
- **Date (UTC):** 2026-11-01
- **Status:** Approved by user for bounded prototype only
- **Context:** User explicitly authorized Field Notes provisionally, Next/TypeScript static export, R3F/Drei, RobotExpressive, accessible mobile fallback and the six interaction modes.
- **Decision:** Execute T7 only. Include a semantic specimen button (Enter/Space), immediate inline robotics placeholder reveal with short decorative motion, independent ordinary Robotics link, reduced-motion/static and mobile/WebGL fallback, screenshot, production/export tests and documented observations.
- **Evidence:** User Phase 2 authorization; `docs/PHASE_2_IMPLEMENTATION_PLAN.md`.
- **Consequences:** Supersedes prior pending status for those prototype choices. Natural idle is allowed with pause/visibility controls. No other three objects, full portfolio or deployment is authorized. Stop for prototype review before expansion.

### D-011 — User correction: select reusable sources before more code
- **Date (UTC):** 2026-11-01
- **Status:** Current user instruction; application work stopped
- **Context:** User rejects the prototype approach and wants distinctive existing open-source models, animation and implementations inspected before reuse choices.
- **Decision:** Freeze app code and produce `research/reusable-components/` catalog with exact source paths, demos/previews, separate licenses, existing behaviors, direct-reuse/modification boundaries, compatibility and rankings. Prioritize the four named repositories. Aim for two candidates per object; disclose gaps rather than invent verification.
- **Consequences:** D-010 no longer authorizes continuing implementation now. No redesign, model generation, integrations, app fixes or rebuilding. Preserve existing artifacts and unresolved defects as historical context. User selects sources before granting further development authority.

### D-012 — User pivot: cinematic desk hub and returnable mini worlds
- **Date (UTC):** 2026-11-01
- **Status:** Hub-world vision accepted as explicit user instruction; implementation remains unauthorized
- **Context:** User clarifies that the intended experience is one cinematic 3D desk/workbench, similar to a solo-player game menu, rather than editorial object cards. Each object supports idle, hover, select/camera approach, a category mini world and return.
- **Decision:** Make the desk hub the active product vision. Robot → Robotics; basketball → About; camera → Photography; microchip or another development object → Software. Research reusable scenes/assets, R3F interactions, camera transitions and world switching. Deliver the four-phase plan without coding or model generation.
- **Supersedes:** D-001's editorial working constraint, D-008/D-010's Field Notes composition as the active experience, D-005's homepage-only isolated enhancement scope and the brief's old exclusion of a 3D room. D-009's original companion props were already superseded by D-011. Next/TypeScript static export, R3F/Drei, RobotExpressive and accessible fallback remain baseline choices. D-006's immediate content links remain; optional enhanced world entry may intentionally load and animate with cancel/skip/return.
- **Evidence:** User “Pivot in vision: 3D Hub World Portfolio”; `research/hub-world/` source, object, architecture and phased-plan package.
- **Consequences:** Do not resume rejected editorial prototype work. Source choices, exact scene composition, switch mechanism and phase-1 build permission await user review. No full implementation or deployment is implied.

### D-013 — One camera controller and one active world recommended
- **Date (UTC):** 2026-11-01
- **Status:** Proposed; user review pending
- **Options:** CameraControls approach + covered scene swap; MeshPortalMaterial blended entry; every world kept in a shared physical scene.
- **Recommendation:** One lazy R3F canvas and Drei CameraControls, one active world at rest, destination imports on intent, saved hub camera/focus on return. Existing Fiber events, selected object source adapters and semantic direct links. MeshPortalMaterial is an optional measured one-portal comparison, not four always-live previews.
- **Evidence:** `research/hub-world/SOURCES.md` exact MIT library files and official sequence source; `ARCHITECTURE.md` tradeoffs/state graph. No combined runtime or device performance result.
- **Consequences:** State/history/resource coordination is integration work; don't invent new camera interpolation, picking or portal engines. H1 desk and object bundle are recommendations, not acquisitions selected for production.

### D-014 — Skill setup and browser proof required
- **Date (UTC):** 2026-11-01
- **Status:** Explicit user instruction; setup completed, no development authorization
- **Decision:** Install missing frontend-design, Vercel React best practices and Playwright skills; create project-scoped `portfolio-3d-hub` using skill-creator. Require relevant skills in AGENTS and distinguish source inspection, visible browser interaction and measured results. Never claim a 3D interaction works before exercising that exact interaction in a browser with visibly rendered 3D and recorded evidence.
- **Evidence:** `docs/SKILL_AUDIT.md`, `docs/SKILLS_INVENTORY.json`, workspace `.agents/skills/portfolio-3d-hub/`. Four skill validators pass; existing Playwright 1.64.1 and Chrome retained; skill CLI responds.
- **Consequences:** Installation and research/artifact preview are authorized; no app fixes, new dependencies, app builds or implementation. Cached/plugin skills are not automatically active. No 3D runtime pass claimed by setup.

### D-015 — Three proposed game references and screenshot comparison
- **Date (UTC):** 2026-11-01
- **Status:** User-supplied proposed reference set; final composition/source selection remains pending
- **Decision:** Use The Room: Old Sins attic dollhouse for object/world entry; Stray Clementine's apartment for atmosphere; Life Is Strange Max's dorm desk for warmth/personal storytelling. Record these as proposed references, not a claim that the user personally loves/played them. Build a research moodboard with actual screenshots and require future rendered work to be compared against them.
- **Evidence:** `research/hub-world/VISUAL_REFERENCES.md`, `visual-references/moodboard.html`, research screenshot/provenance ledger. Actual images visually inspected; moodboard images verified in Chrome.
- **Consequences:** Borrow composition, lighting and interaction principles using selected license-cleared assets. Do not extract proprietary game models/textures/audio or ship reference screenshots in the portfolio. Current hub comparison is conceptual because the hub remains unimplemented.

### D-016 — Three bounded real-3D composition studies authorized
- **Date (UTC):** 2026-11-01
- **Status:** Explicit user authorization; three compositions delivered, approval pending
- **Decision:** Build three visual treatments of the same populated desk hub: cozy, cinematic and stylized-game. Three-quarter camera looking down; existing licensed robot, ball, camera and chip, with monitor, warm desk lamp and natural personal/work props. Use actual browser screenshots for selection. Desk is provisional, not selected as the final room asset.
- **Consequences:** Necessary asset acquisition/integration, isolated study route and production/browser checks are authorized. No new research survey/moodboard, AI images/generated models, flat landing-page redesign, mini worlds, full portfolio or deployment. Stop after composition review deliverables. This supersedes earlier application freeze only for this bounded study.
- **Delivered evidence:** `/compositions/` with five isolated source files; three actual browser captures under `output/playwright/compositions/`; licensed-model manifest/credits; successful static build/export and real software-WebGL checks. Reference trio explicitly retained by user. Desk remains provisional. No treatment selected by the user yet.

## D-019 — Bounded implementation lifecycle choices (lead, within D-018)
- `/` and `/hub/` share the approved hub; `/compositions/` remains the archived study. Other worlds are scenery only.
- One Canvas/CameraControls, hidden preserved desk, lazy mounted/unmounted workshop, authored Idle/Wave and semantic `/hub/robotics/` notes. No new dependencies or asset/clip bytes.
- Camera cancellation freezes current pose via public setLookAt; return restores actual position/target and committed-control focus. Responsive FOV follows current viewport rather than serializing obsolete aspect state.
- Live reduced motion settles active camera/cover and disables later flights; visibility settling and foreground deadlines avoid classifying ordinary hidden RAF suspension as a failed load. Actual OS suspension remains unverified.
- Terminal WebGL/load failure shows semantic notes/reload, not in-place context restoration. No world-history/deep-link machinery added in this phase. User review remains the next gate.

## D-020 — Finish handoff and stop; no repository/commit/deploy
- User explicitly requests current robot milestone completion and final visual-review handoff only. Stop implementation; no features, desk redesign or next navigation object.
- Supply four actual screenshots, exact local commands, files/behavior summary, browser results/evidence/failures/limits and scope/navigation disclosures.
- No GitHub repository creation, commits or deployment. This supersedes D-017's earlier repository authorization. No remote, initial commit, push or deployment exists.
- Wait for user's visual review before further implementation. Root promotion is disclosed: previous homepage/navigation replaced, legacy robotics return points to the new desk, former root specimen/main anchors no longer match old sections. Main room/asset placement preserved with approved warmth, robot yaw and HUD adaptations.

## D-021 — Publish working robot concept to GitHub
- User explicitly reauthorizes repository creation, commit and push, superseding D-020's Git prohibition only. Target: BigZ509/personalwebsite, private by default; milestone commit message: Working robot concept.
- Include existing app, licensed assets, source research, project memory, screenshots and selected build/test logs. Exclude dependencies, build caches, local credentials/env and duplicate archives. Do not add features, deploy, or treat this as visual approval for other worlds.
- Check fresh unit/type results and staged contents; verify final remote commit against local HEAD before claiming completion. Earlier approval-review failure remains historical, not a reason to bypass review.

### D-021 execution checkpoint — GitHub App approval required
- Repository form auto-selects Keploy as auto-installed by BigZ509; item is inactive and cannot be removed via form controls.
- Automatic approval review rejected creation because this would grant the third-party app access without explicit user approval. No creation/push executed. Do not bypass through another mechanism.
- Local commit/staged-content verification is independent and remains authorized. Before remote creation, user must approve Keploy access or supply an empty repository without that integration.

### D-021 completion — explicit integration approval and verified push
- User created public `https://github.com/BigZ509/personalwebsite`, then explicitly approved continuing with Keploy left installed. This resolves the prior automatic approval-review blocker; no attempt was made to bypass it. The earlier private default was not the visibility of the user-created repository.
- Pushed source milestone **Working robot concept**, commit `0f67294c8205ef00d5db52011db74db3bf8e0c9d`, to main. Git ls-remote verified the exact same SHA on GitHub; main tracks origin/main.
- Documentation-only follow-up records the publication. No new application implementation, deployment, repository visibility changes or app-permission modifications. Continue waiting for visual review before more website work.
