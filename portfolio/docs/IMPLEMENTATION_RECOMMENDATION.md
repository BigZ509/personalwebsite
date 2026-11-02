# Implementation recommendation — research synthesis

**Owner:** lead  
**Status:** Research consolidated; ready for user review  
**Date:** 2026-11-01  
**Approval:** No design, stack, model, prototype, or production implementation approved.

## Intent and constraints

Present software engineering and robotics work clearly to internship recruiters and technical collaborators. An editorial homepage uses four individual objects as optional entry points: robot → robotics; basketball → about; camera → photography; microchip → software/projects. Readable case studies, direct links, and conventional navigation remain primary content requirements.

The only authorized work in this pass is research and Markdown planning. No application scaffold, dependency installation, product code, or deployment is included. The previously extracted archive remains unchanged.

## Evidence and confidence

Specialists own their research, progress, and handoff files. Lead reviews deliverables, resolves conflicts, and records shared proposals. A fetched page establishes only what its returned content supports. Browser inspection, model download inspection, runtime compatibility tests, device benchmarks, and license verification are separate evidence levels. Proposed budgets are acceptance targets, never measured performance.

## Three visual directions

Recommend **A — Field Notes**, an engineering journal with warm paper, strong type and four object specimens. It accommodates software, robotics, photography and personal interests without imposing a room or sports theme. This is the lead/design recommendation, not a user choice or a measured audience preference. The [design report](../research/design.md) compares 11 active personal sites plus a retired counterexample, seven findings, font evidence and per-object concepts.

| Direction | Appearance and type candidates | Desktop → mobile | Principal tradeoff |
| --- | --- | --- | --- |
| **A — Field Notes (recommended)** | Warm paper `#F4F1E8`, ink `#202824`, green `#245744`; Newsreader display + Inter UI/body; soft matte object treatment | Short identity/work shortcuts beside a roomy 2×2 specimen layout → compact full-width object/label rows | Best balance of technical and creative interests; needs precise typography/materials to avoid generic stationery |
| **B — Instrument Panel** | Charcoal `#151B24`, off-white `#EDF2F7`, restrained cyan `#73D8EA`; IBM Plex Sans + short Plex Mono metadata | Four equipment bays, 2×2 at intermediate widths → stacked bays without decorative rail/grid | Strong engineering signal; risks familiar neon styling and more demanding dark-surface lighting |
| **C — Object Index** | Near-white `#FAFAF6`, near-black `#171717`, cobalt `#263DB5`, pale lilac; Space Grotesk titles + Inter reading | Oversized section names in ruled rows with fixed side regions for objects → compact single-column index | Strongest graphic identity; oversized rows can push project evidence down |

These palettes and layouts are proposals; contrast and responsive fit have not been tested. For A, Newsreader and Inter have fetched SIL OFL 1.1 license texts. Retain notices from the exact chosen font files, verify modifications/subsetting conditions, and keep system-font fallbacks. The other shortlisted fonts' evidence is in design research. [Newsreader license](https://raw.githubusercontent.com/google/fonts/main/ofl/newsreader/OFL.txt), [Inter license](https://raw.githubusercontent.com/rsms/inter/master/LICENSE.txt).

In every direction, visible navigation, resume/contact access and selected work accompany the object index. Proposed reading order is Software, Robotics, Photography, About; object labels and one-sentence descriptions make destinations explicit. Basketball orange stays local to About. Case studies use quieter reading layouts and real evidence/media.

Design evidence is deliberately bounded: desktop captures were observed for Brittany Chiang, Maggie Appleton and Rauno Freiberg; Sonner toast and Vaul drawer actions visibly changed state. Other catalogue entries are primarily fetched text. The Bruno scene did not render in the attempted capture, a historical site fetch failed, and Vaul is marked unmaintained. References supply ideas, not code/asset adoption recommendations. No mobile, contrast, focus, reduced-motion or performance success is claimed for those sites.

### Shared interaction direction

Use a bounded settling gesture, then rest. Hover may preview an object; keyboard focus always provides immediate static outline/label feedback without requiring motion. First tap follows the visible link. Proposed hover response is 180–240 ms and optional activation accent ≤350 ms, within the performance report's ≤400 ms experiment ceiling; neither timing is a navigation delay. Reduced motion and motion-off use still poses with identical destinations. See the [robot plan](ROBOT_PROTOTYPE_PLAN.md), whose status remains proposed.

## Architecture recommendation and alternatives

Recommend **Next.js App Router + React 19 + TypeScript, build-time static export, Three.js through stable React Three Fiber 9, and compatible stable Drei**. This is a proposal, not an installed/tested package set. The [architecture report](../research/architecture.md) documents nine findings, source/license comparisons, peer constraints, event contracts and the lock strategy.

Static export can supply route HTML at build time; content pages need no production application server. Keep the homepage scene inside a small dynamically imported Client Component and keep readable content outside that import graph. The default Next image optimizer does not work in a static export: use pre-generated image variants initially or deliberately choose a supported custom loader. [Next export documentation](https://nextjs.org/docs/app/guides/static-exports), [client/server boundaries](https://nextjs.org/docs/app/getting-started/server-and-client-components).

Use stable releases with matching React/ReactDOM and compatible Fiber/Drei/Three peers; the documented stable major pairing is React 19 with Fiber 9. Exclude preview renderer versions from the first proof. Exact published releases, Node requirements, types, exports and transitive dependency compatibility must be rechecked and locked after approval. Source manifest/tag mismatches in the architecture report prevent treating its snapshot as a lockfile. [R3F introduction](https://r3f.docs.pmnd.rs/getting-started/introduction).

| Approach | Why consider it | Cost and recommendation |
| --- | --- | --- |
| Next static export + homepage client island | Clear content/client boundary, build-time articles, stable direct route structure | Framework conventions and explicit export-compatible image/hosting choices; recommended |
| Vite + React Router Framework Mode with prerendered published routes | Credible React alternative with explicit route generation | Additional rendering/router configuration and compatibility decisions; choose if familiarity outweighs Next conventions, not on an unmeasured speed claim |
| Plain Vite SPA | Simple isolated visual experiment | Does not alone meet per-route initial HTML/no-JS requirements; not recommended as the final content architecture |

The Vite comparison is grounded in its [low-level SSR guide](https://vite.dev/guide/ssr.html) and React Router's [prerender support](https://reactrouter.com/how-to/pre-rendering). No framework speed comparison has been run.

Start with CSS Modules/global design tokens, CSS feedback, finite R3F gestures and existing model clips. Tailwind is optional, not a required dependency. Add GSAP only if the selected choreography needs a timeline; add Motion only if DOM behavior justifies it. Do not install both by default. GSAP's no-charge terms are a custom license, not MIT. [GSAP terms](https://gsap.com/community/standard-license/).

### Scene and navigation contract

One homepage renderer serves the four independently owned object modules. Use four groups in one scene when their framing allows it; evaluate scissored Drei Views only when separate DOM-aligned framing is needed. One canvas does not eliminate per-object rendering work, and it shares visual failure scope. [Drei View documentation](https://drei.docs.pmnd.rs/portals/view).

Each portal is a real labeled HTML anchor with a poster. DOM hover/focus can notify its object; the canvas does not own destinations or create duplicate keyboard stops. Normal and modified clicks, Enter, touch, context menus, and copying/opening a link retain native semantics. Routing starts normally; neither a clip, timer, model download nor a completion callback gates navigation. A long departure animation may be cut short. If the desired design requires the robot to walk continuously into the destination, that is a separate choreography/scope choice to approve after the simple proof.

Object modules expose presentation and optional preview/accent/cancel/reset/dispose behavior. They own private mixers, timers and listeners and never import the router or create another renderer. Shared resources have coordinated release. A visual reducer handles loading, rest, preview, accent, failure and disposal, with cancellation tokens for newer activation, route changes, preference changes and unmount. Late async results cannot navigate or overwrite current state. Use finite idles and stop requesting frames at rest; externally mutated animation values need explicit invalidation. [R3F performance guidance](https://r3f.docs.pmnd.rs/advanced/scaling-performance).

Direct section/case-study visits must not fetch scene chunks or models. After approval, verify emitted production requests and generated HTML; import syntax alone is insufficient proof. No CMS, runtime API, global state store, physics engine or scene persisted across article routes is required by the current brief.

## Assets, licensing, and motion

Recommend **RobotExpressive for the robot proof, with original primitive basketball/camera/microchip props as the preferred later companions**. A common palette, lighting setup, scale and silhouette detail can unify them. The imported robot is a feasibility asset, not a unique commissioned identity. If its look or measured cost fails the proof, a simplified original rigid toy robot is the fallback; its gestures would need original motion.

| Object | Preferred approach and reuse alternative | License/provenance evidence | Motion strategy |
| --- | --- | --- | --- |
| Robot | RobotExpressive converted GLB; Quaternius editable pack as an alternative | [Exact model README](https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/RobotExpressive/README.md): Tomás Laulhé, Don McCurdy modifications, CC0 1.0 | Inspect actual clips; finite settle/head turn and optional one-shot gesture. Mixer owns bones; outer group owns portal movement |
| Basketball | Original sphere/seams; [dLeom basketball pack](https://dleom.itch.io/basketballs) as reusable alternative | Creator lists Blend + individual GLB/FBX and CC0 1.0; download contents uninspected | One rotation/lift or small local arc; optional 2D ring, no physics/hoop scene or success gate |
| Camera | Original unbranded body/grip/lens; [Kai Fan camera](https://poly.pizza/m/1pI-40LVzWX) as attributed alternative | Specialist observed CC BY 3.0 link; listed OBJ/GLTF. Exact mirrorless identity and separated lens unknown | Small lens/body movement and local dark iris/shutter cue; no flash, sound or camera permission |
| Microchip | Original slab/pins; [iPoly3D microchip](https://poly.pizza/m/tIp60lIg43) as alternative | Listing says CC0; exact version/file bundle not verified, so original geometry preferred | Shared pin geometry/materials, finite tilt/trace cue; no boot/loading gate |

The exact [Three.js robot example source](https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/webgl_animation_skinning_morph.html) loads the GLB and uses named animation states/gestures including Idle and Wave. That is source evidence, not a binary inventory or a successful runtime test. The specialist saw controls but a black canvas and a WebGL creation error in Chrome. A future proof must run in a graphics-capable environment; this research does not demonstrate that the model renders or meets any device budget.

The [assets report](../research/assets.md) contains seven findings, eight candidate/authoring routes, formats, rights distinctions, four source-repository comparisons, per-object motion and a manifest schema. Treat model, clip, texture, environment, code and font rights separately. CC0 provenance should still be retained; CC BY alternatives require actual credit/notices and change records. Unknown-license/version candidates stay on hold.

### Acquisition and optimization plan after approval

Pin source commit and asset bytes; retain model-specific license evidence and creator/modifier credit; record hashes, counts, clip names/durations, texture sizes and external URIs. Inspect original appearance and animations before editing. Use Blender only for an identified edit, keep an editable master, record exporter version/settings and compare reimported clips. The Blender manual could not be fully fetched in this pass, so historical indexed exporter details are not treated as verified current UI.

Generate same-camera posters and validate GLB structure. Compare lossless cleanup, controlled Meshopt/Draco geometry variants and texture compression only against the same original and total decoder/startup cost. Preserve named nodes, rig, required clips and visual quality. The optimization tools' code licenses do not clear the input assets. No model has been downloaded, optimized or validated; no compression winner is measured. [Performance tool/source comparison](../research/performance.md#three-accessible-repositoriestools--documentary-verification).

Defer Spline: documented export formats differ in retained states/events and paid features, and wrapper MIT does not clear the service/runtime/scene. Keep GSAP optional. For the first robot, use simple lighting with no external HDRI, real-time shadow, postprocessing or physics requirement.

## Folder and component structure

Future repository/application root: `/Users/bigz/personalwebsite/portfolio`. Keep existing memory alongside the future app. **The following is a plan only; no application files were created.** The more detailed [specialist tree](../research/architecture.md#future-foldercomponent-tree--text-proposal-only) describes per-file responsibilities.

```text
portfolio/
├── AGENTS.md, UPDATE.md, README.md, START_HERE_PROMPT.md
├── docs/ research/ updates/ handoffs/    existing persistent memory
├── src/
│   ├── app/
│   │   ├── layout.tsx, page.tsx         semantic shell/home, metadata
│   │   ├── robotics/page.tsx
│   │   ├── about/page.tsx
│   │   ├── photography/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── projects/[slug]/page.tsx     enumerated static case studies
│   │   └── not-found.tsx
│   ├── content/                        typed section/project records
│   ├── components/                     PortalCard, CaseStudy, MediaFigure
│   ├── features/home/
│   │   ├── HomeEnhancement.client.tsx   enhancement policy + lazy boundary
│   │   ├── scene/                      one HomeCanvas, ObjectSlot
│   │   ├── objects/                    robot/ basketball/ camera/ microchip/
│   │   ├── motion/                     contracts, policy, visual reducer
│   │   └── assets/                     asset IDs/bounds/provenance mapping
│   ├── navigation/                     route manifest, optional notifications
│   └── styles/                         tokens and shared styles
├── public/                             approved models, posters, project media
└── tests/                              content, navigation, browser behavior
```

Canonical destinations: `/robotics`, `/about`, `/photography`, `/projects`; each project has one `/projects/[slug]` article even when referenced from robotics. Build-time validation checks duplicate slugs, references, content requirements and media provenance. Hosting must support the chosen URL shape on fresh direct requests and return a real 404 for unknown routes. Preserve the source ZIP in the parent directory; it is not part of the future site's public assets.

## Prioritized roadmap

| Priority | Stage | Deliverable | Gate |
| --- | --- | --- | --- |
| P0 | Research synthesis | Three visual options, architecture comparison, asset shortlist, measurable acceptance plan | Lead reviews specialist evidence |
| P0 | User choices | Chosen visual direction and architecture; agreement on robot prototype scope | Explicit user approval |
| P0 | Robot proof of concept | One object, navigation/fallback behavior, device measurements, licensed asset record | Only after initial approvals |
| P0 | Prototype review | Measured evidence and visual review; revise or approve expansion | Explicit user approval before full implementation |
| P1 | Content foundation | Confirmed project facts, screenshots, GitHub/demo links, accessible case studies | Confirm personal content before publication |
| P1 | Remaining objects and polish | Basketball, camera, microchip; responsive integration and quality controls | Approved prototype pattern and budgets |
| P1 | Release validation | Accessibility, performance, route/SEO, asset licensing, production build checks | Publication requires authorization |

## Content contract — lead proposal

The homepage should identify the person, their engineering focus, selected work, and contact/resume access before visitors need to explore an object. Use short plain-text section names alongside every object; visitors should not have to infer that a microchip means projects. Keep project evidence reachable from conventional navigation and direct URLs.

Each case study should have a stable slug, title, short problem statement, personal role and team context, status/date, approach, architecture, demonstrated result, screenshots/diagrams with meaningful alternatives, limitations, and confirmed repository/demo links. Publish metrics only when an evidence source exists; otherwise describe the demonstrated behavior. An unfinished rover must be labeled in progress and included only if demonstrable.

| Candidate from brief | Evidence to collect before publication |
| --- | --- |
| Guiding Hands | Confirm actual gesture-control scope, personal contribution, accessible demo/video, repository, and privacy implications of camera use |
| Road Report | Confirm hackathon/team context, hazard detection and deduplication actually delivered, screenshots and source/demo |
| SpeakLab AI | Confirm current product name, speech/interview features, personal contribution, deployment status and source/demo |
| Delivery rover | Confirm current stage, hardware/software ownership, real footage or measurements, and what remains unfinished |

These are editorial requirements proposed by the lead from the brief, not claims that the projects or their results were investigated in this research pass. No project, personal account, or contact link should be invented.

## Performance and accessibility requirements

The performance report supplies eight evidence-backed findings, tooling comparisons, numeric hypotheses and a detailed acceptance matrix: [full performance research](../research/performance.md). The following is the lead's proposed integration; it is not measured performance or a conformance claim.

| Requirement | Proposed acceptance rule |
| --- | --- |
| Readable foundation | Initial HTML contains useful content, landmarks and ordinary links; dimensions are reserved for object posters |
| Mobile and motion defaults | Static mobile/coarse-pointer and reduced-motion experience initially; a separate optional Enable 3D control does not override reduced-motion settings |
| Keyboard/touch | Native anchors and buttons, visible unobscured focus, visible labels, first tap navigates, no mandatory drag; primary project target 44×44 CSS px |
| Decorative motion | Finite gestures preferred; persistent pause/resume control for continuous motion. No camera strobe; use lens/iris or local reveal feedback |
| Failures | Same links and stable posters during missing JS, unavailable WebGL, model/decoder failure, timeout and context loss |
| SEO | Build-time content, meaningful titles/descriptions, canonical direct URLs, genuine missing-page status, sitemap; verify deployed deep links |
| Loading hypothesis | Initial 2D shell ≤300 KiB compressed response bodies; deferred robot ≤1.5 MiB additional including all renderer/decoder/model/environment requests |
| Rendering hypothesis | Robot ≤40k visible triangles and ≤30 draws/frame; mobile DPR initially 1; aim for 30 fps during motion and p95 rendered-frame gaps ≤50 ms |
| Texture hypothesis | Robot texture residency estimate ≤16 MiB including mipmaps and actual/fallback upload formats; count other GPU allocations separately |
| Lifecycle hypothesis | Stop continuous object work within 500 ms offscreen/hidden; no object draws over next 10 seconds steady state, allowing a state-change frame |
| Lab evidence | Five cold/five warm runs on named setups; test interaction while decoding/animating, plus a five-minute thermal check; never call scripted samples field INP |

The shell suballocations and four-object ceilings in the specialist report are diagnostic starting hypotheses. Actual framework baseline and chosen assets must be measured in the approved proof. Document an evidence-based revision instead of claiming a proposed number was attained or silently moving it.

For the eventual launched site, the official good field targets are LCP ≤2.5 seconds, INP ≤200 ms, CLS ≤0.1 at p75 segmented by mobile/desktop; no field data exists yet. Lab results and small samples cannot establish those population metrics. [Official Web Vitals guidance](https://web.dev/articles/vitals).

The 44 px target above is a project preference. WCAG 2.5.8 AA sets 24×24 CSS px with stated exceptions. Aim for WCAG 2.2 AA overall and honor reduced motion as an additional product commitment; a checklist or automated scan alone is insufficient to claim conformance. [Target-size explanation](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

## Unresolved choices and risks

- Visual identity and technical architecture await user approval after this report.
- Personal name, biography, current project status, exact project URLs, resume, contact details, and photography ownership are unconfirmed; do not invent them.
- Asset candidates require model-level licensing and implementation inspection before bundling.
- No Git repository exists yet. Repository initialization is a future implementation setup step, not evidence of existing version control.
- No browser/device benchmarks or dependency compatibility installation have occurred; those belong to the approved robot prototype.

| Integration risk | How the plan contains it | Evidence needed at the next gate |
| --- | --- | --- |
| Four unrelated models look like an asset-store collage | Choose one material, lighting, scale, and silhouette language; simplify or author the smaller objects to match | Robot art review and a still composition of all four before expanding animation |
| Impressive transition delays a recruiter's task | Keep readable links and optional short feedback; route correctness is independent of animation completion | Keyboard/touch/modified-click and direct-link walkthrough |
| A pleasant desktop scene overwhelms mobile | Start with one robot and a poster path; add complexity only within measured budgets | Named-device runtime and transfer measurements, including a mobile browser |
| Code/model/font rights are conflated | Track original sources, exact licenses, notices, and modifications per artifact | License manifest for every bundled artifact |
| Starter example becomes the application architecture by accident | Borrow narrow documented patterns; select dependencies deliberately after approval | Reviewed dependency lock, page boundaries, route behavior, and build evidence |
| Persistent notes overstate project progress | Keep research completion separate from implementation approval and measured outcomes | Consistent task statuses, source limitations, and explicit user decisions |

## Decisions requiring user approval

| Choice | Lead recommendation | What approval would cover |
| --- | --- | --- |
| Visual direction | **A — Field Notes**, with B/C available | Art direction for the robot proof; still subject to actual model/type/contrast review |
| Technical architecture | Next static export, React/TS, stable compatible R3F/Drei/Three, one homepage canvas, minimal motion | Framework and component boundaries; exact releases still require published-metadata/install/build checks |
| Asset strategy | CC0 RobotExpressive proof; original ball/camera/chip later; no paid asset purchase proposed | Inspecting/adapting the robot for the proof, retaining provenance; not automatic adoption of every candidate |
| Experience/performance policy | Static mobile/reduced-motion defaults, optional 3D, native immediate navigation, finite motion, provisional budgets | These product tradeoffs and the evidence-based budget review process |
| Next work authorization | One robot proof as scoped in `ROBOT_PROTOTYPE_PLAN.md` | Only that prototype and its necessary semantic shell/destination/testing; full website remains behind its later review |

**Current state: all implementation choices above are awaiting user approval.** Research completion does not approve them. If the user asks for revisions, update the proposal; if the user approves only direction/architecture without authorizing a prototype, retain the implementation stop.

Before any publication, separately confirm personal copy, project evidence/links, resume/contact details and photography rights. Repository initialization, hosting choice, deployment and publication remain future setup/release actions.
