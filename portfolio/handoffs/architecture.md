# Final focused re-review — 2026-11-02 05:15 UTC

**Status:** Ready for review; focused assignment complete. **No new concrete source bug; A-H1–A-H4 source-corrected.** Previous browser-pending language below is superseded by the saved hardening result.

**Independently checked:** `npm test` **8 passed/0 failed**; new source hashes unchanged since review. [hardening-evidence.json](../output/playwright/robot-journey/hardening-evidence.json) records all **four Pass**, errors empty: mixed focus/pointer; cancellation continuity (five visible samples, max delta **1.2560739669470201e-15**); live reduced-motion approach settles to frozen Idle **0.5**/return; held initial GLB now exposes bounded fallback and usable notes. Old red log preserves the prior >17s missing fallback.

**Disposition:** A-H1–A-H3 have scoped saved browser support plus source corrections. A-H4 foreground deadlines/hide handling are source-corrected and CPU-probed; **actual OS tab suspension remains unverified**. Do not promote that scenario to a browser pass. Physical devices/hardware GPU, Safari/Firefox and screen readers also remain unverified.

Lead reports final build passed; `.next/BUILD_ID` independently matches **5YY4vq69O-B25g-jGbiZu**. No build/browser run by specialist. Only research/architecture.md, updates/architecture.md and handoffs/architecture.md changed; history preserved, no app/shared edits. **Next:** lead integrates final evidence/dispositions; no additional app change requested by this review.

---

# Focused implementation re-review — 2026-11-02 05:14 UTC

**Status:** Source review ready; lead hardening browser result pending. **A-H1–A-H4 source-corrected; no new concrete source bug found.** Older open statuses below describe historical snapshots.

- Journey now reads motion policy per stage; active CameraRig move and cover settle on preference/pause/hide.
- Camera cancellation freezes actual current position/target with public `setLookAt(current,false)`; no endpoint-snapping stop remains.
- Initial 15s deadline now sits outside suspended Canvas. World 12s/camera 8s deadlines use foreground-only `visibleDeadline`; cleanup removes timers/listeners.
- Pointer and keyboard focus attention are independent and merged; sole Canvas/CameraControls, exact-pose and committed-focus ownership retained.

**Independent checks:** `npm test`: **8 passed/0 failed**. In-memory virtual-clock deadline probe passed foreground-budget pause/resume, initially-hidden start and cleanup; no real browser/OS visibility test. Read lead's old initial-timeout-red.log showing >17s stalled GLB without fallback. This proves the old failure, not the fix. Hardening script inspected; current build/result pending.

**Next:** Lead supplies saved validate-hardening result; inspect it and close only supported browser claims. Keep actual OS tab suspension, physical devices/hardware GPU, Safari/Firefox and screen readers unverified. Earlier nine-path artifact remains historical proof for its source, not the latest hardening. No further source fix requested by this review.

**Files changed only:** research/architecture.md, updates/architecture.md, handoffs/architecture.md. No app/shared edits, browser/build, packages, commits or GitHub actions by specialist.

---

# Implementation checkpoint — architecture · 2026-11-02 05:06 UTC

**Status:** Ready for lead review; review/docs assignment complete. D-018 approves warm Cinematic and only robot → workshop → desk. Historical statuses below do not govern current hub work. **Changed files only:** `research/architecture.md`, `updates/architecture.md`, `handoffs/architecture.md`. No app/shared edits, browser, build, packages, commits or GitHub actions by specialist.

**Architecture:** `/` now reexports `/hub/page`. HubExperience owns semantic HUD, motion policy, focus, failure and world revisions; journey.ts owns abortable phase sequencing. Dynamically imported DeskScene owns one Canvas; CameraRig/CameraControls alone writes pose. Workroom remains mounted/hidden, with robot stopped and picking disabled; lazy Workshop mounts at covered swap and unmounts on return. RobotCharacter owns cloned rig/materials and authored Idle/Wave; no new skeletal animation or second renderer. GLTF cache/hidden room retained; cache/memory not measured. Return captures actual current position/target, restores it with CameraControls and final epsilon snap. Latest layout-effect focus fix is source-checked. Static notes links remain independent; failure cancels/hides scene and exposes notes/reload. Mock coordinator recovery is not app in-place recovery.

**Actionable source findings already delivered to lead:**

| ID | Trigger / exact source | Lead next action |
| --- | --- | --- |
| A-H1 / P2 | `journey.ts:40–41` snapshots reduce for whole trip; Pause/preference change during travel leaves later fades/flight animated. CPU reproduced. | Apply live policy at stage boundaries and explicitly settle active move/fade without introducing another camera writer; test change during travel. |
| A-H2 / P2 | `DeskScene.tsx:118–123`: installed CameraControls.stop snaps current to pending endpoint. CPU reproduced, so Back can jump before cover. | Freeze current position/target with public setLookAt(current,false) when canceling/replacing; inspect interruption continuity. Existing cancel pass proves eventual return/no stale world only. |
| A-H3 / P2 | Initial chunk/model suspension has no deadline; 12s timeout applies only to subsequent show(). | Bounded initial-readiness fallback outside Suspense, cleanup on ready/unmount; test request that stays pending. |
| A-H4 / P2 conditional risk | 8s camera timer continues independently of RAF/document visibility. | Check hidden travel >8s; qualify timer or settle on hide. Source condition only, browser reproduction pending. |

**Independent verification:** Four journey unit tests passed (exact command in research); CPU-only CameraControls/policy probes confirmed A-H1/A-H2. No browser launched here. Latest inspected source includes plain Canvas fallback text/outer links, resize projection separated from pose reset, camera identity in initial-pose effect and phase-keyed layout focus. These address the lead-reported fallback/orthographic/focus issues at source level.

**Actual saved browser evidence read:** [First rendered flow](../output/playwright/robot-journey/flow-evidence.json), HeadlessChrome156/ANGLE SwiftShader, 1600×1100, same one canvas, authored Wave progression, approach/workshop/default return/focus, no page errors. [Extended paths](../output/playwright/robot-journey/paths-evidence.json): all **nine groups Pass** — Tab/Enter/Escape/focus, Space, exact orbited position error **0**, mid-approach cancellation/no stale world, pause Idle **0.5** and frame **229→229**, mesh touch **390×844**/one canvas, reduced-motion round trip/frozen robot, WebGL-unavailable notes fallback, no-JS notes. Errors empty. These are inspected lead artifacts, not this specialist's browser observations.

**Closed test-race observations:** Orbit's earlier mismatch came from resampling one stale render frame; fresh-frame stabilization added. Pause test now waits for committed rendered motion policy. Return-focus race was fixed by restoreFocus ref + layout effect after enabled button commits; extended artifact confirms restoration. Do not reopen these as current bugs. They do not cover mid-trip policy changes or visible interruption continuity.

**Limits:** Physical devices/hardware GPUs, Safari/Firefox and screen readers untested. No accessibility conformance, FPS, memory, context restoration, dynamic-policy, initial-stall or hidden-travel pass. Final production rebuild is underway/lead-owned; no fresh successful build claimed here. Lead owns actual game-reference screenshot comparison; this source review is not visual approval. Other three worlds/full portfolio stay out of scope.

**Precise continuation:** Lead disposition/fix A-H1–A-H4, verify only affected cases and final static build, record build/evidence in lead-owned memory. Architecture does not edit app or shared lead docs. Full current architecture, probe evidence and snapshot hashes are prepended in [research](../research/architecture.md).

---

# Handoff — architecture

> **Lead composition checkpoint — 2026-11-01 06:50 UTC:** `/compositions/` study is built/exported with one lazy R3F canvas, Drei CameraControls and source-asset adapters; five isolated source files, no dependency/config changes. Three actual renders plus mouse/keyboard/highlight evidence under `output/playwright/compositions/`. Orthographic default camera used only for stylized-game; single controls owner follows active camera. World switching remains unimplemented. See lead handoff for source boundaries, runtime limits and user-review stop.

> **Lead coordination — 2026-11-01 06:21 UTC, D-014/D-015:** [Project hub skill](../../.agents/skills/portfolio-3d-hub/SKILL.md), Vercel React guidance and Playwright skill installed/validated; see [audit](../docs/SKILL_AUDIT.md). AGENTS requires actual visible-browser testing before claiming camera/world interactions work, with artifact/device evidence. [Three-game references](../research/hub-world/VISUAL_REFERENCES.md) inform composition/entry; camera architecture D-013 remains proposed. No app code/dependencies/builds changed.

> **Lead coordination — 2026-11-01 05:58 UTC, D-012/D-013:** Current proposal is [hub architecture](../research/hub-world/ARCHITECTURE.md): one canvas, one Drei CameraControls owner, one active world with covered camera handoff, optional MeshPortalMaterial comparison later. Exact MIT sources/official sequence and alternative scene patterns are in [Sources](../research/hub-world/SOURCES.md). Includes history, load/cancel/error, camera/focus return and semantic routes; old isolated editorial-object contract is superseded where conflicting. No new dependencies/app modules created. Next user source/architecture review, then explicit phase-1 authorization. Lead coordination, not a new specialist review.

> **Lead coordination update — 2026-11-01 05:34 UTC:** User correction/D-011 stops all app fixes/builds and requires choosing reusable source implementations first. Read [the catalog](../research/reusable-components/README.md), especially priority-repo exact files and compatibility. Do not act on earlier A-R2/A-R3 fix/re-review instructions now. Existing source is frozen; prototype findings remain unresolved history. Txemalon's same-major stack is not a compatibility test; Miles needs React18/Fiber8 migration; Jorge exposes a bundled deployment with unknown original versions. Next authorized step is source-specific adaptation planning after user selection and separate development authorization. Specialist session closed; lead coordination note, not a new code-review pass.

**Current status:** Ready for review — A-R1 source-corrected pending regression; A-R2/A-R3 open
**Last updated:** 2026-11-01 05:08:39 UTC
**Owner:** `architecture`

## One-paragraph state
Architecture research is complete for lead synthesis. Recommend, as a proposal, Next App Router static export with React/TypeScript, stable React 19 + Fiber 9 + compatible Drei, one lazy homepage canvas, independent object modules, and minimal motion initially. Vite + React Router Framework Mode with explicit route prerendering is the credible alternative. Neither stack nor any exact release is approved or installed. Lead can integrate now without waiting for other specialists.

## What was completed and confirmed
- Nine substantial primary-source findings cover static export, the Vite alternative, actual compatibility constraints, maintenance evidence, single-canvas rendering, client/server separation, motion alternatives, navigation cancellation, and resource ownership.
- Three reference repositories have fetched source and license text: React Three Next, Drei, and Three.js; Fiber is a fourth. Starter demo fetch failed; Three demo HTML shell fetched. No working interactive demo is claimed.
- All requested routes fit semantic static rendering: `/robotics`, `/about`, `/photography`, `/projects`, and published `/projects/[slug]`, plus `/`.
- Report contains future text-only folder/component tree, route/content schema, independent object/controller contracts, real-anchor activation rules, nonblocking visual state machine, cancellation/unmount cleanup, dependency lock strategy, and meaningful future checks.
- Integrated lead-supplied policy: mobile posters + Enable 3D, deferred desktop scene, reduced motion static. Proposed shell 300 KiB and deferred robot 1.5 MiB allocations are recorded as targets only. Initial JS 80 KiB should be diagnostic until measured, then lead decides the hard gate or revision. No Next baseline size is asserted.

## Exact files changed / touched
- `/Users/bigz/personalwebsite/portfolio/research/architecture.md`
- `/Users/bigz/personalwebsite/portfolio/updates/architecture.md`
- `/Users/bigz/personalwebsite/portfolio/handoffs/architecture.md`
- No shared/other-agent files, application code, dependency manifests, or Git state changed. No installs, implementation downloads, scaffolding, prototype, or commits.

## Verification already performed
- Read required project context and owned files. `git status --short` exited 128: no repository. No commit history exists to inspect here.
- Fetched official docs, source manifests/peerDependencies, release/commit pages, code licenses, GSAP terms, and example source through web tools. Every source-derived finding has adjacent links and verification level.
- Sources distinguish stable Fiber 9/React 19 from Fiber 10 alpha. Fiber React upper bound and Drei peers are recorded. Source release-version mismatch and semantic-release placeholder are explicitly unresolved; no invented exact-version lock set.
- Read-only shell metadata fetch failed DNS; did not escalate. Failed source guesses are not verification. No application test/build/browser/mobile/performance verification was attempted or claimed.
- Local read-only document checks verify required routes, finding count, contract markers, evidence limitations, three-file status, and balanced text-tree fences. Exact final check result is recorded in `updates/architecture.md`.

## Next 3 actions for a fresh agent
1. Lead: read report recommendation, compatibility table, navigation contract, and budget note; integrate T3 as Ready for review in lead-owned synthesis/task files. Keep stack/exact releases proposed and all benchmark results unmeasured.
2. Lead: reconcile asset rights/rig/clips, design intent, target devices, clean-URL hosting/images, and performance allocation with the robot gate. Explicitly retain immediate navigation and mobile/reduced-motion fallbacks. Do not duplicate this stack research.
3. After existing approval gates only: assign an isolated robot scope, re-fetch published peers/engines/licenses, select and lock a compatible stable graph, and run content/deep-link/link-modifier/cancellation/cleanup/network/device checks listed in the report. Review robot evidence before expanding to four objects.

## Blockers or approvals needed
- No blocker to research integration. Implementation still requires the project's research, visual, and robot-scope gates; this handoff assumes no approvals and does not request user preferences mid-research.
- Remaining uncertainties: actual installed compatibility and TypeScript graph; Fiber tag/source mismatch; cached history freshness; inaccessible starter demo; production host route/404/image behavior; selected model rights/rig; mobile/cross-browser behavior; actual bytes, responsiveness, frame timing, and memory.
- Exact 80 KiB initial JS feasibility is unknown; measure before making a framework accept/reject claim. Count all deferred scene JS within the renderer allocation and agree on transfer-size conventions.

## Research references
- Full source links, evidence labels, comparisons, and unresolved items: `research/architecture.md`.
- Core anchors: https://r3f.docs.pmnd.rs/getting-started/introduction ; https://nextjs.org/docs/app/guides/static-exports ; https://reactrouter.com/how-to/pre-rendering ; https://drei.docs.pmnd.rs/portals/view ; https://nextjs.org/docs/app/api-reference/components/link .

## Notes to lead / integration contract
- Proposed synthesis decision: static semantic content plus homepage-only client enhancement; one renderer, four independent modules, stable compatibility group, minimal motion first.
- Routing is the sole navigation authority. Real anchors preserve modified/middle clicks and native keyboard/touch behavior. Optional motion cannot await completion, model loading, or timers before routing. Superseding navigation/unmount invalidates visual tokens and cleans owned resources; late imports/callbacks cannot commit navigation.
- Lead owns all shared/task/decision edits. This agent has finished its three-file deliverable and is Ready for review; no further search or implementation is required for this research handoff.

## Lead proposal review — 2026-11-01 04:46:56 UTC

Read `docs/IMPLEMENTATION_RECOMMENDATION.md` after lead integration. **No blocking architecture contradiction found.** Its stable React 19/Fiber 9 proposal, static-export image caveat, exact URLs, homepage-only canvas, native immediate navigation, cancellation, alternatives, and diagnostic budget treatment agree with this research. Design/assets are explicitly pending; no approval or measurement is implied. No lead file edited.

Three implementation details should be explicit in the robot gate (clarifications, not reasons to delay synthesis):

1. **Minimal semantic route fixture precedes full content:** The roadmap puts full content foundation after prototype review. The robot proof still needs a small prerendered `/robotics` destination and at least one representative `/projects/[slug]` fixture to verify direct requests/no-JS HTML/404 behavior. Draft fixture content must be labeled and cannot invent project outcomes. This validates architecture without authorizing full content production or four objects.
2. **Enforce the lazy boundary rather than naming it:** Put `next/dynamic` with SSR disabled inside the homepage client wrapper, never directly in a Server Component. Keep Three/model imports out of shared barrels/layouts, and confirm mobile opt-in/reduced-motion rules before requesting scene chunks. The proposal already requires network verification; make these failure checks part of acceptance. See report Finding 6 and loading contract.
3. **Keep native routing singular, and clean async visual work:** Explicit tests should cover middle click/`target`/download/external links, rapid activation, Back/Forward during load, and unmount before late promise completion. Module cancellation must stop owned activity and ignore stale results; it cannot rely on aborting `import()` or promise cancellation. The proposal's high-level token rule is correct; tests make it reviewable.

Before deployment, choose static-host URL/trailing-slash and genuine 404 behavior, and enumerate published slugs. These are already listed as verification needs rather than omissions. Exact published package/Node/type compatibility and asset provenance remain implementation prerequisites already acknowledged by the proposal. No new blocker was discovered.

## Phase 2 checkpoint — 2026-11-01 04:58:36 UTC

**Current authority:** User Phase 2 authorization, D-010, and `docs/PHASE_2_IMPLEMENTATION_PLAN.md` supersede the earlier Phase 1 approval-pending, anchor-only interaction, and finite-idle-only proposals for this bounded robot proof. All Phase 1 history above remains preserved. Lead executes implementation inline. Architecture specialist owns only these three Markdown files plus a later requested read-only code review; no app/shared edits, concurrent browser, full portfolio, other objects or deployment.

**Completed:** Appended a Phase 2 section to `research/architecture.md` recording the exact selected dependencies, lead-reported published npm constraints, rationale for TS 5.9.3 rather than a compiler-major migration, and a concrete full-code review plan. Updated the architecture progress log. Required project memory and Phase 2 plan read; `git status --short` still exits 128 (no repository).

**Compatibility evidence status:** Lead/user reports escalated-network `npm view` verified Next 16.4.3 (Node >=20.9, React 19 allowed), Fiber 9.8.2 (React >=19 <19.4, Three >=0.156), Drei 10.7.9 (React ^19, Fiber ^9, Three >=0.159). Selected Three 0.187.0, React/DOM 19.3.1, React/DOM types 19.3.0, TS 5.9.3, Playwright 1.64.1, Node 24.13.1 are documented. The reported core peer intersection is coherent. I did not rerun npm metadata queries or verify any installed graph, install, typecheck, build/export or browser result. No such passing result has been received at this checkpoint.

**Controlling review contract:** Native specimen button uses browser click/Enter/Space activation once and immediately reveals inline content; separate ordinary `/robotics/` anchor retains native navigation semantics. One lazy canvas; mobile opt-in; reduced-motion static. Natural idle breathing is allowed, with a persistent Pause motion control and hidden/offscreen suspension. Pause and motion policy must survive reveal/reset/loading changes. No visual completion gates links/reveal. Cleanup and late async-result rejection cover reset, preference changes, failures and unmount.

**Scope correction:** Prior Phase 1 advice to add a `/projects/[slug]` fixture is deferred. The approved proof requires only the robot/home inline placeholder and standalone `/robotics/` destination. Review must not demand full case studies, other sections or deployment as a condition of this bounded prototype.

**Next exact actions:**

1. Lead continues its scoped setup/implementation and reports exact install/typecheck/build/export/test outcomes separately; update assumptions only on received evidence.
2. When lead explicitly requests read-only review of the stable app checkpoint, inspect configs/lockfile, complete scoped components/policy, tests and provenance/evidence docs. Trace eager imports, native activation paths, cancellation, pause/reduced-motion/visibility and shared model cleanup. Do not run a browser concurrently or mutate app/build output.
3. Append prioritized findings with file/line, trigger, impact and suggested correction to owned files; distinguish confirmed static defects, missing coverage and runtime hypotheses. Lead applies fixes; re-review on request. No current code-review verdict exists.

**Remaining evidence needs:** Actual installed dependency/type graph, Three type selection, WebGL/asset runtime behavior, accessible controls, native Enter/Space once, no-JS direct route, network isolation, pause/hidden rendering and all device/performance measurements. Budgets remain diagnostic. There is no blocker to this documentation handoff and no request for further permission; the next dependent step is the lead's app-review checkpoint.

**2026-11-01 04:59:17 UTC verification:** Read-only Markdown checks passed for all reported versions, reported-versus-installed evidence distinctions, scope/behavior supersessions, deferred review status, preserved Phase 1 histories and balanced fences. These are documentation checks only.

## Independent implementation review handoff — 2026-11-01 05:05:44 UTC

**Review complete:** Read the full scoped app, controls/policy, styling, tests, static server, configs/lockfile, asset notice/manifest, generated home/robotics HTML, and relevant installed dependency source. Three P2 defects identified; no P0/P1 identified. This is not robot sign-off. App/shared files remain untouched; no browser, server, install, build, application test suite or deployment was run by this specialist.

| ID / severity | Exact app location | Reproduction and impact | Focused lead action |
| --- | --- | --- | --- |
| A-R1 / P2 | `RobotSpecimen.tsx:97`, `RobotScene.tsx:20` | Fail first GLB request, restore network, click Retry 3D. Same loader/URL rethrows its cached error, so remounting the boundary cannot recover. | Clear failed GLTF cache before explicit retry within lazy-module boundary; assert a second request and live success. |
| A-R2 / P2 | `RobotScene.tsx:27–63`; `next.config.ts:7` | Development Strict Mode replay: memo starts Idle, effect cleanup stops/uncaches it, replayed setup never restarts it. Group breathing can hide the missing authored Idle. | Make action/resource setup symmetric with cleanup; reacquire/play Idle after replay and verify final unmount. Do not suppress Strict Mode. |
| A-R3 / P2 | `RobotSpecimen.tsx:52–61`; `RobotScene.tsx:86,96` | Delay successful initial load, suspend offscreen before first model frame, wait beyond 10s, return. First-frame readiness cannot run under `frameloop="never"`, but deadline marks the healthy scene failed. | Separate asset/setup readiness from visible draw or qualify timeout during suspension; test delayed-success offscreen/resume. |

**Actual independent evidence:** Source-level findings above have exact reasoning in the appended research review. Dependency-only, in-memory Node probes confirmed stopped/uncached mixer remains inactive without a new play, and cached rejected promise remounts invoke loader once then rethrow. These probes did not exercise app/browser/WebGL. Snapshot hashes and detailed reproduction steps are in the report.

**Coverage gaps:** Existing no-WebGL/model-failure checks can accept initial Static specimen without observing explicit failure. Pause test checks button label, not stopped frames; no retry-success, context-loss, timeout, hidden/offscreen loading, rapid reset/Escape or renderer-chunk isolation regression. Separate these gaps from confirmed defects; request focused coverage rather than broad new scope.

**Positive structure checks:** Native button has no synthesized keyboard click; anchors remain ordinary immediate navigation. Immediate reducer reveal and focus/reset wiring are present. One lazy scene root, no scene import in standalone robotics/root layout, reduced-motion removal and pause/visibility policy are present. Material clones avoid mutating shared originals; final renderer/skeleton GPU lifecycle remains runtime evidence, not an asserted leak. Read existing generated HTML contains readable headings and direct link; static server serves directory indexes and real missing-file 404. No no-JS browser result inferred from artifact inspection.

**Dependency/model evidence update:** Direct lockfile entries match pins, independently read. Lead reports clean installed graph, 94 packages/0 audit vulnerabilities, and harness annotation correction; no final build result inferred. Independent local GLB size/hash match manifest (463988 bytes; SHA-256 `047f5e5fb3bb6d378bd1df16ca6137f2a596c99b3a1b5690b4020c05aaf6f319`); direct JSON inspection found 0 images/textures and no external URI fields. Asset notice/manifest read. No appearance, animation, GPU, mobile or performance measurement performed.

**Exact continuation:** Lead fixes A-R1/A-R2/A-R3 in owned app code, strengthens targeted tests, runs relevant lead-owned checks, and sends changed paths/results for requested re-review. Architecture will append resolution history without editing code or running a concurrent browser. Three findings currently remain open; budgets remain diagnostic and expansion/deployment remain unauthorized.

**2026-11-01 05:06:23 UTC document check:** Corrected a checker-only assumption that report and handoff milestones must have identical timestamps; their recorded source-review and delivery times differ intentionally. Re-run passed three-finding presence, actual milestone timestamps, ready statuses and balanced fences for all owned files. No implementation verification inferred.

## Latest retry fix and regression review — 2026-11-01 05:08:39 UTC

- **A-R1 source-corrected, regression pending:** Independently read new `RobotScene.tsx:19–21` cache-clear export and `RobotSpecimen.tsx:70–78` poster → dynamic import → mounted guard → cache clear → attempt increment. Correct ordering addresses rejected-loader reuse, retains one canvas and does not delay native routing/reveal. No post-fix browser success received or claimed.
- **Fix recovery test ordering:** `tests/prototype.spec.ts:78–80` can observe initial Static specimen and remove interception before the injected GLB failure occurs. Wait for Retry 3D/explicit failure while abort interception remains installed, then unroute, retry and assert successful new request/live state. This race must not be mistaken for failure of the cache-clear correction.
- **A-R2 still P2/open:** `RobotScene.tsx:56–67` still plays Idle in memo and stops/uncaches it in cleanup without replay setup reactivation. Test the configured development Strict Mode; production breathing/counter checks do not settle this.
- **A-R3 still P2/open:** `RobotSpecimen.tsx:54–63` deadline still runs during initial suspension while readiness is only `RobotScene.tsx:90` first-frame callback and line 101 uses never. Delay initial success, suspend before first frame >10 seconds, return; distinguish this from suspending an already-live scene.
- **New lead evidence:** Lead reports 13 browser checks passed before adding the recovery case, whose failure reproduced cached rejection. Actual pause/offscreen counters and actual context loss reportedly passed. These are lead-reported runtime outcomes, not my browser observations. Updated tests read include counter freeze/resume, pause preference across reduced-motion remount, and real loseContext; earlier missing-test notes for those cases are superseded.
- **Next step:** Lead corrects retry regression ordering, rebuilds/reruns, fixes A-R2/A-R3 and sends changed paths/results for re-review. No app/shared edits or browser activity by this specialist; no expansion/deployment authority.
