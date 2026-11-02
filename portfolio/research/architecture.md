# Hardening disposition — 2026-11-02 05:15 UTC

**Status:** Focused re-review complete; no new concrete source bug found. **A-H1–A-H4 source-corrected.** This supersedes browser-pending status below; earlier history is preserved. Source hashes still match the 05:14 checkpoint.

Independently read [hardening-evidence.json](../output/playwright/robot-journey/hardening-evidence.json): **all four checks Pass, errors empty**. Mixed pointer/focus attention persists; cancellation shows five visible samples before opaque cover, maximum position delta **1.2560739669470201e-15**; switching reduced motion during approach settles travel and reaches frozen workshop Idle **0.5**, playing=false, with return; indefinitely held initial desk.glb reaches bounded foreground fallback and working notes. The old [red log](../output/playwright/robot-journey/initial-timeout-red.log) retains >17s unbounded loading before correction.

- **A-H1:** Source + new coordinator regression + saved live-preference browser check support correction. Browser check covers reduced-motion change during approach, not every Pause/fade timing permutation.
- **A-H2:** Source freeze replaces stop(); saved visible interruption samples support continuity correction.
- **A-H3:** Initial 15s foreground deadline outside suspended Canvas and saved held-request fallback/notes check support correction.
- **A-H4:** Source foreground budgets and hide settling reviewed; deterministic CPU helper probe passed. **Actual OS background-tab suspension remains unverified.** Hardening's four passes do not close that device/browser scenario.

`npm test` independently passed **8/8** in this re-review. Lead reports final production build passed; independently read `.next/BUILD_ID` = **5YY4vq69O-B25g-jGbiZu**. This specialist did not run the build/browser. Earlier flow/paths evidence remains scoped to its recorded runs; hardening adds the four new checks, not physical-device coverage.

**Next:** Lead integrates dispositions/evidence in shared memory. No further source correction requested. Actual OS suspension, physical iOS/Android, hardware GPU, Safari/Firefox, screen readers and conformance/performance measurements remain unverified. Only architecture research/update/handoff Markdown changed; no app/shared edits.

---

# Focused implementation re-review — 2026-11-02 05:14 UTC

**Disposition:** A-H1–A-H4 **source-corrected; hardening browser verification pending**. No new concrete source bug found. This checkpoint supersedes the earlier open-finding table without removing history. Only the three architecture Markdown files changed; no app edits, build, browser, packages, commits or GitHub actions by this specialist.

| Finding | Independently inspected correction | Verification boundary |
| --- | --- | --- |
| A-H1 | journey evaluates `!reduce()` per camera/fade stage. CameraRig settles an active move through `settleMove`; cover finishes through `settleCover` when motion policy changes. Both ports also check live policy before starting. | New coordinator regression passes; active rendered change awaits hardening artifact. |
| A-H2 | CameraRig freeze reads current position/target and calls `setLookAt(current,false)` on replacement/abort/timeout/cleanup; no `stop()` remains. Successful arrival still snaps final epsilon. | Source-corrected; visible interruption continuity awaits hardening artifact. |
| A-H3 | HubExperience installs a 15s initial-readiness deadline outside suspended Canvas, clears it on ready/failure/unmount, and preserves semantic fallback. | Old [red log](../output/playwright/robot-journey/initial-timeout-red.log) records stalled desk.glb still loading beyond 17s; post-fix browser fallback pending. |
| A-H4 | New [visibleDeadline.ts](../src/features/hub/visibleDeadline.ts) counts foreground budget only: initial 15s, world 12s, camera 8s. Active camera/cover settles on hide; listeners/timers clean up on settle/abort/unmount. | Deterministic CPU helper probe passes; actual OS background-tab suspension remains unverified. |

**Related source check:** Independent `focused` state now combines with pointer attention while phase=desk; pointer leave cannot erase held keyboard focus. One Canvas/CameraControls ownership and existing pose/focus restore remain intact.

**Executed:** `npm test` → **8 passed, 0 failed**, including the new live-policy stage regression (5 journey + 3 historical interaction tests). A CPU-only virtual-clock/EventTarget probe checked visibleDeadline's retained foreground budget across 20s hidden intervals, initially-hidden start, idempotent cleanup and absence of late callback/timer/listener. This is not browser visibility evidence. No visibleDeadline test file exists; the helper probe was in-memory only.

**Pending:** Lead rebuild and [validate-hardening.js](../output/playwright/robot-journey/validate-hardening.js) result for mixed attention, cancel continuity, live reduced motion and stalled-load fallback. Script inspection is not a passing run. Earlier flow/paths artifacts retain their previous scoped results; they do not verify this newer source. Physical devices, hardware GPU, Safari/Firefox, screen readers and actual OS tab suspension remain untested.

Snapshot SHA-256: journey `4810e626868c4850c2dcb302350309648fad19034af9b7798b504ae4d529fcd3`; HubExperience `da7ee156644b9b053b0c4599254650e555ae060eff22cd8953261d8deeaca07d`; DeskScene `1f17276db003a2c03c438938aced32ac5074025d804c81c874f0ca84c1ca1166`; visibleDeadline `594d3b5c3b783ca322a0aaed191935cb316a348d0e219a750f8fed464d89befa`.

**Next:** Inspect saved lead hardening result when provided; update evidence disposition without repeating architecture research or editing app/shared docs.

---

# Implementation checkpoint — architecture · 2026-11-02 05:06 UTC

**Status:** Ready for lead review. **Authority:** D-018, warm Cinematic; exactly robot → Robotics workshop → desk. This checkpoint supersedes conflicting historical proposals/statuses below. Lead owns app code, builds and browser QA; this specialist changed only its three Markdown files. No broad external research, packages, commits or GitHub actions.

## Current component architecture (independently source-inspected)

- [`src/app/page.tsx`](../src/app/page.tsx) reexports the hub page; `/` and `/hub/` enter the same experience. [`HubExperience.tsx`](../src/features/hub/HubExperience.tsx) owns semantic HUD/notes links, phase/world revision, motion preference/pause, selection, error boundary, cover animation and focus. `next/dynamic` with `ssr:false` loads DeskScene inside this client boundary. This defers the renderer module, but mounts it immediately on the experience route; it is not mobile opt-in or measured transfer isolation.
- [`journey.ts`](../src/features/hub/journey.ts) owns `desk → approaching → entering → workshop → returning → desk`. Ports separate camera, cover, world readiness, lock, focus and failure from scene geometry. One AbortController per visit/return supersedes earlier work; every normal transition await races cancellation.
- [`DeskScene.tsx`](../src/features/compositions/DeskScene.tsx) owns **one Canvas** and **one CameraControls**. CameraRig is the sole pose writer through CameraControls APIs. Projection updates on width changes separately from the initial pose effect; resize no longer resets position/target. Camera identity is included in initial-pose dependencies for the archived orthographic study. No second tween/orbit controller or live portal render target exists.
- Workroom stays mounted, hidden in the workshop; its robot receives `running=false` and picking handlers are disabled. [`Workshop.tsx`](../src/features/hub/Workshop.tsx) is `React.lazy` and mounts only after the covered world switch; it unmounts on return. It reuses existing credited props. Lazy destination loading currently starts at the swap, not hover/intent. Cached GLTF resources and hidden room remain retained; destination unmount is not full cache eviction.
- [`RobotCharacter.tsx`](../src/features/hub/RobotCharacter.tsx) owns a SkeletonUtils clone, private materials and Drei useAnimations mixer. Authored Idle loops; a fresh hover/focus invokes one-shot Wave, crossfades back on finished, and does not restart while held. Reduced motion evaluates neutral Idle at 0.5, blocks Wave and continuous invalidation. Hidden document/inactive world pause mixer; active animation invalidates demand frames. No new skeletal tracks are authored. [`SceneAssets.tsx`](../src/features/compositions/SceneAssets.tsx) clones materials per asset, retains shared geometry/textures via `dispose=null`; room/workshop dispose their generated CanvasTextures. GPU lifecycle/memory is not measured here.

## Exact pose, cancellation, focus and fallback

`capture()` reads CameraControls **current** position/target with `receiveEndValue=false`; entry saves this actual invoking pose. Return covers swap, reinstates desk/approach, uncovers and travels to saved pose. Each move uses `setLookAt`; after its rest promise resolves it snaps the final epsilon with `setLookAt(...,false)`. Pose contract is position/target, not serialized FOV/zoom or arbitrary camera state; the approved hub uses perspective/dolly. Width-responsive FOV intentionally remains current.

World readiness has monotonic revisions; old render acknowledgments cannot fulfill a newer world request. `show()` has a 12s deadline; CameraRig rejects after 8s and clears its timer/abort listener. Cover uses Web Animations, freezes computed opacity on abort and cancels in finally. Back starts a new controller; unmount/context loss/error cancels pending work. `cancel()` only aborts/unlocks; it is not itself a recoverable Back command. Normal Back must use `back()` to restore world/pose.

The latest focus fix is independently source-checked: `returned()` marks `restoreFocus`; a phase-keyed layout effect focuses the committed enabled robot button. Workshop focus also runs in layout effect. This replaces the earlier RAF-before-commit race. Native buttons preserve Enter/Space activation; Escape invokes Back; outer semantic notes/credits links remain independent of WebGL. Plain Canvas fallback text has no hidden focusable anchor. Boundary/context-loss failure hides Canvas, cancels work, removes cover and exposes notes/reload links. **Integrated failure is terminal fallback:** `ports.error=onFailure` cancels the controller, so the pure coordinator's mock error-recovery test does not prove in-place app recovery. Retry is a full navigation, not cache-clearing remount.

## Actionable findings sent promptly to lead

| ID / priority | Evidence and trigger | Focused correction / acceptance |
| --- | --- | --- |
| A-H1 / P2 — motion policy captured for entire trip | `journey.ts:40–41` reads reduce once. Hub updates the ref, but neither current move nor subsequent stages observe a mid-trip Pause/reduced-motion change. CPU probe deferred approach, flipped reduce=true, then released: both later fades and overview move still received animate=true. | Read current policy for subsequent stages and explicitly settle/cancel the active camera/fade through the existing owner when policy changes. Verify switching preference/Pause during approach and overview, not only before entry or at rest. |
| A-H2 / P2 — cancellation jumps to pending endpoint | `DeskScene.tsx:118–123` uses `controller.stop()` before new moves and on abort/deadline. Installed CameraControls `stop()` copies end spherical/target into current. CPU probe: mid position `[9.2477988457,7.1267958246,11.3432362210]` became `[4.15,4.85,2.8]` immediately. Back can therefore reveal a discontinuity before cover closes. | Capture current position/target and freeze using public `setLookAt(current,false)` instead of end-snapping stop while replacing travel. Inspect rendered positions/visible travel during interruption; eventual successful return does not test continuity. |
| A-H3 / P2 — initial loading can remain pending forever | `HubExperience.tsx:52,79–87`: only subsequent `show()` has a deadline. Initial dynamic chunk/GLB Suspense can remain unresolved with Opening the workroom and disabled entry forever. SceneEvidence/context listener sits inside asset Suspense. | Add a bounded initial-readiness failure path outside the suspended subtree, cleaned on ready/unmount. Keep normal notes usable. Delay an initial request without rejecting it and assert explicit fallback; do not revive the historical offscreen first-frame timeout bug. |
| A-H4 / P2 conditional lifecycle risk — hidden travel can falsely fail | Camera's 8s wall-clock timer is independent of visibility, while progress depends on RAF. Robot alone has hidden-document policy. If timer runs during suspended RAF, a healthy transition fails to semantic fallback. Source failure condition identified; browser reproduction not performed. | Qualify deadline by visibility or settle active travel nonanimated on hide. Lead checks hidden >8s during travel then foreground; do not equate pausing Idle with camera suspension. |

These remain source concerns in the inspected snapshot, not failures asserted by the saved browser run. No P0/P1 found. Suggested changes remain lead-owned; no application patch by this specialist.

## Verification and evidence limits

**Executed here:** `node --experimental-strip-types --test tests/journey.test.ts` — **4 passed, 0 failed**. Covers mocked pose return, stale approach completion, initially reduced motion and mocked load-error recovery. Two in-memory CPU probes checked installed CameraControls stop semantics and live coordinator policy changes; neither rendered WebGL. The first CameraControls probe lacked DOMRect and failed before construction; rerun used a value-only DOMRect stub and produced the positions above. No app files were written by probes.

**Inspected lead browser artifacts:** [`flow-evidence.json`](../output/playwright/robot-journey/flow-evidence.json) records HeadlessChrome 156/macOS UA, ANGLE SwiftShader, 1600×1100, one unchanged canvas, Wave time/hand movement, approach, workshop and default-pose return with restored focus, no page errors, Three.Clock warning. This is software rendering, not hardware proof. [`paths-evidence.json`](../output/playwright/robot-journey/paths-evidence.json), subsequently read, records **all nine groups Pass**:

- Native Tab/Enter/Escape with focus reaction/return; native Space round trip.
- Orbited pose exact restoration, max position error **0**; mid-approach Back/Escape without stale workshop.
- Pause: Idle **0.5**, frame **229 → 229** after rendered policy settles.
- Actual robot-mesh tap and Back at **390×844**, emulated touchscreen, one canvas.
- Reduced motion: frozen Idle **0.5**, no Wave, Enter/Escape round trip. The artifact distinguishes immediate browser destination from camera/fade animate=false verified by the coordinator test.
- Controlled WebGL creation failure → usable notes/retry links and static notes; no-JS notes navigation. Errors array empty.

Lead fixed two test races: orbit stabilization previously compared the same stale rendered frame twice; it now requires fresh frames. Pause now waits for rendered policy rather than arbitrary 200ms. The earlier orbit mismatch is not an open pose-restoration defect. Source fixes for focus, plain Canvas fallback and resize/initial-camera dependencies are checked. Extended artifact results supersede earlier pending-extended language in this session.

**Remaining limits:** Physical iOS/Android, hardware GPUs, Safari/Firefox and screen readers explicitly untested; no accessibility-conformance, frame-rate, memory, context-restoration, initial-stall or dynamic-policy pass claimed. Final production build refresh is lead-owned and pending in this review. This specialist did not launch a browser, build or compare scene screenshots to the game references; no visual milestone sign-off. Retain lead's actual reference comparison/evidence responsibility. No history/hash deep linking for enhanced world state is implemented; static notes URLs work. Other worlds/full portfolio remain outside authority.

Review snapshot SHA-256: journey `436fa9cac88960573ebcd1dd974f4381279aaad0f8ed70028ab74dc2f07cfdbb`; DeskScene `c4763c784227ca1e568fa1b882ff97a893617a6488980484f7e7b19b936852f1`; post-focus HubExperience `8b3ceeb6b1e361a98d74c43c059d71e85686b6c63ceb6171cfa92defe5566e40`; journey tests `e603529cb505b265bf6ecae2697ba55cac2e9ac69f780eea9b46b38fb5fe5ccf`. Git exists now with untracked files and no commits; earlier no-repository statements below are historical.

**Next:** Lead dispositions A-H1–A-H4, runs only focused regressions for any fixes, refreshes production build/evidence and shared memory. No implementation or browser work transfers to this sidecar.

---

# Technical architecture and open source — research proposal

**Owner:** `architecture`  
**Status:** Ready for review  
**Research date:** 2026-11-01 UTC  
**Approval status:** Proposals only; no framework, release, asset, benchmark, or prototype approved.

## Recommendation to lead

Propose **React + TypeScript, Next.js App Router static export, stable Fiber 9 with compatible Drei, and one lazy homepage canvas**. Render semantic navigation and case studies independently of the scene. Begin with minimal motion; add GSAP only if approved object choreography requires a timeline, or Motion if approved DOM interactions justify it. Do not add both by default. Exact package releases require a fresh compatibility check after approval.

The honest alternative is **Vite + React Router Framework Mode with explicit prerendering** of every published route. Plain Vite SPA output does not by itself establish semantic case-study HTML at each URL. This recommendation is a fit judgment based on the evidence below, not a measured speed comparison.

## Verification legend and research limits

- **Fetched docs/repo/license:** Primary documentation, raw source, license text, registry metadata, release/commit pages retrieved on 2026-11-01 through web tools. Some responses are cached; fetched does not mean freshly read from origin.
- **Browser observed:** None. No interactive demo, WebGL output, animation, mobile layout, or keyboard path was browser-tested.
- **Measured:** None. No app, build, benchmark, device test, performance audit, or dependency installation exists from this work.
- Required project guidance and all three owned files read. `git status --short` exited 128: no repository; no recent commits available.
- Read-only shell metadata requests failed DNS. Web fetching supplied the evidence below. The failed starter demo and guessed source paths are not counted as working demos. Research is complete enough for synthesis; remaining uncertainties are explicit.

## Source-backed findings

### 1. Generate readable routes at build time

**Verified:** Next static export produces route HTML at build time and supports static hosting. Server Components execute during build. Request-dependent server features and the default image optimizer are unsupported in export mode. [Official export guide](https://nextjs.org/docs/app/guides/static-exports)

**Application:** Propose static HTML for `/`, `/robotics`, `/about`, `/photography`, `/projects`, and every published project slug. Enumerate `/projects/[slug]` with `generateStaticParams`, whose documented purpose includes build-time dynamic route generation. [Official API](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)

**Tradeoff:** Next adds framework conventions despite not requiring a production server. Export images need ordinary pre-generated image variants or an approved custom loader; do not assume a static host runs Next's image service. Unknown project paths must remain genuine 404s. **Level:** fetched docs; documented capability confirmed, generated output/hosting untested.

### 2. Vite is credible when content rendering is explicitly solved

**Verified:** Vite's SSR API is described as low-level; application authors are directed toward higher-level integrations. [Vite SSR](https://vite.dev/guide/ssr.html) React Router can prerender specified routes with runtime SSR disabled; its SPA mode without prerendering initially renders the root rather than each content route. [Prerender guide](https://reactrouter.com/how-to/pre-rendering)

**Application:** A Vite alternative should use React Router Framework Mode, runtime SSR disabled, and an explicit path list derived from published content. Keep the same scene/content contracts. A plain Vite robot experiment would not validate production deep links or content rendering.

**Tradeoff:** This alternative also has framework/tooling requirements. Vite transpiles TS without type checking, so type checking must be a separate required check. [Vite features](https://vite.dev/guide/features.html) **Level:** fetched docs/manifests; no build comparison. Next is preferred for its direct content/client boundary; team familiarity could justify the alternative.

### 3. Select React, Fiber, Drei, and Three as one compatibility group

**Verified:** R3F says Fiber 8 pairs with React 18, Fiber 9 with React 19, and Fiber 10 is alpha. [R3F introduction](https://r3f.docs.pmnd.rs/getting-started/introduction) Fetched stable-line Fiber source peers specify React/DOM `>=19 <19.4`, Three `>=0.156`. [Fiber manifest](https://raw.githubusercontent.com/pmndrs/react-three-fiber/master/packages/fiber/package.json) Drei's source peers specify Fiber `^9.0.0`, React/DOM `^19`, Three `>=0.159`. [Drei manifest](https://raw.githubusercontent.com/pmndrs/drei/master/package.json)

**Application:** Propose stable React 19, matching ReactDOM, stable Fiber 9, and a compatible stable Drei release. The fetched Three peer intersection starts at `0.159`; it is not proof that every newer Three revision works. Select matching API/type packages and verify the installed graph later.

**Tradeoff:** Broad peer ranges are necessary, insufficient evidence. Exclude Fiber 10 alpha and related prereleases from the initial proposal because no requirement warrants preview renderer/scheduler risk. Optional native/Expo peers do not require native packages for the website. **Level:** fetched manifests/docs; no installation or runtime compatibility claim.

### 4. Current activity supports the libraries, not copying an old starter

**Verified:** The fetched Fiber release page shows stable `v9.8.2` dated 2026-10-15 with portal cleanup fixes, alongside separate v10 alpha releases. The fetched v9.8.2 source manifest internally reports 9.8.1. [Releases](https://github.com/pmndrs/react-three-fiber/releases), [tagged source](https://raw.githubusercontent.com/pmndrs/react-three-fiber/v9.8.2/packages/fiber/package.json) Drei's release page shows stable `v10.7.9` dated 2026-09-25 alongside v11 alpha; its source manifest uses a semantic-release placeholder. [Releases](https://github.com/pmndrs/drei/releases), [tagged source](https://raw.githubusercontent.com/pmndrs/drei/v10.7.9/package.json)

The React Three Next starter declares Next 14, React 18, Fiber 8, Drei 9, and Three `^0.160.0`. Its fetched history's newest visible entry is 2024-04-21. [Manifest](https://raw.githubusercontent.com/pmndrs/react-three-next/main/package.json), [history](https://github.com/pmndrs/react-three-next/commits/main/)

**Application/tradeoff:** Borrow separation patterns, not its package list, PWA setup, or build commands. Source `version` fields, cached histories, and “latest” labels do not replace published metadata and a lockfile. Activity is not a guarantee of support/security. **Level:** fetched repo/release/history pages; freshness and published version mismatches remain unresolved.

### 5. Four modules do not require four canvases

**Verified:** Three documents browser context limits and GPU resource duplication across contexts, then demonstrates one renderer drawing multiple visible regions. Its example numerical context limit is not a universal device guarantee. [Multiple scenes](https://threejs.org/manual/pages/multiple-scenes.html) Drei View implements scissor regions and supports inline DOM Views through `View.Port`; its older `track` prop is deprecated. [Docs](https://drei.docs.pmnd.rs/portals/view), [source](https://raw.githubusercontent.com/pmndrs/drei/master/src/web/View.tsx)

**Application:** One homepage canvas: use four groups in one scene if the design allows; use separate Views in that canvas only when independent framing is needed. Preserve HTML link hit areas independently of renderer events.

**Tradeoff:** Views still render each scene and introduce clipping, bounds, scrolling, and event-coordinate complexity. Four canvases simplify local setups but multiply renderer lifecycles and cannot share GPU resources across their contexts. One canvas shares failure scope, requiring fallback posters for all slots. No speed/memory multiplier is claimed. **Level:** fetched docs/source; costs unmeasured.

### 6. Keep 3D in a homepage-only client island

**Verified:** Next separates static/server content from browser APIs, effects, and interactive client state. [Server/client docs](https://nextjs.org/docs/app/getting-started/server-and-client-components) `next/dynamic` with SSR disabled belongs inside a Client Component; conditional mounting can defer loading. [Lazy loading](https://nextjs.org/docs/app/guides/lazy-loading)

**Application:** A small `HomeEnhancement.client` wrapper conditionally imports the scene after hydration, visibility, and motion policy allow it. Only the homepage includes this wrapper. Keep content components outside its import graph. Direct case-study visits should not request Three/Fiber/Drei or models; verify the built network output later.

**Tradeoff:** The starter persists its scene globally across route changes. [Layout](https://raw.githubusercontent.com/pmndrs/react-three-next/main/src/components/dom/Layout.jsx), [Scene](https://raw.githubusercontent.com/pmndrs/react-three-next/main/src/components/canvas/Scene.jsx) That fits sites with 3D on many pages, but this portfolio should release the homepage scene while visitors read. Dynamic import alone is not proof of deferred transfer. **Level:** fetched docs/source; emitted chunks untested.

### 7. Minimal motion, Motion, and GSAP have different responsibilities

| Option | Verified capability / terms | Proposed fit and tradeoff |
| --- | --- | --- |
| Minimal motion | R3F supports demand rendering and explicit invalidation for imperative updates. [Scaling guide](https://r3f.docs.pmnd.rs/advanced/scaling-performance) | Baseline: CSS feedback, finite object accents, authored clips where available. Least added machinery; custom multistep timelines would cost maintenance. |
| Motion | Docs require React 18.2+; source peers allow React 18/19. `useAnimate` offers scoped controls and cleanup on unmount. Core code is MIT. [Install](https://motion.dev/docs/react-installation), [manifest](https://raw.githubusercontent.com/motiondivision/motion/main/packages/motion/package.json), [controls](https://motion.dev/docs/react-use-animate), [license](https://raw.githubusercontent.com/motiondivision/motion/main/LICENSE.md) | Good for approved DOM reveals/layout behavior. Core license does not clear paid assets or third-party examples. No need to add it just for object frame updates. |
| GSAP | React adapter peers: React `>=17`, GSAP `^3.12.5`. GSAP supports generic-object animation. Its standard no-charge terms permit commercial use with restrictions, including competing visual animation builders; it is not MIT. [Adapter](https://raw.githubusercontent.com/greensock/react/main/package.json), [GSAP manifest](https://raw.githubusercontent.com/greensock/GSAP/master/package.json), [terms](https://gsap.com/community/standard-license/) | Candidate for approved robot choreography. Keep a single owner of every animated property; clips, GSAP, and frame callbacks must not compete over the same transform. |

**Recommendation/tradeoff:** Begin without an added motion framework. Complex object choreography favors evaluating GSAP; DOM-heavy interactions favor Motion. No comparative bundle size, frame rate, or performance ranking is asserted. **Level:** fetched docs/manifests/licenses, no runtime tests.

### 8. Routing owns navigation; visual state owns cancellation

**Verified:** Next Link distinguishes same-origin navigation notifications from all clicks: modified clicks, downloads, and external links have different behavior. [Link API](https://nextjs.org/docs/app/api-reference/components/link) React effects support cleanup before reruns/unmount and an extra development Strict Mode setup/cleanup cycle. [Effect API](https://react.dev/reference/react/useEffect)

**Application:** The proposed contract below routes immediately and treats motion as cancellable decoration. No animation completion callback commits navigation. A long departure flourish can be cut short by a fast route change; that is acceptable unless the approved art direction is revised.

**Tradeoff:** A small visual reducer suffices initially; no navigation-blocking or state-machine package is justified yet. **Level:** fetched docs; contract is original proposal, not behavior verified in the starter.

### 9. Explicit ownership and finite idles enable cleanup

**Verified:** Three resources need lifecycle management; R3F declarative disposal has exceptions for primitives. [Three cleanup](https://threejs.org/manual/pages/cleanup.html), [R3F objects](https://r3f.docs.pmnd.rs/api/objects) An AnimationMixer can belong to each independently animated object and provides stop/uncache operations. [Mixer API](https://threejs.org/docs/pages/AnimationMixer.html)

**Application:** Modules own private mixers, listeners, timers, and resources. Cached/shared resources need coordinated release, not arbitrary disposal by a card. Use finite idle bursts with rest states; permanent spinning defeats demand rendering. Imperative updates must invalidate frames while moving. [Scaling guide](https://r3f.docs.pmnd.rs/advanced/scaling-performance)

**Tradeoff:** Unmounting alone does not prove custom resources are released. Repeated navigation/interruption tests are necessary. Rigs, clip names, textures, and model rights await asset review. **Level:** fetched docs; no memory measurements.

## Compatibility snapshot: evidence, not a lockfile

Observed 2026-11-01; no exact install set approved and no assertion of newest releases beyond the fetched snapshot.

| Group | Fetched evidence | Adoption rule |
| --- | --- | --- |
| Next | Registry latest returned 16.4.3. Tagged peers include React/DOM `^18.2.0` or `^19.0.0` plus a historical RC; Node `>=20.9.0`. [Registry](https://registry.npmjs.org/next/latest), [tagged manifest](https://raw.githubusercontent.com/vercel/next.js/v16.4.3/packages/next/package.json) | Select stable React 19 intersection with Fiber. Package React 18 acceptance alone does not settle App Router behavior. No canary baseline. |
| Fiber/Drei | Stable-line source peers recorded in Finding 3. | Re-fetch published package metadata; don't pin Drei's source placeholder or assume the Fiber tag's internal version resolves the mismatch. |
| Three | Dev source reports 0.187.0 and separate addons/WebGPU exports. [Manifest](https://raw.githubusercontent.com/mrdoob/three.js/dev/package.json) | A dev branch is not an approved release. Select a released revision and matching types; verify loader/material/color APIs. |
| Vite/plugin-react | Vite source Node `^20.19.0 || >=22.12.0`; plugin-react source requires Vite `^8.0.0` and same Node range. [Vite](https://raw.githubusercontent.com/vitejs/vite/main/packages/vite/package.json), [plugin](https://raw.githubusercontent.com/vitejs/vite-plugin-react/main/packages/plugin-react/package.json) | Select a released compatible pair if using plain Vite. Avoid copying old plugin configs. |
| React Router alternative | Main source router peers require React/DOM `>=19.2.7`, optional types `>=19.2.0`, Node `>=22.22.0`. Dev source allows Vite `^7 || ^8`, TS `^5.1 || ^6 || ^7`, with workspace placeholders for router packages. [Router](https://raw.githubusercontent.com/remix-run/react-router/main/packages/react-router/package.json), [tooling](https://raw.githubusercontent.com/remix-run/react-router/main/packages/react-router-dev/package.json) | Verify published matching router/tooling releases. Source intersection with Fiber is React `>=19.2.7 <19.4`; this is not an installed compatibility guarantee. |
| Motion/GSAP | Peers and separate terms in Finding 7. | Optional; verify selected release exports and terms when adopting. |

## Reference repositories: three inspected, plus Fiber

Repository source and license access are confirmed below. Interactive demo functionality is not confirmed.

| Reference | Inspected structure and relevance | License verification | Demo and activity evidence / limitation |
| --- | --- | --- | --- |
| [pmndrs/react-three-next](https://github.com/pmndrs/react-three-next) | Client DOM layout dynamically imports Scene; Scene supplies canvas/portal outlet; View tracks a DOM ref with optional controls. [Layout](https://raw.githubusercontent.com/pmndrs/react-three-next/main/src/components/dom/Layout.jsx), [Scene](https://raw.githubusercontent.com/pmndrs/react-three-next/main/src/components/canvas/Scene.jsx), [View](https://raw.githubusercontent.com/pmndrs/react-three-next/main/src/components/canvas/View.jsx) | [LICENSE fetched](https://raw.githubusercontent.com/pmndrs/react-three-next/main/LICENSE): MIT-form text; manifest identifies MIT. Preserve notices for reused code. | [Listed demo](https://react-three-next.vercel.app/) fetch failed UnexpectedStatusCode. [History](https://github.com/pmndrs/react-three-next/commits/main/) newest visible 2024-04-21. Borrow separation; reject old dependency copying, eager preload-all, and global persistence for this brief. README speed/Lighthouse claims were not reproduced. |
| [pmndrs/drei](https://github.com/pmndrs/drei) | `src/web/View.tsx`: viewport bounds, scissor rendering, visibility checks, event connection handling. [Source](https://raw.githubusercontent.com/pmndrs/drei/master/src/web/View.tsx) | [LICENSE fetched](https://raw.githubusercontent.com/pmndrs/drei/master/LICENSE): MIT. Does not clear example model rights. | [View docs/example fetched](https://drei.docs.pmnd.rs/portals/view), not browser executed. [Releases](https://github.com/pmndrs/drei/releases) show 2026-09-25 stable activity. Inline Views improve on the starter's deprecated tracking API. |
| [mrdoob/three.js](https://github.com/mrdoob/three.js) | `examples/webgl_multiple_elements.html`: one renderer, scene/camera pairs, bounds checks, viewport/scissor regions. [Source](https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/webgl_multiple_elements.html) | [LICENSE fetched](https://raw.githubusercontent.com/mrdoob/three.js/dev/LICENSE): MIT. Procedural example does not clear unrelated bundled models. | [Demo HTML fetched](https://threejs.org/examples/webgl_multiple_elements.html): text shell only, no WebGL execution. [Cached history](https://github.com/mrdoob/three.js/commits/dev/) shows 2026-09-11 activity, not guaranteed newest. Useful imperative comparison; don't copy its zoom-restricting viewport policy or uncapped DPR. |
| [pmndrs/react-three-fiber](https://github.com/pmndrs/react-three-fiber) | Renderer manifest, Canvas/testing docs, introduction, release cleanup notes. | [LICENSE fetched](https://raw.githubusercontent.com/pmndrs/react-three-fiber/master/LICENSE): MIT. | [Release history](https://github.com/pmndrs/react-three-fiber/releases) shows 2026-10-15 stable activity. Component/lifecycle reference, not a complete portfolio architecture; no demo executed. |

## Future folder/component tree — text proposal only

No files or directories below were created. Names identify boundaries, not scaffolding instructions.

```text
src/
  app/
    layout.tsx                     semantic shell, metadata; server
    page.tsx                       homepage text, links, posters; server
    robotics/page.tsx              semantic section; server
    about/page.tsx                 semantic section; server
    photography/page.tsx           semantic section; server
    projects/page.tsx              project index; server
    projects/[slug]/page.tsx       static params + case study; server
    not-found.tsx
  content/
    sections.ts                    serializable route/object mapping
    projects/                      authored records and structured body
    schema.ts                      content validation contract
  components/
    SiteHeader.tsx
    PortalCard.tsx                 real link, label, poster
    CaseStudy.tsx                  article, headings, evidence, links
    MediaFigure.tsx
  features/home/
    HomeEnhancement.client.tsx     policy, visibility, dynamic import
    scene/HomeCanvas.tsx           sole renderer/root and views
    scene/ObjectSlot.tsx           camera/bounds/error boundary
    objects/robot/                 RobotObject + own motion adapter
    objects/basketball/            BasketballObject + own adapter
    objects/camera/                CameraObject + own adapter
    objects/microchip/             MicrochipObject + own adapter
    motion/contracts.ts            events, policy, cancellation
    motion/visualMachine.ts        visual reducer; never route authority
    assets/manifest.ts             asset IDs, bounds, provenance references
  navigation/
    PortalLink.client.tsx          optional visual notifications
    routeManifest.ts               canonical URLs shared with content
  styles/
tests/
  content-contracts/               schema/slugs/route integrity
  navigation/                    cancellation + link behavior
  browser/                       direct routes + fallbacks
public/
  posters/                       static representations
  models/                        approved, optimized models only
  media/                         case-study image variants
```

In the Vite alternative, replace `app/` route entries with React Router route modules and its prerender configuration; retain content, objects, and presentation boundaries. Do not use experimental RSC tooling merely to mimic Next.

## Route and content schema — proposed contract

| URL | Object | Semantic output and source of truth |
| --- | --- | --- |
| `/` | All four | Introduction, four named links/posters, project/contact shortcuts; canvas optional. |
| `/robotics` | Robot | Robotics overview, evidence, links to relevant canonical project case studies. |
| `/about` | Basketball | Personal/about narrative; basketball stays local to this section. |
| `/photography` | Camera | Creative work, captions, image descriptions and rights records. |
| `/projects` | Microchip | Readable project list, summaries, technology/context, case-study links. |
| `/projects/[slug]` | None required | One canonical article per published slug, even if linked from robotics. |

`SectionRecord`: stable section ID, object ID, exact href, visible label, summary, ordering, poster asset/alt policy, and optional referenced project IDs. Keep the route/object mapping serializable; it must not import object components or animation libraries.

`ProjectRecord`: stable ID, unique URL-safe slug, title, summary, publish status, section tags, dates, role/team contributions, problem, constraints, approach, technical architecture, evidence-backed outcomes, limitations, repository/demo link records, media records, and SEO title/description. Proposed body blocks: paragraphs, headings, lists, figures, diagrams, and code excerpts; render to semantic article elements. Prefer structured local content initially; MDX is optional only if authoring needs justify its build/plugin cost.

`MediaRecord`: local/approved source, kind, dimensions, alt text or explicit decorative status, caption, creator, source URL, license URL, attribution text, and verification state/date. `LinkRecord`: purpose, absolute URL, verification date, and status; never invent a demo link.

Validate at build time: duplicate slugs/IDs, missing required fields/alt choices, broken section references, invalid URL shapes, unpublished links, and missing media provenance. Enumerate only published slugs. Candidate project names in the brief remain drafts until copy/links are confirmed; do not infer outcomes. Project metadata/body rendering cannot import the scene.

## Object, motion, and navigation contracts — proposals, no implementation

**Shared input contract:** `ObjectId` is robot/basketball/camera/microchip. `ObjectPresentation` contains ID, bounds/placement, camera framing reference, and approved asset ID. `MotionPolicy` contains reduced-motion preference, page visibility, in-viewport status, and quality tier. `ObjectIntent` contains hover, focus, activation, cancel, and reset events with a monotonically increasing interaction token. These are interface descriptions, not executable code.

**Module boundary:** Each independently imported object exports its presentation component plus an optional visual controller. Controller operations are preview, accent, cancel, reset, and dispose. Each operation receives the current token and cancellation signal. Optional asynchronous operations settle as finished/cancelled/failed; navigation never awaits them. Modules report readiness/failure to the slot only. They cannot import the router, choose URLs, modify document scroll/focus, create a second renderer, or install global handlers. Keep camera policy in the slot; keep clip/mixer details inside the object.

**Single owner per property:** A model clip may own skeletal joints while the object adapter owns the containing group's position. Never simultaneously tween the same group transform through a clip, GSAP, and frame callback. Each module documents private versus shared assets. Cache references must survive until the last consumer releases them.

**Anchor activation:** Render real anchors with exact hrefs before hydration, optionally through the framework Link. Prefer the DOM card/slot as the activation surface, with canvas decorative and no independent mesh navigation; pointer/focus notifications may animate the corresponding object. If mesh hover is needed, forward hover intent only. Preserve context menus, copying links, middle clicks, Ctrl/Cmd/Shift/Alt clicks, non-primary buttons, `target`, downloads, and external URLs. Do not call `preventDefault`, synthesize a second click, or invoke router push alongside Link. An already-prevented event must not trigger custom activation. Next's `onNavigate` can notify visual state for its eligible navigations; it must not delay them. [Link semantics](https://nextjs.org/docs/app/api-reference/components/link)

**Keyboard/touch:** Tab focuses the actual link; Enter follows it. Focus and hover can share a preview state. Space retains native anchor behavior, with no invented button handling. Touch taps follow the link without a first-tap hover gate. Keep focus indicators, labels, and direct text navigation independent of asset readiness.

**Visual state machine:** `unavailable → loading → idle ↔ preview → accenting`; cancellation returns a mounted object to idle/static, failure returns its slot to a poster, disposal is terminal. Hover/focus changes update presentation only. Activation first cancels earlier work, increments the token, and may start a finite accent while the link routes in the same event turn. The router remains the sole route authority. No `await`, exit-complete listener, timer, Suspense resolution, or model load sits on the navigation path. If destination/route work is slow, keep readable UI and ordinary links usable; do not install a visual loading overlay.

**Cancellation:** A newer activation, route change, Back/Forward, homepage unmount, Escape/skip-motion action, preference change, or rendering failure invalidates the current token and aborts visual work. Promise callbacks must check both token and mounted state; stale callbacks cannot navigate, restore focus, or change state. Dynamic import itself may be uncancellable: ignore late results after disposal rather than claiming its network request was aborted.

**Cleanup:** On cancel/unmount stop owned timelines/actions/frame scheduling, remove listeners/observers, clear timers, release pointer capture if owned, unsubscribe preference listeners, and reset owned transforms when still mounted. GSAP handlers require context tracking (`useGSAP`/`contextSafe`) and event listener removal; timeline kill is available. [GSAP React cleanup](https://gsap.com/resources/React/), [timeline kill](https://gsap.com/docs/v3/GSAP/Timeline/kill()/) Motion's scoped animations clean up on unmount, but shared cancellation tokens still govern stale async continuations. [useAnimate](https://motion.dev/docs/react-use-animate) Stop mixer actions before releasing owned mixer caches; dispose private resources and retain shared resources until their last consumer releases them. [Mixer](https://threejs.org/docs/pages/AnimationMixer.html), [resource cleanup](https://threejs.org/manual/pages/cleanup.html)

**Reduced motion/failure:** Initial HTML contains posters and links. Incorporating lead's proposed policy: mobile starts with posters and an explicit Enable 3D control; desktop enhancement is deferred; reduced motion remains static. Do not import the mobile scene before opt-in, or auto-enable it merely because a link receives focus. User-agent detection alone should not decide capability; the exact responsive/input policy belongs in the approved visual/performance plan. Policy changes cancel current motion immediately. Motion documents responding to preference changes, if used. [Reduced-motion hook](https://motion.dev/docs/react-use-reduced-motion) WebGL unsupported/context failure/model failure replaces visuals, never article content or navigation; Canvas offers fallback and error-boundary guidance. [Canvas docs](https://r3f.docs.pmnd.rs/api/canvas)

**Server/client split:** Semantic pages, content validation, and slug enumeration run during build. Client-only policy/controller work is confined to the homepage enhancement and tiny link notification adapters. Do not mark root layout or case-study renderer client-only to accommodate the scene. No runtime API, CMS, global state store, or cross-route GPU persistence is required by the current brief.

## Testing and dependency lock strategy — future work only

After explicit implementation approval, select a supported Node release satisfying the chosen toolchain, record its exact version and package manager, inspect published peers/engines/licenses/exports, and choose stable intersecting releases. Pin the tested direct dependency set and maintain one lockfile; align React/DOM and type packages, avoid duplicate Three copies, and do not suppress peer errors through force/legacy-peer flags. Recheck package provenance and transitive notices from the installed lock graph. Use clean CI installs (`npm ci` if npm is chosen), which reject package/lock mismatch rather than rewriting the lock. [npm docs](https://docs.npmjs.com/cli/commands/npm-ci/)

Keep framework/React/Fiber/Drei/Three upgrades grouped for review when coupled; upgrade motion separately unless required. Source snapshots above do not substitute for a clean install, typecheck, build, route export inspection, and robot smoke test. Do not blindly install every package named in this report. Tests below verify real requirements rather than component shape.

| Check after approval | Evidence required to accept |
| --- | --- |
| Content/build | Published slugs all generated; duplicate/invalid records fail; direct HTML includes article heading/body and links with JS disabled; unknown paths produce 404. |
| Link/navigation | All exact base routes and a project URL survive direct request/refresh. Primary click, keyboard Enter, touch, modified/middle click, context menu, external/download links work normally. No doubled history entry. |
| Cancellation | Repeated rapid activations, Back/Forward, unmount during loading/animation, Escape/skip, reduced-motion change, and late completion cannot trigger stale navigation or state changes. Cleanup is idempotent under development Strict Mode. |
| Enhancement isolation | Direct case-study requests do not fetch scene/model chunks; lazy homepage import is observed in production network output, not inferred from syntax. Block JS, model request, or WebGL and verify navigation/content remains usable. |
| Resources | Repeated home/section navigation releases listeners/timers/private resources; monitor renderer/resource counts and browser memory trends without assuming all caches must hit zero. One live renderer on home, none required on content routes. |
| Robot behavior | Focus/hover/touch, finite idle, clipping/scroll bounds, poster failure, keyboard access; real selected assets and approved art direction. |
| Performance | Record device/browser, production build, network conditions, cold/warm runs, transferred bytes, responsiveness, frame timing while active, and idle/hidden rendering. Performance agent/lead define budgets; none are claimed achieved here. |

Use browser end-to-end tests for route/DOM behavior and assertions on URLs, focus, visibility, and semantics. [Playwright assertions](https://playwright.dev/docs/test-assertions) Optional R3F test renderer can cover selected object interaction contracts; it does not prove WebGL, visual quality, or device performance. [R3F testing](https://r3f.docs.pmnd.rs/api/testing) Browser emulation does not replace actual mobile hardware testing. No test commands above were executed in this research pass.

## Lead-supplied budget integration — targets, not measurements

Lead supplied a proposed initial shell ceiling of 300 KiB: HTML/CSS 60, initial JS 80, fonts 60, posters 100. Deferred robot allowance is 1.5 MiB, with renderer JS 350 KiB, GLB 900 KiB, and environment 250 KiB. These are project targets supplied during integration, not source-reported framework sizes or results from this research. Renderer allocation should include all deferred scene JS, including Fiber/Drei and any added motion code; avoid counting only the Three entry point.

Treat the **80 KiB initial JS allocation as a diagnostic target until a production static-export baseline is measured**. The shell's Next runtime/hydration contribution is unknown here; no claim of feasibility follows from Server Components or lazy imports. Keep the total target visible. Lead can then approve it as a hard gate, reduce client scope, change framework, or revise an allocation based on recorded evidence. A Vite alternative also requires equivalent semantic output and measurements; it is not automatically smaller. Agree on compressed-transfer versus decoded size and initial-load cutoff before comparing. This does not relax navigation, static-content, opt-in, or cancellation requirements.

After approval, measure shell with enhancement disabled, then inspect cold homepage and direct-project requests, then opt-in robot transfer separately. Include HTML/RSC payload where actually transferred, fonts/posters, preload/prefetch effects, and every transitive scene chunk. Reject accidental eager model downloads. No bundle measurements have been performed; proposed mobile poster/Enable 3D and deferred desktop loading should be tested in the production network trace.

## License boundaries

Fetched primary license texts identify [React](https://raw.githubusercontent.com/facebook/react/main/LICENSE), [Next](https://raw.githubusercontent.com/vercel/next.js/v16.4.3/license.md), [Vite](https://raw.githubusercontent.com/vitejs/vite/main/LICENSE), [React Router](https://raw.githubusercontent.com/remix-run/react-router/main/LICENSE.md), Fiber, Drei, Three, and Motion as MIT; [TypeScript](https://raw.githubusercontent.com/microsoft/TypeScript/main/LICENSE.txt) uses Apache 2.0. GSAP uses its own standard license, recorded above. This is source-license verification, not a completed dependency/asset clearance. Preserve applicable notices when reusing code and review the actual installed packages later.

Models, textures, HDR environments, fonts, photographs, audio, animation clips, and example branding have independent rights. A repo's MIT code license does not grant rights to every linked/bundled asset. Asset provenance and any attribution/commercial restrictions must be supplied by the asset track before adoption. No model was downloaded or licensed by this research.

## Uncertainties and exact next steps for lead

1. Integrate the Next static-export recommendation and Vite/prerender alternative into synthesis as **proposed**. Preserve base URLs exactly. No shared file was edited by this agent.
2. Review the visual contract: motion never gates navigation, long departure flourishes may be cancelled, one homepage renderer, independent object modules, static semantic content.
3. Combine asset and performance findings: identify the approved robot's rights, rig/clip availability, poster, bounds, texture/decoder needs, target devices, and budgets. These remain unknown here.
4. Obtain the existing research/visual/prototype approvals through the lead's gates. This handoff authorizes no implementation and does not ask the user to decide preferences mid-research.
5. Only after approval, implement the scoped robot gate, select and lock a tested stable dependency set, produce static deep-link output, and execute the meaningful checks above. Do not expand to four objects before gate review.

Unresolved: published Fiber/Drei metadata mismatch, real installed package graph and TS compatibility, cached repo-history freshness, failed starter demo access, chosen host's clean-URL/404/image behavior, asset readiness, cross-browser/mobile behavior, and every performance result. None blocks research synthesis; all relevant implementation claims remain pending evidence.

## Phase 2 amendment — authorized robot proof, 2026-11-01

This addendum supersedes conflicting Phase 1 proposals above for the bounded robot proof only. User Phase 2 authorization and lead decision D-010 approve provisional Field Notes, Next static export with React/TypeScript and R3F/Drei, RobotExpressive, accessible fallbacks, and the interaction scope in `docs/PHASE_2_IMPLEMENTATION_PLAN.md`. Earlier approval-pending/research-only statements remain historical. This specialist may append only its three owned Markdown files and perform a later requested read-only implementation review. Lead owns app/setup execution; no full portfolio, additional objects, deployment, or concurrent specialist browser session is authorized.

### Published compatibility selection and rationale

**Evidence level:** Lead/user-reported output from escalated-network `npm view` queries, supplied directly in the Phase 2 assignment. I have not independently rerun these queries or inspected an installed lock graph. The linked registry endpoints identify the exact published metadata to which the report refers; this addendum does not claim they were independently fetched by this specialist during Phase 2. No successful install, typecheck, build, static export, browser test, or benchmark has been reported at this checkpoint.

| Selected dependency/runtime | Lead-reported published constraint or choice | Compatibility rationale and remaining verification |
| --- | --- | --- |
| Next 16.4.3 | Node `>=20.9.0`; React 19 allowed. [Exact registry metadata](https://registry.npmjs.org/next/16.4.3) | Stable released framework for the approved static export. Node 24.13.1 exceeds the reported minimum. Successful runtime/build support still requires the actual graph and export checks. |
| React + ReactDOM 19.3.1 | Matching selected releases. [React](https://registry.npmjs.org/react/19.3.1), [ReactDOM](https://registry.npmjs.org/react-dom/19.3.1) | 19.3.1 lies in Fiber's reported `>=19 <19.4` range and Drei's `^19` range. Align both packages; do not widen to a future React release without checking the renderer again. |
| Fiber 9.8.2 | React `>=19 <19.4`; Three `>=0.156`. [Registry metadata](https://registry.npmjs.org/@react-three%2Ffiber/9.8.2) | Selected stable Fiber 9 fits React 19.3.1. Published metadata provides the selection evidence that the Phase 1 source-manifest version mismatch could not supply. It does not itself prove installed/runtime compatibility. |
| Drei 10.7.9 | React `^19`; Fiber `^9`; Three `>=0.159`. [Registry metadata](https://registry.npmjs.org/@react-three%2Fdrei/10.7.9) | React 19.3.1 and Fiber 9.8.2 satisfy the reported peers. Exact published release avoids treating Drei's repository semantic-release placeholder as a package version. |
| Three 0.187.0 | Selected published release. [Registry metadata](https://registry.npmjs.org/three/0.187.0) | Satisfies both reported minimum peers. Broad peers do not guarantee every material/loader/helper API; actual robot loading, rendering, type compatibility and cleanup remain to verify. No WebGPU preview adoption follows from this choice. |
| `@types/react` / `@types/react-dom` 19.3.0 | Selected React 19 type packages. [React types](https://registry.npmjs.org/@types%2Freact/19.3.0), [DOM types](https://registry.npmjs.org/@types%2Freact-dom/19.3.0) | Same React major/minor API line as runtime; type package patch need not equal runtime patch. Installed typecheck must establish actual compatibility; also inspect the selected Three type package if required. |
| TypeScript 5.9.3 | Deliberate selection rather than newly latest 7. [Registry metadata](https://registry.npmjs.org/typescript/5.9.3) | Limits the robot proof to a familiar compiler line rather than combining renderer/framework validation with a compiler-major migration. This is scope/risk judgment, not a measured superiority claim. Verify Next/generated types and TS configuration with the installed compiler. |
| Playwright 1.64.1 | Selected browser test tooling. [Registry metadata](https://registry.npmjs.org/@playwright%2Ftest/1.64.1) | Test-only dependency; no reason for it to enter client bundles. Check its actual engine/browser requirements during lead setup; no successful browser install or run is assumed. |
| Node 24.13.1 | Lead-reported execution runtime. | Satisfies the reported Next minimum. Record runtime/package-manager versions with eventual evidence; optional/native dependency and test-runner compatibility remain install/runtime checks. |

The reported React/Fiber/Drei/Three peer intersection is coherent for these selected releases. Record **selected from published metadata**, not **tested compatible**. Lead should pin the selected direct dependencies, retain one lockfile, inspect the resolved graph for duplicates/peer errors, and report exact install/typecheck/build/export outcomes before those states are marked passing. No GSAP, Motion, physics, other object modules, CMS or production server is justified by this proof. Code/model licenses and exact model provenance remain separate obligations; published package peers grant no model rights.

### Phase 2 behavior overrides and review criteria

1. **Scope and semantics:** Review only the robot proof at `/` plus standalone `/robotics/`, the ordinary link, inline placeholder, fallback, and evidence/tests. The earlier Phase 1 suggestion of a `/projects/[slug]` fixture is not required for this now-approved narrower proof and must not expand its scope. Other destinations/content remain future work.
2. **Native button and separate anchor:** A native specimen button triggers the inline reveal by click, Enter, and Space once each. Preserve native keyboard activation; reject custom key handlers that duplicate the browser's synthesized activation. The button has a stable accessible name and accurate `aria-expanded`/`aria-controls`; reveal/reset does not navigate or steal focus unexpectedly. A separate ordinary Robotics anchor always reaches `/robotics/`, retaining modified/middle-click, context-menu and copy-link behavior. Do not give an anchor artificial Space/button semantics. Links never wait for a scene, clip, timer, or reveal completion.
3. **Natural idle now allowed:** User-requested subtle breathing supersedes the Phase 1 finite-idle-only recommendation. Provide a persistent, reachable Pause motion control with correct current state; explicit pause survives reveal/reset/loading transitions. Resume is deliberate. Visibility suspension must not erase a user pause or resume unexpectedly. Paused, hidden, offscreen and reduced-motion states disable continuous motion; reduced motion has no animated transforms. Finite attention/activation feedback must respect the same policy. Continuous idle requires frames only while policy permits it.
4. **One lazy canvas:** Confirm a single Canvas/renderer in the robot enhancement and no global scene import in layout, static content, shared barrels, or standalone robotics route. SSR-disabled dynamic import belongs inside the client wrapper. Mobile starts static and only requests 3D after Enable 3D; reduced-motion fallback is not overridden by opt-in. Reveal and direct link remain usable before opt-in, while loading, and after failure. Production network traces, supplied by lead, must verify request isolation; source syntax alone is insufficient.
5. **Inline reveal is immediate:** The placeholder becomes usable independently of optional visual feedback. Activation/repeated reveal, Escape/reset, pause, and navigation cannot queue stale reveal timers or deferred route actions. Any model/animation feedback settles or cancels without determining semantic UI readiness. A late import/model result cannot reset current reveal/pause policy or remount a disposed scene.
6. **Lifecycle and failure:** Inspect error boundary, timeout, asset failure, unavailable WebGL and context-loss handling; static artwork and controls remain. Ensure effect/listener/observer/timer/frame/mixer cleanup is idempotent under Strict Mode, and pending work cannot update disposed state. Model clones/material tint must not mutate or dispose shared cached loader resources incorrectly; skeletal cloning must preserve independent animation state. Context failure should stop work rather than enter an unbounded retry/render loop.
7. **Evidence and limits:** Review pure policy tests and browser scenarios against actual behavior, including Enter/Space exactly once, separate link, reduced-motion changes, pause/visibility, repeated reveal/reset and direct no-JS robotics output. Independently inspected code and lead-reported test results receive separate labels. I will not run a browser concurrently or claim actual mobile/frame/GPU results from static code inspection. Numeric budgets remain diagnostic until recorded measurements; full-site/deployment approval remains absent.

### Exact read-only code review plan

Wait for lead's explicit review checkpoint rather than racing actively changing files. Then read `package.json`, lockfile/configs and the scoped `src/app`/`src/features/robot` files plus tests, asset provenance and lead evidence documents. Compare the resolved dependency graph and client import boundaries to the selected metadata above; inspect reducer/policy wiring, native semantics and lifecycle paths in the complete component context. Follow imports to identify duplicate Canvas, eager model transfer, callback races or shared-resource ownership defects.

Report actionable findings ordered by severity, with exact file/line references, trigger, impact, and a focused suggested correction. Distinguish a confirmed static defect from a test gap or unverified hypothesis. Record a no-findings result only after reading the full scoped app, and still state runtime/device limits. Send findings to lead through this handoff/update or direct response; do not patch application/shared files. Re-review lead fixes only when asked and retain earlier findings/resolution history. No browser or mutating install/build/test command is part of this specialist's present preparation assignment.

## Independent Phase 2 code review — 2026-11-01 05:04:29 UTC

**Verdict:** Three P2 correctness findings require lead attention before robot sign-off. No P0/P1 issue identified in this scoped read. Findings below describe the inspected snapshot; no application/shared file was modified, no browser was launched, and no fresh build or application test suite was run. Reproduction instructions are proposed lead checks unless explicitly labeled as the memory-only Node experiment that I actually ran.

**Scope inspected:** Full `src/app` pages/layout/CSS, `RobotSpecimen.tsx`, `RobotScene.tsx`, `interaction.ts`, both test files, `scripts/serve.mjs`, package/lock/configs, asset manifest/notice, generated home/robotics HTML, and relevant installed Fiber/Drei/suspend-react/Three code. Snapshot SHA-256: RobotSpecimen `84e7070e8887d80d9d8ad15266db4fd216759c397498df36cbad67044be2d462`; RobotScene `000194635287889fad66423512bd1838429fdec9aa2e0f463c2c7d17d9a96f66`; interaction `7582eca31378866b7e8317ef0272f652882112765b12569ea19180e10a6048f4`; browser tests `cec28b3f71ee8314f0c904124b664d9da518a3ba95543379480300917b41b7a7`. No Git repository exists; hashes identify the reviewed state while lead works.

### A-R1 — P2: Retry 3D retains the failed loader cache

- **Location:** `src/features/robot/RobotSpecimen.tsx:97` retry handler and `src/features/robot/RobotScene.tsx:20` fixed `useGLTF` URL.
- **Trigger/reproduction for lead:** Abort the first GLB request, wait for explicit failure, restore network access, then click Retry 3D without reloading the page. Expect a new GLB attempt and live scene; current retry only updates enable/attempt/boundary state, so it reaches the same rejected cached loader entry and fails again.
- **Independent evidence:** Installed Drei `core/Gltf.js:28` exposes `useGLTF.clear`. Fiber `dist/events-e51d7528.esm.js:1468–1491` caches by loader and URL via `suspend-react`; installed `suspend-react/index.cjs.js:30` rethrows a stored error. No cache clearing or changed loader key exists in app source.
- **Executed memory-only reproduction:** An inline Node process used the installed `suspend-react` with a rejected promise and a unique in-memory key. Two subsequent same-key calls both threw the cached failure while loader invocation count stayed **1**. The probe entry was cleared before exit; no network/app/browser/files were involved.
- **Impact:** Advertised recovery from a transient asset failure is ineffective until a full page reload; retrying the boundary is not retrying the request.
- **Focused correction:** Clear the failed GLTF cache entry before the explicit retry reaches `useGLTF`, keeping that loader operation inside the lazy scene module so the fallback/control shell does not eagerly import Three/Drei. Preserve successful cached assets and explicit pause state. Add a fail-once/succeed-on-retry regression that asserts a second request and Live specimen.
- **Verification level:** Confirmed source/cache behavior plus executed dependency-only CPU probe; complete browser scenario not run. **Status:** Open; lead correction/re-review pending.

### A-R2 — P2: Strict Mode cleanup permanently stops the authored idle

- **Location:** `src/features/robot/RobotScene.tsx:27–63`, especially starting Idle at 52–54 and cleanup-only effect at 59–63; Strict Mode enabled in `next.config.ts:7`.
- **Trigger/reproduction for lead:** Run the development app with its configured Strict Mode, load the model, and inspect the Idle mixer action after effect replay. The memo prepares/plays it; cleanup stops all actions and uncaches the root; the replayed effect setup only returns another cleanup and never reacquires/plays Idle. Group breathing still moves, which can mask the missing model animation.
- **Independent evidence:** Installed Fiber's `useBridge` propagates parent Strict Mode into the canvas tree (`events-e51d7528.esm.js:66–83`). Three's `stopAllAction` and `uncacheRoot` remove active actions/bindings. Earlier official [React effect documentation](https://react.dev/reference/react/useEffect) establishes the development setup/cleanup replay rule.
- **Executed memory-only reproduction:** Inline Node created an installed Three `AnimationMixer` and simple Idle clip. Before cleanup, active actions = **1**, animated x = **0.1**. After the app's stop/uncache sequence and another update with no new play/setup, active actions = **0**, x remained at restored **0**. This confirms mixer semantics, not an observed browser replay.
- **Impact:** Development no longer represents the intended authored idle after Strict Mode replay; a production-only browser suite does not catch it. Disposing mounted cloned materials in the same replay also makes setup/cleanup asymmetry harder to reason about.
- **Focused correction:** Make resource/action activation symmetric with effect setup and cleanup: setup must reestablish the Idle action that cleanup stops/uncaches. Keep ownership of cloned materials and shared cached geometry explicit; do not simply suppress Strict Mode. Verify replay and final unmount, including that resumed effects have a live action and final cleanup removes it.
- **Verification level:** Confirmed source lifecycle defect plus executed dependency-only CPU probe; development browser reproduction not run. **Status:** Open; lead correction/re-review pending.

### A-R3 — P2: Suspended first-frame readiness can cause a false load failure

- **Location:** `src/features/robot/RobotSpecimen.tsx:52–61` loading deadline, `RobotScene.tsx:86` readiness in `useFrame`, and `RobotScene.tsx:96` suspended `frameloop="never"`.
- **Trigger/reproduction for lead:** On desktop, start a delayed but successful scene/model load, then make the specimen offscreen or the document hidden before its first model frame. Leave it suspended beyond the 10-second deadline, then return. A healthy loaded model has not been allowed to call its first-frame onReady; the timeout converts loading to failed and unmounts the scene.
- **Independent evidence:** The timeout is based on wall-clock loading state, independent of visibility/suspension. The only onReady call is inside the frame subscriber. Installed Fiber's `invalidate` explicitly returns for `frameloop === "never"` (`events-e51d7528.esm.js:17586–17591`), so its frame cannot satisfy readiness while suspended. Background timer throttling may alter exact timing; the foreground offscreen case avoids that uncertainty.
- **Impact:** Intended automatic suspension is misreported as an asset/WebGL failure and requires manual retry. This can combine with A-R1 if an actual request rejection also occurred.
- **Focused correction:** Distinguish asset/setup readiness from first visible draw, or pause/qualify the readiness deadline while no frame is permitted. Preserve a real failure/timeout fallback and avoid a readiness effect that invalidates indefinitely. Add a delayed-success + offscreen-resume check that does not enter the failure state.
- **Verification level:** Confirmed source state/timing mismatch with installed frame-loop implementation checked; browser timing scenario not run. **Status:** Open; lead correction/re-review pending.

### Validation gaps — distinct from the three code defects

`tests/prototype.spec.ts:48–69` accepts Static specimen without proving the failure path was exercised: that text is also the initial SSR/hydration state. Assert an actual GLB attempt for the model-failure case and the explicit failure note/Retry control before checking preserved poster/reveal/navigation. A retry regression is absent. This is a test-evidence gap, not a claim that all fallback paths fail.

`tests/prototype.spec.ts:72–81` checks pause button labeling and reduced-motion unmount, but not paused frame/mixer behavior, pause preservation across remount, hidden/offscreen draw suspension or loading-time suspension. There is no context-loss or load-timeout test, no rapid reveal/reset/Escape regression, and the direct-route test checks GLB requests but not renderer chunks. The pure policy test establishes booleans, not component/frame-loop wiring. Have lead add focused scenarios for actual defects and critical stated acceptance paths; no broad unrelated testing or design expansion is requested.

### Independently confirmed structure and evidence limits

- The specimen is a native button with onClick only, no custom Enter/Space click synthesis (`RobotSpecimen.tsx:91`); separate ordinary Robotics anchors have immediate native hrefs (75, 80). Reveal is reducer-driven immediately, focus moves once to its heading (63–65), and reset returns focus to the specimen (67). Repeated activate while open does not increment activation (`interaction.ts:24–27`). No timer gates reveal or navigation.
- `canAnimate` combines reduced/paused/visible/inView; the component wires preference, visibility and intersection listeners with cleanup. Reduced-motion removes the scene; pause state is separate from reveal/reset and retained on preference toggles within the mounted component. Canvas switches always/demand/never according to policy. No continuous idle violation is inferred solely from code; frame/device measurements remain pending.
- Only one application Canvas is present (`RobotScene.tsx:96`), imported through the homepage client's SSR-disabled dynamic boundary. No scene/model import occurs in root layout or standalone robotics source. The temporary WebGL capability probe is detached and explicitly loses its context; it is not a second persistent scene renderer. Actual deferred request isolation still needs a production trace.
- Source error boundary, load timeout and context-loss listener preserve semantic controls/poster on failure; context listener removes itself on cleanup. Cloning/tinting allocates separate materials and preserves shared cached geometry; custom cleanup stops/uncaches the mixer and disposes those private materials, subject to A-R2. No unmeasured GPU leak is asserted. Skeleton texture lifecycle is not independently exercised; final renderer/context teardown must be covered by lead runtime evidence.
- Read-only inspection of existing `out/index.html` found its h1, poster and Robotics href; `out/robotics/index.html` contains its independent h1 and lacks homepage page-script inclusion in its script list. These are inspected generated artifacts, not a fresh successful build claim, no-JS browser walkthrough, or network proof. Static server uses directory index files and genuine 404 status on missing files. No server/browser was launched by this review.
- Independently read package-lock direct entries match package pins, including `@types/three` 0.187.0. Lead reports clean installed `npm ls`, 94 packages/0 audit vulnerabilities and the corrected test-harness annotation; I did not repeat installation/audit or infer a later build result.
- Independently measured local GLB bytes = **463988**, SHA-256 `047f5e5fb3bb6d378bd1df16ca6137f2a596c99b3a1b5690b4020c05aaf6f319`, matching manifest. Direct GLB JSON chunk inspection found **0 images, 0 textures, no external buffer/image URI fields**. Retained model-specific CC0 notice and pinned manifest inspected. This does not measure runtime GPU texture allocations or validate animated appearance/bounds.

**Exact next step:** Lead corrects A-R1/A-R2/A-R3, adds targeted regression evidence, and requests re-review of changed files. Architecture specialist edits only its research/update/handoff; all app fixes, builds and browser runs remain lead-owned. Full portfolio and deployment remain unauthorized.

## Recovery fix re-review — 2026-11-01 05:08:39 UTC

**Updated disposition:** A-R1 is corrected in inspected source, awaiting a trustworthy recovery-regression rerun. A-R2 and A-R3 remain P2/open in this snapshot. This entry supersedes the earlier all-three-open disposition without removing history. No app edits, browser runs or builds performed by this specialist.

**A-R1 source correction independently checked:** `RobotScene.tsx:19–21` now exports `clearRobotAsset()` calling `useGLTF.clear` for the same GLB URL. `RobotSpecimen.tsx:70–78` clears failed presentation to poster, dynamically imports the scene module, checks `mounted.current`, clears the failed loader entry, then increments attempt. Component effect setup/cleanup maintains the mounted guard (34–45). This ordering removes the rejected-entry reuse identified by A-R1 while keeping Three/Drei in the lazy module. Native anchor/inline reveal remains independent, and the app still has a single Canvas at `RobotScene.tsx:101`. No new confirmed app defect found in this bounded retry fix. Do not call recovery browser-verified until the rerun actually passes.

**Recovery test race to correct:** `tests/prototype.spec.ts:75–81` currently waits for Static specimen before removing the abort route. Static specimen is also the initial SSR state, so the test can remove its failure injection before the first GLB request is rejected, then wait for a Retry button that never appears. Keep interception installed until Retry 3D or the explicit unavailable note appears; then unroute and click Retry. Prefer also asserting a failed attempt and a subsequent successful request. This is a validation race, not evidence that the new cache-clear source fix fails.

**Remaining A-R2:** `RobotScene.tsx:56–67` still starts Idle only in the memo and has a cleanup-only effect that stops/uncaches it. No setup restart was added. The development Strict Mode reproduction and focused correction from A-R2 remain applicable; group breathing or production-suite passes do not establish authored Idle replay correctness.

**Remaining A-R3:** `RobotSpecimen.tsx:54–63` still runs the 10-second loading deadline independently of visibility; `RobotScene.tsx:90` still signals readiness only inside `useFrame`; line 101 still uses never while suspended. Successful suspension after a live frame does not exercise initial-load suspension. The delayed-success-before-first-frame/offscreen-resume reproduction remains applicable.

**Lead-reported runtime results, separately attributed:** Lead reports 13 browser checks passed before the new recovery case, then model abort → unroute → Retry 3D failed as expected from the cached rejection. This independently supports the original A-R1 diagnosis but is not a successful post-fix result. Lead also reports actual pause/offscreen render-counter checks and actual `WEBGL_lose_context` failure handling passed. I did not run or observe those browser sessions.

**Coverage correction to earlier review:** Updated tests independently read now assert paused frame stability (`prototype.spec.ts:91–94`), retained Pause preference after reduced-motion removal/re-enable (95–99), actual context-loss fallback (102–113), and offscreen counter stability/resume with one canvas (116–127). These additions close the corresponding earlier missing-test observations at source level; the reported passes remain lead evidence. Initial-load suspension, Strict Mode authored-mixer replay, document-hidden behavior, and a non-racy post-fix retry remain separate acceptance checks. Existing fallback-only checks still begin with the initially visible Static specimen state; do not overstate their failure-path evidence.

**Next action for lead:** Correct the recovery-test ordering, rerun it against rebuilt output, address A-R2/A-R3, and supply changed paths and exact results for re-review. No full portfolio/design expansion needed.
