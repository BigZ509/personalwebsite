# Project UPDATE — Lead-owned snapshot

**GitHub publication complete — D-021, 2026-11-02:** [BigZ509/personalwebsite](https://github.com/BigZ509/personalwebsite) is public and was created by the user. User explicitly approved leaving Keploy installed. Pushed **Working robot concept**, commit `0f67294`, to main and verified the remote SHA equals the local commit. Origin configured and main tracks origin/main. T27 Done. No application code or deployment changes; robot implementation remains stopped for visual review. Earlier auto-review Keploy blocker below is resolved by explicit user approval.

**Version-control authorization — D-021, 2026-11-02:** User now requests pushing the working robot concept to GitHub with a milestone commit. Preparing private `BigZ509/personalwebsite`; no app changes or deployment authorized. D-020 implementation review stop remains, while its earlier Git prohibition is superseded. Code, licensed assets, project memory and selected test evidence will be committed; dependencies/build caches/local environment files/ZIPs remain ignored.

**Development setup follow-up — 2026-11-02:** User's LAN preview log exposed blocked Next dev HMR origin. Added only `192.168.1.28` to `allowedDevOrigins` in `next.config.ts`, per official Next documentation. Typecheck passed on rerun; first check raced dev-server type regeneration and reported missing generated files. LAN hot reload after restart is not yet browser-verified; no production rebuild or scene changes. D-020 visual-review stop and no repository/commit/deploy remain in force.

## Current checkpoint — robot workshop · 2026-11-02

**Implementation stopped for visual review (D-020). Git milestone published under D-021; no deployment. T26/T27 Done; T19/T28 Ready for review. D-018:** 02 Cinematic + 01 Cozy warmth approved. Exactly one robot round trip implemented, preserving the furnished room and twelve licensed model files. One Canvas, one CameraControls owner, authored Idle/Wave, hover/focus highlight, camera approach, lazy workshop, Back/Escape restoring actual pose and focus. No other three worlds/full portfolio.

- **Open:** `http://127.0.0.1:4182/` (alias `/hub/`); static notes `/hub/robotics/`. [Review/checklist/architecture](docs/ROBOT_WORKSHOP_REVIEW.md); [desk](output/playwright/robot-journey/01-desk.png), [Wave](output/playwright/robot-journey/02-hover-wave.png), [workshop](output/playwright/robot-journey/04-workshop.png), [mobile](output/playwright/robot-journey/08-mobile-workshop.png).
- **Verified:** eight unit tests, typecheck, production build/static export; actual Chrome156/SwiftShader mesh hover/click, native keyboard/focus, repeated travel, exact orbited return (0 position error), mid-flight cancellation, touch emulation390×844, initial/live reduced motion, Pause, unavailable WebGL/context-loss/stalled-load fallback and no-JS notes. Scene keeps the same canvas. Initial/camera/world deadlines count foreground time. Build/test/artifact details are in the review file.
- **Observed:** desk237 draws/61,478 triangle submissions; workshop130/34,580; twelve unchanged GLBs1,140,856bytes. No FPS, hardware/mobile/network budget claim. Clock/readback warnings remain.
- **Unverified:** physical iOS/Android, hardware GPU, Safari/Firefox, screen readers/conformance, real OS background suspension, orientation mid-flight, memory/battery/CWV and world history/deep links. Notes are illustrative; no project claims.
- **Memory:** lead and assets/architecture specialists updated their owned checkpoints; shared source catalog preserved, current asset usage/credits clarified. D-020 now prohibits repository/commit/deploy; historical D-017 creation was never executed after approval-review failure. No remote/commit/push. Stop for robot-flow review; no further worlds by inference.

## Archived checkpoint — actual 3D compositions · 2026-11-01 06:50 UTC

**Status:** D-016 composition study delivered, browser verified, ready for user approval. No mini worlds or full portfolio built.

- **Review:** [Cozy](output/playwright/compositions/cozy.png), [Cinematic](output/playwright/compositions/cinematic.png), [Stylized game](output/playwright/compositions/stylized-game.png); running study `http://127.0.0.1:4182/compositions/`. Same furnished room, all four category objects, monitor/lamp/keyboard/chair, books, plants, original work-note/room surfaces. Cozy/cinematic perspective cameras; stylized-game orthographic camera. One canvas and CameraControls.
- **Assets:** 11 original licensed GLBs acquired (676,868 bytes) plus existing RobotExpressive. Camera, basketball and keyboard CC BY 3.0 credits linked in the study; other new meshes CC0. [Manifest](public/models/desk-compositions/manifest.json) and [credits](public/licenses/desk-compositions/ATTRIBUTION.md). No proprietary game assets or AI-generated images/models used. Original architectural planes/printed surface textures supply set dressing; principal objects/furnishings are reused meshes.
- **Reference comparison:** Cozy uses Max's warm wood/window light and meaningful work props; cinematic uses Clementine's warm work pool against cool ambient/background; stylized-game prioritizes a readable miniature room. All remain intentionally lower-detail than the reference games. The simple desk remains a placeholder, not a final-asset commitment. The Room's object/world entry remains a next-phase design requirement, not an implemented interaction.
- **Verified:** `npm run typecheck` passed; final `npm run build` passed and exported `/compositions/`. Three actual 1600×1100 renders inspected. Mode click, Enter/Space selection, Software focus/ring, reset control, robot canvas hover and basketball canvas click captured. [Evidence JSON](output/playwright/compositions/browser-evidence.json), [focus capture](output/playwright/compositions/keyboard-focus-software.png), [hover capture](output/playwright/compositions/mouse-hover-robot.png).
- **Limits:** connected Chrome WebGL context failed and exposed usable fallback; actual 3D verification used isolated Chrome/ANGLE SwiftShader. Software rendering is not hardware/mobile coverage. Touch, physical devices, FPS, accessibility conformance, context-loss recovery and mini-world transitions untested. No animation playback claim: robot is posed using its existing Idle clip. Two asset requests were canceled during full-page navigation; all meshes loaded in each final capture and no page errors were recorded. Drei/Three clock deprecation warning remains.
- **Observed counters:** one canvas; 237 draw calls / 61,478 triangle submissions in captured frames (includes scene/shadow work, not unique asset geometry or a benchmark). No mobile performance promise. New GLBs' hashes match source manifest.
- **Scope integrity:** five new study source files; dependencies/configs and all 15 prior app/test/server files match the old digest. Original editorial homepage is retained, not redesigned. No Git repository exists; study isolated in a new feature/route directory.
- **Next:** user chooses cozy/cinematic/stylized-game or specific revisions. Stop before adding worlds, final desk replacement or production expansion. Art approval and next scope remain pending.

## Previous skills/reference checkpoint — preserved history

## Current checkpoint — skills and visual references · 2026-11-01 06:23 UTC

**Status:** Skill/reference setup verified and complete; moodboard ready for review. **Authority:** D-014/D-015 allow tooling and moodboard research only. Hub application remains frozen.

- Installed missing frontend-design (Anthropic), canonical vercel-react-best-practices (Vercel) and playwright (OpenAI) at pinned source revisions. Added user `.agents/skills` discovery symlinks; no unrelated skill removed/disabled. [Audit](docs/SKILL_AUDIT.md) and [75-file inventory](docs/SKILLS_INVENTORY.json) distinguish installed files from enabled plugins.
- Created project-scoped [portfolio-3d-hub](../.agents/skills/portfolio-3d-hub/SKILL.md) using skill-creator: R3F, CameraControls, licensed reuse, cinematic composition, mini-world lifecycle, visual comparison and actual-browser evidence. All four added skill files pass the official validator.
- Existing Playwright test runtime 1.64.1 and system Chrome retained; skill CLI help/version 0.1.23 verified. No app dependency changes or browser tests. Temporary PyYAML environment used for skill validation only.
- User's **proposed** reference set: The Room: Old Sins attic dollhouse (mechanics), Stray Clementine apartment (atmosphere), Life Is Strange Max dorm desk (warmth/storytelling). Not described as games the user personally loves. [Moodboard and concept comparison](research/hub-world/VISUAL_REFERENCES.md), [visual board](research/hub-world/visual-references/moodboard.html), [captured viewport](research/hub-world/visual-references/moodboard.png).
- Actual screenshot sources/provenance retained and visually inspected. Research moodboard opened in Chrome; all four displayed images loaded. This is artifact validation, not a hub interaction pass. Proprietary screenshots stay outside production `public/`; no game models/textures/audio acquired for reuse.
- Workspace entry AGENTS points to app instructions. App AGENTS now require relevant skills, reference comparisons and **no claim that a 3D interaction works before the exact action is tested in-browser with visible 3D**. Renderer/device limits and Pass/Fail/Not tested evidence must be reported.
- Final audit passed: 18 Markdown files, 98 local links/HTML assets, four screenshot provenance hashes, 75 skill-inventory hashes and three discovery aliases checked. Start/end 15-file app digest unchanged: `4e6668a8bb381046eec8976959fb70e25c84b4ff43694dca11efb75cdd38a05f`. T22/T23 Done; no app build or test suite run.
- Next: review moodboard and select desk/object/switching sources; explicit phase-1 implementation authority remains pending. Do not resume prior prototype or build a hub under this setup task.

## Previous hub research checkpoint — preserved history

## Current checkpoint — hub-world pivot · 2026-11-01 06:00 UTC

**Phase:** Hub-world research and planning. **Status:** Research package verified and ready for user review; T16 Done, T17 Ready for review. **Application:** frozen, no further implementation authorized.

- **Latest authority: D-012.** One cinematic desk/workbench hub, four object portals, camera approach, distinct mini worlds and return. The editorial/Field Notes specimen composition is superseded. Next/TypeScript static export, R3F/Drei, RobotExpressive and accessible fallback remain the baseline.
- **Read first:** [Hub package](research/hub-world/README.md), [sources](research/hub-world/SOURCES.md), [objects](research/hub-world/OBJECTS.md), [architecture/scene graph](research/hub-world/ARCHITECTURE.md), [four phases](research/hub-world/BUILD_PLAN.md).
- **Recommended, not selected:** Quaternius CC0 desk; selected existing room pieces; RobotExpressive; dLeom ball plus optional Miles court behavior; Nick Ladd digital camera; iPoly3D chip or Txemalon keyboard. One CameraControls owner, one active world; MeshPortalMaterial optional after measurement (D-013).
- **New evidence:** desk GLB inspected in memory (135,916 bytes, separate drawers, no images/clips); explicit CC0 publisher link. Two new unchanged publisher previews saved in research only. Drei/yomotsu exact camera/portal files and MIT licenses read. Fiber event source inspected. Existing object catalog reused without redoing the full survey.
- **Holds:** Kenney archive returned 403, so inner paths remain unknown. Julien furnished room code/models lack verified license grants; reference only. Notebook app has MIT code but separate model/media gaps and old dependencies. No ready-made licensed four-world portfolio was verified.
- **Runtime limits:** official camera demo DOM loaded, but Chrome logged WebGL context creation failure. No camera motion, hub render, device benchmark, physics migration or hub static build tested. All physical phones/tablets and mobile GPUs untested.
- **Memory synchronized:** mission/brief/launch prompt now state hub vision; D-012 preserves/supersedes history explicitly; D-013 is a proposal. Specialist handoffs receive lead coordination notes, not fabricated new specialist sign-offs. Prior sessions remain closed after usage limits.
- **Verification passed:** 20 relevant Markdown files checked, 80 local links resolve, balanced fences and all four phases present. Two unchanged previews' sizes/hashes match recorded provenance. This is a document audit, not runtime testing.
- **No code changes:** start/end 15-file application/config/test/server digest equals prior frozen digest `4e6668a8bb381046eec8976959fb70e25c84b4ff43694dca11efb75cdd38a05f`. No builds, installs, model integration or new site layouts.

### Next review

User selects desk/object bundle and camera-switching approach from the concrete package, then explicitly authorizes phase 1 if desired. Phases 2–4 require their respective reviews. Do not resume the old robot implementation or choose unlicensed substitutes automatically. Content/photo rights and physical-device validation remain future gates.

## Archived source-catalog snapshot — earlier checkpoint

The snapshot below is preserved history. D-012 and the current checkpoint above govern conflicting vision and next steps.

**Phase:** Source-selection research — implementation stopped by user correction  
**Overall status:** Source catalog ready for user selection; application unchanged  
**Last reviewed (UTC):** 2026-11-01 05:34  
**Current objective:** User inspects existing examples/previews, chooses reusable candidate IDs and grants separate development authorization if desired.

## Canonical state
- **Latest authority:** User's “Correction: Open-Source-First Development” supersedes the prior instruction to continue the prototype. No application fixes, redesign, new models, dependency installation, integration or builds during this task.
- Prefer adapting existing well-documented model, animation, interaction and transition implementations. Earlier original-prop recommendations are not the active plan.
- Specialist sessions encountered a usage limit; lead completes this focused pass directly and adds clearly labeled coordination notes to handoffs, preserving specialist histories.
- Product direction: editorial 2D shell + four interactive 3D object portals.
- Four areas: robotics, about/basketball, photography/creative, software/projects.
- User Phase 2 authorization provisionally selects Field Notes, Next/TypeScript static export, R3F/Drei and RobotExpressive for the robot proof only (D-010).
- All four specialist reports, progress logs and handoffs reviewed: 31 substantive findings total.
- Previous custom-prop recommendations are superseded. Current source options: RobotExpressive/Chappie; Miles basketball behavior plus existing ball assets; Nick Ladd/Kai Fan/Khronos cameras; iPoly3D/KiCad chips; Txemalon/Motion/Jorge transitions. See the catalog for exclusions, rights and exact source paths.
- No new design direction or stack migration is proposed by this pass. Next/R3F compatibility notes describe adaptation work, not tested adoption of upstream applications.
- Old performance/UX proposals and prototype artifacts remain historical evidence; no benchmarks of the cataloged upstream sources were run.
- App root is this `portfolio/` directory. A bounded Next prototype exists; no Git repository has been initialized. Full portfolio/deployment remain unauthorized.

## Latest verified changes — source-selection pass

- `research/reusable-components/`: 9 Markdown files, 13 candidate records and 11 unchanged upstream previews/session screenshots. Dedicated per-object, transition, priority-repo and preview ledgers.
- Previous-source inventory: 32 mentioned GitHub repos and 114 other URLs; includes failed/archived sources with original evidence limits. These are not counts of working demos.
- All four priority repos inspected via exact trees/files. Jorge is deployment-only/minified, MIT code but unverified Chappie asset rights; Txemalon has readable same-major Next/R3F components; Miles has existing physics behavior on an older stack; RobotExpressive has separate verified MIT/CC0 evidence.
- Actual visual correction: Kai Fan asset is a film-reel camera; Nick Ladd is a digital stills camera. Publisher links verify Nick Ladd CC BY 3.0 and iPoly3D CC0 1.0; downloaded archive contents remain uninspected.
- Live evidence: Txemalon page and ES→EN switch observed; official Motion Hide→Show transition observed. Jorge capture blank, basketball CodeSandbox blocked; neither is called a working 3D demo. Publisher previews are labeled separately.
- Catalog check passed: 48 local links/headings, none broken. Start/end digest for 15 app/config/test/server files identical: `4e6668a8bb381046eec8976959fb70e25c84b4ff43694dca11efb75cdd38a05f`. No app code, model, dependency or build output changed by this task.
- README, shared tasks/decision/research index and all handoff coordination notes synchronized. User source choices and implementation authority remain pending.

## Prior-phase evidence — historical snapshot
- `docs/IMPLEMENTATION_RECOMMENDATION.md`: three directions, stack/alternatives, assets/motion, future folder/components, content contract, roadmap, requirements and explicit approval table.
- `docs/ROBOT_PROTOTYPE_PLAN.md`: one-robot scope, semantic route fixtures, source/license inventory, lazy boundary, cancellation, H budgets and all-NOT-RUN acceptance protocol.
- `docs/RESEARCH_INDEX.md`: review ledger and direct lead source spot-checks; `docs/DECISIONS.md`: accepted workflow and proposed choices D-003–D-009.
- Final read-only document/status audit passed after integration: 23 Markdown files, 31 numbered findings, exactly three directions, balanced code fences, 24 local file/heading links valid and no product files. T1–T6 Done; T7 Blocked; T8 Ready for review.
- Specialists performed bounded reference-site browser observations, reported failures and checked sources/licenses. No portfolio app build, runtime/device benchmark or accessibility conformance test exists.

## Active work
| Owner | Task | Status | Latest detail |
| --- | --- | --- | --- |
| design | T1: inspiration + visual directions | Done (research reviewed) | Seven findings, 11 active personal references, three directions |
| assets | T2: 3D models + motion | Done (research reviewed) | Seven findings, eight candidate routes, four source sets, explicit license/binary limits |
| architecture | T3: source repo + stack evaluation | Done (research reviewed) | Nine findings, four repos, contracts/tree/schema; proposal review integrated |
| performance | T4: accessibility + speed plan | Done (research reviewed) | Eight findings, three tools, proposed budgets and unrun acceptance matrix integrated |
| lead | T5–T6: synthesis + robot plan | Done (historical research/planning) | Prior recommendation superseded where D-011 conflicts |
| lead | T14: reusable-source catalog | Done | Exact source/license/preview comparison, explicit verification gaps |
| user | T15: choose reusable sources | Ready for review | Inspect candidate IDs before any further development |
| lead | T7: prototype implementation | Blocked | User correction stops fixes, builds and expansion |

## Next actions
1. Open `research/reusable-components/README.md` and inspect the linked working/attempted demos and publisher previews.
2. User selects source IDs/behaviors, especially camera silhouette and chip package; resolve conditional rights/source gaps for selected candidates.
3. Receive separate development authorization defining which existing files/models/animations to adapt. Do not resume old prototype work automatically or create substitute models/components by default.

## Risks / open questions
- Chappie asset/animation/texture grants and editable original source not verified; root code MIT is insufficient to declare the model cleared.
- Camera candidates have no verified authored lens/shutter clips. Chip catalog has one previewable GLTF listing and a conditional CAD source, not two complete animated R3F components.
- Blocked/unrendered live demos remain explicitly limited. No physical-device, FPS, field-CWV or upstream-app compatibility test performed.
- Existing prototype has unresolved historical review issues and later unverified source/build changes. It was not accepted or completed; this task intentionally makes no repairs.
- Personal copy, resume/contact, project outcomes/links and photography rights remain unconfirmed.

## Checkpoint history — 2026-11-01

- 04:36 UTC: read all starter memory; no completed findings, code or Git history. Dispatched four specialists with disjoint file ownership.
- During research: drafted synthesis/robot scope, expanded roadmap/approval gates and independently checked pivotal sources. Reviewed performance first and integrated its H budgets/matrix; no runtime checks passed by documentary review.
- 04:50 UTC: all reports/logs/handoffs reviewed, architecture consistency feedback integrated, research/planning marked complete. Recommendations remain proposed. Stop before code.
- Phase 2: user authorized one robot proof; partial app, pinned asset, screenshots and earlier build/browser results created. Final review/fixes were unfinished; do not call the current source a fully verified prototype.
- 05:19–05:34 UTC: user correction stopped app work. Lead reused existing inventory, verified priority-source files/rights, saved publisher/browser previews and completed catalog directly after specialist usage limits. No implementation changes; source digest unchanged.

## Quick resume
Read `AGENTS.md`, this file, `docs/TASKS.md`, and your owned handoff. Resume the highest-priority assigned unblocked item. If documentation contradicts actual code, verify code and ask lead to resolve the discrepancy.
