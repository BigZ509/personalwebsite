# Research index — lead-owned synthesis

**Current runtime checkpoint (D-018, 2026-11-02):** Approved warm Cinematic robot/workshop interaction delivered; [review/evidence/architecture](ROBOT_WORKSHOP_REVIEW.md), [current architecture checkpoint](../research/architecture.md), [assets checkpoint](../research/assets.md). Research packages below are retained source history; their earlier freeze statements are superseded only within D-018. Other worlds still require authorization.

**Latest setup/reference addition:** [Visual moodboard](../research/hub-world/VISUAL_REFERENCES.md), [skill audit](SKILL_AUDIT.md) and [full on-disk inventory](SKILLS_INVENTORY.json). D-014/D-015 require relevant skills, selected-reference screenshot comparisons and actual browser evidence for any 3D interaction claim. Setup does not authorize implementation.

**Current status (2026-11-01):** User hub-world pivot D-012 replaces the editorial experience. Start with [hub-world research/planning](../research/hub-world/README.md), [scene/system sources](../research/hub-world/SOURCES.md), [objects](../research/hub-world/OBJECTS.md), [architecture/scene graph](../research/hub-world/ARCHITECTURE.md) and [four phases](../research/hub-world/BUILD_PLAN.md). Application remains frozen. Source/architecture review and development authority are pending.

New checks: exact Drei CameraControls/MeshPortalMaterial source and MIT terms, official yomotsu sequence source/license, Txemalon reuse carried forward, Quaternius desk GLB/CC0 metadata, Kenney official CC0 listing with ZIP 403, notebook code/license and Julien room reference with no license found. Camera demo WebGL context creation failed in Chrome. No combined scene/device/build test is claimed. Detailed paths, commits, rights and limitations are in the hub package.

## Previous source-selection and editorial phases — historical

The [reusable-source catalog](../research/reusable-components/README.md) remains the underlying source-selection evidence. Previous research synthesis below is preserved as history and does not authorize original prop creation or continuing the prototype.

The catalog inventories every previously recorded repository/demo/asset URL, audits the four priority repos, provides 13 candidate records with exact verified paths or explicit missing-path notices, and includes 11 existing visual previews/screenshots. See its separate code/model licenses and gap statements before selecting anything. No app code changed during this research pass.

Lead source audit and specialist review completed on 2026-11-01. Start with the [implementation recommendation](IMPLEMENTATION_RECOMMENDATION.md); bounded next-stage scope and acceptance evidence: [robot prototype plan](ROBOT_PROTOTYPE_PLAN.md).

| Stream | Source of truth | Summary status | Pending question |
| --- | --- | --- | --- |
| Design | [Design report](../research/design.md) | Research accepted: seven findings, 11 active personal references + retired counterexample, three directions | A — Field Notes recommended; B — Instrument Panel and C — Object Index remain options |
| Assets | [Assets report](../research/assets.md) | Research accepted: seven findings, eight candidate routes, four source sets | RobotExpressive CC0 proposed; original props preferred; binaries not acquired/inspected |
| Architecture | [Architecture report](../research/architecture.md) | Research accepted: nine findings, four source/license-inspected repos, contracts/tree/schema | Next static export proposed; exact packages uninstalled/untested |
| Performance | [Performance report](../research/performance.md) | Research accepted by lead | Static fallback, eight findings, three tools, H budgets, all-NOT-RUN test matrix |

## Final synthesis

1. **Visual recommendation:** A — Field Notes, warm paper/ink/green, Newsreader + Inter, labeled specimens. B — Instrument Panel offers dark technical bays; C — Object Index offers bold ruled rows. [Full direction comparison](IMPLEMENTATION_RECOMMENDATION.md#three-visual-directions).
2. **Architecture proposal:** Next static export + React/TS, stable React 19/Fiber 9 with compatible Drei/Three; one lazy homepage canvas and ordinary HTML routes. Vite + React Router explicit prerendering is the alternate. Minimal motion first; GSAP/Motion/Spline not mandatory. [Architecture comparison](IMPLEMENTATION_RECOMMENDATION.md#architecture-recommendation-and-alternatives).
3. **Assets/licenses:** RobotExpressive has exact CC0 1.0 model evidence. Original props preferred; specific CC0 basketball and CC BY camera alternatives documented. Preserve per-file provenance; code/font/model rights are separate. [Asset recommendation](IMPLEMENTATION_RECOMMENDATION.md#assets-licensing-and-motion).
4. **Robot scope:** One licensed robot + posters/native anchors, minimal semantic route fixtures, immediate navigation, cancellation/failure paths and a recorded mobile/accessibility test package. [Proposed scope](ROBOT_PROTOTYPE_PLAN.md).
5. **Risk mitigation:** Static mobile/reduced-motion defaults with optional 3D; finite motion; no animation gate; H budget shell ≤300 KiB and deferred robot ≤1.5 MiB; prove actual output on physical devices. Initial JS suballocation is diagnostic until measured. No benchmark or conformance result is claimed. [Requirements](IMPLEMENTATION_RECOMMENDATION.md#performance-and-accessibility-requirements).
6. **User decisions:** Choose A/B/C; approve architecture, robot/prop strategy, mobile/motion/budget policy and bounded robot authorization. Full implementation remains behind later prototype review. [Approval table](IMPLEMENTATION_RECOMMENDATION.md#decisions-requiring-user-approval).

## Lead review and reconciliation

All four three-file handoffs reviewed; 31 substantive findings total. Specialist statuses remain Ready for review in their owned documents; lead-owned task status Done means the research deliverables were reviewed, not that the website exists or recommendations were approved.

- Resolve looping-vs-finite idle in favor of finite settle/rest for the proposed proof; continuous motion would need a persistent pause policy and measured cost.
- Focus always has stable semantic/visual indication; motion carries no essential information.
- Keep ≤350 ms optional activation accent inside the performance report's ≤400 ms ceiling, never on the route's critical path.
- Architecture specialist reviewed the lead proposal; no blocking contradiction. Integrated its requested semantic fixtures, explicit client lazy boundary and native-link/cancellation checks into the robot plan.
- Fonts, exact packages, asset binaries, host routing/404 behavior, visual coherence and every runtime result remain future implementation evidence. Browser WebGL was disabled in the asset session; no 3D animation success inferred.

## Source quality rules
Prioritize live demos, official docs, repo source/license, and verifiable performance measurements. Label speculation; include the last checked date for live links and compatibility claims.

## Lead independent source spot-checks — 2026-11-01

These are document checks, not runtime tests or final approvals.

| Pivotal claim | Source fetched directly by lead | Result / limitation |
| --- | --- | --- |
| Build-time HTML per route is available | [Next static exports](https://nextjs.org/docs/app/guides/static-exports) | Confirmed; static image optimization needs a custom loader or another explicit export-compatible strategy |
| Renderer/React majors must match | [R3F introduction](https://r3f.docs.pmnd.rs/getting-started/introduction) | React 19 ↔ Fiber 9; React 18 ↔ Fiber 8; Fiber 10 described as alpha. No dependency installation tested |
| Field performance targets | [Web Vitals](https://web.dev/articles/vitals) | LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at 75th percentile, mobile/desktop segmented; no actual site data exists |
| Touch target standard versus product target | [W3C 2.5.8 explanation](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | AA minimum 24×24 CSS px with stated exceptions. Larger product targets must not be mislabeled as this AA minimum |
| Robot asset license | [RobotExpressive model README](https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/RobotExpressive/README.md) | Identifies creator Tomás Laulhé, CC0 1.0, and Don McCurdy modifications. Binary geometry, animation clips, and device performance not inspected by lead |
| GSAP license classification | [GSAP Standard License](https://gsap.com/community/standard-license/) | Custom no-charge license with terms/restrictions, not MIT. No GSAP dependency selected by this check |
| Shared canvas feasibility | [Drei View](https://drei.docs.pmnd.rs/portals/view) | Documents scissored views bound to HTML elements within one canvas; layout/event integration still requires a prototype |
| On-demand rendering caveat | [R3F scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance) | Resting scenes can render on demand; externally mutated animation values require invalidation. Demand mode does not make continuous animation idle |
| Vite alternative has extra rendering decisions | [Vite SSR](https://vite.dev/guide/ssr.html) | Vite describes low-level SSR support and directs app authors to higher-level tools; this alone does not establish a complete static content/routing setup |
| Preferred font licenses | [Newsreader](https://raw.githubusercontent.com/google/fonts/main/ofl/newsreader/OFL.txt), [Inter](https://raw.githubusercontent.com/rsms/inter/master/LICENSE.txt) | Both state SIL OFL 1.1; exact bundled notices/modification conditions still need retention |
| Basketball reuse alternative | [dLeom creator listing](https://dleom.itch.io/basketballs) | Lists Blend/GLB/FBX and CC0 1.0. Name-your-price download flow and binary contents not inspected |
| Robot clip reference | [Official example source](https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/webgl_animation_skinning_morph.html) | Loads the GLB, blends states and one-shot gestures. Source inspection, not binary inventory or executed animation |
